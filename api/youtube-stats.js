const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const EMPTY = { channel: null, latestVideo: null };

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube API error: ${res.status} ${body}`);
  }
  return res.json();
}

async function fetchLatestVideo(uploadsPlaylistId) {
  if (!uploadsPlaylistId) return null;

  try {
    const playlistData = await getJson(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=1&key=${API_KEY}`
    );
    const latestItem = playlistData.items && playlistData.items[0];
    if (!latestItem) return null;

    const videoId = latestItem.snippet.resourceId.videoId;
    const videoData = await getJson(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`
    );
    const videoStats = videoData.items && videoData.items[0]?.statistics;

    return {
      id: videoId,
      title: latestItem.snippet.title,
      thumbnail:
        latestItem.snippet.thumbnails?.medium?.url ||
        latestItem.snippet.thumbnails?.default?.url ||
        null,
      publishedAt: latestItem.snippet.publishedAt,
      viewCount: Number(videoStats?.viewCount || 0),
    };
  } catch (error) {
    // No uploads yet, or the playlist isn't accessible — channel stats are still valid without it.
    console.error('YouTube latest video fetch failed:', error.message);
    return null;
  }
}

export default async function handler(req, res) {
  if (!API_KEY || !CHANNEL_ID) {
    return res.status(200).json(EMPTY);
  }

  try {
    const channelData = await getJson(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const channelItem = channelData.items && channelData.items[0];
    if (!channelItem) {
      return res.status(200).json(EMPTY);
    }

    const channel = {
      title: channelItem.snippet.title,
      thumbnail: channelItem.snippet.thumbnails?.default?.url || null,
      subscriberCount: Number(channelItem.statistics.subscriberCount || 0),
      viewCount: Number(channelItem.statistics.viewCount || 0),
      videoCount: Number(channelItem.statistics.videoCount || 0),
    };

    const latestVideo = await fetchLatestVideo(channelItem.contentDetails?.relatedPlaylists?.uploads);

    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({ channel, latestVideo });
  } catch (error) {
    console.error('YouTube stats error:', error.message);
    return res.status(200).json(EMPTY);
  }
}

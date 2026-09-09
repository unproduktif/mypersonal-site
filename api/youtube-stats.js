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

export default async function handler(req, res) {
  const debug = req.query && req.query.debug === '1';

  if (!API_KEY || !CHANNEL_ID) {
    return res.status(200).json(
      debug
        ? { ...EMPTY, debug: { hasApiKey: !!API_KEY, hasChannelId: !!CHANNEL_ID, channelId: CHANNEL_ID || null } }
        : EMPTY
    );
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

    const uploadsPlaylistId = channelItem.contentDetails?.relatedPlaylists?.uploads;
    let latestVideo = null;

    if (uploadsPlaylistId) {
      const playlistData = await getJson(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=1&key=${API_KEY}`
      );
      const latestItem = playlistData.items && playlistData.items[0];

      if (latestItem) {
        const videoId = latestItem.snippet.resourceId.videoId;
        const videoData = await getJson(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`
        );
        const videoStats = videoData.items && videoData.items[0]?.statistics;

        latestVideo = {
          id: videoId,
          title: latestItem.snippet.title,
          thumbnail:
            latestItem.snippet.thumbnails?.medium?.url ||
            latestItem.snippet.thumbnails?.default?.url ||
            null,
          publishedAt: latestItem.snippet.publishedAt,
          viewCount: Number(videoStats?.viewCount || 0),
        };
      }
    }

    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({ channel, latestVideo });
  } catch (error) {
    console.error('YouTube stats error:', error);
    return res.status(200).json(
      debug ? { ...EMPTY, debug: { message: error.message, channelId: CHANNEL_ID } } : EMPTY
    );
  }
}

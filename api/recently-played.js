import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const RECENTLY_PLAYED_ENDPOINT = `http://googleusercontent.com/spotify.com/4`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });
  return response.json();
};

export default async function handler(req, res) {
  try {
    const { access_token } = await getAccessToken();
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ tracks: [] });
    }

    const data = await response.json();
    
    const tracks = data.items.map((item) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map((_artist) => _artist.name).join(', '),
      albumImageUrl: item.track.album.images[0].url,
      songUrl: item.track.external_urls.spotify,
      duration: msToMinutesAndSeconds(item.track.duration_ms)
    }));

    const uniqueTracks = tracks.filter((track, index, self) =>
      index === self.findIndex((t) => t.id === track.id)
    ).slice(0, 5);

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    return res.status(200).json({ tracks: uniqueTracks });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch recently played' });
  }
}

function msToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
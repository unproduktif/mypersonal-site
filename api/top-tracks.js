import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?limit=4&time_range=short_term`;

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
    const response = await fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ tracks: [] });
    }

    const data = await response.json();
    
    const tracks = data.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((_artist) => _artist.name).join(', ')
    }));

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.status(200).json({ tracks });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
}
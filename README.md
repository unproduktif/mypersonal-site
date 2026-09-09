# mypersonal-site

Dodi Wijaya's personal portfolio site — built with React and Vite. It's a small, animated, single-page-feeling site with a home page, a story/experience timeline, a hardware setup list, a connect/contact page, a live "on loop" Spotify widget, and live YouTube channel stats.

Live at [_dodiwijaya](https://github.com/unproduktif) · deployed on Vercel.

## Features

- **Home** — animated hero intro, a photo/video gallery, a live Spotify "recently played" / "top tracks" widget, and a live YouTube stats card (subscribers, total views, latest video)
- **Story** — hobbies, a real work-experience timeline (expandable entries with certificates and skills), and a projects grid pulled live from the [GitHub API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
- **Setup** — a curated list of the hardware/gear used day-to-day
- **Connect** — social links and a one-click "copy email" card
- Light/dark theme toggle with a sliding nav indicator, scroll-triggered reveal animations, and page transitions
- No UI framework — hand-written CSS with CSS custom properties for theming

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- Plain CSS (custom properties for theming, monochrome palette, no Tailwind/CSS-in-JS)
- [Vercel Serverless Functions](https://vercel.com/docs/functions) (`/api`) to proxy the Spotify Web API and YouTube Data API
- ESLint (flat config) for linting

## Getting Started

### Prerequisites

- Node.js 18+
- A Spotify account + [Spotify Developer app](https://developer.spotify.com/dashboard) if you want the "on loop" widget to show real data
- A [Google Cloud project with the YouTube Data API v3 enabled](https://console.cloud.google.com/apis/library/youtube.googleapis.com) if you want the "on camera" widget to show real data

### Installation

```bash
git clone https://github.com/unproduktif/mypersonal-site.git
cd mypersonal-site
npm install
```

### Environment variables (optional — for the live widgets)

The `/api/recently-played` and `/api/top-tracks` serverless functions read a Spotify refresh token to call the Spotify Web API on your behalf. `/api/youtube-stats` reads a YouTube Data API key and channel ID. Create a `.env` (or configure these in your Vercel project settings):

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

YOUTUBE_API_KEY=your_youtube_data_api_key
YOUTUBE_CHANNEL_ID=your_channel_id_starting_with_UC
```

Without these, the Spotify section renders its empty state ("empty queue. wake up my spotify.") and the YouTube section renders its empty state ("channel's still warming up.") — the rest of the site works fine without them.

The YouTube channel ID (not the `@handle`) can be found in YouTube Studio under **Settings → Channel → Advanced settings**.

### Running locally

```bash
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173). Note that the `/api` serverless functions only run when deployed on Vercel (or via `vercel dev`) — during plain `npm run dev` the Spotify and YouTube widgets will show their empty states.

### Build

```bash
npm run build   # production build to dist/
npm run preview # preview the production build locally
npm run lint    # run ESLint
```

## Project Structure

```
src/
  components/   Navbar, Footer, Reveal (scroll-reveal wrapper)
  hooks/        useInView (IntersectionObserver hook)
  pages/        Home, Story, Setup, Connect
  styles/       global.css, components.css (design tokens + shared components)
  App.jsx       page routing (simple state-based, no router) + theme state
api/
  recently-played.js  Spotify "recently played" proxy
  top-tracks.js       Spotify "top tracks" proxy
  youtube-stats.js    YouTube channel + latest video stats proxy
```

## Deployment

The site is set up to deploy on [Vercel](https://vercel.com) — it auto-detects the Vite build and picks up the `/api` folder as serverless functions. Set the `SPOTIFY_*` and `YOUTUBE_*` environment variables in the Vercel project settings for the live widgets to work in production.

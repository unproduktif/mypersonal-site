# mypersonal-site

Dodi Wijaya's personal portfolio site — built with React and Vite. It's a small, animated, single-page-feeling site with a home page, a story/experience timeline, a hardware setup list, a connect/contact page, and a live "on loop" Spotify widget.

Live at [_dodiwijaya](https://github.com/unproduktif) · deployed on Vercel.

## Features

- **Home** — animated hero intro, a photo/video gallery, and a live Spotify "recently played" / "top tracks" widget
- **Story** — hobbies, a real work-experience timeline (expandable entries with certificates and skills), and a projects grid pulled live from the [GitHub API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
- **Setup** — a curated list of the hardware/gear used day-to-day
- **Connect** — social links and a one-click "copy email" card
- Light/dark theme toggle with a sliding nav indicator, scroll-triggered reveal animations, and page transitions
- No UI framework — hand-written CSS with CSS custom properties for theming

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- Plain CSS (custom properties for theme + accent colors, no Tailwind/CSS-in-JS)
- [Vercel Serverless Functions](https://vercel.com/docs/functions) (`/api`) to proxy the Spotify Web API
- ESLint (flat config) for linting

## Getting Started

### Prerequisites

- Node.js 18+
- A Spotify account + [Spotify Developer app](https://developer.spotify.com/dashboard) if you want the "on loop" widget to show real data

### Installation

```bash
git clone https://github.com/unproduktif/mypersonal-site.git
cd mypersonal-site
npm install
```

### Environment variables (optional — for the Spotify widget)

The `/api/recently-played` and `/api/top-tracks` serverless functions read a Spotify refresh token to call the Spotify Web API on your behalf. Create a `.env` (or configure these in your Vercel project settings):

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

Without these, the Spotify section simply renders its empty state ("empty queue. wake up my spotify.") — the rest of the site works fine without them.

### Running locally

```bash
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173). Note that the `/api` serverless functions only run when deployed on Vercel (or via `vercel dev`) — during plain `npm run dev` the Spotify widget will show its empty state.

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
```

## Deployment

The site is set up to deploy on [Vercel](https://vercel.com) — it auto-detects the Vite build and picks up the `/api` folder as serverless functions. Set the three `SPOTIFY_*` environment variables in the Vercel project settings for the Spotify widget to work in production.

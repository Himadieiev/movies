<div align="center">
  <h1 align="center">Movie Explorer</h1>

  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-React_Query-black?style=for-the-badge&logoColor=white&logo=reactquery&color=FF4154" alt="react-query" />
    <img src="https://img.shields.io/badge/-React_Router-black?style=for-the-badge&logoColor=white&logo=reactrouter&color=CA4245" alt="react-router" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
  </div>

</div>

## About

Movie Explorer is a feature-rich movie discovery application that allows users to search, explore, and organize movies. Built with modern React practices and a clean UI.

## Features

- **Real-time Movie Search** — Debounced search with recent searches history (last 5 queries stored in localStorage)
- **Trending Movies on Home Page** — Top 5 most searched movies tracked via Appwrite backend
- **Favorites & Unwatched** — Personal movie lists saved in localStorage with real-time sync across tabs
- **Movie Details** — Comprehensive information including trailers, cast, and overview
- **Trending Page** — Popular, Trending, and Top Rated movies with infinite scroll (Load More)
- **Upcoming Movies** — Coming soon releases with pagination
- **Smart Caching** — React Query for efficient API calls with stale-while-revalidate strategy
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Accessibility** — Full keyboard navigation support

## Tech Stack

- **Frontend**: React 19, React Router 7, TanStack React Query
- **Styling**: Tailwind CSS 4
- **Backend**: Appwrite (search analytics)
- **API**: TMDB (The Movie Database)
- **Build Tool**: Vite
- **Utilities**: react-use, Appwrite SDK

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/movies.git

# Install dependencies
npm install

# Create .env file
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id

# Start development server
npm run dev
```

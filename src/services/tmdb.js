export const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMoviesFromTMDB = async (query = "", page = 1) => {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${API_BASE_URL}/discover/movie?page=${page}`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) throw new Error("Failed to fetch movies");

  return response.json();
};

export const fetchPopularMovies = async (page = 1) => {
  const endpoint = `${API_BASE_URL}/movie/popular?page=${page}`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) throw new Error("Failed to fetch popular movies");

  return response.json();
};

export const fetchTrendingMovies = async (timeWindow = "week", page = 1) => {
  const endpoint = `${API_BASE_URL}/trending/movie/${timeWindow}?page=${page}`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) throw new Error("Failed to fetch trending movies");

  return response.json();
};

export const fetchTopRatedMovies = async (page = 1) => {
  const endpoint = `${API_BASE_URL}/movie/top_rated?page=${page}`;

  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) throw new Error("Failed to fetch top rated movies");

  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}?append_to_response=videos,credits`,
    API_OPTIONS,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};

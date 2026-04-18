import {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import MovieModal from "./components/MovieModal";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

const HomePage = lazy(() => import("./pages/HomePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const UnwatchedPage = lazy(() => import("./pages/UnwatchedPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const TrendingPage = lazy(() => import("./pages/TrendingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <Header />
          <Suspense
            fallback={
              <div className="spinner-fullscreen">
                <Spinner />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/unwatched" element={<UnwatchedPage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <ScrollToTopButton />
    </BrowserRouter>
  );
};

export default App;

import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import AlbumPage from "./pages/album/AlbumPage";
import TrackPage from "./pages/track/TrackPage";
import FeaturedPage from "./pages/FeaturedPage";
import Albums from "./pages/album/Albums";
import Artists from "./pages/artist/Artists";
import Songs from "./pages/track/Songs";
import Playlists from "./pages/playlist/Playlists";
import SearchResults from "./pages/SearchResults";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { PrivateRoute } from "./routing/routes/routes.private";
import FavoritesPage from "./pages/FavoritesPage";
import PlaylistPage from "./pages/playlist/Playlist";
import { useSelector } from "react-redux";
import { RootState } from "./stores/configureStore";
import ArtistPage from "./pages/artist/ArtistPage";
import About from "./pages/About";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/artists" element={<Artists />}></Route>
        <Route path="/artist/:id" element={<ArtistPage />}></Route>
        <Route path="/albums" element={<Albums />}></Route>
        <Route path="/album/:id" element={<AlbumPage />}></Route>
        <Route path="/songs" element={<Songs />}></Route>
        <Route path="/track/:id" element={<TrackPage />}></Route>
        <Route path="/playlists" element={<Playlists />}></Route>
        <Route
          path="/playlist/:id"
          element={
            <PrivateRoute>
              <PlaylistPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/featured" element={<FeaturedPage />}></Route>
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

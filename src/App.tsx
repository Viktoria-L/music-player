import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import AlbumPage from "./pages/AlbumPage";
import TrackPage from "./pages/TrackPage";
import FeaturedPage from "./pages/FeaturedPage";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import Songs from "./pages/Songs";
import Playlists from "./pages/Playlists";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route path="/artists" element={<Artists />}></Route>
        <Route path="/albums" element={<Albums />}></Route>
        <Route path="/songs" element={<Songs />}></Route>
        <Route path="/playlists" element={<Playlists />}></Route>
        <Route path="/album/:id" element={<AlbumPage />}></Route>
        <Route path="/track/:id" element={<TrackPage />}></Route>
        <Route path="/featured" element={<FeaturedPage />}></Route>

        {/* <Route path='/search' element={<SearchResults />}></Route>
       <Route path='/artist/:id' element={<ArtistPage />}></Route>
       <Route path='/' element={< />}></Route>
       <Route path='/playlist/:id' element={<Playlist />}></Route> */}
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

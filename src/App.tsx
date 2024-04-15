import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Root from './pages/Root';
import Home from './pages/Home';
import AlbumPage from './pages/AlbumPage';

function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
       <Route index element={<Home />}></Route>
       <Route path='/album/:id' element={<AlbumPage />}></Route>
       {/* <Route path='/search' element={<SearchResults />}></Route>
       <Route path='/artist/:id' element={<ArtistPage />}></Route>
       <Route path='/' element={< />}></Route>
       <Route path='/playlist/:id' element={<Playlist />}></Route> */}
    </Route>
  )
)

  return (
    <>
<RouterProvider router={router} />
    </>
  )
}

export default App

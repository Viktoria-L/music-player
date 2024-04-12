import { useSelector } from "react-redux";
import { Album } from "../models/AlbumResponse";
import type { RootState } from "../configureStore/configureStore";

export const FeaturedAlbums = () => {
  const albums: Album[] = useSelector(
    (state: RootState) => state.musicInStore.albums
  );
  //TODO varje album behöver en tryckbar PLAY ikon som spelar albumets första låt?, och en länk  på hela albumet som navigerar den till albumet
  //När man hovrar över albumet lär en div utanför med en kant synas, kolla som de t.ex. är på spotfy

  return (
    <div className="flex flex-wrap gap-5 w-full">
      {albums.slice(0, 4).map((album) => (
        <div key={album.id} className="w-48">
          <img src={album.image} className="h-48 w-48 rounded-xl"></img>
          <p className="text-wrap mt-2">{album.name}</p>
        </div>
      ))}
    </div>
  );
};

// <div key={album.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4">

// export const FeatAlb = () => {

//        // Denna borde rendera ut alla featured albums eller songs beroende på vad api hämtar.
//        // komponenten måste då ta in datat {musicData}
//     return (
//         <>
//             <div className="container mt-12 self-center">
//                 <input type="radio" name="slider" id="item-1" checked />
//                 <input type="radio" name="slider" id="item-2" />
//                 <input type="radio" name="slider" id="item-3" />
//                     <div className="cards">
//                         <label className="card" htmlFor="item-1" id="song-1">
//                         <img src="./src/assets/image/woman1.png" alt="song" />
//                         </label>
//                         <label className="card" htmlFor="item-2" id="song-2">
//                         <img src="./src/assets/image/cat2.png" alt="song" />
//                         </label>
//                         <label className="card" htmlFor="item-3" id="song-3">
//                         <img src="./src/assets/image/forest1.png" alt="song" />
//                         </label>
//                     </div>
//         </div>
//     </>
//     )
// }

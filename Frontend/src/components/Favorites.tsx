import { useSelector, useDispatch } from "react-redux";
import { Album } from "../models/AlbumResponse";
import { RootState } from "../configureStore/configureStore";
import { Track } from "../models/TracksResponse";
import { Link } from "react-router-dom";
import { resetTracks } from "../configureStore/musicSlice";
import AlbumDisplay from "./AlbumDisplay";
import { fetchFavorites } from "../utils/helperFunctions";
import { useEffect, useState } from "react";

//TODO varje album behöver en tryckbar PLAY ikon som spelar albumets första låt?, och en länk  på hela albumet som navigerar den till albumet
//När man hovrar över albumet lär en div utanför med en kant synas, kolla som de t.ex. är på spotfy

//TOdO fråga,  ska jag ens kunna spara album som favorite
// TODO , kanske byta nmna till Your favorite tracks

// eslint-disable-next-line react-refresh/only-export-components
export enum EntityType {
  Albums = "albums",
  Artists = "artists",
  Tracks = "tracks",
}

export const Favorites = ({ entity }: { entity: EntityType }) => {
  const albums: Album[] = useSelector(
    (state: RootState) => state.musicInStore.albums
  );
  // const artists = useSelector((state: RootState) => state.musicInStore.artists);
  const [tracks, setTracks] = useState<Track[]>([]);

  //   const tracks: Track[] = useSelector(
  //     (state: RootState) => state.musicInStore.tracks
  //   );

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    const response = await fetchFavorites();
    if (response) {
      setTracks(response);
    }
  };

  const dispatch = useDispatch();

  let favoriteData: any[] = [];
  let title: string = "";
  let basePath: string = "";

  switch (entity) {
    case EntityType.Albums:
      favoriteData = albums;
      title = "Favorite albums";
      basePath = "album";
      break;
    // case EntityType.Artists:
    // featuredData = artists;
    //title = 'Featured Artists';
    //basePath = artist;
    //   break;
    case EntityType.Tracks:
      favoriteData = tracks;
      title = "Favorite Tracks";
      basePath = "track";
      break;

    default:
      break;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between w-full items-center">
        <h3 className="font-semibold text-2xl tracking-wide mb-8">{title}</h3>
        <Link to="/favorites" state={{ entity, basePath, favoriteData }}>
          Show all
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 w-full">
        {favoriteData.slice(0, 4).map((data) => (
          <AlbumDisplay data={data} basePath={basePath} />
        ))}
      </div>
    </div>
  );
};

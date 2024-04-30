import { useSelector, useDispatch } from "react-redux";
import { Album } from "../models/AlbumResponse";
import { RootState } from "../stores/configureStore";
import { Track } from "../models/TracksResponse";
import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import { resetTracks } from "../stores/musicStore/musicSlice";
import AlbumDisplay from "./AlbumDisplay";
//TODO varje album behöver en tryckbar PLAY ikon som spelar albumets första låt?, och en länk  på hela albumet som navigerar den till albumet
//När man hovrar över albumet lär en div utanför med en kant synas, kolla som de t.ex. är på spotfy

// eslint-disable-next-line react-refresh/only-export-components
export enum EntityType {
  Albums = "albums",
  Artists = "artists",
  Tracks = "tracks",
}

export const Featured = ({ entity }: { entity: EntityType }) => {
  const albums: Album[] = useSelector(
    (state: RootState) => state.musicInStore.albums
  );
  // const artists = useSelector((state: RootState) => state.musicInStore.artists);
  const tracks: Track[] = useSelector(
    (state: RootState) => state.musicInStore.tracks
  );
  const dispatch = useDispatch();

  let featuredData: any[] = [];
  let title: string = "";
  let basePath: string = "";

  switch (entity) {
    case EntityType.Albums:
      featuredData = albums;
      title = "Featured albums";
      basePath = "album";
      break;
    // case EntityType.Artists:
    // featuredData = artists;
    //title = 'Featured Artists';
    //basePath = artist;
    //   break;
    case EntityType.Tracks:
      featuredData = tracks;
      title = "Featured Tracks";
      basePath = "track";
      break;

    default:
      break;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between w-full items-center">
        <h3 className="font-semibold text-2xl tracking-wide mb-8">{title}</h3>
        <Link to="/featured" state={{ entity, basePath, featuredData }}>
          Show all
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 w-full">
        {featuredData.slice(0, 4).map((data) => (
          <AlbumDisplay data={data} basePath={basePath} />
        ))}
      </div>
    </div>
  );
};

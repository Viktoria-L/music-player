import { useSelector, useDispatch } from "react-redux";
import { Album } from "../models/AlbumResponse";
import { AppDispatch, RootState } from "../stores/configureStore";
import { Track } from "../models/TracksResponse";
import { Link } from "react-router-dom";
import AlbumDisplay from "./AlbumDisplay";

// eslint-disable-next-line react-refresh/only-export-components
export enum EntityType {
  Albums = "albums",
  Artists = "artists",
  Tracks = "tracks",
}

export const Featured = ({ entity }: { entity: EntityType }) => {
  const albums: Album[] = useSelector(
    (state: RootState) => state.musicStore.albums
  );
  // const artists = useSelector((state: RootState) => state.musicStore.artists);
  const tracks: Track[] = useSelector(
    (state: RootState) => state.musicStore.featuredTracks
  );
  const dispatch: AppDispatch = useDispatch();

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
      <div className="flex flex-wrap w-full">
        {featuredData.slice(0, 4).map((data, i) => (
          <AlbumDisplay key={i} data={data} basePath={basePath} />
        ))}
      </div>
    </div>
  );
};

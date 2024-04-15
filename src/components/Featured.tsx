import { useSelector } from "react-redux";
import { Album } from "../models/AlbumResponse";
import { RootState } from "../configureStore/configureStore";
import { Track } from "../models/TracksResponse";
import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
//TODO varje album behöver en tryckbar PLAY ikon som spelar albumets första låt?, och en länk  på hela albumet som navigerar den till albumet
  //När man hovrar över albumet lär en div utanför med en kant synas, kolla som de t.ex. är på spotfy


// eslint-disable-next-line react-refresh/only-export-components
export enum EntityType {
    Albums = 'albums',
    Artists = 'artists',
    Tracks = 'tracks'
  }

export const Featured = ({ entity }: {entity: EntityType}) => {

    const albums: Album[] = useSelector((state: RootState) => state.musicInStore.albums);
    // const artists = useSelector((state: RootState) => state.musicInStore.artists);
    const tracks: Track[] = useSelector((state: RootState) => state.musicInStore.tracks);
    
    let featuredData: any[] = [];
   let title: string = '';

  switch (entity) {
    case EntityType.Albums: 
    featuredData = albums;
    title = 'Featured albums';
      break;
    // case EntityType.Artists:
    // featuredData = artists;
   //title = 'Featured Artists';
    //   break;
    case EntityType.Tracks: 
    featuredData = tracks;
    title = 'Featured Tracks';
      break;

    default:

    break;
  }
  

  return (
    <div className="mt-8">
    <h3 className="font-semibold text-2xl tracking-wide mb-8">{title}</h3> 
    <div className="flex flex-wrap gap-5 w-full">
      {featuredData.slice(0, 4).map((data) => (
        <div key={data.id} className="w-48">
            <div className="w-48 relative">

            <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
          <img src={data.image} className="h-48 w-48 rounded-xl"></img>
          </div>
         <Link to={`album/${data.id}`} state={data}>
          <p className="text-wrap mt-2">{data.name}</p>
         </Link>
        </div>
      ))}
    </div>
    </div>
  );
};


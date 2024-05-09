import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { Track } from "../models/TracksResponse";

//TODO, gör en funktion någonstans som tar bort favoriten från databasen
//TODO, lägg till hjärtfunktion och kanske dropdownmenyn=?

const FavoritesPage = () => {
  const { state } = useLocation();

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  return (
    <>
      <div className="favoritespage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">
          Your favorite tracks
        </h2>

        <div className="flex flex-wrap my-8 gap-10 w-full">
          {state.tracks.map((data: Track) => (
            <div key={data.id} className="w-48">
              <div className="w-48 relative">
                <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
                <img src={data.image} className="h-48 w-48 rounded-lg"></img>
              </div>

              {state.basePath && (
                <Link to={`/${state.basePath}/${data.id}`} state={data}>
                  <p className="text-wrap text-lg mt-2">{data.name}</p>
                  <p className="text-wrap text-sm mt-1">{data.artist_name}</p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;

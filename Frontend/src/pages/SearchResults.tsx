import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromJamendo } from "../utils/http";
import { RootState } from "../stores/configureStore";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Track } from "../models/TracksResponse";
import {
  setSearchResults,
  setTracksToPlay,
  setPlayStatus,
} from "../stores/musicStore/musicSlice";
import { IoPlay } from "react-icons/io5";
import { formatTime } from "../utils/helperFunctions";
import { Error } from "../components/Error";

interface GroupedResults {
  tracks: Track[];
  albums: Track[];
  artists: Track[];
}

const SearchResults = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const searchResults = useSelector(
    (state: RootState) => state.musicStore.searchResults
  );
  const { query } = useParams();
  const [groupedResults, setGroupedResults] = useState<GroupedResults>({
    tracks: [],
    albums: [],
    artists: [],
  });
  const [uniqueAlbums, setUniqueAlbums] = useState<Track[]>([]);
  const [uniqueArtists, setUniqueArtists] = useState<Track[]>([]);

  useEffect(() => {
    if (query) {
      fetchDataFromJamendo<Track[]>(
        "tracks",
        { limit: 30, search: query },
        dispatch,
        setSearchResults,
        setError
      );
    }
  }, [query]);

  useEffect(() => {
    if (searchResults.length > 0 && query) {
      const results = groupResultsByQueryMatch(searchResults, query);
      setGroupedResults(results);
      setUniqueArtists(
        getUniqueArtists(
          searchResults.filter((artist) =>
            artist.artist_name!.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }
  }, [searchResults, query]);

  //Behövde sortera ut unika album då de till synes kom flera likadana album i responsen...
  useEffect(() => {
    const unique = groupedResults.albums.reduce(
      (acc: { [key: string]: Track }, current: Track) => {
        if (!acc[current.album_name!]) {
          acc[current.album_name!] = current; // lagrar albumet om det inte redan finns
        }
        return acc;
      },
      {}
    );
    setUniqueAlbums(Object.values(unique));
  }, [groupedResults.albums]);

  useEffect(() => {
    console.log("uniq artist", uniqueArtists);
  }, [uniqueArtists]);

  if (!query) {
    return <p>Please enter a search term.</p>;
  }

  // Funktion för att gruppera resultat baserat på om 'query' finns i låtnamnet, albumnamn eller artistnamn
  const groupResultsByQueryMatch = (results: Track[], query: string) => {
    return results.reduce<GroupedResults>(
      (acc, result) => {
        const lowerQuery = query.toLowerCase();
        if (result.name.toLowerCase().includes(lowerQuery)) {
          acc.tracks.push(result);
        } else if (result.album_name?.toLowerCase().includes(lowerQuery)) {
          acc.albums.push(result);
        } else if (result.artist_name?.toLowerCase().includes(lowerQuery)) {
          acc.artists.push(result);
        }
        return acc;
      },
      { tracks: [], albums: [], artists: [] }
    );
  };

  const getUniqueArtists = (artists: Track[]) => {
    const artistMap = new Map();
    artists.forEach((artist) => {
      // Använder artistnamnet som nyckel för att säkerställa att varje artist endast läggs till en gång
      if (!artistMap.has(artist.artist_name!.toLowerCase())) {
        artistMap.set(artist.artist_name!.toLowerCase(), artist);
      }
    });
    return Array.from(artistMap.values()); // Konvertera tillbaka till array
  };

  const handlePlay = (index: number) => {
    if (groupedResults.tracks) {
      const tracks = groupedResults.tracks;
      dispatch(setTracksToPlay({ tracks, index }));
      dispatch(setPlayStatus(true));
    }
  };

  //Gör album utskrivften likadan som featured bilderna
  // gör artist till runda precis som på artistpage
  // Eventuellt göra en tags meny upptill med All, artists, songs/tracks, albums
  return (
    <>
      <div className="searchpage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">
          Search results for "{query}"
        </h2>

        {error ? (
          <Error message={error} />
        ) : (
          <>
            <div>
              <h3 className="text-xl font-semibold">
                Tracks matching '{query}'
              </h3>

              <table className="min-w-full divide-y divide-gray-500">
                <thead className="">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4"
                    >
                      Play
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-grow"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
                    >
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                  {groupedResults.tracks.map((track, index) => (
                    <tr key={track.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IoPlay
                            className="cursor-pointer hover:scale-150 text-3xl h-5 w-5 text-teal"
                            aria-hidden="true"
                            onClick={() => handlePlay(index)}
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-5">
                          <img
                            src={track.image}
                            className="h-12 w-12 rounded-md"
                          ></img>
                          <div className="flex flex-col">
                            <span className="text-md bold capitalize">
                              {track.name.length > 25
                                ? `${track.name.slice(0, 25)}...`
                                : track.name}
                            </span>

                            <span className="text-sm capitalize">
                              {track.artist_name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatTime(track.duration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Albums matching '{query}'
              </h3>

              <div className="flex flex-wrap gap-6 w-full mt-2">
                {uniqueAlbums.map((album: Track) => (
                  <div key={album.id} className="w-48">
                    <div className="w-48 relative">
                      <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
                      <img
                        src={album.image}
                        className="h-48 w-48 rounded-xl"
                      ></img>
                    </div>

                    <Link to={`/album/${album.album_id}`}>
                      <p className="text-wrap mt-2 text-md">
                        {album.album_name}
                      </p>
                      <p className="text-wrap text-sm">{album.artist_name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Artists matching '{query}'
              </h3>
              {uniqueArtists.map((artist: Track) => (
                // <div key={artist.id} className="border-white border p-2">
                //   <p>{artist.artist_name}</p>
                // </div>
                <div key={artist.id} className="w-48">
                  <div className="w-48 relative">
                    {/* <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" /> */}
                    <img
                      src={artist.image}
                      className="h-48 w-48 rounded-full"
                    ></img>
                  </div>

                  <Link to={`/artist/${artist.id}`} state={artist}>
                    <p className="text-wrap text-center mt-2">
                      {artist.artist_name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchResults;

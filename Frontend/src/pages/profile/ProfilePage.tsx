import { useSelector } from "react-redux";
import { RootState } from "../../stores/configureStore";
import { Tracklist } from "../../components/Tracklist";
import { playlist } from "../../assets/image/images";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const playlists = useSelector((state: RootState) => state.user.playlists);

  return (
    <div className="profile wrapper">
      <h2 className="text-4xl font-bold tracking-wider mb-8">Profile</h2>
      <h3 className="mb-8">Your favorite tracks</h3>
      {favorites && <Tracklist tracks={favorites} />}
      {playlists && (
        <>
          <h2 className="mt-8 mb-8">Your playlists</h2>
          <div className="flex flex-wrap w-full">
            {playlists.map((list) => (
              <div key={list._id} className="p-3 hover:bg-grey rounded-xl">
                <div className="w-48">
                  <div className="w-48 relative">
                    <img
                      src={playlist}
                      className="h-48 w-48 rounded-[46px]"
                    ></img>
                  </div>

                  <Link
                    to={`/playlist/${list._id}`}
                    state={{ data: list, type: "Private" }}
                  >
                    <p className="pl-3 text-wrap mt-2">{list.name}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;

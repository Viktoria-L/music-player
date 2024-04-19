import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";

const GenreSelector = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between w-full items-center">
        <h3 className="font-semibold text-2xl tracking-wide mb-4">
          Find your genre
        </h3>
        <Link to="/featured" state={{}}>
          Show all
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap mb-4">
        <span className="rounded-full text-sm bold py-2 px-4 self-start bg-slate-500 text-white">
          Electronic
        </span>
        <span className="rounded-full text-sm bold py-2 px-4 self-start bg-slate-500 text-white">
          Rock
        </span>
        <span className="rounded-full text-sm bold py-2 px-4 self-start bg-slate-500 text-white">
          Hiphop
        </span>
      </div>
      <div className="flex flex-wrap gap-5 w-full">
        {/* {featuredData.slice(0, 4).map((data) => ( */}
        <div className="w-48">
          <div className="w-48 relative">
            <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
            <img src="" className="h-48 w-48 rounded-xl"></img>
          </div>

          <Link to={`/`}>
            <p className="text-wrap mt-2">Album</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GenreSelector;

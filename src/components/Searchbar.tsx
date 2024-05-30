import { GoSearch } from "react-icons/go";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
  };

  return (
    <div className="search-bar max-w-lg">
      <form onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 pl-10 text-sm text-white border focus:border-orange rounded-full bg-grey border-grey"
            placeholder=" Search artist, song..."
            required
            value={searchInput}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="absolute inset-y-0 left-0 flex items-center pl-3 text-2xl"
          >
            <GoSearch className="w-4 h-4 pointer-events-none" />
          </button>
        </div>
      </form>
    </div>
  );
};

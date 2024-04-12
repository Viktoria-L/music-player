import { GoSearch } from 'react-icons/go';

export const SearchBar = () => {

    return (
        <div className="search-bar max-w-lg">
            
            <form>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-2xl pointer-events-none">
                        <GoSearch className='w-4 h-4' />
                        
                    </div>
                    <input type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-black rounded-full bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" Search artist, song..." required />
                </div>
            </form>

        </div>
    )
}
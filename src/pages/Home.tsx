import AudioPlayer from "../music-player/maximizedPlayer/AudioPlayer";
import { FeaturedAlbums } from "../components/FeaturedAlbums";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTracksFromApi, setAlbums, setCurrentAlbum } from "../configureStore/musicSlice";
import { Album } from "../models/AlbumResponse";
import { fetchDataFromJamendo } from "../utils/http";


const Home = () => {

  const [musicData, setMusicData] = useState(null);
  const dispatch = useDispatch();
  const currentalbum: Album = useSelector((state) => state.musicInStore.currentAlbum);


  // SE GENERISK HÄMTNING I HTTP.JS FILEN //



//   const fetchDataFromJamendo = async () => {
//     const API_URL = state.api.baseUrl;
//     const clientId = "5bcc718f";

//     try {
//       // limit parameter sätter gränsen för hur många responer,default är 10
//       //   const response = await axios.get(`${API_URL}albums/?client_id=${clientId}&format=jsonpretty&artist_name=anitek`)
//       // GET 10 artists - const response = await axios.get(`${API_URL}artists/?client_id=${clientId}&format=jsonpretty`)

//       // const response = await axios.get(`${API_URL}artists/tracks?client_id=${clientId}&format=jsonpretty`)

//       const response = await axios.get(
//         `${API_URL}tracks/?client_id=${clientId}&format=jsonpretty&limit=5&tags=electronic&featured=1`
//       );
//       //const response = await axios.get(`${API_URL}playlists/?client_id=${clientId}&format=jsonpretty`)

//       if (response) {
//         setMusicData(response.data);
//         dispatch(setTracksFromApi(response.data.results));
//       }
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   };

//   fetchDataFromJamendo<Album[]>('albums', { limit: '10' }, dispatch, setAlbums);



  useEffect(() => {
    console.log(musicData);
  }, [musicData]);

  return (
    <>
      <div className="home flex flex-grow flex-col mt-8 sm:px-8 px-4">
        <h2 className="text-4xl font-bold tracking-wider">Welcome back!</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border m-5"
          onClick={() => fetchDataFromJamendo<Album[]>('albums', { limit: '10', featured: 1, }, dispatch, setAlbums)}
        >
          Fetch featured albums from Jamendo
        </button>

      
                    
                <div className="mt-8">
                    <h3 className="font-semibold text-2xl tracking-wide mb-8">Featured Albums</h3> 
                            <FeaturedAlbums /> 
                                              
                    <div className="flex flex-wrap justify-center gap-4 overflow-x-auto">                    
                        <div className="flex justify-center flex-wrap gap-4">
                        
                        
                        </div>                     
                    </div>
                </div>

        {musicData ? (
          <AudioPlayer musicData={musicData} />
        ) : (
          <p>finns ingen musik laddad</p>
        )}
      </div>
    </>
  );
};

// "tracks":[
//     {
//       "album_id":"104336",
//       "album_name":"Season One",
//       "id":"887209",
//       "name":"Scene 5",
//       "duration":"325",
//       "releasedate":"2011-12-29",
//       "license_ccurl":"http:\/\/creativecommons.org\/licenses\/by-nc-sa\/3.0\/",
//       "album_image":"https:\/\/usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887209",
//       "image":"https:\/\/usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887209",
//       "audio":"https:\/\/prod-1.storage.jamendo.com\/?trackid=887209&format=mp31&from=app-devsite",
//       "audiodownload":"https:\/\/prod-1.storage.jamendo.com\/download\/track\/887209\/mp31\/",
//       "audiodownload_allowed":true
//     },

export default Home;

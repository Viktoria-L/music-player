// Här lägger jag sånt som kan vara till nytta eller behöver skrivas om 


 // ----------------- ALLA GET FUNKTIONER OCH VAD DE HÄMTAR ------------ //
  // Tracks - const response = await axios.get(`${API_URL}tracks/?client_id=${clientId}&format=jsonpretty&limit=5&tags=electronic&featured=1`)
  // similar Tracks - const response = await axios.get(`${API_URL}tracks/similar?client_id=${clientId}
  // artists - const response = await axios.get(`${API_URL}artists/?client_id=${clientId}&format=jsonpretty`)
  // albums från Anitek - const response = await axios.get(`${API_URL}albums/?client_id=${clientId}&format=jsonpretty&artist_name=anitek`)
  // albums  - const response = await axios.get(`${API_URL}albums/?client_id=${clientId}&format=jsonpretty`)
  // albums tracks  - const response = await axios.get(`${API_URL}albums/tracks?client_id=${clientId}&format=jsonpretty&artist_name=XXXX`)
  // feeds - const response = await axios.get(`${API_URL}feeds/?client_id=${clientId}&format=jsonpretty&limit=1&order=id_desc`)
  // playlists  - const response = await axios.get(`${API_URL}playlists/?client_id=${clientId}&format=jsonpretty`)

    //----------- GENRES ------------------------//
  // lounge, classical, electronic, jazz, pop, hiphop,
  // relaxation, rock, songwriter, world, metal, soundtrack.

  //----------- VIKTIGA PARAMETRAR ----------- //
  // * limit - default 10, gränsen för hur många svar i responsen
  //* tags / fuzzytags - för sökning av genre
  // * include - för att få mer info i responsen, []enum: {licenses, musicinfo, stats, lyrics}
  // * featured=1 - =1 är true, visar en chart selection som Jamendo själva valt ut
  // * groupby=artist_id
  // * boost  - bättre relevans på sökningen t.ex. mest populära finns flera, default popularity_month
  // * search - 	A free text search that operates considering track, album and artist name as well as tags (genres, instruments, ...) and similar artists

  // If you are implementing some charts and you whish to trust our selections,
  // the 'featured' parameter let you filter-in all the tracks selected by our music managers.
  // In particular, to implement a genre-based chart in your application,
  // we suggest to choose one of our featured selections:
  // lounge, classical, electronic, jazz, pop, hiphop, relaxation, rock, songwriter, world, metal, soundtrack.
  // Declare one of these genres in the 'tags' parameter, combine it with 'featured=1', 'groupby=artist_id',
  // and then boost (boost, not order!) choosing your favorite rating.
  // Your chart should look fantastic!.
  

//funktion för att rendera till albumsida?
const handleAlbumClick = () => {
    dispatch(setCurrentAlbum(album));
    // Eventuellt navigera till en detaljsida eller uppdatera UI för att visa albumdetaljer
  };
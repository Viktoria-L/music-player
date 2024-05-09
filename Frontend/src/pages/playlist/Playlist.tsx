import { useLocation } from "react-router-dom";

//TODO, behöver kunna ta in både mina sparade spellistor och de officiella
//TODO, hämta data från playlist/tracks/ id som parameter
//TODO, kolla hur datat på en playlist ser ut
//TODO state eller hämta via id

const Playlist = () => {
  const { state } = useLocation();

  return <div className="playlist wrapper">Playlist</div>;
};

export default Playlist;

import Playlists  from "../library-sections/Playlists";

const PlaylistsPage = () => {
  return (
    <>
      <main data-cy = "playlists">
        <header className="text-lg text-white font-bold">PLAYLISTS</header>

        <Playlists></Playlists>
      </main>
    </>
  );
};

export default PlaylistsPage;

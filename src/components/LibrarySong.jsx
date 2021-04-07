const LibrarySong = ({
  song,
  song: { cover, name, artist },
  setCurrentSong,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
  };

  return (
    <div
      className={"library-song " + (song.active && "selected")}
      onClick={songSelectHandler}
    >
      <img src={cover} alt="no-cover" />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;

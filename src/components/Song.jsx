const Song = ({ currentSong: { cover, name, artist } }) => {
  return (
    <div className="song-container">
      <img src={cover} alt="no-cover" />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  );
};

export default Song;

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const animationPercentage = Math.floor(
    (songInfo.current / songInfo.duration) * 100
  );

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo((prev) => ({ ...prev, current: e.target.value }));
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[currentIndex + 1] ?? songs[0]);
    } else {
      setCurrentSong(songs[currentIndex - 1] ?? songs[songs.length - 1]);
    }
  };

  useEffect(() => {
    setSongs((prev) =>
      prev.map((prevSong) => {
        if (prevSong.id === currentSong.id) {
          return { ...prevSong, active: true };
        } else {
          return { ...prevSong, active: false };
        }
      })
    );
    if (isPlaying) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  }, [currentSong]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.current)}</p>
        <div className="track">
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.current}
            onChange={dragHandler}
            style={{
              background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
            }}
          />
          <div
            className="animate-track"
            style={{ transform: "translateX(" + animationPercentage + "%)" }}
          ></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;

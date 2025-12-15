import {
  useEffect,
  useRef,
  useState,
  type HTMLInputTypeAttribute,
} from "react";
import "../../main/index.css";
import { TrackData } from "../pages/library/components/library-sections/liked-tracks-array/likedTracks";
import { motion } from "motion/react";
import {
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  CirclePlay,
  CirclePause,
  UserPlus,
  Heart,
  ListVideo,
  DotSquare,
  icons,
} from "lucide-react";
import { Volume1, Volume2, VolumeX } from "lucide-react";

import {
  usePlayerAppDispatch,
  usePlayerAppSelector,
} from "../../redux/hooks/playerHook";
import {
  setMusicPlayable,
  setTrackDuration,
  setTrackCurrentTime,
  setPlayerData,
  setIsTrackOnRepeat,
  setIsTrackEnded,
  setTrackTime,
} from "../../redux/storages/playerSlice";

import { setAllLikedTracks } from "../../redux/storages/globalSlice";

import { CurrentTrack } from "./CurrentTrack";
import { VolumePopup } from "./PlayerPopups";
import { PlayerButton } from "./PlayerButton";

import { handleStateForPlayerTrack } from "../../database-controllers/stopBeginTrack";
import {
  useGlobalAppDispatch,
  useGlobalAppSelector,
} from "../../redux/hooks/globalHook";
// import { handleSetTracksToDefault } from "../../database-controllers/resetAllTracks";

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRangeRef = useRef<HTMLInputElement>(null);

  const progressbarRef = useRef<HTMLDivElement>(null);
  const progressbarRangeRef = useRef<HTMLInputElement>(null);

  // volume value and when hover useStates
  const [isProgressbarDragging, setIsProgressbarDragging] =
    useState<boolean>(false);
  const [isVolumeHover, setIsVolumeHover] = useState(false);
  const [volume, setVolume] = useState({
    vol: 50,
    icons: [{ icon: Volume2 }, { icon: Volume1 }, { icon: VolumeX }],
  });
  const previousVolume = useRef(volume.vol);
  const [isVolumeDisabled, setIsVolumeDisabled] = useState<boolean>(false);

  const {
    currentTrack,
    isAudioPlaying,
    trackDuration,
    trackCurrentTime,
    isTrackEnded,
    trackRepeatId,
    trackTime,
  } = usePlayerAppSelector((state) => state.player);

  const likedTracks = useGlobalAppSelector(
    (state) => state.global_player.likedTracks
  );

  const track = Object.values(likedTracks).find((t) => t.id == currentTrack.id);
  const isPlayable = track?.playable ?? false;
  const isSetted = track?.setted;

  // when progressbar hover
  const [isProgressbarHover, setIsProgressbarHover] = useState(false);
  const [progressbar, setProgressbar] = useState(0);
  const playerDispatch = usePlayerAppDispatch();
  const globalDispatch = useGlobalAppDispatch();

  const getTracks = async () => {
    let data:any
    const updatedLikedTracks = await fetch(
      "http://localhost:5001/likedTracks"
    ).then((res) => res.json().then(data));  
    return data;
  }

  const handlePlayTrackAndSetTitle = async () => {
    playerDispatch(
      setPlayerData({
        data: { ...currentTrack, playable: !currentTrack.playable },
      })
    );
    console.log("Track playable is (in slice): ", !currentTrack.playable);

    console.log("Track playable is: ", currentTrack.playable);

    // await handleSetTracksToDefault();
    await handleStateForPlayerTrack(currentTrack);


    // const updatedLikedTracks = await getTracks();

    const updatedLikedTracks = await fetch(
      "http://localhost:5001/likedTracks"
    ).then((res) => res.json());
    globalDispatch(
      setAllLikedTracks({ likedTracksFromDb: updatedLikedTracks })
    );

    // dispatch()
    // if (!isAudioPlaying) {
    //   document.title = audioRef.current.src.slice(28, -4).replaceAll("_", " ");
    //   console.log(audioRef.current.src);
    // }
    // else {
    //   document.title = "stop"
    // }
  };

  useEffect(() => {
    console.log("progressbar dragging: ", isProgressbarDragging);
    if (!audioRef.current) return;
    if (isProgressbarDragging && (isPlayable || !isPlayable)) {
      audioRef.current.pause();
    }
    if (!isProgressbarDragging && isPlayable) {
      audioRef.current.play();
    }
  }, [isProgressbarDragging]);

  useEffect(() => {
    console.log();
    playerDispatch(setTrackCurrentTime({ current: progressbar }));
  }, [progressbar]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!volumeRangeRef.current) return;
    if (isVolumeDisabled) {
      // write old value of volume
      previousVolume.current = volume.vol;
      // set volume to zero
      setVolume((prev) => ({ ...prev, vol: 0 }));
    } else {
      // set old value after volume disabling
      setVolume((prev) => ({ ...prev, vol: previousVolume.current }));

      // volume.vol = audioRef.current.volume
    }
  }, [isVolumeDisabled]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume.vol / 100;
  }, [volume.vol]);

  // useEffect(() => {})
  useEffect(() => {
    // if track ended
    if (progressWidth == 100) {
      // set all tracks on default
      // handleSetTracksToDefault(/)
      // track on repeat
      if (trackRepeatId != 3) {
        playerDispatch(setIsTrackEnded({ ended: true }));
        playerDispatch(setTrackCurrentTime({ current: 0 }));
        playerDispatch(setMusicPlayable({ playable: false }));
      } else {
        playerDispatch(setIsTrackEnded({ ended: false }));
        audioRef.current?.play();
      }
    } else {
      playerDispatch(setIsTrackEnded({ ended: false }));
    }
  }, [trackCurrentTime]);

  const progressWidth = (trackCurrentTime / trackDuration) * 100;

  useEffect(() => {
    playerDispatch(setTrackTime());
  }, [trackCurrentTime]);

  // set track stop/play. its depends on isPlayable and isSetted
  useEffect(() => {
    if (!audioRef.current) return;
    // audioRef.current?.volume = volumeRangeRef.current?.value;/
    if (isPlayable == true) {
      audioRef.current?.play();
    }
    if (isPlayable == false) {
      audioRef.current?.pause();
    }
  }, [isPlayable, isSetted]);

  if (!currentTrack) return null;

  return (
    <>
      <main
        className={`fixed  bg-[rgb(48,48,48)] w-[100%] z-[1000] h-[3rem] flex flex-col justify-center align-center place-self-center z-[1000] left-0 bottom-0 `}
      >
        <div className="h-full text-white  sm:w-[40rem] md:w-[50rem] lg:w-[70rem] place-self-center flex  align-center justify-between relative  ">
          <section className=" gap-[.8rem] border-red-500 relative flex flex-row place-self-center  w-fit ">
            <SkipBack className="place-self-center" />

            <button
              onClick={(e) => {
                handlePlayTrackAndSetTitle();
                e.preventDefault();
              }}
              type="button"
              className={`  z-[1101] h-[90%] aspect-[1/1]  top-0 opacity-100`}
            >
              {isPlayable && !isTrackEnded ? (
                <CirclePause
                  color="white"
                  size={30}
                  className="place-self-center opacity-100"
                />
              ) : (
                <CirclePlay
                  color="white"
                  size={30}
                  className="place-self-center opacity-100"
                />
              )}
              {/* <SkipBack color= "white" size ={30} strokeWidth={3} className="place-self-center opacity-100"/> */}
            </button>

            <SkipForward className="place-self-center" />
          </section>
          <section className=" gap-[.8rem] border-red-500 relative flex place-self-center justify-center w-fit  ">
            <button>
              <Shuffle size={15} className="place-self-center"></Shuffle>
            </button>
            <button onClick={() => playerDispatch(setIsTrackOnRepeat())}>
              {trackRepeatId == 1 ? (
                <Repeat size={15} className="place-self-center"></Repeat>
              ) : trackRepeatId == 2 ? (
                <Repeat
                  size={15}
                  color="rgb(255,85,0)"
                  className="place-self-center"
                ></Repeat>
              ) : (
                <Repeat1
                  size={15}
                  color="rgb(255,85,0)"
                  className="place-self-center"
                ></Repeat1>
              )}
            </button>
          </section>

          <section className="relative place-self-center h-[100%] border-red-500 md:w-[40%] lg:w-[55%]">
            <div
              ref={progressbarRef}
              className=" place-self-center flex gap-[.5rem] justify-center align-center  w-full h-full"
            >
              <p className=" text-white w-fit font-bold text-[12px] place-self-center">
                {trackCurrentTime == 0 ? "0:00" : trackTime[0]}
              </p>
              <div className="w-full h-[20px] group relative pointer place-self-center flex align-center ">
                {" "}
                {/* <div className="w-full h-[20%] bg-[rgb(130,130,130)] absolute  place-self-center"> </div> */}
                <motion.div
                  style={{ width: `${progressWidth}%` }}
                  className="bg-[rgb(255,85,0)] pointer-events-none z-[10] absolute place-self-center flex align-center h-[2px] "
                >
                  <motion.div className="absolute bg-black right-[-4px] transition duration-200 opacity-[0] place-self-center group-hover:opacity-[1]  z-[10000] w-[8px] aspect-[1/1] pointer  rounded-[10rem] shadow-[inset_0px_0px_0px_1.5px_rgb(255,85,0)]"></motion.div>
                </motion.div>
                <motion.div className="bg-[rgb(70,70,70)] w-full pointer-events-none z-[1] absolute place-self-center flex align-center h-[2px] "></motion.div>
                <motion.input
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setIsProgressbarDragging(true);
                  }}
                  onPointerLeave={() => setIsProgressbarDragging(false)}
                  ref={progressbarRangeRef}
                  type="range"
                  min={0}
                  max={trackDuration || 0}
                  value={trackCurrentTime}
                  name="progressbar"
                  id="progressbar"
                  onChange={(e) => {
                    e.stopPropagation();
                    const newTime = Number(e.target.value);
                    if (audioRef.current)
                      audioRef.current.currentTime = newTime;
                    setProgressbar(newTime);
                    console.log("Progress: ", Number(e.target.value));
                  }}
                  className=" active:outline-none  range-custom  hover:border-none active:border-none h-[20px]  z-[5]  [transform-origin:center] w-full place-self-center"
                  step={trackDuration / 10000}
                />
              </div>
              <p className=" text-white  w-fit text-[12px] place-self-center">
                <span className="font-bold">-{trackTime[1]}</span>
              </p>
              <div
                onMouseEnter={() => setIsVolumeHover(true)}
                onMouseLeave={() => setIsVolumeHover(false)}
                className=" relative  flex justify-center align-center"
              >
                <button
                  type="button"
                  onClick={() => setIsVolumeDisabled((prev) => !prev)}
                >
                  {(() => {
                    const Icon =
                      volume.icons[
                        volume.vol == 0 ? 2 : volume.vol >= 60 ? 0 : 1
                      ].icon;
                    return (
                      <Icon
                        size={20}
                        className="place-self-center cursor-pointer"
                      ></Icon>
                    );
                  })()}
                </button>

                {/* Volume popup hover */}
                <motion.div
                  initial={{ opacity: 0, y: 50, pointerEvents: "auto" }}
                  animate={
                    isVolumeHover
                      ? { opacity: 1, y: -100, pointerEvents: "auto" }
                      : { opacity: 0, y: 50, pointerEvents: "none" }
                  }
                  className={` w-[3rem] h-[10rem] rounded-[.3rem] border border-[rgb(70,70,70)] absolute  place-self-center flex justify-center align-center absolute  bg-[rgb(18,18,18)]  h-[5rem] text-white`}
                >
                  <div className="max-h-[8rem] absolute h-[8rem] w-[10px] place-self-center flex justify-center">

                  <div style = {{ height: `${volume.vol}%`}} className={`w-[6px] bg-white bg-red-500 z-[-1] bottom-[0] absolute `}></div>
                  </div>

                  <input 
                    onPointerDown={(e) => {
                      e.stopPropagation();
                    }}
                    ref={volumeRangeRef}
                    type="range"
                    min={0}
                    max={100}
                    value={volume.vol}
                    name="volume"
                    id="volume"
                    onChange={(e) => {
                      e.stopPropagation();
                      setVolume((prev) => ({
                        ...prev,
                        vol: Number(e.target.value),
                      }));
                    }}
                    className=" active:outline-none range-custom  hover:border-none active:border-none h-[4px] bg-[rgb(70,70,70)]  [transform:rotate(-90deg)] [transform-origin:center] w-[8rem] place-self-center"
                    step={1}
                  />
                  <div className="[transform:rotate(45deg)] rounded-br-sm border-b border-[rgb(70,70,70)] border-r   z-[-100] [transform-origin:center] bg-[rgb(18,18,18)] aspect-[1/1] w-[35%] absolute bottom-[-.52rem]"></div>
                </motion.div>
              </div>
              {isSetted ? (
                <audio
                  onTimeUpdate={(e) => {
                    e.preventDefault();
                    const time = e.currentTarget.currentTime;
                    playerDispatch(
                      setTrackCurrentTime({
                        current: time,
                      })
                    );
                    playerDispatch(setTrackTime());
                  }}
                  onLoadedMetadata={(e) => {
                    e.preventDefault();
                    playerDispatch(
                      setTrackDuration({ duration: e.currentTarget.duration })
                    );
                  }}
                  ref={audioRef}
                  id="myAudio"
                  src={`../../music/${currentTrack.audio}`}
                ></audio>
              ) : (
                ""
              )}
            </div>
          </section>


          {/* track title in player */}
          <div className=" h-full  w-[12.5%] ">
            <CurrentTrack></CurrentTrack>
          </div>
          <section className=" gap-[1.5rem] border-red-500 relative flex place-self-center align-center justify-center w-fit ">
            <button>
              <Heart size={15} color={`${currentTrack.liked ? "rgb(255,85,0)": "white"}`} className="place-self-center" />
            </button>
            <button>
              <UserPlus size={15} className="place-self-center" />
            </button>
            <button>
              <ListVideo size={15} className="place-self-center" />
            </button>
          </section>
        </div>
      </main>
    </>
  );
};

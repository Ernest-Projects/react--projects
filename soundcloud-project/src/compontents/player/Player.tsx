import { useEffect, useRef, useState } from "react";
import '../../main/index.css'

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
  setIsTrackOnRepeat,
  setIsTrackEnded,
  setTrackTime,
} from "../../redux/storages/playerSlice";

import { CurrentTrack } from "./CurrentTrack";
import { VolumePopup } from "./PlayerPopups";

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressbarRef = useRef<HTMLDivElement>(null);
  const volumeRangeRef = useRef<HTMLInputElement>(null);

  const [isHover, setIsHover] = useState(false);
  const [volume, setVolume] = useState({vol: 50, icons: [{icon: Volume2}, {icon: Volume1}, {icon: VolumeX}]});
  const {
    isAudioPlaying,
    trackDuration,
    trackCurrentTime,
    isTrackEnded,
    trackRepeatId,
    trackTime,
  } = usePlayerAppSelector((state) => state.player);
  const dispatch = usePlayerAppDispatch();

  const handlePlayTrackAndSetTitle = () => {
    if (!audioRef.current) return;
    dispatch(setMusicPlayable());
    if (!isAudioPlaying) {
      document.title = audioRef.current.src.slice(28, -4).replaceAll("_", " ");
      console.log(audioRef.current.src);
    }
    else {
      document.title = "stop"
    }
  }
  useEffect(() => {
    if(!audioRef.current) return
    audioRef.current.volume = volume.vol / 100;
  }, [volume])

  useEffect(() => {

    // track on repeat
    if (progressWidth == 100) {
      if (trackRepeatId != 3) {
        dispatch(setIsTrackEnded({ ended: true }));
        dispatch(setTrackCurrentTime({ current: 0 }));
        dispatch(setMusicPlayable());
      } else {
        dispatch(setIsTrackEnded({ ended: false }));
        audioRef.current?.play();
      }
    } else {
      dispatch(setIsTrackEnded({ ended: false }));
    }
  }, [trackCurrentTime]);

  const progressWidth = (trackCurrentTime / trackDuration) * 100;

  useEffect(() => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    // audioRef.current?.volume = volumeRangeRef.current?.value;
  }, [isAudioPlaying]);

  return (
    <>
      <main className="fixed  w-[100%] z-[1000] h-[2.5rem] flex flex-col justify-center align-center place-self-center z-[1000] left-0 bottom-0 bg-[rgb(48,48,48)]">
        <div className="h-full text-white  sm:w-[40rem] md:w-[50rem] lg:w-[70rem] place-self-center flex  align-center justify-between relative  ">
          <section className=" gap-[.8rem] border-red-500 relative flex flex-row place-self-center  w-fit ">
            <SkipBack className="place-self-center" />
            <motion.button
              onClick={() =>  handlePlayTrackAndSetTitle()}
              className="border border-red-500 w-fit h-fit place-self-center"
            >
              {isAudioPlaying && !isTrackEnded ? (
                <CirclePause size={35} className="place-self-center" />
              ) : (
                <CirclePlay size={35} className="place-self-center" />
              )}
            </motion.button>

            <SkipForward className="place-self-center" />
          </section>
          <section className=" gap-[.8rem] border-red-500 relative flex place-self-center justify-center w-fit  ">
            <button>
              <Shuffle size={15} className="place-self-center"></Shuffle>
            </button>
            <button onClick={() => dispatch(setIsTrackOnRepeat())}>
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

          <section className="relative place-self-center h-[100%] border-red-500 md:w-[40%] lg:w-[50%]">
            <div
              ref={progressbarRef}
              className=" place-self-center flex gap-[.5rem] justify-center align-center  w-full h-full"
            >
              <p className=" text-white w-fit font-bold text-sm place-self-center">
                {trackCurrentTime == 0 ? "0:00" : trackTime[0]}
              </p>
              <div className="w-full h-[2px] bg-[rgb(130,130,130)] place-self-center">
                {" "}
                <motion.div
                  animate={{ width: `${progressWidth}%` }}
                  className="bg-[rgb(255,85,0)] h-full"
                ></motion.div>
              </div>
              <p className=" text-white  w-fit text-sm place-self-center">
                <span className="font-bold">-{trackTime[1]}</span>
              </p>
              <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className=" relative  flex justify-center align-center">
                {(() =>{
                  const Icon = volume.icons[volume.vol == 0 ? 2 : volume.vol >= 60 ? 0: 1].icon;
                  return <Icon
                  size={20}
                  className="place-self-center cursor-pointer"
                  ></Icon>
                })()}
                
                {/* Volume popup hover */}
                <motion.div
                  initial = {{opacity:0, y:50, pointerEvents: "auto"}}
                  animate = {isHover ? {opacity: 1, y: -100, pointerEvents: "auto"} : {opacity: 0, y:50, pointerEvents: "none"}}
                 
                  className={` w-[3rem] h-[10rem] rounded-[.3rem] border border-[rgb(70,70,70)] absolute  place-self-center flex justify-center align-center absolute  bg-[rgb(18,18,18)]  h-[5rem] text-white`}
                >
                    <input
  onPointerDown={(e) => e.stopPropagation()}
                      ref={volumeRangeRef}
                      type="range"
                      min={0} 
                      max={100}
                      value={volume.vol}
                      name="volume"
                      id="volume"
                      onChange={(e)=> { e.stopPropagation(); setVolume((prev) => ({...prev, vol:Number(e.target.value)}))}}
                      className=" active:outline-none range-custom  hover:border-none active:border-none h-[4px] bg-[rgb(70,70,70)]  [transform:rotate(-90deg)] [transform-origin:center] w-[8rem] place-self-center"
                      step={1}
                    />
                    <div className="[transform:rotate(45deg)] rounded-br-sm border-b border-[rgb(70,70,70)] border-r   z-[-100] [transform-origin:center] bg-[rgb(18,18,18)] aspect-[1/1] w-[35%] absolute bottom-[-.52rem]"></div>
                </motion.div>
              </div>
              <audio
                onTimeUpdate={(e) => {
                  dispatch(
                    setTrackCurrentTime({
                      current: e.currentTarget.currentTime,
                    })
                  );
                  dispatch(setTrackTime());
                }}
                onLoadedMetadata={(e) => {
                  dispatch(
                    setTrackDuration({ duration: e.currentTarget.duration })
                  );
                }}
                ref={audioRef}
                id="myAudio"
                src="../../music/with_you.mp3"
              ></audio>
            </div>
          </section>

          <div className=" h-full  w-[12.5%] ">
            <CurrentTrack></CurrentTrack>
          </div>
          <section className=" gap-[1.5rem] border-red-500 relative flex place-self-center align-center justify-center w-fit ">
            <button>
              <Heart size={15} className="place-self-center" />
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

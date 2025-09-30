import { useEffect, useRef, useState } from "react";

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
} from "../../redux/storages/playerSlice";

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressbarRef = useRef<HTMLDivElement>(null);

  const {isAudioPlaying, trackDuration,trackCurrentTime,isTrackEnded,isTrackOnRepeat} = usePlayerAppSelector((state)=> state.player);
  const dispatch = usePlayerAppDispatch();

  useEffect(() => {
    // track on repeat
    if (progressWidth == 100) {
      if (!isTrackOnRepeat) {
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
    if (isAudioPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <>
      <main className="fixed w-[100%] h-[2.5rem] flex flex-col justify-center align-center place-self-center z-[1000] left-0 bottom-0 bg-[rgb(48,48,48)]">
        <div className="h-full text-white w-[80vw] place-self-center flex  align-center justify-between relative  ">
          <section className=" gap-[.8rem] border-red-500 relative flex flex-row place-self-center  w-fit ">
            <SkipBack className="place-self-center" />
            <motion.button
              onClick={() => dispatch(setMusicPlayable())}
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
              {isTrackOnRepeat ? (
                <Repeat1 size={15} className="place-self-center"></Repeat1>
              ) : (
                <Repeat size={15} className="place-self-center"></Repeat>
              )}
            </button>
          </section>

          <section className="relative place-self-center h-[100%] border-red-500 w-[50%]">
            <div
              ref={progressbarRef}
              className=" place-self-center flex gap-[.5rem] justify-center align-center  w-full h-full"
            >
              <p className=" text-white w-fit text-sm place-self-center">
                {trackCurrentTime.toFixed(0)}
              </p>
              <div className="w-full h-[2px] bg-[rgb(130,130,130)] place-self-center">
                {" "}
                <div
                  style={{ width: `${progressWidth}%` }}
                  className="bg-[rgb(255,85,0)] h-full"
                ></div>
              </div>
              <p className=" text-white w-fit text-sm place-self-center">
                -3:29
              </p>
              <Volume1 size={20} className="place-self-center"></Volume1>
              <audio
                onTimeUpdate={(e) =>
                  dispatch(
                    setTrackCurrentTime({
                      current: e.currentTarget.currentTime,
                    })
                  )
                }
                onLoadedMetadata={(e) =>
                  dispatch(
                    setTrackDuration({ duration: e.currentTarget.duration })
                  )
                }
                ref={audioRef}
                id="myAudio"
                src="../../music/test.mp3"
              ></audio>
            </div>
          </section>

          <div className=" h-full border-red-500 w-[15%] border"></div>
          <section className=" gap-[.8rem] border-red-500 relative flex place-self-center align-center justify-center w-fit ">
            <Heart size={15} className="place-self-center" />
            <UserPlus size={15} className="place-self-center" />
            <ListVideo size={15} className="place-self-center" />
          </section>
        </div>
      </main>
    </>
  );
};

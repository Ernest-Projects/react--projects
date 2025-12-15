import { useEffect, useState } from "react";

import { Play, Heart, UserPlus, Ellipsis, ListVideo } from "lucide-react";

import { CirclePlay, CirclePause } from "lucide-react";
import { motion } from "motion/react";

import {
  usePlayerAppDispatch,
  usePlayerAppSelector,
} from "../../redux/hooks/playerHook";
import {
  setPlayerData,
  setMusicPlayable,
  setCurrentTrackPlayablePayload,
  setCurrentTrackSettedPayload,
} from "../../redux/storages/playerSlice";
import { PlayerButton } from "../player/PlayerButton";

import type { TrackProps } from "src/app-types/Track";
import {
  useGlobalAppDispatch,
  useGlobalAppSelector,
} from "../../redux/hooks/globalHook";
// import {
  // setAllLikedTracks,/
  // setResetAllTracks,
  // setUpdateSelectedTrack,
  // type GlobalAppDispatch,
// } from "../../redux/storages/globalSlice";
import { globalAgent } from "http";

// import { handleStateForPlayerTrack } from "../../database-controllers/stopBeginTrack";
// import { handleSetTracksToDefault } from "../../database-controllers/resetAllTracks";

import type { RootState, AppDispatch, AppThunk } from "../../redux/storages/store";
import type { ThunkAction } from "redux-thunk";
import { useDispatch } from "react-redux";

// import {Pla}

type TrackTitleProps = {
  trackData: TrackProps;
  // isTrackTitleHover:boolean
};
export const TrackTitle = ({ trackData }: TrackTitleProps) => {
  const currentTrack = usePlayerAppSelector(
    (state) => state.player.currentTrack
  );

  const dispatch = useDispatch<AppDispatch>();

  const likedTracks = useGlobalAppSelector(
    (state) => state.global_player.likedTracks
  );

  // get current track playble and setted (currentTrack not suitable for this)
  const track = Object.values(likedTracks).find((t) => t.id == trackData.id);
  const isPlayable = track?.playable ?? false;
  const isSetted = track?.setted;
  const isLiked  = track?.liked;
  // const playerDispatch = usePlayerAppDispatch();
  // const globalDispatch = useGlobalAppDispatch();
  // styles for three buttons in title
  const buttonIcons = [Heart, UserPlus, Ellipsis];
  const buttonAttr = {
    size: 15,
    color: `${trackData.liked ? "orange" : "white"}`,
    strokeWidth: 3,
    className: "place-sel-center hover:opacity-70 transition",
  };

  // const handleCombineHandlers =  (track : Track): ThunkAction<Promise<void>, RootState, unknown, any> => {
  //   return async (dispatch: AppDispatch)
  // }

   const handleCombineHandlers = (
    track: TrackProps
  ): AppThunk<Promise<void>> => async (dispatch: AppDispatch, getState) => {

    console.log("==========================================================")

    
    // async func that resetted all db (playable = false, setted = false)
    // await handleSetTracksToDefault();
    dispatch(
      setPlayerData({
        data: { ...track, playable: !isPlayable, setted: true },
      })
    );
    // get actual redux state of track
    const currentTrack = getState().player.currentTrack;
    console.log("CurrentTrack playable:", isPlayable)

    // set this actual track from redux in async set track in db func
    // await handleStateForPlayerTrack(currentTrack);
    console.log("CurrentTrack playable:", isPlayable)
    
    // ressetung all tracks in redux state
    // dispatch(setResetAllTracks());
      const updatedLikedTracks = await fetch(
        "http://localhost:5001/likedTracks"
      ).then((res) => res.json());
      // and set new changed db ( current track: playable = true, setted = true)
      // dispatch(setAllLikedTracks({ likedTracksFromDb: updatedLikedTracks }));
    console.log("CurrentTrack playable:", isPlayable)
      
      // state for isPlayed, isSetted variables in code
      // dispatch(
        // setUpdateSelectedTrack({
          // id: track.id,
          // data: { playable: currentTrack.playable, setted: true },
        // })
      // );
    console.log("CurrentTrack playable: (isPlayable)", isPlayable)
    console.log("CurrentTrack playable: (currentTrack)", currentTrack.playable)

    };
    
    

  // const handleCombineHandlers = async (track: Track) =>  {

  //   // set current track in player (redux first)

  //   // full resetting of all tracks in whole app
  //   globalDispatch(setResetAllTracks());

  //   // update specific  for
  //   globalDispatch(setUpdateSelectedTrack({id: track.id, data: {playable: !track.playable, setted: true}}))

  //   playerDispatch(setPlayerData({ data: {...track, playable: !currentTrack.playable, setted: true} }));
  //   // async reloading the db (playable = false, setted = false)
  //   await handleSetTracksToDefault();

  //   // const currentTrack = getState().player.currentTrack;
  //   await handleStateForPlayerTrack(currentTrack)

  //   // get updated db
  //   const updatedLikedTracks = await fetch(
  //     "http://localhost:5001/likedTracks"
  //   ).then((res) => res.json());

  //   // set changed liked tracks
  //   globalDispatch(setAllLikedTracks({ likedTracksFromDb:  updatedLikedTracks}));

  //   // fetch(`http://localhost:5000/likedTracks/${track.id}`, {
  //     //   method: "PATH",
  //   //   headers: {
  //   //     "Content-type": "application/json"
  //   //   },
  //   //   body: JSON.stringify ({ z
  //   //   setted: true,
  //   //   playable: true
  //   //   })
  //   // })
  // };
  // for stylization in title when hovering
  const [isTitleHover, setIsTitleHover] = useState<boolean>(false);
  return (
    <>
      <div
        className={`flex h-full rounded-[0.2rem]  flex-col overflow-hidden p-0  overflow-[hidden]  w-full 
      
        `}
      >
        <div
          onMouseLeave={() => setIsTitleHover(false)}
          onMouseEnter={() => setIsTitleHover(true)}
          className="  w-full h-full  relative flex justify-center align-center overflow-[hidden]"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isTitleHover ? 0.5 : 0 }}
            className={` flex  rounded-[.2rem] m-0 align-center items-center bg-white justify-center   w-full h-full absolute`}
          ></motion.button>

          <motion.button
            onClick={() => dispatch(handleCombineHandlers(trackData))}
            initial={{ opacity: 0, color: "black" }}
            animate={{ opacity: isTitleHover ? 1 : 0 }}
            whileHover={{ opacity: 0.6, color: "gray" }}
            className={`absolute justify-center place-self-center flex aspect-[1/1] place-self-center bg-[rgb(255,255,255)] rounded-[10rem] w-[35%]`}
          >
            {!isPlayable ? (
              <CirclePlay
                color="black"
                size={30}
                strokeWidth={3}
                className="place-self-center pointer-events-none"
              />
            ) : (
              <CirclePause
                color="black"
                size={30}
                strokeWidth={3}
                className="place-self-center pointer-events-none"
              />
            )}
          </motion.button>

          <img
            src={`/tracksTitles/${trackData.image}`}
            className="w-full h-full  aspect-[1/1]"
            style={{ objectFit: "fill" }}
            alt=""
          />
          <section
            className={`${
              isTitleHover ? "opacity-100" : "opacity-0"
            } transition gap-[1.5rem] bottom-[1rem] right-[1rem] text-black bg-transparent h-fit w-fit absolute border-red-500  flex flex-row place-self-center align-center justify-center w-fit `}
          >
            <section className=" gap-[1.5rem] border-red-500 relative flex place-self-center align-center justify-center w-fit ">
            <button>
              <Heart size={15} color={`${isLiked ? "rgb(255,85,0)": "white"}`} className="place-self-center" />
            </button>
            <button>
              <UserPlus size={15} className="place-self-center" />
            </button>
            <button>
              <ListVideo size={15} className="place-self-center" />
            </button>
          </section>
          </section>
        </div>
        <p className="font-bold whitespace-nowrap leading-[1.1rem] p-[.4rem] md:text-[12px] lg:text-[14px]  overflow-hidden text-ellipsis  text-white ">
          <span>
            <span className="hover:text-[rgb(113,113,113)]">
              {trackData.title.name}
            </span>{" "}
            <br />
            <span
              className={`text-[rgb(152,152,152)] text-[15px]
              } hover:text-[rgb(72,72,72)]  text-ellipsis p-0 m-0 whitespace-nowrap`}
            >
              {trackData.title.subtitle}
            </span>
          </span>
        </p>
        {/* <p className="text-white"> {item}</p> */}
      </div>
    </>
  );
};

import { motion } from "motion/react";
import { CirclePause, CirclePlay } from "lucide-react";
import {
  usePlayerAppSelector,
  usePlayerAppDispatch,
} from "../../redux/hooks/playerHook";
import {
  setPlayerData,
  setMusicPlayable,
} from "../../redux/storages/playerSlice";


interface TrackProps  {
 id: number,
  audio: string,
    image: string,
    title: {
        name: string,
        subtitle: string
    },
    liked: boolean,
    setted: boolean,
    playable:boolean
}
type TrackTitleProps = {
  trackData: TrackProps;
  // isTrackTitleHover:boolean
};

export const PlayerButton = ({trackData}: TrackTitleProps) => {
  const dispatch = usePlayerAppDispatch();
  const isAudioPlaying = usePlayerAppSelector(
    (state) => state.player.isAudioPlaying
  );
  const isTrackEnded = usePlayerAppSelector(
    (state) => state.player.isTrackEnded
  );

  // const handleCombineHandlers = ({trackData}: TrackTitleProps) => {
  //   dispatch(setMusicPlayable({}));
  //       dispatch(setPlayerData({data:trackData}));

  //   // if (!isAudioPlaying) {
  //   //   document.title = audioRef.current.src.slice(28, -4).replaceAll("_", " ");
  //   //   console.log(audioRef.current.src);
  //   // }
  //   // else {
  //   //   document.title = "stop"
  //   // }
  // };

  return (
    <>
          <motion.button onClick={()=> {dispatch(setMusicPlayable({}));
        dispatch(setPlayerData({data:trackData}));}} initial = {{opacity: 0, color: "black"}} whileHover = {{opacity:0.6, color: "gray"}}  className={`absolute justify-center place-self-center flex aspect-[1/1] place-self-center bg-[rgb(255,255,255)] rounded-[10rem] w-[35%]`}>
       {trackData.playable ?
       <CirclePlay color= "black" size ={30} strokeWidth={3} className="place-self-center"/>
      :
      <CirclePause color= "black" size ={30} strokeWidth={3} className="place-self-center"/>

      }
            </motion.button>
    </>
  );
};

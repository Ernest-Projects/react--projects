import {useState} from "react"

import {Play, Heart, UserPlus,Ellipsis} from "lucide-react"
import {motion} from "motion/react"

import { usePlayerAppDispatch, usePlayerAppSelector } from "../../redux/hooks/playerHook"
import { setPlayerData, setMusicPlayable  } from "../../redux/storages/playerSlice"

// import {Pla}

interface TrackProps  {
  id: number,
  audio: string,
    image: string,
    title: {
        name: string,
        subtitle: string
    }
    liked: boolean,
    setted: boolean,
    playable: boolean
}
type TrackTitleProps = {
  trackData: TrackProps;
};

export const TrackTitle = ({ trackData }: TrackTitleProps) => {

  const currentTrack = usePlayerAppSelector(state => state.player.currentTrack);

  
  const dispatch = usePlayerAppDispatch();

  const buttonIcons = [Heart, UserPlus,Ellipsis];
  const buttonAttr = {
    size: 15,
    strokeWidth: 3,
    className: "place-sel-center hover:opacity-70 transition"
  }
  const handleCombineHandlers = (track: TrackProps) =>{
    dispatch(setPlayerData({data:track}));
      
    fetch(`http://localhost:5000/likedTracks/${track.id}`, {
      method: "PATH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify ({
      setted: true,
      playable: true
      })
    })
  }
  const [isTitleHover, setIsTitleHover] = useState<boolean>(false) 
  return (
    <>
      <div className="flex h-full rounded-[0.4rem]  flex-col overflow-hidden p-0  overflow-[hidden]  w-full">
        
        <div onMouseLeave={()=> setIsTitleHover(false)}  onMouseEnter= {()=> setIsTitleHover(true)} className="  w-full h-full  relative flex justify-center align-center overflow-[hidden]">
          <motion.button initial = {{opacity: 0}} animate = {{opacity: isTitleHover ? 0.5 : 0}} className={` flex  rounded-[.4rem] m-0 align-center items-center bg-white justify-center   w-full h-full absolute`} >

          </motion.button>
            <motion.button onClick={()=> handleCombineHandlers( trackData)} initial = {{opacity: 0, color: "black"}} animate ={{opacity: isTitleHover ? 1: 0}} whileHover = {{opacity:0.6, color: "gray"}}  className={`absolute justify-center place-self-center flex aspect-[1/1] place-self-center bg-[rgb(255,255,255)] rounded-[10rem] w-[35%]`}>
          <Play color= "black" size ={30} strokeWidth={3} className="place-self-center"/>
            </motion.button>
          <img
            src={`../../../public/tracksTitles/${trackData.image}`}
            className="w-full h-full  aspect-[1/1]" 
            style={{ objectFit: "fill" }}
            alt=""
          /> 
           <section  className={`${isTitleHover ? "opacity-100" : "opacity-0"} transition gap-[1.5rem] bottom-[1rem] right-[1rem] text-black bg-transparent h-fit w-fit absolute border-red-500  flex flex-row place-self-center align-center justify-center w-fit `}>
            {buttonIcons.map((Icon, index) => (
                <button key = {index}>
              <Icon  {...buttonAttr}/>
            </button>
))}
          </section>
        </div>
        <p className="font-bold whitespace-nowrap leading-[1.2rem] p-[.2rem] md:text-[12px] lg:text-[14px]  overflow-hidden text-ellipsis  text-white ">
          <span >
            <span  className="hover:text-[rgb(113,113,113)]">
            {trackData.title.name}

            </span> <br/>
            <span className="text-[rgb(152,152,152)] hover:text-[rgb(72,72,72)]  text-ellipsis p-0 m-0 whitespace-nowrap">
              {trackData.title.subtitle}
            </span>
          </span>
        </p>
        {/* <p className="text-white"> {item}</p> */}
      </div>
    </>
  );
};

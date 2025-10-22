import { TrackTitle } from "../../../../global/TrackTitle";
import { setAddTrackInHistory } from "../../../../../redux/storages/librarySlice";
import { useLibraryAppDispatch, useLibraryAppSelector } from "../../../../../redux/hooks/libraryHook";
import { useEffect, useState} from "react";
import { resolve } from "path";

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
    playable:boolean
}

 const Likes = () => {
    
    const [getLikedTracks, setGetLikedTracks] = useState<TrackProps[]>([]);

    const tracksHistory = useLibraryAppSelector(state => state.library_page.historyOfTracks);
    const dispatch = useLibraryAppDispatch();

    useEffect(() => {

      fetch("http://localhost:5000/likedTracks")
      .then(res => res.json()).then((data: TrackProps[]) =>  setGetLikedTracks(data))
     }, [])
 
  return (
    <>
       <section className=" w-full gap-y-[1.5rem] flex flex-col relative h-fit "> 
            
             <div className="grid grid-cols-6 h-fit w-full gap-y-[4rem] gap-x-[1.5rem]">
              {getLikedTracks.map((item, index) => (
                  <TrackTitle key = {index} trackData={item}/> 
              ))}
             </div>
         </section>
    </>
  );
};
export default Likes

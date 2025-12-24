 
import {useState, useEffect} from 'react'
import { useLibraryAppDispatch, useLibraryAppSelector } from '../../../../../redux/hooks/libraryHook';

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
export const TrackData =  () => {

    const [getLikedTracks, setGetLikedTracks] = useState<TrackProps[]>([]);
   
       const tracksHistory = useLibraryAppSelector(state => state.library_page.historyOfTracks);
       const dispatch = useLibraryAppDispatch();
   
       useEffect(() => {
   
         fetch("http://localhost:5000/likedTracks", {method: "GET"})
         .then(res => res.json()).then((data: TrackProps[]) =>   {console.log("file from db: ", data); setGetLikedTracks(data)})
        }, []);
        return getLikedTracks;
}

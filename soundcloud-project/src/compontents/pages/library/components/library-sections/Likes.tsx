import { TrackTitle } from "../../../../global/TrackTitle";
import { setAddTrackInHistory } from "../../../../../redux/storages/librarySlice";
import {
  useGlobalAppDispatch,
  useGlobalAppSelector,
} from "../../../../../redux/hooks/globalHook";
import { useEffect, useState, use } from "react";
import { resolve } from "path";
import { setAllLikedTracks } from "../../../../../redux/storages/globalSlice";

interface TrackProps {
  id: number;
  audio: string;
  image: string;
  title: {
    name: string;
    subtitle: string;
  };
  liked: boolean;
  setted: boolean;
  playable: boolean;
}

// const fetchTracks = async () => {
//   const response = await fetch('http://localhost:5001/likedTracks', {method: "GET"});
//   if (!response.ok) {
//     throw new Error ("Failed to fetch tracks");

//   }
//   return response.json();
// }

const Likes = () => {
  const [getLikedTracks, setGetLikedTracks] = useState<TrackProps[]>([]);
  const dispatch = useGlobalAppDispatch();
  //  const allLikedTracks = useGlobalAppSelector(state => state.global_player.likedTracks);

  //  using new hook use() for fetching data
  // const tracks = use(fetchTracks());
  // setGetLikedTracks(tracks)
  // dispatch(setAllLikedTracks({likedTracksFromDb: getLikedTracks}))
  useEffect(() => {
    fetch("http://localhost:5001/likedTracks", { method: "GET" })
      .then((res) => res.json())
      .then((tracks: TrackProps[]) => {
        console.log("tracks from db (test) : ", tracks);
        setGetLikedTracks(tracks);
      });
    dispatch(setAllLikedTracks({ likedTracksFromDb: getLikedTracks }));
  }, []);

  return (
    <>
      <section className=" w-full gap-y-[1.5rem] flex flex-col relative h-fit ">
        <div className="grid grid-cols-6 h-fit w-full gap-y-[4rem] gap-x-[1.5rem]">
          {getLikedTracks.map((item, index) => (
            <TrackTitle key={index} trackData={item} />
          ))}
        </div>
      </section>
    </>
  );
};
export default Likes;

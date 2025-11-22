

import type { Track } from "../types/Track";


export const handleStateForPlayerTrack = async (trackData: Track) => {
  // reset all tracks to default
  // const allLikedTracks = await fetch("http://localhost:5001/likedTracks").then(
    // (res) => res.json()
  // );
  

    console.log("does this even work?");
  // stop or begin setted track (setted = true, playable = true/false)
  await fetch(`http://localhost:5001/likedTracks/${trackData.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ setted: true, playable: !trackData.playable }),
  });
  if (trackData.playable) {
      console.log("track is continued!")

  }else {
    console.log("track is stopped!")
  }
  //   dispatch(setMusicPlayable({}));
};

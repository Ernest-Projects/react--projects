
import type { Track } from "../app-types/Track";

export const handleSetSettedClickedTrack = async (trackData: Track) => {
  // reset all tracks to default
  const allLikedTracks = await fetch("http://localhost:5001/likedTracks").then(
    (res) => res.json()
  );

  console.log("db before setting to default: ", allLikedTracks)
  

  // active setted track (setted = true, playable = true)
  await fetch(`http://localhost:5001/likedTracks/${trackData.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ setted: true, playable: true }),
  });
  console.log("but now track ", trackData.title.name, "is setted and played!: ", trackData)
  //   dispatch(setMusicPlayable({}));
};

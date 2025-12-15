// import type { Track } from "../types/Track";

// export const handleSetTracksToDefault = async () => {
//   // reset all tracks to default
//   const allLikedTracks = await fetch("http://localhost:5001/likedTracks").then(
//     (res) => res.json()
//   );

//   // console.log("db before setting to default: ", allLikedTracks)

//   // useing Promise.all for multiplie promises
//   await Promise.all(
//         allLikedTracks.map((track: Track) =>
//              fetch(`http://localhost:5001/likedTracks/${track.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ setted: false, playable: false }),
//       })
//         )
//   );
//   console.log("all tracks are default!: ", allLikedTracks)}
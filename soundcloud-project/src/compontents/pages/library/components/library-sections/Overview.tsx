import {Recently} from "../../../../global/Recently"
import Likes from "./Likes"

export const Overview = () => {
  return (
    <>
      <main className="border gap-y-[4rem] flex flex-col border-red-500 text-white">
        <Recently></Recently>
        <div>
           <div className="text-white flex flex-row pb-[1.5rem] justify-between w-full">
             <header className="text-lg font-bold">Likes</header>
             <p className="text-[14px]">Browse trending playlists</p>
             </div>

        <Likes></Likes>

        </div>

      </main>
    </>
  );
};
export default Overview
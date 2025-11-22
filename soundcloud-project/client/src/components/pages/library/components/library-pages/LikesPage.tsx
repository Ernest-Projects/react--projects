
import {motion} from "motion/react"
import {Likes} from "../library-sections/index"
 const LikesPage = () => {
return (<>
<motion.main initial = {{y: -10, opacity: 0}} animate = {{y: 0, opacity: 1}} className="border border-red-500 flex flex-col  w-full h-fit gap-y-[1.5rem]">
     <div className="text-white flex flex-row justify-between w-full">
             <header className="text-lg font-bold ">Here is your liked tracks</header>
             <p className="text-[14px]">Browse trending playlists</p>
             </div>
        <Likes></Likes>
</motion.main>
</>);
};

export default LikesPage
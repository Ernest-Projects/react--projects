import { AnimatePresence } from "motion/react";
import {motion} from "motion/react";
export const Library = () => {
return (<>
 

<main>
<header className="text-white">Here is your library</header>
<AnimatePresence>

    <motion.section className = {`border text-xl text-white justify-between flex  border-red-500 w-[60%] h-fit`} >
        <button>Liked</button>
        <button>Liked</button>
        <button>Liked</button>
        <button>Liked</button>
        <button>Liked</button>
        <button>Liked</button>


        <div></div>

    </motion.section>

</AnimatePresence>
</main>
</>);
};
import {motion} from  "motion/react";
export const TryArtist = () => {
return (<>
<motion.main
     initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
<header className="text-white">Try Artist Pro Instruments!</header>
</motion.main>
</>);
}; 
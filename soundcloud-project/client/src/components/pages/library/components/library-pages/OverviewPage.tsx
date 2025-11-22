
import {motion} from "motion/react"
import { Overview } from "../library-sections/Overview";

 const OverviewPage = () => {
return (<>
<motion.main initial = {{y: -10, opacity: 0}} animate = {{y: 0, opacity: 1}} >
 <Overview></Overview>;

</motion.main>
</>)
};


export default OverviewPage
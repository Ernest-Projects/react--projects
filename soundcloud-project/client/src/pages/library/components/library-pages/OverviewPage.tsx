
import {motion} from "motion/react"
import { Overview } from "../library-sections/Overview";

 const OverviewPage = () => {
return (<>
<motion.main initial = {{y: -10, opacity: 0}} animate = {{y: 0, opacity: 1}}  data-cy = "overview">
            <header className="text-white font-semibold"> OVERVIEW</header>

 <Overview></Overview>;

</motion.main>
</>)
};


export default OverviewPage
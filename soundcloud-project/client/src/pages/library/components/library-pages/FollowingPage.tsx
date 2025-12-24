// import { History } from "../library-sections/."
import {Stations} from "../library-sections/index";
 const FollowingPage = () => {
return (<>
<main className="border border-red-500  w-full h-fit" data-cy = "following" >
                <header className="text-white font-semibold"> FOLLOWING</header>

        <Stations></Stations>
</main>
</>);
};

export default FollowingPage
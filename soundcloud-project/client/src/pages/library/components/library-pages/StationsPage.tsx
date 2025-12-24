// import { History } from "../library-sections/."
import {Stations} from "../library-sections/index";
 const StationsPage = () => {
return (<>
<main className="border border-red-500  w-full h-fit" data-cy = "stations">
        <header className="text-white font-semibold">STATIONS </header>

        <Stations></Stations>
</main>
</>);
};

export default StationsPage
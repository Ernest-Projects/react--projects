import History  from "../library-sections/History"
// import {Recently} from "../../../../global/Recently"
 const HistoryPage = () => {
return (<>
<main className="border border-red-500  w-full h-fit" data-cy = "history" >
        <header className="text-white font-semibold"> HISTORY</header>
        <History></History>
</main>
</>);
};

export default HistoryPage
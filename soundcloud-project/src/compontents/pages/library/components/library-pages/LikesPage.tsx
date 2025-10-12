import {Likes} from "../library-sections/index"
 const LikesPage = () => {
return (<>
<main className="border border-red-500  w-full h-fit">
     <div className="text-white flex flex-row justify-between w-full">
             <header className="text-lg font-bold">Here is your liked tracks</header>
             <p className="text-[14px]">Browse trending playlists</p>
             </div>
        <Likes></Likes>
</main>
</>);
};

export default LikesPage
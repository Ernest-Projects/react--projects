// animations
import { AnimatePresence } from "motion/react";
import {motion} from "motion/react";

// router
import { Route, Routes, Navigate } from "react-router-dom";
// hooks
// import { useRef, useState } from "react";
// import { useLibraryAppDispatch} from "../../../../redux/hooks/libraryHook";



// import { Slider } from "../../global/Slider";
// import { TrackTitle } from "../../../global/TrackTitle";
// import { Likes } from "../components/sections/Likes";
import { UndergroundResources } from "../../../global/UndergroundResources";
// import {Recently} from "../components/sections/Recently"
import  {ButtonsTitle } from "../components/library-sections/index";

// import {LikesPage, OverviewPage, HistoryPage, FollowingPage, StationsPage, AlbumsPage, PlaylistsPage} from "../components/library-pages"

import { libraryPages } from "../confings/libraryConfigs";
import { OverviewPage } from "../components/library-pages";

export const Library = () => {

    // const LikedCardsObject = Array.from({length: 10}, (_, i) =>({image: `https://picsum.photos/300/200?random=${i}`, type: "track", title: {header: `Track name ${i}`, subtitle:`track author ${i}`}})) 
   
return (<> 
 
<AnimatePresence>
<motion.main initial = {{opacity: 0, y: 0}} animate = {{opacity:1, y: 10}} className="flex flex-col h-fit  gap-[3rem]"> 
 
    <ButtonsTitle></ButtonsTitle>
     <Routes>
    <Route index  element = {<OverviewPage/>}></Route>

    <Route index  element = {<Navigate to="library"/>}></Route>
        {libraryPages.map((item,index) => (
            <Route key={index} path ={item.path} element = {<item.component/>}></Route>
        ))}
     </Routes>

    <UndergroundResources></UndergroundResources>
</motion.main>
    </AnimatePresence> 
</>);
};


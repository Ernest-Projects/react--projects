import { useNavbarAppDispatch, useNavbarAppSelector } from "../../../../redux/hooks/navbarHook";
import { useNavigate } from "react-router-dom";
import { buttsNavbar } from "../../navbar-config/navbarConfings";
import { useState } from "react";

import {motion} from "motion/react"
import { setActiveButton } from "../../../../redux/storages/navbarSlice";

export const RightNavbarButtons = () => {



  const dispatch = useNavbarAppDispatch();
  const activeButtonId = useNavbarAppSelector(state => state.navbar.activeButtonId);

  const navigate = useNavigate();

  const routeNavbarMap = new Map();
  for (let i = 0; i < buttsNavbar.length; i++) {
    routeNavbarMap.set(buttsNavbar[i].component, buttsNavbar[i].path);
  }
  const handleNavbarRouting = (content: React.ComponentType) => {
    const path = routeNavbarMap.get(content);
    if (path) {
      navigate(path);
    }
        // setTimeout(() => window.location.reload(), 0);
  };

  const handleClick = (content: React.ComponentType, id: number) => {
    // for routing
    handleNavbarRouting(content);

    // for redux state
    dispatch(setActiveButton(id))
  }

  let col = "";
  const butts = [];
  for (let i = 3; i < 6; i++) {
    if (i == 3) {
      col = "text-orange-500 focus:border-b-none border-none focus:border-none";
    }
    butts.push(
      <>
        <motion.button data-cy = "navbar-button"
          whileTap={{ scale: 0.98 }} 
          onClick={() => {

            handleClick(buttsNavbar[i].component, i);
          }}
          className={` w-min border-b-[2px] ${activeButtonId != undefined  &&  activeButtonId != null && activeButtonId == i ? "text-white border-b-white"  : "text-[rgb(152,152,152)] border-b-[rgb(18,18,18)]" }  box-border font-bold lg:text-sm md:text-[.8rem] transition whitespace-nowrap duration-100 h-[100%] text-[rgb(152,152,152)] ${col} hover:text-white font-semibold`}
        >
          {buttsNavbar[i].content}{" "}
        </motion.button> 
      </>
    );
    col = "";
  }
return <>
 <section data-cy = "right-button-side" className=" h-full w-fit relative flex gap-[1rem] flex-cols">
          {butts}
        </section>
</>
}








// Wounded Warsong
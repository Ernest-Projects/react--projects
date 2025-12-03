// lucide library icons import
import { Mail, Bell, Ellipsis, ChevronDown, Search, Hand } from "lucide-react";

// import Router component
import { useNavigate } from "react-router-dom";

// import hook
import { useEffect, useRef, useState } from "react";

// react Motion library animations import
import { motion } from "motion/react";
// import {  } from "motion/react-client";
// import { AnimatePresence } from 'motion/react';
// import { div } from 'motion/react-client';

// react Redux library for global state import
import { useNavbarAppDispatch, useNavbarAppSelector } from "../../redux/hooks/navbarHook";
import {
  
  setCloseAllPopups,
  setOpenPopupWindow,
} from "@redux-storage/navbarSlice";
import {
  ProfilePopup,
  // MessagePopup,
  // NotificationPopup,
  // MorePopup,
} from "./navbar-components/NavbarPopups";

// import objects for navbar
import { buttsNavbar, navbarIconProps, navbarIcons } from "./navbar-config/navbarConfings";
import { useGlobalAppSelector } from "../../redux/hooks/globalHook";
import { NavbarInput } from "./navbar-components/NavbarInput";
import { LogoutInput } from "../../services/user-guest-components/LogoutInput";
import { LeftNavbarButtons } from "./navbar-components/navbar-buttons/LeftNavbarButtons";
import { RightNavbarButtons } from "./navbar-components/navbar-buttons/RightNavbarButtons";
import { AuthorizationButtons } from "../../services/user-guest-components/navbar/AuthorizationButtons";
import { NavbarProfileIcon } from "./navbar-components/navbar-icons/NavbarProfileIcon";
import { NavbarElipsisIcon } from "./navbar-components/navbar-icons/NavbarElipsisIcon";
import { NavbarIcons } from "./navbar-components/navbar-icons/NavbarIcons";

import {useAuthAppSelector, useAuthAppDispatch} from "../../redux/hooks/authHook";


export const Navbar = () => {
  // button color:
  // rgba(48, 48, 48, 1)

  // bg color, popup window color
  // rgb(18,18,18)

  // text color , icons color
  // rgb(72,72,72)
  // rgb(152,152,152)

  // hover popup buttons color
  // rgb(152,152,152)

  // original Soundcloud color
  //rgb(255,85,0)

  
  // global state for user login/logout
  const isUserLogged = useAuthAppSelector((state) => state.authorization.isUserLogged)
  const isAuthorizationWindowOpened = useAuthAppSelector((state) => state.authorization.isAuthorizationWindowOpened);
  // -------------------------------------
  // const authDispatch = useAuthAppDispatch();


  const dispatch = useNavbarAppDispatch();

  useEffect(() => {
    const handleClosePopups = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const clickedInsidePopup = target.closest('[data-popup="true"]');
        if (!clickedInsidePopup) {
          dispatch(setCloseAllPopups())
        }
    };
    document.addEventListener("mousedown", handleClosePopups);

    return () => document.removeEventListener("mousedown", handleClosePopups);
  }, [dispatch]);


  return (
    <>
      <main
        style={{ justifyContent: "space-between" }}
        className={` select-none sm:w-[40rem] md:w-[55rem] lg:w-[70rem] fixed h-[2.8rem] bg-[rgb(18,18,18)] z-[1000] place-self-center gap-[1rem]  align-center flex justify-center flex-rows  top-[0%] `}
      > 
      
        {/* left side of buttons in navbar */}
        <LeftNavbarButtons/>
        <section
          className={`h-[80%] w-[100%] ${!isUserLogged ? "max-w-[23rem]" : ""}
 bg-[rgb(48,48,48)] place-self-center   box-border relative  duration-200 min-w-[20rem] transition-[shadow] rounded-[.2rem] outline-none text-white hover:outline-none`}
        >


        {/* input in navbar ()*/}
      {!isUserLogged ? 
    <LogoutInput/> :  <NavbarInput/>
    }

          <button className={` absolute place-self-center right-[1rem]`}>
            <Search strokeWidth={1.5} size = {20} className={`text-[rgb(152,152,152)]`} />
          </button>
        </section>
        
        
        {/* right side of buttons in navbar */}
        {!isUserLogged ? <AuthorizationButtons/> :
       <RightNavbarButtons/> }


        {/* navbar icon and popup window */}
        {/* <NavbarProfileIcon/> */}

          {/* changing icons when depends on login/logout */}
          {!isUserLogged ?
        <NavbarElipsisIcon/>
          :
          
        <section className={`flex flex-rows  w-fit gap-[1rem]`}> 
        <NavbarProfileIcon/>
          <NavbarIcons/>
        
        </section>
          }

      </main>
    </>
  );
};
// lucide library icons import
import { Mail, Bell, Ellipsis, ChevronDown, Search, Hand } from "lucide-react";

// import Router component
import { useNavigate } from "react-router-dom";

// import hook
import { useEffect, useRef } from "react";

// react Motion library animations import
import { motion } from "motion/react";
import { nav, span } from "motion/react-client";
// import { AnimatePresence } from 'motion/react';
// import { div } from 'motion/react-client';

// react Redux library for global state import
import { useNavbarAppDispatch, useNavbarAppSelector } from "../../redux/hooks";
import { setAllPopupWindowClose, setOpenPopupWindow } from "../../redux/storages/NavbarStore";
import { ProfilePopup, MessagePopup, NotificationPopup, MorePopup } from "./NavbarPopups";

// import objects for navbar
import {
  buttsNavbar,
  navbarIconProps,
  navbarIcons, 
} from "./navbarConfings";

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


    const popupStates = useNavbarAppSelector((state) => state.application.popupStates);
    const dispatch = useNavbarAppDispatch();
    const navigate = useNavigate();

  const routeNavbarMap= new Map();
  for (let i = 0; i < buttsNavbar.length; i++) {
  routeNavbarMap.set(buttsNavbar[i].component, buttsNavbar[i].path);
  }
   const handleNavbarRouting = (content: React.ComponentType) => {
      const path = routeNavbarMap.get(content);
      if (path) { navigate(path)};
  
      dispatch(setAllPopupWindowClose());
    };
  let col = "";
  const butts = [];
  for (let i = 0; i < 6; i++) {
    if (i == 3) { 
      col = "text-orange-500 focus:border-b-none border-none focus:border-none";
    }
    butts.push(
      <>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }} 
          onClick={()=> {handleNavbarRouting(buttsNavbar[i].component)}}
          className={` w-min box-border font-bold text-sm transition whitespace-nowrap duration-100   h-[100%] text-[rgb(152,152,152)] ${col} hover:text-white text-bold`}
          >
          {buttsNavbar[i].content}{" "}
        </motion.button>
      </>
    );
    col = "";
  }
  // for router
  // const navigate = useNavigate();

  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(()=> {
    const handleClosePopups = (event: MouseEvent) => {
      if(popupRef.current && !popupRef.current.contains(event.target as Node))  {
        dispatch(setAllPopupWindowClose());
        console.log(popupRef.current, event.target)
      }
    }
    document.addEventListener("mousedown", handleClosePopups);

    return() => document.removeEventListener("mousedown", handleClosePopups);
  }, [dispatch])

  const left = butts.slice(0, butts.length / 2);
  const right = butts.slice(butts.length / 2);

    

  return (
    <>
      <main
        style={{ justifyContent: "space-around" }}
        className={`w-[70vw] select-none fixed h-[2.5rem] bg-[rgb(18,18,18)] z-[1000] place-self-center gap-[1rem]  align-center flex justify-center flex-rows  top-[0%] `}
      >
        <button onClick  = {() => handleNavbarRouting("Home")}
          className={`invert  place-self-center flex justify-center align-center`}
        >
          <img
            src="../../public/soundcloud.svg"
            className={`w-[3rem] min-w-[3rem] place-self-center aspect-[1/1]`}
            alt=""
          />
        </button>
        <motion.section
          layoutId="underline"
          className=" gap-[1rem] h-full  relative flex flex-cols "
        >
          {left}
        </motion.section>
        <section
          className="h-[80%] w-fit
 bg-[rgb(48,48,48)] place-self-center  shadow-[inset_0px_0px_0px_1px_white] box-border relative  duration-200 transition-[shadow] rounded-[.2rem] outline-none text-white hover:outline-none"
        >
          {/* <p
            className={`w-[105%] h-[105%] absolute place-self-center bg-white z-[-1]`}
          >
            {" "}
          </p> */}
          <input
            type="text"
            placeholder="Search"
            className={`w-[100%] h-[100%] p-[1rem] focus:border-none hover:outline-none focus:outline-none active:outline-none`}
          />
          <button className={` absolute place-self-center right-[1rem]`}>
            <Search strokeWidth={1.2} className={`text-[rgb(152,152,152)]`} />
          </button>
        </section>
        <section className=" h-full w-[30%] relative flex gap-[1rem] flex-cols">
          {right}
        </section>
        {/* navbar icon and popup window */}
        <div
          onClick={() => dispatch(setOpenPopupWindow({ id: 3 }))}
          className={`cursor-pointer w-[5rem] relative h-[100%] gap-[.5rem] aspect-[1.5/1] group  justify-center  flex flex-rows `}
        >
          <p
            className={`overflow-[hidden]  flex place-self-center justify-center align-center overflow-hidden h-[50%] rounded-[10rem]`}
          >
            <img
              src="../../public/navbarIcon.jpg"
              alt=""
              style={{ objectFit: "fill" }}
              className={`h-[100%] aspect-[1/1] `}
            />
          </p>
          <ChevronDown
            strokeWidth={1.2}
            className={`${popupStates[3].isOpened ? "text-white" : "text-[rgb(152,152,152)]"} border-none place-self-center`}
            size={25}
          />
          {/* <div></div> */}
          {popupStates[3].isOpened ? (
            <ProfilePopup></ProfilePopup>
          ) : (
            ""
          )}
        </div>

        <section className={`flex flex-rows  w-fit gap-[1rem]`}>
          {navbarIcons.map((item, index) => (
            <div
              className="relative place-self-center flex justify-center align-items"
              key={index}
            >
              <button
                onClick={() => dispatch(setOpenPopupWindow({ id: index }))}
              ><item.icon strokeWidth={1} className="text-[rgb(152,152,152)] hover:text-white"></item.icon>
              </button>
              {popupStates[index].isOpened ? (
               <item.component ref = {popupRef}></item.component>
              ) : (
                <p className="absolute"></p>
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

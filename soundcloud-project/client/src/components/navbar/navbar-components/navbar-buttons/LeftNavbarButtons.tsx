import { useNavbarAppDispatch, useNavbarAppSelector } from "../../../../redux/hooks/navbarHook";
import { useGlobalAppSelector } from "../../../../redux/hooks/globalHook";

import { useNavigate } from "react-router-dom";
import { buttsNavbar } from "../../navbar-config/navbarConfings";
import { useEffect, useState } from "react";

import {motion} from "motion/react"
import { setActiveButton } from "../../../../redux/storages/navbarSlice";
import { setIsUserLogged } from "../../../../redux/storages/authSlice";

import { useAuthAppDispatch, useAuthAppSelector } from "../../../../redux/hooks/authHook";


export const LeftNavbarButtons = () => {


  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const isUserlogged = useAuthAppSelector(state => state.authorization.isUserLogged);

  const buttonActiveId = useNavbarAppSelector((state) => state.navbar.activeButtonId);
  const dispatch = useNavbarAppDispatch();

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
  //  if  (!isUserlogged) return 
    dispatch(setActiveButton(id))
  }

  const butts = [];
  for (let index = 0; index < 3; index++) {
    butts.push(
      <>
        <motion.button data-cy ="navbar-button" data-index = {index}
                  whileTap={{ scale: 0.98 }}
          onClick={() => {
            handleClick(buttsNavbar[index].component, index)
          }}
          key={index}
          className={` w-min border-b-[2px] ${  buttonActiveId == index ? "text-white border-b-white"  : "text-[rgb(152,152,152)] border-b-[rgb(18,18,18)]" }  box-border font-semibold lg:text-sm md:text-[.8rem] transition whitespace-nowrap duration-100 h-[100%] text-[rgb(152,152,152)]  hover:text-white text-bold`}
        >
          {buttsNavbar[index].content}{" "}
        </motion.button> 
      </>
    ); 
  }

  useEffect(() =>{

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize",handleResize);

    return () => (
      window.removeEventListener("resize", handleResize)
    )
  }, [window])

  return <>
 <button data-cy = "button-image"
          onClick={() => handleClick(buttsNavbar[0].component, 0)}
          className={`invert  place-self-center gap-[.5rem] flex justify-center align-center`}
        >
          <img
            src="../../public/soundcloud.svg"
            className={`w-[3rem] min-w-[3rem] place-self-center aspect-[1/1]`}
            alt=""
          />
          {(!isUserlogged &&  windowWidth > 1024) &&
        <header className="font-bold  tracking-wider flex align-center justify-center text-[1.1rem] text-center place-self-center">SOUNDCLOUD</header>
         }
        </button>

    <motion.section data-cy = "left-button-side"
          layoutId="underline"
          className=" gap-[1rem] h-full  relative flex flex-cols "
        >
          {butts}
        </motion.section>
  </>
}
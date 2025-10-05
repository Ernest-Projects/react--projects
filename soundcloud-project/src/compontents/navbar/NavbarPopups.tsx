import type { PopcornIcon } from "lucide-react";
import { useNavbarAppDispatch, useNavbarAppSelector } from "../../redux/hooks/navbarHook";
import { motion } from "motion/react";
import React, { forwardRef, useRef } from "react";
import { UserNotification } from "./UserNotification";
import {
  profilePopupIcons,
  profilePopupProps,
  profilePopup,
} from "./navbarPopupConfigs";

import { morePopup } from "./navbarPopupConfigs";
import { div } from "motion/react-client";

// import { useNavbarActions } from "./dispatchHook";

// router
import { useNavigate } from "react-router-dom";
import { setAllPopupWindowClose } from "../../redux/storages/navbarSlice";

// type PopupIconsProps = {
//     type: string;
// }

// const popupRef = useRef<HTMLDivElement>(null);
// const popup = useNavbarAppSelector((state) => state.application.popupStates);
// const dispatch = useNavbarAppDispatch();

export const ProfilePopup = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <motion.div
      data-popup ="true" 
        ref={ref}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        className={` top-[100%] py-2 border border-[rgb(50,50,50)] border-[.2px] rounded-[.1rem] bg-[rgb(10,10,10)] font-bold text-md absolute w-[9rem] px-2 left-0  text-black`}
      >
        {profilePopupIcons.map((Icon, index) => (
          <button
            key={index}
            
            className=" w-full text-white flex py-1 gap-[.5rem] flex-cols relative  text-bold flex-nowrap group hover:text-[rgb(152,152,152)]"
          >
            <Icon {...profilePopupProps}></Icon>
            {"  "}
            <p className="text-sm">{profilePopup[index].content}</p>
          </button>
        ))}{" "}
      </motion.div>
      <></>
    </>
  );
});

export const NotificationPopup = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    return (
      <>
        <motion.div
              data-popup ="true" 

          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          className={` top-[100%] h-fit border border-[.2px] border-[rgb(50,50,50)] py-2 rounded-[.1rem] bg-[rgb(10,10,10)] font-bold text-md absolute w-fit px-2   text-white`}
        >
          <div className="flex justify-between flex-cols">
            <header className="text-xl ">Notifications</header>
            <button className=" text-sm ">Settings</button>
          </div>
          <UserNotification></UserNotification>
          <UserNotification></UserNotification>
          <UserNotification></UserNotification>
          <UserNotification></UserNotification>
          <UserNotification></UserNotification>

          <button
            className=" w-fit flex py-1 gap-[.5rem] place-self-center text-sm text-center flex-cols relative  text-bold flex-nowrap group hover:text-[rgb(152,152,152)]"
          >
            View all notifications
          </button>
        </motion.div>
        <></>
      </>
    );
  }
);

export const MessagePopup = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <motion.div
            data-popup ="true" 

        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        className={` top-[100%] h-[10rem] border border-[.2px] border-[rgb(50,50,50)] py-2 rounded-[.1rem] bg-[rgb(10,10,10)] font-bold text-md absolute aspect-[2/1] px-2   text-white`}
      >
        <div className="flex justify-between flex-cols">
          <header className="text-lg ">Messages</header>
        </div>
        <div className="absolute bottom-0  p-[.5rem] w-full  place-self-center h-fit">
          <p className="text-sm text-center p-[.5rem] text-[rgb(130,130,130)]">
            No messages
          </p>
          <motion.button
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`text-center hover:text-[rgb(50,50,50)] text-white w-full place-self-center text-sm`}
          >
            View all messages
          </motion.button>
        </div>
        <motion.button
          whileHover={{ color: "rgb(152,152,152)" }}
          initial={{ color: "white" }}
          className=" w-full flex py-1 gap-[.5rem] flex-cols relative  text-bold flex-nowrap group hover:text-[rgb(152,152,152)]"
        ></motion.button>
      </motion.div>
    </>
  );
});

// more icon button in the end
export const MorePopup = React.forwardRef<HTMLDivElement>((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useNavbarAppDispatch();

  const routesMap: Record<string, string> = {
    Copyright: "/copyright",
    AboutUs: "/about"
  };

  const handleRouteMorePopup = (content: string) => {
    const path = routesMap[content];
    if (path) { navigate(path)};

    dispatch(setAllPopupWindowClose());
  };

  return (
    <>
      <motion.div
            data-popup ="true" 

        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        className={` top-[100%] w-[10rem] h-fit py-2 rounded-[.1rem] bg-[rgb(10,10,10)] font-bold text-md border-[rgb(50,50,50)] border-[0.2px] absolute aspect-[1/1] px-2  text-white`}
      >
        {morePopup.map((item, index) => (
          <motion.button
            onClick={() => {handleRouteMorePopup(item.component)}}
            key={index}
            className=" w-full flex py-[.3rem] flex-nowrap gap-[.5rem] flex-cols relative  text-bold text-sm flex-nowrap group hover:text-[rgb(152,152,152)]"
          >
            {item.content != "line" ? (
              item.content
            ) : (
              <div className="absolute w-full h-[.5px] bg-[rgb(50,50,50)]"></div>
            )}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
});

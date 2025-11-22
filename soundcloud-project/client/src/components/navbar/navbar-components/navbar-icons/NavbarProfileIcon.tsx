

import {navbarIcons } from "../../navbar-config/navbarConfings";
import { useNavbarAppDispatch, useNavbarAppSelector } from "../../../../redux/hooks/navbarHook";
import { setOpenPopupWindow } from "../../../../redux/storages/navbarSlice";
import { ProfilePopup } from "../NavbarPopups";

import { ChevronDown } from "lucide-react";


export const NavbarProfileIcon = () => {
    const popupStates = useNavbarAppSelector((state) => state.navbar.popupStates);
    const dispatch = useNavbarAppDispatch();
    return <>
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
            strokeWidth={1.5}

            className={`${
              popupStates[3].isOpened ? "text-white" : "text-[rgb(152,152,152)]"
            } border-none place-self-center`}
            size={25}
          />
          {/* <div></div> */}
          {popupStates[3].isOpened ? <ProfilePopup></ProfilePopup> : ""}
        </div>
    </>
}
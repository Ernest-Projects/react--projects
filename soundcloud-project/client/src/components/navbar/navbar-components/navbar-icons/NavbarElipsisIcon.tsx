
import { Ellipsis } from "lucide-react";
import {navbarIcons } from "../../navbar-config/navbarConfings";
import { useNavbarAppDispatch, useNavbarAppSelector } from "../../../../redux/hooks/navbarHook";
import { setOpenPopupWindow } from "../../../../redux/storages/navbarSlice";
import { MorePopup } from "../NavbarPopups";

export const NavbarElipsisIcon = () => {

      const popupStates = useNavbarAppSelector((state) => state.navbar.popupStates);
        const dispatch = useNavbarAppDispatch();
    return <>
      <div
                      className="relative place-self-center flex justify-center align-items"
                    >
                      <button
                        onClick={() => dispatch(setOpenPopupWindow({ id: 2 }))}
                      >
                        <Ellipsis size = {25}
                          strokeWidth={1.5}
                          className="text-[rgb(152,152,152)] hover:text-white"
                        ></Ellipsis>
                      </button>
                      {popupStates[2].isOpened ? (
                        <MorePopup></MorePopup>
                      ) : (
                        <p className="absolute"></p>
                      )}
                    </div>
    </>
}
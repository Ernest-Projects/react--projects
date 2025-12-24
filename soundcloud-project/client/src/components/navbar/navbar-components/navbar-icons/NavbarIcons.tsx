


import {navbarIcons } from "../../navbar-config/navbarConfings";
import { useNavbarAppDispatch, useNavbarAppSelector } from "../../../../redux/hooks/navbarHook";
import { setOpenPopupWindow } from "../../../../redux/storages/navbarSlice";


export const NavbarIcons = () => {

  const popupStates = useNavbarAppSelector((state) => state.navbar.popupStates);
    const dispatch = useNavbarAppDispatch();
    return <>
       {navbarIcons.map((item, index) => (
                <div data-cy ="navbar-icon" data-index = {index}
                  className="relative place-self-center flex justify-center align-items"
                  key={index}
                >
                  <button
                    onClick={() => dispatch(setOpenPopupWindow({ id: index }))}
                  >
                    <item.icon size = {20}
                      strokeWidth={1.5}
                      className="text-[rgb(152,152,152)] hover:text-white"
                    ></item.icon>
                  </button>
                  {popupStates[index].isOpened ? (
                    <item.component></item.component>
                  ) : (
                    <p className="absolute"></p>
                  )}
                </div>
              ))}
    
    
    </>
}
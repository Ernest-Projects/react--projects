import { useDispatch, useSelector } from "react-redux";
import type { NavbarAppDispatch, RootNavbarState } from "./storages/NavbarStore";


export const useNavbarAppDispatch = useDispatch.withTypes<NavbarAppDispatch>();
export const useNavbarAppSelector = useSelector.withTypes<RootNavbarState>();
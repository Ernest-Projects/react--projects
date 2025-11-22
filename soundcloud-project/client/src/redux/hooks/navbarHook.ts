import { useDispatch, useSelector } from "react-redux";
import type { NavbarAppDispatch, RootNavbarState } from "../storages/navbarSlice";
export const useNavbarAppDispatch = useDispatch.withTypes<NavbarAppDispatch>();
export const useNavbarAppSelector = useSelector.withTypes<RootNavbarState>();
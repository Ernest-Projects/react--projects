import { useDispatch, useSelector } from "react-redux";
import type { HomeAppDispatch, RootHomeState } from "../storages/homeSlice";
export const useHomeAppDispatch = useDispatch.withTypes<HomeAppDispatch>();
export const useHomeAppSelector = useSelector.withTypes<RootHomeState>();
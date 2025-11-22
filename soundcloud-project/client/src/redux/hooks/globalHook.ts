import { useDispatch, useSelector } from "react-redux";
import type { GlobalAppDispatch, RootGlobalState } from "../storages/globalSlice";

export const useGlobalAppDispatch = useDispatch.withTypes<GlobalAppDispatch>();
export const useGlobalAppSelector = useSelector.withTypes<RootGlobalState>();
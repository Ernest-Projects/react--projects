import { useDispatch,useSelector } from "react-redux";
import type { PlayerAppDispatch, RootPlayerState } from "../storages/playerSlice";
export const usePlayerAppDispatch = useDispatch.withTypes<PlayerAppDispatch>();
export const usePlayerAppSelector = useSelector.withTypes<RootPlayerState>();

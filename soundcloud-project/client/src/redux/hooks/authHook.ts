import { useDispatch, useSelector } from "react-redux";
import type { AuthAppDispatch, RootAuhtState } from "../storages/authSlice";

export const useAuthAppDispatch = useDispatch.withTypes<AuthAppDispatch>();
export const useAuthAppSelector = useSelector.withTypes<RootAuhtState>();
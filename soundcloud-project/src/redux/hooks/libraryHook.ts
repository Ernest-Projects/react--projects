import type { RootLibraryState,LibraryAppDispatch  } from "../storages/librarySlice";
import { useSelector, useDispatch } from "react-redux";

export const useLibraryAppSelector = useSelector.withTypes<RootLibraryState>();
export const useLibraryAppDispatch = useDispatch.withTypes<LibraryAppDispatch>();
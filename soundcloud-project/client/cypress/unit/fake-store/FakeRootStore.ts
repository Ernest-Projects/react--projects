import { AuthorzationProps } from "../../../src/redux/storages/authSlice";
import { ToolsProps } from "../../../src/redux/storages/homeSlice";
import { NavbarStatesProps } from "../../../src/redux/storages/navbarSlice";
import { PlayerStatesProps } from "../../../src/redux/storages/playerSlice";

// to prevent using original  RootState
export type FakeRootState = {
  home_page: ToolsProps,
  authorization: AuthorzationProps,
  // library_page: NavbarStatesProps
  navbar: NavbarStatesProps
  player: PlayerStatesProps
}
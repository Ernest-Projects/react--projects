import { Mail, Bell, Ellipsis } from "lucide-react";
import { MorePopup, NotificationPopup, MessagePopup
 } from "./NavbarPopups";

//  navbar buttons for main pages 
 import { Home } from "../pages/home/Home";
 import {Feed} from "../pages/feed/Feed";
 import { Library } from "../pages/library/main/Library";
 import { TryArtist } from "../pages/tryArtist/TryArtist";
 import { ForArtists } from "../pages/forArtists/ForArtists";
 import { Upload } from "../pages/upload/Upload";

// import * from "../pages/";

export const buttsNavbar = [
  { content: "Home", component: Home, path: "/discover" },
  { content: "Feed", component: Feed, path: "/feed" },
  { content: "Library", component: Library, path: "/you/*" },
  { content: "Try Artist Pro", component: TryArtist,path: "/try" },
  { content: "For Artists", component:ForArtists, path: "/artist" },
  { content: "Upload", component: Upload, path: "/upload" },
];

const NavbarIconStyles =
  " cursor-[pointer] border-none place-self-center";
export const navbarIcons = [ {icon: Bell, component: NotificationPopup},{icon: Mail, component: MessagePopup}, {icon: Ellipsis, component: MorePopup }];

export const navbarIconProps = {
  strokeWidth: 1,
  className: NavbarIconStyles, 
  size: 20,
};

import {
  User,
  Heart,
  ListMusic,
  AudioLines,
  Star,
  UserStar,
  Podcast,
  UserSearch,
  Split,
} from "lucide-react";
export const profilePopupIcons = [
  User,
  Heart,
  ListMusic,
  Podcast,
  UserStar,
  UserSearch,
  Star,
  AudioLines,
  Split,
];
const PopupButtonStyles =
  "text-white cursor-[pointer] border-none  place-self-center";
export const profilePopupProps = {
  strokeWindth: 1.5,
  className: PopupButtonStyles,
  size: 15,
};
export const profilePopup = [
  { content: "Profile" },
  { content: "Likes" },
  { content: "Playlists" },
  { content: "Stations" },
  { content: "Following" },
  { content: "Who to follow" },
  { content: "Try Artist Pro" },
  { content: "Tracks" },
  { content: "Distribute" },
];
export const morePopup = [
  { content: "About us", component: "AboutUs" },
  { content: "Legal", component: "Legal" },
  { content: "Copyright", component: "Copyright" },
  { content: "line", component: "" },
  { content: "Mobile apps", component: "MobileApps" },
  { content: "For Creators",component: "ForCreators" },
  { content: "Newsroom", component: "Newsroom" },
  { content: "Jobs", component: "Jobs" },
  { content: "Developers", component: "Developers" },
  { content: "Soundcloud Store",  component: "SoundCloudStore" },
  { content: "line", component: ""},
  { content: "Support", component: "Support" },
  { content: "Keyboard shortcuts", component: "KeyboardShortcuts" },
  { content: "line", component: "" },
  { content: "Subscripition", component:"Subscription" },
  { content: "Settings", component:"Settings" },
  { content: "Sign out", component: "SignOut" },
];

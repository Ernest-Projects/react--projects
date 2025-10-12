import { OverviewPage,AlbumsPage, LikesPage, HistoryPage, PlaylistsPage, StationsPage, FollowingPage } from "../components/library-pages"


export const libraryPages = [
    {content: "Overwiew",isSelected: false, component: OverviewPage, path:"library"},
    {content: "Likes", isSelected: false, component:LikesPage, path: "likes"},
    {content: "Playlists", isSelected: false, component: PlaylistsPage, path: "sets"},
    {content: "Albums", isSelected: false, component: AlbumsPage, path: "albums"},
    {content: "Stations", isSelected:false, component: StationsPage, path:"stations"},
    {content: "Following", isSelected:false, component: FollowingPage, path: "following"},
    {content: "History", isSelected: false, component: HistoryPage, path: "history"},
]
import { OverviewPage,AlbumsPage, LikesPage, HistoryPage, PlaylistsPage, StationsPage, FollowingPage } from "../components/library-pages"


export const libraryPages = [
    {content: "Overview", component: OverviewPage, path:"library"},
    {content: "Likes", component:LikesPage, path: "likes"},
    {content: "Playlists", component: PlaylistsPage, path: "sets"},
    {content: "Albums", component: AlbumsPage, path: "albums"},
    {content: "Stations", component: StationsPage, path:"stations"},
    {content: "Following", component: FollowingPage, path: "following"},
    {content: "History", component: HistoryPage, path: "history"},
]
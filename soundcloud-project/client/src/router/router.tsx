import { createBrowserRouter, Navigate } from "react-router-dom";
import SoundCloud from "../components/SoundCloud";
import { Library } from "../pages/library/library-main/Library";
import { Feed } from "../pages/feed/Feed";
import {Home} from "../pages/home/Home";
import { Copyright } from "../pages/copyright/Copyright";
import { LikesPage, OverviewPage, PlaylistsPage, StationsPage, FollowingPage, HistoryPage, AlbumsPage } from "../pages/library/components/library-pages";
import { SignOut } from "../pages/popups/morePopup-pages/SingOut";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <SoundCloud/>,
    children: [
        {index: true,
            element: <Navigate to = "discover" replace />
        },
        {path: "discover",
            element: <Home/>
        },
        {
          path: "feed",
          element: <Feed />
        },
        {
          path: "you",
          element: <Library />,
          children: [
            {
              index: true,
              element: <Navigate to="library" />,
            },
            {
              path: "library",
              element: <OverviewPage />,
            },
            {
              path: "likes",
              element: <LikesPage />,
            },
            {
              path: "sets",
              element: <PlaylistsPage />,
            },
             {
              path: "albums",
              element: <AlbumsPage />,
            },
             {
              path: "stations",
              element: <StationsPage />,
            },
             {
              path: "following",
              element: <FollowingPage />,
            },
             {
              path: "history",
              element: <HistoryPage />,
            },
          ],
        },
          // popup 
        {path: "copyright",
            element: <Copyright/>
        },
          {path: "logout",
            element: <SignOut/>
        },
    ]
  },
]);

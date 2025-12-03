// import { Radical } from "lucide-react";


// dinamically change the title of app
import { TitleChange } from "./titleChange";
// fixed components
import { Navbar } from "./navbar/Navbar";
import { Player } from "./player/Player";
import { Home } from "./pages/home/Home";
// REACT ROUTER!!!
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

// pages for routingz
import { Copyright } from "./pages/copyright/Copyright";

import { buttsNavbar } from "./navbar/navbar-config/navbarConfings";

import styles from "./SoundCloud.module.scss";
import { ScrollToTop } from "./global/ScrollToTop";
import { SignOut } from "./pages/popups/morePopup-pages/SingOut";
import { Registration } from "../services/authorization/Registration";
import { setIsUserLogged } from "@redux-storage/authSlice";
import { useAuthAppSelector } from "@redux-hook/authHook";

function SoundCloud() {

  // user logged/logout boolean value 
  const isUserLogged = useAuthAppSelector(state => state.authorization.isUserLogged);

  // document.addEventListener("visibilitychange", () => {
  //   document.title = "Track";
  // });
  // background dark color:
  // rgb(18,18,18);

  // button color:
  // rgb(48, 48, 48)

  // text color:
  // rgb(72,72,72)

  return (
    <>
      <BrowserRouter basename="/">
        {/* scroll to top after virtual reloading the pages */} 
        <ScrollToTop></ScrollToTop>
        <TitleChange></TitleChange>
        <main style = {{overflow: isUserLogged ? "hidden": "visible"}}
          className={` sm:w-[40rem] md:w-[55rem] lg:w-[70rem]  place-self-center relative grid grid-rows grid-cols-1  justify-center align-center  h-fit bg-[rgb(18,18,18)]`}
        >
          <section
            className={`w-[100%] flex align-center place-self-center relative  h-[2.5rem]`}
          >
            <Navbar></Navbar>
          </section>
          <Routes>

            {/* component for buttons in Navbar */}
            <Route path="/" element={<Home />} /> {/* */}
            {buttsNavbar.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            ))}

            {/* morePopup components and pages */}
            <Route path="/copyright" element={<Copyright />}></Route>
            <Route path="/logout" element={<SignOut />}></Route>

          </Routes>

            {/* Window for authorization */}
            <Registration/>
          
          <Player></Player>
        </main>
      </BrowserRouter>
    </>
  );
}

export default SoundCloud;

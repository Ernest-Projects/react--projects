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

import { buttsNavbar } from "./navbar/navbarConfings";

import styles from "./SoundCloud.module.scss";
import { ScrollToTop } from "./global/ScrollToTop";

function SoundCloud() {

  document.addEventListener("visibilitychange", () => {
    document.title = "Track";
  }) 
  // background dark color:
  // rgb(18,18,18);

  // button color:
  // rgb(48, 48, 48)

  // text color:
  // rgb(72,72,72)

  return (
    <>
      <BrowserRouter>
      {/* scroll to top after virtual reloading the pages */}
      <ScrollToTop></ScrollToTop>
      <TitleChange></ TitleChange>
        <main 
          className={` sm:w-[40rem] md:w-[55rem] lg:w-[70rem]  place-self-center relative grid grid-rows grid-cols-1  justify-center align-center  h-fit bg-[rgb(18,18,18)]`}
        >
          <section
            className={`w-[100%] flex align-center place-self-center relative  h-[2.5rem]`}
          >
            <Navbar></Navbar>
          </section>
          <Routes>
              <Route path="/" element={<Home />} />   {/* стартова сторінка */}

            {buttsNavbar.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<item.component/>}
              />
            ))}
            <Route path="/copyright" element = {<Copyright/>}></Route>
          </Routes>
            <Player></Player>
        </main>
      </BrowserRouter>
    </>
  );
}

export default SoundCloud;
import { Radical } from "lucide-react";
import { Navbar } from "./navbar/Navbar";
// REACT ROUTER!!!
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

// pages for routing
import { Copyright } from "./pages/copyright/Copyright";

import { buttsNavbar } from "./navbar/navbarConfings";

function App() {
  // background dark color:
  // rgb(18,18,18);

  // button color:
  // rgb(48, 48, 48)

  // text color:
  // rgb(72,72,72)

  return (
    <>
      <BrowserRouter>
        <main
          className={`w-[70vw] place-self-center relative grid grid-rows grid-cols-1  justify-center align-center  h-fit bg-[rgb(18,18,18)]`}
        >
          <section
            className={`w-[100%] flex align-center place-self-center relative  h-[2.5rem]`}
          >
            <Navbar></Navbar>
          </section>
          <Routes>
            {buttsNavbar.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<item.component/>}
              />
            ))}
            <Route path="/copyright" element = {<Copyright/>}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

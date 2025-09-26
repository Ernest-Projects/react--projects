import React from "react";
import { useEffect, useRef } from "react";

import { motion } from "motion/react";
import {
  referenceHeaders, CopyrightNavigationList, secondText, thirdText, CopyrightText
} from "./copyrightConfig";
import { div, li, p, ul } from "motion/react-client";

export const Copyright = () => {
  //   const dispatch = useNavbarAppDispatch();
  //     const copyrightRef = useRef<HTMLElement>(null);
  //   useEffect(()=> {
  //   const handleClickForClosingPopup = (event: MouseEvent) => {
  //         dispatch(setAllPopupWindowClose());
  //   }
  //   document.addEventListener("click", handleClickForClosingPopup);
  //   return ()=> document.removeEventListener("click", handleClickForClosingPopup);
  // },
  //   []);

  const refHeaderStyles = "text-white mt-4 font-bold";
  const listElementStyles = "text-blue-400 py-[3px] w-fit hover:underline";
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-2 z-[100] w-[100%]  h-fit grid grid-row-1 grid-cols-7"
      >
        <section className=" pt-4 w-[100%] col-span-5 relative text-white ">
          <header className="text-3xl mb-6 font-bold">Learn about Copyright</header>
          <p className="text-[14px]">
            SoundCloud is a platform for creators and we expect all SoundCloud
            users to respect other people’s copyright.
          </p>
          <ul className="pt-3 pb-6 list-disc list-inside">
          {CopyrightNavigationList.map((item) =>(
            <li className={`${listElementStyles} text-[12px]`}>{item.content}</li>
          ))}
          </ul>
         
          <p className="text-[14px] pb-10"><span className="font-bold mt-4">Please note: </span> This page provides some basic information about copyright. However, nothing on this page constitutes legal advice – please do not treat it as legal advice or as a substitute for legal advice. Please consult a suitably qualified lawyer on any matters related to copyright.</p>
          {CopyrightText.map(item => (
            <p className="text-[14px] pb-10" dangerouslySetInnerHTML={{__html: item.text}}></p>
          ))}
        </section>
        <section className="w-[100%] h-fit col-span-2 sticky top-0 px-2">
          <div className=" bg-[rgb(48,48,48)] px-4 py-1 pb-4 top-0 w-full aspect-[2/1] place-self-center">
            <header className={`${refHeaderStyles} text-md`}>
              Report Copyright Infringement
            </header>
            <p className="text-[12px] my-2 text-[rgb(152,152,152)]">
              If you identify content on SoundCloud that you believe infringes
              your copyright, you can let us know using any of the methods
              explained on these pages.
            </p>
            <button className="bg-[rgb(18,18,18)] hover:text-[rgb(152,152,152)] px-2 py-1 text-center text-white text-sm font-bold rounded-[.2rem]">
              Report Copyright Infringement
            </button>
          </div>
          {referenceHeaders.map((item, index) => (
            <div>
              <p className={refHeaderStyles}>{referenceHeaders[index].name}</p>
              <ul className="text-[12px] py-4">
                {item.reference.map((item) => (
                  <li className={listElementStyles}>
                    <a href="">{item.content}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </motion.main>
    </>
  );
};

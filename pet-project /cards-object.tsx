

import React  from "react"
import { isStyledComponent } from "styled-components"
import type {ISecondCard}  from './types'

export const cards: ISecondCard[] = [

  // CARD 2
  {
    name: <p>About <br /> me</p>,

    content: (<>
      <header style = {{}}>Hello,<br /> I'm Ernest!</header>
      <img src="/360_F_243002875_wa5sn0Uu2DQkdAiij1uRI3e6hGwm6SVt.jpg" alt="" />
      <div style={{ width: "calc(100% - 2rem)", display: "flex", flexDirection: "column", alignItems: "start", paddingLeft: "1rem", justifyContent: "center", height: "35%", bottom: "0", zIndex: "-2", position: "absolute", background: "#FFCE00" }} >

        <div>
          <p> <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="black"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg> facebook</p>
          <p><svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="black"><path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" /></svg> instagram</p>
          <p><svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="black"><path d="m334-80-74-30 58-141q-106-28-172-114T80-560v-160q0-66 47-113t113-47q22 0 42 7.5t40 15.5l238 97-160 60v60l440 280 40 200h-80l-40-80H560v160h-80v-160h-80L334-80Zm66-240h353l-63-40H400q-66 0-113-47t-47-113h80q0 33 23.5 56.5T400-440h165L320-596v-124q0-33-23.5-56.5T240-800q-33 0-56.5 23.5T160-720v160q0 100 70 170t170 70ZM240-680q-17 0-28.5-11.5T200-720q0-17 11.5-28.5T240-760q17 0 28.5 11.5T280-720q0 17-11.5 28.5T240-680Zm160 320Z" /></svg> twitter</p>
        </div>
      </div> </>
    )
    , componentStyle: "secondCard", index: 0

  },
  // CARD 3
  {
    name: "Project 1",
    content: (<>
      <section>
        <p style={{ gap: ".5rem" }}>
          <p>
            PHOTO 1
          </p>
          <span style={{ fontSize: ".3rem", color: "gray", textAlign: "end" }}>
            Dolorem enim velit eum quisqores!
          </span>
        </p>
        <img style={{}} src="/public/plant-card-12.jpg" alt="" />
        <img style={{
        }} src="public/KD005623XFlowerBloosomIlluminatedcopy_grande.webp" alt="" />
        <p style={{ gap: ".5rem" }}> <p>
          PHOTO 2
        </p>
          <span style={{ fontSize: ".3rem", color: "gray", textAlign: "left" }}>
            Dolorem enim velit eum quisqores!
          </span>
        </p>
      </section>
    </>
    ),
    componentStyle: "thirdCard", index: 1
  },
  

  // CARD 4

  {
    name: <p>Table of content</p>,
    content: (
      <>
        <div>
          <p>Project 1
            <p style={{ fontSize: ".2rem", marginTop: ".5rem" }}>Loremcum eiusnobis nesciunt cumque am id corrupti omnis.</p>
          </p>
          <p>Project 2
            <p style={{ fontSize: ".2rem", marginTop: ".5rem" }}>Loremcum eiusnobis nesciunt cumque am id corrupti omnis.</p>
          </p>
        </div>
      </>
    )
    , componentStyle: "fourthCard", index: 2
  },
  // CARD 5
  {
    name: "Project 2",
    content: (<>
      <section>
        <div>
          <p style={{ textAlign: "center" }}>PHOTO 1</p>
          <span style={{ position: "absolute", color: "gray", fontSize: ".3rem", top: "1.5rem", width: "45%", textAlign: "center" }}>   Dolorem enim velit <br /> eum quisqores!  </span>
          <img src="public/there-are-two-white-flowers-with-yellow-centers-vase_1284565-32356.avif" alt="" />
        </div>
        <div>
          <img src="public/there-is-single-white-flower-with-yellow-center-blue-background-generative-ai_958098-32808.jpg" alt="" />
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <p style={{ position: "absolute", bottom: "0" }}>PHOTO 2</p>
            <span style={{ fontSize: ".3rem", textAlign: "center", color: "gray", position: "absolute", bottom: "1.5rem", padding: "0" }}>
              Dolorem enim velit <br /> eum quisqores!
            </span>
          </div>
        </div>
      </section>
    </>
    )
    , componentStyle: "fifthCard", index: 3
  }
]
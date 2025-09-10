import { useAppDispatch, useAppSelector } from "../hooks";
import { useRef } from "react";
import { setAnimateActive, setCardOpened } from "../store/store";

type CardProps = {
  name: number;
  value: {num: number, img: string}
  id: number
};
export const Card = ({value, name, id}: CardProps) => {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const isGameState = useAppSelector((state) => state.game.gameStartState);
  const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards);
  const cardsArray = useAppSelector((state) => state.game.cardsArray)
  const speedAnimation = useAppSelector((state) => state.game.speedOfCardAnimation);
  const dispatch = useAppDispatch();
  dispatch(setAnimateActive(true));

  const cardRef = useRef<HTMLDivElement>(null);

  const handleFocusCard = async (id: number) => {
  // set card opened 
  dispatch(setCardOpened({id: id, opened: true})); 

  const specificCardId = cardsArray[id].id;
  const specificCardOpened = cardsArray[id].opened;
  // console.log(`card ${cardsArray[id].id} opened: `, cardsArray[id].opened);
  // const openedCardsArray = Ar


  // console.log("type of cardArray: ", typeof cardsArray,"type in the card object num and img: ", typeof cardsArray[0].value);
  // const isAllCardsClosed = cardsArray.every((el) => el.opened === false);
    // console.log("all cards closed:", isAllCardsClosed);
    //  logic for cards
    // if (card) { 

    // }
    // if (isAllCardsClosed) {
    //   console.log("all cards closed!");
    // }
    // if (cardsOpened[0] == true && cardsOpened[1] == false) {
    //   console.log("one card opened!");
    // }
 
    // style and animation for cards
    const cardStyle = cardRef.current;
    if (!cardStyle) return;
    cardStyle.style.pointerEvents = "none";
    if (specificCardId === 3) {
      cardStyle.style.background = "red";
    }
    cardStyle.style.transform = "translateZ(7rem) rotateY(0deg) rotateX(0deg)";
    await sleep(300);
    isGameState ? cardStyle.style.transform =
        "translateZ(5rem) rotateY(180deg) rotateX(10deg)" :  cardStyle.style.transform =
          "translateZ(5rem) rotateY(180deg) rotateX(0deg)";
    await sleep(1000 /  speedAnimation);
    cardStyle.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(7rem)";
    await sleep(300);
    cardStyle.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0rem)";
    await sleep(50);
    cardStyle.style.pointerEvents = "all";
    // set card closed
  dispatch(setCardOpened({id: id, opened: false}));
    // console.log(`card ${cardsArray[id].id} opened: `, cardsArray[id].opened);
  };

  return (
    <>
      <div
        ref={cardRef}
        style={{ 
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
        }}
        onClick={() => handleFocusCard(value.num)}
        className={`relative ${
          quantityOfCards === 12 ? "rounded-[.2rem]" : "rounded-[.5rem]"
        }  ${
          isGameState === false ? "bg-[rgb(20,20,20)] " : "bg-[rgb(50,50,50)]"
        } hover:scale-[1.05] duration-400 overflow flex justify-center align-center transition h-[100%] p-2 bg-white aspect-[1/1.5]`}
      >
        <img src={value.img} alt="" style = {{objectFit: "contain"}} className="w-[100%] h-[100%]"/>
        <p
          style={{ transform: "translateZ(1px)" }}
          className={`z-[1000] top-[0] flex justify-center align-center rounded-[.5rem] bg-black absolute w-[100%] h-[100%]`}
        > <p className={` [transform:rotate(-45deg)] absolute place-self-center text-xl text-center text-white font-mono ${quantityOfCards === 6 || quantityOfCards === 8 ? "text-3xl" : "text-2xl"}`}>
          Memory game {value.num-1}
          </p></p>
      </div>
    </>
  );
};

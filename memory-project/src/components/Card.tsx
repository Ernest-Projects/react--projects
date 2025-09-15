import { useAppDispatch, useAppSelector } from "../hooks";
import { useRef, useEffect } from "react";
import {
  setAnimateActive,
  setCardOpened,
  setTransparentCardStyles,
} from "../store/store";

type CardProps = {
  value: { pairNumber: number; imageCard: string };
  id: number;
};
export const Card = ({ value, id }: CardProps) => {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const isGameState = useAppSelector((state) => state.game.gameStartState);
  const historyArray = useAppSelector((state) => state.game.historyState);
  const isCardOpened = useAppSelector((state) => state.game.isCardOpened);
  const isPairDefined = useAppSelector((state) => state.game.isPairDefined);
  const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards);
  const transparentCardStyle = useAppSelector(
    (state) =>
      state.game.transparentCardStylesObject[id] ?? {
        styles: "",
        opened: false,
      }
  );

  const speedAnimation = useAppSelector(
    (state) => state.game.speedOfCardAnimation
  );
  const dispatch = useAppDispatch();

  dispatch(setAnimateActive(true));

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const asyncFun = async () => {
      if (isPairDefined && historyArray[id]) {
        dispatch(
          setTransparentCardStyles({
            styles:
              "opacity-0 pointer-events-none duration-1000 rotateY(180deg) translate-z-[50rem]",
            pair: historyArray[id].cardNumberAndImageObject.pairNumber,
          })
        );
      }
    };
    asyncFun();
  }, [isCardOpened]);

  const handleFocusCard = async (identif: number) => {
    // set card opened
    dispatch(setCardOpened(identif));

    // style and animation for cards
    const cardStyle = cardRef.current;
    if (!cardStyle) return;
    cardStyle.style.pointerEvents = "none";
    cardStyle.style.transform = "translateZ(7rem) rotateY(0deg) rotateX(0deg)";
    await sleep(300);
    isGameState
      ? (cardStyle.style.transform =
          "translateZ(5rem) rotateY(180deg) rotateX(10deg)")
      : (cardStyle.style.transform =
          "translateZ(5rem) rotateY(180deg) rotateX(0deg)");
    await sleep(1000 / speedAnimation);
    cardStyle.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(7rem)";
    await sleep(300);
    cardStyle.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0rem)";
    await sleep(50);
    cardStyle.style.pointerEvents = "all";
  };

  return (
    <>
      <div
        ref={cardRef}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
        }}
        onClick={() => handleFocusCard(id)}
        className={`${transparentCardStyle.styles} relative ${
          quantityOfCards === 12 ? "rounded-[.2rem]" : "rounded-[.5rem]"
        }  ${
          isGameState === false ? "bg-[rgb(20,20,20)] " : "bg-[rgb(50,50,50)]"
        } hover:scale-[1.05] duration-400 absolute overflow flex justify-center align-center transition h-[100%] p-2 bg-white aspect-[1/1.5]`}
      >
        <img
          src={value.imageCard}
          alt=""
          style={{ objectFit: "contain" }}
          className="w-[100%] h-[100%]"
        />
        <p
          style={{
            // boxShadow: "inset 0 0 0 10px black, inset 0 0 0px 11px red",
          }}
          className={`z-[1000] top-[0] flex [transform:translateZ(1px)] justify-center align-center rounded-[.5rem] bg-black absolute w-[100%] h-[100%]`}
        >
          {" "}
          <p
            className={` [transform:rotate(-45deg)] absolute place-self-center text-xl text-center text-white font-mono ${
              quantityOfCards === 6 || quantityOfCards === 8
                ? "text-3xl"
                : "text-2xl"
            }`}
          >
            Memory game{" "}
          </p>
        </p>
      </div>
    </>
  );
};

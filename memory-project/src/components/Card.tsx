import { useAppDispatch, useAppSelector } from "../hooks";
import { useRef } from "react";
import { setAnimateActive } from "../store/store";
type CardProps = {
  name: number;
};
export const Card = ({ name }: CardProps) => {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const isGameState = useAppSelector((state) => state.game.gameStartState);
  const quantityOfCards = useAppSelector((state) => state.game.quantityOfCards)
  const dispatch = useAppDispatch();
  dispatch(setAnimateActive(true))

  const cardRef = useRef<HTMLDivElement>(null);

  const handleFocusCard = async () => {
    const cardStyle = cardRef.current;
        if (!cardStyle) return;
        cardStyle.style.pointerEvents = "none"
      cardStyle.style.transform =
        "translateZ(5rem) rotateY(0deg) rotateX(0deg)";
      await sleep(200);
      if (isGameState) {
          cardStyle.style.transform =
          "translateZ(5rem) rotateY(180deg) rotateX(10deg)";
      }
      else {
          cardStyle.style.transform =
          "translateZ(5rem) rotateY(180deg) rotateX(0deg)";
      }
      await sleep(1000);
      cardStyle.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(5rem)";
      await sleep(300);
      cardStyle.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(0rem)";
      await sleep(100);
      cardStyle.style.pointerEvents = "all";
  };

  return (
    <>
      <div
        ref={cardRef}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "inset 0 0 0 5px black, inset 0 0 0 15px rgb(200,200,200)",
          transformOrigin: "50% 50%",
        }}
        onClick={() => handleFocusCard()}
        className={`relative ${quantityOfCards === 12 ? "rounded-[.2rem]" : "rounded-[.5rem]"}  ${
          isGameState === false
            ? "bg-[rgb(20,20,20)] "
            : "bg-[rgb(50,50,50)]"
        } hover:scale-[1.05] duration-400 transition h-[100%] aspect-[1/1.5]`}
      >
        {" "}
        {name}
        <p
          style={{ transform: "translateZ(1px)" }}
          className={`z-[1000] top-[0] rounded-[.5rem] bg-black absolute w-[100%] h-[100%]`}
        ></p>
      </div>
    </>
  );
};

import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {} from "react";
// import { QueryStatus } from "@reduxjs/toolkit/query";

// tipization for cards and history object for cars
interface CardProps {
  cardIndependentId: number;
  cardNumberAndImageObject: { pairNumber: number; imageCard: string };
}

// typezation of all values in initialState
interface GameState {
  cardsArray: CardProps[];
  transparentCardStylesObject: {
    [cardId: number]: {
      styles: string;
      opened: boolean;
    };
  };
  themeMode: boolean;
  gameStartState: boolean;
  animateActive: boolean;
  isPairDefined: boolean;
  bodyWidth: number;
  quantityOfCards: number;
  transparentCardStyles: string;
  speedOfCardAnimation: 1;
  isGameEnded: boolean;
  isCardOpened: boolean;
  historyState: CardProps[];
}
// random number for image of card
const getRandomIndex = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateInitialCards = (quantity: number): CardProps[] => {
  const imagesObject: { img: string }[] = [];

  for (let i = 0; i < 14; ) {
    const random = getRandomIndex(1, 21);
    if (
      !imagesObject.some((item) => item.img === `/feel${random}.jpg`)
    ) {
      imagesObject.push({ img:`/feel${random}.jpg` });
      i += 1;
    }
  }
  
  const randomImages = [...imagesObject].sort(() => Math.random() - 0.5);
  const uniqueValues = Array.from({ length: quantity / 2 }, (_, index) => ({
    pairNumber: index + 1,
    imageCard: randomImages[index].img,
  }));
  const doubleCards = [...uniqueValues, ...uniqueValues];
  doubleCards.sort(() => Math.random() - 0.5);

  // export const cardImages = {

  return doubleCards.map((cardNumberAndImageObject, index) => ({
    cardIndependentId: index,
    cardNumberAndImageObject,
  }));
};

// yea its a bit hard to understand. Redux for bigger projects so logic may be little harder

const initialState: GameState = {
  themeMode: false,
  gameStartState: false,
  animateActive: false,
  isCardOpened: false,
  isPairDefined: false,
  bodyWidth: document.body.offsetWidth,
  quantityOfCards: 6,
  transparentCardStyles: "",
  isGameEnded: false,
  transparentCardStylesObject: {},
  speedOfCardAnimation: 1,
  cardsArray: generateInitialCards(6),
  historyState: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    //set card opened and inplementation to adding cards in history
    setCardOpened: (state, action) => {
      state.isCardOpened = !state.isCardOpened;

      const id = action.payload;
      const openedCard = state.cardsArray.find(
        (card) => card.cardIndependentId === id
      );

      if (!openedCard) return;
      if (
        state.historyState.length - 1 === -1 ||
        state.historyState[state.historyState.length - 1].cardIndependentId !==
          openedCard.cardIndependentId
      ) {
        state.historyState.push({
          cardNumberAndImageObject: openedCard.cardNumberAndImageObject,
          cardIndependentId: openedCard.cardIndependentId,
        });
      }
      const lastIndexInHistory = state.historyState.length - 1;

      const previousCard = state.historyState[lastIndexInHistory - 1];
      const currentCard = state.historyState[lastIndexInHistory];

      if (lastIndexInHistory >= 1) {
        state.isPairDefined =
          previousCard.cardNumberAndImageObject.pairNumber ===
          currentCard.cardNumberAndImageObject.pairNumber;
      } else {
        state.isPairDefined = false;
      }
    },

    // dark/light theme
    setThemeMode: (state) => {
      state.themeMode = !state.themeMode;
    },
    // dymanic body width
    setBodyWidth: (state, action) => {
      state.bodyWidth = action.payload;
    },
    // main game state
    setGameStartState: (state, action) => {
      state.gameStartState = action.payload;
      state.historyState = [];
      if (state.gameStartState === false) state.isGameEnded = false;
    },
    setResetHisoryOfCards: (state) => {
      state.historyState = [];
    },

    // for some animations
    setAnimateActive: (state, actions) => {
      state.animateActive = actions.payload;
    },
    // dynamic change the quantity of cards in grid field
    setQuantityOfCards: (state, actions) => {
      state.quantityOfCards = actions.payload;
      state.cardsArray = generateInitialCards(state.quantityOfCards);
      state.transparentCardStylesObject = [];
    },
    setTransparentCardStyles: (
      state,
      action: PayloadAction<{ styles: string; pair: number }>
    ) => {
      const { styles } = action.payload;

      const lastIndex = state.historyState.length - 1;
      const previousCard = state.historyState[lastIndex - 1];
      const currentCard = state.historyState[lastIndex];

      if (
        previousCard.cardNumberAndImageObject &&
        previousCard.cardNumberAndImageObject.pairNumber ===
          currentCard.cardNumberAndImageObject.pairNumber
      ) {
        state.transparentCardStylesObject[previousCard.cardIndependentId] = {
          styles,
          opened: true,
        };
        state.transparentCardStylesObject[currentCard.cardIndependentId] = {
          styles,
          opened: true,
        };
      }

      //logic of end the game!
      const openedCardsArray = Object.values(state.transparentCardStylesObject);
        if (openedCardsArray.length === state.quantityOfCards) {
          const allCardsOpenedVerify = Object.values(
            state.transparentCardStylesObject
          ).every((card) => card.opened === true);
          console.log("all cards opened: ", allCardsOpenedVerify);
          state.transparentCardStylesObject = [];
        state.cardsArray = generateInitialCards(state.quantityOfCards);
          state.historyState = [];
          state.isGameEnded = true;
        }
    },
    setRestartTheGameButton: (state, action) => {
      state.isGameEnded = action.payload;
    },
    // control speed of opening card
    setSpeedOfCardAnimation: (state, actions) => {
      state.speedOfCardAnimation = actions.payload;
    },
  },
});
export const {
  setGameStartState,
  setAnimateActive,
  setQuantityOfCards,
  setSpeedOfCardAnimation,
  setBodyWidth,
  setCardOpened,
  setThemeMode,
  setTransparentCardStyles,
  setResetHisoryOfCards,
  setRestartTheGameButton,
} = gameSlice.actions;
export const store = configureStore({
  reducer: { game: gameSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

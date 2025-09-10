import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";

type CardProps = {
  id: number;
  value: { num: number; img: string };
  opened: boolean;
};
// history of last opened cards
type HistoryActionProps = {
  payload: { id: number; opened: boolean };
  cardValue: { num: number; img: string };
  timestamp: string;
};
const generateInitialCards = (quantity: number): CardProps[] => {
  const images = [
    { img: "./public/feel1.jpg" },
    { img: "./public/feel2.jpg" },
    { img: "./public/feel3.jpg" },
    { img: "./public/feel4.jpg" },
    { img: "./public/feel5.jpg" },
    { img: "./public/feel6.jpg" },
    { img: "./public/feel7.jpg" },
    { img: "./public/feel11.jpg" },
    { img: "./public/feel12.jpg" },
    { img: "./public/feel14.jpg" },
    { img: "./public/feel13.jpg" },
  ];
  const randomImages = [...images].sort(() => Math.random() - 0.5);
  const uniqueValues = Array.from({ length: quantity / 2 }, (_, index) => ({
    num: index + 1,
    img: randomImages[index].img,
  }));
  const doubleCards = [...uniqueValues, ...uniqueValues];
  doubleCards.sort(() => Math.random() - 0.5);

  // export const cardImages = {

  return doubleCards.map((value, index) => ({
    id: index,
    value,
    opened: false,
  }));
};

// yea its a bit hard to understand. Redux for bigger projects so logic may be little harder
const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameStartState: false,
    animateActive: false,
    quantityOfCards: 6,
    speedOfCardAnimation: 1,
    cardsArray: generateInitialCards(6) as CardProps[],
    historyState: [] as HistoryActionProps[],
  },
  reducers: {
    //set card opened
    setCardOpened: (
      state,
      action: PayloadAction<{ id: number; opened: boolean }>
    ) => {
      const { id, opened } = action.payload;
      const openedCard = state.cardsArray.find((card) => card.id === id);
      if (openedCard) {
        openedCard.opened = opened;
        state.historyState.push({
          cardValue: openedCard.value,
          payload: { id, opened },
          timestamp: new Date().toISOString(),
        });
      }
    },
    // main game state
    setGameStartState: (state) => {
      state.gameStartState = !state.gameStartState;
    },

    // for some animations
    setAnimateActive: (state, actions) => {
      state.animateActive = actions.payload;
    },
    // dynamic change the quantity of cards in grid field
    setQuantityOfCards: (state, actions) => {
      state.quantityOfCards = actions.payload;
      state.cardsArray = generateInitialCards(actions.payload);
      state.historyState = [];
    },

    // setCardOpened: (state, actions) => {
    //   state.cardsArray.
    // }

    // for open and close the cards
    // toggleCards: (state, action) => {
    //   const index = action.payload;
    //   state.cardsObject[index] = !state.cardsObject[index];
    // },
    // setCardsOpened: (state, action) => {
    //   const {index, value} = action.payload;
    //   state.cardsOpened[index] = value;
    // },
    // resetCards: (state) => {
    //   state.cardsOpened = state.cardsOpened.map(() => false);
    // },

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
  setCardOpened,
} = gameSlice.actions;
export const store = configureStore({
  reducer: { game: gameSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

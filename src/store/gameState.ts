import { atom } from "recoil";

interface GameState {
  isGameStarted: boolean;
  wordLength: null | number;
  word: null | string;
}

const gameState = atom<GameState>({
  key: "gameState",
  default: {
    isGameStarted: false,
    wordLength: null,
    word: null,
  },
});

export default gameState;

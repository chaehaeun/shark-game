import { atom } from "recoil";

const gameState = atom<null | string>({
  key: "gameState",
  default: null,
});

export default gameState;

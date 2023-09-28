import { gameState } from "@/store";
import { useRecoilState } from "recoil";

const Game = () => {
  const [gameSet] = useRecoilState(gameState);
  return <div>{gameSet.word}</div>;
};

export default Game;

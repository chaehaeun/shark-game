import shark from "@/assets/shark.png";
import sky from "@/assets/sky.png";
import water from "@/assets/water.png";
import { gameState } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const COUNT = 7;

const Game = () => {
  const [gameSet] = useRecoilState(gameState);
  const [count, setCount] = useState(COUNT);

  const navigate = useNavigate();

  console.log(gameSet);

  useEffect(() => {
    if (!gameSet.isGameStarted) {
      navigate("/");
    }
  }, [gameSet, navigate]);

  return (
    <>
      <p>{gameSet.word}</p>
      <div className="w-[600px] h-[250px] mx-auto relative rounded-2xl overflow-hidden">
        <img className="absolute top-0 left-0 z-20" src={water} alt="water" />
        <img className="absolute z-10 left-5 top-24" src={shark} alt="shark" />
        <img className="absolute top-0 left-0 " src={sky} alt="sky" />
      </div>

      <p className="my-5 text-center">남은 기회 : {count}회</p>
    </>
  );
};

export default Game;

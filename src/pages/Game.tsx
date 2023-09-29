import shark from "@/assets/shark.png";
import sky from "@/assets/sky.png";
import water from "@/assets/water.png";
import { Button } from "@/components";
import { gameState } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const COUNT = 7;

const Game = () => {
  const [gameSet] = useRecoilState(gameState);
  const [count, setCount] = useState(COUNT);
  const [pressedLetters, setPressedLetters] = useState<string[]>([]);
  const [sharkPosition, setSharkPosition] = useState<number>(0);
  const ifCountLast = count === 1;
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameSet) {
      navigate("/");
    }
  }, [gameSet, navigate]);

  useEffect(() => {
    const newSharkPosition = (COUNT - count) * 65;
    setSharkPosition(newSharkPosition);
  }, [count]);

  const handleLetterClick = (letter: string) => {
    setPressedLetters((prevLetters) => [...prevLetters, letter]);

    if (!gameSet?.includes(letter)) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  console.log(sharkPosition);

  return (
    <>
      <p>{gameSet}</p>
      <div className="w-[600px] h-[250px] mx-auto relative rounded-2xl overflow-hidden">
        <img className="absolute top-0 left-0 z-20" src={water} alt="water" />
        <img
          style={{ transform: `translateX(${sharkPosition}px)` }}
          className={`absolute z-10 transition-transform ease-in-out left-5 top-24 `}
          src={shark}
          alt="shark"
        />
        <img className="absolute top-0 left-0 " src={sky} alt="sky" />
      </div>

      <p className="my-5 text-xl text-center">
        남은 기회 :{" "}
        <span className={`${ifCountLast && "font-bold text-red-600"}`}>
          {count}
        </span>
        회
      </p>

      <ul className="grid grid-cols-9 gap-4 w-[600px] mx-auto justify-between">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(
          (letter, idx) => (
            <li key={idx + letter}>
              <Button
                mode={"letter"}
                onClick={() => handleLetterClick(letter)}
                isActive={pressedLetters.includes(letter)}
              >
                {letter}
              </Button>
            </li>
          )
        )}
      </ul>

      <div>
        <form className="block my-5 text-center ">
          <label htmlFor="guessedWord" className="block">
            예상 답안(오답 시 기회가 1회 차감됩니다.)
          </label>
          <input
            className="px-3 py-2 mr-1 border border-black rounded-md"
            id="guessedWord"
            type="text"
          />
          <Button mode="guess" type="submit">
            제출
          </Button>
        </form>

        <p className="text-center text-red-500">땡! 오답입니다!</p>
      </div>
    </>
  );
};

export default Game;

import shark from "@/assets/shark.png";
import sky from "@/assets/sky.png";
import water from "@/assets/water.png";
import { Button } from "@/components";
import Modal from "@/components/common/Modal";
import { COUNT } from "@/constants";
import useModal from "@/hooks/useModal";
import { gameState } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface GameState {
  isWin: boolean;
  isGameEnd: boolean;
}

const Game = () => {
  const [gameSet] = useRecoilState(gameState);
  const [count, setCount] = useState(COUNT);
  const [pressedLetters, setPressedLetters] = useState<string[]>([]);
  const [sharkPosition, setSharkPosition] = useState<number>(0);
  const [game, setGame] = useState<GameState>({
    isWin: false,
    isGameEnd: false,
  });
  const { showModal, openModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
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

    if (count === 0) {
      setGame({
        isWin: false,
        isGameEnd: true,
      });
      openModal();
    }
  }, [count, openModal]);

  const handleLetterClick = (letter: string) => {
    setPressedLetters((prevLetters) => [...prevLetters, letter]);

    if (!gameSet?.includes(letter)) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const displayWord = () => {
    if (!gameSet) return [];
    const displayed = gameSet
      .split("")
      .map((char) => (pressedLetters.includes(char) ? char : "_"));

    if (!displayed.includes("_") && !game.isGameEnd) {
      setGame({
        isWin: true,
        isGameEnd: true,
      });
      openModal();
    }

    return displayed;
  };

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!gameSet) return;

    const guessedWord = inputRef.current?.value;

    if (guessedWord?.trim() === gameSet) {
      setGame({
        isWin: true,
        isGameEnd: true,
      });
      openModal();
    } else {
      setCount((prevCount) => prevCount - 1);
    }

    inputRef.current!.value = "";
    inputRef.current!.focus();
  };

  return (
    <>
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

      <div className="flex justify-center gap-4 my-5 text-4xl font-bold">
        {displayWord().map((char, idx) => (
          <span key={idx}>{char}</span>
        ))}
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

      <div className="mb-5">
        <form onSubmit={handleAnswerSubmit} className="block my-5 text-center ">
          <label htmlFor="guessedWord" className="block">
            예상 답안(오답 시 기회가 1회 차감)
          </label>
          <input
            className="px-3 py-2 mr-1 border border-black rounded-md"
            id="guessedWord"
            type="text"
            ref={inputRef}
          />
          <Button mode="guess" type="submit">
            제출
          </Button>
        </form>
      </div>

      <Button mode="button" onClick={() => navigate("/")}>
        다시 하기 (메인으로)
      </Button>
      {showModal && (
        <Modal
          onClose={() => navigate("/")}
          opportunity={count}
          isWin={game.isWin}
        />
      )}
    </>
  );
};

export default Game;

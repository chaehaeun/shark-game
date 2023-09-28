import { getWord } from "@/api";
import { Button } from "@/components";
import { WORD_LENGTH } from "@/constants";
import { gameState } from "@/store";
import { useRef } from "react";
import { GiSharkFin } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const Main = () => {
  const [gameSet, setgameSet] = useRecoilState(gameState);
  const selectRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    const selectedLength = selectRef.current?.value;

    if (selectedLength) {
      setgameSet({
        ...gameSet,
        isGameStarted: true,
        wordLength: +selectedLength,
      });

      try {
        const res = await getWord(+selectedLength);
        setgameSet({
          ...gameSet,
          word: res,
        });
        navigate("/game");
      } catch {
        console.log("error");
      }
    }
  };

  return (
    <>
      <h2 className="sr-only">게임 세팅 페이지</h2>
      <div className="flex flex-col items-center">
        <GiSharkFin className="mx-auto w-28 h-28 my-11" />
        <p className="text-center">단어의 길이를 선택해주세요.</p>
        <select
          className="p-2 my-5 border border-black"
          title="Word Length"
          name="wordLength"
          id="wordLength"
          ref={selectRef}
        >
          {WORD_LENGTH.map((length) => (
            <option key={length} value={length}>
              {length}
            </option>
          ))}
        </select>
        <Button onClick={handleClick}>게임 시작하기</Button>
      </div>
    </>
  );
};

export default Main;

import { getWord } from "@/api";
import { Button } from "@/components";
import { WORD_LENGTH } from "@/constants";
import { gameState } from "@/store";
import { useRef, useState } from "react";
import { GiSharkFin } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useSetRecoilState } from "recoil";

const Main = () => {
  const setgameSet = useSetRecoilState(gameState);
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const handleGameSet = async () => {
    const selectedLength = selectRef.current?.value;

    if (selectedLength) {
      setIsLoading(true);
      try {
        const res = await getWord(+selectedLength);
        setgameSet(res[0]);
        navigate("/game");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.response.status === 503) {
          alert("서버가 불안정합니다. 잠시 후 다시 시도해주세요.");
        }

        alert("단어를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
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
        <Button onClick={handleGameSet} mode={"button"}>
          게임 시작하기
          {isLoading && (
            <ClipLoader size={10} color="#ffffff" className="ml-2" />
          )}
        </Button>
      </div>
    </>
  );
};

export default Main;

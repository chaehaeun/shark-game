import { Button } from "@/components";
import { WORD_LENGTH } from "@/constants";
import { GiSharkFin } from "react-icons/gi";

const Main = () => {
  return (
    <>
      <h2 className="sr-only">게임 세팅 페이지</h2>
      <div className="flex flex-col items-center">
        <GiSharkFin className="w-28 h-28 mx-auto my-11" />
        <p className="text-center">단어의 길이를 선택해주세요.</p>
        <select
          className="border border-black p-2 my-5"
          title="Word Length"
          name="wordLength"
          id="wordLength"
        >
          {WORD_LENGTH.map((length) => (
            <option key={length} value={length}>
              {length}
            </option>
          ))}
        </select>
        <Button onClick={() => {}}>게임 시작하기</Button>
      </div>
    </>
  );
};

export default Main;

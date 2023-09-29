import { gameState } from "@/store";
import ReactDOM from "react-dom";
import { useRecoilState } from "recoil";

interface BackdropProps {
  onClose: () => void;
}

interface ModalOverlayProps {
  opportunity: number;
  isWin: boolean;
  onClose: () => void;
}

interface ModalProps extends BackdropProps, ModalOverlayProps {}

const Backdrop = ({ onClose }: BackdropProps) => {
  return (
    <div
      className="fixed top-0 left-0 z-30 w-full h-screen bg-modalBackDrop"
      onClick={onClose}
    ></div>
  );
};

const ModalOverlay = ({ onClose, opportunity, isWin }: ModalOverlayProps) => {
  const [gameSet] = useRecoilState(gameState);

  return (
    <div className="fixed z-30 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black top-1/2 left-1/2 w-80 shadow-wrap">
      <div className="w-full py-6 text-center">
        <span className="text-2xl font-bold">{isWin ? "Win!" : "Lose..."}</span>
        {isWin && <p className="my-2">남은 기회 : {opportunity}</p>}
        <p>정답 : {gameSet}</p>
      </div>
      <button
        className="w-full py-4 text-white transition-colors duration-200 ease-in bg-blue-500 border-t-2 border-black hover:bg-blue-700 focus:bg-blue-700 "
        onClick={onClose}
        type="button"
      >
        메인으로 이동
      </button>
    </div>
  );
};

// 모달을 렌더링하기 위한 포털 요소
const portalElement: HTMLElement | null = document.getElementById("overlays");

const Modal = ({ onClose, opportunity, isWin }: ModalProps) => {
  if (portalElement) {
    return (
      <>
        {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
        {ReactDOM.createPortal(
          <ModalOverlay
            isWin={isWin}
            onClose={onClose}
            opportunity={opportunity}
          />,
          portalElement
        )}
      </>
    );
  }

  return null;
};

export default Modal;

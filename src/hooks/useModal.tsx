import { useCallback, useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  return { showModal, openModal };
};

export default useModal;

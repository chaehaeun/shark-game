import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  mode?: string;
  isActive?: boolean;
}

const Button = ({ children, type, onClick, mode, isActive }: ButtonProps) => {
  const styleMode =
    mode === "letter"
      ? "w-full  aspect-square text-2xl rounded-md"
      : mode === "button"
      ? "px-5 py-3 rounded-3xl"
      : mode === "guess"
      ? "px-3 py-2 rounded-md"
      : "";

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={isActive || false}
      className={`${styleMode} disabled:bg-slate-500 font-bold text-white transition-colors bg-blue-500  hover:bg-blue-700`}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button = ({ children, type, onClick }: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className=" bg-blue-500 py-3 px-5 rounded-3xl text-white font-bold hover:bg-blue-700 transition-colors"
    >
      {children}
    </button>
  );
};

export default Button;

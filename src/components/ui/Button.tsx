import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#1F4B43] text-white hover:bg-[#163732]",

    secondary:
      "bg-[#D8A34D] text-white hover:bg-[#BF903D]",

    outline:
      "border border-[#1F4B43] text-[#1F4B43] hover:bg-[#1F4B43] hover:text-white",
  };

  return (
    <button
      {...props}
      className={`
     rounded-full
px-8
py-4
font-semibold
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      ${variants[variant]}
      ${className}
      `}
    >
      {children}
    </button>
  );
}
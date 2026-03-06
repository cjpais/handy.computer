import React from "react";

const DONATE_URL =
  "https://donate.stripe.com/6oU4gz8762g9790c8Vffy0j";

const variants = {
  header:
    "px-5 py-[6px] rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink",
  mobile:
    "block mx-4 my-2 px-5 py-2 rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink text-center",
  docs:
    "inline-flex items-center justify-center px-8 py-2 text-lg rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink no-underline",
};

interface DonateButtonProps {
  variant?: keyof typeof variants;
  className?: string;
  onClick?: () => void;
}

const DonateButton: React.FC<DonateButtonProps> = ({
  variant = "header",
  className = "",
  onClick,
}) => {
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variants[variant]} ${className}`}
      onClick={onClick}
    >
      donate
    </a>
  );
};

export default DonateButton;

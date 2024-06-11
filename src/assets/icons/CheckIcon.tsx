import { FC, JSX } from "react";

interface Props {
  className?: string;
}

const CheckIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
    >
      <path d="M 20.707 5.586 C 21.098 5.976 21.098 6.61 20.707 7 L 9.707 18 L 9 18.707 L 8.293 18 L 3.293 13 C 2.902 12.61 2.902 11.976 3.293 11.586 C 3.683 11.195 4.317 11.195 4.707 11.586 L 9 15.879 L 19.293 5.586 C 19.683 5.195 20.317 5.195 20.707 5.586 Z"></path>
    </svg>
  );
};

export default CheckIcon;

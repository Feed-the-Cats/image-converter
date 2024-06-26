import { FC, JSX } from "react";

interface Props {
  className?: string;
}

const CropIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
    >
      <path d="M 20.858 16.573 L 18.716 16.573 L 18.716 5.284 L 7.427 5.284 L 7.427 3.142 C 7.427 2.573 7 2 6.284 2 C 5.573 2 5.284 2.573 5.284 3.142 L 5.284 5.284 L 3.142 5.284 C 2.573 5.284 2 5.716 2 6.427 C 2 7.142 2.427 7.573 3.142 7.573 L 5.284 7.573 L 5.284 18.716 L 16.427 18.716 L 16.427 20.858 C 16.427 21.427 16.858 22 17.573 22 C 18.284 22 18.716 21.573 18.716 20.858 L 18.716 18.716 L 20.858 18.716 C 21.427 18.716 22 18.284 22 17.573 C 22 16.858 21.427 16.573 20.858 16.573 Z M 7.427 7.427 L 16.427 7.427 L 16.427 16.427 L 7.427 16.427 L 7.427 7.427 Z" />
    </svg>
  );
};

export default CropIcon;

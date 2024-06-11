import { FC, JSX } from "react";

interface Props {
  className?: string;
}

const CircleIcon: FC<Props> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
    >
      <path d="M 19.5 12 C 19.5 14.047 18.64 15.967 17.303 17.303 C 15.967 18.64 14.047 19.5 12 19.5 C 9.953 19.5 8.033 18.64 6.698 17.303 C 5.36 15.967 4.5 14.047 4.5 12 C 4.5 9.953 5.36 8.033 6.698 6.698 C 8.033 5.36 9.953 4.5 12 4.5 C 14.047 4.5 15.967 5.36 17.303 6.698 C 18.64 8.033 19.5 9.953 19.5 12 Z M 16.798 7.202 C 15.55 5.954 13.898 5.213 12 5.213 C 10.102 5.213 8.45 5.954 7.202 7.202 C 5.954 8.45 5.213 10.102 5.213 12 C 5.213 13.898 5.954 15.55 7.202 16.798 C 8.45 18.046 10.102 18.787 12 18.787 C 13.898 18.787 15.55 18.046 16.798 16.798 C 18.046 15.55 18.787 13.898 18.787 12 C 18.787 10.102 18.046 8.45 16.798 7.202 Z" />
    </svg>
  );
};

export default CircleIcon;

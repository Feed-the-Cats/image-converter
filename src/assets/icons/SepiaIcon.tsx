import { FC } from "react";

interface Props {
  className?: string;
}

export const SepiaIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      xmlSpace="preserve"
      viewBox="0 0 24 24"
    >
      <path d="M 8.83 14.167 C 8.83 14.506 8.542 14.783 8.191 14.783 C 7.843 14.783 7.558 14.506 7.558 14.167 C 7.558 13.829 7.843 13.553 8.191 13.553 C 8.542 13.553 8.83 13.829 8.83 14.167 Z M 8.83 16.627 C 8.83 16.678 8.821 16.728 8.809 16.777 C 9.689 17.531 10.812 17.945 11.999 17.945 L 11.999 6.698 L 8.592 9.989 C 7.679 10.871 7.177 12.038 7.177 13.285 C 7.177 14.282 7.499 15.231 8.097 16.018 C 8.128 16.013 8.16 16.013 8.191 16.013 C 8.542 16.013 8.83 16.287 8.83 16.627 Z M 8.83 11.708 C 8.83 12.047 8.542 12.323 8.191 12.323 C 7.843 12.323 7.558 12.047 7.558 11.708 C 7.558 11.371 7.843 11.093 8.191 11.093 C 8.542 11.093 8.83 11.371 8.83 11.708 Z M 10.102 9.251 C 10.102 8.913 10.388 8.634 10.737 8.634 C 11.087 8.634 11.373 8.913 11.373 9.251 C 11.373 9.587 11.087 9.865 10.737 9.865 C 10.388 9.865 10.102 9.587 10.102 9.251 Z M 11.692 14.167 C 11.692 14.678 11.265 15.089 10.737 15.089 C 10.21 15.089 9.783 14.678 9.783 14.167 C 9.783 13.657 10.21 13.246 10.737 13.246 C 11.265 13.246 11.692 13.657 11.692 14.167 Z M 11.692 11.708 C 11.692 12.219 11.265 12.631 10.737 12.631 C 10.21 12.631 9.783 12.219 9.783 11.708 C 9.783 11.198 10.21 10.786 10.737 10.786 C 11.265 10.786 11.692 11.198 11.692 11.708 Z M 11.373 16.627 C 11.373 16.965 11.087 17.241 10.737 17.241 C 10.388 17.241 10.102 16.965 10.102 16.627 C 10.102 16.287 10.388 16.013 10.737 16.013 C 11.087 16.013 11.373 16.287 11.373 16.627 Z M 16.544 17.679 C 15.29 18.894 13.643 19.5 11.999 19.5 C 10.356 19.5 8.708 18.891 7.455 17.679 C 4.944 15.253 4.944 11.32 7.455 8.893 L 11.999 4.5 L 16.544 8.893 C 19.056 11.32 19.056 15.253 16.544 17.679 Z M 13.282 9.862 C 13.632 9.862 13.919 9.586 13.919 9.247 C 13.919 8.909 13.632 8.633 13.282 8.633 C 12.932 8.633 12.646 8.909 12.646 9.247 C 12.646 9.586 12.932 9.862 13.282 9.862 Z M 15.826 13.55 C 15.479 13.55 15.191 13.826 15.191 14.165 C 15.191 14.502 15.479 14.78 15.826 14.78 C 16.177 14.78 16.463 14.502 16.463 14.165 C 16.463 13.826 16.177 13.55 15.826 13.55 Z M 15.826 11.092 C 15.479 11.092 15.191 11.367 15.191 11.707 C 15.191 12.044 15.479 12.321 15.826 12.321 C 16.177 12.321 16.463 12.044 16.463 11.707 C 16.463 11.367 16.177 11.092 15.826 11.092 Z M 13.282 16.009 C 12.932 16.009 12.646 16.284 12.646 16.623 C 12.646 16.961 12.932 17.239 13.282 17.239 C 13.632 17.239 13.919 16.961 13.919 16.623 C 13.919 16.284 13.632 16.009 13.282 16.009 Z M 13.282 13.241 C 12.753 13.241 12.329 13.654 12.329 14.165 C 12.329 14.674 12.753 15.087 13.282 15.087 C 13.81 15.087 14.235 14.674 14.235 14.165 C 14.235 13.654 13.81 13.241 13.282 13.241 Z M 13.282 10.783 C 12.753 10.783 12.329 11.195 12.329 11.707 C 12.329 12.216 12.753 12.628 13.282 12.628 C 13.81 12.628 14.235 12.216 14.235 11.707 C 14.235 11.195 13.81 10.783 13.282 10.783 Z" />
    </svg>
  );
};

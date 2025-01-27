interface IconProps {
  size?: number;
  className?: string;
  path: string;
}

export const Icon = ({ size = 16, className, path }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d={path}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ICONS = {
  play: "M4 3.83167C4 3.0405 4.87525 2.56266 5.54076 2.99049L12.0248 7.15882C12.6372 7.55246 12.6372 8.44754 12.0248 8.84118L5.54076 13.0095C4.87525 13.4373 4 12.9595 4 12.1683V3.83167Z",
  plus: "M8 4V12M4 8H12",
  delete:
    "M2 4H14M12.6663 4V13.3333C12.6663 14 11.9997 14.6667 11.333 14.6667H4.66634C3.99967 14.6667 3.33301 14 3.33301 13.3333V4M5.33301 3.99992V2.66659C5.33301 1.99992 5.99967 1.33325 6.66634 1.33325H9.33301C9.99967 1.33325 10.6663 1.99992 10.6663 2.66659V3.99992",
} as const;

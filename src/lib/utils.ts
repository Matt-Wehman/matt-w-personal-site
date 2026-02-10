import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPathPercentages = (path: string) => {
  const percentages = path
    .split(" ")
    .filter((segment) => !isNaN(parseFloat(segment)))
    .map((segment) => {
      const [x, y] = segment.split(",").map(Number);
      return { x: x / 2560, y: y / 1440 };
    });
  return percentages;
};

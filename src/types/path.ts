import { type SVGMotionProps } from "motion/react";
export type Path = {
  pathString: string;
  color: string;
  props?: Omit<Partial<SVGMotionProps<SVGPathElement>>, "d" | "stroke">;
};

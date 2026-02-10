import { getPathPercentages } from "@/lib/utils";
import type { Path } from "@/types/path";
import { motion, type SVGMotionProps } from "motion/react";
import { useMemo, useRef } from "react";
import Bus from "./bus";

interface TransitPathProps extends Path {
    dimensions: { width: number, height: number };
    busDelay: number;
    reverseBus: boolean;
}

const DEFAULT_PATH_PROPS: Partial<SVGMotionProps<SVGPathElement>> = {
    strokeWidth: "80",
    fill: "none",
    strokeLinecap: "butt",
    strokeLinejoin: "round",
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: {
        pathLength: { duration: 1, ease: "easeInOut" },
    },
}

const TRANSIT_PATH_OUTLINE_WIDTH = 10;

const TransitPath = ({ pathString, color, props, dimensions, busDelay, reverseBus }: TransitPathProps) => {

    const pathRef = useRef<SVGPathElement>(null);


    const { percentages, pathType } = useMemo(() => { return { percentages: getPathPercentages(pathString), pathType: (pathString[0] === "M" || pathString[0] === "m") ? pathString[0] : 'm' } }, [pathString]);

    const mergedProps = useMemo(() => {
        return {
            ...DEFAULT_PATH_PROPS,
            ...props,
        };
    }, [props]);

    const transitPathOutlineStrokeWidth = useMemo(() => { return Number(mergedProps.strokeWidth) + TRANSIT_PATH_OUTLINE_WIDTH }, [mergedProps.strokeWidth]);

    const computedPathString = useMemo(() => {
        const points = percentages.map(p =>
            `${Math.round(p.x * dimensions.width * 100) / 100},${Math.round(p.y * dimensions.height * 100) / 100}`
        ).join(' ');
        return `${pathType} ${points}`;
    }, [percentages, dimensions.width, dimensions.height, pathType]);

    return (
        <>
            <filter id={`blur-filter-${color}`} filterUnits="userSpaceOnUse" x="0" y="0" width={dimensions.width} height={dimensions.height}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
            {/* Outline */}
            <motion.path
                d={computedPathString}
                {...mergedProps}
                stroke={"var(--background)"}
                strokeWidth={transitPathOutlineStrokeWidth}
            />
            {/* Path */}
            <motion.path
                d={computedPathString}
                stroke={`var(${color})`}
                {...mergedProps}
                opacity={1}
                ref={pathRef}
            />
            {/* Blur and fade effect */}
            <motion.path
                {...mergedProps}
                d={computedPathString}
                stroke={"#000000"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{
                    pathLength: { duration: 1, ease: "easeInOut" },
                    opacity: { duration: 1, ease: "easeInOut", delay: 0.5 },
                }}
                filter={`url(#blur-filter-${color})`}
            />
            <Bus transitPathRef={pathRef} color={color} busDelay={busDelay} reverse={reverseBus} />
        </>

    )
}

export default TransitPath
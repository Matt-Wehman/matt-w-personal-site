import { cn } from "@/lib/utils";
import type { Path } from "@/types/path";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import TransitPath from "./transit-path";

interface TransitPathSvgContainerProps {
    fixedPaths?: boolean;
    paths: Path[];
}

const TransitPathSvgContainer = ({ fixedPaths = false, paths }: TransitPathSvgContainerProps) => {
    const [viewBox, setViewBox] = useState<string>('0 0 100 100');
    const [dimensions, setDimensions] = useState({ width: 2560, height: 1440 });
    const observedElementRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (observedElementRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const { width, height } = entry.contentRect;
                    const aspectRatio = width / height;
                    const baseHeight = 1440;
                    const baseWidth = baseHeight * aspectRatio;
                    setDimensions({ width: baseWidth, height: baseHeight });
                    setViewBox(`0 0 ${baseWidth} ${baseHeight}`);
                }
            });

            observer.observe(observedElementRef.current);

            // Cleanup function
            return () => {
                observer.disconnect();
            };
        }
    }, []);
    return (
        <motion.svg
            viewBox={viewBox}
            className={cn("h-full w-full", fixedPaths && 'fixed z-40')}
            preserveAspectRatio="none"
            ref={observedElementRef}
        >
            {paths.map((path, index) => (
                <TransitPath key={index} {...path} dimensions={dimensions} busDelay={index * 1000} reverseBus={index % 2 === 0 ? true : false} />
            ))}
        </motion.svg>
    )
}

export default TransitPathSvgContainer;
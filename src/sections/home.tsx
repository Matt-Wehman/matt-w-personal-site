import TransitPath from "@/components/blocks/home/transit-path";
import { TRANSIT_PATHS } from "@/constants/transit-paths";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Home() {

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
                    setDimensions({
                        width: baseWidth,
                        height: baseHeight,
                    });
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
        <>
            <motion.div style={{ width: '100vw', height: '100vh' }}>
                <motion.p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[22rem] tracking-wide text-white text-center w-full pointer-events-none text-shadow-lg/30" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}>
                    Matthew Wehman
                </motion.p>
                <motion.svg
                    viewBox={viewBox}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    preserveAspectRatio="xMidYMid meet"
                    ref={observedElementRef}
                >
                    <>
                        {TRANSIT_PATHS.map((path, index) => (
                            <TransitPath key={index} {...path} dimensions={dimensions} busDelay={index * 1000} reverseBus={index % 2 === 0 ? true : false} />
                        ))}
                    </>
                </motion.svg>
            </motion.div>
        </>
    )
}

export default Home
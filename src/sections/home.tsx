import TransitPathSvgContainer from "@/components/shared/transit-paths/transit-path-svg-container";
import { TRANSIT_PATHS } from "@/constants/transit-paths";
import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";

function Home() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.5],
        [1, 0],
    );

    const transitPaths = useMemo(() => {
        return <TransitPathSvgContainer paths={TRANSIT_PATHS} />
    }, []);

    return (
        <>

            <motion.div className="z-50 absolute h-screen w-screen snap-center bg-transparent" ref={ref} style={{ opacity }}>
                <motion.p
                    className="absolute z-99 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[clamp(3rem,20vw,40rem)] tracking-wide text-white text-center w-full pointer-events-none text-shadow-lg/30 padding-1"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                >
                    Matthew Wehman
                </motion.p>
            </motion.div>
            <motion.div className="relative h-screen w-screen snap-center" ref={ref} style={{ opacity }}>
                {transitPaths}
                <div className="absolute inset-0 bg-linear-to-t from-[rgba(10,10,10,1)] from-0% to-[rgba(0,0,0,0)] to-20%" />
            </motion.div>

        </>
    )
}

export default Home
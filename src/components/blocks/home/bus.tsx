import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

interface BusProps {
    transitPathRef: React.RefObject<SVGPathElement | null>;
    color: string;
    reverse: boolean;
    busDelay: number;
}

const Bus = ({ transitPathRef, color, busDelay, reverse }: BusProps) => {
    const pathProgress = useMotionValue(reverse ? 1 : 0);
    const [moving, setMoving] = useState(false);

    useEffect(() => {
        if (!transitPathRef.current) return;
        const timeout = setTimeout(() => {
            animate(pathProgress, reverse ? 0 : 1, {
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            });
            setMoving(true);
        }, 1000 + busDelay);

        return () => clearTimeout(timeout);
    }, [transitPathRef, pathProgress, busDelay, reverse]);

    const busX = useTransform(pathProgress, (progress) => {
        if (!transitPathRef.current) return 0;
        const path = transitPathRef.current;
        const pathLength = path.getTotalLength();
        const point = path.getPointAtLength(progress * pathLength);
        return point.x;
    });

    const busAngle = useTransform(pathProgress, (progress) => {
        if (!transitPathRef.current) return 0;
        const path = transitPathRef.current;
        const pathLength = path.getTotalLength();
        const currentPoint = path.getPointAtLength(progress * pathLength);
        const nextPoint = path.getPointAtLength(Math.min(progress + 0.02, 1) * pathLength);
        const angleRad = Math.atan2(
            nextPoint.y - currentPoint.y,
            nextPoint.x - currentPoint.x
        );
        const angleDeg = (angleRad * 180) / Math.PI;
        const newAngle = angleDeg > 2 || angleDeg < -2 ? angleDeg : 0;
        return reverse ? newAngle + -180 : newAngle;
    });

    const busY = useTransform(pathProgress, (progress) => {
        if (!transitPathRef.current) return 0;
        const path = transitPathRef.current;
        const pathLength = path.getTotalLength();
        const point = path.getPointAtLength(progress * pathLength);
        return point.y;
    });

    return (
        <motion.g
            style={{ x: busX, y: busY, rotate: busAngle }}
            opacity={moving ? 1 : 0}
        >
            <g transform="scale(4) translate(-15, -7.5)">
                <motion.path
                    d="M 5.8586133,1.1387396
                        A 1.9066163,0.23522804 0 0 1 7.765229,1.3739686 1.9066163,0.23522804 0 0 1 5.8586133,1.6091994 1.9066163,0.23522804 0 0 1 3.9519977,1.3739686 1.9066163,0.23522804 0 0 1 5.8586133,1.1387396
                        Z

                        M 21.167629,1.1120351
                        a 1.9066163,0.23522804 0 0 1 1.906615,0.2352381 1.9066163,0.23522804 0 0 1 -1.906615,0.2352273 1.9066163,0.23522804 0 0 1 -1.90662,-0.2352273 1.9066163,0.23522804 0 0 1 1.90662,-0.2352381
                        z

                        m 0.184734,12.1725829
                        a 1.9066163,0.23522804 0 0 1 1.906617,0.235228 1.9066163,0.23522804 0 0 1 -1.906617,0.23523 1.9066163,0.23522804 0 0 1 -1.906616,-0.23523 1.9066163,0.23522804 0 0 1 1.906616,-0.235228
                        z

                        M 6.1270934,13.301038
                        A 1.9066163,0.23522804 0 0 1 8.0337108,13.536278 1.9066163,0.23522804 0 0 1 6.1270934,13.771506 1.9066163,0.23522804 0 0 1 4.2204777,13.536278 1.9066163,0.23522804 0 0 1 6.1270934,13.30105
                        Z

                        M 4.4854009,4.8995129 2.5497076,4.9531333

                        M 4.4885747,9.9843621 2.508677,9.973056

                        m 23.777561,2.673603 -2.311067,0.09267 -9.8e-5,-10.6099623 2.316344,0.072197
                        z

                        m 0.446094,-10.256839 0.722164,-0.00279 0.0031,1.2066478
                        z

                        m -0.05208,10.127625 0.830994,0.01198 -0.0058,-1.289728
                        z

                        M 11.289576,4.8995873 23.556947,4.8972708

                        m -12.26536,5.0865429 12.26175,3.94e-4

                        m 0.0074,3.0019493
                        c 0.0097,-4.1568096 -0.0124,-7.8579912 -0.0027,-11.0917617

                        M 4.4272931,9.9946826
                        h 6.9247489
                        l -0.02044,-5.1146884 -6.9043238,0.041593
                        z

                        m 3.3826238,3.2930794 15.7127651,-0.0265 4.769482,-0.160901 0.01404,-11.3311161 -4.813583,-0.1375717 -20.4893338,3.6e-6 -0.3707759,0.4646411 -3.685e-4,10.6931411 0.3396865,0.463864
                        z"
                    stroke={`var(${color})`}
                    strokeWidth="0.5"
                    fillOpacity={0.75}
                />
            </g>
        </motion.g>
    );
};

export default Bus;
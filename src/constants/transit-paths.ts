import type { Path } from "@/types/path";

// Strings from inkscape
const GREEN_TRANSIT_PATH: Path = {
  pathString: "M 2249.8523,1499.343 2248.2521,572.24776 1589.8195,-85.280451",
  color: "--color-green-400",
};

const BLUE_TRANSIT_PATH: Path = {
  pathString: "M 133.61718,1521.0981 133.91932,-40.796916",
  color: "--color-blue-400",
};

const ORANGE_TRANSIT_PATH: Path = {
  pathString: "M -143.09369,210.27792 1373.3504,438.0063 2692.4353,880.12277",
  color: "--color-orange-400",
};

const PURPLE_TRANSIT_PATH: Path = {
  pathString: "m -100.24799,1055.347 1831.11449,-0.4673 984.1047,227.4397",
  color: "--color-violet-400",
};

const YELLOW_TRANSIT_PATH: Path = {
  pathString: "M -135.37578,669.6633 1725.03,670.11842 2758.8559,156.06192",
  color: "--color-yellow-400",
};

// const RED_TRANSIT_PATH: Path = {
//   pathString: "m 1140.0747,-68.860203 -0.015,873.762223 521.2458,688.62358",
//   color: "--color-red-400",
// };

export const BLUE_PATH = BLUE_TRANSIT_PATH;

export const TRANSIT_PATHS = [
  ORANGE_TRANSIT_PATH,
  PURPLE_TRANSIT_PATH,
  YELLOW_TRANSIT_PATH,
  //RED_TRANSIT_PATH,
  GREEN_TRANSIT_PATH,
];

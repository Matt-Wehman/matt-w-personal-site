import type { Path } from "@/types/path";

// Strings from inkscape
const GREEN_TRANSIT_PATH: Path = {
  pathString: "M 225.04426,1439.6712 225.00495,554.9727 804.46576,-38.39099",
  color: "--color-green-400",
};

const BLUE_TRANSIT_PATH: Path = {
  pathString: "M 2229.955,1440.2611 2230.1029,-0.0771208",
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

const RED_TRANSIT_PATH: Path = {
  pathString: "m 1140.0747,-68.860203 -0.015,873.762223 521.2458,688.62358",
  color: "--color-red-400",
};

export const TRANSIT_PATHS = [
  ORANGE_TRANSIT_PATH,
  PURPLE_TRANSIT_PATH,
  YELLOW_TRANSIT_PATH,
  RED_TRANSIT_PATH,
  BLUE_TRANSIT_PATH,
  GREEN_TRANSIT_PATH,
];

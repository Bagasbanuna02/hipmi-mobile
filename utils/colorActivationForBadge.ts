import { AccentColor } from "@/constants/color-palet";

export const colorActivationForBadge = ({ status }: { status: boolean }) => {
  if (status) {
    return AccentColor.blue;
  } else {
    return AccentColor.blackgray;
  }
};

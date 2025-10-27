import { MainColor } from "@/constants/color-palet";

export const colorBadge = ({ status }: { status: string }) => {
  const statusLowerCase = status.toLowerCase();
  if (statusLowerCase === "publish") {
    return MainColor.green;
  } else if (statusLowerCase === "review") {
    return MainColor.orange;
  } else if (statusLowerCase === "reject") {
    return MainColor.red;
  } else {
    return MainColor.placeholder;
  }
};

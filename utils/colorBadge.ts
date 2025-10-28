import { AccentColor, MainColor } from "@/constants/color-palet";

export const colorBadgeStatus = ({ status }: { status: string }) => {
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

export const colorBadgeTransaction = ({ status }: { status: string }) => {
  const statusLowerCase = status.toLowerCase();
  if (statusLowerCase === "berhasil") {
    return MainColor.green;
  } else if (statusLowerCase === "menunggu") {
    return MainColor.orange;
  } else if (statusLowerCase === "gagal") {
    return MainColor.red;
  } else {
    return AccentColor.blue;
  }
};

import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Entypo, FontAwesome, FontAwesome6, Octicons } from "@expo/vector-icons";

export const IconPublish = ({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <>
      <Entypo
        name="publish"
        size={size || ICON_SIZE_MEDIUM}
        color={color || MainColor.white}
      />
    </>
  );
};

export const IconReview = ({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <>
      <FontAwesome6
        name="person-circle-check"
        size={size || ICON_SIZE_MEDIUM}
        color={color || MainColor.white}
      />
    </>
  );
};

export const IconReject = ({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <>
      <FontAwesome
        name="warning"
        size={size || ICON_SIZE_MEDIUM}
        color={color || MainColor.white}
      />
    </>
  );
};

export const IconReport = ({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <>
      <Octicons
        name="report"
        size={size || ICON_SIZE_MEDIUM}
        color={color || MainColor.white}
      />
    </>
  );
};

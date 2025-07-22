import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";

/**
 *
 * @param path - path to navigate to ?
 * @default router.back()
 * @returns if path : router.replace(path) else router.back()
 */
const LeftButtonCustom = ({
  path,
  icon = "arrow-back",
  iconCustom,
}: {
  path?: Href;
  icon?: React.ReactNode | any;
  iconCustom?: React.ReactNode;
}) => {
  return (
    <>
      {iconCustom ? (
        iconCustom
      ) : (
        <Ionicons
          name={icon}
          size={20}
          color={MainColor.yellow}
          onPress={() => (path ? router.replace(path) : router.back())}
        />
      )}
    </>
  );
};

export default LeftButtonCustom;

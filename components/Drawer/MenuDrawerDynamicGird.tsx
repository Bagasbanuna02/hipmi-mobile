/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccentColor, MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_SMALL } from "@/constants/constans-value";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IMenuDrawerItem } from "../_Interface/types";
import { Href } from "expo-router";

type IMenuDrawerItemProps = {
  icon: React.ReactNode;
  label: string;
  value?: string;
  path?: Href | string;
  color?: string;
};

interface MenuDrawerDynamicGridProps {
  data: IMenuDrawerItemProps[];
  columns?: number;
  onPressItem?: (item: IMenuDrawerItemProps) => void;
}
const MenuDrawerDynamicGrid = ({
  data,
  columns = 4,
  onPressItem,
}: MenuDrawerDynamicGridProps) => {
  const numColumns = columns;

  return (
    <View style={styles.container}>
      {data.map((item: IMenuDrawerItemProps, index: any) => (
        <TouchableOpacity
          key={index}
          style={[styles.itemContainer, { flexBasis: `${100 / numColumns}%` }]}
          onPress={() => onPressItem?.(item)}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: item.color || AccentColor.blue },
            ]}
          >
            {item.icon}
            {/* <Ionicons
              name={item.icon}
              size={ICON_SIZE_MEDIUM}
              color={item.color || MainColor.white_gray}
            /> */}
          </View>
          <Text
            style={[styles.label, { color: item.color || AccentColor.white }]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuDrawerDynamicGrid;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
  },
  itemContainer: {
    padding: 10,
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AccentColor.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 10,
    fontSize: TEXT_SIZE_SMALL,
    textAlign: "center",
    color: MainColor.white_gray,
  },
});

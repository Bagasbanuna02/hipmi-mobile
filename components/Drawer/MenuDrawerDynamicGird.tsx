import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM, TEXT_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MenuDrawerDynamicGrid = ({ data, columns = 3, onPressItem }: any) => {
  const numColumns = columns;

  return (
    <View style={styles.container}>
      {data.map((item: any, index: any) => (
        <TouchableOpacity
          key={index}
          style={[styles.itemContainer, { flexBasis: `${100 / numColumns}%` }]}
          onPress={() => onPressItem?.(item)}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={item.icon}
              size={ICON_SIZE_MEDIUM}
              color={item.color || MainColor.white_gray}
            />
          </View>
          <Text style={styles.label}>{item.label}</Text>
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
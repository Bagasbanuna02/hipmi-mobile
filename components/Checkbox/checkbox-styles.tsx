import { MainColor } from "@/constants/color-palet";
import { StyleSheet } from "react-native";

export const checkboxStyles = (props: {
  size: number;
  color: string;
  disabled: boolean;
  error: boolean;
}) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
      //   marginBottom: 12,
    },
    innerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    box: {
      width: props.size,
      height: props.size,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: props.error
        ? "#fff"
        : props.disabled
        ? "#ced4da"
        : props.color,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    checked: {
      backgroundColor: props.color,
      borderColor: props.color,
    },
    checkIcon: {
      color: MainColor.white,
      fontWeight: "bold",
      fontSize: props.size * 0.6,
    },
    labelWrapper: {
      flex: 1,
    },
    label: {
      fontSize: props.size * 0.6,
      color: props.disabled ? MainColor.disabled : MainColor.white,
      fontWeight: "500",
    },
    description: {
      fontSize: props.size * 0.5,
      color: props.disabled ? MainColor.disabled : MainColor.white,
      marginTop: 2,
    },
    errorText: {
      color: MainColor.red,
      fontSize: props.size * 0.5,
      marginTop: 2,
    },
  });

import { StyleSheet, TouchableOpacity } from "react-native";

export default function ClickableCustom({
  children,
  onPress,
  disabled,
  style,
  ...props
}: {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  [key: string]: any;
}) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
        style={[styles.container, style]}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
  },
});

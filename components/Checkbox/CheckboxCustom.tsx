import { AccentColor, MainColor } from "@/constants/color-palet";
import { MaterialIcons } from "@expo/vector-icons"; // Bisa diganti dengan ikon lain
import React, { useContext } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { checkboxStyles } from "./checkbox-styles";

// Context untuk Group
interface CheckboxGroupContextType {
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  disabled?: boolean;
}

const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextType | null>(null);

// Tipe props
// Tambahkan prop baru: groupValueKey
interface CheckboxProps {
  label?: string | React.ReactNode;
  description?: string;
  error?: string;
  value?: boolean; // controlled value (untuk standalone)
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: number;
  color?: string;
  style?: object;
  component?: React.ReactNode;
  // Prop tambahan untuk Group
  valueKey?: string | number; // nilai unik untuk identifikasi di group
}

const CheckboxCustom: React.FC<CheckboxProps> = ({
  label,
  description,
  error,
  value: controlledValue,
  onChange,
  disabled: propDisabled,
  size = 20,
  color = MainColor.yellow,
  style,
  component,
  valueKey,
}) => {
  //   const [uncontrolledChecked, setUncontrolledChecked] = useState(false);
  //   const isChecked = controlledValue ?? uncontrolledChecked;
  //   const scaleValue = new Animated.Value(isChecked ? 1 : 0);

  const group = useContext(CheckboxGroupContext);
  const isInsideGroup = !!group && valueKey !== undefined;

  // Jika di dalam group, gunakan logika group
  const isChecked = isInsideGroup
    ? group.value.includes(valueKey!)
    : controlledValue ?? false;

  const disabled = propDisabled || (isInsideGroup && group.disabled);

  const scaleValue = new Animated.Value(isChecked ? 1 : 0);

  const toggle = () => {
    if (disabled) return;

    if (isInsideGroup) {
      const newValue = isChecked
        ? group.value.filter((v) => v !== valueKey)
        : [...group.value, valueKey!];
      group.onChange(newValue);
    } else if (onChange) {
      onChange(!controlledValue);
    }
  };

  const styles = checkboxStyles({
    size,
    color,
    disabled: disabled as boolean,
    error: !!error,
  });

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={toggle}
      style={[styles.container, style]}
      disabled={disabled}
    >
      <View style={styles.innerContainer}>
        <View style={[styles.box, isChecked && !disabled && styles.checked]}>
          {isChecked && (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: scaleValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              }}
            >
              <MaterialIcons name="check" size={size * 0.6} color="#fff" />
            </Animated.View>
          )}
        </View>
        {component}
        {(label || description) && (
          <View style={styles.labelWrapper}>
            {label ? (
              <Text style={styles.label} numberOfLines={1}>
                {label}
              </Text>
            ) : null}
            {description ? (
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
            ) : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CheckboxCustom;

// Export context agar bisa digunakan
export { CheckboxGroupContext };

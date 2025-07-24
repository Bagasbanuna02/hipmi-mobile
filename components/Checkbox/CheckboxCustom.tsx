import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Bisa diganti dengan ikon lain
import { checkboxStyles } from "./checkbox-styles";


// Tipe props
interface CheckboxProps {
  label?: string;
  description?: string;
  error?: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: number; // ukuran checkbox (default: 20)
  color?: string; // warna utama (default: '#3b82f6' - biru tailwind)
  style?: object;
  component?: React.ReactNode;
}

export const CheckboxCustom: React.FC<CheckboxProps> = ({
  label,
  description,
  error,
  value: controlledValue,
  onChange,
  disabled = false,
  size = 20,
  color = "#3b82f6",
  style,
  component,
}) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false);
  const isChecked = controlledValue ?? uncontrolledChecked;
  const scaleValue = new Animated.Value(isChecked ? 1 : 0);

  const toggle = () => {
    if (disabled) return;

    const newValue = !isChecked;
    if (onChange) onChange(newValue);
    if (controlledValue === undefined) {
      setUncontrolledChecked(newValue);
    }

    // Animasi scale
    Animated.spring(scaleValue, {
      toValue: newValue ? 1 : 0,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const styles = checkboxStyles({
    size,
    color,
    disabled,
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

export default CheckboxCustom

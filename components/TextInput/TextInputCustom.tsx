import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { textInputStyles } from "./textInputStyles";

type IconType = React.ReactNode | string;

type Props = {
  iconLeft?: IconType;
  iconRight?: IconType;
  label?: string;
  required?: boolean;
  error?: string;
  secureTextEntry?: boolean;
  fontColor?: string;
  disabled?: boolean;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
} & Omit<React.ComponentProps<typeof RNTextInput>, "style">;

export const TextInputCustom = ({
  iconLeft,
  iconRight,
  label,
  required = false,
  error: externalError = "",
  secureTextEntry = false,
  fontColor = "#000",
  disabled = false,
  borderRadius = 8,
  style,
  keyboardType,
  onChangeText,
  ...rest
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [internalError, setInternalError] = useState("");

  // Helper untuk render ikon
  const renderIcon = (icon: IconType) => {
    if (!icon) return null;
    return typeof icon === "string" ? (
      <Text style={textInputStyles.iconText}>{icon}</Text>
    ) : (
      icon
    );
  };

  // Validasi email jika keyboardType = email-address
  const handleTextChange = (text: string) => {
    if (keyboardType === "email-address") {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
      if (!isValid) {
        setInternalError("Masukkan email yang valid");
      } else {
        setInternalError("");
      }
    }

    // Panggil onChangeText eksternal jika ada
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={textInputStyles.container}>
      {label && (
        <Text style={textInputStyles.label}>
          {label}
          {required && <Text style={textInputStyles.required}> *</Text>}
        </Text>
      )}
      <View
        style={[
          textInputStyles.inputContainer,
          disabled && textInputStyles.disabled,
          { borderRadius },
          externalError || internalError ? textInputStyles.errorBorder : null,
          style,
        ]}
      >
        {iconLeft && (
          <View style={textInputStyles.icon}>{renderIcon(iconLeft)}</View>
        )}
        <RNTextInput
          style={[textInputStyles.input, { color: fontColor }]}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onChangeText={handleTextChange}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={textInputStyles.icon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        )}
        {iconRight && (
          <View style={textInputStyles.icon}>{renderIcon(iconRight)}</View>
        )}
      </View>
      {/* Prioritaskan error eksternal */}
      {externalError || internalError ? (
        <Text style={textInputStyles.errorMessage}>
          {externalError || internalError}
        </Text>
      ) : null}
    </View>
  );
};

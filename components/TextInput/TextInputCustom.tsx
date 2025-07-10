import { GStyles } from "@/styles/global-styles";
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
  maxLength?: number;
} & Omit<React.ComponentProps<typeof RNTextInput>, "style">;

const TextInputCustom = ({
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
  maxLength,
  ...rest
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [internalError, setInternalError] = useState("");

  // Helper untuk render ikon
  const renderIcon = (icon: IconType) => {
    if (!icon) return null;
    return typeof icon === "string" ? (
      <Text style={GStyles.inputIconText}>{icon}</Text>
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
    <View style={GStyles.inputContainerArea}>
      {label && (
        <Text style={GStyles.inputLabel}>
          {label}
          {required && <Text style={GStyles.inputRequired}> *</Text>}
        </Text>
      )}
      <View
        style={[
          style,
          { borderRadius },
          externalError || internalError ? GStyles.inputErrorBorder : null,
          GStyles.inputContainerInput,
          disabled && GStyles.disabledBox,
        ]}
      >
        {iconLeft && (
          <View style={GStyles.inputIcon}>{renderIcon(iconLeft)}</View>
        )}
        <RNTextInput
          style={[
            GStyles.inputText,
            { color: fontColor },
            disabled && GStyles.inputPlaceholderDisabled, // <-- placeholder saat disabled
          ]}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onChangeText={handleTextChange}
          maxLength={maxLength}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={GStyles.inputIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        )}
        {iconRight && (
          <View style={GStyles.inputIcon}>{renderIcon(iconRight)}</View>
        )}
      </View>
      {/* Prioritaskan error eksternal */}
      {externalError || internalError ? (
        <Text style={GStyles.inputErrorMessage}>
          {externalError || internalError}
        </Text>
      ) : null}
    </View>
  );
};

export default TextInputCustom;

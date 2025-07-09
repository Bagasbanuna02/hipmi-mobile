import React, { useEffect, useState } from "react";
import {
  TextInput as RNTextInput,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { textInputStyles } from "../TextInput/textInputStyles";

type IconType = React.ReactNode | string;

type BaseProps = {
  iconLeft?: IconType;
  iconRight?: IconType;
  label?: string;
  required?: boolean;
  error?: string;
  fontColor?: string;
  disabled?: boolean;
  borderRadius?: number;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  showCount?: boolean;
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
};

type NativeTextInputProps = Omit<
  React.ComponentProps<typeof RNTextInput>,
  "style"
>;

export type TextAreaCustomProps = BaseProps & NativeTextInputProps;

const TextAreaCustom: React.FC<TextAreaCustomProps> = ({
  iconLeft,
  iconRight,
  label,
  required = false,
  error = "",
  fontColor = "#000",
  disabled = false,
  borderRadius = 8,
  autosize = false,
  minRows = 3,
  maxRows = 6,
  showCount = false,
  maxLength,
  value,
  onChangeText,
  style,
  ...rest
}) => {
  const [numberOfLines, setNumberOfLines] = useState(minRows);

  // Autosizing logic
  useEffect(() => {
    if (!autosize || !value) return;

    const text = value as string;
    const lines = text.split("\n").length;
    const newLines = Math.max(minRows, Math.min(maxRows, lines));
    setNumberOfLines(newLines);
  }, [value, autosize, minRows, maxRows]);

  const hasError = Boolean(error);

  const renderIcon = (icon: IconType) => {
    if (!icon) return null;
    return typeof icon === "string" ? (
      <Text style={textInputStyles.iconText}>{icon}</Text>
    ) : (
      icon
    );
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
          hasError ? textInputStyles.errorBorder : {},
          { borderRadius },
          style,
        ]}
      >
        {iconLeft && (
          <View style={textInputStyles.icon}>{renderIcon(iconLeft)}</View>
        )}

        <RNTextInput
          maxLength={maxLength}
          multiline
          numberOfLines={numberOfLines}
          style={[
            textInputStyles.input,
            textInputStyles.textArea,
            { color: fontColor },
          ]}
          editable={!disabled}
          value={value as string}
          onChangeText={onChangeText}
          {...rest}
        />

        {iconRight && (
          <View style={textInputStyles.icon}>{renderIcon(iconRight)}</View>
        )}
      </View>

      {/* Error Message atau Counter */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
          minHeight: 16,
        }}
      >
        {hasError ? (
          <Text style={textInputStyles.errorMessage}>{error}</Text>
        ) : null}

        {showCount && maxLength ? (
          <Text style={textInputStyles.inputLength}>
            {(value as string)?.length || 0}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default TextAreaCustom;

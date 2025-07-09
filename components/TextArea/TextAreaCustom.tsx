import { GStyles } from "@/styles/global-styles";
import React, { useEffect, useState } from "react";
import {
    TextInput as RNTextInput,
    StyleProp,
    Text,
    View,
    ViewStyle,
} from "react-native";

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
      <Text style={GStyles.inputIconText}>{icon}</Text>
    ) : (
      icon
    );
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
          GStyles.inputContainerInput,
          disabled && GStyles.disabledBox,
          hasError ? GStyles.inputErrorBorder : {},
          { borderRadius },
          style,
        ]}
      >
        {iconLeft && (
          <View style={GStyles.inputIcon}>{renderIcon(iconLeft)}</View>
        )}

        <RNTextInput
          maxLength={maxLength}
          multiline
          numberOfLines={numberOfLines}
          style={[
            GStyles.inputText,
            GStyles.textAreaInput,
            { color: fontColor },
          ]}
          editable={!disabled}
          value={value as string}
          onChangeText={onChangeText}
          {...rest}
        />

        {iconRight && (
          <View style={GStyles.inputIcon}>{renderIcon(iconRight)}</View>
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
          <Text style={GStyles.inputErrorMessage}>{error}</Text>
        ) : null}

        {showCount && maxLength ? (
          <Text style={GStyles.inputMaxLength}>
            {(value as string)?.length || 0}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default TextAreaCustom;

import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckboxGroupContext } from "./CheckboxCustom";

interface CheckboxGroupProps {
  value?: (string | number)[];
  onChange?: (values: (string | number)[]) => void;
  defaultValue?: (string | number)[];
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  children: React.ReactNode;
  style?: object;
}
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value: controlledValue,
  onChange,
  defaultValue = [],
  label,
  description,
  error,
  disabled = false,
  children,
  style,
}) => {
  const [uncontrolledValue, setUncontrolledValue] =
    useState<(string | number)[]>(defaultValue);

  const value = controlledValue ?? uncontrolledValue;
  const handleChange = onChange ?? setUncontrolledValue;

  const contextValue = useMemo(
    () => ({ value, onChange: handleChange, disabled }),
    [value, handleChange, disabled]
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {children}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </CheckboxGroupContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8f9fa",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#ced4da",
    marginBottom: 8,
  },
  errorText: {
    color: "#e03131",
    fontSize: 14,
    marginTop: 4,
  },
});

export default CheckboxGroup;


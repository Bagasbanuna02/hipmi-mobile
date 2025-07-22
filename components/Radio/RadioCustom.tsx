// components/Radio.tsx
import { GStyles } from '@/styles/global-styles';
import React, { createContext, useCallback, useContext } from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

// ========================
// Types
// ========================

type RadioContextType = {
  value: string;
  onChange: (value: string) => void;
};

const RadioContext = createContext<RadioContextType | undefined>(undefined);

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface RadioProps {
  label: string;
  value: string | number;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

// ========================
// Components
// ========================

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onChange, children, style }) => {
  const contextValue = {
    value,
    onChange,
  };

  return <RadioContext.Provider value={contextValue}>{children}</RadioContext.Provider>;
};

export const RadioCustom: React.FC<RadioProps> = ({ label, value, disabled = false, style, labelStyle }) => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('Radio must be used inside a RadioGroup');
  }

  const { value: selectedValue, onChange } = context;

  const handlePress = useCallback(() => {
    if (!disabled && selectedValue !== value) {
      onChange(value as any);
    }
  }, [disabled, selectedValue, value, onChange]);

  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      style={[styles.radioContainer, style]}
      onPress={handlePress}
      disabled={disabled}
    >
      {/* Circle */}
      <View
        style={[styles.outerCircle, isSelected && styles.outerCircleChecked]}
      >
        <View
          style={[styles.innerCircle, isSelected && styles.innerCircleChecked]}
        />
      </View>

      {/* Label */}
      <Text
        style={[
          GStyles.textLabelBold,
          labelStyle,
          disabled && GStyles.inputTextDisabled,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// ========================
// Styles
// ========================

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  outerCircleChecked: {
    backgroundColor: '#3B82F6',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  innerCircleChecked: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 6,
  },
  
});
// useKeyboardForm.ts - Hook untuk keyboard handling pada form
import { Keyboard, ScrollView } from "react-native";
import { useState, useEffect, useRef } from "react";

export function useKeyboardForm(scrollOffset = 100) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [focusedInputY, setFocusedInputY] = useState<number | null>(null);

  // Listen to keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setFocusedInputY(null);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Scroll ke focused input
  useEffect(() => {
    if (focusedInputY !== null && keyboardHeight > 0 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: Math.max(0, focusedInputY - scrollOffset),
          animated: true,
        });
      }, 100);
    }
  }, [focusedInputY, keyboardHeight, scrollOffset]);

  // Handler untuk track focused input position
  const handleInputFocus = (yPosition: number) => {
    setFocusedInputY(yPosition);
  };

  // Helper untuk create onFocus handler
  const createFocusHandler = () => {
    return (e: any) => {
      e.target?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        if (pageY !== null) {
          handleInputFocus(pageY);
        }
      });
    };
  };

  return {
    scrollViewRef,
    keyboardHeight,
    focusedInputY,
    handleInputFocus,
    createFocusHandler,
  };
}

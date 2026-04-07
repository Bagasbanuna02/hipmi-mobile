// useKeyboardForm.ts - Hook untuk keyboard handling pada form
import { Keyboard, ScrollView, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import React from "react";

export function useKeyboardForm(scrollOffset = 100) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const currentScrollY = useRef(0);

  // Listen to keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        const kbHeight = e.endCoordinates.height;
        setKeyboardHeight(kbHeight);
        
        // Simple: scroll by keyboard height saat keyboard muncul
        if (scrollViewRef.current) {
          const targetY = currentScrollY.current + kbHeight - scrollOffset;
          scrollViewRef.current.scrollTo({
            y: Math.max(0, targetY),
            animated: true,
          });
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [scrollOffset]);

  // Track scroll position
  const handleScroll = (event: any) => {
    currentScrollY.current = event.nativeEvent.contentOffset.y;
  };

  // Dummy handlers (for API compatibility)
  const createFocusHandler = () => {
    return () => {};
  };

  const registerInputFocus = () => {};

  return {
    scrollViewRef,
    keyboardHeight,
    registerInputFocus,
    createFocusHandler,
    handleScroll,
  };
}

/**
 * Dummy helper (no-op, for API compatibility)
 */
export function cloneChildrenWithFocusHandler(
  children: React.ReactNode,
  _focusHandler: (inputRef: any) => void
): React.ReactNode {
  return children;
}

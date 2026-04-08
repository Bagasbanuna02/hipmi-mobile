// useKeyboardForm.ts - Hook untuk keyboard handling pada form
import { Keyboard, ScrollView, Dimensions, findNodeHandle, UIManager } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";

export function useKeyboardForm(scrollOffset = 100) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const currentScrollY = useRef(0);
  const inputPageY = useRef(0);
  const screenHeight = Dimensions.get('window').height;

  // Fungsi untuk mengukur posisi absolut input
  const handleInputFocus = useCallback((target: any) => {
    const nodeHandle = findNodeHandle(target);
    if (nodeHandle) {
      UIManager.measure(nodeHandle, (x, y, width, height, pageX, pageY) => {
        if (pageY !== undefined && pageY !== null) {
          inputPageY.current = pageY;
        }
      });
    }
  }, []);

  // Listen to keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        const kbHeight = e.endCoordinates.height;
        setKeyboardHeight(kbHeight);
        
        // Conditional scroll: hanya scroll jika input tertutup keyboard
        if (scrollViewRef.current) {
          const touchAbsoluteY = inputPageY.current;
          
          // Posisi Y teratas keyboard (dari atas layar)
          const keyboardTopY = screenHeight - kbHeight;
          
          // Jika input ADA DI BAWAH keyboard (tertutup)
          if (touchAbsoluteY > keyboardTopY) {
            // Hitung berapa harus scroll agar input terlihat di atas keyboard
            const scrollBy = touchAbsoluteY - keyboardTopY + scrollOffset;
            const targetY = currentScrollY.current + scrollBy;
            
            scrollViewRef.current.scrollTo({
              y: Math.max(0, targetY),
              animated: true,
            });
          }
          // Jika input SUDAH TERLIHAT (di atas keyboard), JANGAN SCROLL
        }
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        inputPageY.current = 0;
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [scrollOffset, screenHeight]);

  // Track scroll position
  const handleScroll = (event: any) => {
    currentScrollY.current = event.nativeEvent.contentOffset.y;
  };

  return {
    scrollViewRef,
    keyboardHeight,
    handleInputFocus,
    handleScroll,
  };
}

/**
 * Helper untuk inject onFocus handler ke semua TextInput/TextArea children
 * Menggunakan UI.measure untuk mendapatkan posisi absolut input secara akurat
 */
export function cloneChildrenWithFocusHandler(
  children: React.ReactNode,
  focusHandler: (target: any) => void
): React.ReactNode {
  if (!children) return children;
  const React = require("react");

  return React.Children.map(children, (child: any) => {
    if (!React.isValidElement(child)) return child;

    const childType = child.type;
    const childProps = child.props as Record<string, any> || {};

    // Check if it's a text input component
    let isTextInput = false;
    
    if (typeof childType === 'string') {
      isTextInput = childType.toLowerCase().includes('textinput');
    } else if (childType) {
      isTextInput = 
        (childType as any).displayName?.includes('TextInput') ||
        (childType as any).name?.includes('TextInput') ||
        (childType as any).displayName?.includes('TextArea') ||
        (childType as any).name?.includes('TextArea') ||
        (childType as any).displayName?.includes('PhoneInput') ||
        (childType as any).name?.includes('PhoneInput') ||
        (childType as any).displayName?.includes('Select') ||
        (childType as any).name?.includes('Select');
    }

    if (isTextInput) {
      const existingOnFocus = childProps.onFocus;
      return React.cloneElement(child, {
        ...childProps,
        onFocus: (e: any) => {
          existingOnFocus?.(e);
          focusHandler(e.target);
        },
      } as any);
    }

    // Recursively clone nested children
    if (childProps.children) {
      return React.cloneElement(child, {
        ...childProps,
        children: cloneChildrenWithFocusHandler(childProps.children, focusHandler),
      } as any);
    }

    return child;
  });
}
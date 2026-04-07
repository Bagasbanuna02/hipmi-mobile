// FormWrapper.tsx - Reusable wrapper untuk form dengan keyboard handling
import { MainColor } from "@/constants/color-palet";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { useKeyboardForm } from "@/hooks/useKeyboardForm";

interface FormWrapperProps {
  children: ReactNode;
  footerComponent?: ReactNode;
  /**
   * Offset scroll saat keyboard muncul (default: 100)
   */
  scrollOffset?: number;
  /**
   * Padding bottom untuk content (default: 100)
   */
  contentPaddingBottom?: number;
  /**
   * Padding untuk content container (default: 16)
   */
  contentPadding?: number;
}

export function FormWrapper({
  children,
  footerComponent,
  scrollOffset = 100,
  contentPaddingBottom = 100,
  contentPadding = 16,
}: FormWrapperProps) {
  const { scrollViewRef, handleScroll } = useKeyboardForm(scrollOffset);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: MainColor.darkblue }}
    >
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: contentPaddingBottom,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, padding: contentPadding }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Footer - Fixed di bawah */}
      {footerComponent && (
        <SafeAreaView
          edges={["bottom"]}
          style={{
            backgroundColor: MainColor.darkblue,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {footerComponent}
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
}

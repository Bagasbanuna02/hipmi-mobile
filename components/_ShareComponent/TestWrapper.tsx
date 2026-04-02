// TestWrapper.tsx - Wrapper sederhana untuk test keyboard handling
import { MainColor } from "@/constants/color-palet";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";

interface TestWrapperProps {
  children: React.ReactNode;
  footerComponent?: React.ReactNode;
}

export function TestWrapper({ children, footerComponent }: TestWrapperProps) {
  return (
    <KeyboardAvoidingView
      behavior="padding" // ← FIX: Gunakan padding untuk iOS & Android (NOT "height" untuk Android!)
      style={{ flex: 1, backgroundColor: MainColor.darkblue }}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, padding: 10 }}>{children}</View>
      </ScrollView>

      {footerComponent && (
        <SafeAreaView
          edges={["bottom"]}
          style={{ flex: 1, backgroundColor: MainColor.red }}
        >
          {footerComponent}
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
}

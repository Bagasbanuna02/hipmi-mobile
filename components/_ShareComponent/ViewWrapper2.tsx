import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context"; // <- Diubah ke sini

interface ViewWrapperProps {
  children: React.ReactNode;
  footerComponent?: React.ReactNode;
}

const Try_ViewWrapper = ({ children, footerComponent }: ViewWrapperProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1 }}>{children}</View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Footer Component */}
      {footerComponent && (
        <SafeAreaView edges={["bottom"]} style={styles.footerContainer}>
          {footerComponent}
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Try_ViewWrapper;

// File: ViewWrapper.styles.js

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ViewWrapperProps {
  children: React.ReactNode;
  withBackground?: boolean;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  floatingButton?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ViewWrapper = ({
  children,
  withBackground = false,
  headerComponent,
  footerComponent,
  floatingButton,
  style,
}: ViewWrapperProps) => {
  const assetBackground = require("../../assets/images/main-background.png");

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: MainColor.darkblue }}
      >
        {/* Header Sticky */}
        {headerComponent && (
          <View style={GStyles.stickyHeader}>{headerComponent}</View>
        )}

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              {withBackground ? (
                <ImageBackground
                  source={assetBackground}
                  resizeMode="cover"
                  style={[GStyles.imageBackground]}
                >
                  <View style={[GStyles.containerWithBackground, style]}>
                    {children}
                  </View>
                </ImageBackground>
              ) : (
                <View style={[GStyles.container, style]}>{children}</View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {footerComponent ? (
          <SafeAreaView
            edges={["bottom"]}
            style={{
              backgroundColor: MainColor.darkblue,
            }}
          >
            {footerComponent}
          </SafeAreaView>
        ) : (
          <SafeAreaView
            edges={["bottom"]}
            style={{ backgroundColor: MainColor.darkblue }}
          />
        )}

        {/* Floating Component (misal: FAB) */}
        {floatingButton && (
          <View style={GStyles.floatingContainer}>{floatingButton}</View>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default ViewWrapper;

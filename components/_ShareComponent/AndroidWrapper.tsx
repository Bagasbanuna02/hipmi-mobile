// @/components/AndroidWrapper.tsx
// Android Wrapper - Based on NewWrapper_V2 (with keyboard handling for Android)
import { MainColor } from "@/constants/color-palet";
import { OS_HEIGHT } from "@/constants/constans-value";
import { GStyles } from "@/styles/global-styles";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
import type { ScrollViewProps, FlatListProps } from "react-native";
import { useKeyboardForm } from "@/hooks/useKeyboardForm";

// --- Base Props ---
interface BaseProps {
  withBackground?: boolean;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  floatingButton?: React.ReactNode;
  hideFooter?: boolean;
  edgesFooter?: NativeSafeAreaViewProps["edges"];
  style?: StyleProp<ViewStyle>;
  refreshControl?: ScrollViewProps["refreshControl"];
  /**
   * Enable keyboard handling with auto-scroll (Android only)
   * @default false
   */
  enableKeyboardHandling?: boolean;
  /**
   * Scroll offset when keyboard appears (Android only)
   * @default 100
   */
  keyboardScrollOffset?: number;
  /**
   * Extra padding bottom for content to avoid navigation bar (Android only)
   * @default 80
   */
  contentPaddingBottom?: number;
  /**
   * Padding untuk content container (Android only)
   * Set to 0 untuk tidak ada padding, atau custom value sesuai kebutuhan
   * @default 16
   */
  contentPadding?: number;
}

interface StaticModeProps extends BaseProps {
  children: React.ReactNode;
  listData?: never;
  renderItem?: never;
}

interface ListModeProps extends BaseProps {
  children?: never;
  listData?: any[];
  renderItem?: FlatListProps<any>["renderItem"];
  onEndReached?: () => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  keyExtractor?: FlatListProps<any>["keyExtractor"];
}

type AndroidWrapperProps = StaticModeProps | ListModeProps;

export function AndroidWrapper(props: AndroidWrapperProps) {
  const {
    withBackground = false,
    headerComponent,
    footerComponent,
    floatingButton,
    hideFooter = false,
    edgesFooter = [],
    style,
    refreshControl,
    enableKeyboardHandling = false,
    keyboardScrollOffset = 100,
    contentPaddingBottom = 80,
    contentPadding = 16,
  } = props;

  const assetBackground = require("../../assets/images/main-background.png");

  // Use keyboard hook if enabled
  const keyboardForm = enableKeyboardHandling
    ? useKeyboardForm(keyboardScrollOffset)
    : null;

  const renderContainer = (content: React.ReactNode) => {
    if (withBackground) {
      return (
        <ImageBackground
          source={assetBackground}
          resizeMode="cover"
          style={GStyles.imageBackground}
        >
          <View style={[GStyles.containerWithBackground, style]}>
            {content}
          </View>
        </ImageBackground>
      );
    }
    return <View style={[GStyles.container, style]}>{content}</View>;
  };

  // 🔹 Mode Dinamis (FlatList)
  if ("listData" in props) {
    const listProps = props as ListModeProps;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, backgroundColor: MainColor.darkblue }}
      >
        {headerComponent && (
          <View style={GStyles.stickyHeader}>{headerComponent}</View>
        )}
        <FlatList
          data={listProps.listData}
          renderItem={listProps.renderItem}
          keyExtractor={
            listProps.keyExtractor ||
            ((item, index) => `${String(item.id)}-${index}`)
          }
          refreshControl={refreshControl}
          onEndReached={listProps.onEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={listProps.ListHeaderComponent}
          ListFooterComponent={listProps.ListFooterComponent}
          ListEmptyComponent={listProps.ListEmptyComponent}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom:
              (footerComponent && !hideFooter ? OS_HEIGHT : 0) +
              contentPaddingBottom,
            padding: contentPadding,
          }}
          keyboardShouldPersistTaps="handled"
        />

        {/* Footer - Fixed di bawah dengan width 100% */}
        {footerComponent && !hideFooter && (
          <SafeAreaView
            edges={Platform.OS === "ios" ? edgesFooter : ["bottom"]}
            style={{ backgroundColor: MainColor.darkblue, width: "100%" }}
          >
            <View style={{ width: "100%" }}>{footerComponent}</View>
          </SafeAreaView>
        )}

        {!footerComponent && !hideFooter && (
          <SafeAreaView
            edges={["bottom"]}
            style={{ backgroundColor: MainColor.darkblue }}
          />
        )}

        {floatingButton && (
          <View style={GStyles.floatingContainer}>{floatingButton}</View>
        )}
      </KeyboardAvoidingView>
    );
  }

  // 🔹 Mode Statis (ScrollView)
  const staticProps = props as StaticModeProps;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: MainColor.darkblue }}
    >
      {headerComponent && (
        <View style={GStyles.stickyHeader}>{headerComponent}</View>
      )}

      <ScrollView
        ref={keyboardForm?.scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom:
            (footerComponent && !hideFooter ? OS_HEIGHT : 0) +
            contentPaddingBottom,
          padding: contentPadding,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {renderContainer(staticProps.children)}
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Footer - Fixed di bawah dengan width 100% */}
      {footerComponent && !hideFooter && (
        <SafeAreaView
          edges={["bottom"]}
          style={{
            backgroundColor: MainColor.darkblue,
            width: "100%",
            position: Platform.OS === "android" ? "absolute" : undefined,
            bottom: Platform.OS === "android" ? 0 : undefined,
            left: 0,
            right: 0,
          }}
        >
          <View style={{ width: "100%" }}>{footerComponent}</View>
        </SafeAreaView>
      )}

      {!footerComponent && !hideFooter && (
        <SafeAreaView
          edges={["bottom"]}
          style={{ backgroundColor: MainColor.darkblue }}
        />
      )}

      {floatingButton && (
        <View style={GStyles.floatingContainer}>{floatingButton}</View>
      )}
    </KeyboardAvoidingView>
  );
}

export default AndroidWrapper;

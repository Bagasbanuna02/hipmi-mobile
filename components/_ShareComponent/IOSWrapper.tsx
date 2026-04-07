// @/components/iOSWrapper.tsx
// iOS Wrapper - Based on NewWrapper (stable version for iOS)
import { MainColor } from "@/constants/color-palet";
import { OS_HEIGHT } from "@/constants/constans-value";
import { GStyles } from "@/styles/global-styles";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
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

type iOSWrapperProps = StaticModeProps | ListModeProps;

const iOSWrapper = (props: iOSWrapperProps) => {
  const {
    withBackground = false,
    headerComponent,
    footerComponent,
    floatingButton,
    hideFooter = false,
    edgesFooter = [],
    style,
    refreshControl,
  } = props;

  const assetBackground = require("../../assets/images/main-background.png");

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
        behavior="padding"
        style={{ flex: 1, backgroundColor: MainColor.darkblue }}
      >
        {headerComponent && (
          <View style={GStyles.stickyHeader}>{headerComponent}</View>
        )}
        <View style={[GStyles.container, style, { flex: 1 }]}>
          <FlatList
            data={listProps.listData}
            renderItem={listProps.renderItem}
            keyExtractor={
              listProps.keyExtractor ||
              ((item, index) => {
                if (item.id == null) {
                  console.warn("Item tanpa 'id':", item);
                  return `fallback-${index}-${JSON.stringify(item)}`;
                }

                return `${String(item.id)}-${index}`;
              })
            }
            refreshControl={refreshControl}
            onEndReached={listProps.onEndReached}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={listProps.ListHeaderComponent}
            ListFooterComponent={listProps.ListFooterComponent}
            ListEmptyComponent={listProps.ListEmptyComponent}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: footerComponent && !hideFooter ? OS_HEIGHT : 0
            }}
            keyboardShouldPersistTaps="handled"
          />
        </View>

        {/* Footer - tetap di bawah dengan position absolute */}
        {footerComponent && !hideFooter && (
          <View style={styles.footerContainer}>
            <SafeAreaView
              edges={edgesFooter}
              style={{ backgroundColor: MainColor.darkblue }}
            >
              {footerComponent}
            </SafeAreaView>
          </View>
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
      behavior="padding"
      style={{ flex: 1, backgroundColor: MainColor.darkblue }}
    >
      {headerComponent && (
        <View style={GStyles.stickyHeader}>{headerComponent}</View>
      )}

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: footerComponent && !hideFooter ? OS_HEIGHT : 0
          }}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {renderContainer(staticProps.children)}
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>

      {/* Footer - tetap di bawah dengan position absolute */}
      {footerComponent && !hideFooter && (
        <View style={styles.footerContainer}>
          <SafeAreaView
            edges={edgesFooter}
            style={{ backgroundColor: MainColor.darkblue }}
          >
            {footerComponent}
          </SafeAreaView>
        </View>
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
};

// Styles untuk footer dengan position absolute
const styles = {
  footerContainer: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: MainColor.darkblue,
  },
};

export default iOSWrapper;

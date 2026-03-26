// @/components/NewWrapper.tsx
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
import Spacing from "./Spacing";

// --- ✅ Tambahkan refreshControl ke BaseProps ---
interface BaseProps {
  withBackground?: boolean;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  floatingButton?: React.ReactNode;
  hideFooter?: boolean;
  edgesFooter?: NativeSafeAreaViewProps["edges"];
  style?: StyleProp<ViewStyle>;
  refreshControl?: ScrollViewProps["refreshControl"]; // ✅ dipakai di kedua mode
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
  // ✅ Gunakan tipe yang kompatibel dengan FlatList
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  keyExtractor?: FlatListProps<any>["keyExtractor"];
}

type NewWrapperProps = StaticModeProps | ListModeProps;

const NewWrapper = (props: NewWrapperProps) => {
  const {
    withBackground = false,
    headerComponent,
    footerComponent,
    floatingButton,
    hideFooter = false,
    edgesFooter = [],
    style,
    refreshControl, // ✅ sekarang ada di BaseProps
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

  // 🔹 Mode Dinamis
  if ("listData" in props) {
    const listProps = props as ListModeProps;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: MainColor.darkblue }}
      >
        {headerComponent && (
          <View style={GStyles.stickyHeader}>{headerComponent}</View>
        )}
        <View style={[GStyles.container, style]}>
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

                // Gabungkan ID dengan indeks untuk mencegah duplikasi
                return `${String(item.id)}-${index}`;
              })
            }
            refreshControl={refreshControl} // ✅ dari BaseProps
            onEndReached={listProps.onEndReached}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={listProps.ListHeaderComponent}
            ListFooterComponent={listProps.ListFooterComponent}
            ListEmptyComponent={listProps.ListEmptyComponent}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          />
        </View>

        {footerComponent ? (
          <SafeAreaView
            edges={Platform.OS === "ios" ? edgesFooter : ["bottom"]}
            style={{ backgroundColor: MainColor.darkblue, height: OS_HEIGHT }}
          >
            {footerComponent}
          </SafeAreaView>
        ) : hideFooter ? null : (
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

  // 🔹 Mode Statis
  const staticProps = props as StaticModeProps;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: MainColor.darkblue }}
    >
      {headerComponent && (
        <View style={GStyles.stickyHeader}>{headerComponent}</View>
      )}

      <View style={{ flex: 0 }} collapsable={false}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {renderContainer(staticProps.children)}
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>

      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 0 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={refreshControl} // ✅ sekarang valid
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {renderContainer(staticProps.children)}
        </TouchableWithoutFeedback>
      </ScrollView> */}

      {footerComponent ? (
        <SafeAreaView
          edges={Platform.OS === "ios" ? edgesFooter : ["bottom"]}
          style={{ backgroundColor: MainColor.darkblue, height: OS_HEIGHT }}
        >
          {footerComponent}
        </SafeAreaView>
      ) : hideFooter ? null : (
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

export default NewWrapper;

// @/components/OS_Wrapper.tsx
// OS-Specific Wrapper - Automatically routes to iOSWrapper or AndroidWrapper
// iOS: Uses NewWrapper (stable for iOS)
// Android: Uses NewWrapper_V2 (with keyboard handling)

import { Platform } from "react-native";
import type { ScrollViewProps, FlatListProps } from "react-native";
import {
  NativeSafeAreaViewProps,
} from "react-native-safe-area-context";
import type { StyleProp, ViewStyle } from "react-native";
import IOSWrapper from "./IOSWrapper";
import AndroidWrapper from "./AndroidWrapper";

// ========== Base Props ==========
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

// ========== Static Mode Props ==========
interface StaticModeProps extends BaseProps {
  children: React.ReactNode;
  listData?: never;
  renderItem?: never;
}

// ========== List Mode Props ==========
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

// ========== PageWrapper Props (Android-specific keyboard handling) ==========
interface PageWrapperBaseProps extends BaseProps {
  /**
   * Enable keyboard handling (Android only - NewWrapper_V2)
   * iOS ignores this prop
   * @default false
   */
  enableKeyboardHandling?: boolean;

  /**
   * Scroll offset when keyboard appears (Android only)
   * iOS ignores this prop
   * @default 100
   */
  keyboardScrollOffset?: number;

  /**
   * Extra padding bottom for content (Android only)
   * iOS ignores this prop
   * @default 80
   */
  contentPaddingBottom?: number;

  /**
   * Padding untuk content container (Android only)
   * iOS ignores this prop
   * @default 16
   */
  contentPadding?: number;
}

interface PageWrapperStaticProps extends PageWrapperBaseProps {
  children: React.ReactNode;
  listData?: never;
  renderItem?: never;
}

interface PageWrapperListProps extends PageWrapperBaseProps {
  children?: never;
  listData?: any[];
  renderItem?: FlatListProps<any>["renderItem"];
  onEndReached?: () => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  keyExtractor?: FlatListProps<any>["keyExtractor"];
}

type OS_WrapperProps = StaticModeProps | ListModeProps;
type PageWrapperProps = PageWrapperStaticProps | PageWrapperListProps;

/**
 * OS_Wrapper - Automatically selects iOSWrapper or AndroidWrapper based on platform
 * 
 * @example Static Mode
 * ```tsx
 * <OS_Wrapper>
 *   <YourContent />
 * </OS_Wrapper>
 * ```
 * 
 * @example List Mode
 * ```tsx
 * <OS_Wrapper
 *   listData={data}
 *   renderItem={({ item }) => <ItemCard item={item} />}
 *   ListEmptyComponent={<EmptyState />}
 * />
 * ```
 */
export function OS_Wrapper(props: OS_WrapperProps) {
  // iOS uses IOSWrapper (based on NewWrapper)
  if (Platform.OS === "ios") {
    return <IOSWrapper {...props} />;
  }

  // Android uses AndroidWrapper (based on NewWrapper_V2 with keyboard handling)
  return <AndroidWrapper {...props} />;
}

/**
 * PageWrapper - OS_Wrapper with keyboard handling support (Android only)
 * Use this for forms with input fields
 * 
 * @example
 * ```tsx
 * <PageWrapper enableKeyboardHandling keyboardScrollOffset={150}>
 *   <FormContent />
 * </PageWrapper>
 * ```
 */
export function PageWrapper(props: PageWrapperProps) {
  // iOS: Keyboard handling props are ignored
  if (Platform.OS === "ios") {
    const {
      enableKeyboardHandling: _,
      keyboardScrollOffset: __1,
      contentPaddingBottom: __2,
      contentPadding: __3,
      ...iosProps
    } = props;
    return <IOSWrapper {...iosProps} />;
  }

  // Android: Keyboard handling props are used
  return <AndroidWrapper {...props} />;
}

// Re-export individual wrappers for direct usage if needed
export { default as IOSWrapper } from "./IOSWrapper";
export { default as AndroidWrapper } from "./AndroidWrapper";

// Legacy export untuk backward compatibility
export { IOSWrapper as iOSWrapper };

export default OS_Wrapper;

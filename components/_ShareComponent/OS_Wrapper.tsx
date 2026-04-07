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

// ========== Keyboard Handling Props (Android only) ==========
interface KeyboardHandlingProps {
  /**
   * Enable keyboard handling with auto-scroll (Android only)
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

// ========== Final Props Types ==========
type OS_WrapperStaticProps = StaticModeProps & KeyboardHandlingProps;
type OS_WrapperListProps = ListModeProps & KeyboardHandlingProps;

type OS_WrapperProps = OS_WrapperStaticProps | OS_WrapperListProps;

/**
 * OS_Wrapper - Automatically selects iOSWrapper or AndroidWrapper based on platform
 * 
 * Features:
 * - Auto platform detection
 * - Optional keyboard handling for Android forms
 * - Unified API for all use cases
 *
 * @example Static Mode (Simple Content)
 * ```tsx
 * <OS_Wrapper>
 *   <YourContent />
 * </OS_Wrapper>
 * ```
 *
 * @example List Mode (with pagination)
 * ```tsx
 * <OS_Wrapper
 *   listData={data}
 *   renderItem={({ item }) => <ItemCard item={item} />}
 *   ListEmptyComponent={<EmptyState />}
 *   onEndReached={loadMore}
 * />
 * ```
 *
 * @example Form Mode (with keyboard handling - Android only)
 * ```tsx
 * <OS_Wrapper
 *   enableKeyboardHandling
 *   keyboardScrollOffset={150}
 *   contentPaddingBottom={100}
 *   footerComponent={<SubmitButton />}
 * >
 *   <FormContent />
 * </OS_Wrapper>
 * ```
 */
export function OS_Wrapper(props: OS_WrapperProps) {
  const {
    enableKeyboardHandling = false,
    keyboardScrollOffset = 100,
    contentPaddingBottom = 250,
    contentPadding = 0,
    ...wrapperProps
  } = props;

  // iOS uses IOSWrapper (based on NewWrapper)
  if (Platform.OS === "ios") {
    // Keyboard handling props are ignored on iOS
    return <IOSWrapper {...(wrapperProps as any)} />;
  }

  // Android uses AndroidWrapper (with keyboard handling support)
  return (
    <AndroidWrapper
      {...(wrapperProps as any)}
      enableKeyboardHandling={enableKeyboardHandling}
      keyboardScrollOffset={keyboardScrollOffset}
      contentPaddingBottom={contentPaddingBottom}
      contentPadding={contentPadding}
    />
  );
}

// Re-export individual wrappers for direct usage if needed
export { default as IOSWrapper } from "./IOSWrapper";
export { default as AndroidWrapper } from "./AndroidWrapper";

// Legacy export untuk backward compatibility
export { IOSWrapper as iOSWrapper };

export default OS_Wrapper;

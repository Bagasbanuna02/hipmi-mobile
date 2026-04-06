/**
 * PageWrapper - Platform-specific wrapper component
 * 
 * Routes to:
 * - iOS: NewWrapper (stable, tested)
 * - Android: NewWrapper_V2 (with keyboard handling fix)
 * 
 * Props are automatically adjusted based on platform.
 * 
 * @example
 * <PageWrapper
 *   footerComponent={buttonFooter}
 *   enableKeyboardHandling
 *   keyboardScrollOffset={100}
 * >
 *   {children}
 * </PageWrapper>
 */

import { Platform } from "react-native";
import { NewWrapper_V2 } from "./NewWrapper_V2";
import type { NativeSafeAreaViewProps } from "react-native-safe-area-context";
import type { ScrollViewProps, FlatListProps } from "react-native";
import NewWrapper from "./NewWrapper";

// ========== Base Props ==========
interface BaseProps {
  withBackground?: boolean;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  floatingButton?: React.ReactNode;
  hideFooter?: boolean;
  edgesFooter?: NativeSafeAreaViewProps["edges"];
  style?: any;
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

// ========== PageWrapper Props ==========
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
   * Padding Top for content container (Android only)
   * iOS ignores this prop
   * @default 8
   */
  contentPaddingTop?: number;
  
  /**
   * Padding Horizontal for content container (Android only)
   * iOS ignores this prop
   * @default 0
   */
  contentPaddingHorizontal?: number;
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

type PageWrapperProps = PageWrapperStaticProps | PageWrapperListProps;

export function PageWrapper(props: PageWrapperProps) {
  const {
    withBackground,
    headerComponent,
    footerComponent,
    floatingButton,
    hideFooter,
    edgesFooter,
    style,
    refreshControl,
    enableKeyboardHandling,
    keyboardScrollOffset,
    contentPaddingBottom,
    contentPaddingTop,
    contentPaddingHorizontal,
    ...restProps
  } = props;

  // ========== Android: Use NewWrapper_V2 with keyboard handling ==========
  if (Platform.OS === "android") {
    if ("listData" in props) {
      // List mode
      const listProps = props as PageWrapperListProps;
      return (
        <NewWrapper_V2
          listData={listProps.listData}
          renderItem={listProps.renderItem}
          onEndReached={listProps.onEndReached}
          ListHeaderComponent={listProps.ListHeaderComponent}
          ListFooterComponent={listProps.ListFooterComponent}
          ListEmptyComponent={listProps.ListEmptyComponent}
          keyExtractor={listProps.keyExtractor}
          withBackground={withBackground}
          headerComponent={headerComponent}
          footerComponent={footerComponent}
          floatingButton={floatingButton}
          hideFooter={hideFooter}
          edgesFooter={edgesFooter}
          style={style}
          refreshControl={refreshControl}
          enableKeyboardHandling={enableKeyboardHandling}
          keyboardScrollOffset={keyboardScrollOffset}
          contentPaddingBottom={contentPaddingBottom}
          contentPaddingTop={contentPaddingTop}
          contentPaddingHorizontal={contentPaddingHorizontal}
        />
      );
    }

    // Static mode
    const staticProps = props as PageWrapperStaticProps;
    return (
      <NewWrapper_V2
        withBackground={withBackground}
        headerComponent={headerComponent}
        footerComponent={footerComponent}
        floatingButton={floatingButton}
        hideFooter={hideFooter}
        edgesFooter={edgesFooter}
        style={style}
        refreshControl={refreshControl}
        enableKeyboardHandling={enableKeyboardHandling}
        keyboardScrollOffset={keyboardScrollOffset}
        contentPaddingBottom={contentPaddingBottom}
        contentPaddingTop={contentPaddingTop}
        contentPaddingHorizontal={contentPaddingHorizontal}
      >
        {staticProps.children}
      </NewWrapper_V2>
    );
  }

  // ========== iOS: Use NewWrapper (stable) ==========
  if ("listData" in props) {
    // List mode
    const listProps = props as PageWrapperListProps;
    return (
      <NewWrapper
        listData={listProps.listData}
        renderItem={listProps.renderItem}
        onEndReached={listProps.onEndReached}
        ListHeaderComponent={listProps.ListHeaderComponent}
        ListFooterComponent={listProps.ListFooterComponent}
        ListEmptyComponent={listProps.ListEmptyComponent}
        keyExtractor={listProps.keyExtractor}
        withBackground={withBackground}
        headerComponent={headerComponent}
        footerComponent={footerComponent}
        floatingButton={floatingButton}
        hideFooter={hideFooter}
        edgesFooter={edgesFooter}
        style={style}
        refreshControl={refreshControl}
      />
    );
  }

  // Static mode
  const staticProps = props as PageWrapperStaticProps;
  return (
    <NewWrapper
      withBackground={withBackground}
      headerComponent={headerComponent}
      footerComponent={footerComponent}
      floatingButton={floatingButton}
      hideFooter={hideFooter}
      edgesFooter={edgesFooter}
      style={style}
      refreshControl={refreshControl}
    >
      {staticProps.children}
    </NewWrapper>
  );
}

export default PageWrapper;

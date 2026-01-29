import { View } from "react-native";
import { LoaderCustom, TextCustom, StackCustom } from "@/components";
import SkeletonCustom from "@/components/_ShareComponent/SkeletonCustom";
import _ from "lodash";

/**
 * Pagination Helpers
 * 
 * Helper functions untuk membuat komponen-komponen pagination
 * yang sering digunakan (Skeleton, Empty State, Loading Footer)
 */

interface SkeletonListOptions {
  /**
   * Jumlah skeleton items
   * @default 5
   */
  count?: number;
  
  /**
   * Tinggi setiap skeleton item
   * @default 200
   */
  height?: number;
}

/**
 * Generate Skeleton List Component untuk loading state
 * 
 * @example
 * ```tsx
 * <NewWrapper
 *   listData={listData}
 *   ListEmptyComponent={
 *     loading && _.isEmpty(listData) 
 *       ? createSkeletonList({ count: 5, height: 200 })
 *       : createEmptyState({ message: "Tidak ada data" })
 *   }
 * />
 * ```
 */
export const createSkeletonList = (options: SkeletonListOptions = {}) => {
  const { count = 5, height = 200 } = options;
  
  return (
    <View style={{ flex: 1 }}>
      <StackCustom>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCustom height={height} key={i} />
        ))}
      </StackCustom>
    </View>
  );
};

interface EmptyStateOptions {
  /**
   * Pesan untuk empty state
   * @default "Tidak ada data"
   */
  message?: string;
  
  /**
   * Pesan untuk empty state saat search
   */
  searchMessage?: string;
  
  /**
   * Query pencarian (untuk menentukan pesan mana yang ditampilkan)
   */
  searchQuery?: string;
  
  /**
   * Custom component untuk empty state
   */
  customComponent?: React.ReactElement;
}

/**
 * Generate Empty State Component
 * 
 * @example
 * ```tsx
 * ListEmptyComponent={
 *   createEmptyState({
 *     message: "Tidak ada diskusi",
 *     searchMessage: "Tidak ada hasil pencarian",
 *     searchQuery: search
 *   })
 * }
 * ```
 */
export const createEmptyState = (options: EmptyStateOptions = {}) => {
  const {
    message = "Tidak ada data",
    searchMessage = "Tidak ada hasil pencarian",
    searchQuery = "",
    customComponent,
  } = options;
  
  if (customComponent) return customComponent;
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TextCustom align="center" color="gray">
        {searchQuery ? searchMessage : message}
      </TextCustom>
    </View>
  );
};

interface LoadingFooterOptions {
  /**
   * Tampilkan loading footer
   */
  show: boolean;
  
  /**
   * Custom text untuk loading footer
   */
  text?: string;
  
  /**
   * Custom component untuk loading footer
   */
  customComponent?: React.ReactElement;
}

/**
 * Generate Loading Footer Component
 * 
 * @example
 * ```tsx
 * ListFooterComponent={
 *   createLoadingFooter({
 *     show: loading && !refreshing && listData.length > 0,
 *     text: "Memuat data..."
 *   })
 * }
 * ```
 */
export const createLoadingFooter = (options: LoadingFooterOptions) => {
  const { show, text, customComponent } = options;
  
  if (!show) return null;
  
  if (customComponent) return customComponent;
  
  return (
    <View style={{ paddingVertical: 16, alignItems: "center" }}>
      {text ? (
        <TextCustom color="gray">
          {text}
        </TextCustom>
      ) : (
        <LoaderCustom />
      )}
    </View>
  );
};

interface PaginationComponentsOptions {
  /**
   * Loading state
   */
  loading: boolean;
  
  /**
   * Refreshing state
   */
  refreshing: boolean;
  
  /**
   * List data
   */
  listData: any[];
  
  /**
   * Query pencarian
   */
  searchQuery?: string;
  
  /**
   * Pesan empty state
   */
  emptyMessage?: string;
  
  /**
   * Pesan empty state saat search
   */
  emptySearchMessage?: string;
  
  /**
   * Jumlah skeleton items
   */
  skeletonCount?: number;
  
  /**
   * Tinggi skeleton items
   */
  skeletonHeight?: number;
  
  /**
   * Text loading footer
   */
  loadingFooterText?: string;
  
  /**
   * Loading pertama
   */
  isInitialLoad?: boolean;
}

/**
 * Generate semua komponen pagination sekaligus
 * 
 * @example
 * ```tsx
 * const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
 *   loading,
 *   refreshing,
 *   listData,
 *   searchQuery: search,
 *   emptyMessage: "Tidak ada diskusi",
 *   emptySearchMessage: "Tidak ada hasil pencarian",
 *   skeletonCount: 5,
 *   skeletonHeight: 200
 * });
 * 
 * <NewWrapper
 *   listData={listData}
 *   ListEmptyComponent={ListEmptyComponent}
 *   ListFooterComponent={ListFooterComponent}
 * />
 * ```
 */
export const createPaginationComponents = (
  options: PaginationComponentsOptions
) => {
  const {
    loading,
    refreshing,
    listData,
    searchQuery = "",
    emptyMessage = "Tidak ada data",
    emptySearchMessage = "Tidak ada hasil pencarian",
    skeletonCount = 5,
    skeletonHeight = 200,
    loadingFooterText,
    isInitialLoad,
  } = options;

  // Empty Compotnent: Skeleton saat loading pertama, Empty State saat data kosong
  const ListEmptyComponent =
    loading && _.isEmpty(listData)
      ? createSkeletonList({ count: skeletonCount, height: skeletonHeight })
      : createEmptyState({
          message: emptyMessage,
          searchMessage: emptySearchMessage,
          searchQuery,
        });

  // Footer Component: Loading indicator saat load more
  const ListFooterComponent = createLoadingFooter({
    show: loading && !refreshing && listData.length > 0,
    text: loadingFooterText,
  });

  return {
    ListEmptyComponent,
    ListFooterComponent,
  };
};
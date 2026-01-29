import { useState, useCallback, useEffect } from "react";

interface UsePaginationProps<T> {
  /**
   * Fungsi API untuk fetch data
   * @param page - nomor halaman
   * @param search - query pencarian (opsional)
   * @returns Promise dengan response API (bukan langsung array)
   */
  fetchFunction: (page: number, search?: string) => Promise<{ data: T[] }>;

  /**
   * Jumlah data per halaman (harus sama dengan API)
   * @default 5
   */
  pageSize?: number;

  /**
   * Query pencarian
   */
  searchQuery?: string;

  /**
   * Dependencies tambahan untuk trigger reload
   * Contoh: [userId, categoryId]
   */
  dependencies?: any[];

  /**
   * Callback saat data berhasil di-fetch
   */
  onDataFetched?: (data: T[]) => void;

  /**
   * Callback saat terjadi error
   */
  onError?: (error: any) => void;
}

interface UsePaginationReturn<T> {
  // Data state
  listData: T[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  page: number;

  // Actions
  onRefresh: () => void;
  loadMore: () => void;
  reset: () => void;
  setListData: React.Dispatch<React.SetStateAction<T[]>>;
  isInitialLoad: boolean;
}

/**
 * Custom Hook untuk menangani pagination dengan infinite scroll
 *
 * Hook ini mengembalikan props yang siap digunakan langsung dengan NewWrapper
 *
 * @example
 * ```tsx
 * const pagination = usePagination({
 *   fetchFunction: async (page, search) => {
 *     return await apiForumGetAll({
 *       category: "beranda",
 *       search: search || "",
 *       userLoginId: user.id,
 *       page: String(page),
 *     });
 *   },
 *   pageSize: 5,
 *   searchQuery: search,
 *   dependencies: [user?.id]
 * });
 *
 * // Lalu gunakan langsung di NewWrapper:
 * <NewWrapper
 *   listData={pagination.listData}
 *   refreshControl={<RefreshControl refreshing={pagination.refreshing} onRefresh={pagination.onRefresh} />}
 *   onEndReached={pagination.loadMore}
 *   // ... props lainnya
 * />
 * ```
 */
export function usePagination<T = any>({
  fetchFunction,
  pageSize = 5,
  searchQuery = "",
  dependencies = [],
  onDataFetched,
  onError,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [listData, setListData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true); // Set true untuk initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  /**
   * Fungsi utama untuk fetch data
   */
  const fetchData = async (pageNumber: number, clear: boolean) => {
    // Cegah multiple call
    if (!clear && (loading || refreshing)) return;

    const isRefresh = clear;
    if (isRefresh) setRefreshing(true);
    if (!isRefresh) setLoading(true);

    try {
      const response = await fetchFunction(pageNumber, searchQuery);
      const newData = response.data || [];
      //   console.log("newData", newData);
      setListData((prev) => {
        const current = Array.isArray(prev) ? prev : [];
        return clear ? newData : [...current, ...newData];
      });
      //   setTimeout(() => {
      //   }, 4000);

      setHasMore(newData.length === pageSize);
      setPage(pageNumber);

      // Callback jika ada
      onDataFetched?.(newData);
    } catch (error) {
      console.error("[usePagination] Error fetching data:", error);
      setHasMore(false);
      onError?.(error);
    } finally {
      setRefreshing(false);
      setLoading(false);
      setIsInitialLoad(false); // Set false setelah initial load
    }
  };

  /**
   * Reset dan reload saat search atau dependencies berubah
   */
  useEffect(() => {
    reset();
    fetchData(1, true);
  }, [searchQuery, ...dependencies]);

  /**
   * Pull-to-refresh
   */
  const onRefresh = useCallback(() => {
    fetchData(1, true);
  }, [searchQuery, ...dependencies]);

  /**
   * Load more (infinite scroll)
   */
  const loadMore = useCallback(() => {
    if (hasMore && !loading && !refreshing) {
      fetchData(page + 1, false);
    }
  }, [hasMore, loading, refreshing, page, searchQuery, ...dependencies]);

  /**
   * Reset state pagination
   */
  const reset = useCallback(() => {
    setPage(1);
    setListData([]);
    setHasMore(true);
  }, []);

  return {
    listData,
    loading,
    refreshing,
    hasMore,
    page,
    onRefresh,
    loadMore,
    reset,
    setListData,
    isInitialLoad
  };
}

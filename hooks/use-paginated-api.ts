// @/hooks/use-paginated-api.ts
import { useCallback, useState, useEffect, useRef } from "react";

interface UsePaginatedApiProps {
  fetcher: (params: { page: number; search?: string }) => Promise<any[]>;
  initialSearch?: string; // mengatur nilai awal dari state
  pageSize?: number;
  dependencies?: any[]; // untuk refresh saat deps berubah (misal: user.id)
}

export const usePaginatedApi = ({
  fetcher,
  initialSearch = "",
  pageSize = 5,
  dependencies = [],
}: UsePaginatedApiProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const refreshingRef = useRef<boolean>(false);
  const loadingRef = useRef<boolean>(false);
  const fetchRef = useRef(false);

  const fetchData = useCallback(
  async (pageNumber: number, clear: boolean) => {
    const isRefresh = clear;
    
    // 🔒 Proteksi: jangan jalankan jika sedang refreshing (untuk refresh)
    if (isRefresh && refreshingRef.current) return;
    // 🔒 Proteksi: jangan jalankan loadMore jika sedang loading
    if (!isRefresh && loadingRef.current) return;

    const setLoadingState = (isLoading: boolean) => {
      if (isRefresh) {
        setRefreshing(isLoading);
        refreshingRef.current = isLoading;
      } else {
        setLoading(isLoading);
        loadingRef.current = isLoading;
      }
    };

    setLoadingState(true);

    try {
      const newData = await fetcher({ page: pageNumber, search });
      setData((prev) => {
        const current = Array.isArray(prev) ? prev : [];
        return clear ? newData : [...current, ...newData];
      });
      setHasMore(newData.length === pageSize);
      setPage(pageNumber);
    } catch (error) {
      console.error("[usePaginatedApi] Error:", error);
      setHasMore(false);
    } finally {
      setLoadingState(false);
    }
  },
  [search, hasMore, pageSize, ...dependencies]
);

  const onRefresh = useCallback(() => {
    fetchData(1, true);
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading && !refreshing) {
      fetchData(page + 1, false);
    }
  }, [hasMore, loading, refreshing, page, fetchData]);

  // Reset & fetch ulang saat search atau deps berubah
  useEffect(() => {
    if (fetchRef.current) return; // hindari double initial
  fetchRef.current = true;

    setPage(1);
    setData([]);
    setHasMore(true);
    fetchData(1, true);
  }, [search, ...dependencies]);

  return {
    data,
    loading,
    refreshing,
    hasMore,
    search,
    setSearch,
    onRefresh,
    loadMore,
  };
};

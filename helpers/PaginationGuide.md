# 📱 Reusable Pagination untuk React Native + Expo

Komponen pagination yang terintegrasi dengan **NewWrapper** untuk infinite scroll, pull-to-refresh, skeleton loading, dan empty state.

---

## 📦 File Structure

```
/hooks/
  └── usePagination.tsx          # Custom hook untuk logika pagination

/helpers/
  └── paginationHelpers.tsx      # Helper functions untuk komponen UI

/components/
  └── NewWrapper.tsx             # Komponen wrapper utama (existing)
```

---

## 🚀 Cara Penggunaan

### **Step 1: Import Hook dan Helpers**

```tsx
import { usePagination } from "@/hooks/usePagination";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
```

### **Step 2: Setup Pagination Hook**

```tsx
const pagination = usePagination({
  // ✅ Fungsi untuk fetch data (harus return { data: T[] })
  fetchFunction: async (page, searchQuery) => {
    return await apiForumGetAll({
      category: "beranda",
      search: searchQuery || "",
      userLoginId: user.id,
      page: String(page),
    });
  },
  
  // ✅ Page size (harus sama dengan API)
  pageSize: 5,
  
  // ✅ Query pencarian
  searchQuery: search,
  
  // ✅ Dependencies (reload saat berubah)
  dependencies: [user?.id, category],
  
  // ⚙️ Optional callbacks
  onDataFetched: (data) => console.log("Loaded:", data.length),
  onError: (error) => console.error("Error:", error),
});
```

### **Step 3: Generate Komponen Pagination**

```tsx
const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
  loading: pagination.loading,
  refreshing: pagination.refreshing,
  listData: pagination.listData,
  searchQuery: search,
  emptyMessage: "Tidak ada data",
  emptySearchMessage: "Tidak ada hasil pencarian",
  skeletonCount: 5,
  skeletonHeight: 200,
});
```

### **Step 4: Gunakan dengan NewWrapper**

```tsx
<NewWrapper
  // Props dari pagination hook
  listData={pagination.listData}
  refreshControl={
    <RefreshControl
      refreshing={pagination.refreshing}
      onRefresh={pagination.onRefresh}
    />
  }
  onEndReached={pagination.loadMore}
  
  // Komponen dari helpers
  ListEmptyComponent={ListEmptyComponent}
  ListFooterComponent={ListFooterComponent}
  
  // Render item
  renderItem={({ item }) => <YourComponent data={item} />}
  
  // Props lain dari NewWrapper
  headerComponent={<SearchInput />}
  floatingButton={<FloatingButton />}
/>
```

---

## 📖 Contoh Implementasi Lengkap

### **Contoh 1: Forum Page (Basic)**

```tsx
import { usePagination } from "@/hooks/usePagination";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";

export default function ForumPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      if (!user?.id) return { data: [] };
      
      return await apiForumGetAll({
        category: "beranda",
        search: searchQuery || "",
        userLoginId: user.id,
        page: String(page),
      });
    },
    pageSize: 5,
    searchQuery: search,
    dependencies: [user?.id],
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    searchQuery: search,
    emptyMessage: "Tidak ada diskusi",
    emptySearchMessage: "Tidak ada hasil pencarian",
  });

  return (
    <NewWrapper
      headerComponent={
        <SearchInput
          placeholder="Cari diskusi..."
          onChangeText={_.debounce(setSearch, 500)}
        />
      }
      listData={pagination.listData}
      renderItem={({ item }) => <ForumItem data={item} />}
      refreshControl={
        <RefreshControl
          tintColor={MainColor.yellow}
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
}
```

### **Contoh 2: Product Page (Dengan Filter)**

```tsx
export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      return await apiProductGetAll({
        page: String(page),
        search: searchQuery || "",
        category: category !== "all" ? category : undefined,
      });
    },
    pageSize: 10,
    searchQuery: search,
    dependencies: [category], // Reload saat category berubah
  });

  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    searchQuery: search,
    emptyMessage: "Belum ada produk",
    skeletonCount: 8,
    skeletonHeight: 100,
  });

  return (
    <NewWrapper
      headerComponent={
        <View>
          <SearchInput onChangeText={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
        </View>
      }
      listData={pagination.listData}
      renderItem={({ item }) => <ProductCard product={item} />}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
}
```

---

## ⚙️ API Reference

### **usePagination Hook**

#### Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `fetchFunction` | `(page, search?) => Promise<{data: T[]}>` | ✅ | - | Fungsi fetch data dari API |
| `pageSize` | `number` | ❌ | `5` | Jumlah data per halaman |
| `searchQuery` | `string` | ❌ | `""` | Query pencarian |
| `dependencies` | `any[]` | ❌ | `[]` | Dependencies untuk trigger reload |
| `onDataFetched` | `(data: T[]) => void` | ❌ | - | Callback saat data berhasil di-fetch |
| `onError` | `(error: any) => void` | ❌ | - | Callback saat terjadi error |

#### Return Value

```tsx
{
  listData: T[];              // Array data untuk NewWrapper
  loading: boolean;           // Loading state
  refreshing: boolean;        // Refreshing state
  hasMore: boolean;           // Apakah masih ada data
  page: number;               // Current page
  onRefresh: () => void;      // Function untuk refresh
  loadMore: () => void;       // Function untuk load more
  reset: () => void;          // Function untuk reset state
  setListData: (data) => void; // Function untuk set data manual
}
```

---

### **createPaginationComponents Helper**

#### Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `loading` | `boolean` | ✅ | - | Loading state |
| `refreshing` | `boolean` | ✅ | - | Refreshing state |
| `listData` | `any[]` | ✅ | - | List data |
| `searchQuery` | `string` | ❌ | `""` | Query pencarian |
| `emptyMessage` | `string` | ❌ | `"Tidak ada data"` | Pesan empty state |
| `emptySearchMessage` | `string` | ❌ | `"Tidak ada hasil pencarian"` | Pesan empty saat search |
| `skeletonCount` | `number` | ❌ | `5` | Jumlah skeleton items |
| `skeletonHeight` | `number` | ❌ | `200` | Tinggi skeleton items |
| `loadingFooterText` | `string` | ❌ | - | Text loading footer |

#### Return Value

```tsx
{
  ListEmptyComponent: React.ReactElement;  // Component untuk empty state
  ListFooterComponent: React.ReactElement; // Component untuk loading footer
}
```

---

### **Helper Functions Lain**

#### `createSkeletonList(options)`
Generate skeleton list untuk loading state.

```tsx
const SkeletonComponent = createSkeletonList({
  count: 5,
  height: 200
});
```

#### `createEmptyState(options)`
Generate empty state component.

```tsx
const EmptyComponent = createEmptyState({
  message: "Tidak ada data",
  searchMessage: "Tidak ada hasil pencarian",
  searchQuery: search
});
```

#### `createLoadingFooter(options)`
Generate loading footer component.

```tsx
const FooterComponent = createLoadingFooter({
  show: loading && listData.length > 0,
  text: "Memuat data..."
});
```

---

## 🎨 Custom Components

### **Custom Empty State**

```tsx
import { createSkeletonList } from "@/helpers/paginationHelpers";

const CustomEmpty = (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>🔍</Text>
    <TextCustom>Data tidak ditemukan</TextCustom>
  </View>
);

const ListEmptyComponent = 
  pagination.loading && pagination.listData.length === 0
    ? createSkeletonList({ count: 5, height: 200 })
    : CustomEmpty;

<NewWrapper
  ListEmptyComponent={ListEmptyComponent}
  // ...
/>
```

### **Custom Loading Footer**

```tsx
import { createLoadingFooter } from "@/helpers/paginationHelpers";

const CustomFooter = createLoadingFooter({
  show: pagination.loading && !pagination.refreshing && pagination.listData.length > 0,
  customComponent: (
    <View style={{ padding: 20, alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 8 }}>Loading more...</Text>
    </View>
  )
});

<NewWrapper
  ListFooterComponent={CustomFooter}
  // ...
/>
```

---

## ✨ Fitur-Fitur

✅ **Infinite Scroll** - Auto load saat scroll ke bawah  
✅ **Pull to Refresh** - Swipe down untuk refresh  
✅ **Skeleton Loading** - Smooth loading animation  
✅ **Empty State** - Tampilan saat data kosong  
✅ **Search Integration** - Support search dengan debounce  
✅ **Multi Dependencies** - Reload berdasarkan filter apapun  
✅ **Error Handling** - Built-in error handling  
✅ **TypeScript** - Full type safety  
✅ **Fully Customizable** - Custom components untuk semua state  

---

## 🎯 Best Practices

### 1. **Gunakan Debounce untuk Search**
```tsx
<SearchInput
  onChangeText={_.debounce((text) => setSearch(text), 500)}
/>
```

### 2. **Sesuaikan Page Size dengan API**
```tsx
const pagination = usePagination({
  pageSize: 5, // Harus sama dengan takeData di API
});
```

### 3. **Tambahkan Dependencies yang Relevan**
```tsx
const pagination = usePagination({
  dependencies: [userId, category, sortBy], // Reload saat berubah
});
```

### 4. **Handle Error dengan Baik**
```tsx
const pagination = usePagination({
  onError: (error) => {
    console.error("Error:", error);
    Alert.alert("Error", "Gagal memuat data");
  },
});
```

### 5. **Pastikan API Return Format yang Benar**
```tsx
// ❌ SALAH
fetchFunction: async () => [data1, data2];

// ✅ BENAR
fetchFunction: async () => ({ data: [data1, data2] });
```

---

## 🔧 Troubleshooting

### **Data tidak muncul?**
- Pastikan `fetchFunction` return `{ data: T[] }`
- Cek apakah API return format yang benar
- Pastikan `pageSize` sesuai dengan API

### **Infinite scroll tidak jalan?**
- Pastikan API return data sesuai `pageSize`
- Cek `hasMore` state
- Pastikan `onEndReachedThreshold` tidak terlalu kecil (default 0.5)

### **Skeleton terus muncul?**
- Cek `loading` state
- Pastikan `fetchFunction` resolve dengan benar
- Cek error di console

### **Refresh tidak bekerja?**
- Pastikan `RefreshControl` menggunakan `pagination.refreshing` dan `pagination.onRefresh`
- Cek apakah API dipanggil saat pull-to-refresh

---

## 📝 Migration Guide

### **Dari Code Lama ke Code Baru**

#### **BEFORE:**
```tsx
const [listData, setListData] = useState([]);
const [loading, setLoading] = useState(false);
const [refreshing, setRefreshing] = useState(false);
const [hasMore, setHasMore] = useState(true);
const [page, setPage] = useState(1);

const fetchData = async (pageNumber, clear) => {
  // ... 30+ lines of code
};

useEffect(() => {
  setPage(1);
  setListData([]);
  setHasMore(true);
  fetchData(1, true);
}, [search, user?.id]);

const onRefresh = useCallback(() => {
  fetchData(1, true);
}, [search, user?.id]);

const loadMore = useCallback(() => {
  if (hasMore && !loading && !refreshing) {
    fetchData(page + 1, false);
  }
}, [hasMore, loading, refreshing, page, search, user?.id]);

// ... skeleton, empty, footer components
```

#### **AFTER:**
```tsx
const pagination = usePagination({
  fetchFunction: async (page, search) => await apiGetData({ page, search }),
  pageSize: 5,
  searchQuery: search,
  dependencies: [user?.id]
});

const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
  loading: pagination.loading,
  refreshing: pagination.refreshing,
  listData: pagination.listData,
  searchQuery: search,
});
```

**Result:** 50+ lines → 15 lines! 🎉

---

## 👨‍💻 Author

Created by Full-Stack Developer  
React Native + Expo Specialist

---

## 📄 License

MIT License - Feel free to use in your projects!
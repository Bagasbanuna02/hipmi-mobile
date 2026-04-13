/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonCustom, OS_Wrapper, Spacing, TextCustom } from "@/components";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { PADDING_INLINE, PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { apiVotingGetAll } from "@/service/api-client/api-voting";
import { useState } from "react";
import { RefreshControl, View } from "react-native";

export default function Voting_ScreenHistory() {
  const [activeCategory, setActiveCategory] = useState<string | null>("all");
  const { user } = useAuth();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiVotingGetAll({
        category: activeCategory === "all" ? "all-history" : "my-history",
        authorId: user?.id as string,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id, activeCategory],
    onError: (error) => console.error("[ERROR] Fetch voting history:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Belum ada riwayat",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  // Render item voting
  const renderVotingItem = ({ item }: { item: any }) => (
    <Voting_BoxPublishSection
      key={item && item?.id}
      data={item}
      href={`/voting/${item.id}/history`}
    />
  );

  const handlePress = (item: any) => {
    setActiveCategory(item);
    // Reset pagination saat kategori berubah
    pagination.reset();
  };

  const headerComponent = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        backgroundColor: MainColor.soft_darkblue,
        borderRadius: 50,
        width: "100%",
      }}
    >
      <ButtonCustom
        backgroundColor={
          activeCategory === "all" ? MainColor.yellow : AccentColor.blue
        }
        textColor={activeCategory === "all" ? MainColor.black : MainColor.white}
        style={{ width: "49%" }}
        onPress={() => handlePress("all")}
      >
        Semua Riwayat
      </ButtonCustom>
      <Spacing width={"2%"} />
      <ButtonCustom
        backgroundColor={
          activeCategory === "main" ? MainColor.yellow : AccentColor.blue
        }
        textColor={
          activeCategory === "main" ? MainColor.black : MainColor.white
        }
        style={{ width: "49%" }}
        onPress={() => handlePress("main")}
      >
        Riwayat Saya
      </ButtonCustom>
    </View>
  );

  return (
    <OS_Wrapper
      contentPadding={PADDING_INLINE}
      headerComponent={headerComponent}
      listData={pagination.listData}
      renderItem={renderVotingItem}
      refreshControl={
        <RefreshControl
          tintColor={MainColor.yellow}
          colors={[MainColor.yellow]}
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      hideFooter
    />
  );
}

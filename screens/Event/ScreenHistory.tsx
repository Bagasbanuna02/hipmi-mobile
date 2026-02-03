/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonCustom, Spacing, TextCustom } from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import Event_BoxPublishSection from "@/screens/Event/BoxPublishSection";
import { apiEventGetAll } from "@/service/api-client/api-event";
import { dateTimeView } from "@/utils/dateTimeView";
import _ from "lodash";
import { useState } from "react";
import { RefreshControl, View } from "react-native";

const PAGE_SIZE = 5;

export default function Event_ScreenHistory() {
  const [activeCategory, setActiveCategory] = useState<string | null>("all");
  const { user } = useAuth();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiEventGetAll({
        category: activeCategory === "all" ? "all-history" : "my-history",
        userId: user?.id,
        page: String(page),
      });
    },
    pageSize: PAGE_SIZE,
    dependencies: [user?.id, activeCategory],
    onError: (error) => console.error("[ERROR] Fetch event history:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    emptyMessage: "Belum ada riwayat",
    skeletonCount: 5,
    skeletonHeight: 100,
  });

  // Render item event
  const renderEventItem = ({ item }: { item: any }) => (
    <Event_BoxPublishSection
      key={item.id}
      data={item}
      rightComponentAvatar={
        <TextCustom>
          {dateTimeView({ date: item?.tanggal, withoutTime: true })}
        </TextCustom>
      }
      href={`/event/${item.id}/history`}
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
    <NewWrapper
      headerComponent={headerComponent}
      listData={pagination.listData}
      renderItem={renderEventItem}
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

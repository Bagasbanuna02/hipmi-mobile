import { ScrollableCustom, StackCustom } from "@/components";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import AdminAppInformation_BusinessFieldSection from "@/screens/Admin/App-Information/BusinessFieldSection";
import AdminAppInformation_Bank_Component from "@/screens/Admin/App-Information/InformationBankSection";
import { apiFetchAdminMasterAppInformation } from "@/service/api-admin/api-master-admin";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, RefreshControl } from "react-native";

export function Admin_ScreenAppInformation() {
  const [activeCategory, setActiveCategory] = useState<string | null>("bank");
  const [activePage, setActivePage] = useState<string>("Informasi Bank");

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiFetchAdminMasterAppInformation({
        category: activeCategory as string,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [activeCategory],
    onError: (error) => console.error("[ERROR] Fetch job by status:", error),
  });

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: `Tidak ada data ${activeCategory}`,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    setActivePage(item.label);
    // tambahkan logika lain seperti filter dsb.
  };

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [activeCategory]),
  );

  const scrollComponent = (
    <StackCustom>
      <ScrollableCustom
        data={listPage.map((e, i) => ({
          id: i,
          label: e.label,
          value: e.value,
        }))}
        onButtonPress={handlePress}
        activeId={activeCategory as any}
      />
      <AdminComp_BoxTitle
        title={activePage}
        rightComponent={
          <AdminActionIconPlus
            onPress={() => {
              if (activeCategory === "bank") {
                router.push("/admin/app-information/information-bank/create");
              } else if (activeCategory === "business") {
                router.push("/admin/app-information/business-field/create");
              } else if (activeCategory === "sticker") {
                Alert.alert("Coming Soon", "Next Update");
                // router.push("/admin/app-information/sticker/create");
              }
            }}
          />
        }
      />
    </StackCustom>
  );

  // const renderContent = () => {
  //   switch (activeCategory) {
  //     case "bank":
  //       return <AdminAppInformation_Bank_Component />;
  //     case "business":
  //       return <AdminAppInformation_BusinessFieldSection />;
  //     // case "sticker":
  //     //   return <AdminAppInformation_StickerSection />;
  //     default:
  //       return <AdminAppInformation_Bank_Component />;
  //   }
  // };

  const renderItem = (item: any) => {
    if (activeCategory === "bank") {
      return <AdminAppInformation_Bank_Component key={item.id} item={item} />;
    } else if (activeCategory === "business") {
      return (
        <AdminAppInformation_BusinessFieldSection key={item.id} item={item} />
      );
    } else {
      return <AdminAppInformation_Bank_Component key={item.id} item={item} />;
    }
  };

  return (
    <NewWrapper
      headerComponent={scrollComponent}
      // ListHeaderComponent={

      // }
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
      // Data dan render
      listData={pagination.listData}
      renderItem={(item: any) => renderItem(item)}
    />
    //   {renderContent()}
    // </NewWrapper>
  );
}

const listPage = [
  {
    id: "1",
    label: "Informasi Bank",
    value: "bank",
  },
  {
    id: "2",
    label: "Bidang & Sub Bidang",
    value: "business",
  },
  // {
  //   id: "3",
  //   label: "Stiker",
  //   value: "sticker",
  // },
];

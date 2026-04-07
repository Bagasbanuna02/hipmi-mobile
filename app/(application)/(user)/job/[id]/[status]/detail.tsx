/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  OS_Wrapper,
  Spacing,
  StackCustom,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import ReportBox from "@/components/Box/ReportBox";
import Job_BoxDetailSection from "@/screens/Job/BoxDetailSection";
import Job_ButtonStatusSection from "@/screens/Job/ButtonStatusSection";
import { apiJobGetOne } from "@/service/api-client/api-job";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import { PADDING_INLINE } from "@/constants/constans-value";

export default function JobDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setIsLoadData(true);
      const response = await apiJobGetOne({ id: id as string });
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Detail"
              left={<BackButton />}
              right={
                status === "draft" ? (
                  <DotButton onPress={() => setOpenDrawer(true)} />
                ) : null
              }
            />
          ),
        }}
      />
      <OS_Wrapper contentPadding={PADDING_INLINE}>
        {isLoadData ? (
          <LoaderCustom />
        ) : (
          <>
            <StackCustom gap={"xs"}>
              {data &&
                data?.catatan &&
                (status === "draft" || status === "reject") && (
                  <ReportBox text={data?.catatan} />
                )}

              <Job_BoxDetailSection data={data} />
              <Job_ButtonStatusSection
                id={id as string}
                status={status as string}
                isLoading={isLoading}
                onSetLoading={setIsLoading}
                isArchive={true}
              />
            </StackCustom>
            <Spacing />
          </>
        )}
      </OS_Wrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit",
              path: `/job/${id}/edit`,
            },
          ]}
          columns={4}
          onPressItem={handlePress as any}
        />
      </DrawerCustom>
    </>
  );
}

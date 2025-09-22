/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BaseBox,
  DrawerCustom,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { apiCollaborationGetParticipants } from "@/service/api-client/api-collaboration";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function CollaborationListOfParticipants() {
  const { id } = useLocalSearchParams();
  const [listData, setListData] = useState<any[]>();
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiCollaborationGetParticipants({
        category: "list",
        id: id as string,
      });

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <ViewWrapper>
        {loadingGetData ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom align="center">Tidak ada data</TextCustom>
        ) : (
          listData?.map((item: any, index: number) => (
            <BaseBox key={index} paddingBlock={5}>
              <AvatarUsernameAndOtherComponent
                avatar={item?.User?.Profile?.imageId}
                avatarHref={`/profile/${item?.User?.Profile?.id}`}
                name={item?.User?.username}
                rightComponent={
                  <Feather
                    name="chevron-right"
                    size={24}
                    color="white"
                    onPress={() => {
                      setDescription(item?.deskripsi_diri);
                      setOpenDrawer(true);
                    }}
                  />
                }
              />
            </BaseBox>
          ))
        )}
      </ViewWrapper>

      {/* Drawer */}
      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
      >
        <StackCustom>
          <TextCustom bold>Deskripsi diri</TextCustom>
          <BaseBox>
            <ScrollView style={{ height: "80%" }}>
              <TextCustom>{description}</TextCustom>
            </ScrollView>
          </BaseBox>
          <Spacing />
        </StackCustom>
      </DrawerCustom>
    </>
  );
}

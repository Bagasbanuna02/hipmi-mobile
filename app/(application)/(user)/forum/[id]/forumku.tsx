/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertCustom,
  AvatarComp,
  AvatarCustom,
  ButtonCustom,
  CenterCustom,
  DrawerCustom,
  Grid,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import { listDummyDiscussionForum } from "@/screens/Forum/list-data-dummy";
import Forum_MenuDrawerBerandaSection from "@/screens/Forum/MenuDrawerSection.tsx/MenuBeranda";
import { apiForumGetAll } from "@/service/api-client/api-forum";
import { apiUser } from "@/service/api-client/api-user";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function Forumku() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const [listData, setListData] = useState<any | null>(null);
  const [dataUser, setDataUser] = useState<any | null>(null);
  const [loadingGetList, setLoadingGetList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
      onLoadDataProfile(user?.id as string);
    }, [user?.id])
  );

  const onLoadDataProfile = async (id: string) => {
    try {
      const response = await apiUser(id);

      setDataUser(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
    }
  };

  const onLoadData = async () => {
    try {
      setLoadingGetList(true);
      const response = await apiForumGetAll({
        search: "",
        authorId: id as string,
      });

      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetList(false);
    }
  };

  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <CenterCustom>
            <AvatarComp
              fileId={dataUser?.Profile?.imageId}
              href={`/(application)/(image)/preview-image/${dataUser?.Profile?.imageId}`}
              size="xl"
            />
          </CenterCustom>

          <Grid>
            <Grid.Col span={6}>
              <TextCustom bold truncate>
                @{dataUser?.username || "-"}
              </TextCustom>
              <TextCustom>{listData?.length || "0"} postingan</TextCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
              <ButtonCustom href={`/profile/${dataUser?.Profile?.id}`}>
                Kunjungi Profile
              </ButtonCustom>
            </Grid.Col>
          </Grid>
          {loadingGetList ? (
            <LoaderCustom />
          ) : _.isEmpty(listData) ? (
            <TextCustom> Tidak ada diskusi</TextCustom>
          ) : (
            <>
              {listData?.map((item: any, index: number) => (
                <Forum_BoxDetailSection
                  isRightComponent={false}
                  key={index}
                  data={item}
                  isTruncate={true}
                  href={`/forum/${item.id}`}
                  onSetData={(value) => {
                    setOpenDrawer(value.setOpenDrawer);
                    setStatus(value.setStatus);
                  }}
                />
              ))}
            </>
          )}
        </StackCustom>
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        height={"auto"}
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
      >
        <Forum_MenuDrawerBerandaSection
          id={id as string}
          status={status}
          setIsDrawerOpen={() => {
            setOpenDrawer(false);
          }}
          authorId={id as string}
        />
      </DrawerCustom>
    </>
  );
}

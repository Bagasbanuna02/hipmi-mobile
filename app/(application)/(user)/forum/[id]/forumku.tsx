import {
  AlertCustom,
  AvatarCustom,
  ButtonCustom,
  CenterCustom,
  DrawerCustom,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import Forum_BerandaSection from "@/screens/Forum/BerandaSection";
import { listDataDummyForum } from "@/screens/Forum/list-data-dummy";
import Forum_MenuDrawerBerandaSection from "@/screens/Forum/MenuDrawerSection.tsx/MenuBeranda";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function Forumku() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <CenterCustom>
            <AvatarCustom
              href={`/(application)/(image)/preview-image/${id}`}
              size="xl"
            />
          </CenterCustom>

          <Grid>
            <Grid.Col span={6}>
              <TextCustom bold truncate>
                @bagas_banuna
              </TextCustom>
              <TextCustom>1 postingan</TextCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
              <ButtonCustom href={`/profile/${id}`}>
                Kunjungi Profile
              </ButtonCustom>
            </Grid.Col>
          </Grid>
          {listDataDummyForum.map((e, i) => (
            <Forum_BerandaSection
              key={i}
              data={e}
              setOpenDrawer={setOpenDrawer}
              setStatus={setStatus}
            />
          ))}
        </StackCustom>
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        height={350}
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
      >
        <Forum_MenuDrawerBerandaSection
          id={id as string}
          status={status}
          setIsDrawerOpen={() => {
            setOpenDrawer(false);
          }}
          setShowDeleteAlert={setDeleteAlert}
          setShowAlertStatus={setAlertStatus}
        />
      </DrawerCustom>

      {/* Alert Komponen Eksternal */}
      <AlertCustom
        isVisible={alertStatus}
        onLeftPress={() => setAlertStatus(false)}
        onRightPress={() => {
          setOpenDrawer(false);
          setAlertStatus(false);
          console.log("Ubah status forum");
        }}
        title="Ubah Status Forum"
        message="Apakah Anda yakin ingin mengubah status forum ini?"
        textLeft="Batal"
        textRight="Ubah"
        colorRight={MainColor.green}
      />

      {/* Alert Delete */}
      <AlertCustom
        isVisible={deleteAlert}
        onLeftPress={() => setDeleteAlert(false)}
        onRightPress={() => {
          setOpenDrawer(false);
          setDeleteAlert(false);
          console.log("Hapus forum");
        }}
        title="Hapus Forum"
        message="Apakah Anda yakin ingin menghapus forum ini?"
        textLeft="Batal"
        textRight="Hapus"
        colorRight={MainColor.red}
      />
    </>
  );
}

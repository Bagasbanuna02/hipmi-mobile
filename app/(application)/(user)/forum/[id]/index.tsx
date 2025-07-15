import {
  AlertCustom,
  ButtonCustom,
  DrawerCustom,
  Spacing,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import Forum_CommentarBoxSection from "@/screens/Forum/CommentarBoxSection";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import { listDummyCommentarForum } from "@/screens/Forum/list-data-dummy";
import Forum_MenuDrawerBerandaSection from "@/screens/Forum/MenuDrawerSection.tsx/MenuBeranda";
import Forum_MenuDrawerCommentar from "@/screens/Forum/MenuDrawerSection.tsx/MenuCommentar";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function ForumDetail() {
  const { id } = useLocalSearchParams();
  console.log(id);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [text, setText] = useState("");

  // Comentar
  const [openDrawerCommentar, setOpenDrawerCommentar] = useState(false);
  const [alertDeleteCommentar, setAlertDeleteCommentar] = useState(false);

  const dataDummy = {
    name: "Bagas",
    status: "Open",
    date: "14/07/2025",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae inventore iure pariatur, libero omnis excepturi. Ullam ad officiis deleniti quos esse odit nesciunt, ipsam adipisci cumque aliquam corporis culpa fugit?",
    jumlahBalas: 2,
  };

  return (
    <>
      <ViewWrapper>
        {/* <StackCustom>
        </StackCustom> */}
        <Forum_BoxDetailSection
          data={dataDummy}
          setOpenDrawer={setOpenDrawer}
          setStatus={setStatus}
        />

        <TextAreaCustom
          placeholder="Ketik diskusi anda..."
          maxLength={1000}
          showCount
          value={text}
          onChangeText={setText}
          style={{
            marginBottom: 0,
          }}
        />
        <ButtonCustom
          style={{
            alignSelf: "flex-end",
          }}
          onPress={() => {
            console.log("Posting", text);
            router.back();
          }}
        >
          Balas
        </ButtonCustom>

        <Spacing height={40} />

        {listDummyCommentarForum.map((e, i) => (
          <Forum_CommentarBoxSection
            key={i}
            data={e}
            setOpenDrawer={setOpenDrawerCommentar}
          />
        ))}
      </ViewWrapper>

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

      {/* Alert Status */}
      <AlertCustom
        isVisible={alertStatus}
        title="Ubah Status Forum"
        message="Apakah Anda yakin ingin mengubah status forum ini?"
        onLeftPress={() => {
          setOpenDrawer(false);
          setAlertStatus(false);
          console.log("Batal");
        }}
        onRightPress={() => {
          setOpenDrawer(false);
          setAlertStatus(false);
          console.log("Ubah status forum");
        }}
        textLeft="Batal"
        textRight="Ubah"
        colorRight={MainColor.green}
      />

      {/* Alert Delete */}
      <AlertCustom
        isVisible={deleteAlert}
        title="Hapus Forum"
        message="Apakah Anda yakin ingin menghapus forum ini?"
        onLeftPress={() => {
          setOpenDrawer(false);
          setDeleteAlert(false);
          console.log("Batal");
        }}
        onRightPress={() => {
          setOpenDrawer(false);
          setDeleteAlert(false);
          console.log("Hapus forum");
        }}
        textLeft="Batal"
        textRight="Hapus"
        colorRight={MainColor.red}
      />

      {/* Commentar */}
      <DrawerCustom
        height={350}
        isVisible={openDrawerCommentar}
        closeDrawer={() => setOpenDrawerCommentar(false)}
      >
        <Forum_MenuDrawerCommentar
          id={id as string}
          setIsDrawerOpen={() => {
            setOpenDrawerCommentar(false);
          }}
          setShowDeleteAlert={setAlertDeleteCommentar}
        />
      </DrawerCustom>

      {/* Alert Delete Commentar */}
      <AlertCustom
        isVisible={alertDeleteCommentar}
        title="Hapus Komentar"
        message="Apakah Anda yakin ingin menghapus komentar ini?"
        onLeftPress={() => {
          setOpenDrawerCommentar(false);
          setAlertDeleteCommentar(false);
          console.log("Batal");
        }}
        onRightPress={() => {
          setOpenDrawerCommentar(false);
          setAlertDeleteCommentar(false);
          console.log("Hapus commentar");
        }}
        textLeft="Batal"
        textRight="Hapus"
        colorRight={MainColor.red}
      />
    </>
  );
}

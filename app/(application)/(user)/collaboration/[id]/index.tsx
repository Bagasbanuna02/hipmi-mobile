/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  ButtonCustom,
  DotButton,
  DrawerCustom,
  InformationBox,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import Collaboration_BoxDetailSection from "@/screens/Collaboration/BoxDetailSection";
import {
  apiCollaborationGetOne,
  apiCollaborationGetParticipants,
} from "@/service/api-client/api-collaboration";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";

export default function CollaborationDetail() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>();
  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const [loadingIsParticipant, setLoadingIsParticipant] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
      onLoadParticipants();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiCollaborationGetOne({ id: id as string });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const onLoadParticipants = async () => {
    try {
      setLoadingIsParticipant(true);
      const response = await apiCollaborationGetParticipants({
        category: "check-participant",
        id: id as string,
        authorId: user?.id,
      });

      if (response.success) {
        setIsParticipant(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingIsParticipant(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Detail Proyek",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton onPress={() => setOpenDrawerMenu(true)} />
          ),
        }}
      />
      <ViewWrapper>
        {!data && !isParticipant ? (
          <LoaderCustom />
        ) : (
          <>
            {user?.id === data?.Author?.id && (
              <InformationBox
                text={
                  "Tombol partisipasi hanya muncul untuk proyek yang tidak anda buat"
                }
              />
            )}
            <Collaboration_BoxDetailSection data={data} />
            {user?.id !== data?.Author?.id && (
              <ButtonCustom
                disabled={isParticipant || loadingIsParticipant}
                onPress={() => {
                  router.push(`/collaboration/${id}/create-pacticipants`);
                  //  setOpenDrawerPartisipasi(true);
                }}
              >
                {isParticipant ? "Anda telah berpartisipasi" : "Partisipasi"}
              </ButtonCustom>
            )}
          </>
        )}
      </ViewWrapper>

      {/* Drawer Partisipasi */}
      {/* <DrawerCustom
        isVisible={openDrawerPartisipasi}
        closeDrawer={() => setOpenDrawerPartisipasi(false)}
        height={300}
      >
        <TextAreaCustom
          label="Dekripsi diri"
          placeholder="Masukan dekripsi diri"
          required
          showCount
          maxLength={500}
          value={description}
          onChangeText={setDescription}
        />

        <ButtonCustom
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            AlertDefaultSystem({
              title: "Simpan data deskripsi",
              message: "Apakah anda sudah yakin ingin menyimpan data ini ?",
              textLeft: "Batal",
              textRight: "Simpan",
              onPressRight: () => {
                handlerSubmitParticipans();
              },
            });
          }}
        >
          Simpan
        </ButtonCustom>
      </DrawerCustom> */}

      {/* Drawer Menu */}
      <DrawerCustom
        isVisible={openDrawerMenu}
        closeDrawer={() => setOpenDrawerMenu(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <Ionicons name="people" size={24} color="white" />,
              label: "Daftar Partisipan",
              path: `/collaboration/${id}/list-of-participants`,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawerMenu(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}

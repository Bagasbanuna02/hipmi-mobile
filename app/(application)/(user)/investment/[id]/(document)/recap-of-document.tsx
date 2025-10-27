/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Investment_BoxDetailDocument from "@/screens/Invesment/Document/RecapBoxDetail";
import {
  apiInvestmentDeleteDocument,
  apiInvestmentGetDocument,
} from "@/service/api-client/api-investment";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function InvestmentRecapOfDocument() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerBox, setOpenDrawerBox] = useState(false);
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadListDocument();
    }, [id])
  );

  const onLoadListDocument = async () => {
    try {
      setLoadList(true);
      const response = await apiInvestmentGetDocument({
        id: id as string,
        category: "all-document",
      });

      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setList([]);
    } finally {
      setLoadList(false);
    }
  };

  const handlerDeleteDocument = async () => {
    try {
      const response = await apiInvestmentDeleteDocument({
        id: selectId as string,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Data berhasil dihapus",
        });
        setList((prev: any[] | null) => {
          if (!prev) return null;
          return prev.filter((item: any) => item.id !== selectId);
        });
        setOpenDrawerBox(false);
        setSelectId(null);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      Toast.show({
        type: "error",
        text1: "Gagal menghapus data",
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Rekap Dokumen",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton
              onPress={() => {
                setOpenDrawer(true);
                setOpenDrawerBox(false);
              }}
            />
          ),
        }}
      />

      <ViewWrapper>
        {loadList ? (
          <LoaderCustom />
        ) : _.isEmpty(list) ? (
          <TextCustom align="center" color="gray">
            Tidak ada data
          </TextCustom>
        ) : (
          list?.map((item: any, index: number) => (
            <Investment_BoxDetailDocument
              key={index}
              title={item.title}
              leftIcon={
                <Ionicons
                  name="ellipsis-horizontal-outline"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                  style={{
                    zIndex: 10,
                    alignSelf: "flex-end",
                  }}
                  onPress={() => {
                    setSelectId(item.id);
                    setOpenDrawerBox(true);
                  }}
                />
              }
              href={`/(file)/${item.fileId}`}
            />
          ))
        )}
      </ViewWrapper>

      {/* Drawer On Header */}
      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: (
                <AntDesign
                  name="plus-circle"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Tambah Dokumen",
              path: `/investment/${id}/(document)/add-document`,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>

      {/* Drawer On Box */}
      <DrawerCustom
        isVisible={openDrawerBox}
        closeDrawer={() => setOpenDrawerBox(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit Dokumen",
              path: `/investment/${selectId}/(document)/edit-document`,
            },
            {
              icon: (
                <Ionicons
                  name="trash-outline"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Hapus Dokumen",
              path: "" as any,
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            if (item.path === ("" as any)) {
              AlertDefaultSystem({
                title: "Hapus Dokumen",
                message: "Apakah anda yakin ingin menghapus dokumen ini?",
                textLeft: "Batal",
                textRight: "Hapus",
                onPressRight: () => {
                  handlerDeleteDocument();
                },
              });
            } else {
              router.push(item.path as any);
            }

            setOpenDrawerBox(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}

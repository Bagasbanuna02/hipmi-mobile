/* eslint-disable react-hooks/exhaustive-deps */
import {
    AlertDefaultSystem,
    AvatarComp,
    BaseBox,
    BoxButtonOnFooter,
    ButtonCustom,
    CheckboxCustom,
    CheckboxGroup,
    DrawerCustom,
    Grid,
    LoaderCustom,
    Spacing,
    StackCustom,
    TextAreaCustom,
    TextCustom,
    ViewWrapper,
} from "@/components";
import ModalCustom from "@/components/Modal/ModalCustom";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import {
    apiCollaborationCreateGroup,
    apiCollaborationGetParticipants,
} from "@/service/api-client/api-collaboration";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

export default function CollaborationSelectOfParticipants() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [listData, setListData] = useState<any[]>();
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [nameGroup, setNameGroup] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      //   console.log("response :", JSON.stringify(response.data, null, 2));

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

  const handlerCreateGroup = async () => {
    if (_.isEmpty(nameGroup)) {
      Toast.show({
        type: "error",
        text1: "Nama grup tidak boleh kosong",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiCollaborationCreateGroup({
        id: id as string,
        data: {
          authorId: user?.id,
          nameGroup: nameGroup,
          listSelect: selected,
        },
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Grup berhasil dibuat",
        });
        router.push("/(application)/(user)/collaboration/(tabs)/group");
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal membuat grup",
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom
            disabled={_.isEmpty(selected)}
            onPress={() => {
              setOpenModal(true);
              setNameGroup("");
            }}
          >
            Buat Grup
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };

  return (
    <>
      <ViewWrapper
        footerComponent={_.isEmpty(listData) ? null : handlerSubmit()}
      >
        {loadingGetData ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom align="center">Tidak ada partisipan</TextCustom>
        ) : (
          <StackCustom>
            <TextCustom size="default" color="red" bold>
              *{" "}
              <TextCustom size="small" semiBold>
                Pilih user yang akan menjadi tim proyek anda
              </TextCustom>
            </TextCustom>

            <CheckboxGroup
              value={selected}
              onChange={(val: any) => {
                console.log("val :", val);
                setSelected(val);
              }}
            >
              {listData?.map((item: any, index: any) => (
                <View key={index}>
                  <Grid key={index}>
                    <Grid.Col
                      span={2}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <CheckboxCustom valueKey={item?.User?.id} />
                    </Grid.Col>
                    <Grid.Col span={2} style={{ alignItems: "center" }}>
                      <AvatarComp
                        size="base"
                        fileId={item?.User?.Profile?.imageId}
                      />
                    </Grid.Col>
                    <Grid.Col span={6} style={{ justifyContent: "center" }}>
                      <TextCustom bold truncate>
                        {item?.User?.username}
                      </TextCustom>
                    </Grid.Col>
                    <Grid.Col
                      span={2}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <MaterialIcons
                        name="notes"
                        size={ICON_SIZE_SMALL}
                        color="white"
                        onPress={() => {
                          setOpenDrawer(true);
                          setDescription(item?.deskripsi_diri);
                        }}
                      />
                    </Grid.Col>
                  </Grid>
                </View>
              ))}
            </CheckboxGroup>
          </StackCustom>
        )}
      </ViewWrapper>

      <ModalCustom isVisible={openModal}>
        <StackCustom gap={0}>
          <TextAreaCustom
            placeholder="Nama Grup"
            value={nameGroup}
            onChangeText={(val) => setNameGroup(val)}
          />
          <Grid>
            <Grid.Col span={6} style={{ paddingRight: 10 }}>
              <ButtonCustom
                backgroundColor="gray"
                onPress={() => {
                  setOpenModal(false);
                }}
              >
                Batal
              </ButtonCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ paddingLeft: 10 }}>
              <ButtonCustom
                isLoading={isLoading}
                disabled={_.isEmpty(nameGroup)}
                onPress={() => {
                  AlertDefaultSystem({
                    title: "Buat Grup",
                    message:
                      "Apakah anda yakin ingin membuat grup untuk proyek ini ?",
                    textLeft: "Tidak",
                    textRight: "Ya",
                    onPressLeft: () => {},
                    onPressRight: () => {
                      handlerCreateGroup();
                    },
                  });
                }}
              >
                Simpan
              </ButtonCustom>
            </Grid.Col>
          </Grid>
        </StackCustom>
      </ModalCustom>

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

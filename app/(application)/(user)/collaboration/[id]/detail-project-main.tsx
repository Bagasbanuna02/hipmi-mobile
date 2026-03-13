/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  ViewWrapper
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconEdit } from "@/components/_Icon";
import Collaboration_BoxDetailSection from "@/screens/Collaboration/BoxDetailSection";
import {
  apiCollaborationGetOne
} from "@/service/api-client/api-collaboration";
import { MaterialIcons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";

export default function CollaborationDetailProjectMain() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any>();
  const [loadingGetData, setLoadingGetData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handlerLoadData();
    }, [id])
  );

  const handlerLoadData = async () => {
    try {
      setLoadingGetData(true);
      await onLoadData();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

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

  const handleSubmit = (item: any) => {
    console.log("item :", item);
    router.push(item.path);
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Proyek Saya"
              left={<BackButton />}
              right={<DotButton onPress={() => setOpenDrawer(true)} />}
            />
          ),
        }}
      />
      <ViewWrapper>
        {loadingGetData ? (
          <LoaderCustom />
        ) : (
          <>
            <Collaboration_BoxDetailSection data={data} />
            {/* <Collaboration_MainParticipanSelectedSection
              selected={selected}
              setSelected={setSelected}
              setOpenDrawerParticipant={setOpenDrawerParticipant}
              listData={listData as any}
            /> */}

            <Spacing />
          </>
        )}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Edit",
              path: `/(application)/(user)/collaboration/${id}/edit`,
              icon: <IconEdit />,
            },
            {
              label: "Pilih Partisipan",
              path: `/(application)/(user)/collaboration/${id}/select-of-participants`,
              icon: <MaterialIcons name="checklist" size={24} color="white" />,
            },
          ]}
          onPressItem={(item: any) => {
            handleSubmit(item);
          }}
        />
      </DrawerCustom>
    </>
  );
}

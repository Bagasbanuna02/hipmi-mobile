/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  ViewWrapper
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import Collaboration_BoxDetailSection from "@/screens/Collaboration/BoxDetailSection";
import { apiCollaborationGetOne } from "@/service/api-client/api-collaboration";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function CollaborationDetailParticipant() {
  const { id } = useLocalSearchParams();
  const [openDrawerParticipant, setOpenDrawerParticipant] = useState(false);
  const [data, setData] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      onLoadData();
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

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Detail Proyek"
              left={<BackButton />}
              right={
                <DotButton onPress={() => setOpenDrawerParticipant(true)} />
              }
            />
          ),
        }}
      />

      <ViewWrapper>
        <Collaboration_BoxDetailSection data={data} />
        {/* <BaseBox style={{ height: 500 }}>
            <TextCustom align="center" bold size="large">
              Partisipan
            </TextCustom>

            {Array.from({ length: 5 }).map((_, index) => (
              <AvatarUsernameAndOtherComponent
                key={index}
                avatarHref={`/profile/${index}`}
                rightComponent={
                  <MaterialIcons
                    name="notes"
                    size={ICON_SIZE_SMALL}
                    color="white"
                    onPress={() => setOpenDrawerParticipant(true)}
                  />
                }
              />
            ))}
        </BaseBox> */}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawerParticipant}
        closeDrawer={() => setOpenDrawerParticipant(false)}
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
            setOpenDrawerParticipant(false);
          }}
        />
      </DrawerCustom>

      {/* <DrawerCustom
        isVisible={openDrawerParticipant}
        closeDrawer={() => setOpenDrawerParticipant(false)}
        height={"auto"}
      >
        <StackCustom>
          <TextCustom bold>Deskripsi Diri</TextCustom>
          <TextCustom>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi,
            itaque adipisci. Voluptas, sed quod! Ad facere labore voluptates,
            neque quidem aut reprehenderit ducimus mollitia quisquam temporibus!
            Temporibus iusto soluta necessitatibus.
          </TextCustom>
        </StackCustom>
      </DrawerCustom> */}
    </>
  );
}

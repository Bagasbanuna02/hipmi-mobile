import {
  AlertDefaultSystem,
  BackButton,
  ButtonCustom,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import Collaboration_BoxDetailSection from "@/screens/Collaboration/BoxDetailSection";
import Collaboration_MainParticipanSelectedSection from "@/screens/Collaboration/ProjectMainSelectedSection";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function CollaborationDetailProjectMain() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerParticipant, setOpenDrawerParticipant] = useState(false);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const handleEdit = () => {
    console.log("Edit collaboration");
    router.push("/(application)/(user)/collaboration/(id)/edit");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Proyek Saya",
          headerLeft: () => <BackButton />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper>
        <Collaboration_BoxDetailSection id={id as string} />
        <Collaboration_MainParticipanSelectedSection
          selected={selected}
          setSelected={setSelected}
          setOpenDrawerParticipant={setOpenDrawerParticipant}
        />

        <ButtonCustom
          onPress={() => {
            AlertDefaultSystem({
              title: "Buat Grup",
              message:
                "Apakah anda yakin ingin membuat grup untuk proyek ini ?",
              textLeft: "Tidak",
              textRight: "Ya",
              onPressLeft: () => {},
              onPressRight: () => {
                router.navigate(
                  "/(application)/(user)/collaboration/(tabs)/group"
                );
                console.log("selected :", selected);
              },
            });
          }}
        >
          Buat Grup
        </ButtonCustom>
        <Spacing />
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
              path: "/(application)/(user)/collaboration/(tabs)/group",
              icon: <IconEdit />,
            },
          ]}
          onPressItem={(item) => {
            handleEdit();
          }}
        />
      </DrawerCustom>

      <DrawerCustom
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
      </DrawerCustom>
    </>
  );
}

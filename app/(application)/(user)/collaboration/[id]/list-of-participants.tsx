import {
    AvatarUsernameAndOtherComponent,
    BaseBox,
    DrawerCustom,
    Spacing,
    StackCustom,
    TextCustom,
    ViewWrapper
} from "@/components";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function CollaborationListOfParticipants() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <ViewWrapper>
        {Array.from({ length: 10 }).map((_, index) => (
          <BaseBox key={index} paddingBlock={5}>
            <AvatarUsernameAndOtherComponent
              avatarHref={`/profile/${id}`}
              rightComponent={
                <Feather
                  name="chevron-right"
                  size={24}
                  color="white"
                  onPress={() => setOpenDrawer(true)}
                />
              }
            />
          </BaseBox>
        ))}
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
              <TextCustom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut iqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </TextCustom>
            </ScrollView>
          </BaseBox>
          <Spacing />
        </StackCustom>
      </DrawerCustom>
    </>
  );
}

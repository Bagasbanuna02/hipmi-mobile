import {
  AvatarUsernameAndOtherComponent,
  BaseBox,
  DrawerCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Collaboration_BoxDetailSection from "@/screens/Collaboration/BoxDetailSection";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function CollaborationDetailParticipant() {
  const { id } = useLocalSearchParams();
  const [openDrawerParticipant, setOpenDrawerParticipant] = useState(false);

  return (
    <>
      <ViewWrapper>
        <Collaboration_BoxDetailSection id={id as string} />
        <BaseBox style={{ height: 500 }}>
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
        </BaseBox>
      </ViewWrapper>

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

import {
  AvatarCustom,
  AvatarUsernameAndOtherComponent,
  BaseBox,
  DrawerCustom,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import CheckboxCustom from "@/components/Checkbox/CheckboxCustom";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Collaboration_BoxDetailSection from "@/screens/Collaboration/BoxDetailSection";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function CollaborationDetailProjectMain() {
  const { id } = useLocalSearchParams();
  const [openDrawerParticipant, setOpenDrawerParticipant] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <>
      <ViewWrapper>
        <Collaboration_BoxDetailSection id={id as string} />
        <BaseBox style={{ height: 500 }}>
          <StackCustom>
            <TextCustom size="default" color="red" bold>
              *{" "}
              <TextCustom size="small" semiBold>
                Pilih user yang akan menjadi tim proyek anda
              </TextCustom>
            </TextCustom>

            {Array.from({ length: 5 }).map((_, index) => (
              <Grid key={index}>
                <Grid.Col
                  span={2}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <CheckboxCustom
                    value={newsletter}
                    onChange={() => {
                      console.log("newsletter", newsletter);
                      setNewsletter(!newsletter);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={2} style={{ alignItems: "center" }}>
                  <AvatarCustom />
                </Grid.Col>
                <Grid.Col span={6} style={{ justifyContent: "center" }}>
                  <TextCustom bold truncate>
                    Username
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
                  />
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
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

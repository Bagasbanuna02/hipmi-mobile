import {
  AvatarCustom,
  BaseBox,
  CheckboxCustom,
  CheckboxGroup,
  Grid,
  StackCustom,
  TextCustom
} from "@/components";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function Collaboration_ProjectMainSelectedSection({
  selected,
  setSelected,
  setOpenDrawerParticipant,
  listData,
}: {
  selected: (string | number)[];
  setSelected: (value: (string | number)[]) => void;
  setOpenDrawerParticipant: (value: boolean) => void;
  listData: any[];
}) {
  return (
    <BaseBox style={{ height: 500 }}>
      <StackCustom>
        <TextCustom size="default" color="red" bold>
          *{" "}
          <TextCustom size="small" semiBold>
            Pilih user yang akan menjadi tim proyek anda
          </TextCustom>
        </TextCustom>

        <CheckboxGroup value={selected} onChange={setSelected}>
          {listData?.map((item: any, index: any) => (
            <View key={index}>
              <Grid key={index}>
                <Grid.Col
                  span={2}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <CheckboxCustom valueKey={`user-${index}`} />
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
                    onPress={() => setOpenDrawerParticipant(true)}
                  />
                </Grid.Col>
              </Grid>
            </View>
          ))}
        </CheckboxGroup>
      </StackCustom>
    </BaseBox>
  );
}

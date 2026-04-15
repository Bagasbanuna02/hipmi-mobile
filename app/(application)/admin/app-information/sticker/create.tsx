import {
    BoxButtonOnFooter,
    ButtonCenteredOnly,
    ButtonCustom,
    CheckboxCustom,
    CheckboxGroup,
    LandscapeFrameUploaded,
    OS_Wrapper,
    SelectCustom,
    Spacing,
    StackCustom,
    TextCustom
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { dummyMasterEmotions } from "@/lib/dummy-data/_master/emotions";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function AdminAppInformation_StickerCreate() {
  const [value, setValue] = useState<string | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const buttonSubmit = (
      <BoxButtonOnFooter>
        <ButtonCustom
          onPress={() => router.back()}
        >
          Tambah
        </ButtonCustom>
      </BoxButtonOnFooter>
    );
  return (
    <>
      <OS_Wrapper footerComponent={buttonSubmit}>
        <StackCustom>
          <AdminBackButtonAntTitle title="Tambah Stiker" />

          <StackCustom gap={"xs"}>
            <LandscapeFrameUploaded />
            <ButtonCenteredOnly icon="upload" onPress={() => {}}>
              Upload
            </ButtonCenteredOnly>
            <Spacing />

            <SelectCustom
              required
              label="Jenis Kelamin"
              data={[
                { label: "Laki-laki", value: "laki-laki" },
                { label: "Perempuan", value: "perempuan" },
              ]}
              value={value}
              onChange={(value) => setValue(value as string)}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextCustom>Pilih Emosi Stiker</TextCustom>
              <TextCustom color="red">*</TextCustom>
            </View>
            <Spacing height={10} />

            <CheckboxGroup
              value={selectedEmotions}
              onChange={(value) => setSelectedEmotions(value as string[])}
            >
              <StackCustom>
                {dummyMasterEmotions.map((e) => (
                  <CheckboxCustom
                    size={25}
                    key={e.id}
                    label={<TextCustom>{e.label}</TextCustom>}
                    valueKey={e.id}
                  />
                ))}
              </StackCustom>
            </CheckboxGroup>
          </StackCustom>
        </StackCustom>
        <Spacing/>
      </OS_Wrapper>
    </>
  );
}

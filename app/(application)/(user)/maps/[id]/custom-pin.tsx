import {
  AvatarCustom,
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  MapCustom,
  Spacing,
  StackCustom,
  ViewWrapper,
} from "@/components";
import CenterCustom from "@/components/Center/CenterCustom";
import { router, useLocalSearchParams } from "expo-router";

export default function MapsCustomPin() {
  const { id } = useLocalSearchParams();

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log(`Simpan maps ${id}`);
          router.back();
        }}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={buttonFooter}>
        <StackCustom>
          <InformationBox text="Pin map akan secara otomatis menampilkan logo pada porotofolio ini, jika anda ingin melakukan custom silahkan upload logo pin baru anda." />
          <CenterCustom>
            <AvatarCustom size="xl" />
          </CenterCustom>
          <ButtonCenteredOnly
            onPress={() => console.log("Upload")}
            icon="upload"
          >
            Upload
          </ButtonCenteredOnly>
          <Spacing />

          <BaseBox>
            <MapCustom />
          </BaseBox>
          <Spacing />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

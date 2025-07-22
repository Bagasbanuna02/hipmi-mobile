import {
  AvatarCustom,
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  ViewWrapper,
} from "@/components";
import { router, useLocalSearchParams } from "expo-router";

export default function PortofolioEditLogo() {
  const { id } = useLocalSearchParams();

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log("Simpan logo ");
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
        <BaseBox
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 250,
          }}
        >
          <AvatarCustom size="xl" />
        </BaseBox>
        <ButtonCenteredOnly
          icon="upload"
          onPress={() => router.navigate(`/take-picture/${id}`)}
        >
          Update
        </ButtonCenteredOnly>
      </ViewWrapper>
    </>
  );
}

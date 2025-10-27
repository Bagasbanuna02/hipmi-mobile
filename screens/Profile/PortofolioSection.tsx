import { BaseBox, CenterCustom, Spacing, TextCustom } from "@/components";
import { router } from "expo-router";
import { View } from "react-native";
import Portofolio_BoxView from "../Portofolio/BoxPortofolioView";

export default function Profile_PortofolioSection({
  profileId,
  data,
}: {
  profileId: string;
  data: any[];
}) {
  return (
    <>
      <BaseBox>
        <View>
          <TextCustom bold size="large" align="center">
            Portofolio
          </TextCustom>
          <Spacing />

          {data?.length > 0 ? (
            data?.map((item: any, index) => (
              <Portofolio_BoxView key={index} data={item} />
            ))
          ) : (
            <CenterCustom>
              <TextCustom>Tidak ada portofolio</TextCustom>
            </CenterCustom>
          )}
        </View>

       {data?.length > 0 && (
        <TextCustom
          bold
          align="right"
          onPress={() => router.push(`/portofolio/${profileId}/list`)}
        >
          Lihat semua
        </TextCustom>
       )}
      </BaseBox>
    </>
  );
}

import {
  AvatarUsernameAndOtherComponent,
  BaseBox,
  Grid,
  InformationBox,
  StackCustom,
  TextCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function Donation_ComponentInfoFundrising({
  id,
}: {
  id: string;
}) {
  return (
    <>
      <BaseBox href={`/donation/${id}/infromation-fundrising`} style={{paddingBottom: 0}}>
        <StackCustom gap={"xs"}>
          <Grid>
            <Grid.Col span={10}>
              <TextCustom bold size="large">
                Informasi Penggalang Dana
              </TextCustom>
            </Grid.Col>
            <Grid.Col span={2}>
              <Ionicons
                name="chevron-forward-circle-outline"
                size={ICON_SIZE_SMALL}
                color={MainColor.yellow}
                style={{
                  alignSelf: "flex-end",
                }}
              />
            </Grid.Col>
          </Grid>

          <AvatarUsernameAndOtherComponent />
          <InformationBox
            text="Semua dana yang terkumpul akan disalurkan ke penggalang dana, kabar penyaluran dapat dilihat di halaman kabar terbaru."
          />
        </StackCustom>
      </BaseBox>
    </>
  );
}

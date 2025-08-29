import { BaseBox, Grid, StackCustom, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function Portofolio_SocialMediaSection({ data }: { data: any }) {
  const listData = [
    {
      label: data && data?.facebook ? data.facebook : "-",
      icon: (
        <Ionicons
          name="logo-facebook"
          size={ICON_SIZE_SMALL}
          color={MainColor.white}
        />
      ),
    },
    {
      label: data && data?.tiktok ? data.tiktok : "-",
      icon: (
        <Ionicons
          name="logo-tiktok"
          size={ICON_SIZE_SMALL}
          color={MainColor.white}
        />
      ),
    },
    {
      label: data && data?.instagram ? data.instagram : "-",
      icon: (
        <Ionicons
          name="logo-instagram"
          size={ICON_SIZE_SMALL}
          color={MainColor.white}
        />
      ),
    },
    {
      label: data && data?.twitter ? data.twitter : "-",
      icon: (
        <Ionicons
          name="logo-twitter"
          size={ICON_SIZE_SMALL}
          color={MainColor.white}
        />
      ),
    },
    {
      label: data && data?.youtube ? data.youtube : "-",
      icon: (
        <Ionicons
          name="logo-youtube"
          size={ICON_SIZE_SMALL}
          color={MainColor.white}
        />
      ),
    },
  ];
  return (
    <>
      <BaseBox>
        <StackCustom>
          <TextCustom bold>Media Sosial Bisnis</TextCustom>
          {listData.map((item, index) => (
            <Grid key={index}>
              <Grid.Col span={2} style={{ alignItems: "center" }}>
                {item.icon}
              </Grid.Col>
              <Grid.Col span={10} style={{ paddingLeft: 5 }}>
                <TextCustom>{item.label}</TextCustom>
              </Grid.Col>
            </Grid>
          ))}
        </StackCustom>
      </BaseBox>
    </>
  );
}

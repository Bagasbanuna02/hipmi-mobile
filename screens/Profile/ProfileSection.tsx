import { BaseBox, Grid, Spacing, TextCustom } from "@/components";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { IProfile } from "@/types/Type-Profile";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { View } from "react-native";
import AvatarAndBackground from "./AvatarAndBackground";

export default function ProfileSection({ data }: { data: IProfile }) {
  const listData = [
    {
      icon: (
        <Ionicons name="call-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: `+${data && data.User.nomor ? data.User.nomor : "-"}`,
    },
    {
      icon: (
        <Ionicons name="mail-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: `${data && data.email ? data.email : "-"}`,
    },
    {
      icon: (
        <Ionicons
          name="location-outline"
          size={ICON_SIZE_SMALL}
          color="white"
        />
      ),
      label: `${data && data.alamat ? data.alamat : "-"}`,
    },
    {
      icon: (
        <FontAwesome5 name="transgender" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: `${
        data && data.jenisKelamin ? _.startCase(data.jenisKelamin) : "-"
      }`,
    },
  ];

  return (
    <>
      <BaseBox>
        <AvatarAndBackground
          backgroundId={data?.imageBackgroundId as any}
          imageId={data?.imageId as any}
        />
        <Spacing height={50} />

        <View style={{ alignItems: "center" }}>
          <TextCustom bold size="large" align="center">
            {data && data.name ? data.name : "-"}
          </TextCustom>
          <Spacing height={5} />
          <TextCustom size="small">
            @{data && data.User.username ? data.User.username : "-"}
          </TextCustom>
        </View>
        <Spacing height={30} />

        {listData.map((item, index) => (
          <Grid key={index}>
            <Grid.Col
              span={2}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Grid.Col>
            <Grid.Col span={10}>
              <TextCustom bold>{item.label}</TextCustom>
            </Grid.Col>
          </Grid>
        ))}
      </BaseBox>

     
    </>
  );
}

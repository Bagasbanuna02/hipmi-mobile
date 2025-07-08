/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseBox, Grid, Spacing, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import AvatarAndBackground from "./AvatarAndBackground";

export default function ProfilSection() {
  const { id } = useLocalSearchParams();

  const listData = [
    {
      icon: (
        <Ionicons name="call-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "+6282340374412",
    },
    {
      icon: (
        <Ionicons name="mail-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "bagasbanuna@gmail.com",
    },
    {
      icon: (
        <Ionicons
          name="location-outline"
          size={ICON_SIZE_SMALL}
          color="white"
        />
      ),
      label: "Jalan Raya Sesetan No. 123, Bandung, Indonesia",
    },
    {
      icon: (
        <FontAwesome5 name="transgender" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "Laki-laki",
    },
  ];

  return (
    <>
      <BaseBox>
        <AvatarAndBackground />
        <Spacing height={50} />

        <View style={{ alignItems: "center" }}>
          <TextCustom bold size="large" align="center">
            Nama User
          </TextCustom>
          <Spacing height={5} />
          <TextCustom size="small">@Username</TextCustom>
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

      <BaseBox>
        <View>
          <TextCustom bold size="large" align="center">
            Portofolio
          </TextCustom>
          <Spacing />

          {Array.from({ length: 2 }).map((_, index) => (
            <BaseBox
              key={index}
              style={{ backgroundColor: MainColor.darkblue }}
              onPress={() => {
                console.log("press to Portofolio");
                router.push(`/portofolio/${id}`);
              }}
            >
              <Grid>
                <Grid.Col
                  span={10}
                  style={{ justifyContent: "center", backgroundColor: "" }}
                >
                  <TextCustom bold size="large" truncate={1}>
                    Nama usaha portofolio
                  </TextCustom>
                  <TextCustom size="small" color="yellow">
                    #id-porofolio12345
                  </TextCustom>
                </Grid.Col>
                <Grid.Col
                  span={2}
                  style={{ alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Ionicons
                    name="caret-forward"
                    size={ICON_SIZE_SMALL}
                    color="white"
                  />
                </Grid.Col>
              </Grid>
            </BaseBox>
          ))}
        </View>
      </BaseBox>
    </>
  );
}



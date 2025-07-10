import {
  AvatarCustom,
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
} from "@/components";
import DividerCustom from "@/components/Divider/DividerCustom";
import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Portofolio_Data() {
  const { id } = useLocalSearchParams();

  const listData = [
    {
      icon: (
        <FontAwesome name="building-o" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "PT.Bali Interakrtif Perkasa",
    },
    {
      icon: (
        <Ionicons name="call-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "+6282340374412",
    },
    {
      icon: (
        <Ionicons name="home-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "Jl. Raya Kuta No. 123, Bandung, Indonesia",
    },
    {
      icon: (
        <Ionicons name="list-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "Teknologia",
    },
  ];

  const listSubBidang = [
    {
      icon: (
        <Ionicons
          name="chevron-forward-outline"
          size={ICON_SIZE_SMALL}
          color="white"
        />
      ),
      label: "Security System",
    },
    {
      icon: (
        <Ionicons
          name="chevron-forward-outline"
          size={ICON_SIZE_SMALL}
          color="white"
        />
      ),
      label: "Web Developers",
    },
    {
      icon: (
        <Ionicons
          name="chevron-forward-outline"
          size={ICON_SIZE_SMALL}
          color="white"
        />
      ),
      label: "Mobile Developers",
    },
  ];

  return (
    <>
      <BaseBox>
        <StackCustom>
          <Grid>
            <Grid.Col span={6}>
              <TextCustom bold>Data Bisnis</TextCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
              <TextCustom color="yellow">ID: {id}</TextCustom>
            </Grid.Col>
          </Grid>

          <View style={{ alignItems: "center" }}>
            <AvatarCustom size="xl" />
          </View>
          {/* <Spacing height={10}/> */}

          <View>
            {listData.map((item, index) => (
              <Grid key={index}>
                <Grid.Col span={2} style={{ alignItems: "center" }}>
                  {item.icon}
                </Grid.Col>
                <Grid.Col span={10}>
                  <TextCustom style={{ paddingLeft: 5 }}>
                    {item.label}
                  </TextCustom>
                </Grid.Col>
              </Grid>
            ))}
            <View style={{ paddingLeft: 10 }}>
              {listSubBidang.map((item, index) => (
                <Grid key={index}>
                  <Grid.Col span={2} style={{ alignItems: "center" }}>
                    {item.icon}
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <TextCustom style={{ paddingLeft: 5 }}>
                      {item.label}
                    </TextCustom>
                  </Grid.Col>
                </Grid>
              ))}
            </View>
          </View>

          <DividerCustom labelPosition="top" color={AccentColor.blue} />

          <View>
            <Grid>
              <Grid.Col span={2} style={{ alignItems: "center" }}>
                <Ionicons
                  name="pin-outline"
                  size={ICON_SIZE_SMALL}
                  color="white"
                />
              </Grid.Col>
              <Grid.Col span={10}>
                <TextCustom bold style={{ paddingLeft: 5 }}>
                  Tentang Kami
                </TextCustom>
              </Grid.Col>
            </Grid>

            <TextCustom style={{ paddingInline: 10 }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloremque, alias perspiciatis quis enim eos facilis sit est?
              Doloremque, rerum. Cumque error asperiores harum temporibus
              cupiditate ullam, id quibusdam! Harum, rerum!
            </TextCustom>
          </View>
        </StackCustom>
      </BaseBox>
    </>
  );
}

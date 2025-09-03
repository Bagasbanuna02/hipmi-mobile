/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AvatarComp,
  AvatarCustom,
  BaseBox,
  CenterCustom,
  ClickableCustom,
  Grid,
  StackCustom,
  TextCustom,
} from "@/components";
import DividerCustom from "@/components/Divider/DividerCustom";
import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Portofolio_Data({
  data,
  listSubBidang,
}: {
  data: any;
  listSubBidang: any[];
}) {
  const { id } = useLocalSearchParams();

  const listData = [
    {
      icon: (
        <FontAwesome name="building-o" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: data && data?.namaBisnis ? data.namaBisnis : "-",
    },
    {
      icon: (
        <Ionicons name="call-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: data && data?.tlpn ? data.tlpn : "-",
    },
    {
      icon: (
        <Ionicons name="home-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: data && data?.alamatKantor ? data.alamatKantor : "-",
    },
    {
      icon: (
        <Ionicons name="list-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label:
        data && data?.MasterBidangBisnis?.name
          ? data.MasterBidangBisnis.name
          : "-",
    },
  ];

  // const listSubBidang = [
  //   {
  //     icon: (
  //       <Ionicons
  //         name="chevron-forward-outline"
  //         size={ICON_SIZE_SMALL}
  //         color="white"
  //       />
  //     ),
  //     label: "Security System",
  //   },
  //   {
  //     icon: (
  //       <Ionicons
  //         name="chevron-forward-outline"
  //         size={ICON_SIZE_SMALL}
  //         color="white"
  //       />
  //     ),
  //     label: "Web Developers",
  //   },
  //   {
  //     icon: (
  //       <Ionicons
  //         name="chevron-forward-outline"
  //         size={ICON_SIZE_SMALL}
  //         color="white"
  //       />
  //     ),
  //     label: "Mobile Developers",
  //   },
  // ];

  // console.log("List Sub Bidang >>", JSON.stringify(listSubBidang, null, 2));

  return (
    <>
      <BaseBox>
        <StackCustom>
          <Grid>
            <Grid.Col span={6}>
              <TextCustom bold>Data Bisnis</TextCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
              <TextCustom color="yellow" size={12} bold>
                ID: {(data && data?.id_Portofolio) || "-"}
              </TextCustom>
            </Grid.Col>
          </Grid>

          {/* <ClickableCustom
            style={{ backgroundColor: "blue" }}
            onPress={() => {
              router.navigate(`/(application)/(image)/preview-image/${id}`);
            }}
          >
            <AvatarCustom size="xl" />
          </ClickableCustom> */}

          <ClickableCustom
            style={{}}
            onPress={() => {
              router.navigate(`/(application)/(image)/preview-image/${id}`);
            }}
          >
            <CenterCustom>
              <AvatarComp
                size="xl"
                fileId={data?.logoId as any}
                fileIdDefault={DUMMY_IMAGE.dummy_image}
              />
            </CenterCustom>
          </ClickableCustom>

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
              {listSubBidang?.map((item, index) => (
                <Grid key={index}>
                  <Grid.Col span={2} style={{ alignItems: "center" }}>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={ICON_SIZE_SMALL}
                      color="white"
                    />
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <TextCustom style={{ paddingLeft: 5 }}>
                      {item?.MasterSubBidangBisnis?.name || "-"}
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
              {(data && data?.deskripsi) || "-"}
            </TextCustom>
          </View>
        </StackCustom>
      </BaseBox>
    </>
  );
}

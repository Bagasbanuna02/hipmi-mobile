import {
  DrawerCustom,
  DummyLandscapeImage,
  Spacing,
  StackCustom,
  TextCustom,
  Grid,
  ButtonCustom,
} from "@/components";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { openInDeviceMaps } from "@/utils/openInDeviceMaps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface TypeDrawerMaps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  selected: {
    id: string;
    bidangBisnis: string;
    nomorTelepon: string;
    alamatBisnis: string;
    namePin: string;
    imageId: string;
    portofolioId: string;
    latitude: number;
    longitude: number;
  };
}

export default function DrawerMaps({
  openDrawer,
  setOpenDrawer,
  selected,
}: TypeDrawerMaps) {
  return (
    <DrawerCustom
      isVisible={openDrawer}
      closeDrawer={() => setOpenDrawer(false)}
      height={"auto"}
    >
      <DummyLandscapeImage height={200} imageId={selected.imageId} />
      <Spacing />
      <StackCustom gap={"xs"}>
        <GridTwoView
          spanLeft={2}
          spanRight={10}
          leftItem={
            <FontAwesome
              name="building-o"
              size={ICON_SIZE_SMALL}
              color="white"
            />
          }
          rightItem={<TextCustom>{selected.namePin}</TextCustom>}
        />

        <GridTwoView
          spanLeft={2}
          spanRight={10}
          leftItem={
            <Ionicons
              name="list-outline"
              size={ICON_SIZE_SMALL}
              color="white"
            />
          }
          rightItem={<TextCustom>{selected.bidangBisnis}</TextCustom>}
        />

        <GridTwoView
          spanLeft={2}
          spanRight={10}
          leftItem={
            <Ionicons
              name="call-outline"
              size={ICON_SIZE_SMALL}
              color="white"
            />
          }
          rightItem={<TextCustom>{selected.nomorTelepon}</TextCustom>}
        />
        <GridTwoView
          spanLeft={2}
          spanRight={10}
          leftItem={
            <Ionicons
              name="location-outline"
              size={ICON_SIZE_SMALL}
              color="white"
            />
          }
          rightItem={<TextCustom>{selected.alamatBisnis}</TextCustom>}
        />

        <Grid>
          <Grid.Col span={6} style={{ paddingRight: 10 }}>
            <ButtonCustom
              onPress={() => {
                setOpenDrawer(false);
                router.push(`/portofolio/${selected.portofolioId}`);
              }}
            >
              Detail
            </ButtonCustom>
          </Grid.Col>
          <Grid.Col span={6} style={{ paddingLeft: 10 }}>
            <ButtonCustom
              onPress={() => {
                openInDeviceMaps({
                  latitude: selected.latitude,
                  longitude: selected.longitude,
                  title: selected.namePin,
                });
              }}
            >
              Buka Maps
            </ButtonCustom>
          </Grid.Col>
        </Grid>
      </StackCustom>
    </DrawerCustom>
  );
}

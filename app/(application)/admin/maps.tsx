import {
    ButtonCustom,
    DrawerCustom,
    DummyLandscapeImage,
    Grid,
    Spacing,
    StackCustom,
    TextCustom,
} from "@/components";
import OS_Wrapper from "@/components/_ShareComponent/OS_Wrapper";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { MapMarker, MapsV2Custom } from "@/components/Map/MapsV2Custom";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { apiMapsGetAll } from "@/service/api-client/api-maps";
import { openInDeviceMaps } from "@/utils/openInDeviceMaps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminMaps() {
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState({
    id: "",
    bidangBisnis: "",
    nomorTelepon: "",
    alamatBisnis: "",
    namePin: "",
    imageId: "",
    portofolioId: "",
    latitude: 0,
    longitude: 0,
  });

  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, []),
  );

  const handlerLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiMapsGetAll();

      if (response.success) {
        setList(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  const markers: MapMarker[] = list?.map((item) => ({
    id: item.id,
    coordinate: [item.longitude, item.latitude] as [number, number],
    imageId: item.Portofolio?.logoId,
    onSelected: () => {
      setOpenDrawer(true);
      setSelected({
        id: item?.id,
        bidangBisnis: item?.Portofolio?.MasterBidangBisnis?.name,
        nomorTelepon: item?.Portofolio?.tlpn,
        alamatBisnis: item?.Portofolio?.alamatKantor,
        namePin: item?.namePin,
        imageId: item?.imageId,
        portofolioId: item?.Portofolio?.id,
        latitude: item?.latitude,
        longitude: item?.longitude,
      });
    },
  })) || [];

  return (
    <>
      <OS_Wrapper style={{ paddingInline: 0, paddingBlock: 0 }}>
        <MapsV2Custom markers={markers} />
      </OS_Wrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        {selected.imageId && (
          <DummyLandscapeImage height={200} imageId={selected.imageId} />
        )}
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
            rightItem={<TextCustom>+{selected.nomorTelepon}</TextCustom>}
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
    </>
  );
}

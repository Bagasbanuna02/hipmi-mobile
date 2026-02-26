import { useCallback, useState } from "react";

import { apiMapsGetAll } from "@/service/api-client/api-maps";
import { useFocusEffect } from "expo-router";

import { ViewWrapper } from "@/components";
import { MapMarker, MapsV2Custom } from "@/components/Map/MapsV2Custom";

import DrawerMaps from "./DrawerMaps";
import { StyleSheet } from "react-native";

interface TypeMaps {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  namePin: string;
  latitude: number;
  longitude: number;
  authorId: string;
  portofolioId: string;
  imageId: string;
  pinId: string | null;
  Portofolio: {
    id: string;
    namaBisnis: string;
    logoId: string;
    alamatKantor: string;
    tlpn: string;
    MasterBidangBisnis: {
      id: string;
      name: string;
    };
  };
}

export default function MapsView2() {
  const [list, setList] = useState<TypeMaps[] | null>(null);
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
    imageId: item.Portofolio.logoId,
    onSelected: () => {
      setOpenDrawer(true);
      setSelected({
        id: item.id,
        bidangBisnis: item.Portofolio.MasterBidangBisnis.name,
        nomorTelepon: item.Portofolio.tlpn,
        alamatBisnis: item.Portofolio.alamatKantor,
        namePin: item.namePin,
        imageId: item.imageId,
        portofolioId: item.Portofolio.id,
        latitude: item.latitude,
        longitude: item.longitude,
      });
    },
  })) || [];

  return (
    <>
      <ViewWrapper>
        <MapsV2Custom markers={markers} />
      </ViewWrapper>

      <DrawerMaps
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        selected={selected}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "50%",
    maxHeight: "50%",
  },
});
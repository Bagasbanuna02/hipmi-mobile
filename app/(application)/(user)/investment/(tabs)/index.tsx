import {
  BaseBox,
  FloatingButton,
  Grid,
  LoaderCustom,
  ProgressCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import Investment_BoxBerandaSection from "@/screens/Invesment/BoxBerandaSection";
import { apiInvestmentGetAll } from "@/service/api-client/api-investment";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function InvestmentBursa() {
  const [list, setList] = useState<any[] | null>(null);
  const [loadingList, setLoadingList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [])
  );

  const onLoadList = async () => {
    try {
      setLoadingList(true);
      const response = await apiInvestmentGetAll();
      // console.log("[DATA LIST]", JSON.stringify(response.data, null, 2));
      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingList(false);
    }
  };

  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/investment/create")} />
      }
    >
      {loadingList ? (
        <LoaderCustom />
      ) : _.isEmpty(list) ? (
        <NoDataText />
      ) : (
        list?.map((item: any, index: number) => (
          <Investment_BoxBerandaSection id={item.id} data={item} key={index} />
        ))
      )}
    </ViewWrapper>
  );
}

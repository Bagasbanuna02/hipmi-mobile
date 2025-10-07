import {
  FloatingButton,
  LoaderCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import Donation_BoxPublish from "@/screens/Donation/BoxPublish";
import { apiDonationGetAll } from "@/service/api-client/api-donation";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function DonationBeranda() {
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  const onLoadData = async () => {
    try {
      setLoadList(true);
      const response = await apiDonationGetAll({
        category: "beranda"
      });
      console.log("[RES GET ALL]", JSON.stringify(response.data, null, 2));

      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/donation/create")} />
      }
    >
      {loadList ? (
        <LoaderCustom />
      ) : _.isEmpty(list) ? (
        <TextCustom align="center" color="gray">Belum ada donasi</TextCustom>
      ) : (
        list?.map((item: any, index: number) => (
          <Donation_BoxPublish data={item} key={index} id={item.id} />
        ))
      )}
    </ViewWrapper>
  );
}

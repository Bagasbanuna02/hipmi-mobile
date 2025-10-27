/* eslint-disable react-hooks/exhaustive-deps */
import {
  DummyLandscapeImage,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { apiDonationGetOne } from "@/service/api-client/api-donation";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function DonationDetailStory() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetOne({
        id: id as string,
        category: "permanent",
      });

      setData(response.data.CeritaDonasi);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };
  return (
    <ViewWrapper>
      <StackCustom>
        <TextCustom>{data?.pembukaan || "-"}</TextCustom>
        <DummyLandscapeImage imageId={data?.imageId} />
        <TextCustom>{data?.cerita || "-"}</TextCustom>
      </StackCustom>
    </ViewWrapper>
  );
}

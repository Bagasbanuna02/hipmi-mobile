import { TextCustom, ViewWrapper } from "@/components";
import Portofolio_BoxView from "@/screens/Portofolio/BoxPortofolioView";
import { apiGetPortofolio } from "@/service/api-client/api-portofolio";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function ListPortofolio() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      onLoadPortofolio(id as string);
    }, [id])
  );

  const onLoadPortofolio = async (id: string) => {
    const response = await apiGetPortofolio({ id: id });
    setData(response.data);
  };
  return (
    <ViewWrapper>
      {data ? data?.map((item: any, index: number) => (
        <Portofolio_BoxView key={index} data={item} />
      )) : <TextCustom>Tidak ada portofolio</TextCustom>}
    </ViewWrapper>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { LoaderCustom, TextCustom, ViewWrapper } from "@/components";
import Investment_BoxDetailDocument from "@/screens/Invesment/Document/RecapBoxDetail";
import { apiInvestmentGetDocument } from "@/service/api-client/api-investment";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function InvestmentListOfDocument() {
  const { id } = useLocalSearchParams();
  console.log("ID >> ", id);

  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadListDocument();
    }, [id])
  );

  const onLoadListDocument = async () => {
    try {
      setLoadList(true);
      const response = await apiInvestmentGetDocument({
        id: id as string,
        category: "all-document",
      });

      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setList([]);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <ViewWrapper>
      {loadList ? (
        <LoaderCustom />
      ) : _.isEmpty(list) ? (
        <TextCustom align="center" color="gray">
          Tidak ada data
        </TextCustom>
      ) : (
        list?.map((item: any, index: number) => (
          <Investment_BoxDetailDocument
            key={index}
            title={item.title}
            href={`/(file)/${item.fileId}`}
          />
        ))
      )}
    </ViewWrapper>
  );
}

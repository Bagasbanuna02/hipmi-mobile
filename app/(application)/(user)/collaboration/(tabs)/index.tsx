import {
  FloatingButton,
  LoaderCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import Collaboration_BoxPublishSection from "@/screens/Collaboration/BoxPublishSection";
import { apiCollaborationGetAll } from "@/service/api-client/api-collaboration";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function CollaborationBeranda() {
  const [listData, setListData] = useState<any[]>();
  const [loadingGetData, setLoadingGetData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiCollaborationGetAll();

      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };
  return (
    <>
      <ViewWrapper
        hideFooter
        floatingButton={
          <FloatingButton
            onPress={() => {
              router.push("/collaboration/create");
            }}
          />
        }
      >
        {loadingGetData ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom align="center">Tidak ada data</TextCustom>
        ) : (
          listData?.map((item: any, index: number) => (
            <Collaboration_BoxPublishSection
              key={index}
              href={`/collaboration/${item.id}`}
              data={item}
            />
          ))
        )}
      </ViewWrapper>
    </>
  );
}

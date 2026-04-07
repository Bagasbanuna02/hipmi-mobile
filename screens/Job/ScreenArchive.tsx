/* eslint-disable react-hooks/exhaustive-deps */
import { BaseBox, LoaderCustom, OS_Wrapper, TextCustom } from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiJobGetAll } from "@/service/api-client/api-job";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function Job_ScreenArchive() {
  const { user } = useAuth();
  const [listData, setListData] = useState<any[]>([]);
  const [isLoadData, setIsLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [user?.id])
  );

  const onLoadData = async () => {
    try {
      setIsLoadData(true);
      const response = await apiJobGetAll({
        category: "archive",
        authorId: user?.id,
      });
      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  return (
    <OS_Wrapper hideFooter>
      {isLoadData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Anda tidak memiliki arsip</TextCustom>
      ) : (
        listData.map((item, index) => (
          <BaseBox
            key={index}
            paddingTop={20}
            paddingBottom={20}
            href={`/job/${item.id}/archive`}
          >
            <TextCustom align="center" bold truncate size="large">
              {item?.title || "-"}
            </TextCustom>
          </BaseBox>
        ))
      )}
    </OS_Wrapper>
  );
}

import {
  BaseBox,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { apiForumGetReportComment } from "@/service/api-client/api-forum";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function ForumPreviewReportComment() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [listData, setListData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // Status

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  const onLoadData = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiForumGetReportComment({ id });
      setData(response.data);
      setListData(response?.data?.Forum_ReportKomentar);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OS_Wrapper>
        <StackCustom>
          <TextCustom color="red" bold>
            Komentar anda telah melanggar aturan forum ! Admin mengambil
            tindakan untuk menghapus komentar anda!
          </TextCustom>
          {loading ? (
            <CustomSkeleton height={100} />
          ) : (
            <BaseBox>
              <TextCustom>"{data?.komentar ? data?.komentar : "-"}"</TextCustom>
            </BaseBox>
          )}
        </StackCustom>

        <Spacing height={10} />
        <TextCustom bold>Beberapa laporan yang telah diterima</TextCustom>
        <Spacing height={10} />

        {loading ? (
          <ListSkeletonComponent />
        ) : _.isEmpty(listData) ? (
          <NoDataText />
        ) : (
          listData?.map((e: any, index: number) => (
             <BaseBox key={index}>
                {e?.deskripsi ? (
                  <StackCustom gap={"sm"}>
                    <TextCustom bold>Laporan Lainnya</TextCustom>
                    <TextCustom>{e?.deskripsi}</TextCustom>
                  </StackCustom>
                ) : (
                  <StackCustom gap={"sm"}>
                    <TextCustom bold>
                      {e?.ForumMaster_KategoriReport?.title}
                    </TextCustom>
                    <TextCustom>
                      {e?.ForumMaster_KategoriReport?.deskripsi}
                    </TextCustom>
                  </StackCustom>
                )}
              </BaseBox>
          ))
        )}
      </OS_Wrapper>
    </>
  );
}

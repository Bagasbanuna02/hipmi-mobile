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
import { apiForumGetReportPosting } from "@/service/api-client/api-forum";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function ForumPreviewReportPosting() {
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
      const response = await apiForumGetReportPosting({ id });
      setData(response.data);
      setListData(response?.data?.Forum_ReportPosting);
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
            Postingan anda telah melanggar aturan forum ! Admin mengambil
            tindakan untuk menghapus komentar anda!
          </TextCustom>
          {loading ? (
            <CustomSkeleton height={100} />
          ) : (
            <BaseBox>
              <TextCustom>"{data?.diskusi ? data?.diskusi : "-"}"</TextCustom>
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
          listData?.map((e: any) => (
            <BaseBox key={e?.id}>
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

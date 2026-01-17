import { NewWrapper, TextCustom } from "@/components";
import { useAuth } from "@/hooks/use-auth";
import {
  apiForumGetOne,
  apiForumGetReportPosting,
} from "@/service/api-client/api-forum";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function ForumPreviewReportPosting() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [data, setData] = useState<any | null>(null);
  // Status

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  const onLoadData = async (id: string) => {
    try {
      const response = await apiForumGetReportPosting({ id });
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
   <>

    <NewWrapper>
      <TextCustom>Halaman preview repost posting</TextCustom>
      <TextCustom>{JSON.stringify(data, null, 2)}</TextCustom>

      <TextCustom>untuk report jomentar beda halaman</TextCustom>

    </NewWrapper>
   </>
  );
}

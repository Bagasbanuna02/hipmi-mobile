import {
  ButtonCustom,
  LoaderCustom,
  Spacing,
  StackCustom,
  ViewWrapper,
} from "@/components";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Forum_ReportListSection from "@/screens/Forum/ReportListSection";
import { apiForumCreateReportCommentar, apiMasterForumReportList } from "@/service/api-client/api-master";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

export default function ForumReportCommentar() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [selectReport, setSelectReport] = useState<string>("");
  const [listMaster, setListMaster] = useState<any[] | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(false);

  useEffect(() => {
    onLoadListMaster();
  }, []);

  const onLoadListMaster = async () => {
    try {
      setIsLoadingList(true);
      const response = await apiMasterForumReportList();

      setListMaster(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  const handlerReport = async () => {
    const newData = {
      authorId: user?.id,
      categoryId: selectReport,
    };

    try {
      const response = await apiForumCreateReportCommentar({
        id: id as string,
        data: newData,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Laporan berhasil dikirim",
        });
        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Laporan gagal dikirim",
      });
    }
  };

  return (
    <>
      <ViewWrapper>
        {isLoadingList ? (
          <LoaderCustom />
        ) : (
          <StackCustom>
            <Forum_ReportListSection
              listMaster={listMaster}
              selectReport={selectReport}
              setSelectReport={setSelectReport}
            />
            <ButtonCustom
              disabled={!selectReport}
              backgroundColor={MainColor.red}
              textColor={MainColor.white}
              onPress={() => {
                handlerReport();
              }}
            >
              Report
            </ButtonCustom>
            <ButtonCustom
              backgroundColor={AccentColor.blue}
              textColor={MainColor.white}
              onPress={() => {
                router.replace(`/forum/${id}/other-report-commentar`);
              }}
            >
              Lainnya
            </ButtonCustom>
            <Spacing />
          </StackCustom>
        )}
      </ViewWrapper>
    </>
  );
}

import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { apiForumCreateReportCommentar } from "@/service/api-client/api-forum";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function ForumOtherReportCommentar() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [value, setValue] = useState<string>("");

  const handlerSubmitReport = async () => {
    const newData = {
      authorId: user?.id,
      description: value,
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

  const handleSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={!value}
        backgroundColor={MainColor.red}
        textColor={MainColor.white}
        onPress={() => {
          handlerSubmitReport();
        }}
      >
        Report
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper footerComponent={handleSubmit}>
        <TextAreaCustom
          placeholder="Laporkan Komentar"
          value={value}
          onChangeText={setValue}
        />
      </ViewWrapper>
    </>
  );
}

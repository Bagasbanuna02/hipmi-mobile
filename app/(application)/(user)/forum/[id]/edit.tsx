import {
  BoxButtonOnFooter,
  ButtonCustom,
  LoaderCustom,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import AlertWarning from "@/components/Alert/AlertWarning";
import { apiForumGetOne, apiForumUpdate } from "@/service/api-client/api-forum";
import { isBadContent } from "@/utils/badWordsIndonesia";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export default function ForumEdit() {
  const { id } = useLocalSearchParams();
  const [text, setText] = useState("");
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  const onLoadData = async (id: string) => {
    try {
      setLoadingGetData(true);
      const response = await apiForumGetOne({ id });

      setText(response.data.diskusi);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

  const handlerUpdateData = async () => {
    if (!text) {
      Toast.show({
        type: "error",
        text1: "Harap masukkan diskusi",
      });
      return;
    }

    if (isBadContent(text)) {
      AlertWarning({});
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiForumUpdate({
        id: id as string,
        data: text,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Berhasil diupdate",
        });
        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonFooter = () => {
    return (
      <>
        {!loadingGetData && (
          <BoxButtonOnFooter>
            <ButtonCustom isLoading={isLoading} onPress={handlerUpdateData}>
              Update
            </ButtonCustom>
          </BoxButtonOnFooter>
        )}
      </>
    );
  };

  return (
    <ViewWrapper footerComponent={buttonFooter()}>
      {!loadingGetData ? (
        <TextAreaCustom
          placeholder="Ketik diskusi anda..."
          maxLength={1000}
          showCount
          value={text}
          onChangeText={(value) => {
            setText(value);
          }}
        />
      ) : (
        <LoaderCustom />
      )}
    </ViewWrapper>
  );
}

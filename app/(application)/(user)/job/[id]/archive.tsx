/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonCustom,
  LoaderCustom,
  PageWrapper,
  Spacing,
  StackCustom,
} from "@/components";
import Job_BoxDetailSection from "@/screens/Job/BoxDetailSection";
import { apiJobGetOne, apiJobUpdateData } from "@/service/api-client/api-job";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function JobDetailArchive() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setIsLoadData(true);
      const response = await apiJobGetOne({ id: id as string });
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  const handleArchive = async () => {
    try {
      setIsLoading(true);
      const response = await apiJobUpdateData({
        id: id as string,
        data: false,
        category: "archive",
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        router.back();
      } else {
        Toast.show({
          type: "info",
          text1: "Info",
          text2: response.message,
        });
        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoadData ? (
        <LoaderCustom />
      ) : (
        <PageWrapper>
          <>
            <StackCustom>
              <Job_BoxDetailSection data={data} />
              <ButtonCustom
                isLoading={isLoading}
                onPress={() => {
                  handleArchive();
                }}
              >
                Publish kembali
              </ButtonCustom>
            </StackCustom>
            <Spacing />
          </>
        </PageWrapper>
      )}
    </>
  );
}

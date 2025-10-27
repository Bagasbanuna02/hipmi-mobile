/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonCustom, LoaderCustom, Spacing, TextCustom } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Collaboration_BoxPublishSection from "@/screens/Collaboration/BoxPublishSection";
import { apiCollaborationGetAll } from "@/service/api-client/api-collaboration";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function CollaborationParticipans() {
  const [activeCategory, setActiveCategory] = useState<
    "participant" | "my-project"
  >("participant");
  const { user } = useAuth();
  const [listData, setListData] = useState<any[]>();
  const [loadingGetData, setLoadingGetData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [activeCategory])
  );

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiCollaborationGetAll({
        category:
          activeCategory === "participant" ? "participant" : "my-project",
        authorId: user?.id,
      });

      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

  const handlePress = (item: any) => {
    setActiveCategory(item);
    // tambahkan logika lain seperti filter dsb.
  };

  const headerComponent = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        backgroundColor: MainColor.soft_darkblue,
        borderRadius: 50,
        width: "100%",
      }}
    >
      <ButtonCustom
        backgroundColor={
          activeCategory === "participant" ? MainColor.yellow : AccentColor.blue
        }
        textColor={
          activeCategory === "participant" ? MainColor.black : MainColor.white
        }
        style={{ width: "49%" }}
        onPress={() => handlePress("participant")}
      >
        Partisipasi Proyek
      </ButtonCustom>
      <Spacing width={"2%"} />
      <ButtonCustom
        backgroundColor={
          activeCategory === "my-project" ? MainColor.yellow : AccentColor.blue
        }
        textColor={
          activeCategory === "my-project" ? MainColor.black : MainColor.white
        }
        style={{ width: "49%" }}
        onPress={() => handlePress("my-project")}
      >
        Proyek Saya
      </ButtonCustom>
    </View>
  );

  return (
    <ViewWrapper hideFooter headerComponent={headerComponent}>
      {loadingGetData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data</TextCustom>
      ) : activeCategory === "participant" ? (
        listData?.map((item: any, index: number) => (
          <Collaboration_BoxPublishSection
            key={index.toString()}
            data={item?.ProjectCollaboration}
            href={`/collaboration/${item?.ProjectCollaboration?.id}/detail-participant`}
          />
        ))
      ) : (
        listData?.map((item: any, index: number) => (
          <Collaboration_BoxPublishSection
            key={index.toString()}
            data={item}
            href={`/collaboration/${item?.id}/detail-project-main`}
          />
        ))
      )}
    </ViewWrapper>
  );
}

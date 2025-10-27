/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonCustom, LoaderCustom, Spacing, TextCustom } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Event_BoxPublishSection from "@/screens/Event/BoxPublishSection";
import { apiEventGetAll } from "@/service/api-client/api-event";
import { dateTimeView } from "@/utils/dateTimeView";
import _ from "lodash";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function EventHistory() {
  const [activeCategory, setActiveCategory] = useState<string | null>("all");
  const { user } = useAuth();
  const [listData, setListData] = useState<any>([]);
  const [isLoadList, setIsLoadList] = useState(false);

  useEffect(() => {
    onLoadData({ userId: user?.id });
  }, [user?.id, activeCategory]);

  async function onLoadData({ userId }: { userId?: string }) {
    try {
      setIsLoadList(true);
      const response = await apiEventGetAll({
        category: activeCategory === "all" ? "all-history" : "my-history",
        userId: userId,
      });
      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadList(false);
    }
  }

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
          activeCategory === "all" ? MainColor.yellow : AccentColor.blue
        }
        textColor={activeCategory === "all" ? MainColor.black : MainColor.white}
        style={{ width: "49%" }}
        onPress={() => handlePress("all")}
      >
        Semua Riwayat
      </ButtonCustom>
      <Spacing width={"2%"} />
      <ButtonCustom
        backgroundColor={
          activeCategory === "main" ? MainColor.yellow : AccentColor.blue
        }
        textColor={
          activeCategory === "main" ? MainColor.black : MainColor.white
        }
        style={{ width: "49%" }}
        onPress={() => handlePress("main")}
      >
        Riwayat Saya
      </ButtonCustom>
    </View>
  );

  return (
    <ViewWrapper headerComponent={headerComponent} hideFooter>
      {isLoadList ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Belum ada riwayat</TextCustom>
      ) : (
        listData.map((item: any, index: number) => (
          <Event_BoxPublishSection
            key={index.toString()}
            data={item}
            rightComponentAvatar={
              <TextCustom>
                {dateTimeView({ date: item?.tanggal, withoutTime: true })}
              </TextCustom>
            }
            href={`/event/${item.id}/history`}
          />
        ))
      )}
    </ViewWrapper>
  );
}

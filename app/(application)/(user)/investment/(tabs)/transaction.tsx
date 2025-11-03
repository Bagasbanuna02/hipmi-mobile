/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  Grid,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { useAuth } from "@/hooks/use-auth";
import { apiInvestmentGetInvoice } from "@/service/api-client/api-investment";
import { GStyles } from "@/styles/global-styles";
import { formatChatTime } from "@/utils/formatChatTime";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function InvestmentTransaction() {
  const { user } = useAuth();
  const [list, setList] = useState<any>([]);
  const [loadList, setLoadList] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [user?.id])
  );

  const onLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiInvestmentGetInvoice({
        authorId: user?.id as string,
        category: "transaction",
      });
      console.log("[RESPONSE LIST]", JSON.stringify(response.data, null, 2));
      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  const handlerColor = (status: string) => {
    if (status === "menunggu") {
      return "orange";
    } else if (status === "proses") {
      return "white";
    } else if (status === "berhasil") {
      return "green";
    } else if (status === "gagal") {
      return "red";
    }
  };

  const handlePress = ({ id, status }: { id: string; status: string }) => {
    if (status === "menunggu") {
      router.push(`/investment/${id}/(transaction-flow)/invoice`);
    } else if (status === "proses") {
      router.push(`/investment/${id}/(transaction-flow)/process`);
    } else if (status === "berhasil") {
      router.push(`/investment/${id}/(transaction-flow)/success`);
    } else if (status === "gagal") {
      router.push(`/investment/${id}/(transaction-flow)/failed`);
    }
  };

  return (
    <ViewWrapper hideFooter>
      {loadList ? (
        <LoaderCustom />
      ) : _.isEmpty(list) ? (
        <NoDataText/>
      ) : (
        list.map((item: any, i: number) => (
          <BaseBox
            key={i}
            paddingTop={7}
            paddingBottom={7}
            onPress={() => {
              handlePress({
                id: item.id,
                status: _.lowerCase(item.statusInvoice),
              });
            }}
          >
            <Grid>
              <Grid.Col span={6}>
                <StackCustom gap={"xs"}>
                  <TextCustom truncate>{item?.title || "-"}</TextCustom>
                  <TextCustom color="gray" size="small">
                    {formatChatTime(item?.createdAt)}
                  </TextCustom>
                </StackCustom>
              </Grid.Col>
              <Grid.Col span={1}>
                <View />
              </Grid.Col>
              <Grid.Col span={5} style={{ alignItems: "flex-end" }}>
                <StackCustom gap={"xs"}>
                  <TextCustom bold truncate>
                    Rp. {formatCurrencyDisplay(item?.nominal) || "-"}
                  </TextCustom>
                  <BadgeCustom
                    variant="light"
                    color={handlerColor(_.lowerCase(item.statusInvoice))}
                    style={GStyles.alignSelfFlexEnd}
                  >
                    {item?.statusInvoice || "-"}
                  </BadgeCustom>
                </StackCustom>
              </Grid.Col>
            </Grid>
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}

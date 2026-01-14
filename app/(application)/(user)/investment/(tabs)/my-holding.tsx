/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  LoaderCustom,
  ProgressCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { useAuth } from "@/hooks/use-auth";
import { apiInvestmentGetAll } from "@/service/api-client/api-investment";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

export default function InvestmentMyHolding() {
  const { user } = useAuth();
  const [list, setList] = useState<any[] | null>(null);
  const [loadingList, setLoadingList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [user?.id])
  );

  const onLoadList = async () => {
    try {
      setLoadingList(true);
      const response = await apiInvestmentGetAll({
        category: "my-holding",
        authorId: user?.id,
      });
      console.log("[DATA LIST]", JSON.stringify(response.data, null, 2));
      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingList(false);
    }
  };

  return (
    <ViewWrapper hideFooter>
      {loadingList ? (
        <LoaderCustom />
      ) : _.isEmpty(list) ? (
        <NoDataText />
      ) : (
        list?.map((item, index) => (
          <BaseBox
            key={index}
            paddingTop={7}
            paddingBottom={7}
            onPress={() =>
              router.push(`/investment/${item?.id}/(my-holding)/${item?.id}`)
            }
          >
            <StackCustom>
              <TextCustom truncate={2}>{item?.title}</TextCustom>
              <TextCustom>
                Rp. {formatCurrencyDisplay(item?.nominal)}
              </TextCustom>
              <TextCustom>{item?.lembarTerbeli} Lembar</TextCustom>
              <ProgressCustom
                label={`${item.progress}%`}
                value={Number(item.progress)}
                size="lg"
                animated
                color="primary"
              />
            </StackCustom>
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}

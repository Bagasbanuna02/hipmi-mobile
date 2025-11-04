/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  LoaderCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { apiInvestmentGetInvestorById } from "@/service/api-client/api-investment";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function InvestmentInvestor() {
  const { id } = useLocalSearchParams();
  const [list, setList] = useState<any[] | null>(null);
  const [loadingList, setLoadingList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [id])
  );

  const onLoadList = async () => {
    try {
      setLoadingList(true);
      const response = await apiInvestmentGetInvestorById({
        id: id as string,
      })
      console.log("[DATA LIST]", JSON.stringify(response.data, null, 2));
      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingList(false);
    }
  }


  return (
    <>
      <ViewWrapper>
        {loadingList ? (
          <LoaderCustom />
        ) : _.isEmpty(list) ? (
          <NoDataText />
        ) : (
          list?.map((item: any, index: number) => (
            <BoxWithHeaderSection key={index}>
              <AvatarUsernameAndOtherComponent
                avatar={item?.Author?.Profile?.imageId}
                name={item?.Author?.username}
                avatarHref={`/profile/${item?.Author?.Profile?.id}`}
              />
              <TextCustom bold>
                Rp. {formatCurrencyDisplay(item?.nominal)}
              </TextCustom>
            </BoxWithHeaderSection>
          ))
        )}
      </ViewWrapper>
    </>
  );
}

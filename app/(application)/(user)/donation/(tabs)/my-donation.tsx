/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  DummyLandscapeImage,
  Grid,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiDonationGetAll } from "@/service/api-client/api-donation";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { Href, router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function DonationMyDonation() {
  const { user } = useAuth();
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [user?.id]),
  );

  const onLoadData = async () => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "Load data gagal, user tidak ditemukan",
      });
      return;
    }

    try {
      setLoadList(true);
      const response = await apiDonationGetAll({
        category: "my-donation",
        authorId: user?.id,
      });
      

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

  const handlePress = ({
    invoiceId,
    donationId,
    status,
  }: {
    invoiceId: string;
    donationId: string;
    status: string;
  }) => {
    const url: Href = `../${donationId}/(transaction-flow)/${invoiceId}`;
    if (status === "menunggu") {
      router.push(`${url}/invoice`);
    } else if (status === "proses") {
      router.push(`${url}/process`);
    } else if (status === "berhasil") {
      router.push(`${url}/success`);
    } else if (status === "gagal") {
      router.push(`${url}/failed`);
    }
  };

  return (
    <ViewWrapper hideFooter>
      {loadList ? (
        <LoaderCustom />
      ) : _.isEmpty(list) ? (
        <TextCustom align="center" color="gray">
          Belum ada transaksi
        </TextCustom>
      ) : (
        list?.map((item, index) => (
          <BaseBox
            key={index}
            paddingTop={7}
            paddingBottom={7}
            onPress={() => {
              handlePress({
                status: _.lowerCase(item.statusInvoice),
                invoiceId: item.id,
                donationId: item.donasiId,
              });
            }}
          >
            <Grid>
              <Grid.Col span={5}>
                <DummyLandscapeImage
                  height={100}
                  unClickPath
                  imageId={item.imageId}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <View />
              </Grid.Col>
              <Grid.Col span={6}>
                <StackCustom>
                  <TextCustom truncate={2} bold>
                    {item.title || "-"}
                  </TextCustom>

                  <TextCustom bold color="yellow">
                    Rp. {formatCurrencyDisplay(item.nominal)}
                  </TextCustom>

                  <BadgeCustom
                    variant="light"
                    color={handlerColor(_.lowerCase(item.statusInvoice))}
                    fullWidth
                  >
                    {item.statusInvoice}
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

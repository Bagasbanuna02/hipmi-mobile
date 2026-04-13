import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  OS_Wrapper,
} from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { LOCAL_STORAGE_KEY } from "@/constants/local-storage-key";
import { useAuth } from "@/hooks/use-auth";
import { apiDonationCreateInvoice } from "@/service/api-client/api-donation";
import { apiMasterBank } from "@/service/api-client/api-master";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function DonationSelectBank() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [select, setSelect] = useState<any | number>("");
  const [listBank, setListBank] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadListBank();
  }, []);

  const loadListBank = async () => {
    try {
      const response = await apiMasterBank();

      setListBank(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setListBank([]);
    }
  };

  const handlerSubmit = async () => {
    try {
      setIsLoading(true);
      const dataStorage = await AsyncStorage.getItem(
        LOCAL_STORAGE_KEY.transactionDonation
      );

      if (dataStorage) {
        const storage = JSON.parse(dataStorage);
        const newData = {
          ...storage,
          bankId: select,
          authorId: user?.id,
        };

        const response = await apiDonationCreateInvoice({
          id: id as string,
          data: newData,
        });

        if (response.success) {
          const invoiceId = response.data.id;

          await AsyncStorage.removeItem(LOCAL_STORAGE_KEY.transactionDonation);

          router.replace(
            `/(application)/(user)/donation/[id]/(transaction-flow)/${invoiceId}/invoice`
          );
        } else {
          console.log("[FAILED]", response);
        }
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom
            isLoading={isLoading}
            disabled={!select}
            onPress={() => handlerSubmit()}
          >
            Pilih
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };
  return (
    <OS_Wrapper footerComponent={buttonSubmit()}>
      <RadioGroup value={select} onChange={setSelect}>
        {_.isEmpty(listBank)
          ? []
          : listBank?.map((item: any, index: number) => (
              <BaseBox key={index}>
                <RadioCustom label={item.namaBank} value={item.id} />
              </BaseBox>
            ))}
      </RadioGroup>
    </OS_Wrapper>
  );
}

import { TextCustom, ViewWrapper } from "@/components";
import { useLocalSearchParams } from "expo-router";

export default function InvestmentInvest() {
  const { id } = useLocalSearchParams();
  return (
    <>
      <ViewWrapper>
        <TextCustom>Pembelian Saham {id}</TextCustom>
      </ViewWrapper>
    </>
  );
}

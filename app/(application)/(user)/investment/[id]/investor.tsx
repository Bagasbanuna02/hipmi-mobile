import Investment_ScreenInvestor from "@/screens/Invesment/ScreenInvestor";
import { useLocalSearchParams } from "expo-router";

export default function InvestmentInvestor() {
  const { id } = useLocalSearchParams();
  
  return (
    <Investment_ScreenInvestor investmentId={id as string} />
  );
}

import Investment_ScreenListOfNews from "@/screens/Invesment/News/ScreenListOfNews";
import { useLocalSearchParams } from "expo-router";

export default function InvestmentListOfNews() {
  const { id } = useLocalSearchParams();
  
  return (
    <Investment_ScreenListOfNews investmentId={id as string} />
  );
}

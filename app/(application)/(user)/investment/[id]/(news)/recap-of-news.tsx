import Investment_ScreenRecapOfNews from "@/screens/Invesment/News/ScreenRecapOfNews";
import { useLocalSearchParams } from "expo-router";

export default function InvestmentRecapOfNews() {
  const { id } = useLocalSearchParams();
  
  return (
    <Investment_ScreenRecapOfNews investmentId={id as string} />
  );
}

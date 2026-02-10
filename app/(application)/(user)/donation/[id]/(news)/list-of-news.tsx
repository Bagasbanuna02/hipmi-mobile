import { useLocalSearchParams } from "expo-router";
import Donation_ScreenListOfNews from "@/screens/Donation/ScreenListOfNews";

export default function DonationRecapOfNews() {
  const { id } = useLocalSearchParams();
  
  return <Donation_ScreenListOfNews donationId={id as string} />;
}

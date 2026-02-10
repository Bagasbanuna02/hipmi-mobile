import { useLocalSearchParams } from "expo-router";
import Donation_ScreenRecapOfNews from "@/screens/Donation/ScreenRecapOfNews";

export default function DonationRecapOfNews() {
  const { id } = useLocalSearchParams();
  
  return <Donation_ScreenRecapOfNews donationId={id as string} />;
}

import { useLocalSearchParams } from "expo-router";
import Donation_ScreenListOfDonatur from "@/screens/Donation/ScreenListOfDonatur";

export default function DonationListOfDonatur() {
  const { id } = useLocalSearchParams();
  
  return <Donation_ScreenListOfDonatur donationId={id as string} />;
}

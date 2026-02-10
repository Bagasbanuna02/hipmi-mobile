import { useLocalSearchParams } from "expo-router";
import Donation_ScreenFundDisbursement from "@/screens/Donation/ScreenFundDisbursement";

export default function DonationFundDisbursement() {
  const { id } = useLocalSearchParams();
  
  return <Donation_ScreenFundDisbursement donationId={id as string} />;
}

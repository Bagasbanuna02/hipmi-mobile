import Donation_ScreenStatus from "@/screens/Donation/ScreenStatus";
import { useLocalSearchParams } from "expo-router";

export default function DonationStatus() {
  const { status } = useLocalSearchParams<{ status?: string }>();
  
  return (
    <Donation_ScreenStatus initialStatus={status || "publish"} />
  );
}

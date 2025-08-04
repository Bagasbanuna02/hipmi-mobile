import {
  FloatingButton,
  ViewWrapper
} from "@/components";
import Donation_BoxPublish from "@/screens/Donation/BoxPublish";
import { router } from "expo-router";

export default function DonationBeranda() {
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/donation/create")} />
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Donation_BoxPublish key={index} id={index.toString()}/>
      ))}
    </ViewWrapper>
  );
}

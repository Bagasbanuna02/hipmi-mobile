import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import FloatingButton from "@/components/Button/FloatingButton";
import Event_BoxPublishSection from "@/screens/Event/BoxPublishSection";
import { router } from "expo-router";

export default function EventBeranda() {
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/event/create")} />
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Event_BoxPublishSection key={index} id={index.toString()} />
      ))}
    </ViewWrapper>
  );
}

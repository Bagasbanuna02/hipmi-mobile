import {
    FloatingButton,
    ViewWrapper
} from "@/components";
import Collaboration_BoxPublishSection from "@/screens/Collaboration/BoxPublishSection";
import { router } from "expo-router";

export default function CollaborationBeranda() {
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton
          onPress={() => {
            router.push("/collaboration/create")
          }}
        />
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Collaboration_BoxPublishSection
          key={index}
          id={index.toString()}
          href={`/collaboration`}
        />
      ))}
    </ViewWrapper>
  );
}

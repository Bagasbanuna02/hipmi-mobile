import {
  FloatingButton,
  SearchInput,
  ViewWrapper
} from "@/components";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { router } from "expo-router";

export default function VotingBeranda() {
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/voting/create")} />
      }
      headerComponent={<SearchInput placeholder="Cari voting" />}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Voting_BoxPublishSection key={index} href={`/voting/${index}`} />
      ))}
    </ViewWrapper>
  );
}

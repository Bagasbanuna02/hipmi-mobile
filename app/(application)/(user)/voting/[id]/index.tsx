import {
    AvatarUsernameAndOtherComponent,
    InformationBox,
    StackCustom,
    ViewWrapper
} from "@/components";
import Voting_BoxDetailHasilVotingSection from "@/screens/Voting/BoxDetailHasilVotingSection";
import { Voting_BoxDetailPublishSection } from "@/screens/Voting/BoxDetailPublishSection";
import React from "react";

export default function VotingDetail() {
  return (
    <ViewWrapper>
      <StackCustom>
        <InformationBox text="Untuk sementara voting ini belum di buka. Voting akan dimulai sesuai dengan tanggal awal pemilihan, dan akan ditutup sesuai dengan tanggal akhir pemilihan." />

        <Voting_BoxDetailPublishSection
          headerAvatar={<AvatarUsernameAndOtherComponent />}
        />

        <Voting_BoxDetailHasilVotingSection />
      </StackCustom>
    </ViewWrapper>
  );
}

import {
    AvatarUsernameAndOtherComponent,
    BackButton,
    DotButton,
    DrawerCustom,
    MenuDrawerDynamicGrid,
    Spacing,
    ViewWrapper,
} from "@/components";
import { IconContribution } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { Voting_BoxDetailContributionSection } from "@/screens/Voting/BoxDetailContribution";
import Voting_BoxDetailHasilVotingSection from "@/screens/Voting/BoxDetailHasilVotingSection";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function VotingDetailContribution() {
  const { id } = useLocalSearchParams();
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);

  const handlePressPublish = (item: IMenuDrawerItem) => {
    router.navigate(item.path as any);
    setOpenDrawerPublish(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Detail Kontribusi",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton onPress={() => setOpenDrawerPublish(true)} />
          ),
        }}
      />

      <ViewWrapper>
        <Voting_BoxDetailContributionSection
          headerAvatar={<AvatarUsernameAndOtherComponent />}
        />
        <Voting_BoxDetailHasilVotingSection />
        <Spacing />
      </ViewWrapper>

      {/* ========= Publish Drawer ========= */}
      <DrawerCustom
        isVisible={openDrawerPublish}
        closeDrawer={() => setOpenDrawerPublish(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconContribution />,
              label: "Daftar Kontributor",
              path: `/voting/${id}/list-of-contributor`,
            },
          ]}
          onPressItem={handlePressPublish as any}
        />
      </DrawerCustom>
    </>
  );
}

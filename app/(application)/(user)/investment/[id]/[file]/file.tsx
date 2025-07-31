import { BackButton, TextCustom, ViewWrapper } from "@/components";
import { Stack, useLocalSearchParams } from "expo-router";
import _ from "lodash";

export default function InvestmentProspectus() {
  const { file } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          title: `Pratinjau ${_.startCase(file as string)}`,
          headerLeft: () => <BackButton />,
        }}
      />
      <ViewWrapper>
        <TextCustom>Pratinjau File</TextCustom>
      </ViewWrapper>
    </>
  );
}

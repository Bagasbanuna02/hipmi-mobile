import { BackButton, TextCustom, ViewWrapper } from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";

export default function UserEventConfirmation() {
  const { token } = useAuth();
  const { id, userId } = useLocalSearchParams();

  console.log("[TOKEN]", token);

  if (!token) {
    return <Redirect href={`/`} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Konfirmasi Event",
          headerLeft: () => <BackButton path={"/home"} />,
        }}
      />
      <ViewWrapper>
        <TextCustom>
          TEST CONFIRMATION {id} {userId}
        </TextCustom>
      </ViewWrapper>
    </>
  );
}

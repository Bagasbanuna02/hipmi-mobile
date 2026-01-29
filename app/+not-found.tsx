import { BackButton, StackCustom, TextCustom, ViewWrapper } from "@/components";
import { Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: "", headerLeft: () => <BackButton /> }}
      />
      <ViewWrapper>
        <StackCustom
          align="center"
          gap={0}
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <TextCustom size="large" bold style={{ fontSize: 100 }}>
            404
          </TextCustom>
          <TextCustom size="large" bold>
            Sorry, Page Not Found
          </TextCustom>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

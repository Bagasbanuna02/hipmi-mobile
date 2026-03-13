import { BackButton, StackCustom, TextCustom, ViewWrapper } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { router, Stack } from "expo-router";

export default function NotFoundScreen() {
  // Setelah (dengan penanganan):
      const handleBack = () => {
       if (router.canGoBack()) {
         router.back();
       } else {
         // Alternatif action ketika tidak bisa kembali
         router.replace('/'); // atau navigasi ke halaman default
       }
     };

  return (
    <>
      <Stack.Screen
        options={{ header: () => <AppHeader title="" left={<BackButton onPress={() => handleBack()} />} /> }}
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

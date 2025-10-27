import { BackButton } from "@/components";
import PdfViewer from "@/components/_ShareComponent/PdfViewer";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FileScreen() {
  const { id } = useLocalSearchParams();
  const url = API_STRORAGE.GET({ fileId: id as string });
  
  return (
    <>
      <Stack.Screen
        options={{
          title: "File",
          headerLeft: () => <BackButton />,
        }}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <PdfViewer uri={url} />
      </SafeAreaView>
    </>
  );
}

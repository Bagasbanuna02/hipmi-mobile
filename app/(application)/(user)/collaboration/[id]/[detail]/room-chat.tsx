import { BackButton } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import ChatScreen from "@/screens/Collaboration/GroupChatSection";
import { Feather } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";

export default function CollaborationRoomChat() {
  const { id, detail } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: `Proyek ${detail}`,
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <Feather
              name="info"
              size={ICON_SIZE_SMALL}
              color={MainColor.yellow}
              onPress={() => router.push(`/collaboration/${id}/${detail}/info`)}
            />
          ),
        }}
      />

      <ChatScreen id={id as string} />
    </>
  );
}

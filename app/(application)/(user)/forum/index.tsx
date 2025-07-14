import {
  AvatarCustom,
  BackButton,
  TextInputCustom,
  ViewWrapper
} from "@/components";
import FloatingButton from "@/components/Button/FloatingButton";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Forum_BerandaSection from "@/screens/Forum/berandaSection";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function Forum() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Forum",
          headerLeft: () => <BackButton />,
          headerRight: () => <AvatarCustom />,
        }}
      />

      <ViewWrapper
        headerComponent={
          <TextInputCustom
            iconLeft={
              <Ionicons
                name="search-outline"
                size={ICON_SIZE_SMALL}
                color={MainColor.placeholder}
              />
            }
            placeholder="Cari topik forum..."
            borderRadius={50}
            containerStyle={{ marginBottom: 0 }}
          />
        }
        floatingButton={
          <FloatingButton onPress={() => router.navigate("/(application)/(user)/forum/create")} />
        }
      >
        <Forum_BerandaSection />
      </ViewWrapper>
    </>
  );
}

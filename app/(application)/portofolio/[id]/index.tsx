import LeftButtonCustom from "@/components/Button/BackButton";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { GStyles } from "@/styles/global-styles";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Portofolio() {
    const { id } = useLocalSearchParams();
  return (
    <ViewWrapper>
      {/* Header */}
      <Stack.Screen
        options={{
          title: "Portofolio",
          headerLeft: () => <LeftButtonCustom />,
        //   headerRight: () => (
        //     <TouchableOpacity onPress={openDrawer}>
        //       <Ionicons
        //         name="ellipsis-vertical"
        //         size={20}
        //         color={MainColor.yellow}
        //       />
        //     </TouchableOpacity>
        //   ),
          headerStyle: GStyles.headerStyle,
          headerTitleStyle: GStyles.headerTitleStyle,
        }}
      />
      <Text style={GStyles.textLabel}>Portofolio {id}</Text>
    </ViewWrapper>
  );
}

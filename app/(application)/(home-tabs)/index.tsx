import HomeView from "@/screens/Home/HomeView";
import { Styles } from "@/styles/global-styles";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Tabs() {
  // const router = useRouter();
  // const navigation = useNavigation();
  // useEffect(() => {
  //   navigation.setOptions({

  //   });
  // }, [navigation]);

  return (
    <>
      <View>
        <Stack.Screen
          options={{
            title: "HIPMI",
            headerStyle: Styles.headerStyle,
            headerTitleStyle: Styles.headerTitleStyle,
          }}
        />
        <HomeView />
      </View>
    </>
  );
}

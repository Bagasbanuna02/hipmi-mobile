import HomeView from "@/components/Home/HomeView";
import { MainColor } from "@/constants/color-palet";
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
            title: "My home",
            headerStyle: { backgroundColor: MainColor.darkblue },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            
            // headerTitle: (props) => <LogoTitle {...props} />,
          }}
          />
          <HomeView />
        {/* <Text>Home Screen</Text>
        <Link href={{ pathname: "/(application)/(tabs)/forum" }}>
          Go to Details
        </Link> */}
      </View>
    </>
  );
}

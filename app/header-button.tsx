import { globalStyles } from "@/constants/global-styles";
import { Stack } from "expo-router";
import { useState } from "react";
import { Button, Image, Text } from "react-native";

function LogoTitle(props: { children?: React.ReactNode }) {
  return (
    <Image
      style={globalStyles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => setCount((c) => c + 1)}
              title="Update count"
            />
          ),
        }}
      />
      <Text>Count: {count}</Text>
    </>
  );
}



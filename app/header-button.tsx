import { Stack } from "expo-router";
import { Button, Text, Image } from "react-native";
import { useState } from "react";
import { styles } from "@/constants/styles";

function LogoTitle(props: { children?: React.ReactNode }) {
  return (
    <Image
      style={styles.image}
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



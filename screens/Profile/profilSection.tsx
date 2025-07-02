import { Spacing, TextCustom } from "@/components";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableHighlight, View } from "react-native";

export default function ProfilSection() {
  const { id } = useLocalSearchParams();

  const listData = [
    {
      icon: (
        <Ionicons name="call-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "+6282340374412",
    },
    {
      icon: (
        <Ionicons name="mail-outline" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "bagasbanuna@gmail.com",
    },
    {
      icon: (
        <Ionicons
          name="location-outline"
          size={ICON_SIZE_SMALL}
          color="white"
        />
      ),
      label: "Jalan Raya Sesetan No. 123, Bandung, Indonesia",
    },
    {
      icon: (
        <FontAwesome5 name="transgender" size={ICON_SIZE_SMALL} color="white" />
      ),
      label: "Laki-laki",
    },
  ];

  return (
    <>
      <View
        style={{
          backgroundColor: MainColor.soft_darkblue,
          borderColor: AccentColor.blue,
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            // backgroundColor: MainColor.red,
          }}
        >
          {listData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                // flexWrap: "wrap",
                // backgroundColor: "gray",
              }}
            >
              {item.icon}
              <Spacing />

              <TextCustom bold style={{ backgroundColor: "" }}>
                {`${item.label} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis dolorem ipsam velit culpa consequuntur porro esse asperiores, debitis, qui numquam excepturi tempora fuga dolor totam quam, provident ipsum repellat hic.`}
              </TextCustom>
              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {item.icon}
                    <Spacing />
                </View> */}
            </View>
          ))}
        </View>
      </View>

      <TouchableHighlight
        onPress={() => router.push(`/(application)/portofolio/${id}`)}
      >
        <View
          style={{
            backgroundColor: MainColor.white,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text>Portofolio</Text>
        </View>
      </TouchableHighlight>
    </>
  );
}

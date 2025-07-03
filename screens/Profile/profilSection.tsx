/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseBox, Grid, Spacing, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

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
      <BaseBox>
        <ProfileScreen />
        <Spacing height={50} />

        <View style={{ alignItems: "center" }}>
          <TextCustom bold size="large" align="center">
            Nama User
          </TextCustom>
          <Spacing height={5} />
          <TextCustom size="small">@Username</TextCustom>
        </View>
        <Spacing height={30} />

        {listData.map((item, index) => (
          <Grid key={index}>
            <Grid.Col
              span={2}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Grid.Col>
            <Grid.Col span={10}>
              <TextCustom bold>{item.label}</TextCustom>
            </Grid.Col>
          </Grid>
        ))}
      </BaseBox>

      <BaseBox>
        <View>
          <TextCustom bold size="large" align="center">
            Portofolio
          </TextCustom>
          <Spacing />

          {Array.from({ length: 2 }).map((_, index) => (
            <BaseBox
              key={index}
              style={{ backgroundColor: MainColor.darkblue }}
              onPress={() => console.log("pressed")}
            >
              <Grid>
                <Grid.Col
                  span={10}
                  style={{ justifyContent: "center", backgroundColor: "" }}
                >
                  <TextCustom bold size="large" truncate={1}>
                    Nama usaha portofolio
                  </TextCustom>
                  <TextCustom size="small" color="yellow">
                    #id-porofolio12345
                  </TextCustom>
                </Grid.Col>
                <Grid.Col
                  span={2}
                  style={{ alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Ionicons
                    name="caret-forward"
                    size={ICON_SIZE_SMALL}
                    color="white"
                  />
                </Grid.Col>
              </Grid>
            </BaseBox>
          ))}
        </View>
      </BaseBox>

      {/* <TouchableHighlight
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
      </TouchableHighlight> */}
    </>
  );
}

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("@/assets/images/dummy/dummy-image-background.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Avatar yang sedikit keluar */}
      <View style={styles.avatarOverlap}>
        <Image
          source={require("@/assets/images/dummy/dummy-avatar.png")}
          style={styles.overlappingAvatar}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: 150, // Tinggi background sesuai kebutuhan
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
  },
  userOverlay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#fff",
    position: "absolute", // Untuk posisi overlay
    top: 75, // Posisi overlay di tengah background
    left: "50%", // Sentralisasi horizontal
    transform: [{ translateX: -50 }], // Menggeser ke kiri 50% lebarnya
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarOverlap: {
    position: "absolute", // Meletakkan avatar di atas background
    top: 90, // Posisi avatar sedikit keluar dari background
    left: "50%", // Sentralisasi horizontal
    transform: [{ translateX: -50 }], // Menggeser ke kiri 50% lebarnya
  },
  overlappingAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: MainColor.white,
  },
});

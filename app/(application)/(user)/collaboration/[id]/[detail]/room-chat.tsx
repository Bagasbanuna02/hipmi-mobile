import {
  BackButton,
  BoxButtonOnFooter,
  Grid,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Feather } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CollaborationRoomChat() {
  const { id, detail } = useLocalSearchParams();

  const inputChat = () => {
    return (
      <>
        <BoxButtonOnFooter>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInputCustom placeholder="Ketik pesan..." />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => console.log("Send")}
              style={{
                backgroundColor: AccentColor.blue,
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Feather name="send" size={30} color={MainColor.white} />
            </TouchableOpacity>
          </View> */}
          <Grid>
            <Grid.Col span={9}>
              <TextInputCustom placeholder="Ketik pesan..." />
            </Grid.Col>
            <Grid.Col span={1}>
              <View />
            </Grid.Col>
            <Grid.Col span={2} style={{ alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => console.log("Send")}
                style={{
                  backgroundColor: AccentColor.blue,
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Feather
                  name="send"
                  size={30}
                  color={MainColor.white}
                />
              </TouchableOpacity>
            </Grid.Col>
          </Grid>
        </BoxButtonOnFooter>
      </>
    );
  };

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
      <ViewWrapper footerComponent={inputChat()}>
        {dummyData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageRow,
              item.role === 1 ? styles.rightAlign : styles.leftAlign,
            ]}
          >
            <View
              style={[
                styles.bubble,
                item.role === 1 ? styles.bubbleRight : styles.bubbleLeft,
              ]}
            >
              <TextCustom style={styles.sender}>{item.nama}</TextCustom>
              <TextCustom style={styles.message}>{item.chat}</TextCustom>
              <TextCustom style={styles.time}>
                {new Date(item.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TextCustom>
            </View>
          </View>
        ))}
        {/* <TextInputCustom placeholder="Ketik pesan..." />
        <Spacing/> */}
      </ViewWrapper>
    </>
  );
}

const dummyData = [
  {
    nama: "Dina",
    role: 1,
    chat: "Hai! Kamu udah lihat dokumen proyek yang baru?",
    time: "2025-07-24T09:01:15Z",
  },
  {
    nama: "Rafi",
    role: 2,
    chat: "Halo! Iya, aku baru aja baca. Kayaknya kita harus revisi bagian akhir deh.",
    time: "2025-07-24T09:02:03Z",
  },
  {
    nama: "Dina",
    role: 1,
    chat: "Setuju. Aku juga kurang sreg sama penutupnya.",
    time: "2025-07-24T09:02:45Z",
  },
  {
    nama: "Rafi",
    role: 2,
    chat: "Oke, aku coba edit malam ini ya. Nanti aku share ulang versinya.",
    time: "2025-07-24T09:03:10Z",
  },
  {
    nama: "Dina",
    role: 1,
    chat: "Siap, makasih ya. Jangan begadang!",
    time: "2025-07-24T09:03:30Z",
  },
];

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  rightAlign: {
    justifyContent: "flex-end",
  },
  leftAlign: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 12,
  },
  bubbleRight: {
    backgroundColor: "#DCF8C6", // hijau muda
    borderTopRightRadius: 0,
  },
  bubbleLeft: {
    backgroundColor: "#F0F0F0", // abu-abu terang
    borderTopLeftRadius: 0,
  },
  sender: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#555",
  },
  message: {
    fontSize: 15,
    color: "#000",
  },
  time: {
    fontSize: 10,
    color: "#888",
    textAlign: "right",
    marginTop: 4,
  },
});

import {
  AvatarCustom,
  ClickableCustom,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function UserSearch() {
  function generateRandomPhoneNumber(index: number) {
    let prefix;

    // Menentukan prefix berdasarkan index genap atau ganjil
    if (index % 2 === 0) {
      const evenPrefixes = ["6288", "6289", "6281"];
      prefix = evenPrefixes[Math.floor(Math.random() * evenPrefixes.length)];
    } else {
      const oddPrefixes = ["6285", "6283"];
      prefix = oddPrefixes[Math.floor(Math.random() * oddPrefixes.length)];
    }

    // Menghitung panjang sisa nomor acak (antara 10 - 12 digit)
    const remainingLength = Math.floor(Math.random() * 3) + 10; // 10, 11, atau 12

    // Membuat sisa nomor acak
    let randomNumber = "";
    for (let i = 0; i < remainingLength; i++) {
      randomNumber += Math.floor(Math.random() * 10); // Digit acak antara 0-9
    }

    // Menggabungkan prefix dan sisa nomor
    return prefix + randomNumber;
  }
  return (
    <>
      <ViewWrapper
        headerComponent={
          <TextInputCustom
            iconLeft={
              <Ionicons
                name="search"
                size={ICON_SIZE_SMALL}
                color={MainColor.placeholder}
              />
            }
            placeholder="Cari Pengguna"
            borderRadius={50}
            containerStyle={{ marginBottom: 0 }}
          />
        }
      >
        <StackCustom>
          {Array.from({ length: 20 }).map((e, index) => {
            return (
              <Grid key={index}>
                <Grid.Col span={2}>
                  <AvatarCustom href={`/profile/${index}`}/>  
                </Grid.Col>
                <Grid.Col span={9}>
                  <TextCustom size="large">Nama user {index}</TextCustom>
                  <TextCustom size="small">
                    +{generateRandomPhoneNumber(index)}
                  </TextCustom>
                </Grid.Col>
                <Grid.Col
                  span={1}
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <ClickableCustom
                    onPress={() => {
                      console.log("Ke Profile");
                      router.push(`/profile/${index}`);
                    }}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={ICON_SIZE_SMALL}
                      color={MainColor.white}
                    />
                  </ClickableCustom>
                </Grid.Col>
              </Grid>
            );
          })}
        </StackCustom>
        <Spacing height={50} />
      </ViewWrapper>
    </>
  );
}

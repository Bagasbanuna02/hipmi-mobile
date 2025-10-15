import { ActionIcon, Grid, StackCustom, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Divider, Switch } from "react-native-paper";

export default function AdminAppInformation_StickerSection() {
  const [value, setValue] = useState(false);

  return (
    <>
      <TextCustom bold align="center">
        Cooming Soon, Next Update !!
      </TextCustom>
    </>
  );
  // return (
  //   <>
  //     <Grid>
  //       <Grid.Col span={3} style={{ alignItems: "center" }}>
  //         <TextCustom bold>Aksi</TextCustom>
  //       </Grid.Col>
  //       <Grid.Col span={3} style={{ alignItems: "center" }}>
  //         <TextCustom bold>Status</TextCustom>
  //       </Grid.Col>
  //       <Grid.Col span={6}>
  //         <TextCustom bold align="center" >Stiker</TextCustom>
  //       </Grid.Col>
  //     </Grid>

  //     <Divider />

  //     <StackCustom>
  //       {listSticker.map((e, i) => (
  //         <View key={i}>
  //           <Grid>
  //             <Grid.Col
  //               span={3}
  //               style={{ alignItems: "center", justifyContent: "center" }}
  //             >
  //               <ActionIcon
  //                 icon={
  //                   <FontAwesome5
  //                     name="edit"
  //                     size={ICON_SIZE_BUTTON}
  //                     color="black"
  //                   />
  //                 }
  //                 onPress={() => {
  //                   router.push(`/admin/app-information/sticker/${i}`);
  //                 }}
  //               />
  //             </Grid.Col>
  //             <Grid.Col
  //               span={3}
  //               style={{ alignItems: "center", justifyContent: "center" }}
  //             >
  //               <Switch
  //                 value={value}
  //                 onValueChange={() => {
  //                   setValue(!value);
  //                 }}
  //                 theme={{
  //                   colors: {
  //                     primary: MainColor.yellow,
  //                   },
  //                 }}
  //               />
  //             </Grid.Col>
  //             <Grid.Col span={6} style={{ justifyContent: "center", alignItems: "center" }}>
  //               <Image source={e.path} style={{ width: 100, height: 100 }} />
  //             </Grid.Col>
  //           </Grid>
  //           <Divider />
  //         </View>
  //       ))}
  //     </StackCustom>
  //   </>
  // );
}

const listSticker = [
  {
    id: "1",
    label: "Stiker 1",
    value: "sticker 1",
    path: "https://wibu-storage.wibudev.com/api/files/cmb0dkn5700bjbpnnwcfpzxpz",
  },
  {
    id: "2",
    label: "Stiker 2",
    value: "sticker 2",
    path: "https://wibu-storage.wibudev.com/api/files/cmb0djnya00bhbpnn8b2sfpg3",
  },
  {
    id: "3",
    label: "Stiker 3",
    value: "sticker 3",
    path: "https://wibu-storage.wibudev.com/api/files/cmb0dj0o400bfbpnn6hrfa71y",
  },
  {
    id: "4",
    label: "Stiker 4",
    value: "sticker 4",
    path: "https://wibu-storage.wibudev.com/api/files/cmb0d5rdb00abbpnnrbhxrxjz",
  },
  {
    id: "5",
    label: "Stiker 5",
    value: "sticker 5",
    path: "https://wibu-storage.wibudev.com/api/files/cmb0d4j5q00a9bpnn0qpxa0k4",
  },
];

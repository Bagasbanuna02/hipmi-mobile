/* eslint-disable react-hooks/exhaustive-deps */
// MoneyTransferAnimation.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { AccentColor, MainColor } from "@/constants/color-palet";
import TextCustom from "../Text/TextCustom";

const SCREEN_WIDTH = 300; // Lebar area animasi
const DURATION = 2500; // Durasi sekali jalan (kiri → kanan)

const MoneyTransferAnimation: React.FC = () => {
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Fungsi untuk mereset dan mulai ulang animasi
  const startAnimation = () => {
    progress.value = 0;
    opacity.value = 0;

    // Fade in di awal
    opacity.value = withTiming(1, { duration: 300 });

    // Gerak kiri → kanan
    progress.value = withTiming(
      1,
      {
        duration: DURATION,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) {
          // Fade out di akhir
          opacity.value = withTiming(0, { duration: 300 }, () => {
            // Setelah fade out, ulangi
            runOnJS(startAnimation)();
          });
        }
      }
    );
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: progress.value * SCREEN_WIDTH,
        },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* Area animasi (track tidak wajib, tapi bisa ditambahkan) */}
      <View style={styles.track} />

      {/* Ikon uang animasi */}
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <FontAwesome name="money" size={28} color="#2ecc71" />
      </Animated.View>

      {/* Teks status */}
      <View style={styles.textContainer}>
        <TextCustom bold>Transaksi Sedang Diproses</TextCustom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    position: "relative",
    width: SCREEN_WIDTH,
  },
  track: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: AccentColor.darkblue,
    borderRadius: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 4,
    left: -30, // Mulai di luar kiri
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: MainColor.white,
    textAlign: "center",
  },
});

export default MoneyTransferAnimation;

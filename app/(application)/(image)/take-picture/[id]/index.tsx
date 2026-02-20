import {
    ButtonCustom,
    Spacing,
    StackCustom,
    ViewWrapper
} from "@/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TakePicture() {
  const { id } = useLocalSearchParams();
//   console.log("Take Picture ID >>", id);

  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Pressable onPress={requestPermission}>
          <Text style={{ color: "blue", marginTop: 10 }}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri || null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View>
        <Image
          source={uri ? uri : null}
          contentFit="contain"
          style={{ width: 340, aspectRatio: 1 }}
        />
        <Spacing />

        <StackCustom >
          <ButtonCustom onPress={() => setUri(null)} title="Foto ulang" />
          <ButtonCustom
            onPress={() => {
              console.log("Upload picture >>", id);
              router.back();
            }}
            title="Upload Foto"
          />
        </StackCustom>
      </View>
    );
  };

  const renderCameraUI = () => {
    return (
      <View style={styles.cameraOverlay}>
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>

          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View style={styles.shutterBtnInner} />
              </View>
            )}
          </Pressable>

          <Pressable onPress={pickImage}>
            <AntDesign name="folder-open" size={32} color="white" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      {uri ? (
        <ViewWrapper>
          <View style={styles.container}>{renderPicture()}</View>
        </ViewWrapper>
      ) : (
        <>
          <CameraView
            style={styles.camera}
            ref={ref}
            facing={facing}
            responsiveOrientationWhenOrientationLocked
          />
          {renderCameraUI()}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 44,
  },
  shutterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
  },
});

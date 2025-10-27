import {
  AlertDefaultSystem,
  ButtonCustom,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiCollaborationCreatePartisipasi } from "@/service/api-client/api-collaboration";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function CollaborationCreatePartisipans() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handlerSubmitParticipans = async () => {
    try {
      setLoading(true);
      const response = await apiCollaborationCreatePartisipasi({
        id: id as string,
        data: {
          authorId: user?.id,
          description,
        },
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Data berhasil disimpan",
        });
        router.replace(`/collaboration/${id}/list-of-participants`);
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal menyimpan data",
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ViewWrapper>
      <TextAreaCustom
        //   label="Deskripsi"
        placeholder="Masukan deskripsi diri anda .."
        value={description}
        onChangeText={setDescription}
        required
        showCount
        maxLength={1000}
      />

      <ButtonCustom
        disabled={description.length === 0}
        isLoading={isLoading}
        onPress={() => {
          AlertDefaultSystem({
            title: "Simpan data deskripsi",
            message: "Apakah anda sudah yakin ingin menyimpan data ini ?",
            textLeft: "Batal",
            textRight: "Simpan",
            onPressRight: () => {
              handlerSubmitParticipans();
            },
          });
        }}
      >
        Simpan
      </ButtonCustom>
    </ViewWrapper>
  );
}

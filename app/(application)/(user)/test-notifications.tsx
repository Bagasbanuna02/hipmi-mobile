import {
  ButtonCustom,
  NewWrapper,
  StackCustom,
  TextInputCustom,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiNotificationsSend } from "@/service/api-notifications";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function TestNotification() {
  const { user } = useAuth();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log("[Data Dikirim]", data);
      setLoading(true);
      const response = await apiNotificationsSend({
        data: {
          title: "Test Notification !!",
          body: data,
          userLoginId: user?.id || "",
          appId: "hipmi",
          status: "publish",
          kategoriApp: "JOB",
          type: "announcement",
          deepLink: "/job/cmhjz8u3h0005cfaxezyeilrr",
        },
      });

      if (response.success) {
        console.log("[RES SEND NOTIF]", JSON.stringify(response, null, 2));
        Toast.show({
          type: "success",
          text1: "Notifikasi berhasil dikirim",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal mengirim notifikasi",
        });
      }
    } catch (error) {
      console.log("[ERROR SEND NOTIF]", error);
      Toast.show({
        type: "error",
        text1: "Gagal mengirim notifikasi",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NewWrapper>
        <StackCustom>
          <TextInputCustom
            required
            label="Pesan"
            placeholder="Masukkan pesan"
            value={data}
            onChangeText={(text) => setData(text)}
          />
          <ButtonCustom onPress={handleSubmit} disabled={loading}>
            Kirim
          </ButtonCustom>
        </StackCustom>
      </NewWrapper>
    </>
  );
}

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

  const handleSubmit = async () => {
    console.log("[Data Dikirim]", data);
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
  };

  return (
    <>
      <NewWrapper>
        <StackCustom>
          <TextInputCustom
            required
            label="Nama"
            placeholder="Masukkan nama"
            value={data}
            onChangeText={(text) => setData(text)}
          />
          <ButtonCustom
            onPress={() => {
              handleSubmit();
            }}
          >
            Kirim
          </ButtonCustom>
        </StackCustom>
      </NewWrapper>
    </>
  );
}

import {
  ButtonCustom,
  NewWrapper,
  StackCustom,
  TextInputCustom,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiGetAllTokenDevice } from "@/service/api-device-token";
import {
  apiNotificationsSend,
} from "@/service/api-notifications";
import { useEffect, useState } from "react";

export default function TestNotification() {
  const { user } = useAuth();
  const [data, setData] = useState("");

  useEffect(() => {
    // fecthData();
  }, []);

  const fecthData = async () => {
    const response = await apiGetAllTokenDevice();
    console.log(
      "[RES GET ALL TOKEN DEVICE]",
      JSON.stringify(response.data, null, 2)
    );
  };

  const handleSubmit = async () => {
    console.log("[Data Dikirim]", data);
    const response = await apiNotificationsSend({
      data: {
        fcmToken:
          "cVmHm-3P4E-1vjt6AA9kSF:APA91bHTkHjGTLxrFsb6Le6bZmzboZhwMGYXU4p0FP9yEeXixLDXNKS4F5vLuZV3sRgSnjjQsPpLOgstVLHJB8VJTObctKLdN-CxAp4dnP7Jbc_mH53jWvs",
        title: "Test dari Backend (App Router)!",
        body: data,
        userLoginId: user?.id || "",
      },
    });

    console.log("[RES SEND NOTIF]", JSON.stringify(response.data, null, 2));
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

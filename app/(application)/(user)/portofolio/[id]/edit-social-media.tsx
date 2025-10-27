import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import {
  apiGetOnePortofolio,
  apiUpdatePortofolio,
} from "@/service/api-client/api-portofolio";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function PortofolioEditSocialMedia() {
  const { id } = useLocalSearchParams();
  console.log("ID >>", id);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({
    facebook: "",
    twitter: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  });

  useEffect(() => {
    onLoadData(id as string);
  }, [id]);

  const onLoadData = async (id: string) => {
    const response = await apiGetOnePortofolio({ id: id });
    console.log(
      "Response portofolio >>",
      JSON.stringify(response.data.Portofolio_MediaSosial, null, 2)
    );
    const data = response.data.Portofolio_MediaSosial;
    setData({
      facebook: data.facebook,
      twitter: data.twitter,
      instagram: data.instagram,
      tiktok: data.tiktok,
      youtube: data.youtube,
    });
  };

  const onSubmitUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await apiUpdatePortofolio({
        id: id as string,
        data: data,
        category: "medsos",
      });

      if (!response.success) {
        Toast.show({
          type: "info",
          text1: "Info",
          text2: response.message,
        });

        return;
      }

      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Data media terupdate",
      });

      router.back();
    } catch (error) {
      console.log("Error onSubmitUpdate", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        disabled={isLoading}
        onPress={onSubmitUpdate}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper footerComponent={buttonFooter}>
        <TextInputCustom
          value={data.tiktok}
          onChangeText={(value) => setData({ ...data, tiktok: value })}
          label="Tiktok"
          placeholder="Masukkan tiktok"
        />
        <TextInputCustom
          value={data.instagram}
          onChangeText={(value) => setData({ ...data, instagram: value })}
          label="Instagram"
          placeholder="Masukkan instagram"
        />
        <TextInputCustom
          value={data.facebook}
          onChangeText={(value) => setData({ ...data, facebook: value })}
          label="Facebook"
          placeholder="Masukkan facebook"
        />
        <TextInputCustom
          value={data.twitter}
          onChangeText={(value) => setData({ ...data, twitter: value })}
          label="Twitter"
          placeholder="Masukkan twitter"
        />
        <TextInputCustom
          value={data.youtube}
          onChangeText={(value) => setData({ ...data, youtube: value })}
          label="Youtube"
          placeholder="Masukkan youtube"
        />
      </ViewWrapper>
    </>
  );
}

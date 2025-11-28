import {
  AlertDefaultSystem,
  AvatarUsernameAndOtherComponent,
  BaseBox,
  BoxButtonOnFooter,
  BoxWithHeaderSection,
  ButtonCustom,
  NewWrapper,
  StackCustom,
  TextCustom,
} from "@/components";
import AvatarAndBackground from "@/screens/Profile/AvatarAndBackground";
import {
  apiGetBlockedById,
  apiUnblock,
} from "@/service/api-client/api-blocked";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function ProfileDetailBlocked() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const response = await apiGetBlockedById({ id: String(id) });
    // console.log("[RESPONSE >>]", JSON.stringify(response, null, 2));
    setData(response.data);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await apiUnblock({ id: String(id) });
      router.back();
    } catch (error) {
      console.log("[ERROR >>]", JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NewWrapper
        footerComponent={
          <BoxButtonOnFooter>
            <ButtonCustom
              isLoading={isLoading}
              onPress={() => {
                AlertDefaultSystem({
                  title: "Buka Blokir",
                  message: "Apakah anda yakin ingin membuka blokir ini?",
                  textLeft: "Tidak",
                  textRight: "Ya",
                  onPressRight: () => {
                    handleSubmit();
                  },
                });
              }}
            >
              Buka Blokir
            </ButtonCustom>
          </BoxButtonOnFooter>
        }
      >
        <BoxWithHeaderSection>
          <StackCustom>
            <AvatarUsernameAndOtherComponent
              avatarHref={`/profile/${data?.blocked?.Profile?.id}`}
              avatar={data?.blocked?.Profile?.imageId}
              name={data?.blocked?.username}
            />

            <TextCustom align="center">
              Jika anda membuka blokir ini maka semua postingan terkait user ini
              akan muncul kembali di beranda
              <TextCustom bold color="red">
                {" "}
                {_.upperCase(data?.menuFeature?.name)}
              </TextCustom>
            </TextCustom>
          </StackCustom>
        </BoxWithHeaderSection>
      </NewWrapper>
    </>
  );
}

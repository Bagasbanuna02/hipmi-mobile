import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiForumCreate } from "@/service/api-client/api-forum";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function ForumCreate() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlerSubmit = async () => {
    const newData = {
      diskusi: text,
      authorId: user?.id,
    };

    try {
      setIsLoading(true);
      const response = await apiForumCreate({ data: newData });
      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Posting berhasil",
        });
        setText("");
        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        onPress={() => {
          handlerSubmit();
        }}
      >
        Posting
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <ViewWrapper footerComponent={buttonFooter}>
      <TextAreaCustom
        placeholder="Ketik diskusi anda..."
        maxLength={1000}
        showCount
        value={text}
        onChangeText={setText}
      />
    </ViewWrapper>
  );
}

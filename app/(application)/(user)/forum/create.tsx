import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import { router } from "expo-router";
import { useState } from "react";

export default function ForumCreate() {
  const [text, setText] = useState("");

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log("Posting", text);
          router.back();
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

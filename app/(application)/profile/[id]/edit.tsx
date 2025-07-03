/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextInputCustom, ViewWrapper } from "@/components";
import { StackCustom } from "@/components/Stack";
import { useLocalSearchParams } from "expo-router";

export default function ProfileEdit() {
  const { id } = useLocalSearchParams();
  return (
    <ViewWrapper>
      <StackCustom>
        <TextInputCustom label="Nama" value="Nama" required />
        <TextInputCustom label="Email" value="Email" required />
        <TextInputCustom label="Alamat" value="Alamat" required />
        
      </StackCustom>
    </ViewWrapper>
  );
}

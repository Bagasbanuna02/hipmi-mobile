import {
  BadgeCustom,
  BoxWithHeaderSection,
  ButtonCustom,
  CenterCustom,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { useState } from "react";
import { View } from "react-native";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";
import { apiVotingVote } from "@/service/api-client/api-voting";
import { useAuth } from "@/hooks/use-auth";

export function Voting_BoxDetailPublishSection({
  headerAvatar,
  data,
  userId,
  isContribution,
  nameChoice,
}: {
  headerAvatar?: React.ReactNode;
  data?: any;
  userId: string;
  isContribution?: boolean;
  nameChoice?: string;
}) {
  const [value, setValue] = useState<any | number>("");

  const handlerSubmitVote = async () => {
    const newData = {
      chooseId: value,
      userId: userId,
    };

    try {
      const response = await apiVotingVote({
        id: data?.id,
        data: newData,
      });
      console.log("[RES VOTE]", response);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar && (
          <>
            {headerAvatar}
            <Spacing />
          </>
        )}

        <StackCustom gap={"lg"}>
          <Voting_ComponentDetailDataSection data={data} />

          {isContribution ? (
            <StackCustom gap={"sm"}>
              <TextCustom align="center" size="small" bold>
                Pilihan Anda :
              </TextCustom>
              <View style={{ alignSelf: "center" }}>
                <BadgeCustom variant="light" size="lg">
                  {nameChoice || "-"}
                </BadgeCustom>
              </View>
            </StackCustom>
          ) : (
            <>
              <StackCustom>
                <TextCustom bold size="small">
                  Pilihan :
                </TextCustom>
                <RadioGroup value={value} onChange={setValue}>
                  {data?.Voting_DaftarNamaVote?.map((item: any, i: number) => (
                    <View key={i}>
                      <RadioCustom label={item?.value} value={item?.id} />
                    </View>
                  ))}
                </RadioGroup>
              </StackCustom>

              <ButtonCustom disabled={value === ""} onPress={handlerSubmitVote}>
                Vote
              </ButtonCustom>
            </>
          )}
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}

import {
  AlertDefaultSystem,
  BadgeCustom,
  BoxWithHeaderSection,
  ButtonCustom,
  Spacing,
  StackCustom,
  TextCustom
} from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { apiVotingVote } from "@/service/api-client/api-voting";
import { today } from "@/utils/dateTimeView";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";

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

      if (response.success) {
        router.push(`/voting/${data?.id}/list-of-contributor`);
      }
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
                      <RadioCustom
                        disabled={
                          today.getDate() < new Date(data?.awalVote).getDate()
                        }
                        label={item?.value}
                        value={item?.id}
                      />
                    </View>
                  ))}
                </RadioGroup>
              </StackCustom>

              <ButtonCustom
                disabled={value === ""}
                onPress={() => {
                  AlertDefaultSystem({
                    title: "Anda melaukan voting",
                    message: "Yakin dengan pilihan anda ini ?",
                    textLeft: "Batal",
                    textRight: "Ya",
                    onPressRight: () => handlerSubmitVote(),
                  });
                }}
              >
                Vote
              </ButtonCustom>
            </>
          )}
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}

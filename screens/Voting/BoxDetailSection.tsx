import {
  BoxWithHeaderSection,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";
import { Ionicons } from "@expo/vector-icons";

export function Voting_BoxDetailSection({
  headerAvatar,
  data,
}: {
  headerAvatar?: React.ReactNode;
  data?: any;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar ? headerAvatar : <Spacing />}
        <StackCustom>
          <Voting_ComponentDetailDataSection data={data} />
          <Spacing height={0} />

          <StackCustom>
            <TextCustom bold size="small">
              Pilihan :
            </TextCustom>
            {data?.Voting_DaftarNamaVote?.map((item: any, i: number) => (
              <StackCustom key={i}>
                <TextCustom>
                  <Ionicons name="caret-forward" size={14} /> {item?.value}
                </TextCustom>
              </StackCustom>
            ))}
          </StackCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}

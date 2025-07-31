import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  TextCustom,
  ViewWrapper,
} from "@/components";

export default function InvestmentInvestor() {
  return (
    <>
      <ViewWrapper>
        {Array.from({ length: 10 }).map((_, index) => (
          <BoxWithHeaderSection key={index}>
            <AvatarUsernameAndOtherComponent />
            <TextCustom bold>Rp. 7.000.000</TextCustom>
          </BoxWithHeaderSection>
        ))}
      </ViewWrapper>
    </>
  );
}

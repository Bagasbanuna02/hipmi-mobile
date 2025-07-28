import {
  AvatarUsernameAndOtherComponent,
  BadgeCustom,
  BaseBox,
  ViewWrapper,
} from "@/components";

export default function Voting_ListOfContributor() {
  return (
    <ViewWrapper>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox paddingTop={5} paddingBottom={5} key={index.toString()}>
          <AvatarUsernameAndOtherComponent
            rightComponent={
              <BadgeCustom
                style={{alignSelf: "flex-end" }}
              >
                Pilihan {index + 1}
              </BadgeCustom>
            }
          />
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}

import {
  DummyLandscapeImage,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { useLocalSearchParams } from "expo-router";

export default function DonationDetailStory() {
  const { id } = useLocalSearchParams();
  return (
    <ViewWrapper>
      <StackCustom>
        <TextCustom>
          Lorem {id} ipsum dolor, sit amet consectetur adipisicing elit. Fuga
          quasi nam nesciunt nisi corporis alias modi, pariatur sit totam rem
          fugiat ex similique magni, aliquam maiores officiis iure at adipisci.
        </TextCustom>
        <DummyLandscapeImage />
        <TextCustom>
          Lorem {id} ipsum dolor, sit amet consectetur adipisicing elit. Fuga
          quasi nam nesciunt nisi corporis alias modi, pariatur sit totam rem
          fugiat ex similique magni, aliquam maiores officiis iure at adipisci.
        </TextCustom>
      </StackCustom>
    </ViewWrapper>
  );
}

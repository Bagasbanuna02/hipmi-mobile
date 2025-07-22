import {
  BoxWithHeaderSection,
  Grid,
  ScrollableCustom,
  StackCustom,
  TextCustom
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { masterStatus } from "@/lib/dummy-data/_master/status";
import { useState } from "react";

export default function EventStatus() {
  const id = "test-id-event";

  const [activeCategory, setActiveCategory] = useState<string | null>(
    "publish"
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };

  const scrollComponent = (
    <ScrollableCustom
      data={masterStatus.map((e, i) => ({
        id: i,
        label: e.label,
        value: e.value,
      }))}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );

  return (
    <ViewWrapper headerComponent={scrollComponent}>
      <BoxWithHeaderSection href={`/event/${id}/${activeCategory}/detail-event`}>
        <StackCustom gap={"xs"}>
          <Grid>
            <Grid.Col span={8}>
              <TextCustom truncate bold>
                Lorem ipsum,{" "}
                <TextCustom color="green">{activeCategory}</TextCustom> dolor
                sit amet consectetur adipisicing elit.
              </TextCustom>
            </Grid.Col>
            <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
              <TextCustom>{new Date().toLocaleDateString()}</TextCustom>
            </Grid.Col>
          </Grid>

          <TextCustom truncate={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            eveniet ab eum ducimus tempore a quia deserunt quisquam. Tempora,
            atque. Aperiam minima asperiores dicta perferendis quis adipisci,
            dolore optio porro!
          </TextCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </ViewWrapper>
  );
}

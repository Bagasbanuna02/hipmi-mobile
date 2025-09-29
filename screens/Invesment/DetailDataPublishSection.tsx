import { Spacing, StackCustom } from "@/components";
import {
  listDataNotPublishInvesment,
  listDataPublishInvesment,
} from "@/lib/dummy-data/investment/dummy-data-not-publish";
import React from "react";
import Invesment_BoxDetailDataSection from "./BoxDetailDataSection";
import Invesment_BoxProgressSection from "./BoxProgressSection";
import Investment_ButtonStatusSection from "./ButtonStatusSection";

export default function Invesment_DetailDataPublishSection({
  status,
  data,
  bottomSection,
  buttonSection,
}: {
  status: string;
  data: any;
  bottomSection?: React.ReactNode;
  buttonSection?: React.ReactNode;
}) {
  // console.log("[DATA DETAIL]", JSON.stringify(data, null, 2));
  return (
    <>
      <StackCustom gap={"sm"}>
        <Invesment_BoxProgressSection status={status as string} />
        <Invesment_BoxDetailDataSection
          title={data?.title}
          imageId={data?.imageId}
          data={
            status === "publish"
              ? listDataPublishInvesment({ data })
              : listDataNotPublishInvesment({ data })
          }
          bottomSection={bottomSection}
        />
        <Investment_ButtonStatusSection
          id={data?.id}
          status={status as string}
          buttonPublish={buttonSection}
        />
      </StackCustom>
      <Spacing />
    </>
  );
}

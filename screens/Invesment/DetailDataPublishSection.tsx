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
  bottomSection,
  buttonSection,
}: {
  status: string;
  bottomSection: React.ReactNode;
  buttonSection: React.ReactNode;
}) {
  return (
    <>
      <StackCustom gap={"sm"}>
        <Invesment_BoxProgressSection status={status as string} />
        <Invesment_BoxDetailDataSection
          data={
            status === "publish"
              ? listDataPublishInvesment
              : listDataNotPublishInvesment
          }
          bottomSection={bottomSection}
        />
        <Investment_ButtonStatusSection
          status={status as string}
          buttonPublish={buttonSection}
        />
      </StackCustom>
      <Spacing />
    </>
  );
}

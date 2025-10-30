import { Spacing, StackCustom } from "@/components";
import {
  listDataNotPublishInvesment,
  listDataPublishInvesment,
} from "@/lib/dummy-data/investment/dummy-data-not-publish";
import React from "react";
import Invesment_BoxDetailDataSection from "./BoxDetailDataSection";
import Invesment_BoxProgressSection from "./BoxProgressSection";
import Investment_ButtonStatusSection from "./ButtonStatusSection";
import ReportBox from "@/components/Box/ReportBox";

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

  return (
    <>
      <StackCustom gap={"sm"}>
        {data && data?.catatan && (status === "draft" || status === "reject") && (
          <ReportBox text={data?.catatan} />
        )}
        <Invesment_BoxProgressSection progress={data?.progress} status={status as string} />
        <Invesment_BoxDetailDataSection
          title={data?.title}
          author={data?.author}
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

/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonCustom, Spacing, StackCustom } from "@/components";
import ReportBox from "@/components/Box/ReportBox";
import {
  listDataNotPublishInvesment,
  listDataPublishInvesment,
} from "@/lib/dummy-data/investment/dummy-data-not-publish";
import { countDownAndCondition } from "@/utils/countDownAndCondition";
import React, { useEffect, useState } from "react";
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
  const [value, setValue] = useState({
    sisa: 0,
    reminder: false,
  });

  useEffect(() => {
    updateCountDown();
  }, [data]);

  const updateCountDown = () => {
    const countDown = countDownAndCondition({
      duration: data?.durasiDonasi,
      publishTime: data?.publishTime,
    });

    setValue({
      sisa: countDown.durationDay,
      reminder: countDown.reminder,
    });
  };

  return (
    <>
      <StackCustom gap={"sm"}>
        {data &&
          data?.catatan &&
          (status === "draft" || status === "reject") && (
            <ReportBox text={data?.catatan} />
          )}
        <Invesment_BoxProgressSection
          progress={data?.progress}
          status={status as string}
        />
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

        {value.reminder ? (
          <ButtonCustom disabled>
            Periode Investasi Berakhir
          </ButtonCustom>
        ) : (
          <Investment_ButtonStatusSection
            id={data?.id}
            status={status as string}
            buttonPublish={buttonSection}
          />
        )}
      </StackCustom>
      <Spacing />
    </>
  );
}

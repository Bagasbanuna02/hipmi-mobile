import { BadgeCustom, BaseBox, Spacing, StackCustom, TextCustom } from "@/components";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { colorBadgeStatus } from "@/utils/colorBadge";
import { dateTimeView } from "@/utils/dateTimeView";
import _ from "lodash";

interface EventDetailData {
  Author?: {
    username?: string;
  };
  title?: string;
  lokasi?: string;
  EventMaster_TipeAcara?: {
    name?: string;
  };
  tanggal?: string;
  tanggalSelesai?: string;
  deskripsi?: string;
  catatan?: string;
}

interface BoxEventDetailProps {
  data: EventDetailData | null;
  status: string;
}

export function BoxEventDetail({ data, status }: BoxEventDetailProps) {
  const listData = [
    {
      label: "Pembuat Event",
      value: data?.Author?.username || "-",
    },
    {
      label: "Judul Event",
      value: data?.title || "-",
    },
    {
      label: "Status",
      value: data ? (
        <BadgeCustom color={colorBadgeStatus({ status })}>
          {_.startCase(status)}
        </BadgeCustom>
      ) : (
        "-"
      ),
    },
    {
      label: "Lokasi",
      value: data?.lokasi || "-",
    },
    {
      label: "Tipe Acara",
      value: data?.EventMaster_TipeAcara?.name || "-",
    },
    {
      label: "Mulai Event",
      value: data?.tanggal ? dateTimeView({ date: data.tanggal }) : "-",
    },
    {
      label: "Event Berakhir",
      value: data?.tanggalSelesai
        ? dateTimeView({ date: data.tanggalSelesai })
        : "-",
    },
    {
      label: "Deskripsi",
      value: data?.deskripsi || "-",
    },
  ];

  return (
    <BaseBox>
      <StackCustom>
        {listData.map((item, i) => (
          <GridSpan_4_8
            key={i}
            label={<TextCustom bold>{item.label}</TextCustom>}
            value={<TextCustom>{item.value}</TextCustom>}
          />
        ))}
      </StackCustom>
      <Spacing />
    </BaseBox>
  );
}

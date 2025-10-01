import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";

export { listDataNotPublishInvesment, listDataPublishInvesment };

const listDataNotPublishInvesment = ({ data }: { data: any }) => [
  {
    label: "Target Dana",
    value: `Rp. ${formatCurrencyDisplay(data?.targetDana) || "-"}`,
  },
  {
    label: "Harga Per Lembar",
    value: `Rp. ${formatCurrencyDisplay(data?.hargaLembar) || "-"}`,
  },
  {
    label: "Return Of Investment (ROI)",
    value: `${data?.roi || "-"} %`,
  },
  {
    label: "Total Lembar",
    value: data?.totalLembar || "-",
  },
  {
    label: "Pencarian Investor",
    value: data && data?.MasterPencarianInvestor?.name + " hari" || "-",
  },
  {
    label: "Jadwal Pembagian",
    value: data && data?.MasterPembagianDeviden?.name + " bulan" || "-",
  },
  {
    label: "Pembagian Deviden",
    value: data?.MasterPeriodeDeviden?.name || "-",
  },
];

const listDataPublishInvesment = ({ data }: { data: any }) => [
  {
    label: "Investor",
    value: data?.investor,
  },
  {
    label: "Target Dana",
    value: data?.targetDana,
  },
  {
    label: "Harga Per Lembar",
    value: `Rp. ${formatCurrencyDisplay(data?.hargaLembar) || "-"}`,
  },
  {
    label: "Return Of Investment (ROI)",
    value: `${data?.roi || "-"} %`,
  },
  {
    label: "Total Lembar",
    value: data?.totalLembar || "-",
  },
  {
    label: "Sisa Lembar",
    value: data?.sisaLembar || "-",
  },
  {
    label: "Pencarian Investor",
    value: (data && data?.MasterPencarianInvestor?.name + " hari") || "-",
  },
  {
    label: "Jadwal Pembagian",
    value: (data && data?.MasterPembagianDeviden?.name + " bulan") || "-",
  },
  {
    label: "Pembagian Deviden",
    value: data?.MasterPeriodeDeviden?.name || "-",
  },
];

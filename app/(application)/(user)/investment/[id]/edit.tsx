import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom,
  ViewWrapper
} from "@/components";
import dummyPembagianDeviden from "@/lib/dummy-data/investment/pembagian-deviden";
import dummyListPencarianInvestor from "@/lib/dummy-data/investment/pencarian-investor";
import dummyPeriodeDeviden from "@/lib/dummy-data/investment/periode-deviden";
import { router } from "expo-router";
import { useState } from "react";

export default function InvestmentEdit() {
  const [data, setData] = useState({
    title: "",
    targetDana: 0,
    hargaPerLembar: 0,
    totalLembar: 0,
    rasioKeuntungan: 0,
    pencarianInvestor: "",
    periodeDeviden: "",
    pembagianDeviden: "",
  });

  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Gambar investasi bisa berupa ilustrasi, poster atau foto terkait investasi." />
        <LandscapeFrameUploaded />
        <ButtonCenteredOnly
          icon="upload"
          onPress={() => router.push("/take-picture/1")}
        >
          Upload
        </ButtonCenteredOnly>

        <Spacing />

        <InformationBox text="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepannya." />

        <TextInputCustom
          required
          placeholder="Judul"
          label="Judul"
          value={data.title}
          onChangeText={(value) => setData({ ...data, title: value })}
        />

        <TextInputCustom
          required
          iconLeft="Rp."
          placeholder="0"
          label="Target Dana"
          keyboardType="numeric"
          onChangeText={(value) =>
            setData({ ...data, targetDana: Number(value) })
          }
          value={data.targetDana === 0 ? "" : data.targetDana.toString()}
        />

        <TextInputCustom
          required
          iconLeft="Rp."
          placeholder="0"
          label="Target Dana"
          keyboardType="numeric"
          onChangeText={(value) =>
            setData({ ...data, targetDana: Number(value) })
          }
          value={data.targetDana === 0 ? "" : data.targetDana.toString()}
        />

        <TextInputCustom
          required
          iconLeft="Rp."
          placeholder="0"
          label="Harga Per Lembar"
          keyboardType="numeric"
          onChangeText={(value) =>
            setData({ ...data, targetDana: Number(value) })
          }
          value={data.targetDana === 0 ? "" : data.targetDana.toString()}
        />

        <TextInputCustom
          required
          placeholder="0"
          label="Total Lembar"
          keyboardType="numeric"
          onChangeText={(value) =>
            setData({ ...data, totalLembar: Number(value) })
          }
          value={data.totalLembar === 0 ? "" : data.totalLembar.toString()}
        />

        <TextInputCustom
          required
          iconRight="%"
          label="Rasio Keuntungan / ROI %"
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(value) =>
            setData({ ...data, rasioKeuntungan: Number(value) })
          }
          value={
            data.rasioKeuntungan === 0 ? "" : data.rasioKeuntungan.toString()
          }
        />

        <SelectCustom
          required
          placeholder="Pilih batas waktu"
          label="Pencarian Investor"
          data={dummyListPencarianInvestor.map((item) => ({
            label: item.name + `${" "}hari`,
            value: item.id,
          }))}
          onChange={(value) =>
            setData({ ...data, pencarianInvestor: value as any })
          }
          value={data.pencarianInvestor}
        />

        <SelectCustom
          required
          placeholder="Pilih batas waktu"
          label="Pilih Periode Deviden"
          data={dummyPeriodeDeviden.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(value) =>
            setData({ ...data, periodeDeviden: value as any })
          }
          value={data.periodeDeviden}
        />

        <SelectCustom
          required
          placeholder="Pilih batas waktu"
          label="Pilih Pembagian Deviden"
          data={dummyPembagianDeviden.map((item) => ({
            label: item.name + `${" "}bulan`,
            value: item.id,
          }))}
          onChange={(value) =>
            setData({ ...data, pembagianDeviden: value as any })
          }
          value={data.pembagianDeviden}
        />
        <Spacing />
        <ButtonCustom onPress={() => router.replace("/investment/portofolio")}>
          Simpan
        </ButtonCustom>
      </StackCustom>
      <Spacing height={50} />
    </ViewWrapper>
  );
}

import { BackButton } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconPlus } from "@/components/_Icon";
import { IconDot } from "@/components/_Icon/IconComponent";
import LeftButtonCustom from "@/components/Button/BackButton";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function UserLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="delete-account"
          options={{
            header: () => <AppHeader title="Hapus Akun" />,
          }}
        />
        <Stack.Screen
          name="waiting-room"
          options={{
            header: () => <AppHeader title="Waiting Room" />,
          }}
        />

        {/* ========== Profile Section ========= */}
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />

        {/* ========== Portofolio Section ========= */}
        <Stack.Screen
          name="portofolio"
          options={{
            headerShown: false,
          }}
        />

        {/* ========== User Search Section ========= */}
        <Stack.Screen
          name="user-search/index"
          options={{
            header: () => <AppHeader title="Pencarian Pengguna" />,
          }}
        />

        {/* ========== Notification Section ========= */}

        {/* DIPINDAH DI FILE NOTIFICATION USER */}
        {/* <Stack.Screen
          name="notifications/index"
          options={{
            title: "Notifikasi",
            headerLeft: () => <BackButton />,
            // headerRight: () => (
            //   <IconPlus
            //     color={MainColor.yellow}
            //     onPress={() => router.push("/test-notifications")}
            //   />
            // ),
          }}
        /> */}

        {/* ========== Event Section ========= */}

        {/* <Stack.Screen
          name="event/(tabs)"
          options={{
            header: () => <AppHeader title="Event" left={<BackButton path="/home" />} />,
          }}
        /> */}

        <Stack.Screen
          name="event/(tabs)"
          options={{
            title: "Event",
            header: () => <AppHeader title="Event" left={<BackButton path="/home" />} />,
            // NOTE: DIPINDAH DI FILE /Event/(Tabs)/_layout.tsx
            // headerLeft: () => (
            //   <LeftButtonCustom path="/(application)/(user)/home" />
            // ),
          }}
        />

        <Stack.Screen
          name="event/create"
          options={{
            header: () => <AppHeader title="Tambah Event" />,
          }}
        />

        <Stack.Screen
          name="event/detail/[id]"
          options={{
            header: () => <AppHeader title="Event Detail" left={<LeftButtonCustom />} />,
          }}
        />

        <Stack.Screen
          name="event/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Event" />,
          }}
        />

        <Stack.Screen
          name="event/[id]/list-of-participants"
          options={{
            header: () => <AppHeader title="Daftar peserta" />,
          }}
        />
        {/* ========== End Event Section ========= */}

        {/* ========== Collaboration Section ========= */}
        <Stack.Screen
          name="collaboration/(tabs)"
          options={{
            header: () => <AppHeader title="Collaboration" left={<BackButton path="/home" />} />,
          }}
        />
        <Stack.Screen
          name="collaboration/create"
          options={{
            header: () => <AppHeader title="Tambah Proyek" />,
          }}
        />
        <Stack.Screen
          name="collaboration/[id]/list-of-participants"
          options={{
            header: () => <AppHeader title="Daftar Partisipan" />,
          }}
        />
        {/* <Stack.Screen
          name="collaboration/[id]/detail-participant"
          options={{
            title: "Partisipasi Proyek",
            headerLeft: () => <BackButton />,
          }}
        /> */}
        <Stack.Screen
          name="collaboration/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Proyek" />,
          }}
        />
        <Stack.Screen
          name="collaboration/[id]/create-pacticipants"
          options={{
            header: () => <AppHeader title="Ajukan Partisipasi" />,
          }}
        />
        <Stack.Screen
          name="collaboration/[id]/select-of-participants"
          options={{
            header: () => <AppHeader title="Pilih Partisipan" />,
          }}
        />

        {/* ========== End Collaboration Section ========= */}

        {/* ========== Voting Section ========= */}
        <Stack.Screen
          name="voting/create"
          options={{
            header: () => <AppHeader title="Tambah Voting" />,
          }}
        />
        <Stack.Screen
          name="voting/(tabs)"
          options={{
            header: () => <AppHeader title="Voting" left={<BackButton path="/home" />} />,
          }}
        />
        <Stack.Screen
          name="voting/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Voting" />,
          }}
        />
        <Stack.Screen
          name="voting/[id]/list-of-contributor"
          options={{
            header: () => <AppHeader title="Daftar Kontributor" />,
          }}
        />

        {/* ========== End Voting Section ========= */}

        {/* ========== Crowdfunding Section ========= */}
        <Stack.Screen
          name="crowdfunding/index"
          options={{
            header: () => <AppHeader title="Crowdfunding" left={<BackButton path="/home" />} />,
          }}
        />

        {/* ========== End Crowdfunding Section ========= */}

        {/* ========== Investment Section ========= */}
        <Stack.Screen
          name="investment/(tabs)"
          options={{
            header: () => <AppHeader title="Investasi" left={<BackButton path="/crowdfunding" />} />,
          }}
        />
        <Stack.Screen
          name="investment/create"
          options={{
            header: () => <AppHeader title="Tambah Investasi" />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/index"
          options={{
            header: () => <AppHeader title="Detail Investasi" />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Investasi" />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/edit-prospectus"
          options={{
            header: () => <AppHeader title="Edit Prospektus" />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(document)/list-of-document"
          options={{
            header: () => <AppHeader title="Daftar Dokumen" />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(document)/add-document"
          options={{
            header: () => <AppHeader title="Tambah Dokumen" />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(document)/edit-document"
          options={{
            header: () => <AppHeader title="Edit Dokumen" />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(news)/add-news"
          options={{
            header: () => <AppHeader title="Tambah Berita" />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/investor"
          options={{
            header: () => <AppHeader title="Investor" />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(transaction-flow)/index"
          options={{
            header: () => <AppHeader title="Pembelian Saham" />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/select-bank"
          options={{
            header: () => <AppHeader title="Pilih Bank" />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/invoice"
          options={{
            header: () => (
              <AppHeader
                title="Invoice"
                left={
                  <Ionicons
                    name="close"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.yellow}
                    onPress={() =>
                      router.navigate(`/investment/(tabs)/transaction`)
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/process"
          options={{
            header: () => (
              <AppHeader
                title="Proses"
                left={
                  <Ionicons
                    name="close"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.yellow}
                    onPress={() =>
                      router.navigate(`/investment/(tabs)/transaction`)
                    }
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/success"
          options={{
            header: () => <AppHeader title="Transaksi Berhasil" />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/failed"
          options={{
            header: () => <AppHeader title="Transaksi Gagal" />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(my-holding)/[id]"
          options={{
            header: () => <AppHeader title="Detail Saham Saya" />,
          }}
        />
        {/* ========== End Investment Section ========= */}

        {/* ========== Donation Section ========= */}
        <Stack.Screen
          name="donation/(tabs)"
          options={{
            header: () => <AppHeader title="Donasi" left={<BackButton path="/crowdfunding" />} />,
          }}
        />

        <Stack.Screen
          name="donation/create"
          options={{
            header: () => <AppHeader title="Tambah Donasi" />,
          }}
        />
        <Stack.Screen
          name="donation/create-story"
          options={{
            header: () => <AppHeader title="Tambah Donasi" />,
          }}
        />

        <Stack.Screen
          name="donation/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Donasi" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/edit-story"
          options={{
            header: () => <AppHeader title="Edit Donasi" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/edit-rekening"
          options={{
            header: () => <AppHeader title="Edit Rekening" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/detail-story"
          options={{
            header: () => <AppHeader title="Cerita Penggalang" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/infromation-fundrising"
          options={{
            header: () => <AppHeader title="Informasi Penggalang Dana" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/list-of-donatur"
          options={{
            header: () => <AppHeader title="Daftar Donatur" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/fund-disbursement"
          options={{
            header: () => <AppHeader title="Pencairan Dana" />,
          }}
        />

        <Stack.Screen
          name="donation/[id]/(news)/recap-of-news"
          options={{
            header: () => <AppHeader title="Rekap Kabar" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/(news)/add-news"
          options={{
            header: () => <AppHeader title="Tambah Berita" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/(news)/[news]/edit-news"
          options={{
            header: () => <AppHeader title="Edit Berita" />,
          }}
        />

        <Stack.Screen
          name="donation/[id]/(transaction-flow)/index"
          options={{
            header: () => <AppHeader title="Donasi" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/(transaction-flow)/select-bank"
          options={{
            header: () => <AppHeader title="Pilih Bank" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/(transaction-flow)/[invoiceId]/invoice"
          options={{
            header: () => (
              <AppHeader
                title="Invoice"
                left={
                  <Ionicons
                    name="close"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.yellow}
                    onPress={() => router.navigate(`/donation/(tabs)/my-donation`)}
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="donation/[id]/(transaction-flow)/[invoiceId]/process"
          options={{
            header: () => (
              <AppHeader
                title="Proses"
                left={
                  <Ionicons
                    name="close"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.yellow}
                    onPress={() => router.navigate(`/donation/(tabs)/my-donation`)}
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="donation/[id]/(transaction-flow)/[invoiceId]/success"
          options={{
            header: () => <AppHeader title="Donasi Berhasil" />,
          }}
        />
        <Stack.Screen
          name="donation/[id]/(transaction-flow)/[invoiceId]/failed"
          options={{
            header: () => <AppHeader title="Donasi Gagal" />,
          }}
        />

        {/* ========== End Donation Section ========= */}

        {/* ========== Job Section ========= */}


        <Stack.Screen
          name="job/create"
          options={{
            header: () => <AppHeader title="Tambah Job" />,
          }}
        />
        <Stack.Screen
          name="job/(tabs)"
          options={{
            title: "Job Vacancy",
            // NOTE: headerLeft di pindahkan ke Tabs Layout
            header: () => <AppHeader title="Job Vacancy" left={<BackButton path="/home" />} />,
          }}
        />
        <Stack.Screen
          name="job/[id]/index"
          options={{
            header: () => <AppHeader title="Detail Job" />,
          }}
        />
        <Stack.Screen
          name="job/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Job" />,
          }}
        />
        <Stack.Screen
          name="job/[id]/archive"
          options={{
            header: () => <AppHeader title="Arsip Job" />,
          }}
        />

        {/* ========== End Job Section ========= */}

        {/* ========== Forum Section ========= */}
        <Stack.Screen
          name="forum/create"
          options={{
            header: () => <AppHeader title="Tambah Diskusi" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Diskusi" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/forumku"
          options={{
            header: () => <AppHeader title="Forumku" left={<BackButton icon={"close"} />} />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/index"
          options={{
            header: () => <AppHeader title="Detail" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/report-commentar"
          options={{
            header: () => <AppHeader title="Laporkan Komentar" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/other-report-commentar"
          options={{
            header: () => <AppHeader title="Laporkan Komentar" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/report-posting"
          options={{
            header: () => <AppHeader title="Laporkan Diskusi" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/other-report-posting"
          options={{
            header: () => <AppHeader title="Laporkan Diskusi" />,
          }}
        />
        <Stack.Screen
          name="forum/terms"
          options={{
            header: () => <AppHeader title="Syarat & Ketentuan Forum" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/preview-report-posting"
          options={{
            header: () => <AppHeader title="Laporan Postingan" />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/preview-report-comment"
          options={{
            header: () => <AppHeader title="Laporan Komentar" />,
          }}
        />

        {/* ========== Maps Section ========= */}
        <Stack.Screen
          name="maps/index"
          options={{
            header: () => <AppHeader title="Maps" />,
          }}
        />
        <Stack.Screen
          name="maps/create"
          options={{
            header: () => <AppHeader title="Tambah Maps" />,
          }}
        />
        <Stack.Screen
          name="maps/[id]/edit"
          options={{
            header: () => <AppHeader title="Edit Maps" />,
          }}
        />
        <Stack.Screen
          name="maps/[id]/custom-pin"
          options={{
            header: () => <AppHeader title="Custom Pin Maps" />,
          }}
        />

        {/* ========== Marketplace Section ========= */}
        <Stack.Screen
          name="marketplace/index"
          options={{
            header: () => <AppHeader title="Market Place" />,
          }}
        />
      </Stack>
    </>
  );
}

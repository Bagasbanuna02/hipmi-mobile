import { BackButton } from "@/components";
import LeftButtonCustom from "@/components/Button/BackButton";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { HeaderStyles } from "@/styles/header-styles";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function UserLayout() {
  return (
    <>
      <Stack screenOptions={HeaderStyles}>
        <Stack.Screen
          name="home"
          options={{
            title: "HIPMI",
            headerLeft: () => (
              <Ionicons
                name="search"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.push("/user-search")}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="notifications"
                size={20}
                color={MainColor.yellow}
                onPress={() => router.push("/notifications")}
              />
            ),
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
            title: "Pencarian Pengguna",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Notification Section ========= */}
        <Stack.Screen
          name="notifications/index"
          options={{
            title: "Notifikasi",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Event Section ========= */}
        <Stack.Screen
          name="event/(tabs)"
          options={{
            title: "Event",
            headerLeft: () => (
              <LeftButtonCustom path="/(application)/(user)/home" />
            ),
          }}
        />
        <Stack.Screen
          name="event/create"
          options={{
            title: "Tambah Event",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="event/detail/[id]"
          options={{
            title: "Event Detail",
            headerLeft: () => <LeftButtonCustom />,
          }}
        />

        <Stack.Screen
          name="event/[id]/edit"
          options={{
            title: "Edit Event",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="event/[id]/list-of-participants"
          options={{
            title: "Daftar peserta",
            headerLeft: () => <BackButton />,
          }}
        />
        {/* ========== End Event Section ========= */}

        {/* ========== Collaboration Section ========= */}
        <Stack.Screen
          name="collaboration/(tabs)"
          options={{
            title: "Collaboration",
            headerLeft: () => <BackButton path="/home" />,
          }}
        />
        <Stack.Screen
          name="collaboration/create"
          options={{
            title: "Tambah Proyek",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="collaboration/[id]/list-of-participants"
          options={{
            title: "Daftar Partisipan",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="collaboration/[id]/detail-participant"
          options={{
            title: "Partisipasi Proyek",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="collaboration/[id]/edit"
          options={{
            title: "Edit Proyek",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== End Collaboration Section ========= */}

        {/* ========== Voting Section ========= */}
        <Stack.Screen
          name="voting/create"
          options={{
            title: "Tambah Voting",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="voting/(tabs)"
          options={{
            title: "Voting",
            headerLeft: () => <BackButton path="/home" />,
          }}
        />
        <Stack.Screen
          name="voting/[id]/edit"
          options={{
            title: "Edit Voting",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="voting/[id]/list-of-contributor"
          options={{
            title: "Daftar Kontributor",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== End Voting Section ========= */}

        {/* ========== Crowdfunding Section ========= */}
        <Stack.Screen
          name="crowdfunding/index"
          options={{
            title: "Crowdfunding",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== End Crowdfunding Section ========= */}

        {/* ========== Investment Section ========= */}
        <Stack.Screen
          name="investment/(tabs)"
          options={{
            title: "Investasi",
            headerLeft: () => <BackButton path="/crowdfunding" />,
          }}
        />
        <Stack.Screen
          name="investment/create"
          options={{
            title: "Tambah Investasi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/index"
          options={{
            title: "Detail Investasi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/edit"
          options={{
            title: "Edit Investasi",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/edit-prospectus"
          options={{
            title: "Edit Prospektus",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(document)/list-of-document"
          options={{
            title: "Daftar Dokumen",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(document)/add-document"
          options={{
            title: "Tambah Dokumen",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(document)/edit-document"
          options={{
            title: "Edit Dokumen",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(news)/add-news"
          options={{
            title: "Tambah Berita",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/investor"
          options={{
            title: "Investor",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(transaction-flow)/index"
          options={{
            title: "Pembelian Saham",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/select-bank"
          options={{
            title: "Pilih Bank",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/invoice"
          options={{
            title: "Invoice",
            headerLeft: () => (
              <Ionicons
                name="close"
                size={ICON_SIZE_SMALL}
                color={MainColor.yellow}
                onPress={() =>
                  router.navigate(`/investment/(tabs)/transaction`)
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/process"
          options={{
            title: "Proses",
            headerLeft: () => (
              <Ionicons
                name="close"
                size={ICON_SIZE_SMALL}
                color={MainColor.yellow}
                onPress={() =>
                  router.navigate(`/investment/(tabs)/transaction`)
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/success"
          options={{
            title: "Transaksi Berhasil",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="investment/[id]/(transaction-flow)/failed"
          options={{
            title: "Transaksi Gagal",
            headerLeft: () => <BackButton />,
          }}
        />

        <Stack.Screen
          name="investment/[id]/(my-holding)/[id]"
          options={{
            title: "Detail Saham Saya",
            headerLeft: () => <BackButton />,
          }}
        />
        {/* ========== End Investment Section ========= */}

        {/* ========== Donation Section ========= */}
        <Stack.Screen
          name="donation/(tabs)"
          options={{
            title: "Donasi",
            headerLeft: () => <BackButton path="/home" />,
          }}
        />

        <Stack.Screen
          name="donation/create"
          options={{
            title: "Tambah Donasi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="donation/create-story"
          options={{
            title: "Tambah Donasi",
            headerLeft: () => <BackButton />,
          }}
        />
        {/* ========== End Donation Section ========= */}

        {/* ========== Job Section ========= */}
        <Stack.Screen
          name="job/create"
          options={{
            title: "Tambah Job",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="job/(tabs)"
          options={{
            title: "Job Vacancy",
            headerLeft: () => <BackButton path="/home" />,
          }}
        />
        <Stack.Screen
          name="job/[id]/index"
          options={{
            title: "Detail Job",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="job/[id]/edit"
          options={{
            title: "Edit Job",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== End Job Section ========= */}

        {/* ========== Forum Section ========= */}
        <Stack.Screen
          name="forum/create"
          options={{
            title: "Tambah Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/edit"
          options={{
            title: "Edit Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/forumku"
          options={{
            title: "Forumku",
            headerLeft: () => <BackButton icon={"close"} />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/index"
          options={{
            title: "Detail",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/report-commentar"
          options={{
            title: "Laporkan Komentar",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/other-report-commentar"
          options={{
            title: "Laporkan Komentar",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/report-posting"
          options={{
            title: "Laporkan Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="forum/[id]/other-report-posting"
          options={{
            title: "Laporkan Diskusi",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Maps Section ========= */}
        <Stack.Screen
          name="maps/index"
          options={{
            title: "Maps",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="maps/create"
          options={{
            title: "Tambah Maps",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="maps/[id]/edit"
          options={{
            title: "Edit Maps",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="maps/[id]/custom-pin"
          options={{
            title: "Custom Pin Maps",
            headerLeft: () => <BackButton />,
          }}
        />

        {/* ========== Marketplace Section ========= */}
        <Stack.Screen
          name="marketplace/index"
          options={{
            title: "Market Place",
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack>
    </>
  );
}

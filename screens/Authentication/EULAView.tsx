// app/syarat-dan-ketentuan.tsx
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";

// Ganti dengan API call ke backend Anda
// const acceptEula = async (): Promise<boolean> => {
//   try {
//     const response = await fetch("/api/user/update-eula", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         eulaAcceptedAt: new Date().toISOString(),
//         eulaVersion: "2026-01-v1", // sesuaikan versi Anda
//       }),
//     });
//     return response.ok;
//   } catch (error) {
//     console.error("Gagal menyimpan persetujuan EULA:", error);
//     return false;
//   }
// };

export default function EULAView() {
  const { acceptedTerms } = useAuth();
  const { nomor } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    setIsAtBottom(isCloseToBottom);
  };

  const handleAccept = async () => {
    try {
      if (!isAtBottom) return;

      setIsLoading(true);
      await acceptedTerms(nomor as string);
    } catch (error) {
      console.log("Error accept terms", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Text style={styles.title}>
        Syarat & Ketentuan Penggunaan HIPMI Badung Connect
      </Text>

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.paragraph}>
          Dengan menggunakan aplikasi{" "}
          <Text style={styles.bold}>HIPMI Badung Connect</Text> (“Aplikasi”),
          Anda setuju untuk mematuhi dan terikat oleh syarat dan ketentuan
          berikut. Jika Anda tidak setuju dengan ketentuan ini, harap jangan
          gunakan Aplikasi.
        </Text>

        <Text style={styles.heading}>1. Definisi</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>HIPMI Badung Connect</Text> adalah platform
          digital resmi untuk anggota Himpunan Pengusaha Muda Indonesia (HIPMI)
          Kabupaten Badung, yang bertujuan memfasilitasi jaringan, kolaborasi,
          dan pertumbuhan bisnis para pengusaha muda.
        </Text>

        <Text style={styles.heading}>2. Larangan Konten Tidak Pantas</Text>
        <Text style={styles.paragraph}>
          Anda <Text style={styles.bold}>dilarang keras</Text> memposting,
          mengirim, membagikan, atau mengunggah konten apa pun yang mengandung:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Ujaran kebencian, diskriminasi, atau konten SARA (Suku, Agama,
            Ras, Antar-golongan)
          </Text>
          <Text style={styles.listItem}>
            • Pornografi, konten seksual eksplisit, atau gambar tidak senonoh
          </Text>
          <Text style={styles.listItem}>
            • Ancaman, pelecehan, bullying, atau perilaku melecehkan
          </Text>
          <Text style={styles.listItem}>
            • Informasi palsu, hoaks, spam, atau konten menyesatkan
          </Text>
          <Text style={styles.listItem}>
            • Konten ilegal, melanggar hukum, atau melanggar hak kekayaan
            intelektual pihak lain
          </Text>
          <Text style={styles.listItem}>
            • Promosi narkoba, perjudian, atau aktivitas ilegal lainnya
          </Text>
        </View>

        <Text style={styles.heading}>3. Tanggung Jawab Pengguna</Text>
        <Text style={styles.paragraph}>
          Anda bertanggung jawab penuh atas setiap konten yang Anda unggah atau
          bagikan melalui fitur-fitur berikut:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Profil (bio, foto, portofolio)</Text>
          <Text style={styles.listItem}>• Forum diskusi</Text>
          <Text style={styles.listItem}>• Chat pribadi atau grup</Text>
          <Text style={styles.listItem}>
            • Lowongan kerja, investasi, dan donasi
          </Text>
        </View>
        <Text style={styles.paragraph}>
          Konten yang melanggar ketentuan ini dapat dihapus kapan saja tanpa
          pemberitahuan.
        </Text>

        <Text style={styles.heading}>4. Tindakan terhadap Pelanggaran</Text>
        <Text style={styles.paragraph}>
          Jika kami menerima laporan atau menemukan konten yang melanggar
          ketentuan ini, kami akan:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Segera menghapus konten tersebut
          </Text>
          <Text style={styles.listItem}>
            • Memberikan peringatan atau memblokir akun pengguna
          </Text>
          <Text style={styles.listItem}>
            • Dalam kasus berat, melaporkan ke pihak berwajib sesuai hukum yang
            berlaku
          </Text>
        </View>
        <Text style={styles.paragraph}>
          Tim kami berkomitmen untuk menanggapi laporan konten tidak pantas{" "}
          <Text style={styles.bold}>dalam waktu 24 jam</Text>.
        </Text>

        <Text style={styles.heading}>5. Mekanisme Pelaporan</Text>
        <Text style={styles.paragraph}>
          Anda dapat melaporkan konten atau pengguna yang mencurigakan melalui:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Tombol <Text style={styles.bold}>“Laporkan”</Text> di setiap
            posting forum atau pesan chat
          </Text>
          <Text style={styles.listItem}>
            • Tombol <Text style={styles.bold}>“Blokir Pengguna”</Text> di
            profil pengguna
          </Text>
        </View>
        <Text style={styles.paragraph}>
          Setiap laporan akan ditangani secara rahasia dan segera.
        </Text>

        <Text style={styles.heading}>6. Perubahan Ketentuan</Text>
        <Text style={styles.paragraph}>
          Kami berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu. Versi
          terbaru akan dipublikasikan di halaman ini dengan tanggal revisi yang
          diperbarui.
        </Text>

        <Text style={styles.heading}>7. Kontak</Text>
        <Text style={styles.paragraph}>
          Jika Anda memiliki pertanyaan tentang ketentuan ini, silakan hubungi
          kami di:{"\n"}
          <Text style={[styles.bold, { color: "#1E90FF" }]}>
            bip.baliinteraktifperkasa@gmail.com
          </Text>
        </Text>

        <Text style={styles.footer}>
          © 2026 Bali Interaktif Perkasa. All rights reserved.
        </Text>
      </ScrollView>

      <TouchableOpacity
        onPress={handleAccept}
        disabled={!isAtBottom || isLoading}
        style={[styles.button, { opacity: !isAtBottom || isLoading ? 0.6 : 1 }]}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Menyimpan..." : "Saya Setuju"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainColor.darkblue,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: MainColor.white,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: MainColor.white,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: MainColor.white,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "600",
  },
  list: {
    marginLeft: 8,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 22,
    color: MainColor.white,
    marginBottom: 6,
  },
  footer: {
    fontSize: 12,
    color: MainColor.white,
    textAlign: "center",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: AccentColor.blue,
  },
  button: {
    backgroundColor: MainColor.yellow,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

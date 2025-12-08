import {
    BaseBox,
    ButtonCustom,
    CheckboxCustom,
    NewWrapper,
    StackCustom,
    TextCustom,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiAcceptForumTerms } from "@/service/api-client/api-user";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ForumSplash() {
  const { user } = useAuth();
  const [term, setTerm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const respone = await apiAcceptForumTerms({
        category: "Forum",
        userId: user?.id as any,
      });

      if (respone.success) {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Terima kasih telah menerima syarat & ketentuan forum ini",
        });

        router.replace("/(application)/forum");

        return;
      }

      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi kesalahan, silahkan coba lagi",
      });
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewWrapper>
      {/* <TextCustom bold>HIPMI Badung Connect</TextCustom> . */}

      <BaseBox>
        <StackCustom>
          <TextCustom>
            Dengan mengakses dan menggunakan Forum HIPMI Badung Connect, Anda
            secara sadar menyetujui ketentuan berikut:
          </TextCustom>

          <TextCustom bold>
            1. Dilarang keras memposting konten yang mengandung:
          </TextCustom>
          <View style={{ paddingInline: 10 }}>
            {forumTerms1.map((term, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingBottom: 10,
                }}
              >
                <Ionicons name="radio-button-on" color={"white"} />
                <TextCustom>{term.text}</TextCustom>
              </View>
            ))}
          </View>

          <TextCustom bold>
            2. Setiap pengguna bertanggung jawab penuh atas konten yang
            diunggah. Konten yang melanggar ketentuan ini dapat dihapus kapan
            saja tanpa pemberitahuan.
          </TextCustom>

          <TextCustom bold>
            3. Jika Anda menemukan konten tidak pantas, segera:
          </TextCustom>
          <View style={{ paddingInline: 10 }}>
            {forumTerms2.map((term, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingBottom: 10,
                }}
              >
                <Ionicons name="radio-button-on" color={"white"} />
                <TextCustom>{term.text}</TextCustom>
              </View>
            ))}
          </View>

          <TextCustom bold>
            4. Gunakan fitur “Blokir Pengguna” di profil pengguna terkait
          </TextCustom>
          <View style={{ paddingInline: 10 }}>
            {forumTerms3.map((term, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingBottom: 10,
                }}
              >
                <Ionicons name="radio-button-on" color={"white"} />
                <TextCustom>{term.text}</TextCustom>
              </View>
            ))}
          </View>

          <TextCustom>
            Pelanggaran terhadap ketentuan ini berakibat{" "}
            <TextCustom bold>pencabutan akses</TextCustom> ke Forum dan/atau{" "}
            <TextCustom bold>pemblokiran akun secara permanen</TextCustom> tanpa
            pemberitahuan lebih lanjut.
          </TextCustom>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <CheckboxCustom value={term} onChange={() => setTerm(!term)} />

            <Text style={GStyles.textLabel}>
              Saya telah membaca dan menyetujui Syarat & Ketentuan Forum ini
            </Text>
          </View>

          <ButtonCustom
            disabled={!term || loading}
            onPress={() => {
              handleSubmit();
            }}
          >
            Lanjut
          </ButtonCustom>
        </StackCustom>
      </BaseBox>
    </NewWrapper>
  );
}

// Data dalam format JSON (bisa juga diimpor dari file terpisah)
interface Term {
  text: string;
}

const forumTerms1: Term[] = [
  {
    text: "Ujaran kebencian, diskriminasi, atau konten SARA (Suku, Agama, Ras, Antar-golongan)",
  },
  { text: "Kata kasar, pelecehan, ancaman, atau bullying" },
  { text: "Pornografi, hoaks, spam, atau informasi menyesatkan" },
  { text: "Promosi aktivitas ilegal seperti perjudian atau narkoba" },
];

const forumTerms2: Term[] = [
  {
    text: "Gunakan tombol “Laporkan” di setiap postingan, atau",
  },
  {
    text: "Gunakan fitur “Blokir Pengguna” di profil pengguna terkait.",
  },
];

const forumTerms3: Term[] = [
  {
    text: "Meninjau setiap laporan dalam waktu 24 jam",
  },
  {
    text: "Menghapus konten yang melanggar",
  },
  {
    text: "Memblokir akun pelanggar sesuai tingkat pelanggaran",
  },
];

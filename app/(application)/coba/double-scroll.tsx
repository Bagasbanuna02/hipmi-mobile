// File: src/screens/EventDetailScreen.tsx

import LeftButtonCustom from "@/components/Button/BackButton";
import { MainColor } from "@/constants/color-palet";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// === TYPES ===
type Participant = {
  id: number;
  name: string;
  avatar: string;
};

type EventDetail = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
};

// === KOMPONEN UTAMA ===
const EventDetailScreen: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // Data event
  const event: EventDetail = {
    id: 1,
    title: "Workshop React Native & Expo",
    description:
      "Pelatihan intensif pengembangan aplikasi mobile menggunakan React Native, Expo, dan TypeScript. Cocok untuk developer tingkat menengah.",
    date: "Sabtu, 5 April 2025 | 09:00 - 16:00",
    location: "Gedung Teknologi, Jakarta Selatan",
    organizer: "DevCommunity Indonesia",
  };

  // Simulasi API: generate data dummy
  const generateParticipants = (
    startId: number,
    count: number
  ): Participant[] => {
    return Array.from({ length: count }, (_, i) => {
      const id = startId + i;
      return {
        id,
        name: `Peserta ${id}`,
        avatar: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`, // 70 gambar unik
      };
    });
  };

  // Load data awal
  useEffect(() => {
    const loadInitial = () => {
      setTimeout(() => {
        const initialData = generateParticipants(1, 20); // 20 peserta pertama
        setParticipants(initialData);
        setLoading(false);
      }, 800);
    };

    loadInitial();
  }, []);

  // Load lebih banyak peserta saat scroll ke bawah
  const loadMore = () => {
    if (loadingMore || participants.length >= 200) return; // Batas 200 peserta

    setLoadingMore(true);
    setTimeout(() => {
      const nextId = participants.length + 1;
      const newData = generateParticipants(nextId, 10); // Tambah 10 peserta
      setParticipants((prev) => [...prev, ...newData]);
      setLoadingMore(false);
    }, 1000);
  };

  // Render footer: loading indicator
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}> Memuat peserta berikutnya...</Text>
      </View>
    );
  };

  // Render header: detail event + info jumlah peserta
  const renderHeader = () => (
    <>
      <View style={styles.headerContainer}>
        <LeftButtonCustom path={"/"} />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.info}>📅 {event.date}</Text>
        <Text style={styles.info}>📍 {event.location}</Text>
        <Text style={styles.info}>👤 {event.organizer}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>
          Daftar Peserta ({participants.length})
        </Text>
      </View>

      {/* Sub-header tambahan jika perlu */}
      {participants.length === 0 ? (
        <Text style={styles.empty}>Belum ada peserta yang terdaftar.</Text>
      ) : null}
    </>
  );

  // Loading awal
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={styles.participantItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.participantName}>{item.name}</Text>
          </View>
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>Tidak ada peserta.</Text>
        }
      />

      <SafeAreaView
        edges={["bottom"]}
        style={{ backgroundColor: MainColor.darkblue }}
      />
    </>
  );
};

export default EventDetailScreen;

// === STYLES ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loader: {
    marginTop: 20,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  participantName: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    color: "#555",
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
    padding: 16,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  subHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f1f1f1",
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});

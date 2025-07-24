/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AvatarUsernameAndOtherComponent,
  BaseBox,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import Collaboration_BoxDetailSection from "@/screens/Collaboration/BoxDetailSection";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function CollaborationDetailParticipant() {
  const { id } = useLocalSearchParams();

  // Mock data
  const participantData = [
    { id: "1", name: "Inno Insani", avatar: "https://via.placeholder.com/40 " },
    {
      id: "2",
      name: "Amalia Dwi Y",
      avatar: "https://via.placeholder.com/40 ",
    },
    { id: "3", name: "Bagas", avatar: "https://via.placeholder.com/40 " },
  ];

  return (
    <>
      <ViewWrapper>
        <Collaboration_BoxDetailSection id={id as string} />
        <BaseBox style={{ height: 500 }}>
          <StackCustom>
            <TextCustom align="center" bold size="large">
              Partisipan
            </TextCustom>
          </StackCustom>

          {/* <View>
            <FlatList
              data={participantData}
              renderItem={({ item }) => (
                <AvatarUsernameAndOtherComponent
                  avatarHref={`/profile/${item.id}`}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View> */}

          {/* <ScrollView style={{ height: "100%" }}>
            <View style={{ backgroundColor: "transparent" }}>
              <AvatarUsernameAndOtherComponent
                rightComponent={
                  <Feather name="chevron-right" size={24} color="white" />
                }
              />
            </View>
          </ScrollView> */}
        </BaseBox>
      </ViewWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1A202C",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    backgroundColor: "#2B3442",
    borderRadius: 8,
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    color: "#fff",
    fontSize: 14,
  },
  participantsContainer: {
    marginTop: 20,
  },
  participantsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  participantName: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  arrow: {
    color: "#fff",
    fontSize: 16,
  },
});

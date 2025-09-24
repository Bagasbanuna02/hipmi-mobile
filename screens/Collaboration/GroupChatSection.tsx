/* eslint-disable react-hooks/exhaustive-deps */
// ChatScreen.tsx
import { LoaderCustom } from "@/components";
import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import {
  apiCollaborationGroupMessage,
  apiCollaborationGroupMessageCreate,
} from "@/service/api-client/api-collaboration";
import { formatChatTime } from "@/utils/formatChatTime";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type IMessage = {
  id: string;
  createdAt: Date;
  isActive: boolean;
  message: string;
  isFile: boolean;
  userId: string;
  User: {
    select: {
      id: true;
      username: true;
    };
  };
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ChatScreen: React.FC<{ id: string }> = ({ id }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadMessage();
    }, [id])
  );

  const onLoadMessage = async () => {
    try {
      setLoadingMessage(true);
      const response = await apiCollaborationGroupMessage({ id: id as string });
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingMessage(false);
    }
  };

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      let kbHeight = e.endCoordinates.height;
      // Di Android dengan edge-to-edge, kadang tinggi termasuk navigation bar
      if (Platform.OS === "android") {
        // Batasi maksimal 60% layar
        kbHeight = Math.min(kbHeight, SCREEN_HEIGHT * 0.6);
      }
      setKeyboardHeight(kbHeight);
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    // Scroll ke bawah setelah pesan baru atau keyboard muncul
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100); // delay kecil untuk pastikan layout stabil
    return () => clearTimeout(timer);
  }, [messages, keyboardHeight]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newData = {
      userId: user?.id,
      message: inputText.trim(),
    };

    try {
      const response = await apiCollaborationGroupMessageCreate({
        id: id as string,
        data: newData,
      });

      if (response.success) {
        setMessages((prev: IMessage | any) => [
          ...prev,
          {
            id: Date.now().toString(),
            createdAt: new Date(),
            isActive: true,
            message: inputText.trim(),
            isFile: false,
            userId: user?.id,
            User: {
              username: user?.username,
            },
          },
        ]);
        setInputText("");
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      {/* Kontainer utama dengan padding bottom = tinggi keyboard */}
      <View style={[styles.container, { paddingBottom: keyboardHeight }]}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          keyboardShouldPersistTaps="handled"
        >
          {loadingMessage ? (
            <ActivityIndicator color="black" size={"large"} />
          ) : _.isEmpty(messages) ? (
            <Text style={styles.isEmptyMessage}>
              Belum ada pesan
            </Text>
          ) : (
            messages?.map((item: any) => (
              <View
                key={item.id}
                style={[
                  styles.messageBubble,
                  item.userId === user?.id
                    ? styles.myMessage
                    : styles.otherMessage,
                ]}
              >
                <Text style={styles.name}>{item?.User?.username}</Text>
                <Text style={styles.messageText}>{item.message}</Text>
                <Text style={styles.timestamp}>
                  {formatChatTime(item.createdAt)}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={[styles.inputContainer, { paddingBottom: 10 }]}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ketik pesan..."
            style={styles.textInput}
            multiline
            blurOnSubmit={false}
            scrollEnabled={Platform.OS === "ios"} // ✅ Aktifkan scroll hanya di iOS
            textAlignVertical="top"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.sendButton}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <AntDesign name="send" size={ICON_SIZE_SMALL} color="white"/>
            {/* <Text style={styles.sendButtonText}>Kirim</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e5ddd5",
  },
  container: {
    flex: 1,
    backgroundColor: "#e5ddd5",
  },
  isEmptyMessage: {
    alignSelf: "center",
    color: "#666",
    marginTop: 20,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messagesContent: {
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 4,
    borderRadius: 12,
  },
  name: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 8,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: AccentColor.blue,
    // paddingHorizontal: 16, 
    // paddingVertical: 10,
    borderRadius: "100%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatScreen;

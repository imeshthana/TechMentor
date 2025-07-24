import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightPurple, lightBlue, purple } from "../../utils/constants";
import { Title } from "../../components/title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAiSuggestions } from "../../hooks/useAiApi";

const STORAGE_KEY = "ai_chat_messages";

export const AIBotScreen = () => {
  const flatListRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([
          {
            id: "1",
            sender: "bot",
            text: "Hi! Tell me your interests to suggest courses for you.",
          },
        ]);
      }
    };
    loadMessages();
  }, []);

  const saveMessages = async (updatedMessages) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
  };

  const handleSuccess = (data) => {
    const botMessage = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: data.recommendations,
    };
    const updated = [...messages, botMessage];
    setMessages(updated);
    saveMessages(updated);
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleError = (error) => {
    console.error("AI error:", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  };

  const { mutate, isLoading } = useAiSuggestions(handleSuccess, handleError);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    saveMessages(updated);
    flatListRef.current?.scrollToEnd({ animated: true });

    mutate({ prompt: input.trim() });
    setInput("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior="height"
          keyboardVerticalOffset={10}
        >
          <Title title={"AI Assistant"} />

          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatContainer}
            style={styles.messagesList}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type your message..."
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.sendText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  chatContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: lightPurple,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: lightBlue,
  },
  messageText: {
    color: "#fff",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 45,
    marginRight: 10,
    borderColor: purple,
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: purple,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
  logo: {
    position: "absolute",
    top: "35%",
    alignSelf: "center",
    width: 200,
    height: 200,
    opacity: 0.25,
    resizeMode: "contain",
  },
});

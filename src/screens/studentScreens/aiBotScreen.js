import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightBlue, lightPurple, purple } from "../../utils/constants";

export const AIBotScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "That's interesting! Tell me more.",
        },
      ]);
    }, 800);

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
          behavior= "height"
          keyboardVerticalOffset= {10}
        >
          <Text style={styles.title}>AI Assistant</Text>

          <Image
            source={require("../../assets/logo_bg.png")}
            style={styles.logo}
          />

          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatContainer}
            style={styles.messagesList}
          />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type your message..."
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendText}>Send</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
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

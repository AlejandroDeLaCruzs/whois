import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodayQuestion } from "../api/question";
import { myVote, voteQuestion } from "../api/vote";

type Option = { id: string; text: string };

export default function QuestionScreen() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [id, setData] = useState("");

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    try {
      setLoading(true);
      const data = await getTodayQuestion(token);
      setQuestion(data.data.question.text);
      setOptions(data.data.question.options);
      setData(data.data.question._id);
      await fetchUserVote(data.data.question._id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchUserVote = async (questionId: string) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    const data = await myVote(token, id);
    if (data) {
      setSelectedOption(data.optionId);
      setVoted(true);
    }
  };

  const handleVote = async (optionId: string) => {
    if (!question || voted) return;
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    await voteQuestion(token, id, optionId);
    setSelectedOption(optionId);
    setVoted(true);
  };

  if (loading || !question) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Fondo decorativo */}
      <View style={styles.backgroundCurves}>
        <View style={styles.curveTop} />
        <View style={styles.curveBottom} />
      </View>

      {/* Título animado */}
      <Animatable.Text animation="bounceIn" style={styles.appTitle}>
        Whois
      </Animatable.Text>

      {/* Contenedor centrado vertical */}
      <View style={styles.centerContent}>
        <Animatable.Text
          animation="fadeIn"
          delay={300}
          style={styles.questionText}
        >
          {question}
        </Animatable.Text>

        {options.map((option, index) => (
          <Animatable.View key={option.id} animation="fadeInUp" delay={index * 150}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === option.id && styles.optionSelected,
              ]}
              onPress={() => handleVote(option.id)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option.id && styles.optionTextSelected,
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backgroundCurves: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  curveTop: {
    position: "absolute",
    top: -100,
    left: -100,
    width: width * 1.5,
    height: 300,
    backgroundColor: "#4f46e5",
    borderRadius: 300,
    opacity: 0.3,
    transform: [{ rotate: "45deg" }],
  },
  curveBottom: {
    position: "absolute",
    bottom: -150,
    right: -100,
    width: width * 1.5,
    height: 400,
    backgroundColor: "#a5b4fc",
    borderRadius: 400,
    opacity: 0.3,
    transform: [{ rotate: "-30deg" }],
  },
  appTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4f46e5",
    marginTop: 60,
    textAlign: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#1f2937",
  },
  optionButton: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  optionText: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
});
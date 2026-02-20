import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import axios from "axios";

type Option = {
  id: string;
  text: string;
};

type Question = {
  _id: string;
  text: string;
  options: Option[];
  date: string;
};

const API_URL = "http://localhost:3000";

export default function QuestionScreen() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  // =========================
  // FETCH PREGUNTA DEL DÍA
  // =========================
  const fetchQuestion = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/questions/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      // data es un ARRAY
      if (!Array.isArray(data) || data.length === 0) {
        Alert.alert("Info", "No hay pregunta para hoy");
        setLoading(false);
        return;
      }

      const todayQuestion: Question = data[0];

      setQuestion(todayQuestion);

      // comprobar si ya votó
      await fetchUserVote(todayQuestion._id);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "No se pudo cargar la pregunta del día");
    }
  };

  // =========================
  // FETCH VOTO DEL USUARIO
  // =========================
  const fetchUserVote = async (questionId: string) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        `${API_URL}/votes/${questionId}/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;

      // backend devuelve: { optionId: "a" }
      if (data && data.optionId) {
        setSelectedOption(data.optionId);
        setVoted(true);
      }
    } catch (error: any) {
      // 404 = no ha votado → OK
      if (error.response?.status !== 404) {
        Alert.alert("Error", "No se pudo comprobar tu voto");
      }
    }
  };

  // =========================
  // VOTAR
  // =========================
  const handleVote = async (optionId: string) => {
    if (!question || voted) return;

    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        `${API_URL}/votes`,
        { questionId: question._id, optionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedOption(optionId);
      setVoted(true);
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar tu voto");
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading || !question) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>

      {question.options.map((opt) => {
        const isSelected = selectedOption === opt.id;

        return (
          <Animatable.View
            key={opt.id}
            animation={isSelected && voted ? "bounceIn" : undefined}
            duration={500}
            style={{ width: "100%" }}
          >
            <TouchableOpacity
              style={[
                styles.optionButton,
                isSelected && voted && styles.optionSelected,
              ]}
              onPress={() => handleVote(opt.id)}
              disabled={voted}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && voted && { color: "#fff" },
                ]}
              >
                {opt.text} {isSelected && voted ? "✅" : ""}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        );
      })}
    </View>
  );
}

// =========================
// STYLES
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  questionText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  optionText: {
    fontSize: 18,
  },
});

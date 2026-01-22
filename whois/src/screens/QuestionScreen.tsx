import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import axios from "axios";

type Option = { id: string; text: string };
type Question = { _id: string; text: string; options: Option[]; userVote: string | null };

export default function QuestionScreen() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);

  const API_URL = "http://localhost:3000"; // Cambia a tu backend

  const fetchQuestion = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/questions/today`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setQuestion(data);
      if (data.userVote) {
        setSelectedOption(data.userVote);
        setVoted(true); // Ya votó
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "No se pudo cargar la pregunta del día");
    }
  };

  const handleVote = async (optionId: string) => {
    if (!question) return;
    if (voted) return;

    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(`${API_URL}/votes`, 
        { questionId: question._id, optionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedOption(optionId);
      setVoted(true);
    } catch (err) {
      Alert.alert("Error", "No se pudo registrar tu voto");
    }
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
              style={[styles.optionButton, isSelected ? styles.optionSelected : {}]}
              onPress={() => handleVote(opt.id)}
              disabled={voted} // Bloquea botones si ya votó
            >
              <Text style={[styles.optionText, isSelected ? { color: "#fff" } : {}]}>
                {opt.text} {isSelected && voted ? "✅" : ""}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f5f5f5" },
  questionText: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
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
  optionText: { fontSize: 18 },
});

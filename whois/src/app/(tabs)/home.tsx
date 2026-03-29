import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { getTodayQuestion } from "../../src/../lib/services/question";
import { myVote, voteQuestion } from "../../src/../lib/services/vote";
import { getToken } from "../../src/../lib/services/auth";

type Option = { id: string; text: string };
type Question = { _id: string; text: string; options: Option[] };
type Results = { optionId: string; count: number; percentage: number }[];

export default function HomeScreen() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      
      const token = await getToken();
      if (!token) return;

      // Coge la pregunta del día
      const data = await getTodayQuestion(token);
      
    
      setQuestion(data.data);
      
      // Comprueba si ya votó hoy
      const voteData = await myVote(token, data.data._id);
      
      if (voteData?.hasVoted) {
        setSelectedOption(voteData.optionId);
        setResults(voteData.results); // si tu back devuelve resultados con el voto
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (optionId: string) => {
    if (selectedOption) return; // ya votó
    try {
      setVoting(true);
      const token = await getToken();
      if (!token) return;

      const data = await voteQuestion(token, question!._id, optionId);
      console.log(data);
     
      setSelectedOption(optionId);
      setResults(data.results); // 👈 tu back debe devolver los resultados tras votar
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setVoting(false);
    }
  };

  const getPercentage = (optionId: string) => {
    if (!results) return 0;
    return results.find((r) => r.optionId === optionId)?.percentage ?? 0;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#6c47ff" size="large" />
      </View>
    );
  }

  if (!question) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noQuestion}>No hay pregunta para hoy 😴</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.dayLabel}>Pregunta del día</Text>
        <Text style={styles.question}>{question.text}</Text>
      </View>

      {/* Opciones */}
      <View style={styles.options}>
        {question.options.map((option) => {
          const percentage = getPercentage(option.id);
          const isSelected = selectedOption === option.id;
          const hasVoted = selectedOption !== null;

          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleVote(option.id)}
              disabled={hasVoted || voting}
              activeOpacity={0.8}
            >
              {/* Barra de progreso */}
              {hasVoted && (
                <View
                  style={[styles.progressBar, { width: `${percentage}%` }]}
                />
              )}

              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option.text}
                </Text>
                {hasVoted && (
                  <Text style={styles.percentage}>{percentage}%</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedOption && (
        <Text style={styles.votedText}>✅ Ya has votado hoy</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
    paddingHorizontal: 24,
    paddingTop: 60,
    gap: 32,
  },
  centered: {
    flex: 1,
    backgroundColor: "#0f0f14",
    alignItems: "center",
    justifyContent: "center",
  },
  noQuestion: {
    color: "#64748b",
    fontSize: 16,
  },
  header: {
    gap: 12,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6c47ff",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  question: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f1f5f9",
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  options: {
    gap: 12,
  },
  option: {
    backgroundColor: "#1e1e2e",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2d2d44",
    overflow: "hidden",
    minHeight: 60,
    justifyContent: "center",
  },
  optionSelected: {
    borderColor: "#6c47ff",
  },
  progressBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#6c47ff22",
    borderRadius: 16,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 15,
    color: "#94a3b8",
    fontWeight: "500",
    flex: 1,
  },
  optionTextSelected: {
    color: "#f1f5f9",
    fontWeight: "700",
  },
  percentage: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6c47ff",
    marginLeft: 12,
  },
  votedText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
  },
});

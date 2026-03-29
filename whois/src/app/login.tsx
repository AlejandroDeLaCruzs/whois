import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { loginUser } from "../lib/services/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    try {
      setLoading(true);
      await loginUser(email, password);
      router.replace("/(tabs)/home");
    } catch (err: any) {
      Alert.alert("Error al iniciar sesión", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 👇 Toca fuera del input para cerrar el teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined} // 👈 undefined en Android
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled" // 👈 permite pulsar botones con teclado abierto
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.circle1} />
          <View style={styles.circle2} />

          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✦</Text>
              </View>
              <Text style={styles.title}>Bienvenido</Text>
              <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="tucorreo@email.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Entrar →</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>¿No tienes cuenta? </Text>
              <Link href="/register" style={styles.link}>
                Regístrate
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
  },
  scroll: {
    flexGrow: 1, // 👈 ocupa todo el espacio disponible
    justifyContent: "center",
  },
  circle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#6c47ff22",
    top: -80,
    right: -80,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ff6c4722",
    bottom: 100,
    left: -60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 60,
    gap: 28,
  },
  header: { gap: 8 },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#6c47ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  badgeText: { fontSize: 20, color: "#fff" },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: "#64748b" },
  form: { gap: 16 },
  inputGroup: { gap: 6 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94a3b8",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#1e1e2e",
    borderWidth: 1,
    borderColor: "#2d2d44",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#f1f5f9",
  },
  forgot: {
    color: "#6c47ff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#6c47ff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#6c47ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: { color: "#64748b", fontSize: 14 },
  link: { color: "#6c47ff", fontSize: 14, fontWeight: "700" },
});

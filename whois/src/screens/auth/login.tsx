import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { loginUser } from "../../api/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
  const [email, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inicioSesion, setInicioSesion] = useState(false);

  const navigation = useNavigation<LoginScreenProp>();

  useEffect(() => {
    const login = async () => {
      try {
        const result = await loginUser(email, password);
        if (result.data.success) {
          console.log("Login correcto");
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", "Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error en login:", error);
      }
    };

    if (inicioSesion) {
      login();
      setInicioSesion(false); // reset para permitir volver a presionar
    }
  }, [inicioSesion]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Título colorido */}
      <Text style={styles.title}>
        <Text style={{ color: "#FF6B6B" }}>Who</Text>
        <Text style={{ color: "#4ECDC4" }}>is</Text>
      </Text>

      <Text style={styles.subtitle}>La app de la pregunta diaria</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setUserName}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      {/* Botón personalizado */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setInicioSesion(true)}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#eee",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#2E2E2E",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5, // para Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;
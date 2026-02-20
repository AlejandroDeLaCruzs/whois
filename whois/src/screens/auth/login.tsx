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
  Dimensions,
} from "react-native";
import { loginUser } from "../../api/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;
const { width, height } = Dimensions.get("window");

const Login = () => {
  const [email, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inicioSesion, setInicioSesion] = useState(false);
  const navigation = useNavigation<LoginScreenProp>();

  useEffect(() => {
    const login = async () => {
      try {
        const result = await loginUser(email, password);
        if (result.success) {
          await AsyncStorage.setItem("token", result.data.token);
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
      setInicioSesion(false);
    }
  }, [inicioSesion]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Curvas de colores de fondo */}
      <View style={styles.curvePurple} />
      <View style={styles.curveBlue} />
      <View style={styles.curvePink} />
      <View style={styles.curveTurquoise} />

      {/* Título */}
      <Text style={styles.title}>
        <Text style={{ color: "#4F46E5" }}>Who</Text>
        <Text style={{ color: "#A5B4FC" }}>is</Text>
      </Text>
      <Text style={styles.subtitle}>La app de la pregunta diaria</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8B8FC4"
        onChangeText={setUserName}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8B8FC4"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      {/* Botón */}
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
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    overflow: 'hidden',
  },
  // ================= Curvas de fondo =================
  curvePurple: {
    position: "absolute",
    top: -height * 0.3,
    left: -width * 0.3,
    width: width * 1.6,
    height: height * 0.5,
    backgroundColor: "#4F46E5",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    transform: [{ rotate: "-20deg" }],
    zIndex: -4,
    opacity: 0.8,
  },
  curveBlue: {
    position: "absolute",
    top: -height * 0.25,
    right: -width * 0.25,
    width: width * 1.2,
    height: height * 0.45,
    backgroundColor: "#A5B4FC",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    transform: [{ rotate: "15deg" }],
    zIndex: -3,
    opacity: 0.7,
  },
  curvePink: {
    position: "absolute",
    bottom: -height * 0.3,
    left: -width * 0.25,
    width: width * 1.5,
    height: height * 0.5,
    backgroundColor: "#FF6B6B",
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
    transform: [{ rotate: "-15deg" }],
    zIndex: -2,
    opacity: 0.6,
  },
  curveTurquoise: {
    position: "absolute",
    bottom: -height * 0.25,
    right: -width * 0.25,
    width: width * 1.3,
    height: height * 0.45,
    backgroundColor: "#16e6d8",
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
    transform: [{ rotate: "20deg" }],
    zIndex: -1,
    opacity: 0.6,
  },

  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
    zIndex: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "#1F2937",
    marginBottom: 40,
    zIndex: 1,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    color: "#1F2937",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#4F46E5",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#A5B4FC",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;
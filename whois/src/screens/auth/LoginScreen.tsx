import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // Ajusta la ruta según tu estructura
import { loginUser } from "../../api/auth"; // Tu servicio Axios

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Ingresa email y contraseña");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password); // Llamada Axios
      setLoading(false);

      // Guardar token
      await AsyncStorage.setItem("token", data.token);

      // Navegar a Home
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
      </TouchableOpacity>

      {/* Botón para registrarse */}
      <TouchableOpacity style={styles.register} onPress={handleRegister}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 40, textAlign: "center" },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  register: { marginTop: 20, alignItems: "center" },
  registerText: { color: "#4f46e5", fontWeight: "500" },
});

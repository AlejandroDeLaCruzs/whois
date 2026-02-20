# Daily Questions App

Una aplicación móvil desarrollada con **React Native + Expo** que permite a los usuarios responder **una pregunta diaria** tipo test.  
El backend está construido con **Node.js, Express y MongoDB**, usando **JWT para autenticación**.

---

## 📌 Características

- Registro e inicio de sesión seguro con email y contraseña.
- Autenticación mediante **JWT**.
- Cada usuario puede responder **una sola pregunta al día**.
- Preguntas con **4 opciones tipo test**.
- Animación que indica que el usuario ha votado.
- Pantallas de login, registro y visualización de la pregunta del día.
- Preparado para escalar a más preguntas o estadísticas de respuestas.

---

## ⚙️ Tecnologías

- **Frontend:** React Native, Expo, TypeScript, Axios, AsyncStorage  
- **Backend:** Node.js, Express, MongoDB, bcryptjs, jsonwebtoken  
- **Otras herramientas:** ESLint, Prettier, Nodemon

---

## 🚀 Instalación

### Backend

```bash
cd backend
npm install
npm run dev
```


### Frontend
```bash
cd whois
npm install
expo start
```
### Auth (Autenticación)
| Método | Endpoint         | Descripción                            | Auth required  |
| ------ | ---------------- | -------------------------------------- | -------------- |
| GET    | `/auth/`         | Prueba la conexión a la ruta           | No             |
| POST   | `/auth/register` | Registrar un nuevo usuario             | No             |
| POST   | `/auth/login`    | Iniciar sesión                         | No             |
| GET    | `/auth/me`       | Obtener información del usuario actual | Sí (pendiente) |

### Questions

| Método | Endpoint           | Descripción                 | Auth required |
| ------ | ------------------ | --------------------------- | ------------- |
| GET    | `/questions/today` | Obtener la pregunta del día | Sí            |
| GET    | `/questions/:id`   | Obtener pregunta por ID     | Sí            |

### Vote

| Método | Endpoint             | Descripción                             | Auth required |
| ------ | -------------------- | --------------------------------------- | ------------- |
| POST   | `/votes/`            | Votar en la pregunta del día            | Sí            |
| GET    | `/votes/results/:id` | Obtener resultados (total por opción)   | Sí            |
| GET    | `/votes/myVote/:id`  | Obtener la opción votada por el usuario | Sí            |



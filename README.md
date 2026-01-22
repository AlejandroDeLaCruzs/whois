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

| Método | Endpoint         | Descripción                | Body                                               |
| ------ | ---------------- | -------------------------- | -------------------------------------------------- |
| POST   | `/auth/register` | Registrar un nuevo usuario | `{ "email": "user@mail.com", "password": "1234" }` |
| POST   | `/auth/login`    | Login y obtener token JWT  | `{ "email": "user@mail.com", "password": "1234" }` |


| Método | Endpoint           | Descripción                 | Body / Headers                                                                      |
| ------ | ------------------ | --------------------------- | ----------------------------------------------------------------------------------- |
| GET    | `/questions/today` | Obtener la pregunta del día | Header: `Authorization: Bearer <token>`                                             |
| POST   | `/questions/vote`  | Votar una opción            | `{ "questionId": "id", "optionId": "a" }` + Header: `Authorization: Bearer <token>` |


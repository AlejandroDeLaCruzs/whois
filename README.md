| Método | Endpoint         | Descripción                | Body                                               |
| ------ | ---------------- | -------------------------- | -------------------------------------------------- |
| POST   | `/auth/register` | Registrar un nuevo usuario | `{ "email": "user@mail.com", "password": "1234" }` |
| POST   | `/auth/login`    | Login y obtener token JWT  | `{ "email": "user@mail.com", "password": "1234" }` |

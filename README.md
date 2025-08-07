# 📚 TiendaLibrosProt

¡Bienvenido/a a **TiendaLibrosProt**!  
Este es un proyecto de tienda de libros online básica, creado como parte de mi aprendizaje en desarrollo web fullstack.  
La aplicación permite explorar y gestionar libros disponibles para la venta de manera sencilla e intuitiva.

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** React (con Material UI)
- **Backend:** Node.js, Express
- **Base de datos:** MongoDB (con Mongoose)
- **Autenticación:** JWT (Token-Based)
- **Control de estado:** React Hooks
- **Estilos:** Material UI + estilos personalizados

---

## ✨ Características Principales

- 📖 Visualización de libros disponibles
- 🔐 Registro, login y autenticación de usuarios (rol admin o cliente)
- 🛒 Añadir libros al carrito y simular pedidos
- 👩‍💻 Panel de administración para gestionar libros y pedidos
- 💬 Feedback visual mediante notificaciones (`notistack`)
- 🧾 Gestión de órdenes con dirección e instrucciones personalizadas

---

## 🗂️ Estructura del Proyecto

```bash
TiendaLibrosProt/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── public/
│   └── package.json
│
└── README.md



---

## 🛠️ Instalación y Ejecución Local

### 1. Clona el repositorio

```bash
git clone https://github.com/rogerespinosamorros/TiendaLibrosProt.git
cd TiendaLibrosProt

### Backend

cd backend
npm install


#### Server

npm start

### Frontend

cd frontend
npm install
npm start




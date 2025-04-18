cat <<EOF > README.md
# 🛒 E-Commerce Backend API

This is a simple backend for an e-commerce application built using **Express.js**, **Sequelize**, and **PostgreSQL**. It includes features like user authentication, address management, and token-based authorization.

---

## 🚀 Features

- ✅ User Authentication (Login)
- ✅ JWT Token Authorization
- ✅ CRUD Address (Label, Recipient, City, Province, etc)
- ✅ Clean folder structure with Controllers & Services
- ✅ DTO-based API responses
- ✅ Sequelize ORM and migrations

---

## 🛠 Tech Stack

- **Node.js** / **Express.js**
- **Sequelize** ORM
- **PostgreSQL**
- **JWT** for authentication
- **dotenv** for environment configs

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and fill in the following:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
DB_DIALECT=postgres

JWT_SECRET=your_jwt_secret
```

### 4. Run Migrations

```bash
npx sequelize-cli db:migrate
```

### 5. Start the Server

```bash
npm run dev
```

---

## 🧪 API Testing

Use **Postman** or similar tools to test the endpoints. Example login request:

\`\`\`
POST /api/auth/login
\`\`\`

Example protected route (Address):

\`\`\`
GET /api/addresses
Headers: Authorization: Bearer <token>
\`\`\`

---

## 📂 Folder Structure

\`\`\`
.
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── dto/
├── utils/
├── config/
└── migrations/
\`\`\`

---

## 📄 License

This project is licensed under the MIT License.

---

Happy coding! ✨
EOF

# 🛒 E-Commerce Backend API

This is a simple backend for an e-commerce application built using **Express.js**, **Sequelize**, and **PostgreSQL**. It supports essential features such as user authentication, cart management, wishlist, orders, and token-based authorization.

---

## 🚀 Features

- ✅ **User Authentication** (Login)  
- ✅ **JWT Token Authorization**  
- ✅ **CRUD Address** (Label, Recipient, City, Province, etc)  
- ✅ **Cart Management** (Add to cart, update quantity, delete)  
- ✅ **Wishlist** (Add/remove favorite products)  
- ✅ **Order System** (Checkout from cart, partial order, track status)  
- ✅ **Clean Folder Structure** (Controllers, Services, DTOs)  
- ✅ **Sequelize ORM** (Models, Migrations, Associations)  
- ✅ **Transaction-safe Order Creation**

---

## 🛠 Tech Stack

- Node.js / Express.js  
- Sequelize ORM  
- PostgreSQL  
- JWT for Authentication  
- dotenv for Environment Configs

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

Use **Postman** or similar tools to test the endpoints.

### 🔑 Auth

- `POST /api/auth/login`

### 📬 Address

- `GET /api/addresses`  
  Headers: `Authorization: Bearer <token>`

### 🛒 Cart

- `GET /api/carts`
- `POST /api/carts`
- `PATCH /api/carts/:product_id`
- `DELETE /api/carts/:product_id`

### ❤️ Wishlist

- `GET /api/wishlists`
- `POST /api/wishlists/:product_id`
- `DELETE /api/wishlists/:product_id`

### 📦 Orders

- `POST /api/orders` — Checkout (partial/full)
- `GET /api/orders` — List all user orders
- `GET /api/orders/:order_id` — Order detail

---

## 📂 Folder Structure

```
.
├── controllers/         # Handle request/response
├── services/            # Business logic
├── models/              # Sequelize models
├── routes/              # Route definitions
├── middlewares/         # Middleware (auth, error)
├── dto/                 # Format response (DTO)
├── utils/               # Helper functions
├── config/              # DB config, setup
└── migrations/          # DB migrations
```

---

## 📝 Notes

- Make sure all protected routes include the `Authorization: Bearer <token>` header.
- Ensure `product_id` and `address_id` are valid before ordering.
- Checkout process uses **transactions** to ensure data consistency.
- Wishlist and cart use product associations with eager loading for product info.

---

## 👤 Author

**Naza Zulfiqi**  
📧 Email: [zulfiqinaza@gmail.com](mailto:zulfiqinaza@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License**.

---

Happy coding & good luck with your project! 🚀

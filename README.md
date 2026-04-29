# 🛒 Grocify – Smart Grocery List App

Grocify is a simple and efficient grocery list app built using **React Native (Expo)** with a lightweight backend using **Node.js + Express**.
It helps users manage grocery items with categories, priorities, and purchase tracking.

---

## 🚀 Features

* ➕ Add grocery items
* 📦 Categorize items (Produce, Dairy, Bakery, etc.)
* 🔢 Update quantity
* ✅ Mark items as purchased
* 🗑️ Remove items
* ⚡ Real-time UI updates using Zustand
* 🌐 Backend API integration

---

## 🛠️ Tech Stack

### Frontend

* React Native (Expo)
* TypeScript
* Zustand (State Management)

### Backend

* Node.js
* Express.js
* REST API

---

## 📂 Project Structure

```
grocify/
├── src/
│   ├── components/
│   ├── store/
│   ├── screens/
│   └── utils/
├── app/
├── server.js
├── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/iamjayeshkr/grocify.git
cd grocify
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Start Backend Server

```
node server.js
```

Server will run at:

```
http://localhost:3000
```

---

### 4. Start Expo App

```
npx expo start
```

---

## 🌐 API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/items     | Get all items |
| POST   | /api/items     | Add new item  |
| PATCH  | /api/items/:id | Update item   |
| DELETE | /api/items/:id | Delete item   |

---

## 📱 Production Setup (APK)

For production, the backend must be hosted online (e.g., Render):

Update your API URL:

```
const BASE_URL = "https://your-backend-url.onrender.com";
```

---

## 🧠 Future Improvements

* 🔐 User authentication
* ☁️ Database integration (MongoDB / Firebase)
* 📊 Analytics & insights
* 🤖 AI-based expense suggestions
* 🛍️ Smart recommendations

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Jayesh Kumar**
GitHub: https://github.com/iamjayeshkr

---

⭐ If you like this project, don’t forget to star the repo!

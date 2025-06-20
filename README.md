# 🧑‍💻 Team Collaboration Board (Trello/Asana Clone)

A lightweight and efficient task collaboration app that allows users to manage boards and tasks visually — inspired by Trello and Asana. Built with the **MERN stack**, this project demonstrates backend design, frontend interactions, and full CRUD operations — all deployed on **Vercel**.

---

## 🔗 Live Demo

🌐 **Frontend + Backend Deployed on Vercel**  
👉 [Click here to view live project](https://collabboards-46m2.vercel.app/)

---

## 📌 Features

### 🚀 Boards

- Create new boards (e.g., “Frontend Tasks”, “Marketing Plan”)
- View all boards in a sidebar
- Switch between boards using sidebar navigation

### 📋 Tasks in Boards

Each task includes:

- ✅ Title (required)
- 📝 Description
- 🎯 Status: `"To Do"`, `"In Progress"`, `"Done"`
- ⚡ Priority: `"Low"`, `"Medium"`, `"High"`
- 👤 Assigned To (free text)
- 📅 Due Date

### 🧩 Board View

Inside each board:

- Tasks shown in **columns by status**
  - "To Do"
  - "In Progress"
  - "Done"

### ✨ Functionalities

- ➕ Create a task with a modal/form
- 🔄 Edit task inline or via modal
- 🗑️ Delete task
- 🔃 Update task status via dropdown (or drag and drop)
- 🎨 Show color-coded priority badges
- 📌 Sidebar for switching boards easily

---

## 🧰 Tech Stack

### ✅ Frontend

- **React.js**
- **Axios** (for API requests)
- **Tailwind CSS** (for minimal responsive UI)
- **React Router DOM**
- (Optional) `react-beautiful-dnd` for drag-and-drop

### ✅ Backend

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **dotenv** for environment configuration
- **CORS** for cross-origin resource sharing

---

## 📁 API Endpoints

### 🔹 Boards

- `GET /boards` – Get list of all boards
- `POST /boards` – Create a new board

### 🔸 Tasks

- `GET /boards/:id/tasks` – Get all tasks in a board
- `POST /boards/:id/tasks` – Create a new task in the board
- `PUT /tasks/:id` – Update a specific task
- `DELETE /tasks/:id` – Delete a task

---

# 📊 Student Attendance System (React)

A modern and responsive **Student Attendance Management System** built with React and Tailwind CSS. This application helps manage student records, track daily attendance, and export attendance data in Excel-compatible format — all without a backend.

---

## 🚀 Features

* 👨‍🎓 Add and manage students
* 📅 Mark daily attendance (Present / Absent)
* 📊 Real-time dashboard (Total, Present, Absent)
* 📁 Export attendance as CSV (Excel format) in one click
* 💾 Data persistence using Local Storage
* 🎨 Modern UI (Glassmorphism + Responsive Design)
* 📱 Fully responsive (Mobile + Desktop)

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** React Hooks
* **Storage:** Browser Local Storage

---

## 📂 Project Structure

```
src/
├── assets/
│── components/
│   ├── Sidebar.jsx
|   ├── Header.jsx
│   ├── StudentForm.jsx
│   ├── StudentTable.jsx
│   └── AttendanceTable.jsx
├── pages/
|   ├── Attendance.jsx
|   ├── Dashboard.jsx
|   └── Students.jsx
│── App.jsx
├── index.css
│── main.jsx
```

---

## ⚙️ How It Works

* Students are added through a form and stored in local storage.
* Attendance is marked daily and saved with timestamps.
* Dashboard dynamically calculates attendance stats.
* Export feature generates a CSV file for selected number of days.
* CSV file can be directly opened in **Microsoft Excel / Google Sheets**.

---

## 📤 Export Feature

* Select number of days
* Click **Export**
* Download attendance sheet instantly

✔️ Excel Compatible
✔️ Clean structured format
✔️ Includes all students and dates

---

## 📱 Responsive Design

* Mobile-friendly layout
* Sidebar transforms into slide drawer
* Tables support horizontal scroll on smaller screens

---

## 🔥 Future Improvements

* 🔍 Search & filter students
* ✏️ Edit / delete student
* 📊 Attendance percentage analytics
* ☁️ Backend integration (Node.js / MongoDB)
* 🔐 Authentication system

---

## 🧠 Learning Outcomes

* Built a complete React-based dashboard UI
* Implemented local storage data persistence
* Designed responsive and modern UI using Tailwind CSS
* Worked with dynamic data and CSV export functionality

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/attendance-system.git
cd attendance-system
npm install
npm run dev
```

---

## 💡 Note

This project is frontend-only and does not require any backend. All data is stored locally in the browser.

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute!

---

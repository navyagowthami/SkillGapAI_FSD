# 🚀 Skill Gap AI

## 📌 Overview

**Skill Gap AI** is an intelligent platform that bridges the gap between job requirements and candidate skills.
It not only connects users with recruiters but also helps candidates improve their skills through AI-based analysis and personalized learning recommendations.

---

## 🎯 Features

* 👤 **User & Recruiter Authentication**

  * Separate login and registration for users and recruiters

* 📄 **Resume Upload & Skill Extraction**

  * Users can upload resumes for analysis

* 🧠 **Skill Gap Analysis**

  * Identifies missing skills based on job requirements

* 🛣️ **Personalized Learning Roadmap**

  * Suggests a step-by-step plan to improve skills

* 🎥 **YouTube Resource Recommendations**

  * Provides relevant videos for learning

* 💼 **Job Posting System**

  * Recruiters can post and manage jobs

* 💬 **Real-Time Chat**

  * Direct communication between users and recruiters

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* HTML, CSS, JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Other Tools

* REST APIs
* JWT Authentication

---

## ⚙️ Project Structure

```
SkillGapAI/
│
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Business logic
│   ├── middleware/     # Authentication middleware
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   ├── server.js       # Entry point
│   └── seed.js         # Initial data
│
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── assets/     # Images
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global state (Auth)
│   │   ├── pages/      # Application pages
│   │   ├── App.jsx     # Main component
│   │   └── main.jsx    # Entry point
│
└── README.md
```

---

## 🚀 How It Works

1. User registers and logs in
2. Uploads resume
3. System extracts skills
4. Compares with job requirements
5. Identifies skill gaps
6. Generates roadmap + learning resources
7. User can apply and chat with recruiters

---

## ▶️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/SkillGapAI.git
cd SkillGapAI
```

### 2. Backend setup

```bash
cd backend
npm install
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 📈 Future Enhancements

* Advanced ML models for better analysis
* ATS score prediction
* Resume improvement suggestions
* Certification tracking system

---

## 👩‍💻 Author

* Navya Gowthami

---

## ⭐ Conclusion

Skill Gap AI is not just a job portal—it is a **career development platform** that helps users become job-ready by identifying and bridging their skill gaps.

## Project Demonstration Link 
https://drive.google.com/file/d/1WFW5nKt3kt30LLi3dPE8jltMzPARynta/view?usp=drivesdk 

## Code Explanation Link
https://drive.google.com/file/d/1ZiVMSVOeno1QkhApJ7-rIhyf1PAACs91/view?usp=sharing 

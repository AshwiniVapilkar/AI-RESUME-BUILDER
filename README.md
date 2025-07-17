In this project, React (with Vite) is used to build a fast, interactive user interface, allowing users to create resumes smoothly. Tailwind CSS handles styling, making the layout modern and responsive. Clerk manages user authentication, enabling secure sign-up and login features. The app integrates an AI service to automatically generate resume summaries based on user input. For backend storage, Strapi CMS is used to save and manage resume data. Together, these technologies create a full-stack, AI-enhanced resume builder that’s easy to use and deploy online.
# AI Resume Builder

An AI-powered resume builder that allows users to generate, preview, and download professional resumes with AI-generated summaries.

---

## 🚀 Features

- User sign-up/login with Clerk
- Dynamic resume creation with live preview
- AI-generated professional summaries
- PDF download and resume sharing
- Resume storage and management via CMS

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router
- Clerk (Authentication)

**Backend:**
- Strapi CMS
- REST API integration with frontend
- Stores user resumes and personal data
- Deployed separately from frontend

**AI:**
- AI API (Gemini AI)
---

## ⚙️ Installation

### Frontend
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
npm install
npm run dev

### Backend
cd resumellow/Strapi Backend/resumellow
npm install
npm run develop

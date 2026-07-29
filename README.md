```markdown
# 🎓 StudyPilot — Full-Stack Agentic AI Learning Platform

StudyPilot is an all-in-one, production-ready Agentic AI application designed to personalize, accelerate, and streamline student learning.
By combining multi-step AI agents with full-stack web technologies, StudyPilot offers autonomous content generation, intelligent context-aware study assistance, and seamless management of learning materials.

---

## ✨ Features At a Glance

### 🤖 Agentic AI Capabilities
* **AI Content Generator:** Custom multi-prompt workflows with customizable tone, length, and structured output formatting.
Built-in support for context-aware regeneration and draft refinement.
* **Context-Aware AI Chat Assistant:** Multi-turn conversational agent with chat memory, streaming responses, real-time typing indicators,
and auto-generated follow-up prompts tailored to user context.

### 🌐 Core Application Features
* **Landing Page & Navigation:** Clean 7+ section landing hero, responsive navigation with dynamic auth routes (3 public, 5 authenticated), and functional navigation structure.
* **Explore & Search:** Dynamic course/material catalog featuring multi-field filtering (category, price, rating), sorting, and infinite scrolling.
* **Detailed View Pages:** Rich media layouts, full specifications, breakdown overviews, and community reviews.
* **Item & Enrollment Management:** Dashboard allowing users to manage active items, delete, and inspect enrolled courses via structured data tables.
* **Protected Routes & Security:** Full JWT authentication coupled with Better Auth,Google Social Login, and dynamic client/server route protection.

---

## 🛠️ Technology Stack

### Frontend
* **Framework:** [Next.js] (App Router, Server Actions, TypeScript)
* **Styling:** [Tailwind CSS]
* **State & Data Fetching:** [TanStack Query]
* **Data Visualization:** [Recharts] / Chart.js

### Backend
* **Runtime & Framework:** [Node.js] & [Express.js] (TypeScript)
* **Database:** [MongoDB] (Mongoose ORM)
* **Authentication:** JWT & [Better Auth] (Google OAuth integration)

### AI Integration
* **LLM Engine:** [Google Gemini API]
---

## 🚀 Getting Started

Follow these steps to set up StudyPilot locally.

### Prerequisites

* **Node.js** v18.0 or higher
* **MongoDB** instance (local or MongoDB Atlas)
* **Google Gemini API Key**

---

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/study-pilot.git](https://github.com/your-username/study-pilot.git)
cd study-pilot

```

#### 2. Configure Server Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studypilot
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000

```

#### 3. Configure Client Environment Variables

Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

```

#### 4. Install Dependencies & Run Server

```bash
# In the root server directory
cd server
npm install
npm run dev

```

#### 5. Install Dependencies & Run Client

```bash
# In a new terminal window, navigate to client directory
cd client
npm install
npm run dev

```

The application will be running at **`http://localhost:3000`**.

---

## 🔒 Security & Route Protection

* **Client-Side:** Auth guards wrap protected routes to redirect unauthenticated users directly to `/login`.
* **Server-Side:** Custom JWT verification middleware protects express endpoints against unauthorized REST calls.
* **Demo Authentication:** Includes auto-fill capabilities on the login screen to permit smooth reviewer evaluation without requiring manual account registration.

---

## 🎨 UI & UX Standards

* **Design Palette:** Strict limit of 3 primary core colors with cohesive neutral backgrounds across dark/light elements.
* **Component Uniformity:** Standardized card aspect ratios, uniform border radii, and skeletal loading states powered by TanStack Query.
* **Layout Grid:** Desktop views adhere strictly to 4-card grid layouts with responsive degradation down to tablet and mobile viewports.

```

```

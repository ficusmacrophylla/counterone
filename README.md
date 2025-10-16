# 📊 CounterOne

A **full-stack text analysis application** that counts words, letters, spaces, and word occurrencies from text files or URLs. Built with **NestJS**, **Vue 3**, and **Docker** for easy deployment and scalability.

Application was built as showcase during an hackaton challenge, so it won't receive further updates.
---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running with Docker](#running-with-docker)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**CounterOne** is a text analysis tool that processes text files from multiple sources (local files or remote URLs) and provides detailed statistics including word count, letter count, spaces, and word frequency analysis. The application uses a clean **Factory Pattern** architecture to handle different data sources seamlessly.

---

## ✨ Features

- **Multi-Source Support:** Analyze text from local files or remote URLs
- **Comprehensive Statistics:** 
  - Total word count
  - Total letter count
  - Space count
  - Word occurrence frequency table
- **File Type Validation:** Supports `.txt`, `.text`, and `.md` files
- **Modern UI:** Clean, responsive interface built with Vue 3 and PrimeVue
- **Containerized Deployment:** Ready-to-deploy Docker setup
- **Real-time Feedback:** Toast notifications and error handling
- **Path Validation:** Client-side validation for file paths and URLs

---

## 🏗️ Architecture

CounterOne follows a **layered architecture** with clear separation of concerns:
```
┌─────────────────────────────────────────┐
│ Vue 3 Frontend (UI) │
│ (PrimeVue, Axios, RxJS) │
└──────────────┬──────────────────────────┘
│ HTTP/REST API
┌──────────────▼──────────────────────────┐
│ NestJS Backend (API) │
│ ┌─────────────────────────────────┐ │
│ │ Factory Pattern Layer │ │
│ │ ┌────────────┬────────────┐ │ │
│ │ │ URL │ File │ │ │
│ │ │ DataSource │ DataSource │ │ │
│ │ └────────────┴────────────┘ │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

The backend implements the **Factory Design Pattern** to abstract data retrieval from different sources, making it easy to add new data source types in the future.

---

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **PrimeVue** - Rich UI component library
- **PrimeFlex** - CSS utility framework
- **Axios Observable** - HTTP client with RxJS support
- **Vue Router** - Client-side routing

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe server development
- **RxJS** - Reactive programming
- **Axios** - HTTP client for URL fetching
- **Node.js File System** - Local file operations

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

---

## 🚀 Getting Started

### Prerequisites

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Node.js** (v18+) - only if running without Docker
- **npm** or **yarn** - only if running without Docker

### Installation

1. **Clone the repository:**
git clone https://github.com/ficusmacrophylla/counterone.git
cd counterone

2. **Set up environment variables:**

Create a `.env` file in the `counterone-backend` directory:
PORT=3000
NODE_ENV=development


3. **Create a files directory** (for local file analysis):
mkdir -p files


### Running with Docker

The easiest way to run CounterOne is using Docker Compose:

Build and start both frontend and backend
docker-compose up --build

Run in detached mode
docker-compose up -d

Stop services
docker-compose down


**Service URLs:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

### Running Manually (Without Docker)

**Backend:**
cd counterone-backend
npm install
npm run start:dev


**Frontend:**
cd counterone-ui
npm install
npm run dev


---

## 📖 Usage

1. **Access the application** at `http://localhost:5173`

2. **Choose your input method:**
   - **Local File:** Enter a file path (e.g., `sample.txt`)
     - Place your text files in the `files` directory
     - Supported formats: `.txt`, `.text`, `.md`
   - **URL:** Enter a full URL (e.g., `https://example.com/document.txt`)

3. **Submit the request** and view the analysis results:
   - Word count
   - Letter count
   - Space count
   - Word frequency table

---

## 📁 Project Structure
```
counterone/
├── counterone-backend/ # NestJS backend
│ ├── src/
│ │ ├── datasource/ # Factory pattern implementation
│ │ │ ├── datasource-interface.ts
│ │ │ ├── datasource-factory-interface.ts
│ │ │ ├── datasource-url-factory.ts
│ │ │ ├── datasource-file-factory.interface.ts
│ │ │ ├── url-datasource.ts
│ │ │ └── file-datasource.ts
│ │ └── main.ts
│ ├── files/ # Local text files storage
│ ├── Dockerfile.backend
│ └── package.json
├── counterone-ui/ # Vue 3 frontend
│ ├── src/
│ │ ├── components/
│ │ ├── models/
│ │ │ └── base.model.ts
│ │ ├── services/
│ │ │ └── common.service.ts
│ │ ├── router/
│ │ │ └── index.ts
│ │ ├── App.vue
│ │ └── main.ts
│ ├── Dockerfile.app
│ └── package.json
├── files/ # Shared files volume
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Documentation

### Endpoint: Process File

**URL:** `POST /provide/process`

**Request Body:**
{
"FileLocation": "sample.txt"
}

or

{
"FileLocation": "https://example.com/document.txt"
}


**Response:**
{
  "wordCount": 150,
  "spacesCount": 149,
  "lettersCount": 750,
  "wordOccurrencies": [
    { "word": "example", "occurrencies": 5 },
    { "word": "text", "occurrencies": 3 }
  ]
}


**Error Responses:**
- `400 Bad Request` - Invalid file type
- `404 Not Found` - File does not exist
- `500 Internal Server Error` - Unable to retrieve file

---

## 🗺️ Roadmap

### Current Version (v1.0)
- ✅ Multi-source file processing (URL & local files)
- ✅ Text analysis with word frequency
- ✅ Docker containerization
- ✅ Vue 3 + PrimeVue UI

### Future Possibile Enhancements

**v1.1**
- Add PDF file support
- Character encoding detection
- RESTful API with Swagger documentation

**v1.2**
- User authentication and file history
- Batch file processing
- 
**v1.3**
- Cloud storage integration (S3, Google Drive)
- WebSocket for real-time processing updates
- API rate limiting and caching

**v2.0**
- Multi-language support
- Machine learning-based text classification

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**ficusmacrophylla**

- GitHub: [@ficusmacrophylla](https://github.com/ficusmacrophylla)

---

## 🙏 Acknowledgments

- NestJS team for the excellent framework
- Vue.js community for Vue 3
- PrimeVue for the beautiful UI components

---


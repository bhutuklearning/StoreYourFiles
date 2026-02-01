# StoreYourFiles - File Browser Frontend

A modern, feature-rich file browser web application built with React and Vite. This project provides an intuitive interface for browsing, viewing, and managing files from a file system server.

## Project Overview

This application was built as a technical assignment demonstrating full-stack development capabilities with React and FastAPI backend integration. It showcases modern web development practices, clean UI/UX design, and robust state management.

## Features

### Core Functionality
- ** File Listing** - Browse files and directories with detailed metadata
- ** File Details** - View comprehensive file information including:
  - File name and type
  - File size (with human-readable formatting)
  - Last modified timestamp
  - Full file path
- ** Refresh** - Manual refresh capability to reload file listings
- ** Navigation** - Breadcrumb navigation for easy directory traversal

### UI/UX Features
- ** Theme Switching** - Toggle between Light and Dark modes
  - Light theme with `#0077b6` brand color
  - Dark theme with `#03045e` deep blue background
  - Persistent theme preference via localStorage
- ** Responsive Design** - Mobile-friendly interface with Tailwind CSS
- ** Loading States** - Smooth loading indicators for better UX
- ** Error Handling** - Graceful error states with retry functionality
- ** Empty States** - Informative empty state displays

### Authentication
- ** Secure Login** - JWT-based authentication
- ** User Session** - Persistent login with token management
- ** Logout** - Clean session termination

##  Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Backend**: FastAPI (File Browser Server)

##  Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Running File Browser backend server (on `http://localhost:8080`)

##  Getting Started

### Installation

1. **Clone the repository**
   ```bash
   cd filebrowser-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Backend Setup

Ensure the File Browser backend is running on `http://localhost:8080`. The frontend is configured to proxy API requests to this endpoint.

##  Project Structure

```
filebrowser-frontend/
├── src/
│   ├── api/              # API configuration
│   │   └── http.js       # Axios instance with interceptors
│   ├── components/       # React components
│   │   ├── common/       # Reusable components (Loader, ErrorState, etc.)
│   │   ├── files/        # File-related components
│   │   └── layout/       # Layout components (AppLayout)
│   ├── pages/            # Page components
│   │   ├── FilesPage.jsx
│   │   ├── FileDetailPage.jsx
│   │   └── LoginPage.jsx
│   ├── routes/           # Routing configuration
│   ├── services/         # API service layer
│   ├── store/            # Zustand state management
│   ├── utils/            # Utility functions
│   └── index.css         # Global styles and theme
├── vite.config.js        # Vite configuration
└── package.json
```

##  Theme Customization

The application supports dynamic theming with two modes:

- **Light Mode**: Clean, bright interface with `#0077b6` primary color
- **Dark Mode**: Elegant dark interface with `#03045e` background

Theme preference is automatically saved and persists across sessions.

##  Authentication

The application uses JWT-based authentication:

1. Login with credentials at `/login`
2. Token is stored in `localStorage` as `fb_token`
3. All API requests include the token in the `Authorization` header
4. Automatic redirect to login on 401 responses

## 📡 API Integration

The frontend communicates with the File Browser backend via REST API:

- **Base URL**: `/api` (proxied to `http://localhost:8080`)
- **Authentication**: Bearer token in headers
- **Endpoints**:
  - `POST /api/login` - User authentication
  - `GET /api/resources` - List files and directories
  - `HEAD /api/raw` - Get file size information

##  Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

##  Assignment Requirements Met

 **File Listing Screen**
- Fetches and displays files from the server
- Shows file name, size, and last modified timestamp
- Implements loading, error, and empty states

 **File Detail Screen**
- Displays detailed metadata on file selection
- Shows file path, type, size, and modification date
- Clean, organized presentation

 **Refresh Functionality**
- Manual refresh button in toolbar
- Reloads file listing on demand

 **State Management**
- Proper loading states during API calls
- Error handling with retry capability
- Empty state when no files exist

## 🌟 Additional Features

Beyond the core requirements, this project includes:

- **Theme Switching** - Light/Dark mode toggle
- **Responsive Design** - Works on all screen sizes
- **Modern UI** - Clean, professional interface with smooth animations
- **Breadcrumb Navigation** - Easy directory traversal
- **User Session Management** - Persistent login state
- **Error Boundaries** - Graceful error handling

##  Configuration

### Vite Proxy Configuration

The development server proxies API requests to avoid CORS issues:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```




## 🐳 Docker Support

You can containerize the frontend application using Docker.

### Prerequisites

- Docker installed on your machine.

### Build the Image

```bash
docker build -t filebrowser-frontend .
```

### Run the Container

```bash
docker run -p 5173:80 filebrowser-frontend
```

Now access the application at `http://localhost:5173`.

**Note:** The default Nginx configuration assumes the backend is running at `http://host.docker.internal:8080` (standard for Docker Desktop on Windows/Mac). If you require a different backend URL, you may need to adjust `nginx.conf`.

## 👨‍💻 Author

Amritanshu Goutam

---

**Note**: This is a frontend application that requires the File Browser backend server to be running. Ensure the backend is accessible at `http://localhost:8080` before starting the frontend.

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter } from "react-router-dom"
import { createRoutesFromElements, Route, RouterProvider } from "react-router"

// Files
import "./index.css"
import App from "./App.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import ProtectRoute from "./components/ProtectRoute.jsx"
import ProtectRouteFromAuth from "./components/ProtectRouteFromAuth.jsx"
import AuthContextProvider from "./context/authContext.jsx"
import ChatSection from "./components/chat section/ChatSection.jsx"
import Profile from "./pages/Profile.jsx"
import NotFound from "./pages/NotFound.jsx"
import AddChat from "./pages/AddChat.jsx"
import { ChatContextProvider } from "./context/chatContext.jsx"

// Creating routers
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      {/* protected Routes from Unauthenticated users */}
      <Route
        path=""
        element={<ProtectRoute />}
      >
        <Route
          path="/"
          element={<Home />}
        >
          <Route
            path="/"
            element={<ChatSection />}
          />
          <Route
            path="addchat"
            element={<AddChat />}
          />
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>
      </Route>

      {/* protected Routes from Authenticated users */}
      <Route
        path=""
        element={<ProtectRouteFromAuth />}
      >
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <RouterProvider router={router} />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

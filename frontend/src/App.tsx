import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatApp from "./pages/ChatApp";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* // Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* // Protected route */}
          <Route path="/" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SendMoney from "./pages/SendMoney"; 
import ReceiveMoney from "./pages/ReceiveMoney";
import PayBills from "./pages/PayBills";
import MobileTopup from "./pages/MobileTopup";


function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Login />} />

      {/* Auth routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Send Money */}
      <Route path="/send" element={<SendMoney />} />
      {/* Receive Money */}
      <Route path="/receive" element={<ReceiveMoney />} />

      {/* Pay Bills*/}
      <Route path="/bills" element={<PayBills />} />

      {/* Mobile Topup*/}
      <Route path="/topup" element={<MobileTopup />} />


      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;

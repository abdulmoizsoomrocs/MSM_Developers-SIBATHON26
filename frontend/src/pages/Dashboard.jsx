import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import ExpenseAnalytics from "../components/ExpenseAnalytics";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

useEffect(() => {
  const fetchTransactions = async () => {
    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    if (!user) {
      console.log("No user session");
      return;
    }

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    console.log("Transactions:", data);
  };

  fetchTransactions();
}, []);


  return (
    <div className="min-h-screen bg-[#071a13] text-white font-sans flex flex-col">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0c241a]/70 border-b border-green-500/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
              💰
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              FinFlow
            </h1>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold">Abdul Moiz</p>

             
            </div>

            <div className="w-10 h-10 rounded-full border-2 border-green-400 overflow-hidden">
              <img
                src="/images/avatar.jpg"
                
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gear Icon */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="hidden sm:block w-10 h-10 rounded-full hover:bg-green-400/10 transition"
            >
              ⚙️
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-10 py-6 md:py-8 space-y-8">

        {/* Welcome */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
            Welcome back, Abdul Moiz 👋
          </h2>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            Here's what's happening with your money today.
          </p>
        </div>

      {/* Balance + Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">

        {/* Balance Card - Primary Focus (40% on lg, 50% on md, 100% on mobile) */}
        <div className="lg:col-span-2 relative rounded-3xl p-6 md:p-8 overflow-hidden bg-gradient-to-br from-[#0f3b2b] via-[#0b2e22] to-[#062017] shadow-2xl border border-green-500/15 h-full flex flex-col justify-between">
          
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-400 opacity-8 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-500 opacity-5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Label */}
            <div className="mb-8">
              <p className="text-green-400/70 text-xs font-semibold uppercase tracking-wider">
                Total Available Balance
              </p>
            </div>

            {/* Balance Amount */}
            <div className="mb-8">
              <h2 className="text-6xl md:text-7xl font-black tracking-tight leading-none">
                $24,500
              </h2>
              <p className="text-green-400/60 text-lg mt-2">USD</p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 pt-6 border-t border-green-500/10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30">
                  <span className="text-green-300 text-sm font-semibold">↑ 12.5%</span>
                </div>
              </div>
              <p className="text-white/40 text-xs">
                Updated 2 mins ago
              </p>
            </div>
          </div>
        </div>

        {/* Expense Analytics - Secondary Focus (60% on lg, 50% on md, 100% on mobile) */}
        <div className="lg:col-span-3 h-full">
          <ExpenseAnalytics />
        </div>

      </div>


        {/* Quick Actions */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-green-400/60 mb-4">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/send")}
              className="bg-[#0c241a] border border-green-500/20 p-5 rounded-3xl hover:bg-[#113528] transition text-sm font-semibold"
            >
              📤 Send Money
            </button>

            <button
              onClick={() => navigate("/receive")}
              className="bg-[#0c241a] border border-green-500/20 p-5 rounded-3xl hover:bg-[#113528] transition text-sm font-semibold"
            >
              📥 Receive Money
            </button>

            <button
              onClick={() => navigate("/bills")}
              className="bg-[#0c241a] border border-green-500/20 p-5 rounded-3xl hover:bg-[#113528] transition text-sm font-semibold"
            >
              💳 Pay Bills
            </button>

            <button
              onClick={() => navigate("/topup")}
              className="bg-[#0c241a] border border-green-500/20 p-5 rounded-3xl hover:bg-[#113528] transition text-sm font-semibold"
            >
              📱 Mobile Top-up
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h3>

          <div className="space-y-2">
            <RecentTransaction name="Spotify Subscription" amount="-12.99" date="Today" />
            <RecentTransaction name="Salary Deposit" amount="+3500.00" date="Oct 24" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-white/40 text-sm border-t border-white/5">
        © 2026 FinFlow Technologies Inc.
      </footer>

      {/* Overlay */}
      {isProfileOpen && (
        <div
          onClick={() => setIsProfileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Profile Drawer */}
      <div
        className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-[#071a13] border-l border-green-500/20 z-50 transform transition-transform duration-300 ${
          isProfileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ProfileDrawer
          onClose={() => setIsProfileOpen(false)}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function RecentTransaction({ name, amount, date }) {
  const isPositive = amount.startsWith("+");

  return (
    <div className="flex justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-white/50">{date}</p>
      </div>
      <p className={`font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {amount}
      </p>
    </div>
  );
}

function ProfileDrawer({ onClose, onLogout }) {
  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold">Profile</h2>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Profile Info */}
      <div className="space-y-4">

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-xs text-green-400 uppercase mb-1">Full Name</p>
          <p className="font-semibold text-lg">Abdul Moiz</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-xs text-green-400 uppercase mb-1">Email</p>
          <p className="text-sm text-white/70">
            abdulmoizsoomrocs@gmail.com
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-xs text-green-400 uppercase mb-1">Phone</p>
          <p className="text-sm text-white/70">
            03173499972
          </p>
        </div>

      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-auto w-full px-4 py-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 font-bold hover:bg-red-500/30 transition"
      >
        🚪 Logout
      </button>
    </div>
  );
}

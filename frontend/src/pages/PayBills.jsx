import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";


export default function PayBills() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen bg-[#071a13] text-white flex flex-col">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#071a13]/70 border-b border-green-500/10 px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            aria-label="Go back to dashboard"
            className="p-2 rounded-xl bg-green-400/10 text-green-400 hover:bg-green-400/20 active:scale-95 transition"
          >
            ←
          </button>
          <h1 className="text-lg md:text-xl font-bold">
            Pay Bills
          </h1>
        </div>

        <button
          aria-label="Scheduled payments"
          className="p-2 rounded-xl bg-green-400/10 text-green-400 hover:bg-green-400/20 active:scale-95 transition"
        >
          ⏳
        </button>
      </header>

      <main className="flex-1 px-4 md:px-6 py-6 space-y-8 pb-32 max-w-md mx-auto w-full">

        {/* CATEGORIES */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-green-400/60 mb-4">
            Categories
          </h2>

          <div className="grid grid-cols-4 gap-3">
            {["Power", "Water", "Internet", "Cards"].map((item) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square rounded-2xl md:rounded-3xl bg-white/5 border border-green-400/10 flex items-center justify-center text-2xl md:text-3xl hover:bg-white/10 active:scale-95 transition duration-200">
                  {item === "Power" && "⚡"}
                  {item === "Water" && "💧"}
                  {item === "Internet" && "📶"}
                  {item === "Cards" && "💳"}
                </div>
                <span className="text-xs font-medium text-center">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PAYMENT FORM */}
        <section className="bg-green-400/5 rounded-3xl p-6 md:p-8 border border-green-400/10 space-y-6">

          <div>
            <label htmlFor="provider" className="text-xs text-slate-400 block mb-2 font-medium">
              Select Provider
            </label>
            <select
              id="provider"
              className="w-full bg-[#071a13] border border-green-400/20 rounded-2xl px-4 py-3 md:py-4 text-sm md:text-base outline-none focus:ring-2 focus:ring-green-400/50 transition"
            >
              <option>K-Electric</option>
              <option>SEPCO</option>
              <option>Hepco</option>

            </select>
          </div>

          <div>
            <label htmlFor="bill-amount" className="text-xs text-slate-400 block mb-2 font-medium">
              Enter Amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-green-400">
                $
              </span>

              <input
                id="bill-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#071a13] border border-green-400/20 rounded-2xl pl-10 pr-4 py-4 md:py-5 text-2xl md:text-3xl font-bold focus:ring-2 focus:ring-green-400/50 outline-none transition"
              />
            </div>
          </div>

        </section>

        {/* UPCOMING BILLS */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-green-400/60">
              Upcoming Due
            </h2>
            <button className="text-xs font-bold text-green-400 hover:text-green-300 transition">
              View All
            </button>
          </div>

          <BillItem
            title="Fiber Internet"
            due="Due in 3 days"
            amount="$65.00"
            status="Pending"
          />

          <BillItem
            title="City Water"
            due="Due in 5 days"
            amount="$42.10"
            status="Scheduled"
          />

        </section>

      </main>

      {/* BOTTOM BUTTON */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:p-6 backdrop-blur-xl bg-[#071a13]/95 border-t border-green-400/20">
        <div className="max-w-md mx-auto">
          <button className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:opacity-90 active:scale-95 py-4 md:py-5 rounded-2xl text-[#071a13] font-bold text-base md:text-lg shadow-lg transition-all duration-200">
            Pay Now →
          </button>
        </div>
      </div>

    </div>
  );
}

function BillItem({ title, due, amount, status }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 mb-3 hover:bg-white/10 transition-colors duration-200">
      <div>
        <p className="font-bold text-sm md:text-base">{title}</p>
        <p className="text-xs text-slate-400 mt-1">{due}</p>
      </div>

      <div className="text-right">
        <p className="font-bold text-sm md:text-base">{amount}</p>
        <p className="text-[10px] uppercase font-bold" style={{ color: status === "Pending" ? "#f97316" : "#fbbf24" }}>
          {status}
        </p>
      </div>
    </div>
  );
}

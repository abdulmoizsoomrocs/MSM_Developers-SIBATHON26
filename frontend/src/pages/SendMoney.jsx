import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SendMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      // 🔐 Get logged-in user
      const { data, error: userError } = await supabase.auth.getUser();
      const user = data?.user;

      if (userError || !user) {
        setError("User not authenticated. Please log in again.");
        setLoading(false);
        return;
      }

      console.log("User ID:", user.id);
      console.log("Amount:", parseFloat(amount));

      // 📦 Insert transaction
      const { data: insertData, error: insertError } = await supabase
        .from("transactions")
        .insert([
          {
            user_id: user.id,
            title: "Send Money",
            amount: parseFloat(amount),
            type: "expense",
          },
        ]);

      if (insertError) {
        setError(`Failed to create transaction: ${insertError.message}`);
        console.error("Insert error:", insertError);
        setLoading(false);
        return;
      }

      console.log("Transaction created:", insertData);
      setSuccess(true);

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Catch error:", err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#071a13] text-white font-sans relative flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-[#071a13]/70 border-b border-green-500/10">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          aria-label="Go back to dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500/10 active:scale-95 transition"
        >
          ←
        </button>

        <h1 className="text-lg font-bold">Send Money</h1>

        <button
          type="button"
          aria-label="Help"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500/10 active:scale-95 transition"
        >
          ℹ️
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 md:px-6 py-6 space-y-6 pb-32">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-4 text-green-300 text-sm">
            ✓ Transaction created successfully! Redirecting...
          </div>
        )}

        {/* FORM CARD */}
        <section className="bg-[#0d261d] rounded-3xl p-6 md:p-8 border border-green-500/10 shadow-2xl space-y-5">
          {/* Recipient Name */}
          <div>
            <label htmlFor="recipient-name" className="text-xs font-semibold text-green-400 uppercase ml-1 block">
              Recipient Name
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400/60 text-lg">
                👤
              </span>
              <input
                id="recipient-name"
                type="text"
                placeholder="Search by name or email"
                className="w-full bg-[#122d23] rounded-2xl py-3 md:py-4 pl-12 pr-4 text-sm md:text-base focus:ring-2 focus:ring-green-400/50 outline-none transition"
              />
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label htmlFor="account-number" className="text-xs font-semibold text-green-400 uppercase ml-1 block">
              Account Number
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400/60 text-lg">
                🏦
              </span>
              <input
                id="account-number"
                type="text"
                placeholder="0000 0000 0000"
                className="w-full bg-[#122d23] rounded-2xl py-3 md:py-4 pl-12 pr-4 tracking-widest font-mono text-sm md:text-base focus:ring-2 focus:ring-green-400/50 outline-none transition"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="text-xs font-semibold text-green-400 uppercase ml-1 block">
              Amount
            </label>
            <div className="relative mt-2">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-green-400">
                $
              </div>

              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading || success}
                placeholder="0.00"
                className="w-full bg-[#122d23] rounded-2xl py-4 md:py-6 pl-12 pr-4 text-2xl md:text-3xl font-bold focus:ring-2 focus:ring-green-400/50 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-400/10 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-green-400 uppercase">
                  USD
                </span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="text-xs font-semibold text-green-400 uppercase ml-1 block">
              Add Note (Optional)
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-4 text-green-400/60 text-lg">
                📝
              </span>
              <textarea
                id="note"
                rows="2"
                placeholder="What's this for?"
                className="w-full bg-[#122d23] rounded-2xl pt-4 pl-12 pr-4 text-sm md:text-base resize-none focus:ring-2 focus:ring-green-400/50 outline-none transition"
              />
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="bg-green-400/5 rounded-3xl p-6 md:p-8 border border-green-400/20 space-y-4">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="text-lg">✓</span>
            Transaction Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Transfer Fee</span>
              <span className="text-green-400 font-medium">Free</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Arrival</span>
              <span>Instant</span>
            </div>

            <div className="pt-3 border-t border-green-400/10 flex justify-between items-center">
              <span className="text-base font-semibold">Total Amount</span>
              <span className="text-2xl md:text-3xl font-bold text-green-400">
                ${amount || "0.00"}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 backdrop-blur-xl bg-[#071a13]/95 border-t border-green-400/20">
        <div className="max-w-md mx-auto space-y-3">
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:opacity-90 active:scale-95 text-[#071a13] font-bold text-base md:text-lg py-4 md:py-5 rounded-2xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : success ? "✓ Success" : "Confirm Transfer →"}
          </button>

          <p className="text-[10px] md:text-xs text-center text-slate-500 uppercase tracking-widest">
            Secure Bank-to-Bank Encrypted Transfer
          </p>
        </div>
      </div>
    </form>
  );
}

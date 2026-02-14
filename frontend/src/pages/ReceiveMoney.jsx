import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";


export default function ReceiveMoney() {
  const navigate = useNavigate();

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("0012 4456 9981");
    alert("Account number copied to clipboard!");
  };

  const handleShareQR = () => {
    alert("Share feature - integrate with share API");
  };

  const handleSaveImage = async () => {
    const link = document.createElement("a");
    link.href = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FinFlowAccount001244569981";
    link.download = "finflow-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#071a13] text-white font-sans flex flex-col">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#071a13]/70 border-b border-green-500/10 px-4 md:px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          aria-label="Go back to dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-400/10 text-green-400 hover:bg-green-400/20 active:scale-95 transition"
        >
          ←
        </button>

        <h1 className="text-lg font-semibold">
          Receive Money
        </h1>

        <button
          aria-label="More options"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-400/10 text-green-400 hover:bg-green-400/20 active:scale-95 transition"
        >
          ⋯
        </button>
      </nav>

      <main className="flex-1 max-w-md mx-auto w-full px-4 md:px-6 py-6 space-y-8 pb-6">

        {/* Title */}
        <div className="text-center space-y-2 pt-4">
          <h2 className="text-2xl md:text-3xl font-bold">Scan to Pay</h2>
          <p className="text-slate-400 text-sm md:text-base">
            Show this QR code to the sender to receive instant payment
          </p>
        </div>

        {/* QR Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">

          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">

            <div className="bg-white p-3 md:p-4 rounded-xl mb-6 md:mb-8 shadow-lg">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FinFlowAccount001244569981"
                alt="QR Code for receiving money"
                className="w-40 h-40 md:w-48 md:h-48"
              />
            </div>

            <div className="w-full space-y-4 text-center">
              <span className="text-xs uppercase tracking-widest text-slate-500 block">
                Your Account Number
              </span>

              <p className="text-xl md:text-2xl font-mono font-bold break-all">
                0012 • 4456 • 9981
              </p>

              {/* Buttons */}
              <div className="flex flex-col space-y-3 pt-4">

                <button
                  onClick={handleCopyAccount}
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:opacity-90 active:scale-95 text-[#071a13] font-bold py-3 md:py-4 rounded-xl transition-all duration-200"
                >
                  Copy Account Number
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleShareQR}
                    className="bg-green-400/10 hover:bg-green-400/20 active:scale-95 text-green-400 py-3 rounded-xl border border-green-400/20 font-medium transition-all duration-200"
                  >
                    Share QR
                  </button>

                  <button
                    onClick={handleSaveImage}
                    className="bg-green-400/10 hover:bg-green-400/20 active:scale-95 text-green-400 py-3 rounded-xl border border-green-400/20 font-medium transition-all duration-200"
                  >
                    Save Image
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Recent Deposits */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Recent Deposits
            </h3>
            <button className="text-green-400 text-sm font-medium hover:text-green-300 transition">
              View All
            </button>
          </div>

          <Transaction
            name="Alex Thompson"
            time="Today, 2:45 PM"
            amount="+$450.00"
          />

          <Transaction
            name="Cloud Services LLC"
            time="Yesterday, 11:20 AM"
            amount="+$1,200.00"
          />

          <Transaction
            name="Sarah Jenkins"
            time="Oct 24, 09:15 AM"
            amount="+$85.50"
          />
        </div>

        {/* Info Box */}
        <div className="bg-green-400/5 border border-green-400/20 rounded-2xl p-4">
          <p className="text-xs md:text-sm text-slate-400">
            Funds usually arrive within seconds. Please ensure the sender uses the correct account details.
          </p>
        </div>

      </main>
    </div>
  );
}

function Transaction({ name, time, amount }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200">
      <div>
        <p className="font-semibold text-sm md:text-base">{name}</p>
        <p className="text-xs text-slate-500 mt-1">{time}</p>
      </div>

      <p className="text-green-400 font-bold text-sm md:text-base">{amount}</p>
    </div>
  );
}

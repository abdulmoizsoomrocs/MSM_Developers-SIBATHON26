import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // clear field error while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validation = validateForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // Insert directly into users table
    const { error } = await supabase.from("users").insert([
      {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // ⚠ plain text (for demo only)
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Registration successful!");
    setLoading(false);
    navigate("/");
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    // allow +, spaces, dashes and digits; require 7-15 digits
    const digits = phone.replace(/[^0-9]/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  function validatePassword(pw) {
    // min 8 chars, at least one upper, lower, number
    return /(?=.{8,})/.test(pw) && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw);
  }

  function validateForm(data) {
    const e = {};
    if (!data.fullName || data.fullName.trim().length < 2) e.fullName = "Enter your full name";
    if (!data.email || !validateEmail(data.email)) e.email = "Enter a valid email address";
    if (!data.phone || !validatePhone(data.phone)) e.phone = "Enter a valid phone number";
    if (!data.password || !validatePassword(data.password))
      e.password = "Password must be at least 8 characters and include upper, lower and number";
    if (data.password !== data.confirmPassword) e.confirmPassword = "Passwords do not match";

    return { valid: Object.keys(e).length === 0, errors: e };
  }

  return (
    <div className="relative min-h-screen flex bg-[#071a13] overflow-hidden text-white font-sans">

      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight">
          FinTech Plus
        </h2>

        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-black leading-tight">
            Join the future of{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              finance.
            </span>
          </h1>

          <p className="text-white/70 text-lg">
            Seamless digital banking with real-time insights, powerful tools,
            and enterprise-grade security.
          </p>
        </div>

        <div className="flex gap-10 text-sm text-white/70">
          <Stat number="50k+" label="Active Users" />
          <Stat number="4.9/5" label="App Rating" />
          <Stat number="24/7" label="Support" />
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10">

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold">
              Create Account
            </h2>
            <p className="text-white/60 mt-2 text-sm">
              Start managing your finances smarter today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="John Doe"
              handleChange={handleChange}
              value={formData.fullName}
              error={errors.fullName}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@example.com"
              handleChange={handleChange}
              value={formData.email}
              error={errors.email}
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              handleChange={handleChange}
              value={formData.phone}
              error={errors.phone}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                handleChange={handleChange}
                value={formData.password}
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                handleChange={handleChange}
                value={formData.confirmPassword}
                error={errors.confirmPassword}
              />
            </div>

            <div className="flex items-start gap-3 pt-2 text-sm text-white/70">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 accent-green-500"
                required
              />
              <p>
                I agree to the{" "}
                <span className="text-green-400 font-semibold hover:underline">
                  Terms
                </span>{" "}
                and{" "}
                <span className="text-green-400 font-semibold hover:underline">
                  Privacy Policy
                </span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 font-bold rounded-2xl shadow-xl hover:shadow-green-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

          <div className="mt-8 text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link to="/" className="text-green-400 font-bold hover:underline">
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

function Input({ label, name, type, placeholder, handleChange, value, error }) {
  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-sm font-semibold text-white/80">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className={`w-full px-4 py-3 rounded-xl bg-white/10 border focus:border-green-400 focus:ring-2 focus:ring-green-400/30 outline-none transition-all duration-300 group-hover:border-white/40 ${
          error ? "border-red-400" : "border-white/20"
        }`}
      />
      {error ? <p className="text-red-300 text-xs mt-1">{error}</p> : null}
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="space-y-1">
      <p className="text-2xl font-bold text-white">
        {number}
      </p>
      <p>{label}</p>
    </div>
  );
}

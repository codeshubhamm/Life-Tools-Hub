import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function SupportMe() {
  return (
    <div className="min-h-screen bg-[#f8e8d7] flex flex-col justify-between px-2 py-8" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive, sans-serif' }}>
      {/* Small Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-20 bg-white/80 hover:bg-white/90 text-gray-800 shadow rounded-full p-2 flex items-center gap-1 text-sm"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
        {/* Left: QR Code Card */}
        <div className="bg-black rounded-2xl p-10 flex flex-col items-center justify-center w-full max-w-sm md:max-w-md shadow-xl min-h-[28rem]">
          <img
            src="/Phonepay QR Code.png"
            alt="PhonePe QR Code"
            className="w-80 h-80 md:w-96 md:h-96 object-contain rounded-lg"
            style={{ display: 'block', margin: '6px auto 0 auto' }}
          />
        </div>
        {/* Right: Info Section */}
        <div className="flex-1 flex flex-col items-center justify-center w-full h-full" style={{ minHeight: '28rem' }}>
          <img
            src="/asthetic profile.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow mb-4"
            style={{ marginTop: '7px' }}
          />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 flex items-center gap-2 text-center">Heyy there, it's me SHUBHAMM <span className="text-2xl">👋</span></h2>
          <p className="text-lg md:text-xl text-gray-800 mb-4 text-center" style={{ fontWeight: 500 }}>
            This site isn’t backed by a company. There’s no big team, no funding, no investors — just me, a laptop, and a dream held together by late nights and cheap coffee. <span className="inline-block">☕💻</span>
          </p>
          <p className="text-lg md:text-xl text-gray-800 mb-4 text-center" style={{ fontWeight: 500 }}>
            If this space felt helpful, calming, or simply “worth it,” a small donation would mean the world.
          </p>
          <p className="text-lg md:text-xl text-gray-800 mb-4 text-center" style={{ fontWeight: 500 }}>
            It’s not just money — it’s motivation. It tells me, “Hey, this matters.”
          </p>
          <p className="text-lg md:text-xl text-gray-800 mb-4 text-center" style={{ fontWeight: 500 }}>
            Scan the QR below and be the reason this quiet little project keeps growing. <span className="inline-block">🌱</span>
          </p>
          <p className="text-lg md:text-xl text-gray-800 mb-2 text-center" style={{ fontWeight: 500 }}>
            You’re not just supporting a website — you’re fueling heart, hope, and hustle. <span className="inline-block">💖</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
} 
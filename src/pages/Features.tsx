import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    emoji: "🧰",
    title: "Access 20+ daily-use tools without any signups.",
    description: "A growing collection of calculators, planners, generators, and more — all free, no registration needed."
  },
  {
    emoji: "⚡️",
    title: "Generate resumes, planners, and letters instantly.",
    description: "Create essential documents in seconds, ready to use or share."
  },
  {
    emoji: "📄",
    title: "Download-ready PDFs with clean, professional layouts.",
    description: "Export your work in beautiful, print-friendly formats."
  },
  {
    emoji: "🎨",
    title: "Modern, pastel UI built for focus and simplicity.",
    description: "Enjoy a distraction-free, visually calming experience."
  },
  {
    emoji: "📱",
    title: "Fully responsive design that works seamlessly on all devices.",
    description: "Use Life Tools Hub on your phone, tablet, or desktop — always smooth."
  },
  {
    emoji: "🚀",
    title: "Fast, smooth interactions with subtle animations.",
    description: "Everything feels instant, with delightful micro-interactions."
  },
  {
    emoji: "🧹",
    title: "No clutter — just useful tools that work as expected.",
    description: "No ads, no distractions, just what you need."
  },
  {
    emoji: "👩‍🎓",
    title: "Perfect for students, creators, professionals, and everyone.",
    description: "Designed for all — whether you’re studying, working, or creating."
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto mb-12 relative">
        <Button variant="ghost" asChild className="absolute left-0 top-0">
          <Link to="/">
            <svg className="h-4 w-4 mr-2 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-2 text-gray-900 text-center">Features</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">Why choose Life Tools Hub?</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="rounded-2xl border border-gray-200 bg-white/90 shadow-sm p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            style={{ background: `hsl(${(i * 360) / features.length}, 70%, 98%)` }}
          >
            <div className="text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-full shadow-sm" style={{ background: `hsla(${(i * 360) / features.length}, 70%, 92%, 0.7)` }}>{f.emoji}</div>
            <h2 className="text-lg font-semibold mb-2 text-gray-900">{f.title}</h2>
            <p className="text-base text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 
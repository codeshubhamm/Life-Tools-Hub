import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ToolCard from "@/components/ToolCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator, Heart, Type, DollarSign, FileText, User, GraduationCap, Calendar, PartyPopper, Mail, QrCode, Percent, Globe, Timer, Award, Quote, CreditCard, ArrowLeft, Ruler, Instagram, Lightbulb, PenTool, Mic, Volume2, Keyboard, Tag, IndianRupee, Users, Play, Scissors, Archive, Image, Droplet, Shuffle
} from "lucide-react";

const tools = [
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days",
    icon: Calculator,
    path: "/tools/age-calculator",
    category: "calculator"
  },
  {
    title: "BMI Calculator",
    description: "Check your Body Mass Index and health status",
    icon: Heart,
    path: "/tools/bmi-calculator",
    category: "health"
  },
  {
    title: "Word Counter",
    description: "Count words, characters, and reading time instantly",
    icon: Type,
    path: "/tools/word-counter",
    category: "writing"
  },
  {
    title: "Bill Splitter",
    description: "Split bills equally among friends with ease",
    icon: DollarSign,
    path: "/tools/bill-splitter",
    category: "finance"
  },
  {
    title: "Leave Letter Generator",
    description: "Generate professional leave applications instantly",
    icon: FileText,
    path: "/tools/leave-letter-generator",
    category: "writing"
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with downloadable PDF",
    icon: User,
    path: "/tools/resume-builder",
    category: "career"
  },
  {
    title: "CGPA/GPA Converter",
    description: "Convert between GPA, CGPA, and percentage easily",
    icon: GraduationCap,
    path: "/tools/cgpa-converter",
    category: "education"
  },
  {
    title: "Daily Planner Generator",
    description: "Organize your day with a customizable planner",
    icon: Calendar,
    path: "/tools/daily-planner-generator",
    category: "productivity"
  },
  {
    title: "Birthday Wish Generator",
    description: "Create personalized birthday messages instantly",
    icon: PartyPopper,
    path: "/tools/birthday-wish-generator",
    category: "social"
  },
  {
    title: "Complaint Letter Writer",
    description: "Generate formal complaint and request letters",
    icon: Mail,
    path: "/tools/complaint-letter-writer",
    category: "writing"
  },
  {
    title: "QR Code Generator",
    description: "Create QR codes for any text, URL, or message",
    icon: QrCode,
    path: "/tools/qr-code-generator",
    category: "utility"
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages, values, and totals easily",
    icon: Percent,
    path: "/tools/percentage-calculator",
    category: "calculator"
  },
  {
    title: "Time Zone Converter",
    description: "Convert time between different time zones",
    icon: Globe,
    path: "/tools/time-zone-converter",
    category: "utility"
  },
  {
    title: "Loan EMI Calculator",
    description: "Calculate loan EMI, interest, and payment details",
    icon: CreditCard,
    path: "/tools/loan-emi-calculator",
    category: "finance"
  },
  {
    title: "Text Case Converter",
    description: "Convert text between different cases and formats",
    icon: Type,
    path: "/tools/text-case-converter",
    category: "utility"
  },
  {
    title: "Motivational Quotes",
    description: "Get inspired with daily motivational quotes",
    icon: Quote,
    path: "/tools/motivational-quotes",
    category: "inspiration"
  },
  {
    title: "Countdown Timer",
    description: "Set countdown timers for any activity or task",
    icon: Timer,
    path: "/tools/countdown-timer",
    category: "productivity"
  },
  {
    title: "Certificate Maker",
    description: "Create beautiful certificates for achievements",
    icon: Award,
    path: "/tools/certificate-maker",
    category: "design"
  },
  {
    title: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: Ruler,
    path: "/tools/unit-converter",
    category: "utility"
  },
  {
    title: "GST Calculator",
    description: "Calculate GST amounts for Indian tax system",
    icon: Calculator,
    path: "/tools/gst-calculator",
    category: "finance"
  },
  {
    title: "Weekly Planner Generator",
    description: "Plan your entire week with customizable schedules",
    icon: Calendar,
    path: "/tools/weekly-planner-generator",
    category: "productivity"
  },
  {
    title: "Instagram Bio Generator",
    description: "Create catchy and unique Instagram bios",
    icon: Instagram,
    path: "/tools/instagram-bio-generator",
    category: "social"
  },
  {
    title: "Tagline Generator",
    description: "Create catchy taglines for brands and businesses",
    icon: Lightbulb,
    path: "/tools/tagline-generator",
    category: "business"
  },
  {
    title: "Essay & Paragraph Writer",
    description: "Generate well-structured essays and paragraphs",
    icon: PenTool,
    path: "/tools/essay-writer",
    category: "writing"
  },
  {
    title: "Speech to Text",
    description: "Convert speech to text using voice recognition",
    icon: Mic,
    path: "/tools/speech-to-text",
    category: "utility"
  },
  {
    title: "Text to Speech",
    description: "Convert text to natural-sounding speech",
    icon: Volume2,
    path: "/tools/text-to-speech",
    category: "utility"
  },
  {
    title: "Typing Speed Tester",
    description: "Test your typing speed and accuracy",
    icon: Keyboard,
    path: "/tools/typing-speed-tester",
    category: "utility"
  },
  {
    title: "Discount Calculator",
    description: "Calculate discounts, savings, and compare deals",
    icon: Tag,
    path: "/tools/discount-calculator",
    category: "finance"
  },
  {
    title: "Income Tax Calculator",
    description: "Calculate income tax for Indian tax system",
    icon: IndianRupee,
    path: "/tools/income-tax-calculator",
    category: "finance"
  },
  {
    title: "Username Generator",
    description: "Generate unique usernames for any platform",
    icon: User,
    path: "/tools/username-generator",
    category: "utility"
  },
  {
    title: "Currency Converter",
    description: "Convert between major world currencies",
    icon: DollarSign,
    path: "/tools/currency-converter",
    category: "finance"
  },
  {
    title: "Invoice Generator",
    description: "Create professional invoices with GST calculation",
    icon: FileText,
    path: "/tools/invoice-generator",
    category: "business"
  },
  {
    title: "YouTube Video Downloader",
    description: "Download YouTube videos in various formats and qualities",
    icon: Play,
    path: "/tools/youtube-downloader",
    category: "utility"
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one.",
    icon: FileText,
    path: "/tools/merge-pdf",
    category: "pdf"
  },
  {
    title: "Split PDF",
    description: "Extract selected pages from a PDF.",
    icon: Scissors,
    path: "/tools/split-pdf",
    category: "pdf"
  },
  {
    title: "Compress PDF",
    description: "Reduce the file size of your PDF.",
    icon: Archive,
    path: "/tools/compress-pdf",
    category: "pdf"
  },
  {
    title: "PDF to Word",
    description: "Convert PDF files to editable Word documents.",
    icon: FileText,
    path: "/tools/pdf-to-word",
    category: "pdf"
  },
  {
    title: "Add Watermark",
    description: "Add a watermark to your PDF file.",
    icon: Droplet,
    path: "/tools/add-watermark",
    category: "pdf"
  },
  {
    title: 'PDF Password Protector/Remover',
    description: 'Add or remove password protection from your PDF files.',
    icon: FileText,
    path: '/tools/pdf-password',
    category: 'pdf'
  },
  {
    title: 'PDF Editor',
    description: 'Edit PDF content, metadata, and more.',
    icon: FileText,
    path: '/tools/pdf-editor',
    category: 'pdf'
  },
  {
    title: 'PDF to Image Converter',
    description: 'Convert PDF pages to images.',
    icon: Image,
    path: '/tools/pdf-to-image',
    category: 'pdf'
  }
];

const pdfTools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one.",
    icon: FileText,
    path: "/tools/merge-pdf",
    category: "pdf"
  },
  {
    title: "Split PDF",
    description: "Extract selected pages from a PDF.",
    icon: Scissors,
    path: "/tools/split-pdf",
    category: "pdf"
  },
  {
    title: "Compress PDF",
    description: "Reduce the file size of your PDF.",
    icon: Archive,
    path: "/tools/compress-pdf",
    category: "pdf"
  },
  {
    title: "PDF to Word",
    description: "Convert PDF files to editable Word documents.",
    icon: FileText,
    path: "/tools/pdf-to-word",
    category: "pdf"
  },
  {
    title: "Add Watermark",
    description: "Add a watermark to your PDF file.",
    icon: Droplet,
    path: "/tools/add-watermark",
    category: "pdf"
  }
];

const categories = [
  { label: "All", value: "all" },
  { label: "Calculators", value: "calculator" },
  { label: "Writing Tools", value: "writing" },
  { label: "Planning & Productivity", value: "productivity" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Utility", value: "utility" },
  { label: "Inspiration", value: "inspiration" },
  { label: "Design", value: "design" },
  { label: "Career", value: "career" },
  { label: "Social", value: "social" },
  { label: "Business", value: "business" },
  { label: "Health", value: "health" },
];

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const filtered = tools.filter(tool => {
    const matchesCategory = category === "all" || tool.category?.toLowerCase() === category;
    const matchesSearch =
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.category?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Unique pastel color for each card
  const getCardStyle = (i, total) => {
    const hue = (i * 360) / total;
    return { background: `hsl(${hue}, 70%, 88%)` };
  };

  // Suggestions for search bar
  const suggestions = search
    ? tools.filter(tool =>
        tool.title.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category?.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Small back button at top left */}
      <div className="absolute left-4 top-6 z-40">
        <Button
          asChild
          size="icon"
          className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 shadow"
          aria-label="Back to Home"
        >
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      {/* Sticky search/filter bar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur px-4 py-4 border-b flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full max-w-lg mx-auto md:mx-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setShowSuggestions(true);
              setActiveSuggestion(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onKeyDown={e => {
              if (!showSuggestions || suggestions.length === 0) return;
              if (e.key === "ArrowDown") {
                setActiveSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
              } else if (e.key === "ArrowUp") {
                setActiveSuggestion(prev => Math.max(prev - 1, 0));
              } else if (e.key === "Enter" && activeSuggestion >= 0) {
                navigate(suggestions[activeSuggestion].path);
                setShowSuggestions(false);
              }
            }}
            className="pl-12 py-3 text-base rounded-full border-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow focus:shadow-lg transition-all duration-300"
            aria-autocomplete="list"
            aria-controls="tools-search-suggestions"
            aria-activedescendant={activeSuggestion >= 0 ? `tools-suggestion-${activeSuggestion}` : undefined}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              id="tools-search-suggestions"
              className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg z-20 border border-gray-200 dark:border-gray-700 max-h-72 overflow-auto"
              role="listbox"
            >
              {suggestions.map((tool, i) => (
                <li
                  key={tool.title}
                  id={`tools-suggestion-${i}`}
                  role="option"
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${activeSuggestion === i ? "bg-blue-100 dark:bg-blue-800" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  onMouseDown={() => {
                    navigate(tool.path);
                    setShowSuggestions(false);
                  }}
                  onMouseEnter={() => setActiveSuggestion(i)}
                >
                  <tool.icon className="h-6 w-6 text-blue-500" />
                  <span className="font-medium">{tool.title}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{tool.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map(cat => (
            <Button
              key={cat.value}
              variant={category === cat.value ? "default" : "outline"}
              className="rounded-full px-4 py-2 text-sm font-medium"
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Add spacing below search/filter bar */}
      {/* Tools grid */}
      <div className="container mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filtered.map((tool, i) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              path={tool.path}
              style={getCardStyle(i, filtered.length)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-6">No tools found matching your search or filter.</p>
            <Button 
              variant="outline" 
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="text-lg px-8 py-3 rounded-full"
            >
              Clear Search & Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 
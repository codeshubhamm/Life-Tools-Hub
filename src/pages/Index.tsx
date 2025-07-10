
import { Link, useNavigate } from "react-router-dom";
import { Calculator, Heart, Type, DollarSign, FileText, User, GraduationCap, Calendar, PartyPopper, Mail, ArrowRight, Search, QrCode, Percent, Globe, Timer, Award, Quote, Clock, CreditCard, Ruler, Instagram, Lightbulb, PenTool, Mic, Volume2, Keyboard, Tag, IndianRupee, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Smooth scroll to features section if hash is #features
  useEffect(() => {
    if (window.location.hash === "#features" && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Listen for nav clicks to #features
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#features" && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
    }
  ];

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suggestions = searchTerm
    ? tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="min-h-screen bg-[#FDEEDC]">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Hero Section: premium feel, one unique feature per image, images positioned for premium look */}
      <section className="w-full min-h-[80vh] flex flex-col md:flex-row items-start justify-between px-6 md:px-24 pt-8 md:pt-28 pb-12 md:pb-0 gap-8 md:gap-0 bg-[#FDEEDC]">
        {/* Left: Headline, Subheadline, Button (logo removed, text higher) */}
        <div className="flex-1 flex flex-col items-start justify-start max-w-xl md:pr-8 md:-mt-8">
          <h1 className="text-[3.5rem] md:text-[5.5rem] font-serif font-bold text-gray-900 leading-[1.05] mb-8" style={{letterSpacing: '-0.04em'}}>
            Tools For Everyday<br />
            <span className="block text-[3.5rem] md:text-[5.5rem] font-serif font-bold text-primary" style={{letterSpacing: '-0.04em'}}>Life</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-10" style={{lineHeight: '1.4'}}>Life’s too short for cluttered apps.<br />Use simple tools that save time — all in one place.</p>
          <Button asChild size="lg" className="rounded-xl px-8 py-3 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-300 hover:from-yellow-500 hover:to-orange-400 text-white transition-all duration-150 mt-2">
            <Link to="/features">LEARN MORE</Link>
          </Button>
        </div>
        {/* Right: Two images, each with one unique, premium feature, minimal pastel border boxes */}
        <div className="flex-1 flex flex-col items-end justify-center gap-8 md:gap-12 max-w-xl md:pl-8 mt-0 md:-mt-20 md:-mt-32 relative">
          {/* First image and cloud message box to the right */}
          <div className="flex items-center w-full mb-4 md:mb-8 justify-center mt-2" style={{position: 'relative'}}>
            <div className="bg-[#EADCF8] rounded-2xl p-3 md:p-4 inline-block ml-8 md:ml-16 md:-ml-16 z-10">
              <img src="/graphic 1.png" alt="Illustration 1" className="w-80 md:w-[28rem] h-auto" />
            </div>
            <div className="hidden md:block ml-4 flex-1">
              {/* Cloud message box */}
              <div className="relative w-full max-w-[600px]">
                <div className="bg-white rounded-[2rem] shadow-lg px-10 py-2.5 text-base font-medium text-gray-800 whitespace-normal leading-snug italic border-0 w-full" style={{borderRadius: '2rem', boxShadow: '0 4px 24px 0 rgba(180,160,255,0.10)'}}>
                  From resumes to planners — all done in minutes.
                </div>
                {/* Tail */}
                <svg className="absolute -left-6 top-6" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M32 0C32 17.6731 0 0 0 32" fill="#fff"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Second image and cloud message box to the left */}
          <div className="flex items-center w-full -mt-2 md:-mt-6" style={{position: 'relative'}}>
            <div className="hidden md:block flex-1 mr-4">
              {/* Cloud message box */}
              <div className="relative w-full max-w-[600px]">
                <div className="bg-white rounded-[2rem] shadow-lg px-10 py-2.5 text-base font-medium text-gray-800 whitespace-normal leading-snug italic border-0 w-full" style={{borderRadius: '2rem', boxShadow: '0 4px 24px 0 rgba(180,255,200,0.10)'}}>
                  That’s the kind of tools I’ve been looking for
                </div>
                {/* Tail */}
                <svg className="absolute -right-6 top-6 rotate-180" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M32 0C32 17.6731 0 0 0 32" fill="#fff"/>
                </svg>
              </div>
            </div>
            <div className="bg-[#D6F5A7] rounded-2xl p-3 md:p-4 inline-block mr-8 md:mr-20 z-10">
              <img src="/graphic 2.png" alt="Illustration 2" className="w-80 md:w-[28rem] h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-block px-8 py-3 mb-8 rounded-full bg-gradient-to-r from-sky-200/60 to-purple-200/60 shadow text-2xl font-extrabold tracking-tight text-gray-900">
            <span role="img" aria-label="sparkles" className="text-3xl">✨</span>
            <span className="mx-2">Why use Life Tools Hub?</span>
            <span role="img" aria-label="sparkles" className="text-3xl">✨</span>
          </div>
          <div className="mx-auto max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg text-left">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#fef9c3] text-2xl shadow">🧰</span>
                <span className="font-semibold text-gray-900">Access 20+ daily-use tools without any signups.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#bae6fd] text-2xl shadow">⚡️</span>
                <span className="font-semibold text-gray-900">Generate resumes, planners, and letters instantly.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e9d5ff] text-2xl shadow">📄</span>
                <span className="font-semibold text-gray-900">Download-ready PDFs with clean, professional layouts.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#fca5a5] text-2xl shadow">🎨</span>
                <span className="font-semibold text-gray-900">Modern, pastel UI built for focus and simplicity.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#bbf7d0] text-2xl shadow">📱</span>
                <span className="font-semibold text-gray-900">Fully responsive design that works seamlessly on all devices.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#fde68a] text-2xl shadow">🚀</span>
                <span className="font-semibold text-gray-900">Fast, smooth interactions with subtle animations.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#a7f3d0] text-2xl shadow">🧹</span>
                <span className="font-semibold text-gray-900">No clutter — just useful tools that work as expected.</span>
              </li>
              <li className="flex items-start gap-4 sm:col-span-2 justify-center">
                <span className="font-semibold text-gray-900">Perfect for students, creators, professionals, and everyone.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Enhanced Tools Section (Replaced with Categorized Tool Store) */}
      <section id="tools" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="w-full bg-white/90 rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-200 backdrop-blur-lg animate-fade-in flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">All-in-One Tool Store</h3>
            <div className="w-full space-y-10">
              {/* Everyday Calculators */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#b45309]"><span role="img" aria-label="calculator">🧮</span> Everyday Calculators</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tools.filter(t => [
                    'Age Calculator', 'BMI Calculator', 'Percentage Calculator', 'Loan EMI Calculator', 'Discount Calculator', 'Income Tax Calculator', 'GST Calculator', 'Currency Converter'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-yellow-50 transition group text-base font-semibold bg-white shadow-sm border border-yellow-100">
                        <tool.icon className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{tool.title}</div>
                          <div className="text-gray-600 text-sm font-normal">{tool.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Academic & Writing Tools */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#7c3aed]"><span role="img" aria-label="books">📚</span> Academic & Writing Tools</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tools.filter(t => [
                    'Essay & Paragraph Writer', 'Resume Builder', 'CGPA/GPA Converter', 'Tagline Generator', 'Instagram Bio Generator', 'Complaint Letter Writer', 'Leave Letter Generator', 'Username Generator', 'Text Case Converter', 'Speech to Text', 'Text to Speech'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-purple-50 transition group text-base font-semibold bg-white shadow-sm border border-purple-100">
                        <tool.icon className="w-8 h-8 text-purple-500 group-hover:scale-110 transition mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{tool.title}</div>
                          <div className="text-gray-600 text-sm font-normal">{tool.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Productivity & Planning Tools */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#0e7490]"><span role="img" aria-label="calendar">📆</span> Productivity & Planning Tools</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tools.filter(t => [
                    'Daily Planner Generator', 'Weekly Planner Generator', 'Countdown Timer', 'Typing Speed Tester'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-sky-50 transition group text-base font-semibold bg-white shadow-sm border border-sky-100">
                        <tool.icon className="w-8 h-8 text-sky-500 group-hover:scale-110 transition mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{tool.title}</div>
                          <div className="text-gray-600 text-sm font-normal">{tool.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Smart Utility Tools */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#15803d]"><span role="img" aria-label="box">📦</span> Smart Utility Tools</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tools.filter(t => [
                    'Bill Splitter', 'Unit Converter', 'Time Zone Converter', 'Word Counter', 'Birthday Wish Generator', 'Motivational Quotes', 'Certificate Maker', 'QRCode Generator'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-green-50 transition group text-base font-semibold bg-white shadow-sm border border-green-100">
                        <tool.icon className="w-8 h-8 text-green-600 group-hover:scale-110 transition mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{tool.title}</div>
                          <div className="text-gray-600 text-sm font-normal">{tool.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-3xl p-12 md:p-16 shadow-2xl backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Simplify Your Life?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Life Tools Hub for their daily productivity needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="rounded-full px-10 py-4 text-lg shadow-xl">
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 py-4 text-lg shadow-xl">
                <Link to="#tools">
                  Browse All Tools
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

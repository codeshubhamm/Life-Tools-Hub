
import { Link, useNavigate } from "react-router-dom";
import { Calculator, Heart, Type, DollarSign, FileText, User, GraduationCap, Calendar, PartyPopper, Mail, ArrowRight, Search, QrCode, Percent, Globe, Timer, Award, Quote, Clock, CreditCard, Ruler, Instagram, Lightbulb, PenTool, Mic, Volume2, Keyboard, Tag, IndianRupee, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import SEO from "@/components/SEO";

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
    },

  ];

  // Structured data for tools
  const toolsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Life Tools Hub Tools",
    "description": "Collection of free online tools for everyday tasks",
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.title,
        "description": tool.description,
        "url": `https://life-tools-hub.com${tool.path}`,
        "applicationCategory": tool.category,
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    }))
  };

  const filteredTools = searchTerm
    ? tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && filteredTools.length > 0) {
      navigate(filteredTools[0].path);
    } else if (searchTerm.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredTools.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < filteredTools.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestion >= 0) {
        navigate(filteredTools[activeSuggestion].path);
      } else {
        handleSearch(e);
      }
      setShowSuggestions(false);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  // Structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Life Tools Hub",
    "description": "Free online tools for everyday tasks - calculators, generators, converters, and more. No signup required.",
    "url": "https://life-tools-hub.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://life-tools-hub.com/tools?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free online tools"
    }
  };

  return (
    <div className="min-h-screen bg-[#FDEEDC]">
      <SEO 
        title="Free Online Tools - Calculators, Generators & Converters"
        description="Access 39+ free online tools for everyday tasks. Calculators, text tools, generators, converters, and more. No signup required. Simplify your life with Life Tools Hub."
        keywords="free online tools, calculators, generators, converters, text tools, productivity tools, word counter, age calculator, BMI calculator, resume builder, QR code generator, text to speech, speech to text"
        canonical="/"
        structuredData={[structuredData, toolsStructuredData]}
      />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Hero Section: Life Tools Hub Image with Scroll Arrow */}
      <section className="w-full h-screen relative overflow-hidden -mt-14 md:mt-0">
        {/* Background Image - Desktop/Laptop */}
        <div className="absolute inset-0 hidden md:block">
          <img 
            src="/Favicon Of Life Tools Hub Logo/Life Tools Hub.png" 
            alt="Life Tools Hub" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Background Image - Mobile */}
        <div className="absolute inset-0 md:hidden">
          <img 
            src="/Life Tools Hub Mobile View.png" 
            alt="Life Tools Hub Mobile" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Simple Scroll Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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
                <span className="font-semibold text-gray-900">Access 39+ daily-use tools without any signups.</span>
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
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#b45309]">
                  <span role="img" aria-label="calculator">🧮</span> Everyday Calculators
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
                  {tools.filter(t => [
                    'Age Calculator', 'BMI Calculator', 'Percentage Calculator', 'Loan EMI Calculator', 'Discount Calculator', 'Income Tax Calculator', 'GST Calculator', 'Currency Converter'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-3 md:p-5 rounded-lg md:rounded-2xl bg-white shadow-sm border border-yellow-100 hover:bg-yellow-50 transition group text-xs md:text-base font-semibold min-h-[90px] md:min-h-[120px]">
                        <tool.icon className="w-7 h-7 md:w-8 md:h-8 text-yellow-500 group-hover:scale-110 transition md:mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1 text-xs md:text-base">{tool.title}</div>
                          <div className="text-gray-600 text-xs md:text-sm font-normal">{tool.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Writing & Academic Tools */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#7c3aed]">
                  <span role="img" aria-label="writing">✍️</span> Writing & Academic Tools
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
                  {tools.filter(t => [
                    'Essay & Paragraph Writer', 'Resume Builder', 'CGPA/GPA Converter', 'Tagline Generator', 'Instagram Bio Generator', 'Complaint Letter Writer', 'Leave Letter Generator', 'Username Generator', 'Text Case Converter', 'Word Counter'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-3 md:p-5 rounded-lg md:rounded-2xl bg-white shadow-sm border border-purple-100 hover:bg-purple-50 transition group text-xs md:text-base font-semibold min-h-[90px] md:min-h-[120px]">
                        <tool.icon className="w-7 h-7 md:w-8 md:h-8 text-purple-500 group-hover:scale-110 transition md:mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1 text-xs md:text-base">{tool.title}</div>
                          <div className="text-gray-600 text-xs md:text-sm font-normal">{tool.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Productivity & Planning Tools */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#0e7490]">
                  <span role="img" aria-label="calendar">📆</span> Productivity & Planning Tools
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
                  {tools.filter(t => [
                    'Daily Planner Generator', 'Weekly Planner Generator', 'Countdown Timer', 'Typing Speed Tester'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-3 md:p-5 rounded-lg md:rounded-2xl bg-white shadow-sm border border-sky-100 hover:bg-sky-50 transition group text-xs md:text-base font-semibold min-h-[90px] md:min-h-[120px]">
                        <tool.icon className="w-7 h-7 md:w-8 md:h-8 text-sky-500 group-hover:scale-110 transition md:mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1 text-xs md:text-base">{tool.title}</div>
                          <div className="text-gray-600 text-xs md:text-sm font-normal">{tool.description}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Smart Utility Tools */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#15803d]">
                  <span role="img" aria-label="box">📦</span> Smart Utility Tools
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
                  {tools.filter(t => [
                    'Bill Splitter', 'Unit Converter', 'Time Zone Converter', 'Word Counter', 'Birthday Wish Generator', 'Motivational Quotes', 'Certificate Maker', 'QRCode Generator'
                  ].includes(t.title)).map(tool => (
                    <li key={tool.title}>
                      <Link to={tool.path} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-3 md:p-5 rounded-lg md:rounded-2xl bg-white shadow-sm border border-green-100 hover:bg-green-50 transition group text-xs md:text-base font-semibold min-h-[90px] md:min-h-[120px]">
                        <tool.icon className="w-7 h-7 md:w-8 md:h-8 text-green-600 group-hover:scale-110 transition md:mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 mb-1 text-xs md:text-base">{tool.title}</div>
                          <div className="text-gray-600 text-xs md:text-sm font-normal">{tool.description}</div>
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


import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Search, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

// Sample tools data for search recommendations
const tools = [
  { title: "Age Calculator", path: "/tools/age-calculator", category: "calculator" },
  { title: "BMI Calculator", path: "/tools/bmi-calculator", category: "health" },
  { title: "Word Counter", path: "/tools/word-counter", category: "writing" },
  { title: "Bill Splitter", path: "/tools/bill-splitter", category: "finance" },
  { title: "Resume Builder", path: "/tools/resume-builder", category: "career" },
  { title: "QR Code Generator", path: "/tools/qr-code-generator", category: "utility" },
  { title: "Text to Speech", path: "/tools/text-to-speech", category: "utility" },
  { title: "Speech to Text", path: "/tools/speech-to-text", category: "utility" }
];

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRequestTool, setShowRequestTool] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredTools = searchTerm
    ? tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && filteredTools.length > 0) {
      navigate(filteredTools[0].path);
      setShowSuggestions(false);
    } else if (searchTerm.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
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
        setShowSuggestions(false);
      } else {
        handleSearch(e);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md md:bg-background/95 md:backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <img
            src="/LOGO.png"
            alt="Life Tools Hub Logo"
            className="h-16 md:h-24 w-auto max-w-xs object-contain"
          />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-6">
            <Link to="/tools" className="text-sm font-medium nav-link">Tools</Link>
            <Link to="/features" className="text-sm font-medium nav-link">Features</Link>
            <Link to="/about" className="text-sm font-medium nav-link">About</Link>
            <Link to="/support" className="text-sm font-medium nav-link">Support</Link>
          </nav>
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tools..."
                className="pl-10 pr-4 py-2 rounded-full border bg-white/90 dark:bg-gray-800/90 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-48 transition-all"
                aria-label="Search tools"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                  setActiveSuggestion(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => searchTerm && setShowSuggestions(true)}
              />
            </form>
            {/* Search Suggestions */}
            {showSuggestions && filteredTools.length > 0 && (
              <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50">
                <div className="p-2">
                  <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
                  {filteredTools.map((tool, index) => (
                    <button
                      key={tool.path}
                      onClick={() => {
                        navigate(tool.path);
                        setShowSuggestions(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        index === activeSuggestion ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="font-medium">{tool.title}</div>
                      <div className="text-xs text-gray-500 capitalize">{tool.category}</div>
                    </button>
                  ))}
                </div>
                <div className="border-t p-2">
                  <button
                    onClick={() => setShowRequestTool(true)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Request a tool</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Request Tool Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRequestTool(true)}
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Request Tool
          </Button>
          <a
            href="https://coff.ee/codewithshubhamm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105 ml-2"
          >
            ☕️ Buy Me a Coffee
          </a>
          <Link
            to="/support-me"
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105 ml-2"
          >
            💖 Support Me
          </Link>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(true)} aria-label="Search">
            <Search className="h-6 w-6 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(v => !v)} aria-label="Menu">
            {mobileNavOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>
        {/* Mobile Nav Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden transition-all duration-300">
            <nav className="w-64 h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col p-6 gap-4 animate-slide-in transition-all duration-300">
              <Button variant="ghost" size="icon" className="self-end mb-2" onClick={() => setMobileNavOpen(false)} aria-label="Close Menu">
                <X className="h-6 w-6" />
              </Button>
              <Link to="/tools" className="text-base font-medium py-2" onClick={() => setMobileNavOpen(false)}>Tools</Link>
              <Link to="/features" className="text-base font-medium py-2" onClick={() => setMobileNavOpen(false)}>Features</Link>
              <Link to="/about" className="text-base font-medium py-2" onClick={() => setMobileNavOpen(false)}>About</Link>
              <Link to="/support" className="text-base font-medium py-2" onClick={() => setMobileNavOpen(false)}>Support</Link>
              <a
                href="https://coff.ee/codewithshubhamm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105 mt-4"
                onClick={() => setMobileNavOpen(false)}
              >
                ☕️ Buy Me a Coffee
              </a>
              <Link
                to="/support-me"
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105 mt-2"
                onClick={() => setMobileNavOpen(false)}
              >
                💖 Support Me
              </Link>
            </nav>
          </div>
        )}
        {/* Mobile Search Modal */}
        {showMobileSearch && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center md:hidden">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-11/12 max-w-sm flex flex-col gap-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">Search Tools</span>
                <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(false)} aria-label="Close Search">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 pr-4 py-3 rounded-full border bg-white/90 dark:bg-gray-800/90 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base w-full transition-all"
                  aria-label="Search tools"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Request Tool Modal */}
        {showRequestTool && (
          <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{ top: '0', left: '0', right: '0', bottom: '0' }}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100" style={{ margin: 'auto' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  Request a Tool
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowRequestTool(false)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Have an idea for a tool that would make your life easier? Let us know!
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3 font-medium">
                    📧 Send your tool request to:
                  </p>
                  <a 
                    href="mailto:shubhamgunguwnwar07@gmail.com?subject=Tool Request - Life Tools Hub&body=Hi! I would like to request a new tool for Life Tools Hub:%0D%0A%0D%0ATool Name: %0D%0ADescription: %0D%0AFeatures needed: %0D%0A%0D%0AThank you!"
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all"
                  >
                    shubhamgunguwnwar07@gmail.com
                  </a>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => {
                      window.open('mailto:shubhamgunguwnwar07@gmail.com?subject=Tool Request - Life Tools Hub&body=Hi! I would like to request a new tool for Life Tools Hub:%0D%0A%0D%0ATool Name: %0D%0ADescription: %0D%0AFeatures needed: %0D%0A%0D%0AThank you!');
                      setShowRequestTool(false);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    Send Email
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRequestTool(false)} 
                    className="flex-1 border-gray-300 hover:border-gray-400"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Nav link hover styles */}
      <style>{`
        .nav-link {
          position: relative;
          transition: color 0.15s, transform 0.15s;
        }
        .nav-link:hover, .nav-link:focus {
          color: #7c3aed;
          text-decoration: none;
          transform: scale(1.07);
        }
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #7dd3fc, #a5b4fc);
          transition: width 0.2s;
          position: absolute;
          left: 0;
          bottom: -2px;
        }
        .nav-link:hover::after, .nav-link:focus::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          .nav-link {
            font-size: 1.1rem;
          }
        }
        @media (max-width: 768px) {
          .animate-slide-in {
            animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

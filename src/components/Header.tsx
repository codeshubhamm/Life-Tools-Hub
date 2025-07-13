
import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md md:bg-background/95 md:backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <img
            src="/LOGO.png"
            alt="Life Tools Hub Logo"
            className="h-24 md:h-32 w-auto max-w-xs object-contain"
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tools..."
              className="pl-10 pr-4 py-2 rounded-full border bg-white/90 dark:bg-gray-800/90 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-48 transition-all"
              aria-label="Search tools"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
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


import { Link } from "react-router-dom";
import { Moon, Sun, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <img
            src="/LOGO.png"
            alt="Life Tools Hub Logo"
            className="h-32 w-auto max-w-xs object-contain"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/tools" className="text-sm font-medium nav-link">Tools</Link>
            <Link to="/features" className="text-sm font-medium nav-link">Features</Link>
            <Link to="/about" className="text-sm font-medium nav-link">About</Link>
            <Link to="/support" className="text-sm font-medium nav-link">Support</Link>
          </nav>

          {/* Search bar (desktop only) */}
          <div className="hidden md:block relative">
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

          {/* Support buttons */}
          <a
            href="https://coff.ee/codewithshubhamm"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105 ml-2"
          >
            ☕️ Buy Me a Coffee
          </a>
        </div>
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
      `}</style>
    </header>
  );
};

export default Header;


import { Heart, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16 relative">
      {/* Thank you image with message bubble */}
      <div className="absolute -top-32 left-8 md:left-16 lg:left-24">
        <div className="relative group">
          <img 
            src="/thank you for using this tools.png" 
            alt="Thank you for using our tools" 
            className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-2" 
          />
          {/* Cute message bubble */}
          <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 lg:-top-8 lg:-right-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-pink-200/50 transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">Thank you for using this tools! 💗🫶</p>
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white/95 border-r border-b border-pink-200/50 transform rotate-45"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Logo Only */}
          <div className="flex flex-col items-start">
            <img
              src="/LOGO.png"
              alt="Life Tools Hub Logo"
              className="h-32 w-auto max-w-xs object-contain mb-2"
            />
            <span className="text-sm text-muted-foreground">shubhamgungunwar@gmail.com</span>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-md font-medium">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="mailto:shubhamgungunwar@gmail.com" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>

          {/* Support Buttons */}
          <div className="space-y-3">
            <h4 className="text-md font-medium">Support</h4>
            <a
              href="https://coff.ee/codewithshubhamm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105 mb-2"
            >
              ☕️ Buy Me a Coffee
            </a>
            <Link
              to="/support-me"
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105"
            >
              💖 Support Me
            </Link>
          </div>

          {/* Social & Description */}
          <div className="space-y-3">
            <h4 className="text-md font-medium">Connect</h4>
            <div className="flex space-x-4 mb-2">
              <a 
                href="https://instagram.com/code.withshubhamm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Simplify your life with our collection of free, easy-to-use tools. No sign-up required, just instant solutions for everyday tasks.
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Shubham Gungunwar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

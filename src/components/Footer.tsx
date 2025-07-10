
import { Heart, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
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
            <a
              href="mailto:shubhamgungunwar@gmail.com"
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-sm shadow transition-transform duration-150 hover:scale-105"
            >
              💖 Support Me
            </a>
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


import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 animate-float">
            <div className="text-8xl md:text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">
              404
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in">
            Oops! Page Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to our amazing tools!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button asChild size="lg" className="rounded-full px-8 py-3">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-3">
              <Link to="/" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;

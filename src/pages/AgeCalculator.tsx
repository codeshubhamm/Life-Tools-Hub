
import { useState } from "react";
import { Calendar, Calculator, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header searchTerm="" setSearchTerm={() => {}} />
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-28 left-6 z-50 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-md rounded-full w-10 h-10"
        aria-label="Back to Home"
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "/";
          }
        }}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        
        <div className="mb-6">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-blue rounded-full mb-4">
              <Calendar className="h-8 w-8 text-gray-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Age Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate your exact age in years, months, and days
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-sky-blue border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Enter Your Birth Date
              </CardTitle>
              <CardDescription>
                Select your date of birth to calculate your age
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={calculateAge} 
                className="w-full"
                disabled={!birthDate}
              >
                Calculate Age
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Your Age</CardTitle>
              <CardDescription>
                Detailed breakdown of your age
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{result.years}</div>
                      <div className="text-sm text-muted-foreground">Years</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{result.months}</div>
                      <div className="text-sm text-muted-foreground">Months</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{result.days}</div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-semibold">
                      You have lived for <span className="text-primary">{result.totalDays.toLocaleString()}</span> days!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Enter your birth date to see your age calculation
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgeCalculator;


import { useState } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const calculateBMI = () => {
    if (!weight || !height) return;

    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100; // Convert cm to meters
    const bmi = weightKg / (heightM * heightM);

    let category = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-600";
    } else if (bmi < 25) {
      category = "Normal weight";
      color = "text-green-600";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-yellow-600";
    } else {
      category = "Obese";
      color = "text-red-600";
    }

    setResult({ bmi: Math.round(bmi * 10) / 10, category, color });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 left-6 z-40 bg-white/80 hover:bg-white/90 text-gray-800 shadow rounded-full"
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
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-soft-peach rounded-full mb-4">
            <Heart className="h-8 w-8 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">BMI Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Check your Body Mass Index and health status
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-soft-peach border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Enter Your Details
              </CardTitle>
              <CardDescription>
                Input your weight and height to calculate BMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="height" className="block text-sm font-medium mb-2">
                  Height (cm)
                </label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height in cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={calculateBMI} 
                className="w-full"
                disabled={!weight || !height}
              >
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Your BMI Result</CardTitle>
              <CardDescription>
                Body Mass Index and health category
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{result.bmi}</div>
                    <div className={`text-xl font-semibold ${result.color}`}>
                      {result.category}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">BMI Categories:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Underweight</span>
                        <span className="text-blue-600">Below 18.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Normal weight</span>
                        <span className="text-green-600">18.5 - 24.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overweight</span>
                        <span className="text-yellow-600">25.0 - 29.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Obese</span>
                        <span className="text-red-600">30.0 and above</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Enter your weight and height to calculate BMI
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

export default BMICalculator;

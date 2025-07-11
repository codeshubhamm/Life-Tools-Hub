import { useState } from "react";
import { Percent, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculatePercentage = () => {
    const val = parseFloat(value);
    const tot = parseFloat(total);
    
    if (isNaN(val) || isNaN(tot) || tot === 0) {
      setResult(null);
      return;
    }
    
    const percent = (val / tot) * 100;
    setResult(percent);
  };

  const calculateValue = () => {
    const perc = parseFloat(percentage);
    const tot = parseFloat(total);
    
    if (isNaN(perc) || isNaN(tot)) {
      setResult(null);
      return;
    }
    
    const val = (perc * tot) / 100;
    setResult(val);
  };

  const calculateTotal = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    
    if (isNaN(val) || isNaN(perc) || perc === 0) {
      setResult(null);
      return;
    }
    
    const tot = (val * 100) / perc;
    setResult(tot);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Back Button */}
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
      <Header searchTerm="" setSearchTerm={() => {}} />
      <div className="container mx-auto px-4 pt-6 pb-8 max-w-4xl">
        {/* Icon + Title + Subtitle Centered */}
        <div className="flex flex-col items-center justify-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full shadow mb-4">
            <Percent className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Percentage Calculator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Calculate percentages, values, and totals with ease
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Percentage Calculations</CardTitle>
            <CardDescription>
              Choose the type of calculation you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="percentage" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="percentage">Find Percentage</TabsTrigger>
                <TabsTrigger value="value">Find Value</TabsTrigger>
                <TabsTrigger value="total">Find Total</TabsTrigger>
              </TabsList>
              
              <TabsContent value="percentage" className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">What percentage is X of Y?</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Value (X)</label>
                    <Input
                      type="number"
                      placeholder="Enter value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Total (Y)</label>
                    <Input
                      type="number"
                      placeholder="Enter total"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={calculatePercentage}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  size="lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Percentage
                </Button>
                {result !== null && (
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {result.toFixed(2)}%
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {value} is {result.toFixed(2)}% of {total}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="value" className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">What is X% of Y?</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Percentage (X%)</label>
                    <Input
                      type="number"
                      placeholder="Enter percentage"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Total (Y)</label>
                    <Input
                      type="number"
                      placeholder="Enter total"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={calculateValue}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  size="lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Value
                </Button>
                {result !== null && (
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {result.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {percentage}% of {total} is {result.toFixed(2)}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="total" className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">X is Y% of what number?</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Value (X)</label>
                    <Input
                      type="number"
                      placeholder="Enter value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Percentage (Y%)</label>
                    <Input
                      type="number"
                      placeholder="Enter percentage"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={calculateTotal}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  size="lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Total
                </Button>
                {result !== null && (
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {result.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {value} is {percentage}% of {result.toFixed(2)}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Common Uses:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Calculate discounts and savings</li>
            <li>• Find tax amounts and tips</li>
            <li>• Determine grade percentages</li>
            <li>• Calculate interest rates</li>
            <li>• Analyze data and statistics</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PercentageCalculator;
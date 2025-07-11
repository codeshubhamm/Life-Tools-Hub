import { useState } from "react";
import { DollarSign, Calculator, TrendingUp, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<{
    emi: number;
    totalAmount: number;
    totalInterest: number;
  } | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const time = parseFloat(tenure) * 12; // Convert years to months

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
      setResult(null);
      return;
    }

    // EMI Formula: [P x R x (1+R)^N] / [(1+R)^N-1]
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
    });
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full shadow mb-4">
            <CreditCard className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Loan EMI Calculator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Calculate your loan EMI, total interest, and payment amount
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>
                Enter your loan information to calculate EMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Loan Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g. 500000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Interest Rate (% per annum)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 8.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Loan Tenure (Years)</label>
                <Input
                  type="number"
                  placeholder="e.g. 20"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={calculateEMI}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate EMI
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EMI Calculation Results</CardTitle>
              <CardDescription>
                Your loan EMI and payment breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
                    <p className="text-3xl font-bold text-primary">
                      ₹{result.emi.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span className="font-medium">Principal Amount</span>
                      <span className="font-bold">₹{parseFloat(loanAmount).toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span className="font-medium">Total Interest</span>
                      <span className="font-bold text-red-600">₹{result.totalInterest.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span className="font-medium">Total Amount</span>
                      <span className="font-bold text-green-600">₹{result.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-600">Payment Summary</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will pay ₹{result.emi.toLocaleString('en-IN')} monthly for {tenure} years, 
                      with a total interest of ₹{result.totalInterest.toLocaleString('en-IN')}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Enter loan details to calculate EMI</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">How EMI is calculated:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• EMI = [P x R x (1+R)^N] / [(1+R)^N-1]</li>
            <li>• P = Principal loan amount</li>
            <li>• R = Monthly interest rate (Annual rate / 12)</li>
            <li>• N = Number of monthly installments (Years x 12)</li>
            <li>• Higher interest rates and longer tenure increase total interest paid</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoanEMICalculator;

import { useState } from "react";
import { DollarSign, ArrowLeft, Users, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const BillSplitter = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [result, setResult] = useState<{
    amountPerPerson: number;
    formattedAmount: string;
  } | null>(null);

  const calculateSplit = () => {
    if (!totalAmount || !numberOfPeople) return;

    const total = parseFloat(totalAmount);
    const people = parseInt(numberOfPeople);
    
    if (people <= 0) return;

    const amountPerPerson = total / people;
    const formattedAmount = `₹${amountPerPerson.toFixed(2)}`;

    setResult({ amountPerPerson, formattedAmount });
  };

  const copyAmount = () => {
    if (result) {
      navigator.clipboard.writeText(result.formattedAmount);
      toast({
        title: "Copied!",
        description: "Amount per person copied to clipboard",
      });
    }
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
      <div className="container mx-auto px-4 pt-6 pb-8 max-w-4xl">
        {/* Icon + Title + Subtitle Centered */}
        <div className="flex flex-col items-center justify-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-lavender rounded-full shadow mb-4">
            <DollarSign className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Bill Splitter</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Split bills equally among friends with ease
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-lavender border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Bill Details
              </CardTitle>
              <CardDescription>
                Enter the total amount and number of people
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                  Total Amount (₹)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter total bill amount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="people" className="block text-sm font-medium mb-2">
                  Number of People
                </label>
                <Input
                  id="people"
                  type="number"
                  placeholder="How many people?"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  min="1"
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={calculateSplit} 
                className="w-full"
                disabled={!totalAmount || !numberOfPeople}
              >
                <Users className="h-4 w-4 mr-2" />
                Split Bill
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Split Result</CardTitle>
              <CardDescription>
                Amount each person needs to pay
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 text-green-600">
                      {result.formattedAmount}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      per person
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-center space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Total: ₹{totalAmount} ÷ {numberOfPeople} people
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyAmount}
                        className="mt-2"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Amount
                      </Button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>💡 Tip: Send this amount to your friends via UPI for easy payment!</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Enter bill details to calculate split amount
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

export default BillSplitter;

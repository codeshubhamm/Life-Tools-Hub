import { useState } from "react";
import { Calculator, Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const GSTCalculator = () => {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [includeGst, setIncludeGst] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const calculateGST = () => {
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate);
    
    if (isNaN(baseAmount) || isNaN(rate)) return null;

    if (includeGst) {
      // Amount includes GST
      const netAmount = baseAmount / (1 + rate / 100);
      const gstAmount = baseAmount - netAmount;
      return {
        netAmount,
        gstAmount,
        grossAmount: baseAmount
      };
    } else {
      // Amount excludes GST
      const gstAmount = (baseAmount * rate) / 100;
      const grossAmount = baseAmount + gstAmount;
      return {
        netAmount: baseAmount,
        gstAmount,
        grossAmount
      };
    }
  };

  const result = calculateGST();

  const copyResults = async () => {
    if (!result) return;
    
    const text = `GST Calculation:
Net Amount: ₹${result.netAmount.toFixed(2)}
GST (${gstRate}%): ₹${result.gstAmount.toFixed(2)}
Gross Amount: ₹${result.grossAmount.toFixed(2)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "GST calculation copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            GST Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate GST amounts for Indian tax system with detailed breakdown
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>GST Calculation</CardTitle>
              <CardDescription>
                Enter amount and GST rate to calculate taxes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">GST Rate (%)</label>
                <div className="grid grid-cols-4 gap-2">
                  {["5", "12", "18", "28"].map((rate) => (
                    <Button
                      key={rate}
                      variant={gstRate === rate ? "default" : "outline"}
                      onClick={() => setGstRate(rate)}
                      className="w-full"
                    >
                      {rate}%
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Custom rate"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="include-gst"
                  checked={includeGst}
                  onCheckedChange={setIncludeGst}
                />
                <label htmlFor="include-gst" className="text-sm font-medium">
                  Amount includes GST
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-breakdown"
                  checked={showBreakdown}
                  onCheckedChange={setShowBreakdown}
                />
                <label htmlFor="show-breakdown" className="text-sm font-medium">
                  Show CGST/SGST breakdown
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GST Breakdown</CardTitle>
              <CardDescription>
                Detailed calculation results
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <span className="font-medium">Net Amount</span>
                      <span className="font-bold">₹{result.netAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <span className="font-medium">GST ({gstRate}%)</span>
                      <span className="font-bold">₹{result.gstAmount.toFixed(2)}</span>
                    </div>

                    {showBreakdown && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                          <span className="font-medium">CGST ({parseFloat(gstRate)/2}%)</span>
                          <span className="font-bold">₹{(result.gstAmount/2).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                          <span className="font-medium">SGST ({parseFloat(gstRate)/2}%)</span>
                          <span className="font-bold">₹{(result.gstAmount/2).toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                      <span className="font-medium">Total Amount</span>
                      <span className="font-bold text-lg">₹{result.grossAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={copyResults}
                    variant="outline"
                    className="w-full"
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copied ? "Copied!" : "Copy Results"}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Enter amount to calculate GST</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">GST Rates in India:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <strong>5%:</strong> Essential items, books, medicines
            </div>
            <div>
              <strong>12%:</strong> Computers, processed food
            </div>
            <div>
              <strong>18%:</strong> Most goods and services
            </div>
            <div>
              <strong>28%:</strong> Luxury items, automobiles
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GSTCalculator;
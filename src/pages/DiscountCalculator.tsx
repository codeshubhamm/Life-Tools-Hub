import { useState } from "react";
import { Tag, Calculator, Copy, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  
  // Comparison calculator
  const [price1, setPrice1] = useState("");
  const [discount1, setDiscount1] = useState("");
  const [price2, setPrice2] = useState("");
  const [discount2, setDiscount2] = useState("");
  
  const { toast } = useToast();

  const calculateFromPercent = () => {
    const price = parseFloat(originalPrice);
    const percent = parseFloat(discountPercent);
    
    if (isNaN(price) || isNaN(percent)) return;
    
    const discount = (price * percent) / 100;
    const final = price - discount;
    
    setDiscountAmount(discount.toFixed(2));
    setFinalPrice(final.toFixed(2));
  };

  const calculateFromAmount = () => {
    const price = parseFloat(originalPrice);
    const amount = parseFloat(discountAmount);
    
    if (isNaN(price) || isNaN(amount)) return;
    
    const percent = (amount / price) * 100;
    const final = price - amount;
    
    setDiscountPercent(percent.toFixed(2));
    setFinalPrice(final.toFixed(2));
  };

  const calculateFromFinal = () => {
    const price = parseFloat(originalPrice);
    const final = parseFloat(finalPrice);
    
    if (isNaN(price) || isNaN(final)) return;
    
    const discount = price - final;
    const percent = (discount / price) * 100;
    
    setDiscountAmount(discount.toFixed(2));
    setDiscountPercent(percent.toFixed(2));
  };

  const getComparisonResults = () => {
    const p1 = parseFloat(price1);
    const d1 = parseFloat(discount1);
    const p2 = parseFloat(price2);
    const d2 = parseFloat(discount2);
    
    if (isNaN(p1) || isNaN(d1) || isNaN(p2) || isNaN(d2)) return null;
    
    const final1 = p1 - (p1 * d1) / 100;
    const final2 = p2 - (p2 * d2) / 100;
    const savings1 = (p1 * d1) / 100;
    const savings2 = (p2 * d2) / 100;
    
    return {
      final1: final1.toFixed(2),
      final2: final2.toFixed(2),
      savings1: savings1.toFixed(2),
      savings2: savings2.toFixed(2),
      better: final1 < final2 ? 1 : 2,
      difference: Math.abs(final1 - final2).toFixed(2)
    };
  };

  const copyResult = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const comparisonResults = getComparisonResults();

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
            <Tag className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Discount Calculator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Calculate discounts, savings, and compare deals easily
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Discount Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Compare Deals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Discount</CardTitle>
                  <CardDescription>
                    Enter any two values to calculate the third
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Original Price (₹)</label>
                    <Input
                      type="number"
                      placeholder="Enter original price"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Percentage (%)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Enter discount %"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                      />
                      <Button onClick={calculateFromPercent} variant="outline">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Amount (₹)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Enter discount amount"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                      />
                      <Button onClick={calculateFromAmount} variant="outline">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Final Price (₹)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Enter final price"
                        value={finalPrice}
                        onChange={(e) => setFinalPrice(e.target.value)}
                      />
                      <Button onClick={calculateFromFinal} variant="outline">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                  <CardDescription>
                    Your discount breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {originalPrice && discountPercent && discountAmount && finalPrice ? (
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <span className="font-medium">Original Price</span>
                          <span className="font-bold">₹{originalPrice}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                          <span className="font-medium">Discount ({discountPercent}%)</span>
                          <span className="font-bold">-₹{discountAmount}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                          <span className="font-medium">Final Price</span>
                          <span className="font-bold text-lg">₹{finalPrice}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                          <span className="font-medium">You Save</span>
                          <span className="font-bold text-purple-600">₹{discountAmount}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => copyResult(`Original: ₹${originalPrice}, Discount: ${discountPercent}% (₹${discountAmount}), Final: ₹${finalPrice}`)}
                        variant="outline"
                        className="w-full"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Results
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Tag className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p>Enter values to see discount calculation</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compare Two Deals</CardTitle>
                <CardDescription>
                  Compare different discount offers to find the best deal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Deal 1</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price (₹)</label>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        value={price1}
                        onChange={(e) => setPrice1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Discount (%)</label>
                      <Input
                        type="number"
                        placeholder="Enter discount %"
                        value={discount1}
                        onChange={(e) => setDiscount1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Deal 2</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price (₹)</label>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        value={price2}
                        onChange={(e) => setPrice2(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Discount (%)</label>
                      <Input
                        type="number"
                        placeholder="Enter discount %"
                        value={discount2}
                        onChange={(e) => setDiscount2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {comparisonResults && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-lg">Comparison Results</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className={`p-4 rounded-lg border-2 ${comparisonResults.better === 1 ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 bg-gray-50 dark:bg-gray-950/20'}`}>
                        <h4 className="font-medium mb-2">Deal 1</h4>
                        <div className="space-y-1 text-sm">
                          <div>Final Price: ₹{comparisonResults.final1}</div>
                          <div>You Save: ₹{comparisonResults.savings1}</div>
                        </div>
                        {comparisonResults.better === 1 && (
                          <div className="mt-2 text-green-600 font-medium">✓ Better Deal!</div>
                        )}
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${comparisonResults.better === 2 ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 bg-gray-50 dark:bg-gray-950/20'}`}>
                        <h4 className="font-medium mb-2">Deal 2</h4>
                        <div className="space-y-1 text-sm">
                          <div>Final Price: ₹{comparisonResults.final2}</div>
                          <div>You Save: ₹{comparisonResults.savings2}</div>
                        </div>
                        {comparisonResults.better === 2 && (
                          <div className="mt-2 text-green-600 font-medium">✓ Better Deal!</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="font-medium">
                        Deal {comparisonResults.better} is better by ₹{comparisonResults.difference}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Shopping Tips:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Always compare final prices, not just discount percentages</li>
            <li>• Consider additional costs like shipping and taxes</li>
            <li>• Check if there are any minimum purchase requirements</li>
            <li>• Look for cashback offers and loyalty points</li>
            <li>• Verify the original price to ensure genuine discounts</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DiscountCalculator;
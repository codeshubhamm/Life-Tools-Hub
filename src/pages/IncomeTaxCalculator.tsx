import { useState } from "react";
import { Calculator, IndianRupee, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [isNewRegime, setIsNewRegime] = useState(true);
  const [deductions, setDeductions] = useState({
    section80C: "",
    section80D: "",
    hra: "",
    lta: "",
    professionalTax: ""
  });

  // Tax slabs for FY 2023-24
  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
  ];

  const newRegimeSlabs = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 600000, rate: 5 },
    { min: 600000, max: 900000, rate: 10 },
    { min: 900000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 }
  ];

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    if (grossIncome === 0) return null;

    let taxableIncome = grossIncome;
    let totalDeductions = 0;

    // Apply deductions only for old regime
    if (!isNewRegime) {
      const section80C = Math.min(parseFloat(deductions.section80C) || 0, 150000);
      const section80D = Math.min(parseFloat(deductions.section80D) || 0, 25000);
      const hra = parseFloat(deductions.hra) || 0;
      const lta = parseFloat(deductions.lta) || 0;
      const professionalTax = parseFloat(deductions.professionalTax) || 0;
      
      totalDeductions = section80C + section80D + hra + lta + professionalTax;
      taxableIncome = Math.max(0, grossIncome - totalDeductions);
    }

    const slabs = isNewRegime ? newRegimeSlabs : oldRegimeSlabs;
    let tax = 0;
    let remainingIncome = taxableIncome;

    const breakdown: Array<{slab: string, taxableAmount: number, rate: number, tax: number}> = [];

    for (const slab of slabs) {
      if (remainingIncome <= 0) break;
      
      const slabIncome = Math.min(remainingIncome, slab.max - slab.min);
      const slabTax = (slabIncome * slab.rate) / 100;
      
      if (slabIncome > 0) {
        breakdown.push({
          slab: slab.max === Infinity ? `₹${slab.min.toLocaleString()}+` : `₹${slab.min.toLocaleString()} - ₹${slab.max.toLocaleString()}`,
          taxableAmount: slabIncome,
          rate: slab.rate,
          tax: slabTax
        });
      }
      
      tax += slabTax;
      remainingIncome -= slabIncome;
    }

    // Add cess (4% on tax)
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      grossIncome,
      totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax,
      netIncome: grossIncome - totalTax,
      breakdown
    };
  };

  const result = calculateTax();

  const handleDeductionChange = (field: string, value: string) => {
    setDeductions(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
            <IndianRupee className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Income Tax Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate your income tax for FY 2023-24 with both old and new tax regimes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Income Details</CardTitle>
              <CardDescription>
                Enter your annual income and choose tax regime
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Annual Income (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter your annual income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="tax-regime"
                  checked={isNewRegime}
                  onCheckedChange={setIsNewRegime}
                />
                <label htmlFor="tax-regime" className="text-sm font-medium">
                  Use New Tax Regime
                </label>
              </div>

              <div className="text-sm text-muted-foreground">
                {isNewRegime ? (
                  <p>New regime offers lower tax rates but no deductions except standard deduction.</p>
                ) : (
                  <p>Old regime allows various deductions but has higher tax rates.</p>
                )}
              </div>

              {!isNewRegime && (
                <div className="space-y-4">
                  <h4 className="font-medium">Deductions (Old Regime Only)</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section 80C (Max ₹1.5L)</label>
                    <Input
                      type="number"
                      placeholder="PF, ELSS, PPF, etc."
                      value={deductions.section80C}
                      onChange={(e) => handleDeductionChange('section80C', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section 80D (Max ₹25K)</label>
                    <Input
                      type="number"
                      placeholder="Health insurance premium"
                      value={deductions.section80D}
                      onChange={(e) => handleDeductionChange('section80D', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">HRA Exemption</label>
                    <Input
                      type="number"
                      placeholder="House rent allowance"
                      value={deductions.hra}
                      onChange={(e) => handleDeductionChange('hra', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">LTA Exemption</label>
                    <Input
                      type="number"
                      placeholder="Leave travel allowance"
                      value={deductions.lta}
                      onChange={(e) => handleDeductionChange('lta', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Professional Tax</label>
                    <Input
                      type="number"
                      placeholder="Professional tax paid"
                      value={deductions.professionalTax}
                      onChange={(e) => handleDeductionChange('professionalTax', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Results</CardTitle>
                <CardDescription>
                  Your tax liability breakdown for {isNewRegime ? 'New' : 'Old'} Tax Regime
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <span className="font-medium">Gross Income</span>
                        <span className="font-bold">₹{result.grossIncome.toLocaleString()}</span>
                      </div>
                      
                      {!isNewRegime && result.totalDeductions > 0 && (
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <span className="font-medium">Total Deductions</span>
                          <span className="font-bold">₹{result.totalDeductions.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                        <span className="font-medium">Taxable Income</span>
                        <span className="font-bold">₹{result.taxableIncome.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <span className="font-medium">Income Tax</span>
                        <span className="font-bold">₹{result.tax.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <span className="font-medium">Health & Education Cess (4%)</span>
                        <span className="font-bold">₹{result.cess.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-red-100 dark:bg-red-900/20 rounded-lg border-2 border-red-200 dark:border-red-800">
                        <span className="font-medium">Total Tax Liability</span>
                        <span className="font-bold text-lg">₹{result.totalTax.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                        <span className="font-medium">Net Income (After Tax)</span>
                        <span className="font-bold text-lg">₹{result.netIncome.toLocaleString()}</span>
                      </div>
                    </div>

                    {result.breakdown.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Tax Slab Breakdown</h4>
                        <div className="space-y-2">
                          {result.breakdown.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                              <span className="text-sm">{item.slab} ({item.rate}%)</span>
                              <span className="text-sm font-medium">₹{item.tax.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Enter your annual income to calculate tax</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tax Slabs - New Regime (FY 2023-24)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>₹0 - ₹3,00,000</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between">
                  <span>₹3,00,001 - ₹6,00,000</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between">
                  <span>₹6,00,001 - ₹9,00,000</span>
                  <span>10%</span>
                </div>
                <div className="flex justify-between">
                  <span>₹9,00,001 - ₹12,00,000</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between">
                  <span>₹12,00,001 - ₹15,00,000</span>
                  <span>20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Above ₹15,00,000</span>
                  <span>30%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Slabs - Old Regime (FY 2023-24)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>₹0 - ₹2,50,000</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between">
                  <span>₹2,50,001 - ₹5,00,000</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between">
                  <span>₹5,00,001 - ₹10,00,000</span>
                  <span>20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Above ₹10,00,000</span>
                  <span>30%</span>
                </div>
                <div className="mt-4 pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Plus various deductions available under sections 80C, 80D, etc.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IncomeTaxCalculator;
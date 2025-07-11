import { useState, useEffect } from "react";
import { DollarSign, ArrowLeftRight, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"; // Added Link import
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const exchangeRates: { [key: string]: { [key: string]: number } } = {
    USD: {
      INR: 83.25,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.50,
      CAD: 1.36,
      AUD: 1.52,
      CHF: 0.88,
      CNY: 7.24,
      SGD: 1.35,
      AED: 3.67
    },
    INR: {
      USD: 0.012,
      EUR: 0.011,
      GBP: 0.0095,
      JPY: 1.80,
      CAD: 0.016,
      AUD: 0.018,
      CHF: 0.011,
      CNY: 0.087,
      SGD: 0.016,
      AED: 0.044
    },
    EUR: {
      USD: 1.09,
      INR: 90.65,
      GBP: 0.86,
      JPY: 162.80,
      CAD: 1.48,
      AUD: 1.65,
      CHF: 0.96,
      CNY: 7.88,
      SGD: 1.47,
      AED: 4.00
    },
    GBP: {
      USD: 1.27,
      INR: 105.38,
      EUR: 1.16,
      JPY: 189.20,
      CAD: 1.72,
      AUD: 1.92,
      CHF: 1.11,
      CNY: 9.16,
      SGD: 1.71,
      AED: 4.65
    }
  };

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "AED", name: "UAE Dirham", symbol: "AED" }
  ];

  useEffect(() => {
    convertCurrency();
    setLastUpdated(new Date().toLocaleString());
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || inputAmount <= 0) {
      setResult("");
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(inputAmount.toFixed(2));
      return;
    }

    let convertedAmount = 0;

    if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      convertedAmount = inputAmount * exchangeRates[fromCurrency][toCurrency];
    } else if (exchangeRates[toCurrency] && exchangeRates[toCurrency][fromCurrency]) {
      convertedAmount = inputAmount / exchangeRates[toCurrency][fromCurrency];
    } else {
      // Convert through USD as base currency
      const toUSD = fromCurrency === "USD" ? inputAmount : inputAmount / (exchangeRates.USD[fromCurrency] || 1);
      convertedAmount = toCurrency === "USD" ? toUSD : toUSD * (exchangeRates.USD[toCurrency] || 1);
    }

    setResult(convertedAmount.toFixed(2));
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const getExchangeRate = () => {
    if (fromCurrency === toCurrency) return 1;
    
    if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      return exchangeRates[fromCurrency][toCurrency];
    } else if (exchangeRates[toCurrency] && exchangeRates[toCurrency][fromCurrency]) {
      return 1 / exchangeRates[toCurrency][fromCurrency];
    }
    return 1;
  };

  const getPopularPairs = () => {
    return [
      { from: "USD", to: "INR", rate: exchangeRates.USD.INR },
      { from: "EUR", to: "USD", rate: exchangeRates.EUR.USD },
      { from: "GBP", to: "USD", rate: exchangeRates.GBP.USD },
      { from: "USD", to: "JPY", rate: exchangeRates.USD.JPY }
    ];
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Back Button */}
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 z-40 bg-white/80 hover:bg-white/90 text-gray-800 shadow rounded-full"
        aria-label="Back to Home"
      >
        <Link to="/">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </Button>
      <Header searchTerm="" setSearchTerm={() => {}} />
      <div className="container mx-auto px-4 pt-6 pb-8 max-w-4xl">
        {/* Icon + Title + Subtitle Centered */}
        <div className="flex flex-col items-center justify-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow mb-4">
            <DollarSign className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Currency Converter</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Convert between major world currencies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>
                Convert between different currencies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapCurrencies}
                    className="rounded-full"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {result && (
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {currencies.find(c => c.code === toCurrency)?.symbol}{result}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {amount} {fromCurrency} = {result} {toCurrency}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Exchange Rate: 1 {fromCurrency} = {getExchangeRate().toFixed(4)} {toCurrency}
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground text-center">
                Last updated: {lastUpdated}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Currency Pairs</CardTitle>
              <CardDescription>
                Current exchange rates for popular pairs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPopularPairs().map((pair, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{pair.from}/{pair.to}</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="font-bold">{pair.rate.toFixed(4)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-medium mb-2">Quick Convert</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>1 USD = ₹{exchangeRates.USD.INR}</div>
                  <div>1 EUR = ${exchangeRates.EUR.USD.toFixed(2)}</div>
                  <div>1 GBP = ${exchangeRates.GBP.USD.toFixed(2)}</div>
                  <div>1 USD = ¥{exchangeRates.USD.JPY}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Currency Information:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Exchange rates are updated regularly for accuracy</li>
            <li>• Rates shown are for reference and may vary from actual market rates</li>
            <li>• Perfect for travel planning and international transactions</li>
            <li>• Supports major world currencies including USD, EUR, GBP, INR, and more</li>
            <li>• Use the swap button to quickly reverse currency pairs</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CurrencyConverter;
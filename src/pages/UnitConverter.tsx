import { useState } from "react";
import { Ruler, ArrowLeftRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom"; // Added Link import
import { ArrowLeft } from "lucide-react"; // Added ArrowLeft import

const UnitConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [category, setCategory] = useState("length");

  const units = {
    length: {
      meter: { name: "Meter", factor: 1 },
      kilometer: { name: "Kilometer", factor: 1000 },
      centimeter: { name: "Centimeter", factor: 0.01 },
      millimeter: { name: "Millimeter", factor: 0.001 },
      inch: { name: "Inch", factor: 0.0254 },
      foot: { name: "Foot", factor: 0.3048 },
      yard: { name: "Yard", factor: 0.9144 },
      mile: { name: "Mile", factor: 1609.34 }
    },
    weight: {
      kilogram: { name: "Kilogram", factor: 1 },
      gram: { name: "Gram", factor: 0.001 },
      pound: { name: "Pound", factor: 0.453592 },
      ounce: { name: "Ounce", factor: 0.0283495 },
      ton: { name: "Ton", factor: 1000 },
      stone: { name: "Stone", factor: 6.35029 }
    },
    temperature: {
      celsius: { name: "Celsius", factor: 1 },
      fahrenheit: { name: "Fahrenheit", factor: 1 },
      kelvin: { name: "Kelvin", factor: 1 }
    },
    volume: {
      liter: { name: "Liter", factor: 1 },
      milliliter: { name: "Milliliter", factor: 0.001 },
      gallon: { name: "Gallon", factor: 3.78541 },
      quart: { name: "Quart", factor: 0.946353 },
      pint: { name: "Pint", factor: 0.473176 },
      cup: { name: "Cup", factor: 0.236588 }
    },
    speed: {
      mps: { name: "Meter/Second", factor: 1 },
      kmh: { name: "Kilometer/Hour", factor: 0.277778 },
      mph: { name: "Mile/Hour", factor: 0.44704 },
      knot: { name: "Knot", factor: 0.514444 }
    }
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius = value;
    if (from === "fahrenheit") celsius = (value - 32) * 5/9;
    if (from === "kelvin") celsius = value - 273.15;
    
    // Convert from Celsius to target
    if (to === "fahrenheit") return celsius * 9/5 + 32;
    if (to === "kelvin") return celsius + 273.15;
    return celsius;
  };

  const convert = (value: string, from: string, to: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || !from || !to) return "";

    if (category === "temperature") {
      return convertTemperature(numValue, from, to).toFixed(4);
    }

    const categoryUnits = units[category as keyof typeof units];
    const fromFactor = categoryUnits[from as keyof typeof categoryUnits]?.factor || 1;
    const toFactor = categoryUnits[to as keyof typeof categoryUnits]?.factor || 1;
    
    const result = (numValue * fromFactor) / toFactor;
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const handleFromChange = (value: string) => {
    setFromValue(value);
    setToValue(convert(value, fromUnit, toUnit));
  };

  const handleToChange = (value: string) => {
    setToValue(value);
    setFromValue(convert(value, toUnit, fromUnit));
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
    setToValue(tempValue);
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full shadow mb-4">
            <Ruler className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Unit Converter</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Convert between different units of measurement instantly
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Unit Conversion</CardTitle>
            <CardDescription>
              Select a category and convert between different units
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={category} onValueChange={setCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="length">Length</TabsTrigger>
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="speed">Speed</TabsTrigger>
              </TabsList>
              
              {Object.keys(units).map((cat) => (
                <TabsContent key={cat} value={cat} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3 items-end">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From</label>
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(units[cat as keyof typeof units]).map(([key, unit]) => (
                            <SelectItem key={key} value={key}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        value={fromValue}
                        onChange={(e) => handleFromChange(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={swapUnits}
                        className="rounded-full"
                      >
                        <ArrowLeftRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">To</label>
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(units[cat as keyof typeof units]).map(([key, unit]) => (
                            <SelectItem key={key} value={key}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Converted value"
                        value={toValue}
                        onChange={(e) => handleToChange(e.target.value)}
                      />
                    </div>
                  </div>

                  {fromValue && toValue && fromUnit && toUnit && (
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-lg font-semibold">
                        {fromValue} {units[cat as keyof typeof units][fromUnit as keyof typeof units[typeof cat]].name} = {toValue} {units[cat as keyof typeof units][toUnit as keyof typeof units[typeof cat]].name}
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default UnitConverter;
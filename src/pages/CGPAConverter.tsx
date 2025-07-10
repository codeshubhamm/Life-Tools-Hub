import { useState } from "react";
import { Link, ArrowLeft, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CGPAConverter = () => {
  const [conversionType, setConversionType] = useState("cgpa-to-percentage");
  const [cgpa, setCgpa] = useState("");
  const [percentage, setPercentage] = useState("");
  const [gpa, setGpa] = useState("");
  const [result, setResult] = useState("");
  const [gradePoints, setGradePoints] = useState<string[]>(["", "", "", "", ""]);
  const [credits, setCredits] = useState<string[]>(["", "", "", "", ""]);

  const calculateCGPAToPercentage = () => {
    const cgpaValue = parseFloat(cgpa);
    if (!cgpaValue || cgpaValue < 0 || cgpaValue > 10) {
      setResult("Please enter a valid CGPA (0-10)");
      return;
    }
    
    // Common formula: Percentage = CGPA × 9.5
    const percentageValue = cgpaValue * 9.5;
    setResult(`${cgpaValue} CGPA = ${percentageValue.toFixed(2)}%`);
  };

  const calculatePercentageToCGPA = () => {
    const percentageValue = parseFloat(percentage);
    if (!percentageValue || percentageValue < 0 || percentageValue > 100) {
      setResult("Please enter a valid percentage (0-100)");
      return;
    }
    
    // Common formula: CGPA = Percentage ÷ 9.5
    const cgpaValue = percentageValue / 9.5;
    setResult(`${percentageValue}% = ${cgpaValue.toFixed(2)} CGPA`);
  };

  const calculateGPAToCGPA = () => {
    const gpaValue = parseFloat(gpa);
    if (!gpaValue || gpaValue < 0 || gpaValue > 4) {
      setResult("Please enter a valid GPA (0-4)");
      return;
    }
    
    // Formula: CGPA = GPA × 2.5 (approximate conversion)
    const cgpaValue = gpaValue * 2.5;
    setResult(`${gpaValue} GPA = ${cgpaValue.toFixed(2)} CGPA`);
  };

  const calculateSemesterCGPA = () => {
    const validGrades = gradePoints.filter(grade => grade && !isNaN(parseFloat(grade)));
    const validCredits = credits.filter(credit => credit && !isNaN(parseFloat(credit)));
    
    if (validGrades.length === 0 || validCredits.length === 0 || validGrades.length !== validCredits.length) {
      setResult("Please enter valid grade points and credits for at least one subject");
      return;
    }
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    for (let i = 0; i < validGrades.length; i++) {
      const grade = parseFloat(validGrades[i]);
      const credit = parseFloat(validCredits[i]);
      totalPoints += grade * credit;
      totalCredits += credit;
    }
    
    if (totalCredits === 0) {
      setResult("Total credits cannot be zero");
      return;
    }
    
    const semesterCGPA = totalPoints / totalCredits;
    setResult(`Semester CGPA: ${semesterCGPA.toFixed(2)}`);
  };

  const addSubject = () => {
    setGradePoints([...gradePoints, ""]);
    setCredits([...credits, ""]);
  };

  const removeSubject = (index: number) => {
    if (gradePoints.length > 1) {
      setGradePoints(gradePoints.filter((_, i) => i !== index));
      setCredits(credits.filter((_, i) => i !== index));
    }
  };

  const handleCalculate = () => {
    switch (conversionType) {
      case "cgpa-to-percentage":
        calculateCGPAToPercentage();
        break;
      case "percentage-to-cgpa":
        calculatePercentageToCGPA();
        break;
      case "gpa-to-cgpa":
        calculateGPAToCGPA();
        break;
      case "semester-cgpa":
        calculateSemesterCGPA();
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            CGPA/GPA Converter
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert between GPA, CGPA, and percentage easily
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Conversion Type</Label>
                <Select value={conversionType} onValueChange={setConversionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cgpa-to-percentage">CGPA to Percentage</SelectItem>
                    <SelectItem value="percentage-to-cgpa">Percentage to CGPA</SelectItem>
                    <SelectItem value="gpa-to-cgpa">GPA to CGPA</SelectItem>
                    <SelectItem value="semester-cgpa">Calculate Semester CGPA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {conversionType === "cgpa-to-percentage" && (
                <div>
                  <Label htmlFor="cgpa">Enter CGPA (0-10)</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g., 8.5"
                    step="0.01"
                    min="0"
                    max="10"
                  />
                </div>
              )}

              {conversionType === "percentage-to-cgpa" && (
                <div>
                  <Label htmlFor="percentage">Enter Percentage (0-100)</Label>
                  <Input
                    id="percentage"
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="e.g., 85"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
              )}

              {conversionType === "gpa-to-cgpa" && (
                <div>
                  <Label htmlFor="gpa">Enter GPA (0-4)</Label>
                  <Input
                    id="gpa"
                    type="number"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="e.g., 3.5"
                    step="0.01"
                    min="0"
                    max="4"
                  />
                </div>
              )}

              {conversionType === "semester-cgpa" && (
                <div className="space-y-4">
                  <Label>Enter Grade Points and Credits for Each Subject</Label>
                  {gradePoints.map((grade, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        value={grade}
                        onChange={(e) => {
                          const newGrades = [...gradePoints];
                          newGrades[index] = e.target.value;
                          setGradePoints(newGrades);
                        }}
                        placeholder={`Subject ${index + 1} Grade`}
                        type="number"
                        step="0.01"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={credits[index]}
                          onChange={(e) => {
                            const newCredits = [...credits];
                            newCredits[index] = e.target.value;
                            setCredits(newCredits);
                          }}
                          placeholder="Credits"
                          type="number"
                          step="0.5"
                        />
                        {gradePoints.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSubject(index)}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addSubject} className="w-full">
                    Add Subject
                  </Button>
                </div>
              )}

              <Button onClick={handleCalculate} className="w-full" size="lg">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Select conversion type and enter values to see the result</p>
                </div>
              )}

              {/* Conversion Table */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Common Grade Conversions</h3>
                <div className="text-sm space-y-2">
                  <div className="grid grid-cols-3 gap-2 font-medium border-b pb-2">
                    <span>CGPA</span>
                    <span>Percentage</span>
                    <span>Grade</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span>9.0 - 10.0</span>
                    <span>85% - 95%</span>
                    <span>A+</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span>8.0 - 8.9</span>
                    <span>76% - 84%</span>
                    <span>A</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span>7.0 - 7.9</span>
                    <span>67% - 75%</span>
                    <span>B+</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span>6.0 - 6.9</span>
                    <span>57% - 66%</span>
                    <span>B</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span>5.0 - 5.9</span>
                    <span>48% - 56%</span>
                    <span>C</span>
                  </div>
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

export default CGPAConverter;

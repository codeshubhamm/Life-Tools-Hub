import { useState, useEffect, useRef } from "react";
import { Keyboard, RotateCcw, Trophy, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"; // Added Link import
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TypingSpeedTester = () => {
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice. It helps improve finger dexterity and keyboard familiarity.",
    "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future in ways we never imagined possible.",
    "Reading is a fundamental skill that opens doors to knowledge and imagination. Books transport us to different worlds, teach us new concepts, and help us understand diverse perspectives.",
    "Climate change is one of the most pressing challenges of our time. It requires global cooperation, sustainable practices, and innovative solutions to protect our planet for future generations.",
    "The art of cooking combines creativity with science. Understanding ingredients, techniques, and flavors allows chefs to create memorable dining experiences that bring people together."
  ];

  useEffect(() => {
    // Select random text on component mount
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishTest();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
    setUserInput("");
    setCurrentIndex(0);
    setErrors(0);
    setTimeLeft(60);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const finishTest = () => {
    setIsActive(false);
    setEndTime(Date.now());
    calculateResults();
  };

  const resetTest = () => {
    setIsActive(false);
    setStartTime(null);
    setEndTime(null);
    setUserInput("");
    setCurrentIndex(0);
    setErrors(0);
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
    
    // Select new random text
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
  };

  const calculateResults = () => {
    const wordsTyped = userInput.trim().split(' ').length;
    const timeElapsed = (60 - timeLeft) / 60; // in minutes
    const calculatedWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    
    let errorCount = 0;
    for (let i = 0; i < Math.min(userInput.length, currentText.length); i++) {
      if (userInput[i] !== currentText[i]) {
        errorCount++;
      }
    }
    
    const calculatedAccuracy = userInput.length > 0 ? 
      Math.round(((userInput.length - errorCount) / userInput.length) * 100) : 100;
    
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setErrors(errorCount);
  };

  const handleInputChange = (value: string) => {
    if (!isActive) return;
    
    setUserInput(value);
    setCurrentIndex(value.length);
    
    // Calculate real-time WPM and accuracy
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const wordsTyped = value.trim().split(' ').length;
      const currentWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
      setWpm(currentWpm);
      
      let errorCount = 0;
      for (let i = 0; i < Math.min(value.length, currentText.length); i++) {
        if (value[i] !== currentText[i]) {
          errorCount++;
        }
      }
      
      const currentAccuracy = value.length > 0 ? 
        Math.round(((value.length - errorCount) / value.length) * 100) : 100;
      setAccuracy(currentAccuracy);
      setErrors(errorCount);
    }
    
    // Check if test is complete
    if (value.length >= currentText.length) {
      finishTest();
    }
  };

  const getCharacterClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === currentText[index] ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
    } else if (index === currentIndex) {
      return 'bg-blue-200 dark:bg-blue-800';
    }
    return 'text-muted-foreground';
  };

  const progress = (userInput.length / currentText.length) * 100;

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full shadow mb-4">
            <Keyboard className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Typing Speed Tester</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Test your typing speed and accuracy with real-time feedback
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{wpm}</div>
                <div className="text-sm text-muted-foreground">WPM</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{errors}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{timeLeft}s</div>
                <div className="text-sm text-muted-foreground">Time Left</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Text Display */}
          <Card>
            <CardHeader>
              <CardTitle>Typing Test</CardTitle>
              <CardDescription>
                Type the text below as accurately and quickly as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-lg font-mono text-lg leading-relaxed">
                  {currentText.split('').map((char, index) => (
                    <span
                      key={index}
                      className={`${getCharacterClass(index)} transition-colors duration-150`}
                    >
                      {char}
                    </span>
                  ))}
                </div>

                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  disabled={!isActive || timeLeft === 0}
                  className="w-full h-32 p-4 border rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={isActive ? "Start typing here..." : "Click 'Start Test' to begin"}
                />

                <div className="flex justify-center gap-4">
                  {!isActive && timeLeft === 60 ? (
                    <Button onClick={startTest} size="lg">
                      <Keyboard className="mr-2 h-5 w-5" />
                      Start Test
                    </Button>
                  ) : (
                    <Button onClick={resetTest} variant="outline" size="lg">
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Reset Test
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {endTime && (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                  <Trophy className="mr-2 h-5 w-5" />
                  Test Complete!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{wpm}</div>
                    <div className="text-sm text-muted-foreground">Words per minute</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{userInput.length}</div>
                    <div className="text-sm text-muted-foreground">Characters typed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Typing Speed Benchmarks:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <strong>Beginner:</strong> 10-20 WPM</li>
            <li>• <strong>Average:</strong> 30-40 WPM</li>
            <li>• <strong>Good:</strong> 50-60 WPM</li>
            <li>• <strong>Excellent:</strong> 70+ WPM</li>
            <li>• <strong>Professional:</strong> 80+ WPM</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TypingSpeedTester;
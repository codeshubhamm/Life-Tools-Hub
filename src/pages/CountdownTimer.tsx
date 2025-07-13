import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [title, setTitle] = useState("Work Session");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            toast({
              title: "Time's Up!",
              description: `${title} completed`,
            });
            // Play notification sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEeBjiO1fPSfC0GL3fL8NaYRAoXa7YAAA==');
            audio.play().catch(() => {});
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, title, toast]);

  const startTimer = () => {
    if (timeLeft === 0) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds === 0) {
        toast({
          title: "Error",
          description: "Please set a time greater than 0",
          variant: "destructive",
        });
        return;
      }
      setTimeLeft(totalSeconds);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const adjustTime = (type: 'hours' | 'minutes' | 'seconds', delta: number) => {
    if (isRunning) return;
    
    switch (type) {
      case 'hours':
        setHours(Math.max(0, Math.min(23, hours + delta)));
        break;
      case 'minutes':
        setMinutes(Math.max(0, Math.min(59, minutes + delta)));
        break;
      case 'seconds':
        setSeconds(Math.max(0, Math.min(59, seconds + delta)));
        break;
    }
  };

  const presetTimers = [
    { name: "Pomodoro", time: 25 * 60 },
    { name: "Short Break", time: 5 * 60 },
    { name: "Long Break", time: 15 * 60 },
    { name: "Exercise", time: 30 * 60 },
  ];

  const setPresetTimer = (seconds: number, name: string) => {
    if (isRunning) return;
    
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    setTitle(name);
    setTimeLeft(0);
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow mb-4">
            <Timer className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Countdown Timer</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Set a countdown timer for work, breaks, cooking, or any activity
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Set Timer</CardTitle>
              <CardDescription>
                Configure your countdown timer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Timer Name</label>
                <Input
                  placeholder="e.g. Work Session, Study Time"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isRunning}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Time</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => adjustTime('hours', -1)}
                        disabled={isRunning}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-16 text-center">
                        <span className="text-2xl font-bold">{hours.toString().padStart(2, '0')}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => adjustTime('hours', 1)}
                        disabled={isRunning}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Minutes</p>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => adjustTime('minutes', -1)}
                        disabled={isRunning}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-16 text-center">
                        <span className="text-2xl font-bold">{minutes.toString().padStart(2, '0')}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => adjustTime('minutes', 1)}
                        disabled={isRunning}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Seconds</p>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => adjustTime('seconds', -1)}
                        disabled={isRunning}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-16 text-center">
                        <span className="text-2xl font-bold">{seconds.toString().padStart(2, '0')}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => adjustTime('seconds', 1)}
                        disabled={isRunning}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Quick Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  {presetTimers.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetTimer(preset.time, preset.name)}
                      disabled={isRunning}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timer Display</CardTitle>
              <CardDescription>
                {title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
                  <div className="text-6xl md:text-7xl font-mono font-bold text-primary mb-4">
                    {timeLeft > 0 ? formatTime(timeLeft) : formatTime(hours * 3600 + minutes * 60 + seconds)}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {isRunning ? "Running..." : timeLeft > 0 ? "Paused" : "Ready to start"}
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  {!isRunning ? (
                    <Button
                      onClick={startTimer}
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      size="lg"
                      variant="outline"
                    >
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </Button>
                  )}

                  <Button
                    onClick={resetTimer}
                    size="lg"
                    variant="outline"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Perfect For:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Pomodoro Technique (25-minute work sessions)</li>
            <li>• Cooking and baking timers</li>
            <li>• Exercise and workout intervals</li>
            <li>• Study sessions and breaks</li>
            <li>• Meditation and mindfulness practice</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CountdownTimer;
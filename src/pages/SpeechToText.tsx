import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Copy, Download, Play, Pause, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "hi-IN", name: "Hindi" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "pt-BR", name: "Portuguese" },
    { code: "ru-RU", name: "Russian" },
    { code: "ja-JP", name: "Japanese" },
    { code: "ko-KR", name: "Korean" },
    { code: "zh-CN", name: "Chinese (Mandarin)" }
  ];

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      toast({
        title: "Recognition Error",
        description: "There was an error with speech recognition. Please try again.",
        variant: "destructive"
      });
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsPaused(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, toast]);

  const startRecording = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start recording. Please check microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsPaused(true);
    setIsRecording(false);
  };

  const resumeRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
    }
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive"
      });
    }
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `speech_to_text_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Text file downloaded successfully"
    });
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Speech to Text</h1>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-800 dark:text-red-200">
                Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full shadow mb-4">
            <Mic className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Speech to Text</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Convert your speech to text in real-time using voice recognition
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recording Controls</CardTitle>
              <CardDescription>
                Control your speech recording
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={language} onValueChange={setLanguage} disabled={isRecording}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center">
                  {!isRecording && !isPaused ? (
                    <Button
                      onClick={startRecording}
                      size="lg"
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    >
                      <Mic className="h-8 w-8" />
                    </Button>
                  ) : isPaused ? (
                    <Button
                      onClick={resumeRecording}
                      size="lg"
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                    >
                      <MicOff className="h-8 w-8" />
                    </Button>
                  )}
                </div>

                <div className="flex justify-center gap-2">
                  {isRecording && (
                    <Button onClick={pauseRecording} variant="outline">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={clearTranscript} variant="outline">
                    Clear
                  </Button>
                </div>

                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    isRecording ? 'bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-200' :
                    isPaused ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      isRecording ? 'bg-red-500 animate-pulse' :
                      isPaused ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    {isRecording ? 'Recording...' : isPaused ? 'Paused' : 'Ready'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Transcribed Text</CardTitle>
                  {transcript && (
                    <div className="flex gap-2">
                      <Button onClick={copyText} variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button onClick={downloadText} variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {transcript ? (
                  <div className="space-y-4">
                    <Textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="min-h-64 resize-none"
                      placeholder="Your transcribed text will appear here..."
                    />
                    <div className="text-sm text-muted-foreground">
                      Word count: {transcript.split(' ').filter(word => word.length > 0).length}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-24 text-muted-foreground">
                    <Mic className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Click the microphone button to start recording</p>
                    <p className="text-sm mt-2">Make sure to allow microphone access when prompted</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tips for Better Recognition:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Use a good quality microphone in a quiet environment</li>
            <li>• Allow microphone access when prompted by your browser</li>
            <li>• Pause briefly between sentences for better accuracy</li>
            <li>• Edit the transcribed text as needed for corrections</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SpeechToText;
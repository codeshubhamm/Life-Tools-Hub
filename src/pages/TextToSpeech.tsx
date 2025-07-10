import { useState, useRef } from "react";
import { Volume2, Play, Pause, Square, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // Load available voices
  const loadVoices = () => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
    if (availableVoices.length > 0 && !selectedVoice) {
      setSelectedVoice(availableVoices[0].name);
    }
  };

  // Load voices when component mounts and when voices change
  React.useEffect(() => {
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const speak = () => {
    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to convert to speech.",
        variant: "destructive"
      });
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      toast({
        title: "Speech Error",
        description: "There was an error with text-to-speech. Please try again.",
        variant: "destructive"
      });
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const pause = () => {
    speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const resume = () => {
    speechSynthesis.resume();
    setIsPaused(false);
    setIsPlaying(true);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const downloadAudio = () => {
    // Note: Direct audio download from speech synthesis is not supported in browsers
    // This is a limitation of the Web Speech API
    toast({
      title: "Download Not Available",
      description: "Audio download is not supported by the browser's speech synthesis API.",
      variant: "destructive"
    });
  };

  const getVoicesByLanguage = () => {
    const grouped: { [key: string]: SpeechSynthesisVoice[] } = {};
    voices.forEach(voice => {
      const lang = voice.lang.split('-')[0];
      if (!grouped[lang]) grouped[lang] = [];
      grouped[lang].push(voice);
    });
    return grouped;
  };

  const groupedVoices = getVoicesByLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6">
            <Volume2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Text to Speech Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert any text to natural-sounding speech with customizable voice options
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Voice Settings</CardTitle>
              <CardDescription>
                Customize the speech output
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Voice</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(groupedVoices).map(([lang, voiceList]) => (
                      <div key={lang}>
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                          {lang.toUpperCase()}
                        </div>
                        {voiceList.map((voice) => (
                          <SelectItem key={voice.name} value={voice.name}>
                            {voice.name} {voice.gender ? `(${voice.gender})` : ''}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Speed: {rate[0].toFixed(1)}x</label>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  min={0.1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pitch: {pitch[0].toFixed(1)}</label>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {!isPlaying && !isPaused ? (
                    <Button onClick={speak} className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                  ) : isPaused ? (
                    <Button onClick={resume} className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Resume
                    </Button>
                  ) : (
                    <Button onClick={pause} variant="outline" className="flex-1">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                  )}
                  
                  <Button onClick={stop} variant="outline">
                    <Square className="h-4 w-4" />
                  </Button>
                </div>

                <Button onClick={downloadAudio} variant="outline" className="w-full" disabled>
                  <Download className="mr-2 h-4 w-4" />
                  Download Audio
                </Button>

                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    isPlaying ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-200' :
                    isPaused ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      isPlaying ? 'bg-green-500 animate-pulse' :
                      isPaused ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    {isPlaying ? 'Playing...' : isPaused ? 'Paused' : 'Ready'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Text Input</CardTitle>
                <CardDescription>
                  Enter the text you want to convert to speech
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-64 resize-none"
                  />
                  
                  <div className="text-sm text-muted-foreground">
                    Characters: {text.length} | Words: {text.split(' ').filter(word => word.length > 0).length}
                  </div>

                  {text.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Volume2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p>Enter some text to convert to speech</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Features & Tips:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Choose from multiple voices and languages</li>
            <li>• Adjust speech speed and pitch to your preference</li>
            <li>• Pause and resume playback at any time</li>
            <li>• Works with any text length</li>
            <li>• Use punctuation for natural pauses and intonation</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TextToSpeech;
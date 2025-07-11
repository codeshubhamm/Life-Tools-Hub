
import { useState, useEffect } from "react";
import { Type, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime
    });
  }, [text]);

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-mint-green rounded-full shadow mb-4">
            <Type className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Word Counter</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Count words, characters, and reading time instantly
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <Card className="bg-mint-green/60 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Type className="h-5 w-5 mr-2" />
                  Enter Your Text
                </CardTitle>
                <CardDescription>
                  Type or paste your text below to get instant statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start typing your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[220px] resize-none rounded-xl shadow-sm"
                />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white/90 dark:bg-gray-800 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Text Statistics</CardTitle>
                <CardDescription>Live text analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.characters}</div>
                    <div className="text-xs text-muted-foreground">Characters</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.charactersNoSpaces}</div>
                    <div className="text-xs text-muted-foreground">No Spaces</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{stats.sentences}</div>
                    <div className="text-xs text-muted-foreground">Sentences</div>
                  </div>
                  <div className="text-center p-3 bg-pink-50 dark:bg-pink-950 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">{stats.paragraphs}</div>
                    <div className="text-xs text-muted-foreground">Paragraphs</div>
                  </div>
                  <div className="text-center p-3 bg-teal-50 dark:bg-teal-950 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">{stats.readingTime}</div>
                    <div className="text-xs text-muted-foreground">Min Read</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Helpful Tip Section */}
        <div className="mt-10 text-center">
          <div className="inline-block bg-mint-green/40 rounded-xl px-6 py-4 text-base text-gray-700 font-medium shadow-sm">
            💡 <span className="font-semibold">Tip:</span> Paste any text, essay, or article to instantly see word, character, and reading time stats. Great for students, writers, and professionals!
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WordCounter;

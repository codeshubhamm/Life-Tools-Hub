import { useState, useEffect } from "react";
import { Heart, RefreshCw, Copy, Check, Share2, ArrowLeft, Quote } from "lucide-react";
import { Link } from "react-router-dom"; // Added Link import
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const MotivationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: "", author: "" });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: "Unknown" },
    { text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" },
    { text: "Experience is a hard teacher because she gives the test first, the lesson afterwards.", author: "Vernon Law" },
    { text: "To live is the rarest thing in the world. Most people just exist.", author: "Oscar Wilde" },
    { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Go confidently in the direction of your dreams! Live the life you've imagined.", author: "Henry David Thoreau" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Dream bigger. Do bigger.", author: "Unknown" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const copyQuote = async () => {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}`;
    try {
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Success",
        description: "Quote copied to clipboard!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy quote",
        variant: "destructive",
      });
    }
  };

  const shareQuote = async () => {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Motivational Quote",
          text: quoteText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      copyQuote();
    }
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full shadow mb-4">
            <Quote className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Motivational Quotes</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Get inspired with daily motivational quotes
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Inspiration</CardTitle>
            <CardDescription>
              Click "New Quote" to get a fresh dose of motivation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-lg">
                <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-4 leading-relaxed">
                  "{currentQuote.text}"
                </blockquote>
                <cite className="text-lg text-muted-foreground font-medium">
                  — {currentQuote.author}
                </cite>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={getRandomQuote}
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  New Quote
                </Button>

                <Button
                  onClick={copyQuote}
                  variant="outline"
                  size="lg"
                >
                  {copied ? (
                    <Check className="mr-2 h-5 w-5" />
                  ) : (
                    <Copy className="mr-2 h-5 w-5" />
                  )}
                  {copied ? "Copied!" : "Copy Quote"}
                </Button>

                <Button
                  onClick={shareQuote}
                  variant="outline"
                  size="lg"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">Daily Motivation</h3>
              <p className="text-sm text-muted-foreground">
                Start your day with inspiring quotes from successful people
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="font-semibold mb-2">Always Fresh</h3>
              <p className="text-sm text-muted-foreground">
                Get a new quote anytime you need a boost of inspiration
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Share Inspiration</h3>
              <p className="text-sm text-muted-foreground">
                Easily copy and share your favorite quotes with others
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Why Read Motivational Quotes?</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Boost your mood and positive thinking</li>
            <li>• Provide perspective during challenging times</li>
            <li>• Inspire action and personal growth</li>
            <li>• Remind you of your potential and capabilities</li>
            <li>• Help maintain focus on your goals</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MotivationalQuotes;

import { useState } from "react";
import { Link, ArrowLeft, Copy, RefreshCw, PartyPopper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const BirthdayWishGenerator = () => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [age, setAge] = useState("");
  const [tone, setTone] = useState("warm");
  const [generatedWishes, setGeneratedWishes] = useState<string[]>([]);
  const { toast } = useToast();

  const wishTemplates = {
    warm: {
      friend: [
        "Happy Birthday, {name}! 🎉 Hope your special day is filled with happiness and laughter. You deserve all the wonderful things life has to offer!",
        "🎂 Wishing you the happiest of birthdays, {name}! May this new year of life bring you joy, success, and amazing adventures!",
        "Happy Birthday to an amazing friend! 🎈 {name}, you bring so much joy to everyone around you. Have a fantastic day!"
      ],
      family: [
        "Happy Birthday, dear {name}! 💝 You mean the world to us and we're so grateful to have you in our lives. Enjoy your special day!",
        "🎊 Happy Birthday, {name}! Another year of wonderful memories with you. May this year be filled with blessings and happiness!",
        "Wishing you the most beautiful birthday, {name}! 🌟 You are such a special part of our family. Love you!"
      ],
      colleague: [
        "Happy Birthday, {name}! 🎉 Wishing you a day filled with happiness and a year filled with success and prosperity!",
        "🎂 Happy Birthday! May this special day bring you joy and may the year ahead be filled with great achievements, {name}!",
        "Wishing you a wonderful birthday, {name}! 🎈 Hope your day is as fantastic as you are!"
      ]
    },
    funny: {
      friend: [
        "Happy Birthday, {name}! 🎉 You're officially old enough to know better, but still young enough to get away with it!",
        "🎂 Another year older, another year wiser... or so they say! Happy Birthday, {name}! Let's party like it's your birthday (because it is)!",
        "Happy Birthday, {name}! 🎈 Age is just a number, but in your case, it's a really big number! 😄"
      ],
      family: [
        "Happy Birthday, {name}! 🎊 You're not getting older, you're just becoming a classic! Vintage is always in style!",
        "🎉 Happy Birthday! Don't worry about your age, {name} - you're still younger than you'll be next year!",
        "Happy Birthday, {name}! 🎂 Remember, you're not old, you just have more experience at being awesome!"
      ],
      colleague: [
        "Happy Birthday, {name}! 🎉 May your coffee be strong and your Monday be short this year!",
        "🎂 Happy Birthday! Another year of pretending to work hard while actually just being awesome, {name}!",
        "Happy Birthday, {name}! 🎈 May your workload be light and your cake be heavy today!"
      ]
    },
    formal: {
      friend: [
        "Dear {name}, on this special occasion of your birthday, I extend my warmest wishes for happiness, health, and prosperity. 🎉",
        "🎂 {name}, may this birthday mark the beginning of a year filled with good fortune and meaningful achievements. Best wishes!",
        "On your birthday, {name}, I wish you continued success and happiness in all your endeavors. 🎈"
      ],
      family: [
        "Dear {name}, on your birthday, we celebrate not just another year of your life, but the joy and love you bring to our family. 💝",
        "🎊 {name}, may this special day be a celebration of all the wonderful qualities that make you so dear to us. Happy Birthday!",
        "On this blessed day, we wish you, {name}, a birthday filled with joy and a year ahead filled with blessings. 🌟"
      ],
      colleague: [
        "Dear {name}, please accept my sincere wishes for a very happy birthday and continued success in your professional endeavors. 🎉",
        "🎂 {name}, on your special day, I wish you happiness, good health, and success in all your future projects. Happy Birthday!",
        "May this birthday bring you joy and may the coming year be filled with professional achievements and personal satisfaction, {name}. 🎈"
      ]
    }
  };

  const generateWishes = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter the person's name.",
        variant: "destructive"
      });
      return;
    }

    const relationKey = relation || "friend";
    const toneKey = tone as keyof typeof wishTemplates;
    const templates = wishTemplates[toneKey][relationKey as keyof typeof wishTemplates[typeof toneKey]] || wishTemplates[toneKey].friend;
    
    const wishes = templates.map(template => {
      let wish = template.replace(/{name}/g, name);
      if (age) {
        // Add age-specific messages
        const ageNum = parseInt(age);
        if (ageNum % 10 === 0) {
          wish += ` What a milestone - ${age} years of awesomeness! 🎊`;
        } else if (ageNum >= 21 && tone === "funny") {
          wish += ` Time to adult like a pro! 😄`;
        } else if (ageNum >= 18 && ageNum < 21) {
          wish += ` Welcome to adulthood! 🎓`;
        }
      }
      return wish;
    });

    setGeneratedWishes(wishes);
  };

  const copyWish = async (wish: string) => {
    try {
      await navigator.clipboard.writeText(wish);
      toast({
        title: "Copied!",
        description: "Birthday wish copied to clipboard."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy wish to clipboard.",
        variant: "destructive"
      });
    }
  };

  const shareWish = (wish: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Birthday Wish for ${name}`,
        text: wish
      });
    } else {
      copyWish(wish);
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full shadow mb-4">
            <PartyPopper className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Birthday Wish Generator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Create personalized birthday messages instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create Your Birthday Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Person's Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the birthday person's name"
                />
              </div>

              <div>
                <Label htmlFor="relation">Relationship</Label>
                <Select value={relation} onValueChange={setRelation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="colleague">Colleague</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="age">Age (Optional)</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter their age for personalized messages"
                />
              </div>

              <div>
                <Label htmlFor="tone">Message Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warm">Warm & Heartfelt</SelectItem>
                    <SelectItem value="funny">Funny & Playful</SelectItem>
                    <SelectItem value="formal">Formal & Respectful</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateWishes} className="w-full" size="lg">
                <PartyPopper className="mr-2 h-4 w-4" />
                Generate Birthday Wishes
              </Button>
            </CardContent>
          </Card>

          {/* Generated Wishes */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Wishes</CardTitle>
                {generatedWishes.length > 0 && (
                  <Button onClick={generateWishes} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedWishes.length > 0 ? (
                <div className="space-y-4">
                  {generatedWishes.map((wish, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="text-sm text-muted-foreground font-medium">
                        Option {index + 1}
                      </div>
                      <div className="text-foreground leading-relaxed">
                        {wish}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => copyWish(wish)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button
                          onClick={() => shareWish(wish)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <PartyPopper className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Fill in the details and generate personalized birthday wishes!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips for Great Birthday Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">For Friends:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Keep it personal and mention shared memories</li>
                  <li>Use emojis to make it more fun</li>
                  <li>Include inside jokes if appropriate</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">For Family:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Express gratitude and love</li>
                  <li>Mention family bonds and traditions</li>
                  <li>Keep it heartfelt and sincere</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">For Colleagues:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Keep it professional but friendly</li>
                  <li>Wish them success in their career</li>
                  <li>Avoid overly personal references</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">General Tips:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Be genuine and authentic</li>
                  <li>Consider their personality and preferences</li>
                  <li>Add specific age milestones when relevant</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BirthdayWishGenerator;

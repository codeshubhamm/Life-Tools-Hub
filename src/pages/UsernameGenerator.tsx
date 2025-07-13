import { useState } from "react";
import { User, Copy, RefreshCw, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const UsernameGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("gamer");
  const [generatedUsernames, setGeneratedUsernames] = useState<string[]>([]);
  const { toast } = useToast();

  const usernameTemplates = {
    gamer: {
      prefixes: ["Epic", "Pro", "Elite", "Shadow", "Dark", "Fire", "Ice", "Storm", "Cyber", "Neon", "Alpha", "Beta", "Omega", "Mega", "Ultra"],
      suffixes: ["Gamer", "Player", "Master", "Lord", "King", "Warrior", "Hunter", "Slayer", "Ninja", "Assassin", "Legend", "Hero", "Champion", "Beast", "Wolf"],
      patterns: [
        "{keyword}{number}",
        "{prefix}{keyword}",
        "{keyword}{suffix}",
        "{prefix}{keyword}{number}",
        "{keyword}_{suffix}",
        "x{keyword}x",
        "{keyword}_Pro",
        "The{keyword}",
        "{keyword}Master",
        "{prefix}_{keyword}"
      ]
    },
    aesthetic: {
      prefixes: ["Soft", "Moon", "Star", "Cloud", "Dream", "Angel", "Fairy", "Pearl", "Rose", "Lily", "Sage", "Ivy", "Luna", "Nova", "Aura"],
      suffixes: ["Vibes", "Dreams", "Glow", "Shine", "Bliss", "Grace", "Belle", "Fae", "Mist", "Dew", "Bloom", "Whisper", "Serenity", "Harmony", "Peace"],
      patterns: [
        "{keyword}_{suffix}",
        "{prefix}{keyword}",
        "{keyword}.{suffix}",
        "soft{keyword}",
        "{keyword}moon",
        "{prefix}.{keyword}",
        "{keyword}_aesthetic",
        "dreamy{keyword}",
        "{keyword}vibes",
        "ethereal{keyword}"
      ]
    },
    professional: {
      prefixes: ["Dr", "Prof", "Expert", "Senior", "Lead", "Chief", "Prime", "Top", "Best", "Smart", "Wise", "Tech", "Digital", "Modern", "Advanced"],
      suffixes: ["Expert", "Pro", "Specialist", "Consultant", "Advisor", "Manager", "Director", "Leader", "Guru", "Mentor", "Coach", "Analyst", "Developer", "Designer", "Engineer"],
      patterns: [
        "{keyword}{suffix}",
        "{prefix}{keyword}",
        "{keyword}_{suffix}",
        "{keyword}.{suffix}",
        "{prefix}_{keyword}",
        "{keyword}Consulting",
        "{keyword}Solutions",
        "{keyword}Expert",
        "The{keyword}",
        "{keyword}Pro"
      ]
    },
    creative: {
      prefixes: ["Art", "Creative", "Design", "Color", "Paint", "Sketch", "Draw", "Craft", "Make", "Build", "Create", "Inspire", "Vision", "Pixel", "Canvas"],
      suffixes: ["Artist", "Creator", "Designer", "Maker", "Crafter", "Builder", "Painter", "Sketcher", "Drawer", "Visionary", "Studio", "Works", "Art", "Design", "Creative"],
      patterns: [
        "{keyword}{suffix}",
        "{prefix}{keyword}",
        "{keyword}_{suffix}",
        "{keyword}.art",
        "{keyword}studio",
        "creative{keyword}",
        "{keyword}designs",
        "art{keyword}",
        "{keyword}_creative",
        "{prefix}.{keyword}"
      ]
    },
    business: {
      prefixes: ["Biz", "Corp", "Pro", "Elite", "Prime", "Top", "Best", "Smart", "Quick", "Fast", "Secure", "Trust", "Reliable", "Global", "Digital"],
      suffixes: ["Corp", "LLC", "Inc", "Group", "Solutions", "Services", "Systems", "Tech", "Digital", "Global", "Pro", "Expert", "Consulting", "Ventures", "Enterprises"],
      patterns: [
        "{keyword}{suffix}",
        "{prefix}{keyword}",
        "{keyword}_{suffix}",
        "{keyword}.{suffix}",
        "{keyword}Solutions",
        "{keyword}Corp",
        "{keyword}Pro",
        "The{keyword}",
        "{keyword}Group",
        "{prefix}_{keyword}"
      ]
    }
  };

  const generateUsernames = () => {
    if (!keyword.trim()) {
      toast({
        title: "Keyword Required",
        description: "Please enter a keyword to generate usernames.",
        variant: "destructive"
      });
      return;
    }

    const templates = usernameTemplates[category as keyof typeof usernameTemplates];
    const usernames: string[] = [];

    // Generate usernames using different patterns
    for (let i = 0; i < 10; i++) {
      const pattern = templates.patterns[Math.floor(Math.random() * templates.patterns.length)];
      const prefix = templates.prefixes[Math.floor(Math.random() * templates.prefixes.length)];
      const suffix = templates.suffixes[Math.floor(Math.random() * templates.suffixes.length)];
      const number = Math.floor(Math.random() * 999) + 1;

      let username = pattern
        .replace(/{keyword}/g, keyword)
        .replace(/{prefix}/g, prefix)
        .replace(/{suffix}/g, suffix)
        .replace(/{number}/g, number.toString());

      // Clean up the username
      username = username.replace(/\s+/g, '').toLowerCase();
      
      // Capitalize first letter for some categories
      if (category === 'professional' || category === 'business') {
        username = username.charAt(0).toUpperCase() + username.slice(1);
      }

      if (!usernames.includes(username)) {
        usernames.push(username);
      }
    }

    setGeneratedUsernames(usernames.slice(0, 8));
  };

  const copyUsername = async (username: string) => {
    try {
      await navigator.clipboard.writeText(username);
      toast({
        title: "Copied!",
        description: "Username copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy username",
        variant: "destructive"
      });
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow mb-4">
            <User className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Username Generator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Generate unique usernames for any platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Username Preferences</CardTitle>
              <CardDescription>
                Customize your username generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Keyword/Base Word</label>
                <Input
                  placeholder="e.g., ninja, star, tech, art"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter a word that represents you or your interests
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gamer">🎮 Gaming</SelectItem>
                    <SelectItem value="aesthetic">✨ Aesthetic</SelectItem>
                    <SelectItem value="professional">💼 Professional</SelectItem>
                    <SelectItem value="creative">🎨 Creative</SelectItem>
                    <SelectItem value="business">🏢 Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateUsernames} className="w-full" size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Usernames
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Usernames</CardTitle>
                {generatedUsernames.length > 0 && (
                  <Button onClick={generateUsernames} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedUsernames.length > 0 ? (
                <div className="space-y-3">
                  {generatedUsernames.map((username, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-mono text-foreground">{username}</span>
                      <Button
                        onClick={() => copyUsername(username)}
                        variant="ghost"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <User className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Enter a keyword and generate unique usernames!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Username Tips:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Keep it memorable and easy to spell</li>
            <li>• Avoid using personal information like birth year</li>
            <li>• Check availability across different platforms</li>
            <li>• Consider how it sounds when spoken aloud</li>
            <li>• Make sure it represents your personality or brand</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UsernameGenerator;
import { useState } from "react";
import { Instagram, Copy, RefreshCw, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const InstagramBioGenerator = () => {
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("stylish");
  const [addEmojis, setAddEmojis] = useState(true);
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const { toast } = useToast();

  const bioTemplates = {
    stylish: [
      "✨ {keywords} enthusiast | Living my best life 💫",
      "🌟 {keywords} lover | Creating magic daily ✨",
      "💎 {keywords} vibes only | Chasing dreams 🌙",
      "🦋 {keywords} soul | Spreading positivity ☀️",
      "🌸 {keywords} addict | Making memories 📸"
    ],
    funny: [
      "🤪 Professional {keywords} procrastinator | Send help 😅",
      "😂 {keywords} expert (self-proclaimed) | 99% coffee ☕",
      "🙃 {keywords} enthusiast | Adulting is hard 🤷‍♀️",
      "😎 {keywords} ninja | Powered by pizza 🍕",
      "🤓 {keywords} geek | Warning: May contain sarcasm ⚠️"
    ],
    clean: [
      "{keywords} passionate | Believer in good vibes",
      "{keywords} enthusiast | Making a difference daily",
      "{keywords} lover | Grateful for every moment",
      "{keywords} focused | Building something beautiful",
      "{keywords} driven | Living with purpose"
    ],
    motivational: [
      "💪 {keywords} warrior | Never give up 🔥",
      "🚀 {keywords} dreamer | Sky's the limit ⭐",
      "⚡ {keywords} hustler | Grinding every day 💯",
      "🎯 {keywords} focused | Success is my only option 🏆",
      "🌟 {keywords} believer | Making it happen ✊"
    ],
    aesthetic: [
      "🌙 {keywords} soul • soft vibes only ☁️",
      "🕊️ {keywords} heart • finding beauty everywhere 🌿",
      "🤍 {keywords} spirit • minimalist life 🌾",
      "🦢 {keywords} dreamer • ethereal moments 🌸",
      "✨ {keywords} energy • golden hour feelings 🌅"
    ]
  };

  const generateBios = () => {
    if (!keywords.trim()) {
      toast({
        title: "Keywords Required",
        description: "Please enter some keywords to generate bios.",
        variant: "destructive"
      });
      return;
    }

    const templates = bioTemplates[tone as keyof typeof bioTemplates];
    const keywordList = keywords.split(',').map(k => k.trim()).join(' & ');
    
    let bios = templates.map(template => 
      template.replace(/{keywords}/g, keywordList)
    );

    if (!addEmojis) {
      bios = bios.map(bio => bio.replace(/[^\w\s|&•]/g, '').replace(/\s+/g, ' ').trim());
    }

    setGeneratedBios(bios);
  };

  const copyBio = async (bio: string) => {
    try {
      await navigator.clipboard.writeText(bio);
      toast({
        title: "Copied!",
        description: "Bio copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy bio",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-6">
            <Instagram className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Instagram Bio Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create catchy and unique Instagram bios that represent your personality
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bio Preferences</CardTitle>
              <CardDescription>
                Customize your bio generation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Keywords/Interests</label>
                <Input
                  placeholder="e.g., travel, photography, coffee"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple keywords with commas
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stylish">✨ Stylish & Trendy</SelectItem>
                    <SelectItem value="funny">😂 Funny & Quirky</SelectItem>
                    <SelectItem value="clean">🤍 Clean & Simple</SelectItem>
                    <SelectItem value="motivational">💪 Motivational</SelectItem>
                    <SelectItem value="aesthetic">🌙 Aesthetic & Soft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="add-emojis"
                  checked={addEmojis}
                  onCheckedChange={setAddEmojis}
                />
                <label htmlFor="add-emojis" className="text-sm font-medium">
                  Include emojis
                </label>
              </div>

              <Button onClick={generateBios} className="w-full" size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Bios
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Bios</CardTitle>
                {generatedBios.length > 0 && (
                  <Button onClick={generateBios} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedBios.length > 0 ? (
                <div className="space-y-4">
                  {generatedBios.map((bio, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="text-sm text-muted-foreground font-medium">
                        Option {index + 1}
                      </div>
                      <div className="text-foreground leading-relaxed">
                        {bio}
                      </div>
                      <Button
                        onClick={() => copyBio(bio)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Bio
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Instagram className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Enter your keywords and generate unique bios!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Bio Tips:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Keep it under 150 characters for best visibility</li>
            <li>• Use line breaks to make it more readable</li>
            <li>• Include a call-to-action or link</li>
            <li>• Show your personality and interests</li>
            <li>• Update regularly to keep it fresh</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InstagramBioGenerator;
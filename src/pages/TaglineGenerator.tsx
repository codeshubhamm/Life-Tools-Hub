import { useState } from "react";
import { Lightbulb, Copy, RefreshCw, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const TaglineGenerator = () => {
  const [brandName, setBrandName] = useState("");
  const [brandType, setBrandType] = useState("");
  const [category, setCategory] = useState("business");
  const [generatedTaglines, setGeneratedTaglines] = useState<string[]>([]);
  const { toast } = useToast();

  const taglineTemplates = {
    business: {
      tech: [
        "{brand} - Innovation at your fingertips",
        "{brand} - Where technology meets simplicity",
        "{brand} - Powering your digital future",
        "{brand} - Smart solutions, smarter results",
        "{brand} - Technology that works for you"
      ],
      food: [
        "{brand} - Taste the difference",
        "{brand} - Where flavor meets passion",
        "{brand} - Fresh. Delicious. Always.",
        "{brand} - Crafted with love, served with pride",
        "{brand} - Your taste, our mission"
      ],
      fashion: [
        "{brand} - Style redefined",
        "{brand} - Where fashion meets confidence",
        "{brand} - Wear your story",
        "{brand} - Elegance in every thread",
        "{brand} - Fashion that speaks volumes"
      ],
      fitness: [
        "{brand} - Stronger every day",
        "{brand} - Your fitness, our passion",
        "{brand} - Transform your limits",
        "{brand} - Where strength meets style",
        "{brand} - Fitness reimagined"
      ],
      education: [
        "{brand} - Learning without limits",
        "{brand} - Where knowledge grows",
        "{brand} - Empowering minds, shaping futures",
        "{brand} - Education that inspires",
        "{brand} - Your journey to excellence"
      ]
    },
    personal: {
      creative: [
        "{brand} - Creating magic, one project at a time",
        "{brand} - Where creativity comes alive",
        "{brand} - Bringing visions to life",
        "{brand} - Art with heart",
        "{brand} - Creativity unleashed"
      ],
      professional: [
        "{brand} - Excellence in every detail",
        "{brand} - Your success, our commitment",
        "{brand} - Professional. Reliable. Results.",
        "{brand} - Where expertise meets passion",
        "{brand} - Delivering beyond expectations"
      ],
      lifestyle: [
        "{brand} - Living life beautifully",
        "{brand} - Your lifestyle, elevated",
        "{brand} - Where life meets luxury",
        "{brand} - Curating moments that matter",
        "{brand} - Life, but better"
      ]
    },
    product: {
      innovative: [
        "{brand} - Innovation you can trust",
        "{brand} - The future is here",
        "{brand} - Redefining possibilities",
        "{brand} - Smart. Simple. Powerful.",
        "{brand} - Where innovation meets perfection"
      ],
      premium: [
        "{brand} - Luxury redefined",
        "{brand} - Excellence in every detail",
        "{brand} - Premium quality, premium experience",
        "{brand} - Where luxury meets functionality",
        "{brand} - The finest choice"
      ],
      everyday: [
        "{brand} - Making life easier",
        "{brand} - Everyday excellence",
        "{brand} - Simple solutions, big impact",
        "{brand} - Your daily companion",
        "{brand} - Life made simple"
      ]
    }
  };

  const generateTaglines = () => {
    if (!brandName.trim()) {
      toast({
        title: "Brand Name Required",
        description: "Please enter your brand name.",
        variant: "destructive"
      });
      return;
    }

    const categoryTemplates = taglineTemplates[category as keyof typeof taglineTemplates];
    const typeTemplates = brandType ? 
      categoryTemplates[brandType as keyof typeof categoryTemplates] || 
      Object.values(categoryTemplates).flat() :
      Object.values(categoryTemplates).flat();

    // Get random selection of templates
    const shuffled = [...typeTemplates].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const taglines = selected.map(template => 
      template.replace(/{brand}/g, brandName)
    );

    setGeneratedTaglines(taglines);
  };

  const copyTagline = async (tagline: string) => {
    try {
      await navigator.clipboard.writeText(tagline);
      toast({
        title: "Copied!",
        description: "Tagline copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy tagline",
        variant: "destructive"
      });
    }
  };

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full shadow mb-4">
            <Lightbulb className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Tagline Generator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Create catchy and memorable taglines for your brand, product, or business
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>
                Tell us about your brand to generate relevant taglines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Name *</label>
                <Input
                  placeholder="Enter your brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="personal">Personal Brand</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type/Industry</label>
                <Select value={brandType} onValueChange={setBrandType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {category === "business" && (
                      <>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="fashion">Fashion & Style</SelectItem>
                        <SelectItem value="fitness">Health & Fitness</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </>
                    )}
                    {category === "personal" && (
                      <>
                        <SelectItem value="creative">Creative/Artist</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </>
                    )}
                    {category === "product" && (
                      <>
                        <SelectItem value="innovative">Innovative</SelectItem>
                        <SelectItem value="premium">Premium/Luxury</SelectItem>
                        <SelectItem value="everyday">Everyday Use</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateTaglines} className="w-full" size="lg">
                <Zap className="mr-2 h-4 w-4" />
                Generate Taglines
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Taglines</CardTitle>
                {generatedTaglines.length > 0 && (
                  <Button onClick={generateTaglines} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedTaglines.length > 0 ? (
                <div className="space-y-4">
                  {generatedTaglines.map((tagline, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="text-sm text-muted-foreground font-medium">
                        Option {index + 1}
                      </div>
                      <div className="text-lg font-medium text-foreground">
                        {tagline}
                      </div>
                      <Button
                        onClick={() => copyTagline(tagline)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Tagline
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Lightbulb className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Enter your brand details to generate catchy taglines!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Great Tagline Tips:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Keep it short and memorable (under 10 words)</li>
            <li>• Make it unique to your brand</li>
            <li>• Focus on benefits, not features</li>
            <li>• Use active voice and strong verbs</li>
            <li>• Test with your target audience</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TaglineGenerator;
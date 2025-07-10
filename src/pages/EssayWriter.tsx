import { useState } from "react";
import { PenTool, Copy, Download, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const EssayWriter = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("educational");
  const [wordLimit, setWordLimit] = useState("300");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const contentTemplates = {
    educational: {
      introduction: [
        "In today's world, {topic} has become increasingly important due to its significant impact on society.",
        "The concept of {topic} represents a fundamental aspect of modern life that deserves careful examination.",
        "{topic} is a subject that has garnered considerable attention from researchers and practitioners alike.",
        "Understanding {topic} is crucial for anyone seeking to comprehend the complexities of contemporary issues."
      ],
      body: [
        "Research has shown that {topic} plays a vital role in shaping our understanding of the world around us.",
        "The implications of {topic} extend far beyond its immediate applications, influencing various aspects of daily life.",
        "Experts in the field have identified several key factors that contribute to the significance of {topic}.",
        "The evolution of {topic} over time demonstrates its adaptability and continued relevance in modern society."
      ],
      conclusion: [
        "In conclusion, {topic} remains a critical area of study that will continue to shape our future.",
        "The importance of {topic} cannot be overstated, as it continues to influence various aspects of human experience.",
        "As we move forward, understanding {topic} will be essential for addressing the challenges of tomorrow.",
        "The study of {topic} provides valuable insights that can guide us toward more informed decision-making."
      ]
    },
    creative: {
      introduction: [
        "Imagine a world where {topic} transforms everything we thought we knew about life itself.",
        "The story of {topic} begins not with facts and figures, but with a spark of human curiosity.",
        "Picture this: {topic} as the invisible thread that weaves through the fabric of our existence.",
        "What if I told you that {topic} holds the key to unlocking mysteries we never knew existed?"
      ],
      body: [
        "Like a painter with a blank canvas, {topic} offers endless possibilities for exploration and discovery.",
        "The beauty of {topic} lies not just in what it is, but in what it represents for human potential.",
        "Through the lens of {topic}, we can see reflections of our deepest hopes and aspirations.",
        "The journey into {topic} is like opening a door to a room you never knew was there."
      ],
      conclusion: [
        "And so, {topic} remains not just a concept, but a gateway to understanding ourselves.",
        "In the end, {topic} teaches us that the most profound truths often lie in the simplest observations.",
        "The magic of {topic} continues to inspire and challenge us to see the world with fresh eyes.",
        "As we close this exploration of {topic}, we're left with more questions than answers – and that's exactly as it should be."
      ]
    },
    persuasive: {
      introduction: [
        "It's time we seriously consider the critical importance of {topic} in our society today.",
        "The evidence is clear: {topic} represents one of the most pressing issues of our time.",
        "We can no longer ignore the significant impact that {topic} has on our daily lives.",
        "The moment has come to take decisive action regarding {topic} and its far-reaching consequences."
      ],
      body: [
        "Consider the overwhelming evidence that supports the importance of addressing {topic} immediately.",
        "The benefits of understanding and implementing solutions related to {topic} are undeniable.",
        "Experts across multiple fields agree that {topic} requires our urgent attention and resources.",
        "The cost of inaction regarding {topic} far outweighs any temporary inconvenience of addressing it now."
      ],
      conclusion: [
        "The choice is clear: we must act now to address {topic} before it's too late.",
        "The future depends on our willingness to take {topic} seriously and implement meaningful change.",
        "By embracing the importance of {topic}, we can create a better world for future generations.",
        "The time for debate is over – {topic} demands action, and that action must begin today."
      ]
    }
  };

  const generateContent = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate content.",
        variant: "destructive"
      });
      return;
    }

    const templates = contentTemplates[tone as keyof typeof contentTemplates];
    const targetWords = parseInt(wordLimit);
    
    // Select random templates
    const intro = templates.introduction[Math.floor(Math.random() * templates.introduction.length)];
    const body1 = templates.body[Math.floor(Math.random() * templates.body.length)];
    const body2 = templates.body[Math.floor(Math.random() * templates.body.length)];
    const conclusion = templates.conclusion[Math.floor(Math.random() * templates.conclusion.length)];
    
    let content = [intro, body1, body2, conclusion]
      .map(template => template.replace(/{topic}/g, topic))
      .join('\n\n');

    // Adjust content length based on word limit
    const words = content.split(' ');
    if (words.length > targetWords) {
      content = words.slice(0, targetWords).join(' ') + '...';
    } else if (words.length < targetWords * 0.8) {
      // Add more content if too short
      const additionalBody = templates.body[Math.floor(Math.random() * templates.body.length)]
        .replace(/{topic}/g, topic);
      content = content.replace(conclusion, additionalBody + '\n\n' + conclusion);
    }

    setGeneratedContent(content);
    setIsEditing(false);
  };

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy content",
        variant: "destructive"
      });
    }
  };

  const downloadContent = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `essay_${topic.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Essay downloaded successfully"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6">
            <PenTool className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Essay & Paragraph Writer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate well-structured essays and paragraphs on any topic
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Configure your essay parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic *</label>
                <Input
                  placeholder="e.g., Climate Change, Technology, Education"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Writing Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="educational">📚 Educational</SelectItem>
                    <SelectItem value="creative">🎨 Creative</SelectItem>
                    <SelectItem value="persuasive">💪 Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Word Limit</label>
                <Select value={wordLimit} onValueChange={setWordLimit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="150">150 words</SelectItem>
                    <SelectItem value="300">300 words</SelectItem>
                    <SelectItem value="500">500 words</SelectItem>
                    <SelectItem value="750">750 words</SelectItem>
                    <SelectItem value="1000">1000 words</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateContent} className="w-full" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Content
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Generated Content</CardTitle>
                  {generatedContent && (
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
                        {isEditing ? "Preview" : "Edit"}
                      </Button>
                      <Button onClick={copyContent} variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button onClick={downloadContent} variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    {isEditing ? (
                      <Textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        className="min-h-96 resize-none"
                      />
                    ) : (
                      <div className="bg-muted/50 p-6 rounded-lg min-h-96">
                        <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                          {generatedContent}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-sm text-muted-foreground">
                      Word count: {generatedContent.split(' ').length} words
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-24 text-muted-foreground">
                    <PenTool className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Enter a topic and generate your essay content</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Writing Tips:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Use the generated content as a starting point and customize it</li>
            <li>• Add specific examples and evidence to support your points</li>
            <li>• Ensure smooth transitions between paragraphs</li>
            <li>• Proofread and edit for clarity and coherence</li>
            <li>• Cite sources when using factual information</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EssayWriter;
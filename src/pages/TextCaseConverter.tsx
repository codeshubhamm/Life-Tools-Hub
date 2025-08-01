import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TextCaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [copiedCase, setCopiedCase] = useState<string | null>(null);
  const { toast } = useToast();

  const convertToUpperCase = () => inputText.toUpperCase();
  const convertToLowerCase = () => inputText.toLowerCase();
  const convertToTitleCase = () => {
    return inputText.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };
  const convertToSentenceCase = () => {
    return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
  };
  const convertToCamelCase = () => {
    return inputText
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  };
  const convertToPascalCase = () => {
    return inputText
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, '');
  };
  const convertToSnakeCase = () => {
    return inputText
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  };
  const convertToKebabCase = () => {
    return inputText
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
  };

  const copyToClipboard = async (text: string, caseType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCase(caseType);
      setTimeout(() => setCopiedCase(null), 2000);
      toast({
        title: "Success",
        description: `${caseType} text copied to clipboard!`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const cases = [
    { name: "UPPER CASE", func: convertToUpperCase, example: "HELLO WORLD" },
    { name: "lower case", func: convertToLowerCase, example: "hello world" },
    { name: "Title Case", func: convertToTitleCase, example: "Hello World" },
    { name: "Sentence case", func: convertToSentenceCase, example: "Hello world" },
    { name: "camelCase", func: convertToCamelCase, example: "helloWorld" },
    { name: "PascalCase", func: convertToPascalCase, example: "HelloWorld" },
    { name: "snake_case", func: convertToSnakeCase, example: "hello_world" },
    { name: "kebab-case", func: convertToKebabCase, example: "hello-world" },
  ];

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full shadow mb-4">
            <Type className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Text Case Converter</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Convert text between different cases and formats
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Your Text</CardTitle>
            <CardDescription>
              Type or paste the text you want to convert
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 resize-none"
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((caseOption) => (
            <Card key={caseOption.name}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{caseOption.name}</CardTitle>
                <CardDescription className="text-sm">
                  Example: {caseOption.example}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg min-h-20 border">
                    <p className="text-sm break-words">
                      {inputText ? caseOption.func() : `Your ${caseOption.name} text will appear here`}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => copyToClipboard(caseOption.func(), caseOption.name)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!inputText}
                  >
                    {copiedCase === caseOption.name ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copiedCase === caseOption.name ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Case Types Explained:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• <strong>UPPER CASE:</strong> All letters in uppercase</li>
            <li>• <strong>lower case:</strong> All letters in lowercase</li>
            <li>• <strong>Title Case:</strong> First letter of each word capitalized</li>
            <li>• <strong>Sentence case:</strong> First letter of the sentence capitalized</li>
            <li>• <strong>camelCase:</strong> First word lowercase, subsequent words capitalized, no spaces</li>
            <li>• <strong>PascalCase:</strong> All words capitalized, no spaces</li>
            <li>• <strong>snake_case:</strong> All lowercase with underscores</li>
            <li>• <strong>kebab-case:</strong> All lowercase with hyphens</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TextCaseConverter;
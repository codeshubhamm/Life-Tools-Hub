import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WordtoPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    setError("");
    if (!file) {
      setError("Please select a Word (.docx) file.");
      return;
    }
    setIsConverting(true);
    setProgress(10);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/pdf-to-word", {
        method: "POST",
        body: formData,
      });
      setProgress(80);
      if (!response.ok) {
        setError("Failed to convert Word to PDF.");
        setIsConverting(false);
        setProgress(0);
        toast.error("Failed to convert Word to PDF.");
        return;
      }
      const blob = await response.blob();
      setProgress(100);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.pdf";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      toast.success("PDF file downloaded!");
    } catch (err) {
      setError("Failed to convert Word to PDF.");
      toast.error("Failed to convert Word to PDF.");
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
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
      <div className="container mx-auto px-4 pt-6 pb-8 max-w-2xl flex-1">
        {/* Icon + Title + Subtitle Centered */}
        <div className="flex flex-col items-center justify-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full shadow mb-4">
            <FileText className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Word to PDF Converter</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Convert your Word (.docx) files to PDF documents
          </p>
        </div>
        <Card className="w-full shadow-2xl rounded-3xl p-8 bg-white/90">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold">Select Word File</CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Choose a Word (.docx) file to convert to PDF.<br />
              <span className="text-xs text-gray-400">(All processing is done locally on your device for privacy.)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a Word (.docx) file to convert:</label>
              <label className="w-full">
                <div className="w-full flex items-center justify-center px-6 py-8 border-2 border-dashed border-red-300 rounded-2xl bg-red-50 hover:bg-red-100 cursor-pointer transition mb-2">
                  <span className="text-red-600 font-semibold text-lg">Click or drag to upload Word file</span>
                </div>
                <Input type="file" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} disabled={isConverting} className="hidden" />
              </label>
            </div>
            {file && <div className="mb-2 text-sm text-gray-700">Selected: <span className="font-semibold">{file.name}</span></div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {isConverting && <Progress value={progress} className="mb-4" />}
            <Button onClick={handleConvert} disabled={isConverting || !file} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 mt-2 rounded-xl">
              {isConverting ? "Converting..." : "Convert to PDF"}
            </Button>
            <div className="text-xs text-gray-400 mt-4 text-center">
              Tip: For best results, use Word files under 20MB. The PDF will be automatically downloaded.
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <strong>About Word to PDF:</strong> This tool converts your Word (.docx) files to PDF documents. Useful for sharing, printing, or archiving documents in a universal format.<br/>
          <span className="block mt-2">Tip: For best results, use simple, text-based Word files under 20MB. Complex layouts may not convert perfectly. All processing is done locally for your privacy.</span>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WordtoPDF;

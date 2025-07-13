import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Scissors, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PDFDocument } from "pdf-lib";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(1);
  const [isSplitting, setIsSplitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setError("");
      setProgress(10);
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const count = pdf.getPageCount();
        setPageCount(count);
        setStart(1);
        setEnd(count);
        setProgress(100);
      } catch {
        setError("Failed to read PDF file.");
        setPageCount(0);
        setStart(1);
        setEnd(1);
        setProgress(0);
      }
    }
  };

  const handleSplit = async () => {
    setError("");
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    if (start < 1 || end < start || end > pageCount) {
      setError("Invalid page range.");
      return;
    }
    setIsSplitting(true);
    setProgress(10);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      const indices = [];
      for (let i = start - 1; i < end; i++) indices.push(i);
      const pages = await newPdf.copyPages(pdf, indices);
      pages.forEach(page => newPdf.addPage(page));
      setProgress(80);
      const bytes = await newPdf.save();
      setProgress(100);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `split_${start}_${end}.pdf`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      toast.success("Split PDF downloaded!");
    } catch {
      setError("Failed to split PDF.");
      toast.error("Failed to split PDF.");
    } finally {
      setIsSplitting(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <Scissors className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Split PDF</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Extract selected pages from a PDF file
          </p>
        </div>
        <Card className="w-full shadow-2xl rounded-3xl p-8 bg-white/90">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold">Select PDF File</CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Choose a PDF file and specify the page range to extract.<br />
              <span className="text-xs text-gray-400">(All processing is done locally on your device for privacy.)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a PDF file to split:</label>
              <label className="w-full">
                <div className="w-full flex items-center justify-center px-6 py-8 border-2 border-dashed border-red-300 rounded-2xl bg-red-50 hover:bg-red-100 cursor-pointer transition mb-2">
                  <span className="text-red-600 font-semibold text-lg">Click or drag to upload PDF</span>
                </div>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} disabled={isSplitting} className="hidden" />
              </label>
            </div>
            {file && pageCount > 0 && (
              <div className="flex gap-2 mb-4 items-center">
                <Input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={start}
                  onChange={e => setStart(Number(e.target.value))}
                  placeholder="Start page"
                  className="w-1/2"
                  disabled={isSplitting}
                />
                <span className="mx-2">to</span>
                <Input
                  type="number"
                  min={start}
                  max={pageCount}
                  value={end}
                  onChange={e => setEnd(Number(e.target.value))}
                  placeholder="End page"
                  className="w-1/2"
                  disabled={isSplitting}
                />
                <span className="ml-2 text-xs text-gray-500">(Total pages: {pageCount})</span>
              </div>
            )}
            {file && <div className="mb-2 text-sm text-gray-700">{file.name}</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {isSplitting && <Progress value={progress} className="mb-4" />}
            <Button onClick={handleSplit} disabled={isSplitting || !file || pageCount === 0} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 mt-2 rounded-xl">
              {isSplitting ? "Splitting..." : "Split PDF"}
            </Button>
            <div className="text-xs text-gray-400 mt-4 text-center">
              Tip: For best results, use PDFs under 20MB. The split file will be automatically downloaded.
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <strong>About Split PDF:</strong> This tool allows you to extract specific pages from your PDF files. Useful for sharing only relevant sections or splitting large documents.<br/>
          <span className="block mt-2">Tip: Enter the correct page range. For best results, use PDFs under 20MB. All processing is done locally for your privacy.</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SplitPDF; 
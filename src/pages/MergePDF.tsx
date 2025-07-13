import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PDFDocument } from "pdf-lib";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const pdfs = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
      setFiles(prev => [...prev, ...pdfs]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    setError("");
    if (files.length < 2) {
      setError("Please select at least two PDF files.");
      return;
    }
    setIsMerging(true);
    setProgress(10);
    try {
      const mergedPdf = await PDFDocument.create();
      let fileCount = 0;
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
        fileCount++;
        setProgress(10 + Math.floor((fileCount / files.length) * 80));
      }
      const mergedPdfBytes = await mergedPdf.save();
      setProgress(100);
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      toast.success("Merged PDF downloaded!");
    } catch (err) {
      setError("Failed to merge PDFs.");
      toast.error("Failed to merge PDFs.");
    } finally {
      setIsMerging(false);
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
            <FileText className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Merge PDF Files</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Combine multiple PDF files into one document
          </p>
        </div>
        <Card className="w-full shadow-2xl rounded-3xl p-8 bg-white/90">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold">Select PDF Files</CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Drag and drop or select two or more PDF files to merge.<br />
              <span className="text-xs text-gray-400">(All processing is done locally on your device for privacy.)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col items-center">
              <label
                className="w-full"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                htmlFor="merge-pdf-upload"
              >
                <div className="w-full flex items-center justify-center px-6 py-8 border-2 border-dashed border-red-300 rounded-2xl bg-red-50 hover:bg-red-100 cursor-pointer transition mb-2 text-center">
                  <span className="text-red-600 font-semibold text-lg">
                    Click or drag to upload <b>multiple PDF files</b>
                  </span>
                </div>
                <Input
                  id="merge-pdf-upload"
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                  disabled={isMerging}
                  className="hidden"
                />
              </label>
            </div>
            {files.length > 0 && (
              <ul className="mb-4 text-sm text-gray-700">
                {files.map((file, idx) => (
                  <li key={idx} className="flex items-center justify-between py-1 border-b last:border-b-0">
                    <span>{file.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveFile(idx)}
                      disabled={isMerging}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {isMerging && <Progress value={progress} className="mb-4" />}
            <Button
              onClick={handleMerge}
              disabled={isMerging || files.length < 2}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 mt-2 rounded-xl"
            >
              {isMerging ? "Merging..." : "Merge PDFs"}
            </Button>
            <div className="text-xs text-gray-400 mt-4 text-center">
              Tip: For best results, use PDFs under 20MB. The merged file will be automatically downloaded.
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <strong>About Merge PDF:</strong> This tool allows you to combine multiple PDF files into a single document. Useful for merging reports, scanned pages, or documents for easier sharing and storage.<br/>
          <span className="block mt-2">Tip: Arrange your files in the order you want them merged. For best results, use PDFs under 20MB each. All processing is done locally for your privacy.</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MergePDF; 
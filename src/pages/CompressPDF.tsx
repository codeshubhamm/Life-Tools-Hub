import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Archive, ArrowLeft, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function formatSize(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  return (bytes / 1024).toFixed(1) + " KB";
}

const CompressPDF = () => {
  const [file, setFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [beforeSize, setBeforeSize] = useState(0);
  const [afterSize, setAfterSize] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      if (f.type !== "application/pdf") {
        toast.error("Upload a valid PDF file.");
        return;
      }
      setFile(f);
      setBeforeSize(f.size);
      setAfterSize(0);
      setDownloadUrl("");
    }
  };

  const handleCompress = async () => {
    setError("");
    if (!file) {
      setError("Please select a PDF file.");
      toast.error("Please select a PDF file.");
      return;
    }
    setIsCompressing(true);
    setProgress(10);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/compress-pdf", {
        method: "POST",
        body: formData,
      });
      setProgress(80);
      if (!response.ok) {
        setError("Failed to compress PDF.");
        setIsCompressing(false);
        setProgress(0);
        toast.error("Failed to compress PDF.");
        return;
      }
      const data = await response.json();
      setAfterSize(data.after_size);
      setDownloadUrl(data.download_url);
      setProgress(100);
    } catch (err) {
      setError("Failed to compress PDF.");
      toast.error("Failed to compress PDF.");
    } finally {
      setIsCompressing(false);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setFile(null);
    setBeforeSize(0);
    setAfterSize(0);
    setDownloadUrl("");
    setError("");
    setProgress(0);
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
        <div className="flex flex-col items-center justify-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full shadow mb-4">
            <Archive className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Compress PDF</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Reduce the file size of your PDF for easier sharing and storage
          </p>
        </div>
        <Card className="w-full shadow-2xl rounded-3xl p-8 bg-white/90">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold">Select PDF File</CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Choose a PDF file to compress. <br />
              <span className="text-xs text-gray-400">(All processing is done locally on your device for privacy.)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col items-center">
              <label className="w-full">
                <div className="w-full flex items-center justify-center px-6 py-8 border-2 border-dashed border-red-300 rounded-2xl bg-red-50 hover:bg-red-100 cursor-pointer transition mb-2 text-center">
                  <span className="text-red-600 font-semibold text-lg">Click or drag to upload PDF</span>
                </div>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} disabled={isCompressing} className="hidden" />
              </label>
            </div>
            {file && (
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">{file.name}</span> &nbsp;|&nbsp; Size: {formatSize(beforeSize)}
              </div>
            )}
            {afterSize > 0 && (
              <div className="mb-2 text-sm text-green-700 bg-green-50 rounded p-2 flex flex-col items-center">
                <div>
                  <span className="font-semibold">Before:</span> {formatSize(beforeSize)}
                  &nbsp; <span className="font-semibold">After:</span> {formatSize(afterSize)}
                  &nbsp; <span className="font-semibold">Saved:</span> {formatSize(beforeSize - afterSize)}
                  &nbsp; (<span className="font-semibold">{beforeSize && afterSize ? Math.round(100 * (1 - afterSize / beforeSize)) : 0}%</span>)
                </div>
                {downloadUrl && (
                  <a href={downloadUrl} download className="mt-2">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2">
                      <Download className="h-5 w-5" /> Download Compressed PDF
                    </Button>
                  </a>
                )}
                <Button variant="ghost" className="mt-2 flex items-center gap-2 text-red-500" onClick={handleReset}>
                  <Trash2 className="h-5 w-5" /> Compress Another File
                </Button>
              </div>
            )}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {isCompressing && <Progress value={progress} className="mb-4" />}
            <Button onClick={handleCompress} disabled={isCompressing || !file} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold mt-2">
              {isCompressing ? "Compressing..." : "Compress PDF"}
            </Button>
            <div className="text-xs text-gray-400 mt-4 text-center">
              Tip: For best results, use PDFs under 20MB. The compressed file will be automatically downloaded.
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <strong>About Compress PDF:</strong> This tool helps you reduce the size of your PDF files for easier sharing and storage. Useful for emailing, uploading, or archiving large PDFs.<br/>
          <span className="block mt-2">Tip: For best results, use PDFs under 20MB. The compressed file will be automatically downloaded. All processing is done locally for your privacy.</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompressPDF; 
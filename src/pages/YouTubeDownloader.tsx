// Enhanced YouTubeDownloader UI with brand-like styling, gradient backgrounds, logo, premium cards, pill buttons, icons, gradient progress, and toasts.
import { useState } from "react";
import { Download, Play, ArrowLeft, Link as LinkIcon, AlertCircle, Loader2, Video, BadgeCheck, Youtube, Volume2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const LOGO = "/public/LOGO.png"; // Placeholder logo path

const YouTubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [selectedItag, setSelectedItag] = useState<number | null>(null);

  const validateYouTubeUrl = (url: string) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const handleAnalyze = async () => {
    setError("");
    setVideoInfo(null);
    setSelectedItag(null);
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }
    if (!validateYouTubeUrl(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to analyze video.");
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setVideoInfo(data);
      if (data.streams && data.streams.length > 0) {
        setSelectedItag(data.streams[0].itag);
      }
    } catch (err: any) {
      setError("Failed to analyze video. " + (err?.message || ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setError("");
    if (!url.trim() || !selectedItag) {
      setError("Please analyze a video and select a quality.");
      return;
    }
    setIsDownloading(true);
    setDownloadProgress(0);
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);
    try {
      const response = await fetch("http://127.0.0.1:8000/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, itag: selectedItag })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to download video.");
        clearInterval(progressInterval);
        setIsDownloading(false);
        setDownloadProgress(0);
        toast.error(data.error || "Failed to download video.");
        return;
      }
      setDownloadProgress(95);
      const disposition = response.headers.get("Content-Disposition");
      let filename = "video.mp4";
      if (disposition) {
        const match = disposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      const blob = await response.blob();
      setDownloadProgress(100);
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(urlBlob);
      }, 100);
      toast.success("Download complete!");
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 1000);
    } catch (err: any) {
      setError("Failed to download video. " + (err?.message || ""));
      clearInterval(progressInterval);
      setIsDownloading(false);
      setDownloadProgress(0);
      toast.error("Failed to download video.");
    } finally {
      clearInterval(progressInterval);
    }
  };

  const handleDownloadQuality = async (itag: string) => {
    setError("");
    if (!url.trim() || !itag) {
      setError("Please analyze a video and select a quality.");
      return;
    }
    setIsDownloading(true);
    setDownloadProgress(0);
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);
    try {
      const response = await fetch("http://127.0.0.1:8000/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, itag })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to download video.");
        clearInterval(progressInterval);
        setIsDownloading(false);
        setDownloadProgress(0);
        toast.error(data.error || "Failed to download video.");
        return;
      }
      setDownloadProgress(95);
      const disposition = response.headers.get("Content-Disposition");
      let filename = "video.mp4";
      if (disposition) {
        const match = disposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      const blob = await response.blob();
      setDownloadProgress(100);
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(urlBlob);
      }, 100);
      toast.success("Download complete!");
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 1000);
    } catch (err: any) {
      setError("Failed to download video. " + (err?.message || ""));
      clearInterval(progressInterval);
      setIsDownloading(false);
      setDownloadProgress(0);
      toast.error("Failed to download video.");
    } finally {
      clearInterval(progressInterval);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 relative">
      {/* YouTube icon and header */}
      <div className="flex flex-col items-center pt-8 pb-2">
        <Youtube className="h-16 w-16 mb-2 text-red-600 drop-shadow-lg animate-fade-in" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-red-600 mb-2 animate-fade-in">YouTube Video Downloader</h1>
        <p className="text-lg text-muted-foreground mb-2 animate-fade-in">Download YouTube videos in the highest available quality</p>
      </div>
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
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="bg-white/80 border-0 shadow-xl rounded-2xl p-2 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <LinkIcon className="h-5 w-5 mr-2 text-red-500" />
              Enter YouTube URL
            </CardTitle>
            <CardDescription className="text-base">Paste a YouTube video URL and click Analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 text-lg px-4 py-2 rounded-xl border-2 border-red-200 focus:border-red-500 transition"
                disabled={isLoading}
              />
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !url.trim()}
                className="bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-red-600 text-white font-bold px-6 py-2 rounded-xl shadow-md transition"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Analyze"}
              </Button>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        {videoInfo && (
          <Card className="bg-white/90 dark:bg-gray-800 mt-10 shadow-2xl rounded-2xl animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 p-6">
              {/* Left: Thumbnail */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-xs md:max-w-sm h-56 md:h-72 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={videoInfo.thumbnail}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                      <Play className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Info and table */}
              <div className="flex-1 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-extrabold mb-2 text-red-700 text-left">
                    {videoInfo.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Quality:</h3>
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border rounded-lg bg-white">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left">
                          <th className="py-2 px-4 font-semibold">Quality</th>
                          <th className="py-2 px-4 font-semibold">File size</th>
                          <th className="py-2 px-4 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videoInfo.streams.map((s: any) => (
                          <tr key={s.itag} className="border-t hover:bg-gray-50 transition">
                            <td className="py-2 px-4">{s.quality} (.mp4)</td>
                            <td className="py-2 px-4">{s.filesize ? `${(s.filesize / 1024 / 1024).toFixed(1)} MB` : "-"}</td>
                            <td className="py-2 px-4">
                              <Button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded shadow flex items-center gap-2"
                                onClick={() => handleDownloadQuality(s.itag)}
                                disabled={isDownloading}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {isDownloading && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-600">Downloading...</span>
                        <span className="text-sm text-muted-foreground">{Math.round(downloadProgress)}%</span>
                      </div>
                      <Progress value={downloadProgress} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        )}
        <Card className="bg-blue-50 border-0 mt-10 shadow-none animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-700">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-base">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <p>Copy the YouTube video URL from your browser's address bar</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <p>Paste the URL in the input field above</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <p>Click "Analyze" to see video info and quality options</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <p>Select your preferred quality and click "Download"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default YouTubeDownloader; 
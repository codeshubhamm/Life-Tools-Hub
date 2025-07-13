import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Droplet, ArrowLeft, Download, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PDFDocument, rgb, degrees } from 'pdf-lib';

function formatSize(bytes: number) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  return (bytes / 1024).toFixed(1) + " KB";
}

const AddWatermark = () => {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [color, setColor] = useState('#FF0000');
  const [opacity, setOpacity] = useState(0.3);
  const [position, setPosition] = useState<'center' | 'top' | 'bottom'>('center');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setDownloadUrl(null);
    setError(null);
    setFileSize(f ? f.size : 0);
  };

  const handleReset = () => {
    setFile(null);
    setDownloadUrl(null);
    setError(null);
    setFileSize(0);
    setLoading(false);
  };

  const handleWatermark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }
    setLoading(true);
    setError(null);
    setDownloadUrl(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const rgbColor = hexToRgb(color);
      pages.forEach(page => {
        const { width, height } = page.getSize();
        let x = width / 2;
        let y = height / 2;
        if (position === 'top') y = height - 50;
        if (position === 'bottom') y = 50;
        page.drawText(watermarkText, {
          x: x - watermarkText.length * 3.5,
          y,
          size: 32,
          color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
          opacity,
          rotate: degrees(-30),
        });
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError('Failed to add watermark.');
    } finally {
      setLoading(false);
    }
  };

  function hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return { r, g, b };
  }

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow mb-4">
            <Droplet className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Add Watermark to PDF</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Add a text watermark to every page of your PDF file, fully in-browser
          </p>
        </div>
        <Card className="w-full shadow-2xl rounded-3xl p-8 bg-white/90">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold">Select PDF File</CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Choose a PDF file to watermark.<br />
              <span className="text-xs text-gray-400">(All processing is done locally on your device for privacy.)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col items-center">
              <label className="w-full">
                <div className="w-full flex items-center justify-center px-6 py-8 border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50 hover:bg-blue-100 cursor-pointer transition mb-2 text-center">
                  <span className="text-blue-600 font-semibold text-lg">Click or drag to upload PDF</span>
                </div>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} disabled={loading} className="hidden" />
              </label>
            </div>
            {file && (
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">{file.name}</span> &nbsp;|&nbsp; Size: {formatSize(fileSize)}
              </div>
            )}
            <form onSubmit={handleWatermark} className="flex flex-col gap-4 mt-4">
              <label htmlFor="watermark-text-input">Watermark text:</label>
              <Input
                id="watermark-text-input"
                type="text"
                placeholder="Watermark text"
                value={watermarkText}
                onChange={e => setWatermarkText(e.target.value)}
                required
                disabled={loading}
              />
              <label htmlFor="watermark-color-input">Watermark color:</label>
              <Input
                id="watermark-color-input"
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                title="Watermark color"
                disabled={loading}
                style={{ width: 60, height: 40, padding: 0, border: 'none', background: 'none' }}
              />
              <label htmlFor="watermark-opacity-input">Opacity:</label>
              <input
                id="watermark-opacity-input"
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={opacity}
                onChange={e => setOpacity(Number(e.target.value))}
                disabled={loading}
              />
              <span>{opacity}</span>
              <label htmlFor="watermark-position-select">Position:</label>
              <select id="watermark-position-select" value={position} onChange={e => setPosition(e.target.value as any)} disabled={loading}>
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
              <Button type="submit" disabled={loading || !file} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold mt-2">
                {loading ? 'Processing...' : 'Add Watermark'}
              </Button>
            </form>
            {downloadUrl && (
              <div className="mb-2 text-sm text-green-700 bg-green-50 rounded p-2 flex flex-col items-center mt-4">
                <a href={downloadUrl} download className="mt-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2">
                    <Download className="h-5 w-5" /> Download Watermarked PDF
                  </Button>
                </a>
                <Button variant="ghost" className="mt-2 flex items-center gap-2 text-red-500" onClick={handleReset}>
                  <Trash2 className="h-5 w-5" /> Watermark Another File
                </Button>
              </div>
            )}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="text-xs text-gray-400 mt-4 text-center">
              Tip: For best results, use PDFs under 20MB. The watermarked file will be automatically downloaded.
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <strong>About Add Watermark:</strong> This tool adds a text watermark to every page of your PDF file. Useful for branding, copyright, or marking confidential documents.<br/>
          <span className="block mt-2">Tip: All processing is done locally for your privacy.</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddWatermark; 
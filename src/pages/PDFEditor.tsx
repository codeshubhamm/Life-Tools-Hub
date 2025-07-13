import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, ArrowLeft, Download, Trash2, Shuffle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PDFDocument } from 'pdf-lib';

function formatSize(bytes: number) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  return (bytes / 1024).toFixed(1) + " KB";
}

const PDFEditor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>({});
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [numPages, setNumPages] = useState<number>(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setDownloadUrl(null);
    setError(null);
    setFileSize(f ? f.size : 0);
    if (f) {
      setLoading(true);
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setMetadata({
          title: pdfDoc.getTitle() || '',
          author: pdfDoc.getAuthor() || '',
          subject: pdfDoc.getSubject() || '',
          keywords: pdfDoc.getKeywords() || '',
        });
        setNumPages(pdfDoc.getPageCount());
        setPageOrder(Array.from({ length: pdfDoc.getPageCount() }, (_, i) => i));
      } catch (err) {
        setError('Failed to read PDF.');
      } finally {
        setLoading(false);
      }
    } else {
      setMetadata({});
      setNumPages(0);
      setPageOrder([]);
    }
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  const movePage = (from: number, to: number) => {
    if (to < 0 || to >= pageOrder.length) return;
    const newOrder = [...pageOrder];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    setPageOrder(newOrder);
  };

  const handleSave = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setDownloadUrl(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      // Set metadata
      pdfDoc.setTitle(metadata.title);
      pdfDoc.setAuthor(metadata.author);
      pdfDoc.setSubject(metadata.subject);
      pdfDoc.setKeywords(metadata.keywords);
      // Reorder pages
      const pages = pdfDoc.getPages();
      const newDoc = await PDFDocument.create();
      for (const idx of pageOrder) {
        const [copied] = await newDoc.copyPages(pdfDoc, [idx]);
        newDoc.addPage(copied);
      }
      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError('Failed to save edited PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileSize(0);
    setMetadata({});
    setNumPages(0);
    setPageOrder([]);
    setDownloadUrl(null);
    setError(null);
    setLoading(false);
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full shadow mb-4">
            <FileText className="h-10 w-10 text-yellow-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">PDF Editor</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Edit PDF metadata and reorder pages, all in your browser
          </p>
        </div>
        <Card className="w-full shadow-2xl rounded-3xl p-8 bg-white/90">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold">Select PDF File</CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Choose a PDF file to edit.<br />
              <span className="text-xs text-gray-400">(All processing is done locally on your device for privacy.)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col items-center">
              <label className="w-full">
                <div className="w-full flex items-center justify-center px-6 py-8 border-2 border-dashed border-yellow-300 rounded-2xl bg-yellow-50 hover:bg-yellow-100 cursor-pointer transition mb-2 text-center">
                  <span className="text-yellow-600 font-semibold text-lg">Click or drag to upload PDF</span>
                </div>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} disabled={loading} className="hidden" />
              </label>
            </div>
            {file && (
              <div className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">{file.name}</span> &nbsp;|&nbsp; Size: {formatSize(fileSize)}
              </div>
            )}
            {file && (
              <form className="flex flex-col gap-4 mt-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <h3 className="text-lg font-semibold">Edit Metadata</h3>
                <label htmlFor="pdf-title">Title:</label>
                <Input id="pdf-title" name="title" type="text" value={metadata.title} onChange={handleMetadataChange} disabled={loading} />
                <label htmlFor="pdf-author">Author:</label>
                <Input id="pdf-author" name="author" type="text" value={metadata.author} onChange={handleMetadataChange} disabled={loading} />
                <label htmlFor="pdf-subject">Subject:</label>
                <Input id="pdf-subject" name="subject" type="text" value={metadata.subject} onChange={handleMetadataChange} disabled={loading} />
                <label htmlFor="pdf-keywords">Keywords:</label>
                <Input id="pdf-keywords" name="keywords" type="text" value={metadata.keywords} onChange={handleMetadataChange} disabled={loading} />
                <h3 className="text-lg font-semibold mt-4 flex items-center gap-2"><Shuffle className="h-5 w-5" /> Reorder Pages</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {pageOrder.map((idx, i) => (
                    <div key={idx} className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                      <span>Page {idx + 1}</span>
                      <Button type="button" size="sm" variant="ghost" disabled={i === 0 || loading} onClick={() => movePage(i, i - 1)}>&uarr;</Button>
                      <Button type="button" size="sm" variant="ghost" disabled={i === pageOrder.length - 1 || loading} onClick={() => movePage(i, i + 1)}>&darr;</Button>
                    </div>
                  ))}
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold mt-2">
                  {loading ? 'Saving...' : 'Save & Download PDF'}
                </Button>
              </form>
            )}
            {downloadUrl && (
              <div className="mb-2 text-sm text-green-700 bg-green-50 rounded p-2 flex flex-col items-center mt-4">
                <a href={downloadUrl} download className="mt-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2">
                    <Download className="h-5 w-5" /> Download Edited PDF
                  </Button>
                </a>
                <Button variant="ghost" className="mt-2 flex items-center gap-2 text-red-500" onClick={handleReset}>
                  <Trash2 className="h-5 w-5" /> Edit Another File
                </Button>
              </div>
            )}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="text-xs text-gray-400 mt-4 text-center">
              Tip: For best results, use PDFs under 20MB. The edited file will be automatically downloaded.
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <strong>About PDF Editor:</strong> This tool lets you edit PDF metadata and reorder pages, all in your browser. More editing features coming soon!<br/>
          <span className="block mt-2">Tip: All processing is done locally for your privacy.</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PDFEditor; 
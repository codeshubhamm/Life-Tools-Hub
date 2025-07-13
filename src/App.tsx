
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import AgeCalculator from "./pages/AgeCalculator";
import BMICalculator from "./pages/BMICalculator";
import WordCounter from "./pages/WordCounter";
import BillSplitter from "./pages/BillSplitter";
import LeaveLetterGenerator from "./pages/LeaveLetterGenerator";
import ResumeBuilder from "./pages/ResumeBuilder";
import CGPAConverter from "./pages/CGPAConverter";
import DailyPlannerGenerator from "./pages/DailyPlannerGenerator";
import BirthdayWishGenerator from "./pages/BirthdayWishGenerator";
import ComplaintLetterWriter from "./pages/ComplaintLetterWriter";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import PercentageCalculator from "./pages/PercentageCalculator";
import TimeZoneConverter from "./pages/TimeZoneConverter";
import LoanEMICalculator from "./pages/LoanEMICalculator";
import TextCaseConverter from "./pages/TextCaseConverter";
import MotivationalQuotes from "./pages/MotivationalQuotes";
import CountdownTimer from "./pages/CountdownTimer";
import CertificateMaker from "./pages/CertificateMaker";
import UnitConverter from "./pages/UnitConverter";
import GSTCalculator from "./pages/GSTCalculator";
import WeeklyPlannerGenerator from "./pages/WeeklyPlannerGenerator";
import InstagramBioGenerator from "./pages/InstagramBioGenerator";
import TaglineGenerator from "./pages/TaglineGenerator";
import EssayWriter from "./pages/EssayWriter";
import SpeechToText from "./pages/SpeechToText";
import TextToSpeech from "./pages/TextToSpeech";
import TypingSpeedTester from "./pages/TypingSpeedTester";
import DiscountCalculator from "./pages/DiscountCalculator";
import IncomeTaxCalculator from "./pages/IncomeTaxCalculator";
import UsernameGenerator from "./pages/UsernameGenerator";
import CurrencyConverter from "./pages/CurrencyConverter";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import YouTubeDownloader from "./pages/YouTubeDownloader";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Tools from "./pages/Tools";
import Features from "./pages/Features";
import Support from "./pages/Support";
import SupportMe from "./pages/SupportMe";
import MergePDF from "./pages/MergePDF";
import SplitPDF from "./pages/SplitPDF";
import CompressPDF from "./pages/CompressPDF";
import WordtoPDF from "./pages/WordtoPDF";
import AddWatermark from "./pages/AddWatermark";
import PDFEditor from './pages/PDFEditor';

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="life-tools-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/features" element={<Features />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support-me" element={<SupportMe />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/bill-splitter" element={<BillSplitter />} />
            <Route path="/tools/leave-letter-generator" element={<LeaveLetterGenerator />} />
            <Route path="/tools/resume-builder" element={<ResumeBuilder />} />
            <Route path="/tools/cgpa-converter" element={<CGPAConverter />} />
            <Route path="/tools/daily-planner-generator" element={<DailyPlannerGenerator />} />
            <Route path="/tools/birthday-wish-generator" element={<BirthdayWishGenerator />} />
            <Route path="/tools/complaint-letter-writer" element={<ComplaintLetterWriter />} />
            <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
            <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/tools/time-zone-converter" element={<TimeZoneConverter />} />
            <Route path="/tools/loan-emi-calculator" element={<LoanEMICalculator />} />
            <Route path="/tools/text-case-converter" element={<TextCaseConverter />} />
            <Route path="/tools/motivational-quotes" element={<MotivationalQuotes />} />
            <Route path="/tools/countdown-timer" element={<CountdownTimer />} />
            <Route path="/tools/certificate-maker" element={<CertificateMaker />} />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/gst-calculator" element={<GSTCalculator />} />
            <Route path="/tools/weekly-planner-generator" element={<WeeklyPlannerGenerator />} />
            <Route path="/tools/instagram-bio-generator" element={<InstagramBioGenerator />} />
            <Route path="/tools/tagline-generator" element={<TaglineGenerator />} />
            <Route path="/tools/essay-writer" element={<EssayWriter />} />
            <Route path="/tools/speech-to-text" element={<SpeechToText />} />
            <Route path="/tools/text-to-speech" element={<TextToSpeech />} />
            <Route path="/tools/typing-speed-tester" element={<TypingSpeedTester />} />
            <Route path="/tools/discount-calculator" element={<DiscountCalculator />} />
            <Route path="/tools/income-tax-calculator" element={<IncomeTaxCalculator />} />
            <Route path="/tools/username-generator" element={<UsernameGenerator />} />
            <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
            <Route path="/tools/invoice-generator" element={<InvoiceGenerator />} />
            <Route path="/tools/youtube-downloader" element={<YouTubeDownloader />} />
            <Route path="/tools/merge-pdf" element={<MergePDF />} />
            <Route path="/tools/split-pdf" element={<SplitPDF />} />
            <Route path="/tools/compress-pdf" element={<CompressPDF />} />
            <Route path="/tools/pdf-to-word" element={<WordtoPDF />} />
            <Route path="/tools/add-watermark" element={<AddWatermark />} />
            <Route path="/tools/pdf-editor" element={<PDFEditor />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

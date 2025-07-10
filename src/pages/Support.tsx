import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const faqs = [
  { q: "How do I use the tools?", a: "Just click on any tool card and follow the simple instructions on the page. No login or signup required!" },
  { q: "Are all tools free?", a: "Yes! Every tool is 100% free to use, forever." },
  { q: "Is my data private?", a: "Absolutely. All calculations happen in your browser. We never store or track your data." },
  { q: "Can I request a new tool?", a: "Yes! Use the contact form or feedback link below to suggest new tools or features." },
];

function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto mb-10 relative">
        <Button variant="ghost" asChild className="absolute left-0 top-0">
          <a href="/">
            <svg className="h-4 w-4 mr-2 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </a>
        </Button>
        <h1 className="text-4xl font-bold mb-2 text-gray-900 text-center">Support</h1>
        <p className="text-lg text-muted-foreground mb-0 text-center">Need help, want to report a bug, or just want to say hi? You’re in the right place!</p>
      </div>
      {/* FAQ Accordion */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="rounded-2xl border border-gray-200 bg-white/90 shadow-sm p-6">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={faq.q}>
                <AccordionTrigger className="text-lg font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      {/* Contact Form */}
      <div className="max-w-2xl mx-auto mb-10 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Contact Us <span role="img" aria-label="mail">📬</span></h2>
        {submitted ? (
          <div className="text-green-600 text-lg font-semibold">Thank you for your message! 💌</div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 min-h-[100px] bg-white/90 dark:bg-gray-800/90"
              required
            />
            <Button type="submit" className="w-full rounded-full">Send Message</Button>
          </form>
        )}
      </div>
      {/* Bug Report & Feedback */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h2 className="text-xl font-bold mb-2">🐞 Bug Report & Feedback</h2>
        <a href="mailto:shubhamgungunwar@gmail.com" className="text-blue-600 hover:underline mr-4">Email</a>
        <a href="https://github.com/codewithshubhamm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-4">GitHub</a>
        <a href="https://twitter.com/codewithshubhamm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a>
      </div>
      {/* Buy Me a Coffee */}
      <div className="max-w-2xl mx-auto mb-10 text-center bg-yellow-50 dark:bg-yellow-900/30 rounded-3xl shadow p-8 border border-yellow-200 dark:border-yellow-700">
        <div className="text-3xl mb-2">☕️</div>
        <h2 className="text-xl font-bold mb-2">Buy Me a Coffee</h2>
        <p className="mb-4">Your support helps me build better tools, stay motivated, and keep this site 100% free 💖</p>
        <a href="https://coff.ee/codewithshubhamm" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-full bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold text-lg shadow transition-transform duration-150 hover:scale-105">Support Me</a>
      </div>
      {/* Contact Info */}
      <div className="max-w-2xl mx-auto text-center text-muted-foreground text-sm">
        <div className="mb-2">Email: <a href="mailto:shubhamgungunwar@gmail.com" className="text-blue-600 hover:underline">shubhamgungunwar@gmail.com</a></div>
        <div>GitHub: <a href="https://github.com/codewithshubhamm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">codewithshubhamm</a></div>
        <div>Twitter: <a href="https://twitter.com/codewithshubhamm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@codewithshubhamm</a></div>
      </div>
    </div>
  );
}

export default SupportPage; 

import { useState } from "react";
import { Link, ArrowLeft, Download, Copy, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ComplaintLetterWriter = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderEmail: "",
    senderPhone: "",
    recipientName: "",
    recipientTitle: "",
    organization: "",
    organizationAddress: "",
    subject: "",
    complaintType: "",
    details: "",
    actionRequested: "",
    urgency: "normal"
  });

  const [generatedLetter, setGeneratedLetter] = useState("");
  const { toast } = useToast();

  const complaintTypes = {
    "product-quality": "Product Quality Issue",
    "service-poor": "Poor Service Experience",
    "billing-error": "Billing Error or Dispute",
    "delivery-delay": "Delivery Delay or Issue",
    "staff-behavior": "Staff Behavior or Misconduct",
    "facility-issue": "Facility or Infrastructure Issue",
    "policy-concern": "Policy or Procedure Concern",
    "refund-request": "Refund or Exchange Request",
    "harassment": "Harassment or Discrimination",
    "safety-concern": "Safety or Security Concern",
    "other": "Other Issue"
  };

  const generateLetter = () => {
    if (!formData.senderName || !formData.organization || !formData.subject || !formData.details) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const today = new Date().toLocaleDateString('en-GB');
    const urgencyText = formData.urgency === "urgent" ? "URGENT - " : "";
    
    const letter = `${formData.senderName}
${formData.senderAddress || "[Your Address]"}
${formData.senderEmail ? `Email: ${formData.senderEmail}` : ""}
${formData.senderPhone ? `Phone: ${formData.senderPhone}` : ""}

Date: ${today}

${formData.recipientName || "Customer Service Manager"}
${formData.recipientTitle ? formData.recipientTitle : ""}
${formData.organization}
${formData.organizationAddress || "[Organization Address]"}

Subject: ${urgencyText}${formData.subject}

Dear ${formData.recipientName || "Sir/Madam"},

I am writing to formally lodge a complaint regarding ${complaintTypes[formData.complaintType as keyof typeof complaintTypes]?.toLowerCase() || "an issue"} that I recently experienced with your ${formData.organization}.

${formData.details}

This situation has caused me significant inconvenience and disappointment. As a ${formData.complaintType === "product-quality" || formData.complaintType === "refund-request" ? "customer" : "concerned individual"}, I believe this matter requires immediate attention and resolution.

${formData.actionRequested ? `I would appreciate if you could take the following action to resolve this matter:

${formData.actionRequested}` : `I request that you investigate this matter thoroughly and take appropriate corrective action to prevent similar incidents in the future.`}

I expect a prompt response within 7-10 business days regarding the steps you will take to address this complaint. ${formData.urgency === "urgent" ? "Given the urgent nature of this matter, I would appreciate an expedited response." : ""}

I trust that you will give this matter the serious attention it deserves and look forward to a satisfactory resolution.

Thank you for your time and consideration.

${formData.senderEmail ? "I can be reached at the above email address" : "I can be reached at the above contact details"} should you need any additional information.

Yours sincerely,

${formData.senderName}
${formData.senderEmail ? `Email: ${formData.senderEmail}` : ""}
${formData.senderPhone ? `Phone: ${formData.senderPhone}` : ""}

---
Copy of this letter has been kept for records.`;

    setGeneratedLetter(letter);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter);
      toast({
        title: "Copied!",
        description: "Letter copied to clipboard successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy letter to clipboard.",
        variant: "destructive"
      });
    }
  };

  const downloadLetter = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `complaint_letter_${formData.senderName.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Complaint letter downloaded successfully."
    });
  };

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow mb-4">
            <Mail className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Complaint Letter Writer</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Generate formal complaint and request letters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            {/* Sender Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senderName">Your Full Name *</Label>
                  <Input
                    id="senderName"
                    value={formData.senderName}
                    onChange={(e) => setFormData(prev => ({ ...prev, senderName: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="senderAddress">Your Address</Label>
                  <Textarea
                    id="senderAddress"
                    value={formData.senderAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, senderAddress: e.target.value }))}
                    placeholder="Your complete address"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="senderEmail">Email Address</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={formData.senderEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, senderEmail: e.target.value }))}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderPhone">Phone Number</Label>
                    <Input
                      id="senderPhone"
                      value={formData.senderPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, senderPhone: e.target.value }))}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipient Information */}
            <Card>
              <CardHeader>
                <CardTitle>Recipient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="organization">Organization/Company *</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    placeholder="Company or organization name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      value={formData.recipientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                      placeholder="Manager/Person's name (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientTitle">Recipient Title</Label>
                    <Input
                      id="recipientTitle"
                      value={formData.recipientTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, recipientTitle: e.target.value }))}
                      placeholder="e.g., Customer Service Manager"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="organizationAddress">Organization Address</Label>
                  <Textarea
                    id="organizationAddress"
                    value={formData.organizationAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, organizationAddress: e.target.value }))}
                    placeholder="Organization's address (optional)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Complaint Details */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="complaintType">Type of Complaint</Label>
                  <Select value={formData.complaintType} onValueChange={(value) => setFormData(prev => ({ ...prev, complaintType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complaint type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(complaintTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief subject of your complaint"
                  />
                </div>

                <div>
                  <Label htmlFor="details">Complaint Details *</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    placeholder="Describe your complaint in detail. Include dates, times, and any relevant information."
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="actionRequested">Action Requested</Label>
                  <Textarea
                    id="actionRequested"
                    value={formData.actionRequested}
                    onChange={(e) => setFormData(prev => ({ ...prev, actionRequested: e.target.value }))}
                    placeholder="What specific action would you like them to take? (optional)"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateLetter} className="w-full" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Generate Complaint Letter
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Letter */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Generated Letter</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedLetter ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-xs font-mono text-foreground">
                      {generatedLetter}
                    </pre>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Letter
                    </Button>
                    <Button onClick={downloadLetter} className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Tips for Success:</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Keep copies of all correspondence</li>
                      <li>• Send via registered mail if possible</li>
                      <li>• Follow up if no response within 10 days</li>
                      <li>• Be polite but firm in your tone</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Fill in the form and click "Generate Complaint Letter" to see your letter here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComplaintLetterWriter;

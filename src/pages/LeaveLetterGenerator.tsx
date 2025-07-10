
import { useState } from "react";
import { Link, ArrowLeft, Download, Copy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const LeaveLetterGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    organization: "",
    managerName: "",
    reason: "",
    fromDate: "",
    toDate: "",
    leaveType: "",
    contactNumber: ""
  });

  const [generatedLetter, setGeneratedLetter] = useState("");
  const { toast } = useToast();

  const generateLetter = () => {
    if (!formData.name || !formData.organization || !formData.reason || !formData.fromDate || !formData.toDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const today = new Date().toLocaleDateString('en-GB');
    const letter = `Date: ${today}

To,
${formData.managerName || "The Manager"}
${formData.organization}

Subject: Application for ${formData.leaveType || "Leave"}

Respected Sir/Madam,

I am writing to formally request ${formData.leaveType?.toLowerCase() || "leave"} from ${formData.fromDate} to ${formData.toDate} due to ${formData.reason}.

${formData.designation ? `As ${formData.designation}, I` : "I"} will ensure that all my pending work is completed before my leave begins, and I will coordinate with my colleagues to handle any urgent matters during my absence.

I would be grateful if you could approve my leave request. I will be available on my contact number ${formData.contactNumber || "[Contact Number]"} in case of any emergency.

Thank you for your consideration.

Yours sincerely,
${formData.name}
${formData.designation ? formData.designation : ""}
${formData.contactNumber ? `Contact: ${formData.contactNumber}` : ""}`;

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
    element.download = `leave_letter_${formData.name.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Leave letter downloaded successfully."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Leave Letter Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate professional leave applications instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                    placeholder="Your job title (optional)"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="organization">Organization/School *</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="Company or school name"
                />
              </div>

              <div>
                <Label htmlFor="managerName">Manager/Principal Name</Label>
                <Input
                  id="managerName"
                  value={formData.managerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, managerName: e.target.value }))}
                  placeholder="Leave this blank for generic address"
                />
              </div>

              <div>
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select value={formData.leaveType} onValueChange={(value) => setFormData(prev => ({ ...prev, leaveType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                    <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                    <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                    <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                    <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                    <SelectItem value="Study Leave">Study Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromDate">From Date *</Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, fromDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="toDate">To Date *</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, toDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason for Leave *</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Explain the reason for your leave"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                  placeholder="Your contact number"
                />
              </div>

              <Button onClick={generateLetter} className="w-full" size="lg">
                Generate Leave Letter
              </Button>
            </CardContent>
          </Card>

          {/* Generated Letter */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Letter</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedLetter ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
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
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Fill in the form and click "Generate Leave Letter" to see your letter here.</p>
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

export default LeaveLetterGenerator;

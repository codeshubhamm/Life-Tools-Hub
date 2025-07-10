import { useState, useRef } from "react";
import { Award, Download, Palette } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CertificateMaker = () => {
  const [recipientName, setRecipientName] = useState("John Doe");
  const [courseName, setCourseName] = useState("Web Development");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [instructorName, setInstructorName] = useState("Jane Smith");
  const [organizationName, setOrganizationName] = useState("Life Tools Hub Academy");
  const [template, setTemplate] = useState("classic");
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      // Create canvas for download
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Set canvas size (A4 landscape dimensions)
      canvas.width = 1123;
      canvas.height = 794;

      // Fill background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (template === 'classic') {
        gradient.addColorStop(0, '#f8fafc');
        gradient.addColorStop(1, '#e2e8f0');
      } else if (template === 'modern') {
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(1, '#0f172a');
      } else {
        gradient.addColorStop(0, '#fef3c7');
        gradient.addColorStop(1, '#f59e0b');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add border
      ctx.strokeStyle = template === 'modern' ? '#64748b' : '#374151';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

      // Add inner border
      ctx.strokeStyle = template === 'modern' ? '#94a3b8' : '#6b7280';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

      // Set text properties
      ctx.textAlign = 'center';
      ctx.fillStyle = template === 'modern' ? '#f1f5f9' : '#1f2937';

      // Certificate title
      ctx.font = 'bold 48px serif';
      ctx.fillText('CERTIFICATE', canvas.width / 2, 150);
      
      ctx.font = 'normal 24px serif';
      ctx.fillText('OF COMPLETION', canvas.width / 2, 190);

      // Recipient name
      ctx.font = 'bold 36px serif';
      ctx.fillText(recipientName, canvas.width / 2, 280);

      // Course details
      ctx.font = 'normal 20px serif';
      ctx.fillText('has successfully completed the course', canvas.width / 2, 330);
      
      ctx.font = 'bold 28px serif';
      ctx.fillText(courseName, canvas.width / 2, 380);

      // Date and signatures
      ctx.font = 'normal 16px serif';
      ctx.fillText(`Date: ${new Date(issueDate).toLocaleDateString()}`, canvas.width / 2, 480);

      ctx.textAlign = 'left';
      ctx.fillText(`Instructor: ${instructorName}`, 200, 600);
      
      ctx.textAlign = 'right';
      ctx.fillText(organizationName, canvas.width - 200, 600);

      // Download the image
      const link = document.createElement('a');
      link.download = `${recipientName}_Certificate.png`;
      link.href = canvas.toDataURL();
      link.click();

      toast({
        title: "Success",
        description: "Certificate downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download certificate",
        variant: "destructive",
      });
    }
  };

  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#f1f5f9',
          border: '8px solid #64748b',
        };
      case 'elegant':
        return {
          background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)',
          color: '#1f2937',
          border: '8px solid #d97706',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          color: '#1f2937',
          border: '8px solid #374151',
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-6">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Certificate Maker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create beautiful, professional certificates for courses, achievements, and events
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
                <CardDescription>
                  Fill in the information for your certificate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient Name</label>
                  <Input
                    placeholder="John Doe"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Course/Achievement</label>
                  <Input
                    placeholder="Web Development Course"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Date</label>
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Instructor/Issuer</label>
                  <Input
                    placeholder="Jane Smith"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization</label>
                  <Input
                    placeholder="Life Tools Hub Academy"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Template</label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="elegant">Elegant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={downloadCertificate}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Preview</CardTitle>
                <CardDescription>
                  Preview your certificate before downloading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  ref={certificateRef}
                  className="aspect-[4/3] rounded-lg p-8 relative overflow-hidden"
                  style={getTemplateStyles()}
                >
                  {/* Inner border */}
                  <div 
                    className="absolute inset-4 border-2 rounded"
                    style={{ borderColor: template === 'modern' ? '#94a3b8' : '#6b7280' }}
                  ></div>

                  <div className="relative h-full flex flex-col justify-center items-center text-center space-y-4">
                    {/* Certificate Header */}
                    <div className="space-y-2">
                      <h1 className="text-4xl md:text-5xl font-bold font-serif">
                        CERTIFICATE
                      </h1>
                      <p className="text-lg font-serif">
                        OF COMPLETION
                      </p>
                    </div>

                    {/* Decorative line */}
                    <div className="w-24 h-0.5 bg-current opacity-50"></div>

                    {/* Recipient */}
                    <div className="space-y-3">
                      <p className="text-lg">This is to certify that</p>
                      <p className="text-2xl md:text-3xl font-bold font-serif">
                        {recipientName}
                      </p>
                      <p className="text-base">has successfully completed the course</p>
                      <p className="text-xl md:text-2xl font-bold font-serif">
                        {courseName}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="pt-4">
                      <p className="text-sm">
                        Date: {new Date(issueDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Signatures */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8">
                      <div className="text-left">
                        <div className="w-32 h-0.5 bg-current opacity-50 mb-1"></div>
                        <p className="text-xs">Instructor: {instructorName}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-32 h-0.5 bg-current opacity-50 mb-1"></div>
                        <p className="text-xs">{organizationName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Perfect For:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Course completion certificates</li>
            <li>• Workshop and seminar recognition</li>
            <li>• Employee achievement awards</li>
            <li>• Training program certificates</li>
            <li>• Educational accomplishments</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CertificateMaker;
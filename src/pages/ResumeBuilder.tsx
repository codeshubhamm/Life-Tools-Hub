
import { useState } from "react";
import { Link, ArrowLeft, Download, Plus, Trash2, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  grade: string;
}

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: ""
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", company: "", position: "", duration: "", description: "" }
  ]);

  const [education, setEducation] = useState<Education[]>([
    { id: "1", institution: "", degree: "", year: "", grade: "" }
  ]);

  const [skills, setSkills] = useState("");
  const { toast } = useToast();

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: ""
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      year: "",
      grade: ""
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const generatePDF = () => {
    if (!personalInfo.name || !personalInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and email.",
        variant: "destructive"
      });
      return;
    }

    // Create a simple HTML resume
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resume - ${personalInfo.name}</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .name { font-size: 32px; font-weight: bold; margin-bottom: 10px; color: #2c3e50; }
        .contact { font-size: 16px; color: #7f8c8d; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 22px; font-weight: bold; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 5px; margin-bottom: 15px; }
        .item { margin-bottom: 15px; }
        .item-title { font-weight: bold; font-size: 18px; color: #34495e; }
        .item-subtitle { color: #7f8c8d; font-style: italic; margin-bottom: 5px; }
        .description { margin-top: 5px; text-align: justify; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #ecf0f1; padding: 5px 12px; border-radius: 15px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${personalInfo.name}</div>
        <div class="contact">
            ${personalInfo.email} ${personalInfo.phone ? `• ${personalInfo.phone}` : ''}
            ${personalInfo.address ? `• ${personalInfo.address}` : ''}
        </div>
    </div>

    ${personalInfo.summary ? `
    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="description">${personalInfo.summary}</div>
    </div>
    ` : ''}

    ${experiences.some(exp => exp.company || exp.position) ? `
    <div class="section">
        <div class="section-title">Work Experience</div>
        ${experiences.map(exp => exp.company || exp.position ? `
        <div class="item">
            <div class="item-title">${exp.position || 'Position'}</div>
            <div class="item-subtitle">${exp.company || 'Company'} ${exp.duration ? `• ${exp.duration}` : ''}</div>
            ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
        </div>
        ` : '').join('')}
    </div>
    ` : ''}

    ${education.some(edu => edu.institution || edu.degree) ? `
    <div class="section">
        <div class="section-title">Education</div>
        ${education.map(edu => edu.institution || edu.degree ? `
        <div class="item">
            <div class="item-title">${edu.degree || 'Degree'}</div>
            <div class="item-subtitle">${edu.institution || 'Institution'} ${edu.year ? `• ${edu.year}` : ''} ${edu.grade ? `• ${edu.grade}` : ''}</div>
        </div>
        ` : '').join('')}
    </div>
    ` : ''}

    ${skills ? `
    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
            ${skills.split(',').map(skill => `<span class="skill">${skill.trim()}</span>`).join('')}
        </div>
    </div>
    ` : ''}

</body>
</html>`;

    // Create and download the HTML file
    const element = document.createElement("a");
    const file = new Blob([resumeHTML], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `resume_${personalInfo.name.replace(/\s+/g, '_').toLowerCase()}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Resume downloaded as HTML file. Open it in your browser and print to PDF."
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
      <div className="container mx-auto px-4 pt-6 pb-8 max-w-6xl">
        {/* Icon + Title + Subtitle Centered */}
        <div className="flex flex-col items-center justify-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow mb-4">
            <User className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Resume Builder</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Create professional resumes with downloadable format
          </p>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Your address"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={personalInfo.summary}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief summary of your professional background"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Work Experience</CardTitle>
                <Button onClick={addExperience} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    {experiences.length > 1 && (
                      <Button
                        onClick={() => removeExperience(exp.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        placeholder="Job title"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                      placeholder="e.g., Jan 2020 - Present"
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Education</CardTitle>
                <Button onClick={addEducation} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    {education.length > 1 && (
                      <Button
                        onClick={() => removeEducation(edu.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="School/University name"
                      />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Degree/Course name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        placeholder="e.g., 2020-2024"
                      />
                    </div>
                    <div>
                      <Label>Grade/CGPA</Label>
                      <Input
                        value={edu.grade}
                        onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                        placeholder="e.g., 8.5 CGPA or 85%"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., JavaScript, React, Node.js, Python, Communication, Leadership"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Resume */}
          <Card>
            <CardContent className="pt-6">
              <Button onClick={generatePDF} size="lg" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Resume (HTML)
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Downloads as HTML file. Open in browser and print to save as PDF.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResumeBuilder;

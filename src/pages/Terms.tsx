import { Link } from "react-router-dom";
import { ArrowLeft, Scale, FileText, Shield, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Terms = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#FDEEDC]">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 mb-4 shadow-sm">
            <Scale className="w-4 h-4" />
            Legal Information
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using Life Tools Hub
          </p>
          <div className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Section 1: Acceptance of Terms */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">1. Acceptance of Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Life Tools Hub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            {/* Section 2: Description of Service */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">2. Description of Service</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Life Tools Hub provides a collection of free online tools designed to simplify everyday tasks. Our services include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Calculators (Age, BMI, Percentage, etc.)</li>
                <li>Text tools (Word Counter, Text Case Converter, etc.)</li>
                <li>Productivity tools (Planners, Timers, etc.)</li>
                <li>Writing tools (Resume Builder, Letter Generators, etc.)</li>
                <li>Utility tools (QR Code Generator, Unit Converter, etc.)</li>
              </ul>
            </div>

            {/* Section 3: User Responsibilities */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">3. User Responsibilities</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of Life Tools Hub, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Use the service for lawful purposes only</li>
                <li>Not attempt to harm, disrupt, or interfere with the service</li>
                <li>Not use automated systems to access the service excessively</li>
                <li>Respect the intellectual property rights of the service</li>
                <li>Not share inappropriate or harmful content through our tools</li>
              </ul>
            </div>

            {/* Section 4: Privacy and Data */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy and Data</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We respect your privacy and are committed to protecting your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Most tools process data locally in your browser</li>
                <li>We do not store personal information unless explicitly stated</li>
                <li>Generated documents and calculations are not saved on our servers</li>
                <li>We may collect anonymous usage statistics to improve our services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                For detailed information, please refer to our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            {/* Section 5: Disclaimer */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Life Tools Hub is provided "as is" without any representations or warranties:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We do not guarantee the accuracy of calculations or generated content</li>
                <li>Users should verify important calculations independently</li>
                <li>The service may be temporarily unavailable for maintenance</li>
                <li>We are not liable for any decisions made based on our tools</li>
              </ul>
            </div>

            {/* Section 6: Intellectual Property */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality of Life Tools Hub, including but not limited to text, graphics, logos, and software, are owned by Life Tools Hub and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            {/* Section 7: Modifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after any modifications constitutes acceptance of the new terms.
              </p>
            </div>

            {/* Section 8: Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700 font-medium">
                  📧 Email: <a href="mailto:shubhamgunguwnwar07@gmail.com" className="text-blue-600 hover:underline">shubhamgunguwnwar07@gmail.com</a>
                </p>
                <p className="text-gray-700 font-medium mt-2">
                  🌐 Website: <a href="https://life-tools-hub.com" className="text-blue-600 hover:underline">Life Tools Hub</a>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Have questions about our terms? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/support">Contact Support</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/privacy">Privacy Policy</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;

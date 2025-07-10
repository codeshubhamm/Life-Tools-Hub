
import { ArrowLeft, Shield, Eye, Server } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm="" setSearchTerm={() => {}} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex flex-col items-center">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy matters. Here's how we protect it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>No Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We don't track your usage, collect personal data, or use analytics cookies. 
                  Your browsing is completely private.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <Server className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Local Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  All calculations happen in your browser. Your data never leaves your device 
                  or gets sent to our servers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>No Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We don't store any of your input data, calculations, or results. 
                  Everything is processed and forgotten.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What We Do</CardTitle>
              <CardDescription>
                Simple and transparent practices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ What We Do</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Provide free tools that work in your browser</li>
                  <li>• Use only essential cookies for theme preferences</li>
                  <li>• Process all data locally on your device</li>
                  <li>• Maintain the website and fix bugs</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-600 mb-2">❌ What We Don't Do</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Track your activity or behavior</li>
                  <li>• Collect personal information</li>
                  <li>• Store your input data or results</li>
                  <li>• Share data with third parties</li>
                  <li>• Use advertising cookies or trackers</li>
                  <li>• Require registration or accounts</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
              <CardDescription>
                How our tools work behind the scenes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Client-Side Processing</h4>
                <p className="text-muted-foreground">
                  All calculations (age, BMI, word counting, bill splitting) happen entirely in your browser 
                  using JavaScript. No data is sent to external servers for processing.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Local Storage</h4>
                <p className="text-muted-foreground">
                  We only use local storage to remember your theme preference (light/dark mode). 
                  This data never leaves your device.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Hosting</h4>
                <p className="text-muted-foreground">
                  Our website is hosted on secure servers, but since all processing is client-side, 
                  no sensitive data passes through our servers.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Questions?</h3>
                <p className="text-muted-foreground">
                  If you have any questions about our privacy practices, feel free to reach out to us 
                  on Instagram @code.withshubhamm
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;

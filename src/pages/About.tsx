
import { ArrowLeft, Target, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Life Tools Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of useful tools built to help everyone save time and effort — 
              whether you're a student, employee, or just getting things done.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  To simplify daily tasks with free, easy-to-use tools that require no sign-up 
                  and work instantly for everyone.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>For Everyone</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Designed for students, professionals, parents, and freelancers - 
                  tools that cater to all age groups and needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Fast & Free</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  No sign-up required, no hidden fees, no distractions. 
                  Just fast, reliable tools that work when you need them.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">👨‍💻 Built by Shubham Gungunwar
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                Life Tools Hub is your one-stop digital home 🏠 — a cozy place where all the tools you need live under one roof. No more jumping between websites or apps. Just clean ⚡, fast 🚀, and genuinely useful 🧰 tools built with care.
And this is just the beginning — we’re constantly building, refining, and adding more. So stay tuned… the best is yet to come ✨.


                </p>
                <div className="flex justify-center space-x-4 pt-4">
                  <Button variant="outline" asChild>
                    <a 
                      href="https://instagram.com/code.withshubhamm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Follow on Instagram
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Why Life Tools Hub?</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <h4 className="font-semibold">✨ No Barriers</h4>
                <p className="text-muted-foreground">
                  No registration, no emails, no tracking. Just open and use.
                </p>
                
                <h4 className="font-semibold">⚡ Instant Results</h4>
                <p className="text-muted-foreground">
                  All calculations happen in your browser - no waiting for servers.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">📱 Mobile Friendly</h4>
                <p className="text-muted-foreground">
                  Works perfectly on phones, tablets, and desktops.
                </p>
                
                <h4 className="font-semibold">🔒 Privacy First</h4>
                <p className="text-muted-foreground">
                  Your data never leaves your device. Everything is processed locally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

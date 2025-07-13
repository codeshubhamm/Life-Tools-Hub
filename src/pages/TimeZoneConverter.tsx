import { useState, useEffect } from "react";
import { Clock, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TimeZoneConverter = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");
  const [convertedTime, setConvertedTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeZones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "London (GMT/BST)" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)" },
    { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)" },
    { value: "Asia/Kolkata", label: "India (IST)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
    { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedTime) {
      convertTime();
    }
  }, [selectedTime, fromZone, toZone]);

  const convertTime = () => {
    if (!selectedTime) return;

    try {
      // Create a date object from the input time
      const [hours, minutes] = selectedTime.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Convert time
      const options: Intl.DateTimeFormatOptions = {
        timeZone: toZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const converted = date.toLocaleTimeString('en-US', options);
      setConvertedTime(converted);
    } catch (error) {
      setConvertedTime("Invalid time");
    }
  };

  const getCurrentTimeInZone = (timezone: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };

    return currentTime.toLocaleString('en-US', options);
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
            <Globe className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Time Zone Converter</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Convert time between different time zones
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Convert Time</CardTitle>
              <CardDescription>
                Enter a time and select time zones to convert
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">From Time Zone</label>
                <Select value={fromZone} onValueChange={setFromZone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((zone) => (
                      <SelectItem key={zone.value} value={zone.value}>
                        {zone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">To Time Zone</label>
                <Select value={toZone} onValueChange={setToZone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((zone) => (
                      <SelectItem key={zone.value} value={zone.value}>
                        {zone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {convertedTime && (
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Converted Time</p>
                  <p className="text-2xl font-bold text-primary">
                    {convertedTime}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current World Times</CardTitle>
              <CardDescription>
                Live current time in different time zones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { zone: "UTC", name: "UTC" },
                  { zone: "America/New_York", name: "New York" },
                  { zone: "America/Los_Angeles", name: "Los Angeles" },
                  { zone: "Europe/London", name: "London" },
                  { zone: "Asia/Tokyo", name: "Tokyo" },
                  { zone: "Asia/Kolkata", name: "Mumbai" },
                ].map((location) => (
                  <div key={location.zone} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{location.name}</span>
                    <span className="text-sm font-mono">
                      {getCurrentTimeInZone(location.zone)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Features:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Convert time between any two time zones</li>
            <li>• View current time in major cities worldwide</li>
            <li>• Automatic daylight saving time adjustments</li>
            <li>• Perfect for scheduling international meetings</li>
            <li>• Real-time world clock display</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TimeZoneConverter;
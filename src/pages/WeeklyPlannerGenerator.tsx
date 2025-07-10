import { useState, useEffect } from "react";
import { Calendar, Download, Save, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  time: string;
  task: string;
}

interface DayPlan {
  [key: string]: Task[];
}

const WeeklyPlannerGenerator = () => {
  const [weekPlan, setWeekPlan] = useState<DayPlan>({});
  const [selectedDay, setSelectedDay] = useState("monday");
  const { toast } = useToast();

  const days = [
    { key: "monday", name: "Monday" },
    { key: "tuesday", name: "Tuesday" },
    { key: "wednesday", name: "Wednesday" },
    { key: "thursday", name: "Thursday" },
    { key: "friday", name: "Friday" },
    { key: "saturday", name: "Saturday" },
    { key: "sunday", name: "Sunday" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("weeklyPlanner");
    if (saved) {
      setWeekPlan(JSON.parse(saved));
    } else {
      // Initialize with empty arrays for each day
      const initialPlan: DayPlan = {};
      days.forEach(day => {
        initialPlan[day.key] = [];
      });
      setWeekPlan(initialPlan);
    }
  }, []);

  const savePlan = () => {
    localStorage.setItem("weeklyPlanner", JSON.stringify(weekPlan));
    toast({
      title: "Saved!",
      description: "Weekly planner saved to local storage",
    });
  };

  const addTask = (day: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      time: "09:00",
      task: ""
    };
    
    setWeekPlan(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newTask]
    }));
  };

  const updateTask = (day: string, taskId: string, field: keyof Task, value: string) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: prev[day]?.map(task => 
        task.id === taskId ? { ...task, [field]: value } : task
      ) || []
    }));
  };

  const removeTask = (day: string, taskId: string) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: prev[day]?.filter(task => task.id !== taskId) || []
    }));
  };

  const generatePDF = () => {
    const plannerHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Weekly Planner</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: #f9f9f9; }
        .planner { max-width: 1200px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: #e2e8f0; }
        .day { background: white; padding: 20px; min-height: 400px; }
        .day-header { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
        .task { display: flex; align-items: center; margin-bottom: 10px; padding: 8px; background: #f7fafc; border-radius: 6px; border-left: 3px solid #667eea; }
        .task-time { font-weight: bold; margin-right: 10px; color: #4a5568; min-width: 60px; }
        .task-text { flex: 1; color: #2d3748; }
        @media print {
            body { background: white; }
            .planner { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="planner">
        <div class="header">
            <h1>Weekly Planner</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="week-grid">
            ${days.map(day => `
            <div class="day">
                <div class="day-header">${day.name}</div>
                ${(weekPlan[day.key] || []).map(task => `
                <div class="task">
                    <div class="task-time">${task.time}</div>
                    <div class="task-text">${task.task || 'Task'}</div>
                </div>
                `).join('')}
            </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;

    const element = document.createElement("a");
    const file = new Blob([plannerHTML], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `weekly_planner_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Weekly planner downloaded. Open in browser to print as PDF."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Weekly Planner Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plan your entire week with customizable time slots and tasks
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={savePlan} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Plan
          </Button>
          <Button onClick={generatePDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          {days.map((day) => (
            <Card key={day.key} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{day.name}</CardTitle>
                <Button
                  onClick={() => addTask(day.key)}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {(weekPlan[day.key] || []).map((task) => (
                  <div key={task.id} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <Input
                        type="time"
                        value={task.time}
                        onChange={(e) => updateTask(day.key, task.id, 'time', e.target.value)}
                        className="w-24 text-xs"
                      />
                      <Button
                        onClick={() => removeTask(day.key, task.id)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Enter task"
                      value={task.task}
                      onChange={(e) => updateTask(day.key, task.id, 'task', e.target.value)}
                      className="text-sm"
                    />
                  </div>
                ))}
                
                {(!weekPlan[day.key] || weekPlan[day.key].length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">No tasks yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Features:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Add unlimited tasks for each day</li>
            <li>• Set specific times for each task</li>
            <li>• Auto-save to local storage</li>
            <li>• Download as printable PDF</li>
            <li>• Responsive design for all devices</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WeeklyPlannerGenerator;
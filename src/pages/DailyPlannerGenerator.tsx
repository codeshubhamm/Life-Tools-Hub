
import { useState } from "react";
import { Link, ArrowLeft, Plus, Trash2, Download, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  time: string;
  title: string;
  description: string;
  priority: string;
  category: string;
}

const DailyPlannerGenerator = () => {
  const [plannerDate, setPlannerDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", time: "09:00", title: "", description: "", priority: "medium", category: "work" }
  ]);
  const { toast } = useToast();

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      time: "10:00",
      title: "",
      description: "",
      priority: "medium",
      category: "work"
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const updateTask = (id: string, field: keyof Task, value: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 dark:bg-red-950";
      case "medium": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
      case "low": return "text-green-600 bg-green-50 dark:bg-green-950";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-950";
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "work": return "💼";
      case "personal": return "👤";
      case "health": return "🏃";
      case "education": return "📚";
      case "social": return "👥";
      case "entertainment": return "🎬";
      default: return "📝";
    }
  };

  const generatePlanner = () => {
    const validTasks = tasks.filter(task => task.time && task.title);
    
    if (validTasks.length === 0) {
      toast({
        title: "No Tasks",
        description: "Please add at least one task with time and title.",
        variant: "destructive"
      });
      return;
    }

    // Sort tasks by time
    const sortedTasks = validTasks.sort((a, b) => a.time.localeCompare(b.time));

    const plannerHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Daily Planner - ${new Date(plannerDate).toLocaleDateString()}</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f9f9f9; }
        .planner { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .date { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { font-size: 18px; opacity: 0.9; }
        .tasks { padding: 20px; }
        .task { display: flex; align-items: flex-start; padding: 20px; margin-bottom: 15px; border-radius: 10px; border-left: 4px solid #667eea; background: #f8f9ff; }
        .task.high { border-left-color: #e53e3e; background: #fff5f5; }
        .task.medium { border-left-color: #dd6b20; background: #fffaf0; }
        .task.low { border-left-color: #38a169; background: #f0fff4; }
        .time { font-size: 18px; font-weight: bold; color: #4a5568; margin-right: 20px; min-width: 80px; }
        .task-content { flex: 1; }
        .task-title { font-size: 20px; font-weight: bold; margin-bottom: 5px; color: #2d3748; }
        .task-description { color: #718096; margin-bottom: 10px; }
        .task-meta { display: flex; gap: 15px; align-items: center; }
        .priority { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .priority.high { background: #feb2b2; color: #c53030; }
        .priority.medium { background: #fbd38d; color: #c05621; }
        .priority.low { background: #9ae6b4; color: #276749; }
        .category { font-size: 24px; }
        .footer { text-align: center; padding: 20px; color: #718096; border-top: 1px solid #e2e8f0; }
        @media print {
            body { background: white; }
            .planner { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="planner">
        <div class="header">
            <div class="date">${new Date(plannerDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
            <div class="subtitle">Daily Planner</div>
        </div>
        
        <div class="tasks">
            ${sortedTasks.map(task => `
            <div class="task ${task.priority}">
                <div class="time">${task.time}</div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                    <div class="task-meta">
                        <span class="priority ${task.priority}">${task.priority}</span>
                        <span class="category">${getCategoryEmoji(task.category)}</span>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <p>Generated by Life Tools Hub • Total Tasks: ${sortedTasks.length}</p>
        </div>
    </div>
</body>
</html>`;

    // Create and download the HTML file
    const element = document.createElement("a");
    const file = new Blob([plannerHTML], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `daily_planner_${plannerDate}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Daily planner downloaded successfully. Open in browser to print."
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-blue rounded-full shadow mb-4">
            <Calendar className="h-10 w-10 text-gray-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Daily Planner Generator</h1>
          <p className="text-lg text-muted-foreground mb-2 text-center">
            Organize your day with a customizable planner
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Planner Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={plannerDate}
                    onChange={(e) => setPlannerDate(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Tasks</CardTitle>
                  <Button onClick={addTask} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {tasks.map((task, index) => (
                  <div key={task.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Task {index + 1}</h4>
                      {tasks.length > 1 && (
                        <Button
                          onClick={() => removeTask(task.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={task.time}
                          onChange={(e) => updateTask(task.id, 'time', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Select value={task.priority} onValueChange={(value) => updateTask(task.id, 'priority', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="low">Low Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Task Title</Label>
                        <Input
                          value={task.title}
                          onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                          placeholder="Enter task title"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={task.category} onValueChange={(value) => updateTask(task.id, 'category', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="work">�� Work</SelectItem>
                            <SelectItem value="personal">👤 Personal</SelectItem>
                            <SelectItem value="health">🏃 Health</SelectItem>
                            <SelectItem value="education">📚 Education</SelectItem>
                            <SelectItem value="social">👥 Social</SelectItem>
                            <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Description (Optional)</Label>
                      <Input
                        value={task.description}
                        onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                        placeholder="Task details or notes"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-lg font-semibold text-center">
                    {new Date(plannerDate).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  {tasks.filter(task => task.time && task.title).sort((a, b) => a.time.localeCompare(b.time)).map(task => (
                    <div key={task.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                      <div className="text-sm font-mono">{task.time}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span>{getCategoryEmoji(task.category)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {tasks.filter(task => task.time && task.title).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>Add tasks to see preview</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button onClick={generatePlanner} size="lg" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Generate Planner
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DailyPlannerGenerator;

import { useState, useEffect } from "react";
import { ClipboardList, Moon, Sun, Plus, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskColumn } from "@/components/TaskColumn";
import { TaskDialog } from "@/components/TaskDialog";
import { useTheme } from "next-themes";

export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedTasks = localStorage.getItem("techflow-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("techflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const progressTasks = filteredTasks.filter((task) => task.status === "progress");
  const doneTasks = filteredTasks.filter((task) => task.status === "done");

  const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
    setIsDialogOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleMoveTask = (taskId: string, newStatus: Status) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                <ClipboardList className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">TechFlow</h1>
                <p className="text-sm text-muted-foreground">Gerenciador de Tarefas</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Total: <span className="font-semibold text-foreground">{tasks.length}</span>
                </span>
                <span>|</span>
                <span>
                  Concluídas: <span className="font-semibold text-foreground">{doneTasks.length}</span>
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setEditingTask(null);
                setIsDialogOpen(true);
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Criar Tarefa
            </Button>
            <Button className="gap-2">
              <List className="h-4 w-4" />
              Gerenciar Tarefas
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Pesquisar tarefas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={todoTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onMove={handleMoveTask}
          />
          <TaskColumn
            title="In Progress"
            status="progress"
            tasks={progressTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onMove={handleMoveTask}
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={doneTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onMove={handleMoveTask}
          />
        </div>
      </div>

      <TaskDialog
        open={isDialogOpen || !!editingTask}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingTask(null);
        }}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
    </div>
  );
};

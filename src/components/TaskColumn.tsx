import { Task, Status } from "./TaskBoard";
import { TaskCard } from "./TaskCard";
import { cn } from "@/lib/utils";

interface TaskColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMove: (taskId: string, newStatus: Status) => void;
}

const statusColors = {
  todo: "border-muted",
  progress: "border-primary",
  done: "border-success",
};

const columnBgColors = {
  todo: "bg-kanban-todo",
  progress: "bg-kanban-progress",
  done: "bg-kanban-done",
};

export const TaskColumn = ({ title, status, tasks, onEdit, onDelete, onMove }: TaskColumnProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className={cn("border-b-4 pb-3", statusColors[status])}>
          <h2 className="text-xl font-bold text-foreground">
            {title} <span className="text-muted-foreground">({tasks.length})</span>
          </h2>
        </div>
      </div>

      <div className={cn("flex-1 rounded-xl p-4 min-h-[400px]", columnBgColors[status])}>
        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Nenhuma tarefa</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

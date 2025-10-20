import { Pencil, Trash2 } from "lucide-react";
import { Task, Status } from "./TaskBoard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMove: (taskId: string, newStatus: Status) => void;
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground",
};

export const TaskCard = ({ task, onEdit, onDelete, onMove }: TaskCardProps) => {
  return (
    <div className="group rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex-1 cursor-pointer">
              <h3 className="font-semibold text-card-foreground mb-2">{task.title}</h3>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onMove(task.id, "todo")}>
              Mover para To Do
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMove(task.id, "progress")}>
              Mover para In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMove(task.id, "done")}>
              Mover para Done
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Badge className={priorityColors[task.priority]}>
          {priorityLabels[task.priority]}
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(task)}
          className="h-8 w-8 text-primary hover:text-primary"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

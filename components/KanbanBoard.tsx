"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/hooks/useTasks";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Loader2 } from "lucide-react";

type Priority = "High" | "Medium" | "Low";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: Priority;
  dueDate: string | null;
}

const statuses = ["To Do", "In Progress", "Completed"];

const priorityColors: { [key in Priority]: string } = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const DraggableTask = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task._id,
  });

  const priorityColor =
    priorityColors[task.priority as Priority] || "bg-gray-100 text-gray-800";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white p-4 mb-3 rounded-lg shadow-md transition-all ${
        isDragging ? "opacity-50 scale-105" : ""
      }`}
    >
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-3 break-words">
        {task.description}
      </p>
      <div className="flex justify-between items-center text-xs">
        <Badge variant="secondary" className={priorityColor}>
          {task.priority}
        </Badge>
        {task.dueDate && (
          <div className="flex items-center text-gray-500">
            <CalendarIcon size={12} className="mr-1" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const DroppableColumn = ({
  status,
  tasks,
}: {
  status: string;
  tasks: Task[];
}) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="w-full sm:w-1/2 lg:w-1/3 p-2">
      <Card className="h-full bg-gray-50">
        <CardHeader className="pb-2 bg-gray-100 border-b">
          <CardTitle className="text-center text-lg font-bold text-gray-700">
            {status}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[calc(100vh-12rem)]">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No tasks found</p>
          ) : (
            tasks.map((task) => <DraggableTask key={task._id} task={task} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { fetchTasks, updateTask } = useTasks();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer as Task[]);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, [fetchTasks]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    const fromStatus = tasks.find((task) => task._id === active.id)?.status;
    const toStatus = over.id as string;

    if (fromStatus !== toStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === active.id ? { ...task, status: toStatus } : task
        )
      );

      updateTask(active.id as string, { status: toStatus });
    }
    setActiveId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="p-4 bg-gray-200 min-h-screen">
        {tasks.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-700">No tasks found</p>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {statuses.map((status) => (
              <DroppableColumn
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
              />
            ))}
          </div>
        )}
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="w-full max-w-sm">
            <DraggableTask
              task={tasks.find((task) => task._id === activeId)!}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

import { useCallback } from "react";
import { useToast } from "./use-toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

export function useTasks() {
  const { toast } = useToast();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch tasks");
      }
      return await res.json(); // Return tasks directly
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while fetching tasks",
        variant: "destructive",
      });
      return [];
    }
  }, [toast]);

  const createTask = async (task: Omit<Task, "_id">) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create task");
      }
      const newTask = await res.json();
      toast({
        title: "Success",
        description: "Task created successfully",
      });
      return newTask;
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create task",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update task");
      }
      const updated = await res.json();
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      return updated;
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update task",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete task");
      }
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete task",
        variant: "destructive",
      });
      return false;
    }
  };

  return { fetchTasks, createTask, updateTask, deleteTask };
}

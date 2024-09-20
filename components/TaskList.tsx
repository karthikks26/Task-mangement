"use client";

import { useState, useEffect, useCallback } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskForm } from "@/components/TaskForm";
import { Loader2 } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

type SortKey = "dueDate" | "priority" | "status";

export function TaskList() {
  const { deleteTask, fetchTasks } = useTasks();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("dueDate");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    };

    loadTasks();
  }, [fetchTasks]);

  const sortedAndFilteredTasks = tasks
    .filter((task) => filterStatus === "all" || task.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return a[sortBy].localeCompare(b[sortBy]);
    });

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    fetchTasks().then((fetchedTasks) => setTasks(fetchedTasks));
  }, [fetchTasks]);

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      await deleteTask(taskId);
      fetchTasks().then((fetchedTasks) => setTasks(fetchedTasks));
    },
    [deleteTask, fetchTasks]
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <Button onClick={handleCreateTask}>Add New Task</Button>
        <div className="flex flex-wrap gap-2">
          <Select
            value={sortBy}
            onValueChange={(value: SortKey) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8">No tasks found.</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredTasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell className="max-w-[200px] break-words md:max-w-[300px]">
                    {task.description}
                  </TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {showForm && <TaskForm onClose={handleCloseForm} task={editingTask} />}
    </div>
  );
}

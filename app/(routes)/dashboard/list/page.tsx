import { TaskList } from "@/components/TaskList";

export default function ListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">
        Task List
      </h1>
      <TaskList />
    </div>
  );
}

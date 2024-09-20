import { KanbanBoard } from "@/components/KanbanBoard";

export default function KanbanPage() {
  return (
    <div className="pt-16 lg:pt-0">
      {" "}
      {/* Added padding-top for mobile */}
      <h1 className="text-2xl font-bold mb-4 px-4 lg:px-0 text-center lg:text-left">
        Kanban Board
      </h1>
      <KanbanBoard />
    </div>
  );
}

import TaskList from "../components/TaskList"

export default function TasksPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Tasks</h2>
      <TaskList />
    </div>
  )
}


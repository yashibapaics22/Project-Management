import ProjectList from "./components/ProjectList"
import TaskList from "./components/TaskList"
import RecentActivity from "./components/RecentActivity"
import TeamMembers from "./components/TeamMembers"
import Notifications from "./components/Notifications"
import Leaderboard from "./components/Leaderboard"

export default function Home() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectList />
        <TaskList />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentActivity />
        <TeamMembers />
        <Notifications />
      </div>
      <Leaderboard />
    </div>
  )
}


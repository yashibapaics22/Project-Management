"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, FileEdit, CheckCircle } from "lucide-react"

const activities = [
  { id: 1, user: "Yashi", action: "created", item: "New task", timestamp: new Date() },
  { id: 2, user: "Saumya", action: "updated", item: "Project status", timestamp: new Date() },
  { id: 3, user: "Niyati", action: "completed", item: "Homepage design", timestamp: new Date() },
]

export default function RecentActivity() {
  const [recentActivities, setRecentActivities] = useState(activities)

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: recentActivities.length + 1,
        user: ["Yashi", "Bob", "Charlie"][Math.floor(Math.random() * 3)],
        action: ["created", "updated", "completed"][Math.floor(Math.random() * 3)],
        item: ["New task", "Project status", "Design mockup"][Math.floor(Math.random() * 3)],
        timestamp: new Date(),
      }
      setRecentActivities((prev) => [newActivity, ...prev.slice(0, 4)])
    }, 5000)

    return () => clearInterval(interval)
  }, [recentActivities.length]) // Added recentActivities.length to dependencies

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center space-x-2">
              {activity.action === "created" && <UserCircle className="text-blue-500" />}
              {activity.action === "updated" && <FileEdit className="text-yellow-500" />}
              {activity.action === "completed" && <CheckCircle className="text-green-500" />}
              <span>
                <strong>{activity.user}</strong> {activity.action} {activity.item}
              </span>
              <span className="text-sm text-muted-foreground">{activity.timestamp.toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


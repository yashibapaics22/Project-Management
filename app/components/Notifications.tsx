"use client"

import { useState, useEffect } from "react"
import { useAppState } from "../context/AppStateContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, UserPlus, CheckSquare, Briefcase } from "lucide-react"

export default function Notifications() {
  const { notifications } = useAppState()
  const [displayedNotifications, setDisplayedNotifications] = useState(notifications)

  useEffect(() => {
    setDisplayedNotifications(notifications)
  }, [notifications])

  return (
    <Card className="animate-slide-in">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {displayedNotifications.map((notification, index) => (
            <li
              key={notification.id}
              className="flex items-center space-x-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {notification.type === "message" && <MessageSquare className="text-blue-500" />}
              {notification.type === "task" && <CheckSquare className="text-yellow-500" />}
              {notification.type === "team" && <UserPlus className="text-green-500" />}
              {notification.type === "project" && <Briefcase className="text-purple-500" />}
              <div>
                <p>{notification.content}</p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


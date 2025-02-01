"use client"

import { useAppState } from "../context/AppStateContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Leaderboard() {
  const { leaderboard, teamMembers, currentUser, getLeaderboardPosition } = useAppState()

  return (
    <Card className="animate-slide-in">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Leaderboard</span>
          {/* {currentUser && <Badge variant="secondary">Your Rank: {getLeaderboardPosition(currentUser.id)}</Badge>} */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {leaderboard.slice(0, 5).map((entry, index) => {
            const member = teamMembers.find((m) => m.id === entry.userId)
            if (!member) return null
            return (
              <li
                key={entry.userId}
                className="flex items-center space-x-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-bold w-6">{index + 1}.</span>
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">Score: {entry.score}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Tasks: {entry.tasksCompleted}</p>
                  <p className="text-sm">Projects: {entry.projectsCompleted}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}


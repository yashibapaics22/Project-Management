"use client"

import { useState } from "react"
import { useAppState } from "../context/AppStateContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function TeamMembers() {
  const { teamMembers, updateTeamMember, deleteTeamMember, addTeamMember } = useAppState()
  const [editingMember, setEditingMember] = useState<(typeof teamMembers)[0] | null>(null)
  const [newMember, setNewMember] = useState({ name: "", role: "", avatar: "/placeholder.svg?height=40&width=40" })

  const handleUpdateMember = () => {
    if (editingMember) {
      updateTeamMember(editingMember)
      setEditingMember(null)
    }
  }

  const handleAddMember = () => {
    addTeamMember(newMember)
    setNewMember({ name: "", role: "", avatar: "/placeholder.svg?height=40&width=40" })
  }

  return (
    <Card className="animate-slide-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Members</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">Name</Label>
                <Input
                  id="new-name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-role">Role</Label>
                <Input
                  id="new-role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                />
              </div>
              <Button onClick={handleAddMember}>Add Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {teamMembers.map((member, index) => (
            <li
              key={member.id}
              className="flex items-center space-x-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {editingMember?.id === member.id ? (
                <div className="flex-1 space-y-2">
                  <Input
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  />
                  <Input
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  />
                  <div className="space-x-2">
                    <Button onClick={handleUpdateMember}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingMember(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              )}
              {!editingMember && (
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setEditingMember(member)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => deleteTeamMember(member.id)}>
                    Delete
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState } from "react"
import { useAppState } from "../context/AppStateContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Check } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Project {
  id: string
  name: string
  status: string
  tasks: number
  completed: number
  dueDate: string
}

export default function ProjectList() {
  const { projects, addProject, updateProject } = useAppState()
  const [newProject, setNewProject] = useState({ name: "", status: "Planning", tasks: 0, completed: 0, dueDate: "" })

  const handleAddProject = () => {
    addProject(newProject)
    setNewProject({ name: "", status: "Planning", tasks: 0, completed: 0, dueDate: "" })
  }

  const handleCompleteProject = (project: Project) => {
    updateProject({ ...project, status: "Completed" })
  }

  return (
    <Card className="animate-slide-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Projects</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-status">Status</Label>
                <Input
                  id="project-status"
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-due-date">Due Date</Label>
                <Input
                  id="project-due-date"
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                />
              </div>
              <Button onClick={handleAddProject}>Add Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {projects.map((project, index) => (
            <li key={project.id} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <Link href={`/projects/${project.id}`} className="font-semibold hover:underline">
                  {project.name}
                </Link>
                <div className="flex items-center space-x-2">
                  <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                  {project.status !== "Completed" && (
                    <Button size="sm" variant="outline" onClick={() => handleCompleteProject(project)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <Progress value={(project.completed / project.tasks) * 100} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {project.completed} / {project.tasks} tasks completed
                </span>
                <span>Due: {project.dueDate}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


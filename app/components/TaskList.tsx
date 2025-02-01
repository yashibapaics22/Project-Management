"use client"

import { useState } from "react"
import { useAppState } from "../context/AppStateContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export default function TaskList() {
  const { tasks, addTask, updateTask, deleteTask } = useAppState()
  const [newTask, setNewTask] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<"Low" | "Medium" | "High">("Medium")

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({ title: newTask, completed: false, priority: newTaskPriority, projectId: 1 })
      setNewTask("")
      setNewTaskPriority("Medium")
    }
  }

  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      updateTask({ ...task, completed: !task.completed })
    }
  }

  const changePriority = (id: number, priority: "Low" | "Medium" | "High") => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      updateTask({ ...task, priority })
    }
  }

  return (
    <Card className="animate-slide-in">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          />
          <Select
            value={newTaskPriority}
            onValueChange={(value: "Low" | "Medium" | "High") => setNewTaskPriority(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex items-center space-x-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
              <Label
                htmlFor={`task-${task.id}`}
                className={`flex-grow ${task.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {task.title}
              </Label>
              <Select
                value={task.priority}
                onValueChange={(value: "Low" | "Medium" | "High") => changePriority(task.id, value)}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Badge
                variant={
                  task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                }
              >
                {task.priority}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


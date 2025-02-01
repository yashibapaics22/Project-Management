"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

type Project = {
  id: number
  name: string
  status: string
  tasks: number
  completed: number
  dueDate: string
}

type Task = {
  id: number
  title: string
  completed: boolean
  priority: "Low" | "Medium" | "High"
  projectId: number
}

type TeamMember = {
  id: number
  name: string
  role: string
  avatar: string
}

type Notification = {
  id: number
  type: string
  content: string
  time: string
}

type Message = {
  id: number
  senderId: number
  receiverId: number
  content: string
  timestamp: Date
}

type User = {
  id: number
  email: string
  password: string
  name: string
  role: string
  avatar: string
}

type LeaderboardEntry = {
  userId: number
  score: number
  tasksCompleted: number
  projectsCompleted: number
}

type AppState = {
  projects: Project[]
  tasks: Task[]
  teamMembers: TeamMember[]
  notifications: Notification[]
  messages: Message[]
  currentUser: User | null
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (project: Project) => void
  deleteProject: (id: number) => void
  addTask: (task: Omit<Task, "id">) => void
  updateTask: (task: Task) => void
  deleteTask: (id: number) => void
  addNotification: (notification: Omit<Notification, "id">) => void
  sendMessage: (message: Omit<Message, "id" | "timestamp">) => void
  login: (email: string, password: string) => Promise<boolean>
  signup: (user: Omit<User, "id">) => Promise<boolean>
  logout: () => void
  addTeamMember: (member: Omit<TeamMember, "id">) => void
  updateTeamMember: (member: TeamMember) => void
  deleteTeamMember: (id: number) => void
  leaderboard: LeaderboardEntry[]
  updateLeaderboard: (userId: number, action: "taskCompleted" | "projectCompleted") => void
  getLeaderboardPosition: (userId: number) => number
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Website Redesign", status: "In Progress", tasks: 12, completed: 5, dueDate: "2023-12-31" },
    { id: 2, name: "Mobile App Development", status: "Planning", tasks: 20, completed: 0, dueDate: "2024-03-15" },
    { id: 3, name: "Marketing Campaign", status: "Completed", tasks: 15, completed: 15, dueDate: "2023-11-30" },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Design homepage mockup", completed: false, priority: "High", projectId: 1 },
    { id: 2, title: "Implement user authentication", completed: true, priority: "Medium", projectId: 1 },
    { id: 3, title: "Write API documentation", completed: false, priority: "Low", projectId: 2 },
    { id: 4, title: "Set up CI/CD pipeline", completed: false, priority: "High", projectId: 2 },
  ])

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Yashi Bajpai", role: "Project Manager", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Niyati Gahoi", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Saumya Bansal", role: "Designer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Tanisha Agarwal", role: "Marketing Specialist", avatar: "/placeholder.svg?height=40&width=40" },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "message", content: "New message from Alice", time: "5m ago" },
    { id: 2, type: "task", content: "Task 'Design homepage' is due soon", time: "1h ago" },
    { id: 3, type: "team", content: "Bob joined the project", time: "2h ago" },
  ])

  const [messages, setMessages] = useState<Message[]>([])

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      email: "yashi@example.com",
      password: "password123",
      name: "Alice Johnson",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      email: "saumya@example.com",
      password: "password123",
      name: "Bob Smith",
      role: "Developer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      email: "niyati@example.com",
      password: "password123",
      name: "Charlie Brown",
      role: "Designer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      email: "tanisha@example.com",
      password: "password123",
      name: "Diana Martinez",
      role: "Marketing Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  const { toast } = useToast()

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now() }
    setProjects([...projects, newProject])
    toast({
      title: "Project added",
      description: `${newProject.name} has been added to your projects.`,
    })
  }

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
    if (updatedProject.status === "Completed") {
      updateLeaderboard(currentUser!.id, "projectCompleted")
      addNotification({
        type: "project",
        content: `Project "${updatedProject.name}" completed by ${currentUser!.name}`,
        time: "Just now",
      })
    }
    toast({
      title: "Project updated",
      description: `${updatedProject.name} has been updated.`,
    })
  }

  const deleteProject = (id: number) => {
    const projectToDelete = projects.find((project) => project.id === id)
    setProjects(projects.filter((project) => project.id !== id))
    if (projectToDelete) {
      toast({
        title: "Project deleted",
        description: `${projectToDelete.name} has been deleted.`,
        variant: "destructive",
      })
    }
  }

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now() }
    setTasks([...tasks, newTask])
    toast({
      title: "Task added",
      description: `${newTask.title} has been added to your tasks.`,
    })
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    if (updatedTask.completed) {
      updateLeaderboard(currentUser!.id, "taskCompleted")
      addNotification({
        type: "task",
        content: `Task "${updatedTask.title}" completed by ${currentUser!.name}`,
        time: "Just now",
      })
    }
    toast({
      title: "Task updated",
      description: `${updatedTask.title} has been updated.`,
    })
  }

  const deleteTask = (id: number) => {
    const taskToDelete = tasks.find((task) => task.id === id)
    setTasks(tasks.filter((task) => task.id !== id))
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `${taskToDelete.title} has been deleted.`,
        variant: "destructive",
      })
    }
  }

  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification = { ...notification, id: Date.now() }
    setNotifications([newNotification, ...notifications.slice(0, 4)])
    toast({
      title: "New Notification",
      description: notification.content,
    })
  }

  const sendMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage = { ...message, id: Date.now(), timestamp: new Date() }
    setMessages([...messages, newMessage])
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    })
  }

  const login = async (email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      setCurrentUser(user)
      return true
    }
    return false
  }

  const signup = async (user: Omit<User, "id">) => {
    const newUser = { ...user, id: Date.now() }
    setUsers([...users, newUser])
    setCurrentUser(newUser)
    return true
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const newMember = { ...member, id: Date.now() }
    setTeamMembers([...teamMembers, newMember])
  }

  const updateTeamMember = (updatedMember: TeamMember) => {
    setTeamMembers(teamMembers.map((member) => (member.id === updatedMember.id ? updatedMember : member)))
  }

  const deleteTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const updateLeaderboard = (userId: number, action: "taskCompleted" | "projectCompleted") => {
    setLeaderboard((prevLeaderboard) => {
      const userIndex = prevLeaderboard.findIndex((entry) => entry.userId === userId)
      if (userIndex === -1) {
        // If user is not in the leaderboard, add them
        return [
          ...prevLeaderboard,
          {
            userId,
            score: action === "taskCompleted" ? 10 : 50,
            tasksCompleted: action === "taskCompleted" ? 1 : 0,
            projectsCompleted: action === "projectCompleted" ? 1 : 0,
          },
        ]
      } else {
        // Update existing user's score
        const updatedLeaderboard = [...prevLeaderboard]
        updatedLeaderboard[userIndex] = {
          ...updatedLeaderboard[userIndex],
          score: updatedLeaderboard[userIndex].score + (action === "taskCompleted" ? 10 : 50),
          tasksCompleted: updatedLeaderboard[userIndex].tasksCompleted + (action === "taskCompleted" ? 1 : 0),
          projectsCompleted: updatedLeaderboard[userIndex].projectsCompleted + (action === "projectCompleted" ? 1 : 0),
        }
        return updatedLeaderboard.sort((a, b) => b.score - a.score)
      }
    })
  }

  const getLeaderboardPosition = (userId: number) => {
    return leaderboard.findIndex((entry) => entry.userId === userId) + 1
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        type: ["message", "task", "team"][Math.floor(Math.random() * 3)],
        content: `New notification ${notifications.length + 1}`,
        time: "Just now",
      }
      addNotification(newNotification)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Initialize leaderboard with current users
    setLeaderboard(
      users.map((user) => ({
        userId: user.id,
        score: 0,
        tasksCompleted: 0,
        projectsCompleted: 0,
      })),
    )
  }, [users])

  return (
    <AppStateContext.Provider
      value={{
        projects,
        tasks,
        teamMembers,
        notifications,
        messages,
        currentUser,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
        addNotification,
        sendMessage,
        login,
        signup,
        logout,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        leaderboard,
        updateLeaderboard,
        getLeaderboardPosition,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}


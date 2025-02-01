"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, CheckSquare, Users, MessageSquare, Bell } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/team", label: "Team", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="bg-card text-card-foreground w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <ul className="space-y-2">
          {links.map((link) => {
            const IconComponent = link.icon
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground ${
                    pathname === link.href ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}


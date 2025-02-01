"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "./components/Sidebar"
import { AppStateProvider, useAppState } from "./context/AppStateContext"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useAppState()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!currentUser && pathname !== "/auth") {
      router.push("/auth")
    }
  }, [currentUser, pathname, router])

  if (!currentUser && pathname !== "/auth") {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {currentUser && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentUser && (
          <header className="bg-primary text-primary-foreground p-4 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold">Task Management Platform</h1>
            <Button
              onClick={() => {
                logout()
                router.push("/auth")
              }}
            >
              Logout
            </Button>
          </header>
        )}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStateProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </AppStateProvider>
      </body>
    </html>
  )
}


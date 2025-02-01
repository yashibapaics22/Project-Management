"use client"

import { useState } from "react"
import { useAppState } from "../context/AppStateContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChatComponent() {
  const { teamMembers, messages, sendMessage } = useAppState()
  const [newMessage, setNewMessage] = useState("")
  const [selectedReceiver, setSelectedReceiver] = useState<number | null>(null)

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedReceiver) {
      sendMessage({
        senderId: 1, // Assuming the current user's ID is 1
        receiverId: selectedReceiver,
        content: newMessage,
      })
      setNewMessage("")
    }
  }

  return (
    <Card className="animate-slide-in">
      <CardHeader>
        <CardTitle>Team Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] mb-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className="flex items-start space-x-2 mb-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Avatar>
                <AvatarImage src={teamMembers.find((m) => m.id === message.senderId)?.avatar} />
                <AvatarFallback>{teamMembers.find((m) => m.id === message.senderId)?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{teamMembers.find((m) => m.id === message.senderId)?.name}</p>
                <p>{message.content}</p>
                <p className="text-sm text-muted-foreground">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2">
          <Select onValueChange={(value) => setSelectedReceiver(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id.toString()}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}


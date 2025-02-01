import ChatComponent from "../components/ChatComponent"

export default function MessagesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Messages</h2>
      <ChatComponent />
    </div>
  )
}


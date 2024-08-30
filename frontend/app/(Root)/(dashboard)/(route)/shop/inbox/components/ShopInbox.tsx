'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import {useRouter} from "next/navigation";

// Mock data for chat conversations
const chatData = [
    {
        id: "kjsdfkjsdf",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        lastMessage: "Hey, how's it going?",
        timestamp: "2 min ago",
        unread: 2,
    },
    {
        id: "kjsdfkjsdf",
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        lastMessage: "Can you send me the report?",
        timestamp: "1 hour ago",
        unread: 0,
    },
    {
        id: "kjsdfkjsdf",
        name: "Carol Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        lastMessage: "Thanks for your help!",
        timestamp: "Yesterday",
        unread: 0,
    },
    {
        id: "kjsdfkjsdf",
        name: "David Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        lastMessage: "Meeting at 3 PM tomorrow",
        timestamp: "2 days ago",
        unread: 1,
    },
    {
        id: "kjsdfkjsdf",
        name: "Eva Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        lastMessage: "Don't forget about the deadline",
        timestamp: "1 week ago",
        unread: 0,
    },
]

export default function ChatList() {

    const router = useRouter()
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredChats = chatData.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const onHandleClick = (id: string) => {
        setSelectedChat(id)
        router.push(`/shop/inbox/chat/${id}`)
    }

    return (
        <div className="w-[73rem] mt-10 mx-auto">
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search chats..."
                        className="pl-10 w-1/2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <ScrollArea className="h-[400px]">
                <div className="p-2">
                    {filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedChat === chat.id
                                    ? 'bg-muted'
                                    : 'hover:bg-muted/50'
                            }`}
                            onClick={() => onHandleClick(chat.id)}
                        >
                            <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={chat.avatar} alt={chat.name} />
                                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold truncate">{chat.name}</h3>
                                    <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                    {chat.timestamp}
                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
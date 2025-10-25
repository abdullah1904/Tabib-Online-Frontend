"use client"
import { useRef, useEffect, useState, useMemo } from 'react';
import { Button, Card, CardBody, Textarea } from "@heroui/react";
import { Bot, Send, User } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getChatHistory } from '@/services/chatbot.service';
import { Message } from '@/types/chatbot';
import { useForm } from 'react-hook-form';
import { ChatbotFormData, chatbotFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { showToast } from '@/utils';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

const TabibBot = () => {
    const { data: session } = useSession();
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);

    const chatBotForm = useForm<ChatbotFormData>({
        resolver: zodResolver(chatbotFormSchema),
        defaultValues: {
            query: ''
        }
    });

    const { data: serverMessages } = useQuery({
        queryKey: ['chatHistory'],
        queryFn: getChatHistory,
    });

    // Combine server messages with real-time messages
    const messages = useMemo(() => {
        return [...(serverMessages || []), ...realtimeMessages];
    }, [serverMessages, realtimeMessages]);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Socket connection
    useEffect(() => {
        if (!session?.user?.id) return;

        socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
            autoConnect: true,
            query: { userId: session.user.id },
        });

        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("response", ({ content }) => {
            console.log("Received AI response:", content);
            setRealtimeMessages((prev) => [
                ...prev,
                { role: "AIMessage", content }
            ]);
        });

        socket.on("error", (error: Error) => {
            console.error("Socket error:", error);
            showToast('Connection error. Please try again.', 'error');
        });

        socket.on("disconnect", (reason: string) => {
            console.log("Socket disconnected:", reason);
        });

        return () => {
            socket.off("connect");
            socket.off("response");
            socket.off("error");
            socket.off("disconnect");
            socket.disconnect();
            socketRef.current = null;
        };
    }, [session?.user?.id]);

    // Auto-scroll when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const onSubmit = (data: ChatbotFormData) => {
        if (!socketRef.current?.connected) {
            showToast('Not connected. Please wait...', 'error');
            return;
        }

        // Add user message to real-time messages immediately
        setRealtimeMessages((prev) => [
            ...prev,
            { role: "HumanMessage", content: data.query }
        ]);

        // Send message to server
        socketRef.current.emit("message", {
            query: data.query,
        });

        // Reset form
        chatBotForm.reset();
    }

    return (
        <div className='w-full flex flex-col md:flex-row justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
            <Card className='w-[95%] md:w-3/4 h-[80vh] mx-auto'>
                {/* Chat Messages */}
                <CardBody className="p-0 flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages?.map((message: Message, index: number) => (
                            <div
                                key={message.role + index}
                                className={`flex ${message.role === 'AIMessage' ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`flex items-end gap-2 max-w-[80%] ${message.role === 'AIMessage' ? 'flex-row' : 'flex-row-reverse'
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'AIMessage'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-200'
                                            }`}
                                    >
                                        {message.role === 'AIMessage' ? (
                                            <Bot className="size-5 text-secondary" />
                                        ) : (
                                            <User className="size-5 text-primary" />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`rounded-lg p-3 ${message.role === 'AIMessage'
                                            ? 'bg-gray-100 text-gray-800'
                                            : 'bg-primary text-white'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap break-words">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-gray-200">
                        <form onSubmit={chatBotForm.handleSubmit(onSubmit)}>
                            <div className="flex gap-2 items-center">
                                <Textarea
                                    {...chatBotForm.register('query')}
                                    placeholder="Type your message..."
                                    className="flex-1"
                                    size="lg"
                                    minRows={2}
                                    maxRows={2}
                                />
                                <Button
                                    isIconOnly
                                    color="primary"
                                    size="lg"
                                    className="flex-shrink-0"
                                    type='submit'
                                    isDisabled={!socketRef.current?.connected}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default TabibBot;
"use client"
import { useRef, useEffect, useState, useMemo } from 'react';
import { Button, Card, CardBody, Textarea } from "@heroui/react";
import { Bot, Send, User, Wrench } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getChatHistory } from '@/services/chatbot.service';
import { Message } from '@/types/chatbot';
import { useForm } from 'react-hook-form';
import { ChatbotFormData, chatbotFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { showToast } from '@/utils';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import Markdown from "react-markdown";

const TabibBot = () => {
    const { data: session } = useSession();
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);
    const [activeToolName, setActiveToolName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const chatBotForm = useForm<ChatbotFormData>({
        resolver: zodResolver(chatbotFormSchema),
        defaultValues: {
            query: ''
        }
    });

    const { data: serverMessages } = useQuery({
        queryKey: ['chatHistory'],
        queryFn: getChatHistory,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
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

        socket.on("toolCall", ({ toolName }) => {
            console.log("Tool called:", toolName);
            setActiveToolName(toolName);
            setIsLoading(true);
        });

        socket.on("response", ({ content }) => {
            console.log("Received AI response:", content);
            setActiveToolName(null);
            setIsLoading(false);
            setRealtimeMessages((prev) => [
                ...prev,
                { role: "AIMessage", content }
            ]);
        });

        socket.on("error", (error: Error) => {
            console.error("Socket error:", error);
            setActiveToolName(null);
            setIsLoading(false);
            showToast('Connection error. Please try again.', 'error');
        });

        socket.on("disconnect", (reason: string) => {
            console.log("Socket disconnected:", reason);
            setActiveToolName(null);
            setIsLoading(false);
        });

        return () => {
            socket.off("connect");
            socket.off("toolCall");
            socket.off("response");
            socket.off("error");
            socket.off("disconnect");
            socket.disconnect();
            socketRef.current = null;
        };
    }, [session?.user?.id]);

    // Auto-scroll when messages change or tool is active
    useEffect(() => {
        scrollToBottom();
    }, [messages, activeToolName]);

    const onSubmit = (data: ChatbotFormData) => {
        if (!socketRef.current?.connected) {
            showToast('Not connected. Please wait...', 'error');
            return;
        }

        setRealtimeMessages((prev) => [
            ...prev,
            { role: "HumanMessage", content: data.query }
        ]);

        setIsLoading(true);

        socketRef.current.emit("message", {
            query: data.query,
        });

        chatBotForm.reset();
    }

    const formatToolName = (toolName: string) => {
        return toolName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
    };

    return (
        <div className='w-full flex flex-col md:flex-row justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
            <Card className='w-[95%] md:w-4/5 h-[80vh] mx-auto'>
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
                                        {message.role === 'AIMessage' ? (
                                            <div className='prose prose-headings:text-primary'>
                                                <Markdown>
                                                    {message.content}
                                                </Markdown>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="whitespace-pre-wrap break-words">
                                                    {message.content}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Tool Call Indicator */}
                        {activeToolName && (
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2 max-w-[80%]">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
                                        <Bot className="size-5 text-secondary" />
                                    </div>

                                    {/* Tool Call Bubble */}
                                    <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <Wrench className="size-4 text-primary animate-pulse" />
                                            <span className="text-sm font-medium">
                                                Using {formatToolName(activeToolName)}...
                                            </span>
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Typing Indicator (when no tool is active but AI is processing) */}
                        {isLoading && !activeToolName && (
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2 max-w-[80%]">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
                                        <Bot className="size-5 text-secondary" />
                                    </div>
                                    <div className="rounded-lg p-3 bg-gray-100">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                    isDisabled={!socketRef.current?.connected || isLoading}
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
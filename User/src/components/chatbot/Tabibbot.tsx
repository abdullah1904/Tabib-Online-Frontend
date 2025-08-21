"use client"
import { useState, useRef, useEffect } from 'react';
import { Button, Card, CardBody, Input } from "@heroui/react";
import { Bot, Send, User } from "lucide-react";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

const TabibBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your chat assistant. How can I help you today?",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (): Promise<void> => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: getBotResponse(inputValue),
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const getBotResponse = (userInput: string): string => {
        const input = userInput.toLowerCase();

        if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return "Hello there! It's great to meet you. What would you like to talk about?";
        } else if (input.includes('how are you')) {
            return "I'm doing well, thank you for asking! I'm here and ready to help with whatever you need.";
        } else if (input.includes('help')) {
            return "I'm here to help! You can ask me questions, have a conversation, or just chat about whatever's on your mind.";
        } else if (input.includes('weather')) {
            return "I don't have access to real-time weather data, but I'd recommend checking your local weather app or website for the most current forecast!";
        } else if (input.includes('time')) {
            return `The current time is ${new Date().toLocaleTimeString()}. Is there anything else I can help you with?`;
        } else if (input.includes('bye') || input.includes('goodbye')) {
            return "Goodbye! It was nice chatting with you. Feel free to come back anytime you want to talk!";
        } else {
            const responses: string[] = [
                "That's interesting! Tell me more about that.",
                "I understand what you're saying. What else would you like to discuss?",
                "Thanks for sharing that with me. How can I help you further?",
                "That's a good point. What are your thoughts on that?",
                "I see. Is there anything specific you'd like to know or talk about?",
                "Interesting perspective! What led you to think about that?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (timestamp: Date): string => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };

    return (
    <div className='w-full flex flex-col md:flex-row justify-center items-start p-2 md:p-10 gap-2 min-h-[91vh] relative bg-foreground'>
            <Card className='w-[80%] md:w-3/4 h-[80vh] mx-auto'>  
                {/* Chat Messages */}
                <CardBody className="p-0 flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message: Message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`flex items-end gap-2 max-w-[80%] ${message.isBot ? "flex-row" : "flex-row-reverse"
                                        }`}
                                >
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? "bg-primary text-white" : "bg-gray-200"
                                            }`}
                                    >
                                        {message.isBot ? (
                                            <Bot className="w-4 h-4" />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div
                                        className={`rounded-lg p-3 ${message.isBot
                                                ? "bg-gray-100 text-gray-800"
                                                : "bg-primary text-white"
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <span
                                            className={`text-xs mt-1 block ${message.isBot ? "text-gray-500" : "text-white/70"
                                                }`}
                                        >
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2 max-w-[80%]">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-3">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.1s" }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.2s" }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                className="flex-1"
                                size="sm"
                            />
                            <Button
                                isIconOnly
                                color="primary"
                                size="sm"
                                className="flex-shrink-0"
                                onPress={sendMessage}
                                isDisabled={!inputValue.trim() || isTyping}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default TabibBot;
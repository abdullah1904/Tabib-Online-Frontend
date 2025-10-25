export interface Message {
    role: "AIMessage" | "HumanMessage";
    content: string;
}
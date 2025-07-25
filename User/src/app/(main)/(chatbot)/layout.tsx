import Chatbot from '@/components/chatbot/Chatbot';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const ChatBotLayout = ({children}: Props) => {
  return (
    <div>
        {children}
        <Chatbot/>
    </div>
  )
}

export default ChatBotLayout
import TabibBot from "@/components/chatbot/Tabibbot";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Tabib Chatbot | Tabib Online",
};


const TabibBotPage = () => {
  return (
    <TabibBot/>
  )
}

export default TabibBotPage
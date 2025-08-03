"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";

type Message = {
  role: "user" | "assistant";
  content: string;
  ui?: string; // This 'ui' key is for client-side rendering only
};

function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = async (content?: string) => {
    const messageToSend = content || userInput;
    if (!messageToSend.trim() || isLoading) return;

    setIsLoading(true);
    setUserInput("");

    const newMessage: Message = {
      role: "user",
      content: messageToSend,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // FIX: Create a clean payload for the API.
    // This strips out any client-side keys like 'ui' before sending.
    const apiPayload = updatedMessages.map(({ role, content }) => ({
      role,
      content,
    }));

    try {
      const result = await axios.post("/api/aimodel", {
        messages: apiPayload, // Send the clean payload
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result?.data?.resp,
          ui: result?.data?.ui,
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, an error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // This function now correctly returns the component to be rendered.
  const RenderGenerativeUi = (ui: string) => {
    if (ui === "groupSize") {
      // Pass the onSend function to make the component interactive.
      return <GroupSizeUi onOptionSelect={(v) => onSend(v)} />;
    }
    // You can add more UI components here later
    // else if (ui === "budget") { ... }
    return null;
  };

  return (
    <div className="h-[91vh] flex flex-col py-10">
      {messages.length === 0 && !isLoading ? (
        <EmptyBoxState onSelectOption={(v: string) => setUserInput(v)} />
      ) : (
        <section className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-lg px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
                {/* Render the generative UI if the 'ui' key exists */}
                {msg.ui && RenderGenerativeUi(msg.ui)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mt-2">
              <div className="max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg">
                <Loader className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </section>
      )}

      <section className="mt-auto pt-4">
        <div className="border rounded-2xl p-4 shadow relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button
            size={"icon"}
            className="absolute bottom-6 right-6"
            onClick={() => onSend()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Chatbox;

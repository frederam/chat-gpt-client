"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);

  const handleFormSubmit = (e) => {
    handleSubmit(e);
    if (input.length > 0 && !isFirstMessageSent) {
      setIsFirstMessageSent(true);
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-screen px-4 pb-8">
      <div className="py-8 text-3xl">
        ChatGPT Text Client
      </div>
      <div className="w-full max-w-3xl flex-1 overflow-y-auto p-4 space-y-2 scrollbar-custom mb-4">
        {messages.map((m) => (
          <div key={m.id} className={`whitespace-pre-wrap flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-4 max-w-xs rounded-lg shadow-lg ${
                m.role === "user" ? "bg-blue-500 dark:bg-gray-600 text-white" : "bg-gray-300 dark:bg-gray-500 text-black dark:text-white"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleFormSubmit}
        className={`w-3/4 md:w-full max-w-3xl flex items-end gap-2 bg-white dark:bg-zinc-900 p-1 border border-gray-400 rounded-lg shadow-2xl shadow-offset-y-[15px] transition-all duration-300 ${
          isFirstMessageSent ? "bottom-10" : "absolute top-1/2 -translate-y-1/2"
        }`}
      >
        <textarea
          className="flex-1 h-32 max-h-lg p-2 border-none outline-none rounded dark:bg-zinc-900 resize-none selected"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleFormSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 m-1 bg-blue-600 dark:bg-[#66686b] text-white rounded-lg hover:dark:bg-[#9b9ea1] hover:bg-blue-500 hover:cursor-pointer self-end"
        >
          Send
        </button>
      </form>
      <footer className="fixed bottom-0 w-full text-center p-2 text-sm text-gray-600 dark:text-gray-400">
        Client developed by Frederick Valle
      </footer>
    </div>
  );
}

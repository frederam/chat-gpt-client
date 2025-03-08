"use client";

import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });
  return (
    <div className="flex flex-col items-center w-full h-screen px-4 py-24">
      <div className="w-full max-w-3xl flex-1 overflow-y-auto p-4 space-y-2 scrollbar-custom">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "You: " : "AI: "} {m.content}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex items-center gap-2 fixed bottom-10 bg-white dark:bg-zinc-900 p-1 rounded-lg shadow-lg"
      >
        <input
          className="flex-1 p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-md dark:bg-zinc-900"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type="submit" className="px-4 py-2 bg-[#66686b] text-white rounded-lg hover:bg-[#9b9ea1] hover:cursor-pointer">
          Send
        </button>
      </form>
      <footer className="fixed bottom-0 w-full text-center p-2 text-sm text-gray-600 dark:text-gray-400">
        Client developed by Frederick Valle
      </footer>
    </div>
  );
}

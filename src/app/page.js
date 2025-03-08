"use client";

import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });
  return (
    <>
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch h-auto min-h-[10vh]">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap overflow-y-auto max-h-[80vh]">
            {m.role === "user" ? "You: " : "AI: "} {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed dark:bg-zinc-900 bottom-5 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div>
        <footer className="fixed bottom-5 px-5">Client developed by Frederick Valle</footer>
      </div>
    </>
  );
}

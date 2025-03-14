"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    maxSteps: 5,
  });

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const handleFormSubmit = (e) => {
    handleSubmit(e);
    if (input.length > 0 && !isFirstMessageSent) {
      setIsFirstMessageSent(true);
    }
  };

  const checkScrollPosition = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;
    const isScrollable = container.scrollHeight > container.clientHeight;

    setShowScrollButton(!isAtBottom && isScrollable);
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    checkScrollPosition();
  }, [status]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      checkScrollPosition();
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen px-4 pb-8">
      <div className="py-8 text-3xl">ChatGPT Text Client</div>
      <div
        ref={messagesContainerRef}
        className="w-full max-w-3xl flex-1 overflow-y-auto p-4 space-y-2 scrollbar-custom mb-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            ref={m.role === "user" ? lastMessageRef : null}
            className={`whitespace-pre-wrap flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-4 my-2 max-w-xl rounded-lg shadow-lg ${
                m.role === "user"
                  ? "bg-blue-500 dark:bg-gray-600 text-white"
                  : "bg-gray-300 dark:bg-gray-500 text-black dark:text-white"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {showScrollButton && (
        <div className="fixed bottom-50 bg-blue-600 dark:bg-[#66686b] text-white  rounded-lg shadow-lg hover:bg-blue-500 hover:dark:bg-[#9b9ea1] transition">
          {" "}
          <button
            className="hover:cursor-pointer px-4 py-2"
            onClick={() =>
              messagesContainerRef.current?.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            Scroll down
          </button>
        </div>
      )}

      <form
        onSubmit={handleFormSubmit}
        className={`w-11/12 md:w-full max-w-3xl flex items-end gap-2 bg-white dark:bg-zinc-900 p-1 border border-gray-400 rounded-lg shadow-2xl shadow-offset-y-[15px] transition-all duration-300 ${
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
          className={`px-4 py-2 m-1 bg-blue-600 dark:bg-[#66686b] text-white rounded-lg hover:dark:bg-[#9b9ea1] ${
            status === "streaming" ? "hover:cursor-default" : " hover:cursor-pointer"
          } hover:bg-blue-500 self-end`}
          disabled={status === "streaming" ? true : false}
        >
          Send
        </button>
      </form>
      <footer className="fixed bottom-0 w-full text-center p-2 text-sm text-gray-600 dark:text-gray-400">
        Developed by Frederick Valle
      </footer>
    </div>
  );
}

"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
  });

  return (
    <section className="min-h-screen dark:bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-10 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6">
          <div className="bg-white flex-1 h-[500px] dark:bg-zinc-800 rounded-lg shadow-lg p-4 overflow-auto w-96">
            <ul className="space-y-4">
              <li className="flex space-x-2 items-end rounded-lg p-4 bg-zinc-200">
                <div className="flex-1">
                  <div className="text-zinc-900 dark:text-zinc-100 text-sm">
                    Assistant
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-300 text-xs">
                    How can I assist you today?
                  </div>
                </div>
              </li>
              {messages &&
                messages.map((message) => {
                  return (
                    <li
                      key={message.id}
                      className={`flex space-x-2 items-end rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-zinc-100 text-right"
                          : "bg-zinc-200"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="text-zinc-900 dark:text-zinc-100 text-sm">
                          {message.role === "user" ? "You" : "Assistant"}
                        </div>
                        <div className="text-zinc-500 dark:text-zinc-300 text-xs">
                          {message.content}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full h-[200px] rounded-lg shadow-lg p-4 dark:bg-zinc-800 dark:text-zinc-100"
                placeholder="Type your message here ..."
                value={input}
                onChange={handleInputChange}
              />
              <button className="w-full h-10 mt-4 px-6 rounded-md bg-zinc-900 text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

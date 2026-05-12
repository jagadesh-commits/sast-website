"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ChatbotOpenContextValue = {
  chatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
};

const ChatbotOpenContext = createContext<ChatbotOpenContextValue | null>(null);

export function ChatbotOpenProvider({ children }: { children: ReactNode }) {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const value = useMemo(
    () => ({
      chatbotOpen,
      setChatbotOpen,
    }),
    [chatbotOpen],
  );
  return <ChatbotOpenContext.Provider value={value}>{children}</ChatbotOpenContext.Provider>;
}

export function useChatbotOpen(): ChatbotOpenContextValue {
  const ctx = useContext(ChatbotOpenContext);
  if (!ctx) {
    return { chatbotOpen: false, setChatbotOpen: () => {} };
  }
  return ctx;
}

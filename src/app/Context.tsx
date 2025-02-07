"use client";
import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

type ContextProps = {
  activeLink: string;
  setActiveLink: Dispatch<SetStateAction<string>>;
};

const context = createContext<ContextProps | null>(null);

export default function Context({ children }: { children: React.ReactNode }) {
  const [activeLink, setActiveLink] = useState<string>("");

  return (
    <context.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </context.Provider>
  );
}

export function useActiveLink() {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error("useActiveLink must be used within a ContextProvider");
  }
  return contextValue;
}

"use client";
import { createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { redirect } from "next/navigation";

type User = {
  name: string;
  email: string;
};

type ContextProps = {
  user: null | User;
  setUser: Dispatch<SetStateAction<null | User>>;
  logout: () => void;
};

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | User>(null);

  function logout() {
    setUser(null);
    redirect("/");
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user) || null);
    }
  }, []);

  return (
    <context.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </context.Provider>
  );
}

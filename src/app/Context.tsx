"use client";
import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { redirect } from "next/navigation";

type User = {
  name: string;
  email: string;
  image: string;
};

type ContextProps = {
  user: null | User;
  setUser: Dispatch<SetStateAction<null | User>>;
  logout: () => void;
};

export const context = createContext<ContextProps | null>(null);

export function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | User>({
    name: "Linda",
    email: "adsf@gmail.com",
    image: "/beautician.jpg",
  });

  function logout() {
    setUser(null);
    redirect("/");
  }

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

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, TOKEN_KEY } from "@/lib/api";

type User = { id: number; name: string; email: string };
type AuthCtx = { user: User; logout: () => Promise<void> };

const Ctx = createContext<AuthCtx | null>(null);

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace("/dashboard/login");
      return;
    }
    api
      .get<User>("/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        router.replace("/dashboard/login");
      });
  }, [router]);

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      /* token may already be invalid – ignore */
    }
    localStorage.removeItem(TOKEN_KEY);
    router.replace("/dashboard/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-200 border-t-[#2f6bff]" />
      </div>
    );
  }

  return <Ctx.Provider value={{ user, logout }}>{children}</Ctx.Provider>;
}
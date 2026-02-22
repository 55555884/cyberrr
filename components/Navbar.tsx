"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { key: "home", href: "/", icon: "🏠", label: "Home" },
    { key: "tasks", href: "/tasks", icon: "📋", label: "Tasks" },
    { key: "history", href: "/history", icon: "🕘", label: "History" },
    { key: "profile", href: "/profile/setup", icon: "👤", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 mx-auto max-w-3xl">
      <div className="backdrop-blur-sm bg-white/70 border border-gray-100 rounded-2xl px-6 py-3 flex justify-between items-center shadow-md" style={{borderWidth: '1px'}}>
        {items.map((it) => {
          const active = pathname === it.href || (it.href !== '/' && pathname?.startsWith(it.href));
          return (
            <button
              key={it.key}
              onClick={() => router.push(it.href)}
              className="flex flex-col items-center gap-1 p-2 bg-transparent"
              aria-current={active ? 'page' : undefined}
            >
              <span style={{fontSize: 20, lineHeight: 1}} aria-hidden>
                {it.icon}
              </span>
              <span style={{fontSize: 11, color: active ? '#000000' : '#8b8b8b', fontWeight: 600}}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORIES = ["ALL", "SURVEY", "OFFER", "VIDEO"];

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    const verified = localStorage.getItem('worldid_verified');
    if (!verified) { router.push('/'); return; }
    async function fetchTasks() {
      setLoading(true);
      const res = await fetch(`/api/tasks`);
      const data = await res.json();
      setTasks(data.tasks || []);
      setLoading(false);
    }
    fetchTasks();
  }, []);

  const filtered = activeCategory === "ALL" ? tasks : tasks.filter(t => t.category === activeCategory);

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ padding: "24px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src="/logo.png" alt="CYBERRR" style={{ width: "160px", height: "32px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ background: "#1A1A1A", border: "1px solid #252525", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "16px" }}>🔔</button>
          <button style={{ background: "#1A1A1A", border: "1px solid #252525", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "16px" }}>👤</button>
        </div>
      </div>
      <div style={{ padding: "20px 16px 0" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 4px", letterSpacing: "-0.5px" }}>AVAILABLE TASKS</h2>
        <p style={{ fontSize: "12px", color: "#555", margin: "0 0 20px" }}>Complete tasks to earn USDC instantly</p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", overflowX: "auto" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "7px 16px", borderRadius: "999px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap", backgroundColor: activeCategory === cat ? "#06C755" : "#1A1A1A", color: activeCategory === cat ? "#FFFFFF" : "#555" }}>
              {cat}
            </button>
          ))}
        </div>
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ backgroundColor: "#141414", borderRadius: "20px", padding: "20px", border: "1px solid #1E1E1E" }}>
                <div style={{ height: "12px", backgroundColor: "#222", borderRadius: "6px", width: "40%", marginBottom: "12px" }} />
                <div style={{ height: "18px", backgroundColor: "#222", borderRadius: "6px", width: "70%", marginBottom: "12px" }} />
                <div style={{ height: "12px", backgroundColor: "#222", borderRadius: "6px", width: "30%" }} />
              </div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <p style={{ color: "#555", fontSize: "14px", fontWeight: "600" }}>No tasks available right now</p>
          </div>
        )}
        {!loading && filtered.map((task) => (
          <div key={task.id} onClick={() => router.push("/survey")} style={{ backgroundColor: "#141414", padding: "20px", borderRadius: "20px", cursor: "pointer", border: "1px solid #1E1E1E", marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#06C755", border: "1px solid #06C75533", borderRadius: "999px", padding: "3px 10px", backgroundColor: "#06C75510" }}>{task.category || "SURVEY"}</span>
              <span style={{ fontSize: "18px", fontWeight: "800", color: "#06C755" }}>{task.reward}</span>
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: "700", color: "#FFFFFF" }}>{task.title}</h3>
            <div style={{ display: "flex", gap: "12px" }}>
              <span style={{ fontSize: "11px", color: "#444" }}>⏱ {task.duration || "5 min"}</span>
              <span style={{ fontSize: "11px", color: "#444" }}>★ {task.rating || "4.5"}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "fixed", bottom: "16px", left: "16px", right: "16px", backgroundColor: "#141414", borderRadius: "24px", padding: "14px 24px", display: "flex", justifyContent: "space-around", border: "1px solid #222" }}>
        {[{icon:"⊞",label:"Tasks",path:"/tasks",active:true},{icon:"🔍",label:"Search",path:"/tasks",active:false},{icon:"📋",label:"History",path:"/history",active:false},{icon:"👤",label:"Profile",path:"/",active:false}].map(item => (
          <button key={item.label} onClick={() => router.push(item.path)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", border: "none", background: "none", cursor: "pointer" }}>
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", fontWeight: "600", color: item.active ? "#06C755" : "#444" }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const API_BASE = "https://taskaligner-backend.onrender.com/process";

export async function generatePlan(text) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}

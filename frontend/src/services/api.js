const API_URL = "http://127.0.0.1:8000/process";

export async function generatePlan(text) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}

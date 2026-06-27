// API utility - placeholder endpoints for Node/Express/MongoDB backend
const API_BASE = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE) || "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  register: (data: { name: string; email: string; mobile: string; password: string; language: string }) =>
    request("/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: { identifier: string; password: string }) =>
    request("/login", { method: "POST", body: JSON.stringify(data) }),
  getSchemes: () => request("/schemes"),
  getDocuments: () => request("/documents"),
  chat: (data: { message: string; language: string; userId?: string }) =>
    request<{ reply: string }>("/chat", { method: "POST", body: JSON.stringify(data) }),
  feedback: (data: { name: string; email: string; language: string; rating: number; message: string }) =>
    request("/feedback", { method: "POST", body: JSON.stringify(data) }),
};

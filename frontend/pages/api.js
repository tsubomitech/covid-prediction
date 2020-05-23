import fetch from 'isomorphic-unfetch'

const API_URL = "http://localhost:8080/test";

export default async (req, res) => {
  if (req.method === "POST") {
    const r = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    let type = r.status == 200 ? "success" : "error"
    let message = await r.json();
    res.status(r.status).json({ type, message });
  } else {
    res.status(405).json({ type: "error", message: "Must be a POST request" });
  }
};

import fetch from "isomorphic-unfetch";
import auth from "basic-auth";

const API_URL = process.env.API_URL || "http://localhost:8080";

export default async (req, res) => {
  var user = auth(req);
  if (user?.name !== "admin" || user?.pass !== "K3nji") {
    res.setHeader("WWW-Authenticate", 'Basic realm="private"');
    res.status(401);
    res.json({});
    return;
  }

  if (req.method === "GET") {
    const r = await fetch(API_URL + "/models", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let type = r.status == 200 ? "success" : "error";
    let message = await r.json();
    res.status(r.status).json({ type, message });
  } else if (req.method === "POST") {
    const r = await fetch(API_URL + "/test", {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: req.headers,
    });
    let type = r.status == 200 ? "success" : "error";
    let message = await r.json();
    res.status(r.status).json({ type, message });
  } else {
    res
      .status(405)
      .json({ type: "error", message: "Must be a GET or POST request" });
  }
};

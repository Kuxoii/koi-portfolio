const express = require("express");
const cors = require("cors");

// 🔧 This is how you use node-fetch in CommonJS properly
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

const API_KEY = "67612e0515e83e8f77e88f3611477b5e";
const USERNAME = "Kuxoii";

app.use(cors());

app.get("/now-playing", async (req, res) => {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from Last.fm:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
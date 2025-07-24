const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "67612e0515e83e8f77e88f3611477b5e";
const USERNAME = "Kuxoii";

app.use(cors({
  origin: "*",
  methods: ["GET"]
}));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/now-playing", async (req, res) => {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Failed to fetch Last.fm:", response.status);
      return res.status(502).json({ error: "Bad Gateway from Last.fm" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from Last.fm:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Now Playing server live at http://localhost:${PORT}`);
});
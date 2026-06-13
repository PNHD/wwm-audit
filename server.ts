import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI client on the server-side as required by guidelines
const aiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (aiApiKey) {
  ai = new GoogleGenAI({
    apiKey: aiApiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// REST API for Gemini or Deepseek-driven Gear Optimization & Strategy Advice
app.post("/api/optimize", async (req, res) => {
  try {
    const { panel, tier, relayingState, arsenalState, provider = "gemini", customApiKey } = req.body;

    // Resolve API key
    const resolvedKey = customApiKey || (provider === "gemini" ? process.env.GEMINI_API_KEY : process.env.DEEPSEEK_API_KEY);

    if (!resolvedKey && provider === "gemini" && !ai) {
      return res.status(400).json({
        error: "Gemini API Key is not configured. Please enter your custom Gemini API key directly in the Advisor settings panel.",
      });
    } else if (!resolvedKey && provider === "deepseek") {
      return res.status(400).json({
        error: "Deepseek API Key is not configured. Please enter your custom Deepseek API key directly in the Advisor settings panel.",
      });
    }

    const prompt = `
      You are an expert math and gearing theorist for the Wuxia open-world game "Where Winds Meet".
      Our player is using the "Bamboocut-Dust" (Bamboocut-Wind/Splendor) build specializing in Everspring Umbrella and Rope Dart in Season 3 (Grade 95, Level 91 gear tier).
      
      Here are the player's current attributes:
      - Physical Attack: Min ${panel.minOuter}, Max ${panel.maxOuter}
      - Physical Penetration: ${panel.outerPen}%
      - Attribute Atk (Bamboocut): Min ${panel.minPz}, Max ${panel.maxPz}
      - Attribute Pen (Bamboocut): ${panel.pzPen}%
      - Bamboocut DMG Bonus: ${panel.pzDmg}%
      - Precision Rate: ${panel.prec}%
      - Critical Rate: ${panel.crit}%, Direct Crit: ${panel.dcrit}%
      - Critical DMG: ${panel.critDmg}%
      - Affinity Rate: ${panel.aff}%, Direct Affinity: ${panel.daff}%
      - Affinity DMG: ${panel.affDmg}%
      - Armor Set: ${panel.set}
      
      Currently targeted Dungeon Tier:
      - Boss Defense: ${tier.def}
      - Boss Judgment Resistance: ${tier.judgeRes}px
      - Baseline Graduation DMG score: ${req.body.baselineScore || "N/A"}
      - Player current Rotation score: ${req.body.totalDmgScore || "N/A"}
      - Current Graduation Rate: ${req.body.gradRate || "N/A"}%

      Relaying (Substat inheritance) system state:
      ${JSON.stringify(relayingState || {})}

      Arsenal system level & active specs:
      ${JSON.stringify(arsenalState || {})}

      Provide a high-quality, professional, and laser-focused upgrade roadmap and gearing strategy in English ONLY. 
      Format your response in neat, markdown-structured points with bold titles.
      Cover:
      1. **Evaluation**: Analyze if we are close to the physical pen and max physical attack baseline targets for Tier 91 graduation.
      2. **Substat Relaying Recommendation**: Explain which priority substats (e.g., Physical Pen, Max Outer Atk, Bamboocut Atk) to relay onto gear slots. Point out the Level 91 stat caps (e.g. +9% Physical Pen, +63.8 Max Physical Atk).
      3. **Arsenal Upgrades**: Advise on where points should be spent in the weapon manual to recover missing panel Precision, Atk, or Crit stats.
      4. **Armor Set & Mastery Advice**: Compare Stars Align vs Eaglerise for their current rates.
      
      Keep the tone encouraging, technical, pragmatic, and detailed. Do not cite simulated container ids or file paths.
    `;

    if (provider === "deepseek") {
      // Call Deepseek Chat API (open-ai compatible format)
      console.log("Calling Deepseek API chat completion endpoint...");
      const deepseekRes = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resolvedKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "You are a professional wuxia theorycrafting assistant." },
            { role: "user", content: prompt }
          ],
          temperature: 0.2
        })
      });

      if (!deepseekRes.ok) {
        const errText = await deepseekRes.text();
        console.error("Deepseek error response:", errText);
        return res.status(deepseekRes.status).json({
          error: `Deepseek API returned error (${deepseekRes.status}): ${errText.substring(0, 200)}`
        });
      }

      const dsData = await deepseekRes.json();
      const sentence = dsData?.choices?.[0]?.message?.content || "Deepseek returned empty response.";
      return res.json({ advice: sentence });
    } else {
      // Default to Gemini API
      console.log("Calling Gemini API generateContent...");
      let activeAi = ai;
      if (customApiKey || !ai) {
        activeAi = new GoogleGenAI({ apiKey: resolvedKey });
      }

      const response = await activeAi!.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      return res.json({ advice: response.text });
    }
  } catch (error: any) {
    console.error("API Optimize Error:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

// Serve frontend assets with async bootstrap to support CommonJS targets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();

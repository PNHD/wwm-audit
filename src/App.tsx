import React, { useState, useEffect, useMemo } from "react";
import {
  Shield,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Award,
  Zap,
  RotateCw,
  Trophy,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Sliders,
  CheckCircle,
  Database,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  Clock,
  Info,
  Camera,
} from "lucide-react";
import { PanelStats, TierConstants } from "./types";
import { TIERS, calcSkill, calcBaseline, ROTATION, ROTATION_TIME } from "./utils/calc";
import { INNER_WAYS } from "./data/innerways";
import { WWM_DATA } from "./data/wwmData";
import OcrScanner from "./components/OcrScanner";
import StatSwapSimulator from "./components/StatSwapSimulator";

// Constants
const PATH_ICONS: Record<string, string> = {
  "bellstrike-splendor": "https://static0.fextralifeimages.com/file/wherewindsmeet/8/8a/Bellstrike-splendor.png",
  "bellstrike-umbra":    "https://static0.fextralifeimages.com/file/wherewindsmeet/b/b6/Bellstrike-umbra.png",
  "silkbind-deluge":     "https://static0.fextralifeimages.com/file/wherewindsmeet/6/6b/Silkbind-deluge.png",
  "silkbind-jade":       "https://static0.fextralifeimages.com/file/wherewindsmeet/e/ec/Silkbind-jade.png",
  "bamboocut-wind":      "https://static0.fextralifeimages.com/file/wherewindsmeet/9/9f/Bamboocut-wind.png",
  "stonesplit-might":    "https://static0.fextralifeimages.com/file/wherewindsmeet/d/d1/Stonesplit-might.png",
  "bamboocut-dust":      "https://static0.fextralifeimages.com/file/wherewindsmeet/0/05/Bamboocut-dust-where-winds-meet-wiki-guide.webp",
  "stonesplit-scale":    "https://static0.fextralifeimages.com/file/wherewindsmeet/9/96/Stonesplit-strength-path-where-winds-meet-wiki-guide.webp",
};

const WEAPON_ICONS: Record<string, string> = {
  "everspring-umbrella":  "https://static0.fextralifeimages.com/file/wherewindsmeet/c/c4/Everspring-umbrella-martial-art-weapon-where-winds-meet-wiki-guide.webp",
  "unfettered-rope-dart": "https://static0.fextralifeimages.com/file/wherewindsmeet/0/02/Unfettered-rope-dart-martial-art-weapon-where-winds-meet-wiki-guide.webp",
  "nameless-sword":       "https://static0.fextralifeimages.com/file/wherewindsmeet/8/80/Nameless-sword-weapon-icon-where-winds-meet-wiki-guide.png",
  "nameless-spear":       "https://static0.fextralifeimages.com/file/wherewindsmeet/9/9c/Nameless-spear-weapon-icon-where-winds-meet-wiki-guide.png",
  "strategic-sword":      "https://static0.fextralifeimages.com/file/wherewindsmeet/9/96/Strategic-sword-weapon-icon-where-winds-meet-wiki-guide.png",
  "heavenquaker-spear":   "https://static0.fextralifeimages.com/file/wherewindsmeet/b/b3/Heavenquaker-spear-weapon-icon-where-winds-meet-wiki-guide.png",
  "infernal-twinblades":  "https://static0.fextralifeimages.com/file/wherewindsmeet/f/f0/Infernal-twinblades-weapon-icon-where-winds-meet-wiki-guide.png",
  "mortal-rope-dart":     "https://static0.fextralifeimages.com/file/wherewindsmeet/8/80/Mortal-rope-dart-weapon-icon-where-winds-meet-wiki-guide.png",
  "inkwell-fan":          "https://static0.fextralifeimages.com/file/wherewindsmeet/4/4e/Inkwell-fan-weapon-icon-where-winds-meet-wiki-guide.png",
  "vernal-umbrella":      "https://static0.fextralifeimages.com/file/wherewindsmeet/a/a7/Ninefold-umbrella-weapon-icon-where-winds-meet-wiki-guide.png",
  "panacea-fan":          "https://static0.fextralifeimages.com/file/wherewindsmeet/thumb/1/18/Panacea-fan-weapon-icon-where-winds-meet-wiki-guide.png/150px-Panacea-fan-weapon-icon-where-winds-meet-wiki-guide.png",
  "soulshade-umbrella":   "https://static0.fextralifeimages.com/file/wherewindsmeet/c/c7/Soulshade-umbrella-weapon-icon-where-winds-meet-wiki-guide.png",
  "stormbreaker-spear":   "https://static0.fextralifeimages.com/file/wherewindsmeet/8/8a/Stormbreaker-spear-weapon-icon-where-winds-meet-wiki-guide.png",
  "thundercry-blade":     "https://static0.fextralifeimages.com/file/wherewindsmeet/2/27/Thundercry-blade-weapon-icon-where-winds-meet-wiki-guide.png",
  "snowparting-blade":    "https://static0.fextralifeimages.com/file/wherewindsmeet/f/fd/Snowparting-blade-martial-art-weapon-where-winds-meet-wiki-guide.webp",
  "phalanxbane-blade":    "https://static0.fextralifeimages.com/file/wherewindsmeet/f/f7/Phalanxbane-blade-martial-art-weapon-where-winds-meet-wiki-guide.webp",
};

const BUILD_WEAPONS: Record<string, [string, string]> = {
  "bamboocut-dust":     ["everspring-umbrella", "unfettered-rope-dart"],
  "bamboocut-wind":     ["infernal-twinblades", "mortal-rope-dart"],
  "bellstrike-splendor":["nameless-sword", "nameless-spear"],
  "bellstrike-umbra":   ["strategic-sword", "heavenquaker-spear"],
  "silkbind-jade":      ["inkwell-fan", "vernal-umbrella"],
  "silkbind-deluge":    ["panacea-fan", "soulshade-umbrella"],
  "stonesplit-might":   ["thundercry-blade", "stormbreaker-spear"],
  "stonesplit-scale":   ["snowparting-blade", "phalanxbane-blade"],
};

const CLASS_WEAPONS: Record<string, string[]> = {
  "Bamboocut-Dust": ["Everspring Umbrella", "Unfettered Rope Dart"],
  "Bamboocut-Wind": ["Mortal Rope Dart", "Infernal Twinblades"],
  "Nameless": ["Nameless Sword", "Nameless Spear"],
  "Jade": ["Inkwell Fan", "Vernal Umbrella"],
  "Rocksplit-Might": ["Thundercry Blade", "Stormbreaker Spear"],
  "Nine-Nine": ["Strategic Sword", "Heavenquaker Spear"],
  "Rocksplit-Jun": ["Snowparting Blade", "Phalanxbane Blade"],
  "Pure-Healer": ["Panacea Fan", "Soulshade Umbrella"],
  "Fire-Fist-Healer": ["Panacea Fan", "Soulshade Umbrella"],
};

const PREDEFINED_WEAPONS = [
  { id: "custom", name: "Custom Base Stats (Manual Editing)", min: 1800, max: 3000 },
  { id: "umb-standard-t91", name: "Everspring Umbrella (Tier 91 Basic)", min: 1450, max: 2200 },
  { id: "umb-upgraded-t91", name: "Everspring Umbrella (Tier 91 Grad +10)", min: 1929, max: 4614 },
  { id: "sword-upgraded-t91", name: "Nameless Sword (Tier 91 Grad +10)", min: 2120, max: 4769 },
  { id: "twinblades-upgraded-t91", name: "Infernal Twinblades (Graduation)", min: 1882, max: 5068 },
  { id: "fan-upgraded-t91", name: "Inkwell Fan (Graduation)", min: 1740, max: 4580 },
];

const BUILD_TIPS: Record<string, string[]> = {
  "bamboocut-dust": [
    "🎯 Max Phys ATK → 4046 is the graduation target",
    "🔩 Phys Pen → 51.2% net (panel value - 20 boss resist)",
    "⚡ Crit Rate → need 116%+ panel to cap at 80% eff (÷1.45)",
    "⚠️ Bamboocut ATK contributes ~15-20% of rotation damage",
    "✦ Attuned Bonus: Drunken Spring Skill DMG (Weapon Attuned DMG) — crucial!",
    "🍖 Food buff adds +90/+180 Phys ATK — always use before raids",
  ],
  "bellstrike-umbra": [
    "🎯 Affinity Rate → aim for 58%+ panel to cap 40% eff at T91",
    "⚡ Crit Rate and Affinity Rate both matter for Umbra",
    "✦ Attuned Bonus: Strategic Sword Skill DMG — stack on all gear",
    "⚠️ DO NOT use Eaglerise set if Affinity procs are rare",
  ],
  "stonesplit-might": [
    "🎯 Max Phys ATK → 3500+ target",
    "⚠️ Avoid Attr ATK (Bamboocut/Bellstrike/Silkbind) — useless",
    "⚠️ Max 2 Agility substats — diminishing returns after",
    "🛡 Prioritize survivability over pure DPS for this path",
  ],
};

const STAT_TOOLTIPS: Record<string, string> = {
  minOuter: "Min Physical Attack — affects graze hits and Min ATK floor. When Min > Max, all hits use Min ATK value.",
  maxOuter: "Max Physical Attack — primary DPS stat. Target: 4046 for graduation (Bamboocut-Dust).",
  outerPen: "Physical Penetration. Net pen = panel - boss phys resist (20 at T91). Target net: 31.2%+",
  crit: "Critical Rate. Effective crit = panel ÷ (1 + Judge Resist). At T91: need 116%+ panel for 80% eff cap.",
  aff: "Affinity Rate. Cap: 40% effective. At T91 need ~58% panel.",
  prec: "Precision Rate. Base 65% not reduced by resist. Panel 116% → ~100% effective. Cap = 100%.",
  critDmg: "Critical DMG Bonus. Default base is 50%. Stack after crit rate is capped.",
  affDmg: "Affinity DMG Bonus. Default base is 35%.",
  dcrit: "Direct Critical Rate — bypasses Judgment Resistance entirely. Very efficient stat.",
};

const GRAD_MARKERS = [
  { pct: 80, label: "C", color: "bg-slate-500" },
  { pct: 85, label: "B", color: "bg-lime-600" },
  { pct: 88, label: "A", color: "bg-yellow-500" },
  { pct: 90, label: "S", color: "bg-amber-500" },
  { pct: 100, label: "🎓", color: "bg-emerald-500" },
];


const ATTUNED_BONUS_LABEL: Record<string, string> = {
  "bamboocut-dust": "Drunken Spring: Skill DMG Bonus (Attuned Weapon Bonus)",
  "bamboocut-wind": "Mortal Rope Dart: Skill DMG Bonus (Attuned Weapon Bonus)",
  "bamboocut-kite": "Fist: Charged Skill DMG Bonus (Attuned Weapon Bonus)",
  "bellstrike-umbra": "Strategic Sword: Skill DMG Bonus (Attuned Weapon Bonus)",
  "bellstrike-splendor": "Nameless Sword: Charged Skill DMG Bonus (Attuned Weapon Bonus)",
  "silkbind-jade": "Vernal Umbrella: Special Skill DMG Bonus (Attuned Weapon Bonus)",
  "stonesplit-might": "Guandao: Charged/Derived Skill DMG Bonus (Attuned Weapon Bonus)",
  "stonesplit-scale": "Guandao: Charged/Derived Skill DMG Bonus (Attuned Weapon Bonus)",
  "silkbind-deluge": "Panacea Fan: Healing Bonus (Attuned Weapon Bonus)",
};

const INITIAL_PANEL: PanelStats = {
  minOuter: 1507,
  maxOuter: 2278,
  outerPen: 36.4,
  minPz: 377,
  maxPz: 688,
  pzPen: 18.0,
  pzDmg: 9.0,
  prec: 116.9,
  crit: 116.9,
  aff: 14.7,
  dcrit: 4.6,
  daff: 0,
  critDmg: 54,
  affDmg: 35,
  outerDmg: 2.8,
  bossDmg: 0,
  umbBonus: 5.1,
  ropeBonus: 0,
  allArts: 0,
  attunedBonus: 0,
  wuxiangMin: 0,
  wuxiangMax: 0,
  set: "stars",
};

export interface SavedProfile {
  id: string;
  name: string;
  timestamp: string;
  panel: PanelStats;
  gradRate: number;
  dps: number;
}

export interface GearSub {
  type: string;
  val: string;
  isTuned?: boolean;
}

export interface GearItem {
  id: string;
  slot: string;
  name: string;
  quality: "gold" | "purple" | "blue";
  main: string;
  set: string;
  subs: GearSub[];
  mastery?: number;
}

export interface Scheme {
  id: string;
  name: string;
  panel: PanelStats;
  gear: GearItem[];
}

export interface Character {
  id: string;
  name: string;
  schemes: Scheme[];
}

export interface CharsData {
  chars: Character[];
  activeCharId: string | null;
  activeSchemeId: string | null;
}

export interface TuneCooldown {
  id: string;
  slot: string;
  itemName: string;
  createdAt: number;
  durationMs: number;
}

const SLOTS = [
  { name: "Umbrella", icon: "☂" },
  { name: "Rope Dart", icon: "🪃" },
  { name: "Pendant", icon: "📿" },
  { name: "Helmet", icon: "⛑" },
  { name: "Chest", icon: "🥋" },
  { name: "Greaves", icon: "🦿" },
  { name: "Bracers", icon: "🤺" },
  { name: "Bow/Ring", icon: "🏹" }
];

// Gradient colors per armor set (used for Equipped Slots icon badges since no
// verified per-piece CDN images exist for armor — keeps each set visually
// distinct without fabricating image URLs)
const SET_BADGE_COLORS: Record<string, string> = {
  "stars":         "from-amber-500 to-yellow-700",      // Moonflare
  "eaglerise":     "from-sky-500 to-blue-700",          // Hawking
  "stormrain":     "from-teal-400 to-cyan-700",         // Eaglerise
  "jadeware":      "from-emerald-400 to-green-700",     // Jadeware
  "ivorybloom":    "from-pink-400 to-rose-700",         // Ivorybloom
  "rainwhisper":   "from-indigo-400 to-blue-800",       // Rainwhisper
  "pursuing":      "from-purple-400 to-violet-700",     // Pursuing Shadow
  "shakenhill":    "from-stone-400 to-stone-700",
  "swallowreturn": "from-orange-400 to-orange-700",
  "ironweave":     "from-slate-400 to-slate-700",
  "none":          "from-slate-600 to-slate-800",
};

const DEFAULT_GEAR: GearItem[] = [
  { id:"g1", slot:"Umbrella", name:"Swiftwing Cloud Umbrella", quality:"gold", main:"Phys Atk 48~112", set:"stars",
    subs:[{type:"Max Phys Atk",val:"59.2"},{type:"Max Phys Atk",val:"63.8"},{type:"Umbrella Bonus",val:"5.1%"},{type:"Min Phys Atk",val:"62.9"},{type:"Crit Rate",val:"7.4%"},{type:"Phys Pen",val:"7.4"}]},
  { id:"g2", slot:"Rope Dart", name:"Swiftwing Charm", quality:"gold", main:"Min Phys Atk 71", set:"stars",
    subs:[{type:"Min Phys Atk",val:"56.2"},{type:"Max Phys Atk",val:"59.9"},{type:"Min Phys Atk",val:"61.7"},{type:"Max Bamboocut Atk",val:"35.0"},{type:"Crit Rate",val:"7.4%"},{type:"Phys Pen",val:"6.4"}]},
  { id:"g3", slot:"Pendant", name:"Swiftwing Pendant", quality:"gold", main:"Max Phys Atk 106", set:"stars",
    subs:[{type:"Max Phys Atk",val:"49.9"},{type:"Max Phys Atk",val:"58.3"},{type:"Min Phys Atk",val:"63.8",isTuned:true},{type:"Crit Rate",val:"6.8%"},{type:"Phys Pen",val:"8.6"}]},
  { id:"g4", slot:"Helmet", name:"Nightfarer Crown", quality:"gold", main:"HP 4614 / DEF 18", set:"eaglerise",
    subs:[{type:"Crit Rate",val:"7.0%"},{type:"Crit Rate",val:"7.1%"},{type:"Min Phys Atk",val:"63.8",isTuned:true},{type:"Max Bamboocut Atk",val:"33.4"},{type:"Max Phys Atk",val:"62.7"},{type:"Umbrella Bonus",val:"4.8%"}]},
  { id:"g5", slot:"Chest", name:"Nightfarer Armor", quality:"gold", main:"HP 9227 / DEF 18", set:"eaglerise",
    subs:[{type:"Precision",val:"6.3%"},{type:"Max Bamboocut Atk",val:"34.8"},{type:"Min Bamboocut Atk",val:"35.4"},{type:"Crit Rate",val:"7.4%",isTuned:true},{type:"Max Phys Atk",val:"59.7"},{type:"Umbrella Bonus",val:"4.8%"}]},
  { id:"g6", slot:"Greaves", name:"Nightfarer Night Leg Armor", quality:"purple", main:"HP 4153 / DEF 32", set:"eaglerise",
    subs:[{type:"Crit Rate",val:"6.8%"},{type:"Max Phys Atk",val:"63.8",isTuned:true},{type:"Precision",val:"6.6%"},{type:"Crit Rate",val:"6.9%"},{type:"Min Bamboocut Atk",val:"33.7"},{type:"Umbrella Bonus",val:"4.5%"}]},
  { id:"g7", slot:"Bracers", name:"Nightfarer Bracers", quality:"purple", main:"HP 4614 / DEF 18", set:"eaglerise",
    subs:[{type:"Crit Rate",val:"7.2%"},{type:"Max Bamboocut Atk",val:"36.2"},{type:"Min Phys Atk",val:"63.8",isTuned:true},{type:"Crit Rate",val:"7.3%"},{type:"Max Phys Atk",val:"59.8"},{type:"Umbrella Bonus",val:"5.0%"}]},
  { id:"g8", slot:"Bow/Ring", name:"Eastgaze Bow: Divine + Eastgaze Ring", quality:"gold", main:"Pursuing Shadow Set 2/2",
    set:"pursuing", subs:[{type:"Affinity Rate",val:"1.8% (set)"},{type:"All Weapon",val:"12.5%"},{type:"Crit Rate",val:"6.8%"}]},
];

const SUB_MAP: Record<string, keyof PanelStats> = {
  "Max Phys Atk": "maxOuter",
  "Min Phys Atk": "minOuter", 
  "Phys Pen": "outerPen",
  "Crit Rate": "crit",
  "Crit DMG": "critDmg",
  "Affinity Rate": "aff",
  "Affinity DMG": "affDmg",
  "Precision": "prec",
  "Max Bamboocut Atk": "maxPz",
  "Min Bamboocut Atk": "minPz",
  "Attr Pen": "pzPen",
  "Bamboocut DMG%": "pzDmg",
  "Umbrella Bonus": "umbBonus",
  "All Weapon": "allArts",
  "Phys DMG%": "outerDmg",
  "Boss DMG%": "bossDmg",
};

// --- Gear-driven panel engine -------------------------------------------------
// Parses a gear sub-stat display value like "59.2", "5.1%", "1.8% (set)" into a number.
const parseSubValue = (val: string): number => {
  const m = val.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : 0;
};

// Sums all sub-stat values from a gear list into PanelStats keys via SUB_MAP.
const sumGearSubs = (gear: GearItem[]): Partial<Record<keyof PanelStats, number>> => {
  const sums: Partial<Record<keyof PanelStats, number>> = {};
  gear.forEach(item => {
    item.subs.forEach(sub => {
      const key = SUB_MAP[sub.type];
      if (!key) return;
      const v = parseSubValue(sub.val);
      sums[key] = (sums[key] || 0) + v;
    });
  });
  return sums;
};

// Back-calculated "no-gear" base panel: INITIAL_PANEL minus the contribution of
// DEFAULT_GEAR's sub-stats, for every stat that SUB_MAP can derive from gear.
// By construction, computeGearPanel(DEFAULT_GEAR) === INITIAL_PANEL exactly.
const BASE_PANEL_NO_GEAR: PanelStats = (() => {
  const defaultSum = sumGearSubs(DEFAULT_GEAR);
  const base = { ...INITIAL_PANEL };
  (Object.keys(defaultSum) as (keyof PanelStats)[]).forEach(k => {
    (base[k] as number) = (base[k] as number) - (defaultSum[k] || 0);
  });
  return base;
})();

// Computes the full panel for an equipped gear list: base (no-gear) stats + sum
// of all sub-stats across the 8 equipped items, mapped via SUB_MAP. Fields not
// covered by SUB_MAP (set, attunedBonus, dcrit, daff, wuxiang*, bossDmg, etc.)
// are carried over from `current` unchanged.
const computeGearPanel = (current: PanelStats, gear: GearItem[]): PanelStats => {
  const gearSum = sumGearSubs(gear);
  const next = { ...current };
  (Object.values(SUB_MAP) as (keyof PanelStats)[]).forEach(key => {
    (next[key] as number) = (BASE_PANEL_NO_GEAR[key] as number) + (gearSum[key] || 0);
  });
  return next;
};
// ---------------------------------------------------------------------------

const BUILD_PROFILES = {
  "bamboocut-dust": {
    label: "Bamboocut-Dust", weapons: "Everspring Umbrella + Unfettered Rope Dart",
    tier: "T0 AoE", color: "text-amber-500",
    gradTargets: { maxOuter: 4046, minOuter: 1657, outerPen: 51.2, crit: 116.9, aff: 14.7, critDmg: 54 },
    notes: "Priority: Max Phys ATK → Phys Pen → Bamboocut ATK. Prec ~116% (effectively capped). Crit ~116%+ panel to cap at 80% eff.",
    priorityStats: ["maxOuter","outerPen","crit","critDmg","maxPz","umbBonus"],
  },
  "bellstrike-umbra": {
    label: "Bellstrike-Umbra", weapons: "Strategic Sword + Heavenquaker Spear",
    tier: "T0 Single", color: "text-indigo-400",
    gradTargets: { maxOuter: 4231, minOuter: 1800, outerPen: 45.0, crit: 95.4, aff: 71.6, critDmg: 60 },
    notes: "Priority: Affinity Rate → Max Phys ATK → Crit DMG. Aff cap = 40% eff (need ~58% panel at T91).",
    priorityStats: ["aff","affDmg","maxOuter","crit","outerPen"],
  },
  "bellstrike-splendor": {
    label: "Bellstrike-Splendor", weapons: "Nameless Sword + Nameless Spear",
    tier: "T1 Easy", color: "text-blue-400",
    gradTargets: { maxOuter: 3800, minOuter: 1500, outerPen: 40.0, crit: 54.4, aff: 43.5, critDmg: 45 },
    notes: "Priority: Max Phys ATK → Crit Rate → Affinity Rate. Forgiving build for beginners.",
    priorityStats: ["maxOuter","crit","aff","outerPen","critDmg"],
  },
  "bamboocut-wind": {
    label: "Bamboocut-Wind", weapons: "Infernal Twinblades + Mortal Rope Dart",
    tier: "T0 AoE", color: "text-orange-400",
    gradTargets: { maxOuter: 1800, minOuter: 800, outerPen: 40.0, crit: 108.8, aff: 14.5, critDmg: 50 },
    notes: "Priority: Bamboocut ATK → Phys Pen → Crit Rate. Different scaling from Bamboocut-Dust.",
    priorityStats: ["maxPz","pzPen","maxOuter","crit","outerPen"],
  },
  "stonesplit-might": {
    label: "Stonesplit-Might", weapons: "Thundercry Blade + Stormbreaker Spear",
    tier: "T1 Tank", color: "text-stone-400",
    gradTargets: { maxOuter: 3500, minOuter: 1400, outerPen: 38.0, crit: 81.2, aff: 21.75, critDmg: 45 },
    notes: "Priority: Max Phys ATK → Crit Rate → Phys Pen. Avoid Attr ATK stats (useless for this path).",
    priorityStats: ["maxOuter","crit","outerPen","critDmg","allArts"],
  },
  "silkbind-jade": {
    label: "Silkbind-Jade", weapons: "Vernal Umbrella + Inkwell Fan",
    tier: "T1 Ranged", color: "text-teal-400",
    gradTargets: { maxOuter: 4007, minOuter: 1700, outerPen: 44.0, crit: 107.6, aff: 43.5, critDmg: 50 },
    notes: "Priority: Max Phys ATK → Bamboocut ATK → Crit Rate → Affinity Rate.",
    priorityStats: ["maxOuter","crit","aff","affDmg","outerPen","umbBonus"],
  },
  "silkbind-deluge": {
    label: "Silkbind-Deluge (Healer)", weapons: "Panacea Fan + Soulshade Umbrella",
    tier: "T1 Healer", color: "text-emerald-400",
    gradTargets: { maxOuter: 2800, minOuter: 1200, outerPen: 30.0, crit: 43.5, aff: 29.0, critDmg: 40 },
    notes: "Focus on healing power > personal DPS. Do NOT chase Bamboocut ATK or high pen.",
    priorityStats: ["maxOuter","crit","aff","outerPen","allArts"],
  },
};

const SET_EMOJI: Record<string, string> = {
  "stars": "🌙",          // Moonflare
  "eaglerise": "🦅",       // Hawking
  "stormrain": "🌧️",       // Eaglerise
  "jadeware": "💚",        // Jadeware
  "ivorybloom": "🌸",      // Ivorybloom
  "rainwhisper": "💧",     // Rainwhisper
  "pursuing": "👥",        // Pursuing Shadow
  "shakenhill": "⛰️",
  "swallowreturn": "🕊️",
  "ironweave": "🛡️",
  "none": "🔹",
};

const ARMOR_SETS = {
  "stars": {
    name: "Moonflare",
    stat2pc: { minOuter: 106 },
    desc2pc: "2/4: Min Physical Attack +106",
    desc4pc: "4/4: Hitting boss or 2+ enemies grants a Stars Align stack (5 sec): +3% Martial Art Skill DMG per stack, max 5 stacks = +15%. Stacks are lost when hit.",
    recommended: ["bamboocut-dust"],
  },
  "eaglerise": {
    name: "Hawking",
    stat2pc: { aff: 6.1 },
    desc2pc: "2/4: +6.1% Affinity Rate",
    desc3pc: "3/4: Outgoing Healing +10%",
    desc4pc: "4/4: When Affinity DMG triggers, gain a stack: +2% Physical ATK per stack (5s, max 5 stacks = +10% Phys ATK)",
    recommended: ["bamboocut-wind", "stonesplit-might"],
  },
  "stormrain": {
    name: "Eaglerise",
    stat2pc: { prec: 10.8 },
    desc2pc: "2/4: +10.8% Precision Rate",
    desc4pc: "4/4: Dealing damage over time OR healing grants a stack that increases DMG and healing.",
    recommended: ["bellstrike-umbra"],
  },
  "jadeware": {
    name: "Jadeware",
    stat2pc: { maxOuter: 106 },
    desc2pc: "+106 Max Physical ATK",
    desc4pc: "Martial Art Skill activates Jadeware: Increases Affinity DMG when dealing Affinity damage",
    recommended: ["bellstrike-umbra", "bellstrike-splendor"],
  },
  "ironweave": {
    name: "Ironweave",
    stat2pc: {},
    desc2pc: "+Physical Defense",
    desc4pc: "Shield duration +2s. If shield broken, gain additional DMG reduction",
    recommended: [],
  },
  "shakenhill": {
    name: "Shakenhill",
    stat2pc: { prec: 10.8 },
    desc2pc: "+10.8% Precision Rate",
    desc4pc: "After Light Attack/Airborne Light Attack, Heavy Attack DMG increased",
    recommended: ["silkbind-jade"],
  },
  "swallowreturn": {
    name: "Swallow Return",
    stat2pc: { minOuter: 106 },
    desc2pc: "+106 Min Physical ATK",
    desc4pc: "Light Attacks deal +15% DMG to targets above 50% HP",
    recommended: ["bamboocut-wind"],
  },
  "rainwhisper": {
    name: "Rainwhisper",
    stat2pc: {},
    desc2pc: "+Max HP",
    desc4pc: "+10% Critical DMG and healing. Additional effects.",
    recommended: ["stonesplit-might"],
  },
  "ivorybloom": {
    name: "Ivorybloom",
    stat2pc: { crit: 12.1 },
    desc2pc: "+12.1% Critical Rate",
    desc4pc: "At Max HP: +5% Critical chance and +15% Critical heal/DMG",
    recommended: ["silkbind-deluge"],
  },
  "none": { name: "No Set / Mixed", stat2pc: {}, desc2pc: "—", desc4pc: "—", recommended: [] },
};

const getCustomConfig = () => {
  if (typeof window === "undefined") return null;
  const cached = localStorage.getItem("wwm_t91_custom_config");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
  }
  return null;
};

export default function App() {
  const [tierKey, setTierKey] = useState<string>(() => {
    const config = getCustomConfig();
    return config?.tierKey ?? "350|0.45";
  });
  const [panel, setPanel] = useState<PanelStats>(() => {
    const config = getCustomConfig();
    return config?.panel ?? INITIAL_PANEL;
  });

  // Auto-compute panel stats (Min/Max Phys Atk, Pen, Crit, Aff, Bamboocut Atk, etc.)
  // from the 8 equipped gear pieces, instead of manual entry.
  const [autoGearPanel, setAutoGearPanel] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("wwm_auto_gear_panel");
    return stored === null ? true : stored === "1";
  });

  useEffect(() => {
    localStorage.setItem("wwm_auto_gear_panel", autoGearPanel ? "1" : "0");
  }, [autoGearPanel]);

  const [activeTab, setActiveTab ] = useState<"calculator" | "priority" | "gear" | "compare" | "simulators" | "ocr" | "profiles" | "rot-sim" | "cultivate">("calculator");
  const [analysisMenuOpen, setAnalysisMenuOpen] = useState(false);
  const [rotationTab, setRotationTab] = useState<"list" | "top">("list");

  const [rotSimClass, setRotSimClass] = useState<string>("Bamboocut-Dust");
  const [cultivateClass, setCultivateClass] = useState<string>("Bamboocut-Dust");

  const [tuneCooldowns, setTuneCooldowns] = useState<TuneCooldown[]>(() => {
    try {
      const stored = localStorage.getItem("wwm_relay_cooldowns");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showAddCooldownModal, setShowAddCooldownModal] = useState(false);
  const [cooldownSelectedGearId, setCooldownSelectedGearId] = useState("");
  const [cooldownRelayDate, setCooldownRelayDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("wwm_relay_cooldowns", JSON.stringify(tuneCooldowns));
  }, [tuneCooldowns]);

  const [hitsState, setHitsState] = useState<Record<string, number>>(() => {
    const initialHits: Record<string, number> = {};
    WWM_DATA.skills.forEach(s => {
      const lower = s.name.toLowerCase();
      if (lower.includes("spin") || lower.includes("wheel")) {
        initialHits[s.name] = 78;
      } else if (lower.includes("resonance") || lower.includes("echo")) {
        initialHits[s.name] = 75;
      } else if (lower.includes("umbrella") || lower.includes("rope")) {
        initialHits[s.name] = 30;
      } else {
        initialHits[s.name] = 0;
      }
    });
    return initialHits;
  });

  const [swapWeaponId, setSwapWeaponId] = useState<string>("custom");
  const [swapMinAtk, setSwapMinAtk] = useState<number>(1800);
  const [swapMaxAtk, setSwapMaxAtk] = useState<number>(3000);

  // Multi-build, Inner Ways, and Custom Rotation States
  const [selectedBuild, setSelectedBuild] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wwm_selected_build");
      if (stored) return stored;
    }
    return "bamboocut-dust";
  });

  useEffect(() => {
    localStorage.setItem("wwm_selected_build", selectedBuild);
  }, [selectedBuild]);

  const [innerWaysFilter, setInnerWaysFilter] = useState<"recommended" | "all">("recommended");
  const [innerWaySearch, setInnerWaySearch] = useState("");
  const [formlessOpen, setFormlessOpen] = useState(false);
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["attack", "judgment", "damage", "weapon-bonus", "inner-ways"])
  );

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isOpen = expandedSections.has(id);
    return (
      <div className="border-b border-slate-900/50 pb-2 mb-2">
        <button
          onClick={() => setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
          })}
          className="w-full flex items-center justify-between text-[11px] font-mono tracking-wider text-amber-500/80 uppercase mb-1"
        >
          <span>{title}</span>
          <span className="text-slate-600">{isOpen ? "▼" : "▶"}</span>
        </button>
        {isOpen && children}
      </div>
    );
  };

  const [isCustomRotationOpen, setIsCustomRotationOpen] = useState(false);
  const [customRotationText, setCustomRotationText] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wwm_custom_rotation");
      if (stored) return stored;
    }
    return "Rope Dart R×3 → Perfect Q×6 → Resonance×8 → Dragon Rider → repeat";
  });

  useEffect(() => {
    localStorage.setItem("wwm_custom_rotation", customRotationText);
  }, [customRotationText]);

  // Multi-Character & Scheme states
  const [charsData, setCharsData] = useState<CharsData>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wwm_chars_v3");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.chars && Array.isArray(parsed.chars)) {
            return parsed;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    const charId = "char-" + Date.now();
    const schemeId = "scheme-" + Date.now();
    return {
      chars: [
        {
          id: charId,
          name: "Main Hero",
          schemes: [
            {
              id: schemeId,
              name: "Scheme 1",
              panel: INITIAL_PANEL,
              gear: DEFAULT_GEAR
            }
          ]
        }
      ],
      activeCharId: charId,
      activeSchemeId: schemeId
    };
  });

  const activeChar = useMemo(() => {
    return charsData.chars.find(c => c.id === charsData.activeCharId) ?? null;
  }, [charsData.chars, charsData.activeCharId]);

  const activeScheme = useMemo(() => {
    if (!activeChar) return null;
    return activeChar.schemes.find(s => s.id === charsData.activeSchemeId) ?? null;
  }, [activeChar, charsData.activeSchemeId]);

  useEffect(() => {
    if (activeScheme) {
      if (activeScheme.panel) {
        setPanel(activeScheme.panel);
      }
    }
  }, [charsData.activeCharId, charsData.activeSchemeId]);

  const getActiveGear = (): GearItem[] => {
    return activeScheme?.gear ?? DEFAULT_GEAR;
  };

  const saveActiveGear = (newGear: GearItem[]) => {
    const updatedChars = charsData.chars.map(c => {
      if (c.id === charsData.activeCharId) {
        return {
          ...c,
          schemes: c.schemes.map(s => {
            if (s.id === charsData.activeSchemeId) {
              return { ...s, gear: newGear };
            }
            return s;
          })
        };
      }
      return c;
    });
    const newData = { ...charsData, chars: updatedChars };
    setCharsData(newData);
    localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
  };

  // When "Auto from Gear" is on, derive Min/Max Phys Atk, Pen, Crit, Aff, Bamboocut
  // Atk, etc. from the 8 equipped gear pieces (Gear tab) and overwrite those fields
  // in `panel`. Other fields (set, attunedBonus, dcrit/daff, wuxiang, boss dmg %)
  // stay manually-controlled.
  useEffect(() => {
    if (!autoGearPanel) return;
    const gear = getActiveGear();
    setPanel(prev => computeGearPanel(prev, gear));
  }, [autoGearPanel, activeScheme?.gear]);

  const STEPS: Record<string, number> = {
    "Max Phys Atk": 10,
    "Min Phys Atk": 10,
    "Phys Pen": 1,
    "Crit Rate": 1,
    "Crit DMG": 1,
    "Affinity Rate": 1,
    "Affinity DMG": 1,
    "Precision": 1,
    "Max Bamboocut Atk": 10,
    "Min Bamboocut Atk": 10,
    "Attr Pen": 1,
    "Bamboocut DMG%": 1,
    "Umbrella Bonus": 1,
    "All Weapon": 1,
    "Phys DMG%": 1,
    "Boss DMG%": 1,
  };

  const computeTotalDamage = (p: PanelStats) => {
    let totalDmg = 0;
    ROTATION.forEach((item) => {
      const { total } = calcSkill(item, p, activeTier, {
        set: p.set || "gold",
        datang,
        yishui,
        buildKey: selectedBuild,
      });
      totalDmg += total;
    });
    return totalDmg;
  };

  const marginalGain = (statKey: keyof PanelStats, step: number) => {
    const baseDmg = computeTotalDamage(adjustedPanel);
    if (baseDmg <= 0) return 0;
    const p = { ...adjustedPanel };
    (p[statKey] as number) += step;
    const newDmg = computeTotalDamage(p);
    return ((newDmg - baseDmg) / baseDmg) * 100;
  };

  const getGearItemCompareStats = (item: GearItem) => {
    let totalGradDelta = 0;
    const subsWithDeltas = item.subs.map(sub => {
      const statKey = SUB_MAP[sub.type];
      if (!statKey) return { type: sub.type, val: sub.val, isTuned: !!sub.isTuned, delta: 0 };
      
      const cleanVal = parseFloat(sub.val.replace(/[^\d.]/g, "")) || 0;
      const step = STEPS[sub.type] || 1;
      const gainPerStep = marginalGain(statKey as keyof PanelStats, step);
      const isTuned = !!sub.isTuned;
      const factor = isTuned ? 1.15 : 1.0;
      const delta = (cleanVal / step) * gainPerStep * factor;
      totalGradDelta += delta;
      
      return {
        type: sub.type,
        val: sub.val,
        isTuned,
        delta
      };
    });
    return {
      totalGradDelta,
      subsWithDeltas
    };
  };

  // Gear state fields
  const [selectedSlot, setSelectedSlot] = useState<string>("Umbrella");
  const [gearFilterSlot, setGearFilterSlot] = useState<string>("ALL");
  const [gearSortBy, setGearSortBy] = useState<"name" | "mastery">("name");
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formQuality, setFormQuality] = useState<"gold" | "purple" | "blue">("gold");
  const [formMain, setFormMain] = useState("");
  const [formSet, setFormSet] = useState("stars");
  const [formMastery, setFormMastery] = useState<string>("");
  const [formSubs, setFormSubs] = useState<{type: string; val: string; isTuned?: boolean}[]>(
    Array(6).fill(null).map(() => ({ type: "Max Phys Atk", val: "", isTuned: false }))
  );

  const openAddModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormQuality("gold");
    setFormMain("");
    setFormSet("stars");
    setFormMastery("");
    setFormSubs(Array(6).fill(null).map(() => ({ type: "Max Phys Atk", val: "", isTuned: false })));
    setIsItemModalOpen(true);
  };

  const openEditModal = (item: GearItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormQuality(item.quality);
    setFormMain(item.main);
    setFormSet(item.set);
    setFormMastery(item.mastery !== undefined ? item.mastery.toString() : "");
    const subs = [...item.subs];
    while (subs.length < 6) {
      subs.push({ type: "Other", val: "", isTuned: false });
    }
    setFormSubs(subs);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!formName.trim()) {
      alert("Please enter an item name!");
      return;
    }
    const savedSubs = formSubs
      .filter(s => s.type !== "Other" && s.val.trim() !== "")
      .map(s => ({
        type: s.type,
        val: s.val,
        isTuned: !!s.isTuned
      }));
    const masteryVal = formMastery.trim() !== "" ? parseInt(formMastery, 10) : undefined;
    const activeGear = getActiveGear();
    let updatedGear: GearItem[];
    if (editingItem) {
      updatedGear = activeGear.map(it => {
        if (it.id === editingItem.id) {
          return {
            ...it,
            name: formName,
            quality: formQuality,
            main: formMain,
            set: formSet,
            mastery: masteryVal,
            subs: savedSubs
          };
        }
        return it;
      });
    } else {
      const newItem: GearItem = {
        id: "gear-" + Date.now(),
        slot: selectedSlot,
        name: formName,
        quality: formQuality,
        main: formMain,
        set: formSet,
        mastery: masteryVal,
        subs: savedSubs
      };
      updatedGear = [...activeGear, newItem];
    }
    saveActiveGear(updatedGear);
    setIsItemModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this gear item?")) {
      const activeGear = getActiveGear();
      const updatedGear = activeGear.filter(it => it.id !== id);
      saveActiveGear(updatedGear);
      setIsItemModalOpen(false);
    }
  };

  const openCooldownModal = () => {
    const gear = getActiveGear();
    if (gear.length > 0) {
      setCooldownSelectedGearId(gear[0].id);
    } else {
      setCooldownSelectedGearId("");
    }
    const today = new Date();
    setCooldownRelayDate(today.toISOString().split("T")[0]);
    setShowAddCooldownModal(true);
  };

  const handleAddCooldown = () => {
    const gear = getActiveGear().find(g => g.id === cooldownSelectedGearId);
    if (!gear) return;
    const relayDateObj = new Date(cooldownRelayDate);
    const timestamp = relayDateObj.getTime();

    const newCd: TuneCooldown = {
      id: "cd-" + Date.now(),
      slot: gear.slot,
      itemName: gear.name,
      createdAt: timestamp,
      durationMs: 7 * 24 * 60 * 60 * 1000
    };

    setTuneCooldowns(prev => [...prev, newCd]);
    setShowAddCooldownModal(false);
  };

  const handleRemoveCooldown = (id: string) => {
    setTuneCooldowns(prev => prev.filter(c => c.id !== id));
  };

  const [selectedInnerWays, setSelectedInnerWays] = useState<string[]>(() => {
    const config = getCustomConfig();
    return config?.selectedInnerWays ?? [];
  });
  const [innerWayTiers, setInnerWayTiers] = useState<Record<string, number>>(() => {
    const config = getCustomConfig();
    return config?.innerWayTiers ?? {};
  });
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [newProfileName, setNewProfileName] = useState<string>("");
  const [compareProfileIds, setCompareProfileIds] = useState<string[]>([]);

  // Custom tier variables
  const [customDef, setCustomDef] = useState<number>(() => {
    const config = getCustomConfig();
    return config?.customDef ?? 350;
  });
  const [customRes, setCustomRes] = useState<number>(() => {
    const config = getCustomConfig();
    return config?.customRes ?? 0.45;
  });

  // Buffet / check option variables
  const [datang, setDatang] = useState<boolean>(() => {
    const config = getCustomConfig();
    return config?.datang ?? false;
  });
  const [yishui, setYishui] = useState<boolean>(() => {
    const config = getCustomConfig();
    return config?.yishui ?? true;
  });
  const [food, setFood] = useState<boolean>(() => {
    const config = getCustomConfig();
    return config?.food ?? true;
  });
  const [yishuiPen, setYishuiPen] = useState<boolean>(() => {
    const config = getCustomConfig();
    return config?.yishuiPen ?? true;
  });
  const [qianying, setQianying] = useState<boolean>(() => {
    const config = getCustomConfig();
    return config?.qianying ?? true;
  });
  const [script50, setScript50] = useState<boolean>(() => {
    const config = getCustomConfig();
    return config?.script50 ?? false;
  });
  const [earlySeason, setEarlySeason] = useState<boolean>(() => {
    const config = getCustomConfig();
    return config?.earlySeason ?? false;
  });
  const [bowSelect, setBowSelect] = useState<string>(() => {
    const config = getCustomConfig();
    return config?.bowSelect ?? "crit";
  });

  const [hasCustomConfig, setHasCustomConfig] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("wwm_t91_custom_config");
    }
    return false;
  });

  const handleSaveAsDefault = () => {
    const config = {
      panel,
      selectedInnerWays,
      innerWayTiers,
      tierKey,
      bowSelect,
      food,
      datang,
      yishui,
      yishuiPen,
      qianying,
      script50,
      earlySeason,
      customDef,
      customRes
    };
    try {
      localStorage.setItem("wwm_t91_custom_config", JSON.stringify(config));
      setHasCustomConfig(true);
      alert("Current panel stats has been successfully configured as your local default startup preset!");
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred while saving configuration.");
    }
  };

  const handleResetAll = () => {
    if (confirm("Are you sure you want to restore overall parameters and buffs to your saved default or factory settings?")) {
      const cachedConfig = localStorage.getItem("wwm_t91_custom_config");
      if (cachedConfig) {
        try {
          const config = JSON.parse(cachedConfig);
          if (config.panel) setPanel(config.panel);
          if (config.selectedInnerWays) setSelectedInnerWays(config.selectedInnerWays);
          if (config.innerWayTiers) setInnerWayTiers(config.innerWayTiers);
          if (config.tierKey) setTierKey(config.tierKey);
          if (config.bowSelect) setBowSelect(config.bowSelect);
          if (config.food !== undefined) setFood(config.food);
          if (config.datang !== undefined) setDatang(config.datang);
          if (config.yishui !== undefined) setYishui(config.yishui);
          if (config.yishuiPen !== undefined) setYishuiPen(config.yishuiPen);
          if (config.qianying !== undefined) setQianying(config.qianying);
          if (config.script50 !== undefined) setScript50(config.script50);
          if (config.earlySeason !== undefined) setEarlySeason(config.earlySeason);
          if (config.customDef !== undefined) setCustomDef(config.customDef);
          if (config.customRes !== undefined) setCustomRes(config.customRes);
          return;
        } catch (e) {
          console.error(e);
        }
      }
      // System factory defaults
      setPanel(INITIAL_PANEL);
      setSelectedInnerWays([]);
      setTierKey("350|0.45");
      setBowSelect("crit");
      setFood(true);
      setDatang(false);
      setYishui(true);
      setYishuiPen(true);
      setQianying(true);
      setScript50(false);
      setEarlySeason(false);
      setCustomDef(350);
      setCustomRes(0.45);
    }
  };

  const handleClearCustomDefault = () => {
    if (confirm("Are you sure you want to permanently delete your custom default configuration and restore original factory settings?")) {
      localStorage.removeItem("wwm_t91_custom_config");
      setHasCustomConfig(false);
      setPanel(INITIAL_PANEL);
      setSelectedInnerWays([]);
      setTierKey("350|0.45");
      setBowSelect("crit");
      setFood(true);
      setDatang(false);
      setYishui(true);
      setYishuiPen(true);
      setQianying(true);
      setScript50(false);
      setEarlySeason(false);
      setCustomDef(350);
      setCustomRes(0.45);
      alert("Custom defaults successfully wiped. Baseline factory settings restored.");
    }
  };

  // Compute dynamically matching weapon categories for selected build
  const recommendedWeaponCategories = useMemo(() => {
    const build = BUILD_PROFILES[selectedBuild as keyof typeof BUILD_PROFILES];
    if (!build) return ["General"];
    const weaponsLower = build.weapons.toLowerCase();
    const cats = ["General"];
    if (weaponsLower.includes("umbrella")) cats.push("Umbrella");
    if (weaponsLower.includes("rope dart")) cats.push("Rope Dart");
    if (weaponsLower.includes("spear")) cats.push("Spear");
    if (weaponsLower.includes("sword")) cats.push("Sword");
    if (weaponsLower.includes("twinblades") || weaponsLower.includes("twinblade")) cats.push("Twinblades");
    if (weaponsLower.includes("blade")) cats.push("Blade");
    if (weaponsLower.includes("fist")) cats.push("Fist");
    if (weaponsLower.includes("fan") || weaponsLower.includes("flute")) cats.push("Flute");
    return cats;
  }, [selectedBuild]);

  // 1. Resolve Active Tier Constants
  const activeTier = useMemo((): TierConstants => {
    if (tierKey === "custom") {
      return {
        def: customDef,
        judgeRes: customRes,
        foodMin: 90,
        foodMax: 180,
        baseMinOuter: 894.89,
        baseMaxOuter: 1648.08,
        baseCrit: 30.41,
        baseAff: 15.205,
        basePrec: 94.0,
        armoryMin: 114,
        armoryMax: 229,
        hiddenAttr: 129.2,
        pzPenBase: 10.8,
        pzDmgBase: 5.4,
        physRes: 20,
        attrRes: 24,
        name: "Custom Dungeon Target",
      };
    }
    return TIERS[tierKey] || TIERS["350|0.45"];
  }, [tierKey, customDef, customRes]);

  // Load profiles from storage or populate default sets
  useEffect(() => {
    const cached = localStorage.getItem("wwm_t91_profiles");
    if (cached) {
      try {
        setProfiles(JSON.parse(cached));
      } catch (err) {
        console.error(err);
      }
    } else {
      // Preload high-quality reference Gear Sets for immediate comparison
      const defaults: SavedProfile[] = [
        {
          id: "pre_set_1",
          name: "Gear Set 1: Basic T91 (Newbie)",
          timestamp: "System Pre-set",
          panel: {
            minOuter: 1100,
            maxOuter: 1850,
            outerPen: 25.0,
            minPz: 220,
            maxPz: 420,
            pzPen: 12.0,
            pzDmg: 4.5,
            prec: 98,
            crit: 60.0,
            aff: 4.0,
            dcrit: 0,
            daff: 0,
            critDmg: 40,
            affDmg: 20,
            outerDmg: 1.0,
            bossDmg: 0,
            umbBonus: 2.0,
            ropeBonus: 0,
            allArts: 0,
            attunedBonus: 0,
            wuxiangMin: 0,
            wuxiangMax: 0,
            set: "none"
          },
          gradRate: 42.5,
          dps: 15400
        },
        {
          id: "pre_set_2",
          name: "Gear Set 2: Mid-tier Optimized T91",
          timestamp: "System Pre-set",
          panel: {
            minOuter: 1350,
            maxOuter: 2280,
            outerPen: 35.5,
            minPz: 295,
            maxPz: 512,
            pzPen: 18.5,
            pzDmg: 8.0,
            prec: 100,
            crit: 74.0,
            aff: 8.5,
            dcrit: 4.6,
            daff: 0,
            critDmg: 50,
            affDmg: 30,
            outerDmg: 2.3,
            bossDmg: 4.0,
            umbBonus: 4.5,
            ropeBonus: 0,
            allArts: 3.5,
            attunedBonus: 0,
            wuxiangMin: 0,
            wuxiangMax: 0,
            set: "stars"
          },
          gradRate: 70.8,
          dps: 31200
        },
        {
          id: "pre_set_3",
          name: "Gear Set 3: Absolute Graduation T91",
          timestamp: "System Pre-set",
          panel: {
            minOuter: 1515,
            maxOuter: 2650,
            outerPen: 41.5,
            minPz: 385,
            maxPz: 685,
            pzPen: 25.5,
            pzDmg: 11.2,
            prec: 102,
            crit: 79.5,
            aff: 12.5,
            dcrit: 4.6,
            daff: 0,
            critDmg: 54,
            affDmg: 35,
            outerDmg: 2.8,
            bossDmg: 7.6,
            umbBonus: 7.4,
            ropeBonus: 0,
            allArts: 7.2,
            attunedBonus: 0,
            wuxiangMin: 0,
            wuxiangMax: 0,
            set: "stars"
          },
          gradRate: 98.4,
          dps: 45600
        }
      ];
      setProfiles(defaults);
      localStorage.setItem("wwm_t91_profiles", JSON.stringify(defaults));
    }
  }, []);

  const saveProfilesList = (list: SavedProfile[]) => {
    setProfiles(list);
    localStorage.setItem("wwm_t91_profiles", JSON.stringify(list));
  };

  // Compute Inner Ways bonuses
  const iwStats = useMemo(() => {
    const bonus = {
      outerPen: 0,
      pzPen: 0,
      critDmg: 0,
      affDmg: 0,
      outerDmg: 0,
      generalDmg: 0,
      pzDmg: 0,
      crit: 0,
      aff: 0,
      dcrit: 0,
    };
    selectedInnerWays.forEach((id) => {
      const iw = INNER_WAYS.find((item) => item.id === id);
      if (iw) {
        const tierNum = innerWayTiers[id] ?? 5;
        const activeTierObj = iw.tiers.find(t => t.tier === tierNum);
        if (activeTierObj && activeTierObj.stat) {
          const s = activeTierObj.stat;
          if (s.outerPen) bonus.outerPen += s.outerPen;
          if (s.pzPen) bonus.pzPen += s.pzPen;
          if (s.critDmg) bonus.critDmg += s.critDmg;
          if (s.affDmg) bonus.affDmg += s.affDmg;
          if (s.outerDmg) bonus.outerDmg += s.outerDmg;
          if (s.generalDmg) bonus.generalDmg += s.generalDmg;
          if (s.pzDmg) bonus.pzDmg += s.pzDmg;
          if (s.crit) bonus.crit += s.crit;
          if (s.aff) bonus.aff += s.aff;
          if (s.dcrit) bonus.dcrit += s.dcrit;
        }
      }
    });
    return bonus;
  }, [selectedInnerWays, innerWayTiers]);

  // 2. Compute Adjusted Panel Stats (applying passive buffs dynamically)
  const adjustedPanel = useMemo((): PanelStats => {
    let p = { ...panel };

    // Apply Bow stats
    if (bowSelect === "crit") p.crit += 7.0;
    if (bowSelect === "prec") p.prec += 6.1;
    if (bowSelect === "aff") p.aff += 3.5;

    // Apply food buff
    if (food) {
      p.minOuter += activeTier.foodMin;
      p.maxOuter += activeTier.foodMax;
    }

    // Apply Sub-50% HP passive buff
    if (script50) {
      p.dcrit += 15.0;
    }

    // Season early bonus
    if (earlySeason) {
      p.minOuter += 4.4;
      p.maxOuter += 27.2;
    }

    // Apply Inner Ways direct stat offsets
    p.outerPen += iwStats.outerPen;
    p.pzPen += iwStats.pzPen;
    p.critDmg += iwStats.critDmg;
    p.affDmg += iwStats.affDmg;
    p.outerDmg += iwStats.outerDmg;
    p.pzDmg += iwStats.pzDmg;
    p.crit += iwStats.crit;
    p.aff += iwStats.aff;
    p.dcrit += iwStats.dcrit;

    // Store raw innerway factors so they pass to formula
    p.iwGeneralDmg = iwStats.generalDmg;
    p.iwOuterPen = iwStats.outerPen;
    p.iwPzPen = iwStats.pzPen;
    p.iwPzDmg = iwStats.pzDmg;

    // Apply Armor Set 2pc flat/percentage stat bonuses
    const activeSet = ARMOR_SETS[p.set as keyof typeof ARMOR_SETS];
    if (activeSet && activeSet.stat2pc) {
      const s2 = (activeSet as any).stat2pc;
      if (s2.minOuter) p.minOuter += s2.minOuter;
      if (s2.maxOuter) p.maxOuter += s2.maxOuter;
      if (s2.prec) p.prec += s2.prec;
      if (s2.crit) p.crit += s2.crit;
      if (s2.aff) p.aff += s2.aff;
    }

    return p;
  }, [panel, bowSelect, food, script50, earlySeason, activeTier, iwStats]);

  // 3. Compute baseline reference graduation score
  const baselineScore = useMemo(() => {
    return calcBaseline(activeTier);
  }, [activeTier]);

  // 4. Compute Rotation list damage
  const rotationStats = useMemo(() => {
    let totalDmg = 0;
    const items = ROTATION.map((item) => {
      const { perHit, total } = calcSkill(item, adjustedPanel, activeTier, {
        set: adjustedPanel.set,
        datang,
        yishui,
        buildKey: selectedBuild,
      });
      totalDmg += total;
      return {
        ...item,
        perHit,
        total,
      };
    });

    const dps = totalDmg / ROTATION_TIME;
    const gradRate = (totalDmg / baselineScore) * 100;

    return {
      items,
      totalDmg,
      dps,
      gradRate,
    };
  }, [adjustedPanel, activeTier, datang, yishui, baselineScore]);

  // 5. Live Stat Priority: % graduation gain/loss per substat roll, computed against the CURRENT panel
  const statPriorityList = useMemo(() => {
    const STAT_ROLLS: { key: keyof PanelStats; label: string; roll: number; unit: string }[] = [
      { key: "maxOuter", label: "Max Phys ATK", roll: 63.8, unit: "" },
      { key: "minOuter", label: "Min Phys ATK", roll: 26, unit: "" },
      { key: "outerPen", label: "Phys Pen", roll: 9.0, unit: "%" },
      { key: "crit", label: "Crit Rate", roll: 6.5, unit: "%" },
      { key: "critDmg", label: "Crit DMG", roll: 5.0, unit: "%" },
      { key: "aff", label: "Affinity Rate", roll: 4.5, unit: "%" },
      { key: "affDmg", label: "Affinity DMG", roll: 5.0, unit: "%" },
      { key: "prec", label: "Precision", roll: 5.0, unit: "%" },
      { key: "maxPz", label: "Max Bamboocut ATK", roll: 30, unit: "" },
      { key: "pzPen", label: "Bamboocut Pen", roll: 9.0, unit: "%" },
      { key: "dcrit", label: "Direct Crit Rate", roll: 4.6, unit: "%" },
      { key: "umbBonus", label: "Umbrella Bonus", roll: 2.0, unit: "%" },
      { key: "allArts", label: "All Weapon Bonus", roll: 2.0, unit: "%" },
      { key: "bossDmg", label: "Boss DMG", roll: 2.0, unit: "%" },
      { key: "outerDmg", label: "Phys DMG", roll: 2.0, unit: "%" },
    ];

    const gradFor = (p: PanelStats) => {
      let total = 0;
      ROTATION.forEach((item) => {
        const { total: dmg } = calcSkill(item, p, activeTier, {
          set: p.set || adjustedPanel.set,
          datang,
          yishui,
          buildKey: selectedBuild,
        });
        total += dmg;
      });
      return (total / baselineScore) * 100;
    };

    const baseGrad = rotationStats.gradRate;

    const rows = STAT_ROLLS.map(({ key, label, roll, unit }) => {
      const cur = adjustedPanel[key] as number;
      const pUp = { ...adjustedPanel, [key]: cur + roll };
      const gain = gradFor(pUp) - baseGrad;

      const pDown = { ...adjustedPanel, [key]: Math.max(0, cur - roll) };
      const loss = gradFor(pDown) - baseGrad; // negative or ~zero

      return { key, label, roll, unit, gain, loss };
    });

    return {
      base: baseGrad,
      gains: [...rows].sort((a, b) => b.gain - a.gain),
      losses: [...rows].sort((a, b) => a.loss - b.loss),
    };
  }, [adjustedPanel, activeTier, datang, yishui, selectedBuild, baselineScore, rotationStats.gradRate]);

  // Helper to dynamically calculate stats for any stored profile
  const getDynamicProfileStats = (prof: typeof profiles[0]) => {
    const profPanel = { ...prof.panel };
    profPanel.iwGeneralDmg = iwStats.generalDmg;
    profPanel.iwOuterPen = iwStats.outerPen;
    profPanel.iwPzPen = iwStats.pzPen;
    profPanel.iwPzDmg = iwStats.pzDmg;

    let totalDmg = 0;
    ROTATION.forEach((item) => {
      const { total } = calcSkill(item, profPanel, activeTier, {
        set: profPanel.set || "gold",
        datang,
        yishui,
        buildKey: selectedBuild,
      });
      totalDmg += total;
    });

    const dps = totalDmg / ROTATION_TIME;
    const gradRate = (totalDmg / baselineScore) * 100;

    return {
      dps,
      gradRate
    };
  };


  const statPriorities = useMemo(() => {
    const baseDmg = rotationStats.totalDmg;
    if (baseDmg <= 0) return [];

    // Define increments for testing marginal gains
    const increments = [
      { key: "maxOuter", label: "Physical Atk (Phys Atk)", value: 10, bonusLabel: "+10 Atk", color: "from-amber-600 to-amber-500" },
      { key: "outerPen", label: "Physical Penetration (Phys Pen %)", value: 1.0, bonusLabel: "+1.0%", color: "from-red-600 to-rose-500" },
      { key: "crit", label: "Critical Rate (Crit Rate %)", value: 1.0, bonusLabel: "+1.0%", color: "from-orange-500 to-orange-400" },
      { key: "critDmg", label: "Critical Damage (Crit DMG %)", value: 1.0, bonusLabel: "+1.0%", color: "from-yellow-600 to-yellow-500" },
      { key: "aff", label: "Affinity Rate (Affinity %)", value: 1.0, bonusLabel: "+1.0%", color: "from-indigo-500 to-indigo-400" },
      { key: "maxPz", label: "Bamboocut Atk (Bamboocut Atk)", value: 10, bonusLabel: "+10 Atk", color: "from-emerald-600 to-emerald-500" },
      { key: "pzPen", label: "Bamboocut Penetration (Bamboocut Pen %)", value: 1.0, bonusLabel: "+1.0%", color: "from-teal-500 to-teal-400" },
      { key: "pzDmg", label: "Bamboocut DMG Boost (Bamboocut DMG %)", value: 1.0, bonusLabel: "+1.0%", color: "from-cyan-500 to-cyan-400" },
    ];

    const results = increments.map((inc) => {
      const cloned = { ...adjustedPanel };
      
      if (inc.key === "maxOuter") {
        cloned.maxOuter += inc.value;
        cloned.minOuter += inc.value / 2;
      } else if (inc.key === "maxPz") {
        cloned.maxPz += inc.value;
        cloned.minPz += inc.value / 2;
      } else {
        (cloned as any)[inc.key] += inc.value;
      }

      const newDmg = computeTotalDamage(cloned);
      const gain = Math.max(0, newDmg - baseDmg);
      const gainPerUnit = gain / inc.value;

      return {
        ...inc,
        gain,
        gainPerUnit,
      };
    });

    const maxGain = Math.max(...results.map((r) => r.gainPerUnit));

    return results
      .map((r) => {
        const relative = maxGain > 0 ? (r.gainPerUnit / maxGain) * 100 : 0;
        return {
          ...r,
          relative,
        };
      })
      .sort((a, b) => b.gainPerUnit - a.gainPerUnit);
  }, [adjustedPanel, activeTier, datang, yishui, rotationStats.totalDmg]);

  // Handle OCR fast load
  const handleOcrResult = (scanned: Partial<PanelStats>) => {
    setPanel((prev) => ({
      ...prev,
      ...scanned,
    }));
    setActiveTab("calculator");
  };

  // Synchronizers from Simulators
  const handleSimSync = (scanned: Partial<PanelStats>) => {
    setPanel((prev) => ({
      ...prev,
      ...scanned,
    }));
  };

  const netPhysPen = useMemo(() => {
    return adjustedPanel.outerPen - activeTier.physRes;
  }, [adjustedPanel, activeTier]);

  const netPzPen = useMemo(() => {
    return adjustedPanel.pzPen - activeTier.attrRes;
  }, [adjustedPanel, activeTier]);

  const judgmentFactor = 1 + activeTier.judgeRes;
  const effPrecision = useMemo(() => {
    return Math.min(100, (0.65 + Math.max(0, adjustedPanel.prec - 65) / 100 / judgmentFactor) * 100);
  }, [adjustedPanel, judgmentFactor]);

  const effCritRate = useMemo(() => {
    return Math.min(80, (adjustedPanel.crit / 100 / judgmentFactor + adjustedPanel.dcrit / 100) * 100);
  }, [adjustedPanel, judgmentFactor]);

  const effAffRate = useMemo(() => {
    return Math.min(40, (adjustedPanel.aff / 100 / judgmentFactor + adjustedPanel.daff / 100) * 100);
  }, [adjustedPanel, judgmentFactor]);

  const effectivePrecision = useMemo(() => {
    return Math.min(100, adjustedPanel.prec / judgmentFactor);
  }, [adjustedPanel.prec, judgmentFactor]);

  const effectiveCritical = useMemo(() => {
    return Math.min(80, adjustedPanel.crit / judgmentFactor);
  }, [adjustedPanel.crit, judgmentFactor]);

  const effectiveAffinity = useMemo(() => {
    return Math.min(40, adjustedPanel.aff / judgmentFactor);
  }, [adjustedPanel.aff, judgmentFactor]);

  const effGrazeRate = useMemo(() => {
    return Math.max(0, 100 - effPrecision);
  }, [effPrecision]);

  const expectedMultiplier = useMemo(() => {
    return 1 + (effCritRate / 100) * (adjustedPanel.critDmg / 100) + (effAffRate / 100) * (adjustedPanel.affDmg / 100);
  }, [effCritRate, effAffRate, adjustedPanel]);

  const handleStatChange = (key: keyof PanelStats, val: number | string) => {
    setPanel((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[#ede5ce] font-sans antialiased selection:bg-amber-600/30 selection:text-amber-200">
      {/* Cinematic Header decor */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 shadow-md shadow-amber-500/20" />

      {/* Main Brand Header */}
      <header className="border-b border-amber-900/30 bg-[#14120f] px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono tracking-[0.2em] uppercase text-amber-500/80 border border-amber-500/30 rounded px-2 py-0.5 bg-amber-500/5 font-bold">
              Where Winds Meet · Yan Yun Shi Liu Sheng
            </span>
            <span className="text-[12px] uppercase tracking-wider text-slate-400 font-mono">
              Grade 95 / Gear Tier 91
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100 tracking-tight mt-1 flex items-center gap-2">
            Where Winds Meet <span className="text-amber-500"> Build Calculator</span>
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            {(BUILD_PROFILES as any)[selectedBuild]?.label || "All Paths"} · Global T91 · Lv95
          </p>
        </div>

        {/* Global Graduation Meter Block */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-900 shadow-lg shrink-0">
          <div className="text-right">
            <span className="text-[12px] uppercase font-mono tracking-widest text-[#8a9ea8] font-bold">Graduation Status</span>
            <div className="text-2xl font-black font-serif text-amber-500 mt-0.5 animate-pulse">
              {rotationStats.gradRate.toFixed(1)}%
            </div>
          </div>
          <div className="h-10 w-[1px] bg-slate-800" />
          <div className="text-left">
            <span className="text-[12px] uppercase font-mono tracking-widest text-slate-500 select-none">
              Single-Target DPS
              <span className="text-slate-600 ml-1 cursor-help" title="Single-target sustained DPS over 78.5s rotation vs 1 boss. In-game DPS meter includes AoE &times; mob count, dots, and mystic arts &mdash; typically 5-10x higher.">ⓘ</span>
            </span>
            <div className="text-base font-bold font-serif text-slate-200 mt-1">
              {Math.round(rotationStats.dps).toLocaleString()}/s
            </div>
          </div>
        </div>
      </header>

      {/* Path Selector Row */}
      <div className="bg-[#0a0908] border-b border-amber-900/10 px-3 py-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {Object.entries(BUILD_PROFILES).map(([key, profile]) => {
            const isActive = selectedBuild === key;
            const [w1, w2] = BUILD_WEAPONS[key] || [];
            return (
              <button
                key={key}
                onClick={() => setSelectedBuild(key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                }`}
              >
                {PATH_ICONS[key] && (
                  <img
                    src={PATH_ICONS[key]}
                    alt={(profile as any).label}
                    className="w-6 h-6 object-contain rounded"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <div className="text-left">
                  <div className="text-[12px] font-bold tracking-wide">{(profile as any).label}</div>
                  <div className={`text-[10px] ${isActive ? "text-amber-600" : "text-slate-600"}`}>{(profile as any).tier}</div>
                </div>
                {w1 && w2 && (
                  <div className="flex gap-1 ml-1">
                    <img src={WEAPON_ICONS[w1]} alt="" className="w-4 h-4 object-contain opacity-70"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <img src={WEAPON_ICONS[w2]} alt="" className="w-4 h-4 object-contain opacity-70"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Multi-Character & Multi-Scheme Sticky Bar */}
      <div className="bg-[#14120f] border-b border-amber-900/10 px-6 py-2.5 flex flex-wrap gap-4 items-center justify-between text-sm sticky top-0 z-20 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Character selection & operations */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[12px] uppercase tracking-wider font-semibold">Hero Profile:</span>
            <select
              value={charsData.activeCharId ?? ""}
              onChange={(e) => {
                const headId = e.target.value;
                const char = charsData.chars.find(c => c.id === headId);
                const firstSchemeId = char?.schemes[0]?.id ?? null;
                const newData = { ...charsData, activeCharId: headId, activeSchemeId: firstSchemeId };
                setCharsData(newData);
                localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
              }}
              className="bg-slate-950 border border-slate-800 text-amber-500 rounded px-2.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            >
              {charsData.chars.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              const name = prompt("Enter new character name:");
              if (!name) return;
              const newId = "char-" + Date.now();
              const schemeId = "scheme-" + Date.now();
              const newChar: Character = {
                id: newId,
                name,
                schemes: [
                  {
                    id: schemeId,
                    name: "Scheme 1",
                    panel: panel,
                    gear: DEFAULT_GEAR
                  }
                ]
              };
              const newData: CharsData = {
                ...charsData,
                chars: [...charsData.chars, newChar],
                activeCharId: newId,
                activeSchemeId: schemeId
              };
              setCharsData(newData);
              localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
            }}
            className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded border border-amber-500/20 flex items-center gap-1 transition-colors font-semibold shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> <span>Add Hero</span>
          </button>
          {charsData.chars.length > 1 && (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this hero? This operation cannot be undone.")) {
                  const remaining = charsData.chars.filter(c => c.id !== charsData.activeCharId);
                  const newActiveCharId = remaining[0]?.id ?? null;
                  const newActiveSchemeId = remaining[0]?.schemes[0]?.id ?? null;
                  const newData: CharsData = {
                    chars: remaining,
                    activeCharId: newActiveCharId,
                    activeSchemeId: newActiveSchemeId
                  };
                  setCharsData(newData);
                  localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
                }
              }}
              className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded border border-rose-500/20 flex items-center gap-1 transition-colors"
              title="Delete current character"
            >
              <Trash2 className="w-3.5 h-3.5" /> <span>Del</span>
            </button>
          )}

          {/* Vertical Divider */}
          <div className="w-[1px] h-5 bg-slate-800 mx-1 hidden sm:block" />

          {/* Scheme Tabs inside Character */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-mono text-[12px] uppercase tracking-wider font-semibold">Schemes:</span>
            {activeChar?.schemes.map(s => (
              <div
                key={s.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-all border ${
                  charsData.activeSchemeId === s.id
                    ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/5"
                    : "bg-slate-950/40 text-slate-400 hover:text-slate-200 border-slate-900 hover:border-slate-800"
                }`}
                onClick={() => {
                  const newData = { ...charsData, activeSchemeId: s.id };
                  setCharsData(newData);
                  localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
                }}
              >
                <span>{s.name}</span>
                <span
                  title="Rename Scheme"
                  className="hover:scale-110 active:scale-95 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newName = prompt("Enter new scheme name:", s.name);
                    if (!newName) return;
                    const updatedChars = charsData.chars.map(c => {
                      if (c.id === charsData.activeCharId) {
                        return {
                          ...c,
                          schemes: c.schemes.map(sch => {
                            if (sch.id === s.id) {
                              return { ...sch, name: newName };
                            }
                            return sch;
                          })
                        };
                      }
                      return c;
                    });
                    const newData = { ...charsData, chars: updatedChars };
                    setCharsData(newData);
                    localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
                  }}
                >
                  ✎
                </span>
              </div>
            ))}
            <button
              onClick={() => {
                const name = prompt("Enter new scheme name:");
                if (!name) return;
                const schemeId = "scheme-" + Date.now();
                const newScheme: Scheme = {
                  id: schemeId,
                  name,
                  panel: panel,
                  gear: DEFAULT_GEAR
                };
                const updatedChars = charsData.chars.map(c => {
                  if (c.id === charsData.activeCharId) {
                    return {
                      ...c,
                      schemes: [...c.schemes, newScheme]
                    };
                  }
                  return c;
                });
                const newData = {
                  ...charsData,
                  chars: updatedChars,
                  activeSchemeId: schemeId
                };
                setCharsData(newData);
                localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
              }}
              className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded border border-amber-500/20 flex items-center gap-1 transition-colors font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> <span>Add Scheme</span>
            </button>
          </div>
        </div>

        {/* Data Backup buttons (Export & Import) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(charsData, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `WWM_Builds_Backup_${new Date().toISOString().slice(0,10)}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded flex items-center gap-1.5 transition-colors font-mono text-[12px]"
            title="Download database backup"
          >
            <Download className="w-3 h-3 text-amber-500" /> <span>Export</span>
          </button>
          <label
            className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded flex items-center gap-1.5 cursor-pointer transition-colors font-mono text-[12px]"
            title="Upload/Restore database from file"
          >
            <Upload className="w-3 h-3 text-amber-500" /> <span>Import</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const parsed = JSON.parse(event.target?.result as string);
                    if (parsed.chars && Array.isArray(parsed.chars)) {
                      setCharsData(parsed);
                      localStorage.setItem("wwm_chars_v3", JSON.stringify(parsed));
                      alert("Successfully restored database backup!");
                    } else {
                      alert("Invalid file structure. Make sure you load a valid backup JSON file.");
                    }
                  } catch (err) {
                    alert("Failed to parse JSON file.");
                  }
                };
                reader.readAsText(file);
              }}
            />
          </label>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="bg-[#14120f]/60 px-6 border-b border-amber-900/10 flex items-center justify-between overflow-x-auto scrollbar-none">
        <div className="flex gap-4 min-w-max">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`py-3 text-sm uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "calculator" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ⚔ Calc
            {activeTab === "calculator" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setAnalysisMenuOpen(v => !v)}
              className={`py-3 text-sm uppercase font-bold tracking-wider relative transition-colors flex items-center gap-1 ${
                ["priority", "compare", "cultivate", "simulators", "rot-sim"].includes(activeTab)
                  ? "text-amber-500 font-extrabold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              📊 Analysis ▾
              {["priority", "compare", "cultivate", "simulators", "rot-sim"].includes(activeTab) && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
              )}
            </button>
            {analysisMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setAnalysisMenuOpen(false)} />
                <div className="absolute left-0 top-full mt-1 bg-[#1c1a17] border border-amber-900/30 rounded-lg shadow-xl z-50 py-1 min-w-[170px]">
                  {[
                    { key: "priority", label: "📊 Stat Priority" },
                    { key: "compare", label: "⚖ Item Compare" },
                    { key: "cultivate", label: "🎯 Cultivate" },
                    { key: "simulators", label: "🛠 Gear Sim" },
                    { key: "rot-sim", label: "🔄 Rotation Sim" },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => { setActiveTab(opt.key as any); setAnalysisMenuOpen(false); }}
                      className={`block w-full text-left px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                        activeTab === opt.key ? "text-amber-500 font-bold bg-amber-500/5" : "text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setActiveTab("gear")}
            className={`py-3 text-sm uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "gear" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🛡 Gear
            {activeTab === "gear" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("ocr")}
            className={`py-3 text-sm uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "ocr" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            📸 OCR
            {activeTab === "ocr" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("profiles")}
            className={`py-3 text-sm uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "profiles" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            📁 Gear Sets
            {activeTab === "profiles" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {hasCustomConfig && (
            <button
              onClick={handleClearCustomDefault}
              className="px-2 py-1 text-[12px] font-mono tracking-wider text-rose-400 hover:text-rose-300 border border-rose-900/40 bg-rose-950/10 hover:bg-rose-950/20 rounded transition-colors flex items-center gap-1 shrink-0"
              title="Clear custom default configuration and return to factory settings"
            >
              Clear Default
            </button>
          )}
          <button
            onClick={handleSaveAsDefault}
            className="px-2.5 py-1 text-[12px] font-mono tracking-wider font-bold text-amber-500 hover:text-amber-400 border border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 rounded transition-colors flex items-center gap-1 shrink-0"
            title="Save all current parameters and buffs as your custom default"
          >
            <Database className="w-3 h-3 text-amber-500" /> Save Default
          </button>
          <button
            onClick={handleResetAll}
            className="px-2.5 py-1 text-[12px] font-mono tracking-wider font-bold text-slate-300 hover:text-slate-100 border border-slate-700/60 hover:border-slate-500/80 bg-slate-850/55 hover:bg-slate-800/85 rounded transition-colors flex items-center gap-1 shrink-0"
            title="Reset all settings, buffs and stats to default configuration"
          >
            <RotateCw className="w-3 h-3 text-amber-500 animate-spin-hover" /> Reset All
          </button>
        </div>
      </div>

      <div className="px-6 py-6 max-w-[1900px] mx-auto w-full">
        {activeTab === "calculator" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar Controls (Inputs & Modifiers) - 4 Cols */}
            <div className="lg:col-span-12 flex items-center gap-3 mb-3 p-2 bg-slate-950/40 rounded-lg border border-slate-900">
              {BUILD_WEAPONS[selectedBuild]?.map(weaponKey => (
                <div key={weaponKey} className="flex items-center gap-2">
                  <img
                    src={WEAPON_ICONS[weaponKey]}
                    alt={weaponKey}
                    className="w-8 h-8 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              ))}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-amber-400 font-bold">{(BUILD_PROFILES as any)[selectedBuild]?.label}</div>
                <div className="text-[11px] text-slate-500">{(BUILD_PROFILES as any)[selectedBuild]?.weapons}</div>
              </div>
            </div>

            {/* Equipped Slots Grid — gear overview + %grad contribution + mis-tune flags */}
            <div className="lg:col-span-12 bg-[#141210] border border-amber-900/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-mono font-bold tracking-widest text-amber-500 uppercase flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" /> Equipped Slots
                </span>
                <span className="text-[11px] text-slate-500">
                  %grad = ước tính graduation mất nếu bỏ toàn bộ sub-stat của món này
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {SLOTS.map(slot => {
                  const item = getActiveGear().find(it => it.slot === slot.name);
                  const [bw1, bw2] = BUILD_WEAPONS[selectedBuild] || [];
                  const weaponIconKey = slot.name === "Umbrella" ? bw1 : slot.name === "Rope Dart" ? bw2 : undefined;
                  const slotIconUrl = weaponIconKey ? WEAPON_ICONS[weaponIconKey] : undefined;
                  const setKey = item?.set as keyof typeof ARMOR_SETS | undefined;
                  const badgeGradient = SET_BADGE_COLORS[setKey || "none"] || SET_BADGE_COLORS.none;
                  const SlotIcon = () => {
                    if (slotIconUrl) {
                      return (
                        <img
                          src={slotIconUrl}
                          alt={slot.name}
                          className="w-9 h-9 object-contain mx-auto"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      );
                    }
                    if (item) {
                      // Armor piece: colored badge by armor-set (no verified per-piece CDN icons)
                      return (
                        <div className={`w-9 h-9 mx-auto rounded-lg bg-gradient-to-br ${badgeGradient} flex items-center justify-center shadow-inner shadow-black/30 border border-white/10`}>
                          <span className="text-lg leading-none">{slot.icon}</span>
                        </div>
                      );
                    }
                    return <span className="text-2xl">{slot.icon}</span>;
                  };
                  if (!item) {
                    return (
                      <div key={slot.name} className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center opacity-50">
                        <SlotIcon />
                        <div className="text-[11px] text-slate-500 mt-1">{slot.name}</div>
                        <div className="text-[11px] text-slate-600 mt-1">— empty —</div>
                      </div>
                    );
                  }
                  const priorityStats: string[] = (BUILD_PROFILES as any)[selectedBuild]?.priorityStats || [];
                  const { totalGradDelta, subsWithDeltas } = getGearItemCompareStats(item);
                  const misTuned = subsWithDeltas.filter(s => {
                    const key = SUB_MAP[s.type];
                    return key && !priorityStats.includes(key);
                  });
                  return (
                    <div
                      key={item.id}
                      onClick={() => { setActiveTab("gear"); setSelectedSlot(slot.name); }}
                      className="bg-slate-950/60 border border-slate-900 hover:border-amber-500/40 rounded-lg p-2 cursor-pointer transition-colors"
                      title={item.name}
                    >
                      <div className="flex items-center justify-between">
                        <SlotIcon />
                        {misTuned.length > 0 && (
                          <span className="text-[11px]" title={`${misTuned.length} sub-stat ít/không có giá trị cho ${(BUILD_PROFILES as any)[selectedBuild]?.label}: ${misTuned.map(s => s.type).join(", ")}`}>⚠️</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium truncate mt-1">{item.name}</div>
                      <div className="text-[10.5px] text-slate-500 truncate">{ARMOR_SETS[item.set as keyof typeof ARMOR_SETS]?.name || item.set}</div>
                      <div className={`text-[12px] font-mono font-bold mt-1 ${totalGradDelta >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {totalGradDelta >= 0 ? "+" : ""}{totalGradDelta.toFixed(2)}% grad
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#141210] border border-amber-900/10 rounded-xl p-5 space-y-6">
              {/* Build Path Dropdown */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 space-y-3 shadow-md">
                <span className="text-[12px] font-mono font-bold tracking-widest text-amber-500 uppercase flex items-center gap-1.5 border-b border-amber-950/40 pb-1.5">
                  <span className="text-base">⚔️</span> Build Path Selection
                </span>
                <div>
                  <select
                    value={selectedBuild}
                    onChange={e => setSelectedBuild(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-amber-400 rounded px-2.5 py-2 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  >
                    {Object.entries(BUILD_PROFILES).map(([key, b]) => (
                      <option key={key} value={key}>{b.label} [{b.tier}]</option>
                    ))}
                  </select>
                </div>
                {/* Build info box */}
                {(() => {
                  const b = BUILD_PROFILES[selectedBuild as keyof typeof BUILD_PROFILES];
                  if (!b) return null;
                  return (
                    <div className="bg-slate-950/60 rounded p-2.5 border border-slate-900 text-[13px] space-y-1.5 text-slate-300 antialiased">
                      <div className="flex justify-between text-slate-400">
                        <span>Weapons:</span>
                        <span className="text-amber-500 font-medium text-right text-[12px]">{b.weapons}</span>
                      </div>
                      <div className="font-mono text-[12px] text-slate-400 border-t border-slate-900/60 pt-1.5">
                        <span className="text-slate-500 block">Graduation Targets:</span>
                        <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-1">
                          <div>Max PA: <span className="text-slate-200">{b.gradTargets.maxOuter}</span></div>
                          <div>Min PA: <span className="text-slate-200">{b.gradTargets.minOuter}</span></div>
                          <div>Pen: <span className="text-slate-200">{b.gradTargets.outerPen}%</span></div>
                          <div>Crit: <span className="text-slate-200">{b.gradTargets.crit}%</span></div>
                        </div>
                      </div>
                      <div className="text-slate-400 border-t border-slate-900/60 pt-1.5 leading-relaxed text-[12.5px]">
                        <span className="text-amber-500/90 font-bold">Strategy:</span> {b.notes}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Armor Set Selector */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 space-y-3 shadow-md">
                <span className="text-[12px] font-mono font-bold tracking-widest text-[#a19683] uppercase flex items-center gap-1.5 border-b border-amber-950/40 pb-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" /> Active Armor Set Selector
                </span>
                <div>
                  <select
                    value={panel.set}
                    onChange={e => handleStatChange("set", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-amber-100 rounded px-2.5 py-2 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  >
                    {Object.entries(ARMOR_SETS).map(([key, s]) => (
                      <option key={key} value={key}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Armor Set details & badges */}
                {(() => {
                  const s = ARMOR_SETS[panel.set as keyof typeof ARMOR_SETS];
                  if (!s) return null;
                  const isRecommended = s.recommended && s.recommended.includes(selectedBuild);
                  const isMismatched = panel.set !== "none" && !isRecommended;
                  
                  return (
                    <div className="bg-slate-950/60 rounded p-2.5 border border-slate-900 text-[13px] space-y-2 text-slate-300">
                      <div className="flex flex-wrap gap-1">
                        {isRecommended && (
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-900/40">
                            ✓ Recommended Set
                          </span>
                        )}
                        {isMismatched && (
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-505 text-amber-400 font-bold border border-amber-900/40">
                            ⚠ Mismatched Set
                          </span>
                        )}
                        {panel.set === "none" && (
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-bold border border-slate-850">
                            No active bonus
                          </span>
                        )}
                      </div>
                      
                      {panel.set !== "none" && (
                        <div className="font-sans text-[13px] space-y-1.5 text-slate-400 border-t border-slate-900/60 pt-1.5 leading-normal">
                          <div>
                            <span className="text-amber-500 font-bold">2pc:</span> {s.desc2pc || "—"}
                          </div>
                          <div>
                            <span className="text-amber-500 font-bold">4pc:</span> {s.desc4pc || "—"}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Gear-Driven Panel Toggle */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 space-y-2 shadow-md">
                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span className="text-[12px] font-mono font-bold tracking-widest text-[#a19683] uppercase flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-500" /> Auto Panel From Gear
                  </span>
                  <input
                    type="checkbox"
                    checked={autoGearPanel}
                    onChange={(e) => setAutoGearPanel(e.target.checked)}
                    className="w-4 h-4 accent-amber-500"
                  />
                </label>
                <p className="text-[11.5px] text-slate-500 leading-snug">
                  {autoGearPanel
                    ? "ON — Min/Max Phys Atk, Pen, Crit, Affinity, Bamboocut Atk, etc. are computed from your 8 equipped items in the Gear tab. Edit gear there to change these stats."
                    : "OFF — all stats below are entered manually and will not update when you change gear."}
                </p>
              </div>

              {/* Custom Rotation & DPS */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 space-y-3 shadow-md">
                <button
                  type="button"
                  onClick={() => setIsCustomRotationOpen(!isCustomRotationOpen)}
                  className="w-full flex justify-between items-center text-[12.5px] font-mono font-bold tracking-widest text-[#a19683] uppercase border-b border-amber-950/40 pb-1.5 focus:outline-none"
                >
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Custom Rotation & DPS
                  </span>
                  <span className="text-amber-500">{isCustomRotationOpen ? "▲ Hide" : "▼ Show"}</span>
                </button>
                
                {isCustomRotationOpen && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-slate-500 mb-1">
                        Active Skill Rotation String:
                      </label>
                      <textarea
                        value={customRotationText}
                        onChange={(e) => setCustomRotationText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                        rows={2}
                        placeholder="Rope Dart R×3 →..."
                      />
                    </div>
                    
                    <div className="bg-slate-950/60 rounded p-2.5 border border-slate-900 text-[12.5px] text-slate-400 space-y-1.5 antialiased">
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Est. Speedrun DPS:</span>
                        <span className="font-mono text-sm text-amber-400 font-extrabold">
                          {(rotationStats.dps * 0.96).toFixed(0)} ~ {(rotationStats.dps * 1.04).toFixed(0)}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-500 leading-snug">
                        💡 <strong>Calculates a rough DPS expectation; actual raid DPS will vary based on boss movement, mechanics, and lag.</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Reset/Save Default Quick Group */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono font-bold tracking-widest text-[#a19683] uppercase flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" /> Default Setup
                  </span>
                  {hasCustomConfig && (
                    <span className="text-[11px] bg-emerald-950 text-emerald-400 font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-900/40 animate-pulse">
                      Custom Default Active
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center">
                  <button
                    onClick={handleSaveAsDefault}
                    className="py-1.5 px-2 text-sm font-mono font-bold text-[#ede5ce] bg-amber-900/30 hover:bg-amber-900/50 border border-amber-500/20 rounded transition-all flex items-center justify-center gap-1 hover:text-amber-300 shadow-sm"
                    title="Save present parameters & buffs as default when loading pages"
                  >
                    <Database className="w-3.5 h-3.5 text-amber-500" /> Save default
                  </button>
                  <button
                    onClick={handleResetAll}
                    className="py-1.5 px-2 text-sm font-mono font-bold text-rose-300 bg-rose-950/20 hover:bg-rose-950/45 border border-rose-950/40 rounded transition-all flex items-center justify-center gap-1 hover:text-rose-200"
                    title="Restore all parameters to baseline database definitions"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-rose-500" /> Reset All
                  </button>
                </div>

                {hasCustomConfig && (
                  <div className="text-center pt-1 block">
                    <button
                      onClick={handleClearCustomDefault}
                      className="text-[12px] font-mono text-slate-500 hover:text-rose-400 transition-colors w-full"
                    >
                      ⚠ Delete Custom Default (Restore Factory Baseline)
                    </button>
                  </div>
                )}
              </div>

              {/* Dungeon selection */}
              <div>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Dungeon Parameters
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-2 rounded-lg border border-slate-900/60">
                    <label className="text-sm text-slate-300 font-medium">Dungeon Level</label>
                    <select
                      value={tierKey}
                      onChange={(e) => setTierKey(e.target.value)}
                      className="bg-slate-900 font-mono border-none text-sm text-amber-500 rounded px-2.5 py-1 text-right focus:outline-none"
                    >
                      <option value="350|0.45">Tier 91 / Lv95 (Global)</option>
                      <option value="307|0.3">Tier 86 / Lv90</option>
                      <option value="405|0.65">Tier 96 / Lv100 (Lower)</option>
                      <option value="405|0.65b">Tier 96 / Lv100 (Upper)</option>
                      <option value="559|1.15">CN Level 105 (Ref)</option>
                      <option value="custom">Custom Params</option>
                    </select>
                  </div>

                  {tierKey === "custom" && (
                    <div className="grid grid-cols-2 gap-2 bg-[#201d18]/40 p-2.5 rounded border border-amber-900/20">
                      <div>
                        <label className="text-[12px] text-slate-400 block mb-1">Defense</label>
                        <input
                          type="number"
                          value={customDef}
                          onChange={(e) => setCustomDef(parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-950 text-slate-200 border border-slate-800 text-sm text-right px-2 py-1 rounded"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] text-slate-400 block mb-1">Judge Resistance</label>
                        <input
                          type="number"
                          step="0.05"
                          value={customRes}
                          onChange={(e) => setCustomRes(parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-950 text-slate-200 border border-slate-800 text-sm text-right px-2 py-1 rounded"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900/40 text-[12px] text-slate-400 font-mono space-y-1.5 leading-relaxed">
                    <div className="flex justify-between">
                      <span>Target Base Defense:</span>
                      <span className="text-amber-500 font-bold">{activeTier.def}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Judgment Res factor:</span>
                      <span className="text-slate-300">×{(1 + activeTier.judgeRes).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attributes block */}
              <div>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Physical attributes
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Min Physical Atk</span>
                    <input
                      type="number"
                      value={panel.minOuter}
                      onChange={(e) => handleStatChange("minOuter", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Max Physical Atk</span>
                    <input
                      type="number"
                      value={panel.maxOuter}
                      onChange={(e) => handleStatChange("maxOuter", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Physical Penetration %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.outerPen}
                      onChange={(e) => handleStatChange("outerPen", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Bamboocut Dust attributes
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Min Bamboocut Atk</span>
                    <input
                      type="number"
                      value={panel.minPz}
                      onChange={(e) => handleStatChange("minPz", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Max Bamboocut Atk</span>
                    <input
                      type="number"
                      value={panel.maxPz}
                      onChange={(e) => handleStatChange("maxPz", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Bamboocut Pen %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.pzPen}
                      onChange={(e) => handleStatChange("pzPen", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Bamboocut DMG Bonus %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.pzDmg}
                      onChange={(e) => handleStatChange("pzDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Hit and Critical Rates
                </h3>
                <div className="space-y-2.5">
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-900/60">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Precision Rate %</span>
                      <input
                        type="number"
                        step="0.1"
                        value={panel.prec}
                        onChange={(e) => handleStatChange("prec", parseFloat(e.target.value) || 0)}
                        className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                      />
                    </div>
                    <div className="text-[11.5px] text-slate-500 mt-1 leading-normal font-sans border-t border-slate-900/40 pt-1">
                      Enter your actual panel value (e.g. 103.7%). Base 65% is not reduced by boss resistance.
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Critical Rate %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.crit}
                      onChange={(e) => handleStatChange("crit", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400 font-medium">Direct Critical Rate %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.dcrit}
                      onChange={(e) => handleStatChange("dcrit", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-emerald-400 focus:outline-none w-16 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Affinity Rate %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.aff}
                      onChange={(e) => handleStatChange("aff", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Damage Multipliers
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Crit DMG Bonus %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.critDmg}
                      onChange={(e) => handleStatChange("critDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Affinity DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.affDmg}
                      onChange={(e) => handleStatChange("affDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Rope Dart DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.ropeBonus}
                      onChange={(e) => handleStatChange("ropeBonus", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Umbrella Action DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.umbBonus}
                      onChange={(e) => handleStatChange("umbBonus", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">All Weapons DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.allArts}
                      onChange={(e) => handleStatChange("allArts", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Boss DMG Boost %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.bossDmg}
                      onChange={(e) => handleStatChange("bossDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-[#201512]/60 p-2 rounded-lg border border-rose-950/40 text-sm">
                    <label>
                      <span className="text-amber-500 font-bold">Attuned Bonus</span>
                      <br/>
                      <span className="text-[11px] text-slate-500">{ATTUNED_BONUS_LABEL[selectedBuild] || "Skill DMG Bonus"}</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.attunedBonus ?? 0}
                      onChange={(e) => handleStatChange("attunedBonus", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-rose-300 focus:outline-none w-16 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-sm">
                    <span className="text-slate-400">Armor Set Selection</span>
                    <select
                      value={panel.set}
                      onChange={(e) => handleStatChange("set", e.target.value)}
                      className="bg-slate-900 border-none text-[13px] text-amber-500 font-medium px-2 py-0.5 rounded focus:outline-none"
                    >
                      {Object.entries(ARMOR_SETS).map(([key, s]) => (
                        <option key={key} value={key}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-[#141210] p-3 rounded-lg border border-slate-900/50 mt-4">
                    <button onClick={() => setFormlessOpen(!formlessOpen)} className="text-amber-500 font-bold text-sm w-full text-left">Advanced / Formless ATK {formlessOpen ? "▼" : "▶"}</button>
                    {formlessOpen && (
                      <div className="mt-3 space-y-2">
                        <div className="fr flex justify-between text-sm">
                          <label className="text-slate-400">Formless Min ATK</label>
                          <input type="number" value={panel.wuxiangMin ?? 0} onChange={(e) => handleStatChange("wuxiangMin", parseFloat(e.target.value) || 0)} className="bg-slate-900 p-1 w-16 text-right rounded" />
                        </div>
                        <div className="fr flex justify-between text-sm">
                          <label className="text-slate-400">Formless Max ATK</label>
                          <input type="number" value={panel.wuxiangMax ?? 0} onChange={(e) => handleStatChange("wuxiangMax", parseFloat(e.target.value) || 0)} className="bg-slate-900 p-1 w-16 text-right rounded" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Passive Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-sm">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chk-food"
                    checked={food}
                    onChange={(e) => setFood(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="chk-food" className="text-slate-300 cursor-pointer">
                    Scaler Food buff (+90 / +180)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chk-yishui"
                    checked={yishui}
                    onChange={(e) => setYishui(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="chk-yishui" className="text-slate-300 cursor-pointer">
                    Song of Yi Buff (+10 Phys Pen)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chk-datang"
                    checked={datang}
                    onChange={(e) => setDatang(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="chk-datang" className="text-slate-300 cursor-pointer text-[13px]">
                    Great Tang Song (Q Umbrella +15% Crit DMG)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chk-script50"
                    checked={script50}
                    onChange={(e) => setScript50(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="chk-script50" className="text-slate-300 cursor-pointer text-[13px]">
                    Sub-50% HP Active Talent (+15% Direct Crit)
                  </label>
                </div>
              </div>

              {/* Inner Ways Database Section */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest flex items-center gap-1 font-serif">
                    <Database className="w-3.5 h-3.5 text-amber-500" /> Active Inner Ways
                  </h3>
                  <span className="text-[12px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-amber-400 font-bold">
                    {selectedInnerWays.length}/4 selected
                  </span>
                </div>
                <p className="text-[12px] text-slate-400 mb-2.5 leading-snug">
                  Select up to 4 Inner Ways matching your active setup to automatically aggregate their dynamic passive bonus attributes:
                </p>

                {/* Filter Selector Row */}
                <input
                  type="text"
                  value={innerWaySearch}
                  onChange={e => setInnerWaySearch(e.target.value)}
                  placeholder="Search inner ways..."
                  className="w-full mb-2 px-2.5 py-1.5 bg-slate-950/60 border border-slate-800 rounded text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-amber-600"
                />
                <div className="flex bg-slate-950 p-0.5 rounded border border-slate-900 mb-3 text-[12px]">
                  <button
                    type="button"
                    onClick={() => setInnerWaysFilter("recommended")}
                    className={`flex-1 py-1 rounded text-center font-semibold transition-all ${
                      innerWaysFilter === "recommended"
                        ? "bg-amber-500 text-slate-950"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Recommended
                  </button>
                  <button
                    type="button"
                    onClick={() => setInnerWaysFilter("all")}
                    className={`flex-1 py-1 rounded text-center font-semibold transition-all ${
                      innerWaysFilter === "all"
                        ? "bg-amber-500 text-slate-950"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    All Inner Ways
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-amber-900/40">
                  {INNER_WAYS.filter((iw) => {
                    if (innerWaySearch) {
                      const q = innerWaySearch.toLowerCase();
                      if (!iw.name.toLowerCase().includes(q) && !iw.desc.toLowerCase().includes(q) && !iw.cat.toLowerCase().includes(q)) return false;
                    }
                    if (innerWaysFilter === "all") return true;
                    // Recommended filter
                    const normalizedCat = iw.cat.toLowerCase();
                    if (normalizedCat === selectedBuild) return true;
                    if (selectedBuild === "bamboocut-dust" && normalizedCat === "bamboocut-wind") return true;
                    if (normalizedCat === "general" && (iw.recommended || iw.id === "seasonal_edge" || iw.id === "morale_chant" || iw.id === "invigorated_warrior")) return true;
                    return false;
                  }).map((iw) => {
                    const CAT_COLORS: Record<string, string> = {
                      "BAMBOOCUT-DUST": "bg-amber-600",
                      "BAMBOOCUT-WIND": "bg-orange-600",
                      "BELLSTRIKE-SPLENDOR": "bg-blue-600",
                      "BELLSTRIKE-UMBRA": "bg-indigo-700",
                      "GENERAL": "bg-slate-600",
                      "SILKBIND-DELUGE": "bg-emerald-700",
                      "SILKBIND-JADE": "bg-teal-600",
                      "STONESPLIT-MIGHT": "bg-stone-600",
                    };
                    const isSelected = selectedInnerWays.includes(iw.id);
                    const disabled = !isSelected && selectedInnerWays.length >= 4;

                    // Compute dynamic Best T91 badge
                    const isBestT91 = iw.recommended || (() => {
                      const build = BUILD_PROFILES[selectedBuild as keyof typeof BUILD_PROFILES];
                      if (!build) return false;
                      const pStats = build.priorityStats;
                      const tierObj = iw.tiers.find(t => t.tier === 5);
                      if (!tierObj || !tierObj.stat) return false;
                      const s = tierObj.stat;
                      if (s.outerPen && pStats.includes("outerPen")) return true;
                      if (s.pzPen && pStats.includes("pzPen")) return true;
                      if (s.critDmg && pStats.includes("critDmg")) return true;
                      if (s.affDmg && pStats.includes("affDmg")) return true;
                      if (s.pzDmg && (pStats.includes("maxPz") || pStats.includes("allArts"))) return true;
                      if (s.generalDmg && (pStats.includes("maxOuter") || pStats.includes("allArts"))) return true;
                      if (s.outerDmg && (pStats.includes("maxOuter") || pStats.includes("allArts"))) return true;
                      return false;
                    })();

                    const iwTierNum = innerWayTiers[iw.id] ?? 5;
                    const activeTierObj = iw.tiers.find(t => t.tier === iwTierNum) || iw.tiers[0];
                    const statStrings = [];
                    if (activeTierObj.stat.outerPen) statStrings.push(`+${activeTierObj.stat.outerPen}% Phys Pen`);
                    if (activeTierObj.stat.pzPen) statStrings.push(`+${activeTierObj.stat.pzPen}% Elem Pen`);
                    if (activeTierObj.stat.critDmg) statStrings.push(`+${activeTierObj.stat.critDmg}% Crit DMG`);
                    if (activeTierObj.stat.affDmg) statStrings.push(`+${activeTierObj.stat.affDmg}% Attr DMG`);
                    if (activeTierObj.stat.outerDmg) statStrings.push(`+${activeTierObj.stat.outerDmg}% Phys DMG`);
                    if (activeTierObj.stat.pzDmg) statStrings.push(`+${activeTierObj.stat.pzDmg}% Bamboocut DMG`);
                    if (activeTierObj.stat.generalDmg) statStrings.push(`+${activeTierObj.stat.generalDmg}% General DMG`);
                    if (activeTierObj.stat.crit) statStrings.push(`+${activeTierObj.stat.crit}% Crit Rate`);
                    if (activeTierObj.stat.aff) statStrings.push(`+${activeTierObj.stat.aff}% Attr Rate`);
                    if (activeTierObj.stat.dcrit) statStrings.push(`+${activeTierObj.stat.dcrit}% Sub-HP Crit`);

                    return (
                      <div
                        key={iw.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedInnerWays(selectedInnerWays.filter((id) => id !== iw.id));
                          } else if (selectedInnerWays.length < 4) {
                            setSelectedInnerWays([...selectedInnerWays, iw.id]);
                          }
                        }}
                        className={`p-2.5 rounded-lg border text-[13px] cursor-pointer transition-all ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-[#ede5ce]"
                            : disabled
                            ? "bg-slate-950/20 border-slate-900/60 opacity-40 cursor-not-allowed"
                            : "bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex justify-between items-center font-semibold mb-1">
                          <span className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${CAT_COLORS[iw.cat] || "bg-slate-700"}`}>
                              {iw.name.charAt(0)}
                            </div>
                            <span>
                              {iw.name}
                              {isSelected && (
                                <span className="text-[12px] text-amber-500 font-mono ml-1">
                                  (T{iwTierNum})
                                </span>
                              )}
                            </span>
                          </span>
                          {isBestT91 && (
                            <span className="text-[10px] bg-red-950/85 text-red-300 font-mono scale-90 px-1 rounded uppercase font-bold tracking-wider">
                              Best T91
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-slate-500 leading-normal mb-1">
                          {iw.desc}
                        </div>
                        {statStrings.length > 0 && (
                          <div className="text-[11.5px] text-amber-400/80 font-mono leading-tight mb-1 bg-slate-900/40 px-1 py-0.5 rounded">
                            {statStrings.join(" | ")}
                          </div>
                        )}
                        {iw.note && isSelected && (
                          <div className="text-[11px] text-[#c9943a] leading-tight font-mono border-t border-amber-900/10 pt-1 mt-1 mb-1">
                            {iw.note}
                          </div>
                        )}
                        {isSelected && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="mt-2 pt-1.5 border-t border-amber-900/10 flex justify-between items-center text-[12px] gap-1"
                          >
                            <span className="text-slate-400 font-medium">Select Level:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5, 6].map((t) => {
                                const isCurrent = (innerWayTiers[iw.id] ?? 5) === t;
                                return (
                                  <button
                                    key={t}
                                    onClick={() => setInnerWayTiers({ ...innerWayTiers, [iw.id]: t })}
                                    className={`px-1 rounded font-mono text-[11px] font-bold ${
                                      isCurrent
                                        ? "bg-amber-500 text-slate-950"
                                        : "bg-slate-900/90 text-slate-400 hover:text-slate-200"
                                    }`}
                                  >
                                    T{t}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>



              {/* Active Scheme Sync Group */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 shadow-md space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-mono font-bold tracking-widest text-[#a19683] uppercase">
                    Active Scheme Sync
                  </span>
                  <span className="text-[12px] text-amber-500 font-bold font-mono">
                    {activeScheme ? activeScheme.name : "None Selected"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (!activeScheme) {
                      alert("Please select or create an active character and scheme first!");
                      return;
                    }
                    const updatedChars = charsData.chars.map(c => {
                      if (c.id === charsData.activeCharId) {
                        return {
                          ...c,
                          schemes: c.schemes.map(s => {
                            if (s.id === charsData.activeSchemeId) {
                              return { ...s, panel: { ...panel } };
                            }
                            return s;
                          })
                        };
                      }
                      return c;
                    });
                    const newData = { ...charsData, chars: updatedChars };
                    setCharsData(newData);
                    localStorage.setItem("wwm_chars_v3", JSON.stringify(newData));
                    alert(`Successfully saved stats & buffs to scheme "${activeScheme.name}"!`);
                  }}
                  className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold rounded-lg text-sm hover:from-amber-500 hover:to-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <Database className="w-3.5 h-3.5" /> 💾 Save to Scheme
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {/* Primary Results Display */}
              <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <span className="text-[11px] font-mono tracking-widest text-[#8a9ea8] uppercase">Season 3 Global</span>
                </div>
                <h2 className="text-sm uppercase tracking-wider font-extrabold text-amber-500 mb-4 flex items-center gap-1.5 font-serif border-b border-amber-900/10 pb-2">
                  <Award className="w-4 h-4 text-amber-400" /> Graduation Damage Analysis
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-5">
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-lg text-center relative">
                    <div className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">Rotation Score damage</div>
                    <div className="text-xl font-bold font-serif text-slate-100 mt-1">
                      {Math.round(rotationStats.totalDmg).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#1b1511]/40 border border-amber-950/40 p-3.5 rounded-lg text-center relative">
                    <div className="text-[11px] font-mono tracking-wider text-amber-400/80 uppercase">Expected Graduation Rate</div>
                    <div className="text-2xl font-black font-serif text-[#c9943a] mt-1">
                      {rotationStats.gradRate.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-lg text-center relative">
                    <div className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">Baseline Target (Same Tier)</div>
                    <div className="text-xl font-bold font-serif text-slate-400 mt-1">
                      {Math.round(baselineScore).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-lg text-center relative flex flex-col justify-center">
                    <div className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">Gap to 100%</div>
                    <div className={`text-xl font-bold font-serif mt-1 ${rotationStats.gradRate >= 100 ? "text-emerald-400" : "text-rose-400"}`}>
                      {rotationStats.gradRate >= 100 ? "✓ Graduated" : `-${(100 - rotationStats.gradRate).toFixed(1)}%`}
                    </div>
                  </div>
                </div>

                {/* Progress bar and metrics */}
                <div className="space-y-2 bg-[#0e0d0b] p-4 rounded-xl border border-amber-900/5">
                  <div className="flex justify-between text-[12px] uppercase font-mono tracking-wider text-slate-400">
                    <span>Under-Geared</span>
                    <span className="text-amber-500 font-semibold font-serif">Recommended Cap (90%)</span>
                    <span>Fully Graduated (100%+)</span>
                  </div>
                  <div className="h-2.5 bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, rotationStats.gradRate)}%` }}
                      className={`h-full transition-all duration-500 ${
                        rotationStats.gradRate >= 95
                          ? "bg-gradient-to-r from-emerald-600 to-green-500"
                          : rotationStats.gradRate >= 80
                          ? "bg-gradient-to-r from-amber-600 to-amber-500 animate-pulse"
                          : "bg-gradient-to-r from-rose-700 to-amber-600"
                      }`}
                    />
                  </div>
                  <p className="text-[12px] text-slate-500 mt-2">
                    💡 DPS shown is single-target sustained (1 boss). Your in-game meter reading (&gt;36k/s) includes AoE hits on multiple mobs, mystic arts, and dots &mdash; this is normal and expected.
                  </p>
                </div>

                {/* Dynamic Advice & Gearing Roadmap */}
                <div className="mt-4 p-4 rounded-lg text-sm leading-relaxed border bg-slate-950/50 border-slate-900 text-slate-300">
                  {(() => {
                    const b = BUILD_PROFILES[selectedBuild as keyof typeof BUILD_PROFILES];
                    if (!b) return null;
                    const tgt = b.gradTargets;
                    const precCapPanel = Math.round(65 + (100-65) * (1 + activeTier.judgeRes)); 
                    const precAdvice = adjustedPanel.prec < precCapPanel 
                      ? `Precision: push to ~${precCapPanel}% panel (need 100% eff)` 
                      : "Precision: capped ✓";

                    return (
                      <>
                        {rotationStats.gradRate >= 100 ? (
                          <div className="space-y-1.5">
                            <strong className="text-emerald-400 flex items-center gap-1 mb-1">
                              <CheckCircle className="w-4 h-4 inline" /> 🏆 Fully Graduated for Tier 91!
                            </strong>
                            <div>
                              Your build exceeds the T91 baseline ({rotationStats.gradRate.toFixed(1)}%). Ready to clear all Season 3 raids.
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <strong className="text-amber-500 flex items-center gap-1 mb-1">📈 {rotationStats.gradRate < 70 ? "Building Phase" : "Road to Graduation"}</strong>
                            <div>{precAdvice}</div>
                            <div>
                              ① Max Phys Atk → {tgt.maxOuter} (now: {Math.round(adjustedPanel.maxOuter)}) ② Phys Pen → {tgt.outerPen.toFixed(1)}% (now: {adjustedPanel.outerPen.toFixed(1)}%) ③ Crit Rate Panel → {tgt.crit.toFixed(1)}% (need 80% eff)
                            </div>
                          </div>
                        )}
                        <div className="mt-2.5 pt-2 border-t border-slate-900 text-[12.5px] text-slate-400 font-mono">
                          <strong className="text-amber-500">Path Strategy:</strong> {b.notes}
                          <div className="text-rose-400 mt-1">⚠️ Precision: The base 65% is not reduced by Judge Resistance. Effective cap = 100%. Panel ~116% achieves this at T91. DO NOT stack above ~116% panel — diminishing returns become zero at cap.</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Hit Zone breakdown block */}
              <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5">
                <h3 className="text-sm uppercase tracking-wider font-extrabold text-amber-500 mb-4 flex items-center gap-1.5 font-serif border-b border-amber-900/10 pb-2">
                  <TrendingUp className="w-4 h-4" /> Calculated Hit Probabilities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-sm">
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase font-mono mt-1 block">Precision (Eff)</span>
                      <strong className="text-slate-100 text-base font-mono mt-1 block">
                        {effPrecision.toFixed(1)}%
                      </strong>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2 leading-snug border-t border-slate-900/40 pt-1.5 font-sans">
                      Base 65% is not reduced by boss resist. Cap = 100%.
                    </div>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[12px]">Critical</span>
                    <strong className="text-slate-100 text-base font-mono mt-1 block">
                      {effCritRate.toFixed(1)}%
                    </strong>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Cap: 80% effective. Need ~116%+ panel at T91 (÷1.45). Direct Crit Rate bypasses resistance.
                    </div>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[12px]">Affinity</span>
                    <strong className="text-slate-100 text-base font-mono mt-1 block">
                      {effAffRate.toFixed(1)}%
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[12px]">Graze</span>
                    <strong className="text-slate-100 text-base font-mono mt-1 block">
                      {effGrazeRate.toFixed(1)}%
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[12px]">Expected Multiplier</span>
                    <strong className="text-slate-100 text-base font-mono mt-1 block text-amber-500">
                      ×{expectedMultiplier.toFixed(3)}
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[12px]">Pen Zone</span>
                    <strong className="text-slate-100 text-base font-mono mt-1 block">
                      {netPhysPen >= 0 ? "+" : ""}
                      {(netPhysPen / 200 * 100).toFixed(1)}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Gemini AI recommendation & optimizing advisor */}


              {/* Rotation breakdown tables */}
              <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5">
                <div className="flex justify-between items-center border-b border-amber-900/10 pb-3 mb-4">
                  <h3 className="text-sm uppercase tracking-wider font-extrabold text-amber-500 flex items-center gap-1.5 font-serif">
                    <Layers className="w-4 h-4" /> Rotation Skill Damage Breakdown
                  </h3>
                  <div className="flex gap-1.5 bg-slate-950 p-1 rounded border border-slate-900 text-[12px]">
                    <button
                      onClick={() => setRotationTab("list")}
                      className={`px-2 py-0.5 rounded ${
                        rotationTab === "list" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"
                      }`}
                    >
                      Full Rotation
                    </button>
                    <button
                      onClick={() => setRotationTab("top")}
                      className={`px-2 py-0.5 rounded ${
                        rotationTab === "top" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"
                      }`}
                    >
                      Top Contributors
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-amber-900/20 text-[#8a9ea8] font-mono text-[12px] uppercase">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Skill name</th>
                        <th className="py-2.5 px-3 text-right">Hits</th>
                        <th className="py-2.5 px-3 text-right">DMG/Hit</th>
                        <th className="py-2.5 px-3 text-right">Total Score</th>
                        <th className="py-2.5 px-3 text-right">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 font-mono text-[13px] text-slate-300">
                      {rotationStats.items
                        .sort((a, b) => (rotationTab === "top" ? b.total - a.total : 0))
                        .map((item, idx) => {
                          const percent = ((item.total / rotationStats.totalDmg) * 100).toFixed(1);
                          return (
                            <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                              <td className="py-2 px-3 text-slate-500">{idx + 1}</td>
                              <td className="py-2 px-3 font-sans font-medium text-slate-200">
                                {item.name}
                              </td>
                              <td className="py-2 px-3 text-right text-slate-400">{item.count}</td>
                              <td className="py-2 px-3 text-right font-bold text-amber-500/80">
                                {Math.round(item.perHit).toLocaleString()}
                              </td>
                              <td className="py-2 px-3 text-right font-extrabold text-amber-500">
                                {Math.round(item.total).toLocaleString()}
                              </td>
                              <td className="py-2 px-3 text-right text-slate-400">{percent}%</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Stat Priority */}
        {activeTab === "priority" && (
          <div className="space-y-6">
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6 shadow-lg">
              <div className="border-b border-amber-900/15 pb-4 mb-5">
                <h2 className="text-lg font-bold font-serif text-slate-100 flex items-center gap-2">
                  <TrendingUp className="text-amber-500 w-5 h-5" /> Stat Priority — Graduation Impact
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Live ranking for <strong className="text-amber-400">{(BUILD_PROFILES as any)[selectedBuild]?.label || "your build"}</strong>, computed from your current panel ({rotationStats.gradRate.toFixed(1)}% graduation). Each row simulates adding/removing <strong>one typical substat roll</strong> on a single sub-stat and shows the resulting change in graduation %.
                </p>
              </div>

              {/* Two-column gain/loss ranking */}
              <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-900 text-sm text-amber-500/95 flex items-center gap-2 mb-4">
                <span className="text-lg">💡</span>
                <span>
                  Calculated against the <strong>Global Tier 91 (Lv95)</strong> boss constants (Defense 350, Judgment Resist ×1.45), using your live panel and active build's rotation.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Gains column */}
                <div>
                  <h3 className="text-[13px] uppercase tracking-wider font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Adding +1 substat roll
                  </h3>
                  <div className="space-y-1.5">
                    {statPriorityList.gains.map((g, idx) => {
                      const maxGain = statPriorityList.gains[0].gain || 1;
                      const width = maxGain > 0 ? Math.max(0, (g.gain / maxGain) * 100) : 0;
                      return (
                        <div key={g.key} className="flex items-center gap-2 text-sm">
                          <span className="w-4 text-slate-600 font-mono text-right text-[12px]">{idx + 1}</span>
                          <span className="w-32 text-slate-300 font-medium truncate">{g.label}</span>
                          <span className="w-12 text-slate-500 font-mono text-right text-[12px]">+{g.roll}{g.unit}</span>
                          <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-emerald-400"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          <span className="w-16 font-mono text-right font-bold text-emerald-400">
                            +{g.gain.toFixed(3)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Losses column */}
                <div>
                  <h3 className="text-[13px] uppercase tracking-wider font-bold text-rose-400 mb-2 flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5" /> Removing 1 substat roll
                  </h3>
                  <div className="space-y-1.5">
                    {statPriorityList.losses.map((g, idx) => {
                      const maxLoss = Math.abs(statPriorityList.losses[0].loss) || 1;
                      const width = maxLoss > 0 ? Math.max(0, (Math.abs(g.loss) / maxLoss) * 100) : 0;
                      return (
                        <div key={g.key} className="flex items-center gap-2 text-sm">
                          <span className="w-4 text-slate-600 font-mono text-right text-[12px]">{idx + 1}</span>
                          <span className="w-32 text-slate-300 font-medium truncate">{g.label}</span>
                          <span className="w-12 text-slate-500 font-mono text-right text-[12px]">-{g.roll}{g.unit}</span>
                          <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-rose-700 to-rose-400"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          <span className="w-16 font-mono text-right font-bold text-rose-400">
                            {g.loss.toFixed(3)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-slate-500 mt-4 italic">
                Note: if a stat is already past its cap (e.g. Precision/Crit/Affinity at 100%/80%/40% effective), adding more shows ~0% gain — that's expected, not a bug. A near-zero loss means you have "slack" on that stat to relay elsewhere.
              </p>
            </div>

            {/* General T91 Priority Rules Guide */}
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-sm uppercase tracking-widest font-extrabold text-amber-500 font-serif border-b border-amber-900/10 pb-2 mb-4">
                General Theorycrafting Guide · T91 Global (http://spongem.com/yysls/)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-300 leading-relaxed">
                <div className="space-y-3">
                  <p>
                    <strong className="text-amber-400">1. Physical Penetration (Phys Pen)</strong>: The most crucial core attribute until reaching the optimal cap in dungeon content (e.g., 51.2% for T91). Every point of Phys Pen below this threshold provides massive exponential damage amplification.
                  </p>
                  <p>
                    <strong className="text-amber-400">2. Critical Rate Cap (80%)</strong>: The absolute maximum Critical Rate in Where Winds Meet is capped at <strong className="text-orange-400">80%</strong>. If your combined character attributes and passive/active buffs push your Crit beyond 80%, the surplus is ignored. Aim for roughly 73% unbuffed so that party buffs safely top you off at the optimal 80% maximum.
                  </p>
                  <p>
                    <strong className="text-amber-400">3. Critical Damage (Crit DMG %)</strong>: Crit DMG works in direct synergy with Crit Rate. Once your critical chance is secure, augmenting critical multipliers scales your total active DPS and Everspring Umbrella execution chain jumps exponentially.
                  </p>
                </div>
                <div className="space-y-3">
                  <p>
                    <strong className="text-amber-400">4. Affinity Rate (Cap 40%) & Bamboocut</strong>: Bamboocut Dust damage scales heavily with your overall break stats. Although Affinity is restricted to an absolute <strong className="text-orange-400">40%</strong> maximum cap in-game, adding Affinity attributes on Tier 91 gears (up to 4.5% per item) remains a powerful build option to convert graze hits into full-powered breaking attacks.
                  </p>
                  <p>
                    <strong className="text-amber-400">5. Substat Relaying (Inherit mechanics)</strong>: When refining Level 91 gear, always prioritize relaying/inheriting attributes that have reached diamond/gold thresholds (such as Phys Pen 9.0%, Max Atk 63.8, Crit 6.5%, etc.). A carefully put-together set can singlehandedly contribute over 40% of your graduation progression.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Gear Stock Manager */}
        {activeTab === "gear" && (
          <div className="space-y-6">
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6">
              {/* TOP BAR */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-amber-900/10 pb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-extrabold text-amber-500 uppercase tracking-wider font-serif flex items-center gap-2">
                      <Shield className="w-4 h-4 ml-0.5 inline-block text-amber-500" /> Gear Stock Inventory
                    </h2>
                    <button
                      onClick={openAddModal}
                      className="md:hidden px-3 py-1.5 bg-amber-500 text-slate-950 rounded font-bold text-sm hover:bg-amber-400 flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Gear
                    </button>
                  </div>
                  <p className="text-[12px] text-slate-505 mb-3">
                    Manage and store alternate gears for the active character scheme.
                  </p>
                  
                  {/* Slot filter tabs (horizontal scrollable) */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { key: "ALL", label: "ALL", icon: "📁" },
                      { key: "Umbrella", label: "UMBRELLA", icon: "☂" },
                      { key: "Rope Dart", label: "ROPE DART", icon: "🪃" },
                      { key: "Pendant", label: "PENDANT", icon: "📿" },
                      { key: "Helmet", label: "HELMET", icon: "⛑" },
                      { key: "Chest", label: "CHEST", icon: "🥋" },
                      { key: "Greaves", label: "GREAVES", icon: "🦿" },
                      { key: "Bracers", label: "BRACERS", icon: "🤺" },
                      { key: "Bow/Ring", label: "BOW/RING", icon: "🏹" }
                    ].map((tab) => {
                      const isSelected = gearFilterSlot === tab.key;
                      const count = tab.key === "ALL" 
                        ? getActiveGear().length 
                        : getActiveGear().filter(it => it.slot === tab.key).length;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => {
                            setGearFilterSlot(tab.key);
                            if (tab.key !== "ALL") {
                              setSelectedSlot(tab.key);
                            }
                          }}
                          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-mono font-bold border transition-all ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10"
                              : "bg-slate-950/40 text-slate-400 hover:text-slate-200 border-slate-900/60"
                          }`}
                        >
                          <span>{tab.icon}</span>
                          <span>{tab.label}</span>
                          {count > 0 && (
                            <span className={`text-[11px] px-1 py-0.2 rounded-full font-mono ${
                              isSelected 
                                ? "bg-slate-950/20 text-slate-950" 
                                : "bg-slate-800 text-slate-400"
                            }`}>
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="hidden md:flex flex-col items-end gap-2.5 shrink-0">
                  <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-amber-500 text-slate-950 rounded font-bold text-sm hover:bg-amber-400 flex items-center gap-1 transition-all shadow-md shadow-amber-500/5 hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" /> Add Gear Item
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-slate-500 uppercase font-mono">Sort:</span>
                    <select
                      value={gearSortBy}
                      onChange={(e) => setGearSortBy(e.target.value as "name" | "mastery")}
                      className="bg-slate-950 border border-slate-900 rounded px-2.5 py-1 text-[12px] font-mono text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    >
                      <option value="name">Alphabetical</option>
                      <option value="mastery">Mastery (⚔ High to Low)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobile Sort Controls */}
              <div className="md:hidden flex items-center justify-between mb-4 bg-slate-950/25 p-2 rounded-lg border border-slate-900">
                <span className="text-[12px] text-slate-400 uppercase font-mono">Sort Items:</span>
                <select
                  value={gearSortBy}
                  onChange={(e) => setGearSortBy(e.target.value as "name" | "mastery")}
                  className="bg-slate-950 border border-slate-900 rounded px-2 py-1 text-[12px] font-mono text-[#ede5ce] focus:outline-none"
                >
                  <option value="name">Alphabetical</option>
                  <option value="mastery">Mastery (⚔ High to Low)</option>
                </select>
              </div>

              {/* TWO COLUMN LAYUT */}
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                
                {/* LEFT SIDE (70%): gear card grid */}
                <div className="lg:col-span-7">
                  {(() => {
                    const allGear = getActiveGear();
                    if (allGear.length === 0) {
                      return (
                        <div className="bg-slate-950/20 border border-dashed border-slate-900/60 p-12 rounded-xl text-center">
                          <p className="text-slate-400 text-sm">No gear in this slot. Add your first item →</p>
                          <button
                            onClick={openAddModal}
                            className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-amber-500 border border-slate-800 rounded font-bold text-sm transition-all"
                          >
                            Create first item
                          </button>
                        </div>
                      );
                    }

                    const renderGearCard = (item: GearItem) => {
                      const isGold = item.quality === "gold";
                      const isPurple = item.quality === "purple";
                      const hasTuned = item.subs.some(sub => sub.isTuned);
                      
                      let qBorder = "border-sky-500/20 hover:border-sky-500/60";
                      let qBgGrad = "from-[#0e121a] to-[#0a0d14]";
                      let labelText = "BLUE";
                      let labelStyle = "bg-sky-500/10 text-sky-400 border border-sky-500/30";
                      
                      if (isGold) {
                        qBorder = "border-[#d48c2a]/20 hover:border-[#d48c2a]/60";
                        qBgGrad = "from-[#1c1510] to-[#120f0c]";
                        labelText = "GOLD";
                        labelStyle = "bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium";
                      } else if (isPurple) {
                        qBorder = "border-[#9d5ce5]/20 hover:border-[#9d5ce5]/60";
                        qBgGrad = "from-[#16121c] to-[#100d14]";
                        labelText = "PURPLE";
                        labelStyle = "bg-purple-500/10 text-purple-400 border border-purple-500/20";
                      }

                      const slotObj = SLOTS.find(s => s.name === item.slot);
                      const slotIcon = slotObj?.icon || "🥋";
                      const gradContribution = getGearItemCompareStats(item).totalGradDelta;

                      return (
                        <div
                          key={item.id}
                          onClick={() => openEditModal(item)}
                          className={`group relative p-4 rounded-xl border bg-gradient-to-b ${qBgGrad} ${qBorder} cursor-pointer hover:scale-[1.01] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between`}
                        >
                          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                            {hasTuned && (
                              <span className="text-amber-500 font-bold text-sm animate-pulse" title="Tuned substat inside">✦</span>
                            )}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
                              <Edit className="w-3.5 h-3.5 text-amber-500 hover:text-amber-400" />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-lg bg-slate-950/60 w-8 h-8 rounded-lg flex items-center justify-center border border-slate-900 shrink-0">
                                  {slotIcon}
                                </span>
                                <div className="min-w-0">
                                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors truncate">
                                    {item.name}
                                  </h4>
                                  {item.mastery !== undefined && (
                                    <div className="text-[11px] font-mono font-bold text-amber-500/90 mt-0.5">
                                      ⚔ {item.mastery}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className={`text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded leading-none ${labelStyle}`}>
                                  {labelText}
                                </span>
                                <span
                                  className={`text-[11px] font-mono font-extrabold leading-none ${gradContribution > 0 ? "text-emerald-400" : "text-slate-500"}`}
                                  title="Approximate graduation % this item's substats contribute to your current panel"
                                >
                                  +{gradContribution.toFixed(2)}% grad
                                </span>
                              </div>
                            </div>

                            <div className="text-[12px] text-slate-300 bg-slate-950/60 p-2.5 rounded border border-slate-900 font-mono space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-500">Main Stat:</span>
                                <span className="text-slate-205 font-medium">{item.main || "None"}</span>
                              </div>
                              {item.set && item.set !== "none" && (
                                <div className="flex items-center justify-between border-t border-slate-900/50 pt-1 mt-1">
                                  <span className="text-slate-500">Set Bonus:</span>
                                  <span className="text-[#2ebd85] font-bold flex items-center gap-1">
                                    {SET_EMOJI[item.set] || "🔹"} {ARMOR_SETS[item.set as keyof typeof ARMOR_SETS]?.name || item.set}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="space-y-1.5 border-t border-slate-900/40 pt-2.5">
                              {item.subs.map((sub, sidx) => (
                                <div key={sidx} className="flex items-center justify-between text-[13px] font-mono leading-tight">
                                  <span className="text-slate-505">{sub.type}</span>
                                  <div className="flex items-center gap-1">
                                    <span className={`font-semibold ${sub.isTuned ? "text-amber-400" : "text-slate-300"}`}>
                                      {sub.val}
                                    </span>
                                    {sub.isTuned && (
                                      <span className="text-amber-500 text-[12px] font-extrabold" title="Tuned substat">✦</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    };

                    if (gearFilterSlot !== "ALL") {
                      const slotItems = allGear
                        .filter(it => it.slot === gearFilterSlot)
                        .sort((a, b) => {
                          if (gearSortBy === "mastery") {
                            return (b.mastery ?? 0) - (a.mastery ?? 0);
                          }
                          return a.name.localeCompare(b.name);
                        });

                      if (slotItems.length === 0) {
                        return (
                          <div className="bg-slate-950/20 border border-dashed border-slate-900/60 p-12 rounded-xl text-center">
                            <p className="text-slate-400 text-sm">No gear in this slot. Add your first item →</p>
                            <button
                              onClick={openAddModal}
                              className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-amber-500 border border-slate-800 rounded font-bold text-sm transition-all"
                            >
                              Create first "{gearFilterSlot}" item
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {slotItems.map(item => renderGearCard(item))}
                        </div>
                      );
                    }

                    const slotsWithItems = SLOTS.map(slot => {
                      const items = allGear
                        .filter(it => it.slot === slot.name)
                        .sort((a, b) => {
                          if (gearSortBy === "mastery") {
                            return (b.mastery ?? 0) - (a.mastery ?? 0);
                          }
                          return a.name.localeCompare(b.name);
                        });
                      return { slot, items };
                    }).filter(group => group.items.length > 0);

                    return (
                      <div className="space-y-6">
                        {slotsWithItems.map(({ slot, items }) => (
                          <div key={slot.name} className="space-y-3">
                            <h3 className="text-sm uppercase tracking-wider font-extrabold text-amber-500/80 font-mono border-b border-amber-950/40 pb-1.5 flex items-center gap-2">
                              <span className="text-base">{slot.icon}</span>
                              <span>{slot.name} Section</span>
                              <span className="text-[12px] text-slate-500 font-normal">({items.length} item{items.length > 1 ? "s" : ""})</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                              {items.map(item => renderGearCard(item))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* RIGHT SIDE (30%): live stats sidebar */}
                <div className="lg:col-span-3 lg:sticky lg:top-4 h-fit space-y-4">
                  <div className="bg-[#141210] border border-amber-900/20 rounded-xl p-4 space-y-4">
                    <div className="border-b border-amber-955/40 pb-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base">📊</span>
                        <h3 className="text-sm font-extrabold text-amber-500 tracking-wider font-serif uppercase">
                          Current Panel
                        </h3>
                      </div>
                      <p className="text-[12px] text-slate-400 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-900 inline-block">
                        {selectedBuild} · {activeTier.name}
                      </p>
                    </div>

                    {/* Section 1: Attack Stats */}
                    <div className="space-y-2 border-b border-slate-900 pb-3">
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Physical Attack</span>
                        <span className="text-white font-bold text-right leading-none">
                          {Math.round(adjustedPanel.minOuter)}~{Math.round(adjustedPanel.maxOuter)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Bamboocut Atk</span>
                        <span className="text-slate-350 font-medium text-right leading-none">
                          {Math.round(adjustedPanel.minPz)}~{Math.round(adjustedPanel.maxPz)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Phys Penetration</span>
                        <span className="text-slate-350 font-medium text-right leading-none">
                          {adjustedPanel.outerPen.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Section 2: Critical & Precision Stats */}
                    <div className="space-y-2 border-b border-slate-900 pb-3">
                      {(() => {
                        const precCapPanel = Math.round(65 + (100-65) * (1 + activeTier.judgeRes));
                        const hasPrecCap = adjustedPanel.prec >= precCapPanel;
                        const judgmentFactor = 1 + activeTier.judgeRes;
                        const effectiveCritical = Math.min(80, adjustedPanel.crit / judgmentFactor);
                        const hasCritCap = effectiveCritical >= 80;
                        const effectiveAffinity = Math.min(40, adjustedPanel.aff / judgmentFactor);
                        const hasAffCap = effectiveAffinity >= 40;

                        return (
                          <>
                            <div className="flex items-center justify-between text-sm font-mono">
                              <span className="text-slate-400">Precision</span>
                              <span className={`font-bold text-right leading-none ${hasPrecCap ? "text-amber-500 font-extrabold" : "text-slate-355"}`}>
                                {adjustedPanel.prec.toFixed(1)}% {hasPrecCap && "(Cap)"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-mono">
                              <span className="text-slate-400">Critical Rate</span>
                              <span className={`font-bold text-right leading-none ${hasCritCap ? "text-amber-500 font-extrabold" : "text-slate-355"}`}>
                                {adjustedPanel.crit.toFixed(1)}% {hasCritCap && "(Cap)"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-mono">
                              <span className="text-slate-400">Affinity Rate</span>
                              <span className={`font-bold text-right leading-none ${hasAffCap ? "text-amber-500 font-extrabold" : "text-slate-355"}`}>
                                {adjustedPanel.aff.toFixed(1)}% {hasAffCap && "(Cap)"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-mono">
                              <span className="text-slate-400">Direct Crit</span>
                              <span className="text-slate-355 font-medium text-right leading-none">
                                {adjustedPanel.dcrit.toFixed(1)}%
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Section 3: Damage Modifiers */}
                    <div className="space-y-2 border-b border-slate-900 pb-3">
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Crit DMG Bonus</span>
                        <span className="text-slate-350 font-medium text-right leading-none">{adjustedPanel.critDmg.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Affinity DMG Bonus</span>
                        <span className="text-slate-350 font-medium text-right leading-none">{adjustedPanel.affDmg.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Phys DMG Bonus</span>
                        <span className="text-slate-350 font-medium text-right leading-none">{adjustedPanel.outerDmg.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Boss DMG Bonus</span>
                        <span className="text-slate-350 font-medium text-right leading-none">{adjustedPanel.bossDmg.toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Section 4: Weapon Bonuses */}
                    <div className="space-y-2 border-b border-slate-900 pb-3">
                      <div className={`flex items-center justify-between text-sm font-mono py-1 rounded px-1.5 transition-all ${
                        adjustedPanel.umbBonus > 0 ? "bg-amber-955/25 border border-amber-900/20 text-amber-400 font-bold" : "text-slate-400"
                      }`}>
                        <span>Umbrella Bonus</span>
                        <span className={adjustedPanel.umbBonus > 0 ? "text-amber-400" : "text-slate-350"}>
                          {adjustedPanel.umbBonus.toFixed(1)}%
                        </span>
                      </div>
                      {adjustedPanel.ropeBonus !== undefined && adjustedPanel.ropeBonus > 0 && (
                        <div className="flex items-center justify-between text-sm font-mono py-1 rounded px-1.5 bg-amber-955/25 border border-amber-900/20 text-amber-400 font-bold">
                          <span>Rope Dart Bonus</span>
                          <span className="text-amber-400">
                            {adjustedPanel.ropeBonus.toFixed(1)}%
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm font-mono px-1.5">
                        <span className="text-slate-400">All Weapon Bonus</span>
                        <span className="text-slate-350 leading-none">{adjustedPanel.allArts.toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Section 5: Graduation Status */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-[12px] uppercase tracking-wider font-extrabold text-slate-450 font-serif block">
                        GRADUATION STATUS
                      </span>
                      {(() => {
                        const gradRate = rotationStats.gradRate;
                        
                        const getGraduationColor = (r: number) => {
                          if (r < 50) return { text: "text-red-500", bg: "bg-red-500", glow: "" };
                          if (r < 75) return { text: "text-orange-500", bg: "bg-orange-500", glow: "" };
                          if (r < 90) return { text: "text-amber-500", bg: "bg-amber-500", glow: "" };
                          if (r < 100) return { text: "text-emerald-500", bg: "bg-emerald-500", glow: "" };
                          return { 
                            text: "text-yellow-400 font-black tracking-widest", 
                            bg: "bg-gradient-to-r from-amber-500 to-yellow-400 animate-pulse", 
                            glow: "shadow-[0_0_15px_rgba(251,191,36,0.3)] border border-yellow-400/40" 
                          };
                        };

                        const gc = getGraduationColor(gradRate);
                        
                        const totalBlocks = 10;
                        const filledBlocks = Math.round(Math.min(100, Math.max(0, gradRate)) / 10);
                        const emptyBlocks = 10 - filledBlocks;
                        const filledStr = "█".repeat(filledBlocks);
                        const emptyStr = "░".repeat(emptyBlocks);

                        return (
                          <div className={`bg-[#0c0a09] border border-amber-900/10 p-3.5 rounded-lg space-y-3.5 text-center ${gc.glow}`}>
                            <div className="text-3xl font-black font-serif tracking-tight">
                              <span className={gc.text}>{gradRate.toFixed(1)}%</span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-mono text-slate-300 flex items-center justify-center gap-1.5 leading-none">
                                <span className={gc.text}>[{filledStr}{emptyStr}]</span>
                                <span className="text-slate-400 font-bold">{gradRate.toFixed(1)}/100</span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                Relative to baseline target
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

              </div>

              {/* Relaying Cooldown Tracker Section */}
              <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6 mt-6 shadow-lg">
                <div className="border-b border-amber-900/15 pb-4 mb-5 flex justify-between items-center flex-wrap gap-3">
                  <div>
                    <h3 className="text-base font-bold font-serif text-slate-150 flex items-center gap-2">
                      ⏱ Relaying Cooldown Tracker
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Track the remaining 7-day cooldown of your relayed gear.
                    </p>
                  </div>
                  <button
                    onClick={openCooldownModal}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>+</span> Add Item on Cooldown
                  </button>
                </div>

                {tuneCooldowns.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-sm font-mono">
                    No items currently tracking a relay cooldown.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tuneCooldowns.map((item) => {
                      const elapsed = now - item.createdAt;
                      const remainingMs = item.durationMs - elapsed;
                      const isReady = remainingMs <= 0;
                      
                      const progressPct = isReady ? 100 : Math.min(100, Math.max(0, (elapsed / item.durationMs) * 100));
                      
                      // Format ASCII blocks
                      const totalBlocks = 10;
                      const filledBlocks = Math.round((progressPct / 100) * totalBlocks);
                      const progressStr = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

                      let remainingText = "READY TO RELAY AGAIN";
                      if (!isReady) {
                        const totalHours = Math.max(0, Math.floor(remainingMs / (1000 * 60 * 60)));
                        const days = Math.floor(totalHours / 24);
                        const hours = totalHours % 24;
                        remainingText = `${days}d ${hours}h remaining`;
                      }

                      // Colors
                      let progressFillColor = "bg-rose-500";
                      let textColor = "text-rose-450";
                      if (isReady) {
                        progressFillColor = "bg-emerald-500";
                        textColor = "text-emerald-400";
                      } else if (progressPct >= 40) {
                        progressFillColor = "bg-amber-500";
                        textColor = "text-amber-400";
                      }

                      const dateFormatted = new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });

                      return (
                        <div key={item.id} className="bg-[#181512] border border-amber-900/10 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-1 w-full md:w-auto">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-bold text-base text-slate-200">{item.itemName}</span>
                              <span className="text-[12px] text-slate-500 font-mono font-medium">&#183; {item.slot}</span>
                            </div>
                            <div className="text-sm text-slate-400 font-mono">
                              Relayed: {dateFormatted}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 w-full md:w-auto max-w-md shrink-0 justify-between md:justify-end">
                            <div className="space-y-1 w-48 sm:w-64">
                              <div className="flex justify-between items-baseline text-[12px] font-mono mb-1">
                                <span className={textColor}>[{progressStr}]</span>
                                <span className={`font-bold ${textColor}`}>{remainingText}</span>
                              </div>
                              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-900">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${progressFillColor}`}
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveCooldown(item.id)}
                              className="text-sm text-rose-450 hover:text-rose-400 px-2 py-1 font-semibold hover:bg-rose-950/20 rounded border border-rose-950/30 transition-colors cursor-pointer"
                            >
                              ✕ Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Tab Item Compare */}
        {activeTab === "compare" && (
          <div className="space-y-6">
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6">
              <div className="mb-4 border-b border-amber-900/10 pb-3">
                <h2 className="text-base font-extrabold text-amber-500 uppercase tracking-wider font-serif flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Item Comparison & Graduation Deltas
                </h2>
                <p className="text-[12px] text-slate-500 mt-0.5">
                  Understand exactly which gears represent the largest marginal upgrade relative to your active panel. Ranked descending by total simulation contribution.
                </p>
              </div>

              {/* 4x2 Grid of Slot Selection Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {SLOTS.map((slot) => {
                  const itemsInSlot = getActiveGear().filter(it => it.slot === slot.name);
                  const hasItems = itemsInSlot.length > 0;
                  const isSelected = selectedSlot === slot.name;
                  
                  return (
                    <button
                      key={slot.name}
                      onClick={() => setSelectedSlot(slot.name)}
                      className={`relative flex items-center gap-2.5 p-3 rounded-lg border transition-all text-left ${
                        isSelected
                          ? "bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-md shadow-amber-500/5"
                          : "bg-slate-950/40 text-slate-400 hover:text-slate-200 border-slate-900/60 hover:border-slate-800"
                      }`}
                    >
                      <span className="text-lg">{slot.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] truncate uppercase tracking-wide font-semibold">{slot.name}</div>
                        {hasItems && (
                          <div className={`text-[11px] mt-0.5 ${isSelected ? "text-slate-900 font-bold" : "text-slate-500"}`}>
                            {itemsInSlot.length} item{itemsInSlot.length > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                      
                      {/* Gold dot indicator if possesses items */}
                      {hasItems && (
                        <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-slate-950" : "bg-amber-500 animate-pulse"}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Comparison list section */}
              <div>
                <h3 className="text-sm uppercase font-bold tracking-widest text-slate-400 font-mono mb-4">
                  Graduation ranking for slot: <span className="text-amber-500 font-serif">{selectedSlot}</span>
                </h3>

                {(() => {
                  const slotItems = getActiveGear().filter(it => it.slot === selectedSlot);
                  if (slotItems.length === 0) {
                    return (
                      <div className="bg-slate-950/20 border border-dashed border-slate-900/60 p-8 rounded-lg text-center font-mono">
                        <p className="text-slate-400 text-sm">No items in this slot to compare.</p>
                        <p className="text-[12px] text-slate-500 mt-1">Go to the "🛡 Gear" tab to add items for comparison.</p>
                      </div>
                    );
                  }
                  
                  const scored = slotItems.map(item => {
                    const stats = getGearItemCompareStats(item);
                    return {
                      item,
                      total: stats.totalGradDelta,
                      subs: stats.subsWithDeltas
                    };
                  });
                  
                  scored.sort((a, b) => b.total - a.total);
                  const bestScore = scored[0].total;
                  
                  return (
                    <div className="space-y-4">
                      {scored.map((entry, rankIdx) => {
                        const rank = rankIdx + 1;
                        const item = entry.item;
                        const isBest = rank === 1;
                        const gapToBest = isBest ? 0 : bestScore - entry.total;
                        const qualityClass = item.quality === "gold" ? "border-amber-500/20 bg-[#1b1510]/80" : item.quality === "purple" ? "border-purple-500/20 bg-[#16121c]/80" : "border-sky-500/20 bg-[#11141a]/80";
                        
                        return (
                          <div
                            key={item.id}
                            className={`p-4 rounded-xl border relative transition-all ${qualityClass}`}
                          >
                            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-sm text-amber-500 font-serif shadow-inner">
                              #{rank}
                            </div>

                            <div className="pl-10">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900/40 pb-2 mb-3">
                                <div>
                                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                                    <span>{item.name}</span>
                                    {isBest && (
                                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider scale-90">
                                        Best Option
                                      </span>
                                    )}
                                  </h4>
                                  <div className="text-[12px] text-slate-500 font-mono mt-0.5">
                                    Main: {item.main}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-mono font-extrabold text-amber-400">
                                    +{entry.total.toFixed(2)}% graduation
                                  </div>
                                  {!isBest && (
                                    <div className="text-[12px] font-mono font-semibold text-rose-400">
                                      -{gapToBest.toFixed(2)}% vs best
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {entry.subs.map((sub, sidx) => {
                                  const subDeltaString = sub.delta > 0 ? `+${sub.delta.toFixed(2)}` : "0.00";
                                  
                                  return (
                                    <div key={sidx} className="bg-slate-950/60 p-2 rounded border border-slate-900/60 flex items-center justify-between font-mono text-[12px]">
                                      <div className="truncate text-slate-500 flex items-center gap-1 shrink md:shrink-0 pr-1">
                                        <span>{sub.type}</span>
                                        {sub.isTuned && <span className="text-amber-500 text-[11px]">✦</span>}
                                      </div>
                                      <div className="text-right shrink-0">
                                        <div className="text-slate-300 font-semibold">{sub.val}</div>
                                        <div className="text-emerald-400 text-[11px] font-bold mt-0.5">
                                          +{subDeltaString}% grad
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Tab Cultivate */}
        {activeTab === "cultivate" && (
          <div className="space-y-6">
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6 shadow-lg">
              <div className="border-b border-amber-900/15 pb-4 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold font-serif text-slate-105 flex items-center gap-2">
                    🎯 Cultivation Summary
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Compare your current accumulated gear substats with the graduation panel targets.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-mono text-slate-400">Select Class:</span>
                  <select
                    value={cultivateClass}
                    onChange={(e) => setCultivateClass(e.target.value)}
                    className="bg-slate-950 border border-amber-900/30 hover:border-amber-500/50 text-amber-500 text-sm rounded-lg px-3 py-1.5 focus:outline-none font-bold transition-all cursor-pointer"
                  >
                    {Object.keys(WWM_DATA.classes).map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats Overview */}
              {(() => {
                const classData = WWM_DATA.classes[cultivateClass as keyof typeof WWM_DATA.classes] || { graduationPanel: {}, marginalGains: [] };
                const graduationPanel = classData.graduationPanel || {};
                const marginalGains = classData.marginalGains || [];

                // helper mapping function
                const getStatConfig = (statName: string, gradPanel: any) => {
                  let gearType = "";
                  let gradKey = "";
                  let isPercentage = false;
                  let fallbackTarget = 100;

                  const nameLower = statName.toLowerCase();
                  if (nameLower.includes("max phys atk") || nameLower === "max physical atk") {
                    gearType = "Max Phys Atk";
                    gradKey = "Max Phys Atk";
                    isPercentage = false;
                  } else if (nameLower.includes("min phys atk") || nameLower === "min physical atk") {
                    gearType = "Min Phys Atk";
                    gradKey = "Min Phys Atk";
                    isPercentage = false;
                  } else if (nameLower.includes("phys pen") || nameLower === "physical penetration") {
                    gearType = "Phys Pen";
                    gradKey = "Phys Pen";
                    isPercentage = true;
                  } else if (nameLower.includes("crit rate") || nameLower === "critical rate") {
                    gearType = "Crit Rate";
                    gradKey = "Crit Rate";
                    isPercentage = true;
                  } else if (nameLower.includes("crit dmg") || nameLower === "critical damage") {
                    gearType = "Crit DMG";
                    gradKey = "Crit DMG";
                    isPercentage = true;
                  } else if (nameLower.includes("affinity rate")) {
                    gearType = "Affinity Rate";
                    gradKey = "Affinity Rate";
                    isPercentage = true;
                  } else if (nameLower.includes("affinity dmg")) {
                    gearType = "Affinity DMG";
                    gradKey = "Affinity DMG";
                    isPercentage = true;
                  } else if (nameLower.includes("precision")) {
                    gearType = "Precision";
                    gradKey = "Precision";
                    isPercentage = true;
                  } else if (nameLower.includes("max bamboocut")) {
                    gearType = "Max Bamboocut Atk";
                    gradKey = "Max Bamboocut";
                    isPercentage = false;
                  } else if (nameLower.includes("min bamboocut")) {
                    gearType = "Min Bamboocut Atk";
                    gradKey = "Min Bamboocut";
                    isPercentage = false;
                  } else if (nameLower.includes("bamboocut pen")) {
                    gearType = "Attr Pen";
                    gradKey = "Bamboocut Pen";
                    isPercentage = true;
                  } else if (nameLower.includes("own weapon bonus")) {
                    gearType = "Umbrella Bonus";
                    gradKey = "Own Weapon Bonus";
                    isPercentage = true;
                    fallbackTarget = 32.0;
                  } else if (nameLower.includes("all weapon")) {
                    gearType = "All Weapon";
                    gradKey = "All Weapon Bonus";
                    isPercentage = true;
                    fallbackTarget = 16.0;
                  } else if (nameLower.includes("boss dmg")) {
                    gearType = "Boss DMG%";
                    gradKey = "Boss DMG Bonus";
                    isPercentage = true;
                    fallbackTarget = 12.0;
                  } else if (nameLower.includes("strength")) {
                    gearType = "Strength";
                    gradKey = "Strength";
                    isPercentage = false;
                    fallbackTarget = 120;
                  } else if (nameLower.includes("power")) {
                    gearType = "Power";
                    gradKey = "Power";
                    isPercentage = false;
                    fallbackTarget = 120;
                  } else if (nameLower.includes("agility")) {
                    gearType = "Agility";
                    gradKey = "Agility";
                    isPercentage = false;
                    fallbackTarget = 120;
                  } else if (nameLower.includes("phys dmg")) {
                    gearType = "Phys DMG%";
                    gradKey = "Phys DMG Up";
                    isPercentage = true;
                    fallbackTarget = 15;
                  }

                  let rawTarget = 0;
                  if (gradKey && gradPanel && gradPanel[gradKey] !== undefined) {
                    rawTarget = gradPanel[gradKey];
                    if (isPercentage && rawTarget <= 2.0 && rawTarget > 0) {
                      rawTarget = rawTarget * 100;
                    }
                  } else {
                    rawTarget = fallbackTarget;
                  }

                  const scaledTarget = rawTarget * 0.606;

                  return {
                    gearType,
                    gradKey,
                    isPercentage,
                    scaledTarget
                  };
                };

                // get active gear items
                const activeGear = getActiveGear();

                // Compute summed substats per gearType
                const currentSubsSum: Record<string, number> = {};
                activeGear.forEach((gear) => {
                  gear.subs.forEach((sub) => {
                    const type = sub.type;
                    const valNum = parseFloat(sub.val.replace(/[^\d.]/g, "")) || 0;
                    currentSubsSum[type] = (currentSubsSum[type] || 0) + valNum;
                  });
                });

                // Prepare stat tiles based on marginalGains
                const tiles = marginalGains.map((gain: any) => {
                  const label = gain.stat;
                  const config = getStatConfig(label, graduationPanel);
                  
                  let currentVal = 0;
                  if (label.toLowerCase().includes("own weapon")) {
                    currentVal = (currentSubsSum["Umbrella Bonus"] || 0) + (currentSubsSum["Rope Dart Bonus"] || 0);
                  } else if (label.toLowerCase().includes("all weapon")) {
                    currentVal = currentSubsSum["All Weapon"] || 0;
                  } else if (label.toLowerCase().includes("boss dmg")) {
                    currentVal = currentSubsSum["Boss DMG%"] || 0;
                  } else if (label.toLowerCase().includes("bamboocut pen")) {
                    currentVal = currentSubsSum["Attr Pen"] || 0;
                  } else if (label.toLowerCase().includes("phys dmg")) {
                    currentVal = currentSubsSum["Phys DMG%"] || 0;
                  } else if (label.toLowerCase().includes("strength")) {
                    currentVal = currentSubsSum["Strength"] || 0;
                  } else if (label.toLowerCase().includes("power")) {
                    currentVal = currentSubsSum["Power"] || 0;
                  } else if (label.toLowerCase().includes("agility")) {
                    currentVal = currentSubsSum["Agility"] || 0;
                  } else {
                    currentVal = currentSubsSum[config.gearType] || 0;
                  }

                  const targetVal = config.scaledTarget;
                  const progressPct = targetVal > 0 ? (currentVal / targetVal) * 100 : 0;
                  const progressCapped = Math.min(progressPct, 100);

                  // Colors: >= 80% filled is Green, 40-79% is Amber, < 40% is Red
                  let bgCardClass = "bg-[#1f1915]/40 border-rose-950/40 text-rose-450";
                  let progressFillColor = "bg-rose-500";
                  if (progressPct >= 80) {
                    bgCardClass = "bg-[#141c16]/40 border-emerald-950/30 text-emerald-400";
                    progressFillColor = "bg-emerald-500";
                  } else if (progressPct >= 40) {
                    bgCardClass = "bg-[#1e1a12]/40 border-amber-950/30 text-amber-500";
                    progressFillColor = "bg-amber-500";
                  }

                  return {
                    label,
                    gearType: config.gearType,
                    currentVal,
                    targetVal,
                    progressPct,
                    progressCapped,
                    bgCardClass,
                    progressFillColor,
                    isPercentage: config.isPercentage
                  };
                });

                // Calculate total progress: Average progress capped at 100%, scaled to 40
                const totalProgressSum = tiles.reduce((acc: number, t: any) => acc + t.progressCapped, 0);
                const averageProgressPct = tiles.length > 0 ? totalProgressSum / tiles.length : 0;
                const totalProgressVal = (averageProgressPct / 100) * 40;

                // Dingyin counts
                let totalSubsCount = 0;
                let tunedSubsCount = 0;
                activeGear.forEach((gear) => {
                  gear.subs.forEach((sub) => {
                    totalSubsCount++;
                    if (sub.isTuned) {
                      tunedSubsCount++;
                    }
                  });
                });
                const dingyinPct = totalSubsCount > 0 ? (tunedSubsCount / totalSubsCount) * 100 : 0;

                return (
                  <div className="space-y-6">
                    {/* Header Summary Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#181512] border border-amber-900/10 rounded-xl p-5 flex flex-col justify-center">
                        <span className="text-sm font-mono uppercase tracking-wider text-slate-500">
                          Total sub-stat progress
                        </span>
                        <div className="text-3xl font-extrabold text-amber-500 font-serif mt-1 flex items-baseline gap-1.5">
                          <span>{totalProgressVal.toFixed(1)}</span>
                          <span className="text-base font-sans font-normal text-slate-500">/ 40</span>
                        </div>
                      </div>
                      <div className="bg-[#181512] border border-amber-900/10 rounded-xl p-5 flex flex-col justify-center">
                        <span className="text-sm font-mono uppercase tracking-wider text-slate-500">
                          Dingyin (Tuned) stats
                        </span>
                        <div className="text-3xl font-extrabold text-amber-500 font-serif mt-1">
                          {dingyinPct.toFixed(1)}<span className="text-lg font-sans font-normal text-slate-500">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Grid of Stat Tiles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tiles.map((tile: any, idx: number) => {
                        return (
                          <div 
                            key={idx} 
                            className={`border rounded-xl p-5 space-y-3 transition-colors ${tile.bgCardClass}`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-base font-bold font-mono tracking-tight text-slate-100">
                                {tile.label}
                              </span>
                              <span className="text-[12px] uppercase tracking-wider text-slate-500 font-mono">
                                T91 Cap
                              </span>
                            </div>

                            <div className="flex justify-between items-baseline font-mono text-base">
                              <span className="text-slate-250 font-bold">
                                {tile.currentVal.toFixed(tile.isPercentage ? 1 : 0)}{tile.isPercentage ? "%" : ""}
                              </span>
                              <span className="text-slate-500 font-medium">
                                / {tile.targetVal.toFixed(tile.isPercentage ? 1 : 0)}{tile.isPercentage ? "%" : ""}
                              </span>
                            </div>

                            <div className="space-y-1.5 pt-1">
                              <div className="w-full bg-slate-950/60 rounded-full h-2.5 overflow-hidden border border-slate-900">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${tile.progressFillColor}`}
                                  style={{ width: `${tile.progressCapped}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-[13px] font-mono text-slate-400">
                                <span>Progress</span>
                                <span className="font-bold">{tile.progressPct.toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Note at bottom */}
                    <div className="bg-[#141210]/30 border border-slate-900/40 rounded-xl p-4 text-sm text-slate-400 leading-relaxed font-mono">
                      Progress estimates based on Graduation Panel targets (CN Lv105).
                      Tier 91 caps are ~60% of shown values.
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Modal Editor Overlay */}
        {isItemModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-[#141210] border border-amber-900/20 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-4 bg-slate-950/60 border-b border-amber-900/10 flex justify-between items-center shrink-0">
                <span className="text-sm font-bold uppercase tracking-wider text-amber-500 font-serif">
                  {editingItem ? "Edit Gear Item" : `Add New Class ${selectedSlot}`}
                </span>
                <button
                  onClick={() => setIsItemModalOpen(false)}
                  className="text-slate-400 hover:text-slate-200 text-base font-mono"
                >
                  ✕
                </button>
              </div>

              {/* Form Content */}
              <div className="p-5 space-y-4 overflow-y-auto min-h-0 text-slate-300 text-sm text-left">
                <div>
                  <label className="block text-[12px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                    Slot
                  </label>
                  <input
                    type="text"
                    value={selectedSlot}
                    disabled
                    className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-1.5 font-mono text-slate-400 cursor-not-allowed text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Divine Sky Ring"
                      className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                      Quality
                    </label>
                    <select
                      value={formQuality}
                      onChange={(e) => setFormQuality(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-650"
                    >
                      <option value="gold">Gold (Legendary)</option>
                      <option value="purple">Purple (Epic)</option>
                      <option value="blue">Blue (Rare)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[12px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                      Main Stat Text
                    </label>
                    <input
                      type="text"
                      value={formMain}
                      onChange={(e) => setFormMain(e.target.value)}
                      placeholder="e.g. Phys Atk 48~112"
                      className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                      Set Selection
                    </label>
                    <select
                      value={formSet}
                      onChange={(e) => setFormSet(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-650"
                    >
                      <option value="none">None</option>
                      <option value="stars">Stars Align (2/2)</option>
                      <option value="eaglerise">Eaglerise (3/3)</option>
                      <option value="pursuing">Pursuing Shadow (2/2)</option>
                      <option value="stormrain">Stormrain (4/4)</option>
                      <option value="shakenhill">Shakenhill (2/2)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                      Mastery (optional)
                    </label>
                    <input
                      type="number"
                      value={formMastery}
                      onChange={(e) => setFormMastery(e.target.value)}
                      placeholder="e.g. 832"
                      className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Substat Rows */}
                <div className="space-y-2 border-t border-slate-900 pt-3">
                  <span className="text-[12px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                    Sub-stats (Max 6 rows)
                  </span>
                  
                  <div className="space-y-2">
                    {formSubs.map((sub, sidx) => (
                      <div key={sidx} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <select
                            value={sub.type}
                            onChange={(e) => {
                              const updated = [...formSubs];
                              updated[sidx] = { ...updated[sidx], type: e.target.value };
                              setFormSubs(updated);
                            }}
                            className="w-full bg-slate-950 border border-slate-900 rounded p-1.5 text-[13px] text-slate-350 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          >
                            <option value="Other">Choose Substat / Empty</option>
                            {Object.keys(SUB_MAP).map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="col-span-4">
                          <input
                            type="text"
                            value={sub.val}
                            onChange={(e) => {
                              const updated = [...formSubs];
                              updated[sidx] = { ...updated[sidx], val: e.target.value };
                              setFormSubs(updated);
                            }}
                            placeholder="e.g. 59.2 or 7.4%"
                            className="w-full bg-slate-950 border border-slate-900 rounded p-1.5 text-[13px] font-mono placeholder:text-slate-700"
                          />
                        </div>
                        
                        <div className="col-span-2 flex items-center justify-center">
                          <label className="flex items-center gap-1 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={!!sub.isTuned}
                              onChange={(e) => {
                                const updated = [...formSubs];
                                updated[sidx] = { ...updated[sidx], isTuned: e.target.checked };
                                setFormSubs(updated);
                              }}
                              className="accent-amber-500 h-3 w-3"
                            />
                            <span className="text-[12px] font-mono text-amber-500 font-semibold">✦</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-950/60 border-t border-amber-900/10 flex justify-between items-center shrink-0 gap-2">
                <div>
                  {editingItem && (
                    <button
                      onClick={() => handleDeleteItem(editingItem.id)}
                      className="px-3 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 rounded text-sm border border-rose-500/10 font-bold transition-all"
                    >
                      Delete Item
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsItemModalOpen(false)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded text-sm border border-slate-800 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveItem}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-sm font-bold transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Cooldown Add Overlay */}
        {showAddCooldownModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-[#141210] border border-amber-900/20 max-w-md w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              {/* Header */}
              <div className="p-4 bg-slate-950/60 border-b border-amber-900/10 flex justify-between items-center shrink-0">
                <span className="text-sm font-bold uppercase tracking-wider text-amber-500 font-serif flex items-center gap-1.5">
                  ⏱ Track Relay Cooldown
                </span>
                <button
                  onClick={() => setShowAddCooldownModal(false)}
                  className="text-slate-400 hover:text-slate-200 text-base font-mono cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Form Content */}
              <div className="p-5 space-y-4 text-slate-300 text-sm text-left">
                <div className="space-y-1">
                  <label className="text-[12px] text-slate-400 font-mono block">Select Gear Item</label>
                  <select
                    value={cooldownSelectedGearId}
                    onChange={(e) => setCooldownSelectedGearId(e.target.value)}
                    className="w-full bg-slate-950 border border-amber-900/20 text-slate-250 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50 cursor-pointer font-medium"
                  >
                    <option value="">-- Choose Gear --</option>
                    {getActiveGear().map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.slot})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[12px] text-slate-400 font-mono block">Relay Date</label>
                  <input
                    type="date"
                    value={cooldownRelayDate}
                    onChange={(e) => setCooldownRelayDate(e.target.value)}
                    className="w-full bg-slate-950 border border-amber-900/20 text-slate-250 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50 font-mono cursor-pointer"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-950/40 border-t border-amber-900/10 flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => setShowAddCooldownModal(false)}
                  className="px-4 py-1.5 border border-amber-900/20 hover:bg-slate-900 text-slate-300 rounded text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCooldown}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-sm transition-colors cursor-pointer"
                  disabled={!cooldownSelectedGearId}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Simulators (Stat Swap Simulator) */}
        {activeTab === "simulators" && (
          <StatSwapSimulator
            adjustedPanel={adjustedPanel}
            activeTier={activeTier}
            datang={datang}
            yishui={yishui}
            selectedBuild={selectedBuild}
          />
        )}

        {/* Tab OCR Scanner */}
        {activeTab === "ocr" && <OcrScanner onOcrResult={handleOcrResult} />}

        {/* Tab Rotation Simulator */}
        {activeTab === "rot-sim" && (() => {
          const allowedWeapons = CLASS_WEAPONS[rotSimClass] || [];
          const simulatorSkills = WWM_DATA.skills.filter(s => allowedWeapons.includes(s.weapon));

          // 1. Calculate Standard Rotation Details
          let totalSimCurrentDmg = 0;
          const currentSimDetails = simulatorSkills.map(s => {
            const hits = hitsState[s.name] || 0;
            const synthRotationItem = {
              name: s.name,
              count: 1,
              isDingyin: s.name.toLowerCase().includes("resonance") || s.name.toLowerCase().includes("attuned") || s.name.toLowerCase().includes("dingyin"),
              generalBonus: 0.315,
              yishui: 10,
              tiaozhan: 1
            };
            const { perHit } = calcSkill(synthRotationItem as any, adjustedPanel, activeTier, {
              set: adjustedPanel.set || "stars",
              datang,
              yishui,
              buildKey: selectedBuild
            });
            const skillTotal = perHit * hits;
            totalSimCurrentDmg += skillTotal;
            return {
              name: s.name,
              weaponName: s.weapon,
              hits,
              perHit,
              total: skillTotal,
              dps: skillTotal / 60
            };
          });
          const totalSimCurrentDps = totalSimCurrentDmg / 60;

          // 2. Calculate Swapped Weapon Rotation Details
          const swappedPanel = {
            ...adjustedPanel,
            minOuter: swapMinAtk,
            maxOuter: swapMaxAtk
          };
          let totalSimSwappedDmg = 0;
          const scrappedSimDetails = simulatorSkills.map(s => {
            const hits = hitsState[s.name] || 0;
            const synthRotationItem = {
              name: s.name,
              count: 1,
              isDingyin: s.name.toLowerCase().includes("resonance") || s.name.toLowerCase().includes("attuned") || s.name.toLowerCase().includes("dingyin"),
              generalBonus: 0.315,
              yishui: 10,
              tiaozhan: 1
            };
            const { perHit } = calcSkill(synthRotationItem as any, swappedPanel, activeTier, {
              set: swappedPanel.set || "stars",
              datang,
              yishui,
              buildKey: selectedBuild
            });
            const skillTotal = perHit * hits;
            totalSimSwappedDmg += skillTotal;
          });
          const totalSimSwappedDps = totalSimSwappedDmg / 60;
          const swapDpsDiffPct = totalSimCurrentDps > 0 ? ((totalSimSwappedDps - totalSimCurrentDps) / totalSimCurrentDps) * 100 : 0;

          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Side: Inputs, Selection & Core Config */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Selector Block */}
                  <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5 shadow-lg space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-amber-900/10 pb-3">
                      <div>
                        <h3 className="text-base font-bold font-serif text-slate-100 flex items-center gap-2">
                          🔄 Rotation Combat Simulator
                        </h3>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                          Set custom hits parsed in combat to calculate authentic class-specific active DPS.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-450 font-mono">Select Class:</span>
                        <select
                          value={rotSimClass}
                          onChange={(e) => setRotSimClass(e.target.value)}
                          className="bg-slate-950 border border-amber-900/45 text-amber-500 text-sm rounded-md px-3 py-1.5 focus:outline-none font-bold"
                        >
                          {Object.keys(WWM_DATA.classes).map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Calibration Note/Banner */}
                    <div className="bg-amber-950/20 border border-amber-500/20 rounded-lg p-3.5 text-sm text-amber-500/90 leading-relaxed space-y-1">
                      <div className="font-bold flex items-center gap-1">
                        <span>⚠️</span> <span>Calibration & Engine Disclaimer</span>
                      </div>
                      <p className="text-[13px] text-slate-350">
                        Our engine is calibrated against actual Global Tier 91 (approx. 3% total deviation).
                        Discrepancies can occur on Resonance/AoE skills (e.g. Flute Waves) due to stack scaling, multi-hits, and proximity.
                        <strong> We strongly recommend entering hits parsed from actual combat.</strong>
                      </p>
                    </div>

                    {/* Presets / Helper Buttons */}
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                      <span className="text-slate-400 font-mono text-[12px] uppercase">Quick Presets:</span>
                      <button
                        onClick={() => {
                          const updated = { ...hitsState };
                          const HEAVY_PRESETS: Record<string, Record<string, number>> = {
                            "Bamboocut-Dust": {
                              "Scarlet Spin": 78,
                              "Resonance": 75,
                              "Burn and Bury": 4,
                              "Soul Sweep": 3,
                              "Soaring Spin": 6,
                              "Piercing Dart": 7,
                              "Cyclone Waltz": 11
                            },
                            "Bamboocut-Wind": { "Mortal Dart Red Blade (12345345)": 4, "Mortal Dart Red Blade (345)": 4, "Mortal Dart Q (Full Combo)": 8, "Mortal Dart Cross Slash (Heavy)": 6, "Mortal Dart White Blade Light": 10, "Twinblades Light Combo (Full)": 8, "Twinblades Q": 20, "Twinblades Charged": 4 },
                            "Nameless": { "Nameless Sword Q": 10, "Nameless Sword Heavy": 15, "Nameless Sword Charge Lv2": 8, "Nameless Sword Mystic Charge": 5, "Nameless Spear Q": 20, "Nameless Spear Windmill (Fast)": 30, "Nameless Spear Windmill (Finisher)": 8 },
                            "Jade": { "Inkwell Fan Q": 15, "Inkwell Fan Light Charge": 20, "Inkwell Fan Heavy": 15, "Inkwell Fan Heavy Charge Lv2 (Full)": 8, "Vernal Umbrella R": 30, "Vernal Fan Wind Wall": 8, "Vernal Fan Heavy": 10, "Vernal Fan 4x Light Charge": 4 },
                            "Nine-Nine": { "Strategic Sword Q (5 Bleed)": 12, "Strategic Sword Heavy (4 Bleed)": 10, "Bleed Tick (5 Stack)": 60, "Blood Explosion": 8, "Heavenquaker Spear Q (Full 5)": 15, "Heavenquaker Spear Heavy": 10, "Heavenquaker Spear Charge Lv2": 5 },
                            "Rocksplit-Might": { "Thundercry Blade Q (Deathstrike)": 10, "Thundercry Blade Stance Combo": 12, "Thundercry Blade Light Charge": 15, "Thundercry Blade Heavy Derived": 12, "Spirit Clone (Thundercry)": 20, "Stormbreaker Spear Charge": 8, "Stormbreaker Spear Heavy": 10 },
                            "Rocksplit-Jun": { "Snowparting Blade Q (3 Charge, 2 Intent)": 8, "Snowparting Derived (2 Intent)": 8, "Phalanxbane Blade Q (Fast 3 Charge)": 5, "Phalanxbane Quick Q": 8, "Spirit Blade Clone (Lv2)": 16, "Spirit Blade Clone (Lv1)": 8 },
                            "Pure-Healer": { "Panacea Fan Heavy Strike": 20, "Panacea Fan Q": 8, "Panacea Fan Light Charge": 15, "Soulshade Umbrella Q": 15, "Soulshade Off-Field Heal": 30, "Soulshade Light Charge": 10 },
                            "Fire-Fist-Healer": { "Panacea Fan Heavy Strike": 15, "Panacea Fan Q": 10, "Soulshade Umbrella Q": 20, "Soulshade Off-Field Heal": 25, "Soulshade Light Charge": 12 },
                          };
                          const classPreset = HEAVY_PRESETS[rotSimClass] || {};
                          simulatorSkills.forEach(s => { updated[s.name] = classPreset[s.name] ?? 0; });
                          setHitsState(updated);
                        }}
                        className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded text-sm text-slate-350 hover:text-slate-200 transition-colors"
                      >
                        🔥 Heavy Attack Rotation
                      </button>
                      <button
                        onClick={() => {
                          const updated = { ...hitsState };
                          const BALANCED_PRESETS: Record<string, Record<string, number>> = {
                            "Bamboocut-Dust": {
                              "Scarlet Spin": 50,
                              "Resonance": 45,
                              "Burn and Bury": 3,
                              "Soul Sweep": 2,
                              "Soaring Spin": 4,
                              "Piercing Dart": 4,
                              "Cyclone Waltz": 6
                            },
                            "Bamboocut-Wind": { "Mortal Dart Red Blade (12345345)": 3, "Mortal Dart Q (Full Combo)": 6, "Mortal Dart Cross Slash (Heavy)": 4, "Mortal Dart White Blade Light": 8, "Twinblades Light Combo (Full)": 6, "Twinblades Q": 15, "Twinblades Charged": 3 },
                            "Nameless": { "Nameless Sword Q": 8, "Nameless Sword Heavy": 10, "Nameless Sword Charge Lv2": 5, "Nameless Spear Q": 15, "Nameless Spear Windmill (Fast)": 20, "Nameless Spear Windmill (Finisher)": 5 },
                            "Jade": { "Inkwell Fan Q": 12, "Inkwell Fan Light Charge": 15, "Inkwell Fan Heavy": 10, "Vernal Umbrella R": 20, "Vernal Fan Wind Wall": 6, "Vernal Fan Heavy": 8 },
                            "Nine-Nine": { "Strategic Sword Q (5 Bleed)": 8, "Strategic Sword Heavy (4 Bleed)": 8, "Bleed Tick (5 Stack)": 40, "Blood Explosion": 5, "Heavenquaker Spear Q (Full 5)": 10, "Heavenquaker Spear Heavy": 8 },
                            "Rocksplit-Might": { "Thundercry Blade Q (Deathstrike)": 8, "Thundercry Blade Stance Combo": 8, "Thundercry Blade Light Charge": 10, "Spirit Clone (Thundercry)": 15, "Stormbreaker Spear Charge": 6, "Stormbreaker Spear Heavy": 8 },
                            "Rocksplit-Jun": { "Snowparting Blade Q (3 Charge, 2 Intent)": 5, "Snowparting Derived (2 Intent)": 5, "Phalanxbane Blade Q (Fast 3 Charge)": 4, "Phalanxbane Quick Q": 6, "Spirit Blade Clone (Lv2)": 10 },
                            "Pure-Healer": { "Panacea Fan Heavy Strike": 15, "Panacea Fan Q": 6, "Panacea Fan Light Charge": 10, "Soulshade Umbrella Q": 10, "Soulshade Off-Field Heal": 20, "Soulshade Light Charge": 8 },
                            "Fire-Fist-Healer": { "Panacea Fan Heavy Strike": 10, "Panacea Fan Q": 8, "Soulshade Umbrella Q": 15, "Soulshade Off-Field Heal": 18 },
                          };
                          const classPreset = BALANCED_PRESETS[rotSimClass] || {};
                          simulatorSkills.forEach(s => { updated[s.name] = classPreset[s.name] ?? 0; });
                          setHitsState(updated);
                        }}
                        className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded text-sm text-slate-350 hover:text-slate-200 transition-colors"
                      >
                        ⚡ Balanced Rotation
                      </button>
                      <button
                        onClick={() => {
                          const updated = { ...hitsState };
                          WWM_DATA.skills.forEach(s => {
                            updated[s.name] = 0;
                          });
                          setHitsState(updated);
                        }}
                        className="px-2 py-1 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 rounded text-sm text-rose-400 transition-colors font-mono"
                      >
                        🧹 Reset to 0 Hits
                      </button>
                    </div>

                    {/* Interactive Skills Table */}
                    <div className="h-[450px] overflow-y-auto pr-1 border border-slate-900 bg-slate-950/20 rounded-lg p-2">
                      <span className="text-[12px] uppercase font-mono text-slate-500 font-semibold px-2 block mb-2">
                        Active Skills ({simulatorSkills.length}) for {rotSimClass} Weapons:
                      </span>
                      <div className="space-y-2">
                        {simulatorSkills.map((s) => {
                          const hits = hitsState[s.name] || 0;
                          return (
                            <div key={s.name} className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded border border-slate-900 hover:border-slate-850 transition-colors gap-4">
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-slate-200 truncate">{s.name}</div>
                                <div className="text-[12px] text-slate-500 truncate font-mono">{s.weapon}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[12px] font-mono text-slate-500">Hits/60s:</span>
                                <input
                                  type="number"
                                  min="0"
                                  max="999"
                                  value={hits === 0 ? "" : hits}
                                  placeholder="0"
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    setHitsState(prev => ({ ...prev, [s.name]: val }));
                                  }}
                                  className="w-16 bg-slate-950 border border-slate-900 rounded p-1 text-sm text-center text-amber-500 font-mono font-bold focus:outline-none focus:border-amber-500/50"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Disclaimer about non-Bamboocut-Dust path skill names */}
                    <div className="mt-2 text-[12px] text-slate-400 italic leading-relaxed px-1 flex items-start gap-1">
                      <span className="shrink-0 text-amber-500/80">⚠️</span>
                      <span>
                        Skill names for non-Bamboocut-Dust paths are approximate. Enter hits from your actual damage log for accurate results.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Outputs & Gear Swap Simulator */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Core Combat Output Parse Card */}
                  <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5 shadow-lg space-y-4">
                    <h3 className="text-base font-bold font-serif text-slate-100 flex items-center gap-2 border-b border-amber-900/10 pb-2">
                      ⚔ Simulated Combat Parse
                    </h3>
                    
                    {/* Big Stats Indicator */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-900">
                      <div>
                        <div className="text-[12px] uppercase font-mono tracking-wider text-slate-500">Total Combat Damage</div>
                        <div className="text-xl font-bold font-serif text-amber-500 mt-0.5">
                          {Math.round(totalSimCurrentDmg).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] uppercase font-mono tracking-wider text-slate-500">Effective Parse DPS</div>
                        <div className="text-xl font-bold font-serif text-amber-500 mt-0.5">
                          {totalSimCurrentDps.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                        </div>
                      </div>
                    </div>

                    {/* Skill Contributions table */}
                    <div className="overflow-x-auto rounded-lg border border-slate-900">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-950 border-b border-amber-900/10 text-[11px] uppercase tracking-wider font-mono text-slate-500">
                            <th className="py-2 px-3">Skill Spec</th>
                            <th className="py-2 px-3 text-right">Hits</th>
                            <th className="py-2 px-3 text-right">DMG/hit</th>
                            <th className="py-2 px-3 text-right font-bold text-amber-500/80">Total</th>
                            <th className="py-2 px-3 text-right">%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-950 bg-slate-950/25 font-mono text-[13px] text-slate-300">
                          {currentSimDetails
                            .filter(item => item.hits > 0)
                            .sort((a, b) => b.total - a.total)
                            .map((item, idx) => {
                              const percent = totalSimCurrentDmg > 0 ? ((item.total / totalSimCurrentDmg) * 100).toFixed(1) : "0.0";
                              return (
                                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                                  <td className="py-2 px-3 font-sans font-medium text-slate-200">
                                    {item.name}
                                  </td>
                                  <td className="py-2 px-3 text-right text-slate-400">{item.hits}</td>
                                  <td className="py-2 px-3 text-right text-slate-450">{Math.round(item.perHit).toLocaleString()}</td>
                                  <td className="py-2 px-3 text-right font-extrabold text-amber-500">
                                    {Math.round(item.total).toLocaleString()}
                                  </td>
                                  <td className="py-2 px-3 text-right text-slate-400">{percent}%</td>
                                </tr>
                              );
                            })}
                          {currentSimDetails.filter(x => x.hits > 0).length === 0 && (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-slate-500 italic text-[13px]">
                                No skills have active Hits entered. Please type some Hits in the table to display the parse data here.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Weapon Swap Simulator Card */}
                  <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5 shadow-lg space-y-4">
                    <div className="border-b border-amber-900/10 pb-2">
                      <h3 className="text-base font-bold font-serif text-slate-100 flex items-center gap-1.5">
                        🛠 Weapon/Gear Swap Simulator
                      </h3>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        Test how alternate weapons stack up by modifying the Base Physical Attack min & max attributes.
                      </p>
                    </div>

                    <div className="space-y-3 font-mono text-sm">
                      
                      {/* Presets dropdown */}
                      <div className="space-y-1">
                        <label className="text-[12px] text-slate-400 font-sans font-bold uppercase tracking-wider block">Weapon Base Presets</label>
                        <select
                          value={swapWeaponId}
                          onChange={(e) => {
                            const wid = e.target.value;
                            setSwapWeaponId(wid);
                            const found = PREDEFINED_WEAPONS.find(w => w.id === wid);
                            if (found && wid !== "custom") {
                              setSwapMinAtk(found.min);
                              setSwapMaxAtk(found.max);
                            }
                          }}
                          className="w-full bg-slate-950 border border-slate-900 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500/50 block w-full"
                        >
                          {PREDEFINED_WEAPONS.map(w => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Inputs min & max */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[12px] text-slate-400 font-sans block">New Min Base Atk</label>
                          <input
                            type="number"
                            value={swapMinAtk}
                            onChange={(e) => {
                              setSwapMinAtk(parseInt(e.target.value) || 0);
                              setSwapWeaponId("custom");
                            }}
                            className="w-full bg-slate-950 border border-slate-900 rounded p-2 text-slate-100 placeholder:text-slate-705 focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[12px] text-slate-400 font-sans block">New Max Base Atk</label>
                          <input
                            type="number"
                            value={swapMaxAtk}
                            onChange={(e) => {
                              setSwapMaxAtk(parseInt(e.target.value) || 0);
                              setSwapWeaponId("custom");
                            }}
                            className="w-full bg-slate-950 border border-slate-900 rounded p-2 text-slate-100 placeholder:text-slate-705 focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                      </div>

                      {/* Swap Comparison results banner */}
                      <div className="bg-slate-950 rounded-xl p-4 border border-slate-900">
                        <div className="text-[12px] uppercase font-bold text-slate-500 tracking-wider">Recalculated Weapon Comparison</div>
                        
                        <div className="mt-2.5 flex items-baseline justify-between">
                          <div className="text-slate-400 text-sm">Simulated DPS:</div>
                          <div className="text-lg font-bold text-amber-500">
                            {totalSimSwappedDps.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-slate-900 pt-2 text-sm">
                          <span className="text-slate-400">Total Parse Gain/Loss:</span>
                          {swapDpsDiffPct >= 0 ? (
                            <span className="font-extrabold text-emerald-500 text-base">
                              +{swapDpsDiffPct.toFixed(2)}% DPS Increase
                            </span>
                          ) : (
                            <span className="font-extrabold text-rose-500 text-base">
                              {swapDpsDiffPct.toFixed(2)}% DPS Decrease
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Helpful quick guide */}
                      <div className="text-[12px] text-slate-500 leading-normal font-sans space-y-1 pl-1">
                        <p>💡 <strong>Note</strong>: This swap calculations assume panel scaling bonuses (such as Phys Pen, Critical multipliers, and Skill Damage attributes) remain active and apply seamlessly onto the new weapon base damage floor.</p>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

        {/* Tab Profiles Manager */}
        {activeTab === "profiles" && (
          <div className="space-y-6">
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-bold font-serif text-slate-100 flex items-center gap-2 border-b border-amber-900/15 pb-4 mb-5">
                <Database className="text-amber-500 w-5 h-5" /> Gear Sets Management & Comparisons Matrix
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Save active panel box */}
                <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 space-y-4 md:col-span-1">
                  <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest font-mono">
                    Save Active Panel Setup
                  </h3>
                  <div className="space-y-2">
                    <label className="text-[13px] text-slate-400 block font-medium">Profile Name</label>
                    <input
                      type="text"
                      placeholder="e.g., T91 Gold Set, Pen Focused..."
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      className="w-full bg-slate-900 text-slate-100 border border-slate-800 text-sm px-3 py-2 rounded focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!newProfileName.trim()) return;
                      const updated = [
                        {
                          id: Date.now().toString(),
                          name: newProfileName.trim(),
                          timestamp: new Date().toLocaleString(),
                          panel: { ...panel },
                          gradRate: rotationStats.gradRate,
                          dps: rotationStats.dps,
                        },
                        ...profiles,
                      ];
                      saveProfilesList(updated);
                      setNewProfileName("");
                    }}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold rounded text-sm py-2 px-3 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Save Profile
                  </button>

                  <div className="border-t border-slate-900 pt-3">
                    <h4 className="text-[12px] uppercase tracking-wider font-extrabold text-slate-400 mb-2 font-mono">
                      Backups & Cross-sync
                    </h4>
                    <div className="space-y-2 text-[12px] text-slate-500">
                      <button
                        onClick={() => {
                          const str = JSON.stringify(profiles, null, 2);
                          navigator.clipboard.writeText(str);
                          alert("Successfully copied profile catalogs as JSON to clipboard!");
                        }}
                        className="text-amber-500/80 hover:text-amber-400 block font-semibold underline text-left"
                      >
                        Export Profiles (Copy JSON)
                      </button>
                      <button
                        onClick={() => {
                          const txt = prompt("Paste your profiles JSON backup string here:");
                          if (txt) {
                            try {
                              const parsed = JSON.parse(txt);
                              if (Array.isArray(parsed)) {
                                saveProfilesList(parsed);
                                alert("Profile catalogs loaded and synchronized successfully!");
                              } else {
                                alert("Invalid backup structure. Verified profiles must be a valid JSON list array.");
                              }
                            } catch (e) {
                              alert("An error occurred while parsing your profile JSON string.");
                            }
                          }
                        }}
                        className="text-amber-500/80 hover:text-amber-400 block font-semibold underline text-left mt-1"
                      >
                        Import Profiles (Paste JSON)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Profiles catalogs */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-mono flex justify-between items-center">
                    <span>Saved Configurations ({profiles.length})</span>
                    {profiles.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete all saved configurations?")) {
                            saveProfilesList([]);
                          }
                        }}
                        className="text-rose-500 hover:text-rose-400 text-[12px] underline font-bold"
                      >
                        Delete All
                      </button>
                    )}
                  </h3>

                  {profiles.length === 0 ? (
                    <div className="bg-[#0e0d0b] border border-slate-900 rounded-xl p-8 text-center text-slate-500 text-sm">
                      No stored configurations found. Current indicators will be lost on page reload if not saved. Record your setup using the panel on the left!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profiles.map((prof) => {
                        const isComparing = compareProfileIds.includes(prof.id);
                        const dyn = getDynamicProfileStats(prof);
                        return (
                          <div
                            key={prof.id}
                            className={`border rounded-xl p-4 transition-all relative ${
                              isComparing
                                ? "bg-amber-950/10 border-amber-500/65"
                                : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                            }`}
                          >
                            <span className="text-[11px] font-mono text-slate-500 block">
                              {prof.timestamp}
                            </span>
                            <h4 className="text-base font-bold text-slate-100 font-serif mt-1 truncate">
                              {prof.name}
                            </h4>

                            <div className="grid grid-cols-2 gap-2 mt-2.5 text-[12px] font-mono border-t border-slate-900 pt-2.5">
                              <div>
                                <span className="text-slate-500 block">Graduation:</span>
                                <strong className="text-amber-500 text-sm">
                                  {dyn.gradRate.toFixed(1)}%
                                </strong>
                              </div>
                              <div>
                                <span className="text-slate-500 block">DPS Score:</span>
                                <strong className="text-slate-200">
                                  {Math.round(dyn.dps).toLocaleString()}/s
                                </strong>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() => {
                                  setPanel(prof.panel);
                                  alert(`Successfully restored configuration "${prof.name}" to active panel!`);
                                }}
                                className="flex-1 bg-slate-905 border border-slate-800 hover:bg-slate-900 text-slate-200 text-[13px] py-1.5 px-2 rounded text-center transition-colors font-bold cursor-pointer"
                              >
                                Equip Build
                              </button>
                              <button
                                onClick={() => {
                                  if (isComparing) {
                                    setCompareProfileIds(compareProfileIds.filter((id) => id !== prof.id));
                                  } else {
                                    setCompareProfileIds([...compareProfileIds, prof.id]);
                                  }
                                }}
                                className={`flex-1 border text-[13px] py-1.5 px-2 rounded font-bold transition-all text-center cursor-pointer ${
                                  isComparing
                                    ? "bg-amber-500 text-slate-950 border-amber-600 hover:bg-amber-400 font-extrabold"
                                    : "bg-slate-905 border-slate-800 text-amber-500/95 hover:bg-slate-900"
                                }`}
                              >
                                {isComparing ? "✓ Selected" : "Compare"}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete profile "${prof.name}"?`)) {
                                    const updated = profiles.filter((p) => p.id !== prof.id);
                                    saveProfilesList(updated);
                                    setCompareProfileIds(compareProfileIds.filter((id) => id !== prof.id));
                                  }
                                }}
                                className="border border-slate-900 hover:bg-rose-950/10 hover:border-rose-900 text-rose-500 text-sm px-2.5 rounded transition-colors cursor-pointer"
                                title="Delete profile"
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Side-by-side multiple comparison matrix */}
            {compareProfileIds.length > 0 && (() => {
              const selectedProfs = profiles.filter((p) => compareProfileIds.includes(p.id));
              if (selectedProfs.length === 0) return null;

              const keysToCompare: { label: string; key: keyof PanelStats; unit: string }[] = [
                { label: "Max Physical Atk", key: "maxOuter", unit: "" },
                { label: "Min Physical Atk", key: "minOuter", unit: "" },
                { label: "Physical Penetration (Phys Pen)", key: "outerPen", unit: "%" },
                { label: "Critical Rate (Crit Rate)", key: "crit", unit: "%" },
                { label: "Critical Damage (Crit DMG)", key: "critDmg", unit: "%" },
                { label: "Bamboocut Penetration (Pz Pen)", key: "pzPen", unit: "%" },
                { label: "Bamboocut DMG Boost (Pz DMG)", key: "pzDmg", unit: "%" },
                { label: "Max Bamboocut", key: "maxPz", unit: "" },
                { label: "Affinity Rate", key: "aff", unit: "%" },
              ];

              return (
                <div className="bg-[#141210]/95 border-2 border-amber-500 rounded-xl p-5 shadow-2xl relative">
                  <div className="flex justify-between items-center border-b border-amber-900/10 pb-3 mb-4">
                    <h3 className="text-base font-serif font-bold text-amber-500 uppercase tracking-wider">
                      Multi Gear Sets Comparison Matrix ({selectedProfs.length} builds selected)
                    </h3>
                    <button
                      onClick={() => setCompareProfileIds([])}
                      className="text-sm text-rose-400 hover:text-rose-300 font-bold border border-rose-900/45 px-2.5 py-1 rounded bg-rose-950/20 cursor-pointer"
                    >
                      Clear all comparisons &times;
                    </button>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-sm border-collapse font-sans min-w-[700px]">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-[12px] uppercase font-mono">
                          <th className="py-2.5 px-3">Attribute / Substat</th>
                          <th className="py-2.5 px-3 text-right text-amber-400 bg-amber-500/5">Active Configuration</th>
                          {selectedProfs.map((p) => (
                            <th key={p.id} className="py-2.5 px-3 text-right max-w-[200px] truncate" title={p.name}>
                              {p.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {keysToCompare.map((item) => {
                          const activeVal = adjustedPanel[item.key] as number;
                          return (
                            <tr key={item.key} className="border-b border-slate-900 text-sm font-mono hover:bg-slate-900/20">
                              <td className="py-2.5 px-3 font-sans font-medium text-slate-300">{item.label}</td>
                              <td className="py-2.5 px-3 text-right text-amber-400 font-bold bg-amber-500/5">
                                {activeVal.toFixed(item.key === "minOuter" || item.key === "maxOuter" || item.key === "maxPz" || item.key === "minPz" ? 0 : 1)}
                                {item.unit}
                              </td>
                              {selectedProfs.map((p) => {
                                const compVal = p.panel[item.key] as number;
                                const diff = activeVal - compVal;
                                return (
                                  <td key={p.id} className="py-2.5 px-3 text-right">
                                    <div className="text-slate-100 font-medium">
                                      {compVal.toFixed(item.key === "minOuter" || item.key === "maxOuter" || item.key === "maxPz" || item.key === "minPz" ? 0 : 1)}
                                      {item.unit}
                                    </div>
                                    <div className={`text-[11px] font-bold ${diff > 0 ? "text-rose-400" : diff < 0 ? "text-emerald-400" : "text-slate-500"}`}>
                                      {diff > 0 ? "▼ -" : diff < 0 ? "▲ +" : ""}
                                      {diff !== 0 ? Math.abs(diff).toFixed(item.key === "minOuter" || item.key === "maxOuter" || item.key === "maxPz" || item.key === "minPz" ? 0 : 1) : "equal"}
                                      {diff !== 0 ? item.unit : ""}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                        {/* Graduation Rate */}
                        <tr className="border-b border-slate-900 text-sm font-mono bg-amber-500/5 font-bold">
                          <td className="py-3 px-3 font-sans text-amber-400">Graduation Rate</td>
                          <td className="py-3 px-3 text-right text-amber-500 font-extrabold bg-amber-500/10">
                            {rotationStats.gradRate.toFixed(1)}%
                          </td>
                          {selectedProfs.map((p) => {
                            const dyn = getDynamicProfileStats(p);
                            const diff = rotationStats.gradRate - dyn.gradRate;
                            return (
                              <td key={p.id} className="py-3 px-3 text-right">
                                <div className="text-slate-200 font-extrabold">{dyn.gradRate.toFixed(1)}%</div>
                                <div className={`text-[11px] font-bold ${diff > 0 ? "text-rose-400" : diff < 0 ? "text-emerald-400" : "text-slate-500"}`}>
                                  {diff > 0 ? "▼ -" : diff < 0 ? "▲ +" : ""}
                                  {diff !== 0 ? Math.abs(diff).toFixed(1) : "equal"}
                                  {diff !== 0 ? "%" : ""}
                                </div>
                              </td>
                            );
                          })}
                        </tr>

                        {/* Skill DPS */}
                        <tr className="border-b border-slate-900 text-sm font-mono bg-amber-400/5 font-bold">
                          <td className="py-3 px-3 font-sans text-amber-400 font-serif">Rotation Skill DPS</td>
                          <td className="py-3 px-3 text-right text-slate-100 font-extrabold bg-amber-500/10">
                            {Math.round(rotationStats.dps).toLocaleString()}/s
                          </td>
                          {selectedProfs.map((p) => {
                            const dyn = getDynamicProfileStats(p);
                            const diff = rotationStats.dps - dyn.dps;
                            return (
                              <td key={p.id} className="py-3 px-3 text-right">
                                <div className="text-slate-200 font-extrabold">{Math.round(dyn.dps).toLocaleString()}/s</div>
                                <div className={`text-[11px] font-bold ${diff > 0 ? "text-[#e94b29]" : diff < 0 ? "text-[#3fc05c]" : "text-slate-500"}`}>
                                  {diff > 0 ? "▼ -" : diff < 0 ? "▲ +" : ""}
                                  {diff !== 0 ? Math.round(Math.abs(diff)).toLocaleString() : ""}
                                  {diff !== 0 ? "/s" : "equal"}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

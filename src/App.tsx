import React, { useState, useEffect, useMemo } from "react";
import {
  Shield,
  HelpCircle,
  TrendingUp,
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
} from "lucide-react";
import { PanelStats, TierConstants } from "./types";
import { TIERS, calcSkill, calcBaseline, ROTATION, ROTATION_TIME } from "./utils/calc";
import { INNER_WAYS } from "./data/innerways";
import OcrScanner from "./components/OcrScanner";
import RelayingSimulator from "./components/RelayingSimulator";
import ArsenalSimulator from "./components/ArsenalSimulator";
import GeminiAdvisor from "./components/GeminiAdvisor";

const INITIAL_PANEL: PanelStats = {
  minOuter: 1507,
  maxOuter: 2278,
  outerPen: 36.4,
  minPz: 377,
  maxPz: 688,
  pzPen: 18.0,
  pzDmg: 9.0,
  prec: 100,
  crit: 80,
  aff: 10.1,
  dcrit: 4.6,
  daff: 0,
  critDmg: 54,
  affDmg: 35,
  outerDmg: 2.8,
  bossDmg: 0,
  umbBonus: 5.1,
  ropeBonus: 0,
  allArts: 0,
  skillDmg: 0,
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
  const [activeTab, setActiveTab] = useState<"calculator" | "priority" | "simulators" | "ocr" | "profiles">("calculator");
  const [rotationTab, setRotationTab] = useState<"list" | "top">("list");
  const [selectedInnerWays, setSelectedInnerWays] = useState<string[]>(() => {
    const config = getCustomConfig();
    return config?.selectedInnerWays ?? [];
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
            skillDmg: 0,
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
            skillDmg: 0,
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
            skillDmg: 0,
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
    };
    selectedInnerWays.forEach((id) => {
      const iw = INNER_WAYS.find((item) => item.id === id);
      if (iw && iw.stat) {
        if (iw.stat.outerPen) bonus.outerPen += iw.stat.outerPen;
        if (iw.stat.pzPen) bonus.pzPen += iw.stat.pzPen;
        if (iw.stat.critDmg) bonus.critDmg += iw.stat.critDmg;
        if (iw.stat.affDmg) bonus.affDmg += iw.stat.affDmg;
        if (iw.stat.outerDmg) bonus.outerDmg += iw.stat.outerDmg;
        if (iw.stat.generalDmg) bonus.generalDmg += iw.stat.generalDmg;
        if (iw.stat.pzDmg) bonus.pzDmg += iw.stat.pzDmg;
      }
    });
    return bonus;
  }, [selectedInnerWays]);

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

    // Store raw innerway factors so they pass to formula
    p.iwGeneralDmg = iwStats.generalDmg;
    p.iwOuterPen = iwStats.outerPen;
    p.iwPzPen = iwStats.pzPen;
    p.iwPzDmg = iwStats.pzDmg;

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

  // Helper to re-calculate total damage with a specific panel
  const calcTotalDmgForPanel = (p: PanelStats) => {
    let totalDmg = 0;
    ROTATION.forEach((item) => {
      const { total } = calcSkill(item, p, activeTier, {
        set: p.set,
        datang,
        yishui,
      });
      totalDmg += total;
    });
    return totalDmg;
  };

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

      const newDmg = calcTotalDmgForPanel(cloned);
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

  const handleStatChange = (key: keyof PanelStats, val: number) => {
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
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-500/80 border border-amber-500/30 rounded px-2 py-0.5 bg-amber-500/5 font-bold">
              Where Winds Meet · 燕云十六声
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
              Grade 95 / Gear Tier 91
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-slate-100 tracking-tight mt-1 flex items-center gap-2">
            Bamboocut-Dust Master Graduation Calculator
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Everspring Umbrella + Rope Dart · Stars Align Level 91 Simulation Set (破竹·尘毕业计算器)
          </p>
        </div>

        {/* Global Graduation Meter Block */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-900 shadow-lg shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a9ea8] font-bold">Graduation Status</span>
            <div className="text-2xl font-black font-serif text-amber-500 mt-0.5 animate-pulse">
              {rotationStats.gradRate.toFixed(1)}%
            </div>
          </div>
          <div className="h-10 w-[1px] bg-slate-800" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">DPS (Avg Rank)</span>
            <div className="text-sm font-bold font-serif text-slate-200 mt-1">
              {Math.round(rotationStats.dps).toLocaleString()}/s
            </div>
          </div>
        </div>
      </header>

      {/* Sub-Navigation Tabs */}
      <div className="bg-[#14120f]/60 px-6 border-b border-amber-900/10 flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "calculator" ? "text-amber-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ⚔ Calc
            {activeTab === "calculator" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("priority")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "priority" ? "text-amber-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            📊 Priority
            {activeTab === "priority" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("simulators")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "simulators" ? "text-amber-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🛠 Gear Sim
            {activeTab === "simulators" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("ocr")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "ocr" ? "text-amber-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            📸 Screen OCR
            {activeTab === "ocr" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("profiles")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "profiles" ? "text-amber-500" : "text-slate-400 hover:text-slate-200"
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
              className="px-2 py-1 text-[10px] font-mono tracking-wider text-rose-400 hover:text-rose-300 border border-rose-900/40 bg-rose-950/10 hover:bg-rose-950/20 rounded transition-colors flex items-center gap-1 shrink-0"
              title="Clear custom default configuration and return to factory settings"
            >
              Clear Default
            </button>
          )}
          <button
            onClick={handleSaveAsDefault}
            className="px-2.5 py-1 text-[10px] font-mono tracking-wider font-bold text-amber-500 hover:text-amber-400 border border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 rounded transition-colors flex items-center gap-1 shrink-0"
            title="Save all current parameters and buffs as your custom default"
          >
            <Database className="w-3 h-3 text-amber-500" /> Save Default
          </button>
          <button
            onClick={handleResetAll}
            className="px-2.5 py-1 text-[10px] font-mono tracking-wider font-bold text-slate-300 hover:text-slate-100 border border-slate-700/60 hover:border-slate-500/80 bg-slate-850/55 hover:bg-slate-800/85 rounded transition-colors flex items-center gap-1 shrink-0"
            title="Reset all settings, buffs and stats to default configuration"
          >
            <RotateCw className="w-3 h-3 text-amber-500 animate-spin-hover" /> Reset All
          </button>
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto">
        {activeTab === "calculator" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar Controls (Inputs & Modifiers) - 4 Cols */}
            <div className="lg:col-span-4 bg-[#141210] border border-amber-900/10 rounded-xl p-5 space-y-6">
              {/* Reset/Save Default Quick Group */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#a19683] uppercase flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" /> Default Setup
                  </span>
                  {hasCustomConfig && (
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-900/40 animate-pulse">
                      Custom Default Active
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center">
                  <button
                    onClick={handleSaveAsDefault}
                    className="py-1.5 px-2 text-xs font-mono font-bold text-[#ede5ce] bg-amber-900/30 hover:bg-amber-900/50 border border-amber-500/20 rounded transition-all flex items-center justify-center gap-1 hover:text-amber-300 shadow-sm"
                    title="Save present parameters & buffs as default when loading pages"
                  >
                    <Database className="w-3.5 h-3.5 text-amber-500" /> Save default
                  </button>
                  <button
                    onClick={handleResetAll}
                    className="py-1.5 px-2 text-xs font-mono font-bold text-rose-300 bg-rose-950/20 hover:bg-rose-950/45 border border-rose-950/40 rounded transition-all flex items-center justify-center gap-1 hover:text-rose-200"
                    title="Restore all parameters to baseline database definitions"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-rose-500" /> Reset All
                  </button>
                </div>

                {hasCustomConfig && (
                  <div className="text-center pt-1 block">
                    <button
                      onClick={handleClearCustomDefault}
                      className="text-[10px] font-mono text-slate-500 hover:text-rose-400 transition-colors w-full"
                    >
                      ⚠ Delete Custom Default (Restore Factory Baseline)
                    </button>
                  </div>
                )}
              </div>

              {/* Dungeon selection */}
              <div>
                <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Dungeon Parameters
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-2 rounded-lg border border-slate-900/60">
                    <label className="text-xs text-slate-300 font-medium">Dungeon Level</label>
                    <select
                      value={tierKey}
                      onChange={(e) => setTierKey(e.target.value)}
                      className="bg-slate-900 font-mono border-none text-xs text-amber-500 rounded px-2.5 py-1 text-right focus:outline-none"
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
                        <label className="text-[10px] text-slate-400 block mb-1">Defense</label>
                        <input
                          type="number"
                          value={customDef}
                          onChange={(e) => setCustomDef(parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-950 text-slate-200 border border-slate-800 text-xs text-right px-2 py-1 rounded"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Judge Resistance</label>
                        <input
                          type="number"
                          step="0.05"
                          value={customRes}
                          onChange={(e) => setCustomRes(parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-950 text-slate-200 border border-slate-800 text-xs text-right px-2 py-1 rounded"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900/40 text-[10px] text-slate-400 font-mono space-y-1.5 leading-relaxed">
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
                <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Physical attributes
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Min Physical Atk</span>
                    <input
                      type="number"
                      value={panel.minOuter}
                      onChange={(e) => handleStatChange("minOuter", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Max Physical Atk</span>
                    <input
                      type="number"
                      value={panel.maxOuter}
                      onChange={(e) => handleStatChange("maxOuter", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
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
                <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Bamboocut Dust attributes
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Min Bamboocut Atk</span>
                    <input
                      type="number"
                      value={panel.minPz}
                      onChange={(e) => handleStatChange("minPz", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Max Bamboocut Atk</span>
                    <input
                      type="number"
                      value={panel.maxPz}
                      onChange={(e) => handleStatChange("maxPz", parseInt(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-20 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Bamboocut Pen %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.pzPen}
                      onChange={(e) => handleStatChange("pzPen", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
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
                <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Hit and Critical Rates
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Precision Rate %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.prec}
                      onChange={(e) => handleStatChange("prec", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Critical Rate %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.crit}
                      onChange={(e) => handleStatChange("crit", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400 font-medium">Direct Critical Rate %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.dcrit}
                      onChange={(e) => handleStatChange("dcrit", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-emerald-400 focus:outline-none w-16 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
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
                <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3 pb-1 border-b border-amber-900/10">
                  Damage Multipliers
                </h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Crit DMG Bonus %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.critDmg}
                      onChange={(e) => handleStatChange("critDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Affinity DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.affDmg}
                      onChange={(e) => handleStatChange("affDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Rope Dart DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.ropeBonus}
                      onChange={(e) => handleStatChange("ropeBonus", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Umbrella Action DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.umbBonus}
                      onChange={(e) => handleStatChange("umbBonus", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">All Weapons DMG %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.allArts}
                      onChange={(e) => handleStatChange("allArts", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Boss DMG Boost %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.bossDmg}
                      onChange={(e) => handleStatChange("bossDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-slate-100 focus:outline-none w-16 font-mono"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-[#201512]/60 p-2 rounded-lg border border-rose-950/40 text-xs">
                    <span className="text-amber-200">Specified Skill Bonus %</span>
                    <input
                      type="number"
                      step="0.1"
                      value={panel.skillDmg}
                      onChange={(e) => handleStatChange("skillDmg", parseFloat(e.target.value) || 0)}
                      className="bg-transparent border-none text-right text-rose-300 focus:outline-none w-16 font-mono font-bold"
                    />
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-900/60 text-xs">
                    <span className="text-slate-400">Armor Set Selection</span>
                    <select
                      value={panel.set}
                      onChange={(e) => handleStatChange("set", e.target.value)}
                      className="bg-slate-900 border-none text-[11px] text-amber-500 font-medium px-2 py-0.5 rounded focus:outline-none"
                    >
                      <option value="stars">Stars Align Set (+Attribute Atk)</option>
                      <option value="eaglerise">Eaglerise Set (+Phys Crit)</option>
                      <option value="stormrain">Stormrain Set (+Cooldown)</option>
                      <option value="shakenhill">Shakenhill Set (+Stagger)</option>
                      <option value="none">Standard Set</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Passive Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
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
                    Song of Yi Active (+10 Phys Pen)
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
                  <label htmlFor="chk-datang" className="text-slate-300 cursor-pointer text-[11px]">
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
                  <label htmlFor="chk-script50" className="text-slate-300 cursor-pointer text-[11px]">
                    Sub-50% HP Active Talent (+15% Direct Crit)
                  </label>
                </div>
              </div>

              {/* Inner Ways Database Section */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xs font-semibold text-amber-500 uppercase tracking-widest flex items-center gap-1 font-serif">
                    <Database className="w-3.5 h-3.5 text-amber-500" /> Active Inner Ways
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-amber-400 font-bold">
                    {selectedInnerWays.length}/4 selected
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mb-3 leading-snug">
                  Select up to 4 Inner Ways matching your active setup to automatically aggregate their dynamic passive bonus attributes:
                </p>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-amber-900/40">
                  {INNER_WAYS.map((iw) => {
                    const isSelected = selectedInnerWays.includes(iw.id);
                    const disabled = !isSelected && selectedInnerWays.length >= 4;
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
                        className={`p-2 rounded border text-[11px] cursor-pointer transition-all ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-[#ede5ce]"
                            : disabled
                            ? "bg-slate-950/20 border-slate-900/60 opacity-40 cursor-not-allowed"
                            : "bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex justify-between items-center font-semibold mb-0.5">
                          <span>{iw.name}</span>
                          {iw.recommended && (
                            <span className="text-[8px] bg-red-950/80 text-red-400 font-mono scale-90 px-1 rounded uppercase font-bold tracking-wider">
                              Best T91
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-normal mb-0.5">
                          {iw.desc}
                        </div>
                        {iw.note && isSelected && (
                          <div className="text-[9px] text-[#c9943a] leading-tight font-mono border-t border-amber-900/10 pt-1 mt-1">
                            {iw.note}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results Board & Active Calculations - 8 Cols */}
            <div className="lg:col-span-8 space-y-6">
              {/* Primary Results Display */}
              <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <span className="text-[9px] font-mono tracking-widest text-[#8a9ea8] uppercase">Season 3 Global</span>
                </div>
                <h2 className="text-xs uppercase tracking-wider font-extrabold text-amber-500 mb-4 flex items-center gap-1.5 font-serif border-b border-amber-900/10 pb-2">
                  <Award className="w-4 h-4 text-amber-400" /> Graduation Damage Analysis
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-lg text-center relative">
                    <div className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">Rotation Score damage</div>
                    <div className="text-xl font-bold font-serif text-slate-100 mt-1">
                      {Math.round(rotationStats.totalDmg).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#1b1511]/40 border border-amber-950/40 p-3.5 rounded-lg text-center relative">
                    <div className="text-[9px] font-mono tracking-wider text-amber-400/80 uppercase">Expected Graduation Rate</div>
                    <div className="text-2xl font-black font-serif text-[#c9943a] mt-1">
                      {rotationStats.gradRate.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-lg text-center relative">
                    <div className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">Baseline Target (Same Tier)</div>
                    <div className="text-xl font-bold font-serif text-slate-400 mt-1">
                      {Math.round(baselineScore).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-lg text-center relative flex flex-col justify-center">
                    <div className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">Gap to 100%</div>
                    <div className={`text-xl font-bold font-serif mt-1 ${rotationStats.gradRate >= 100 ? "text-emerald-400" : "text-rose-400"}`}>
                      {rotationStats.gradRate >= 100 ? "✓ Graduated" : `-${(100 - rotationStats.gradRate).toFixed(1)}%`}
                    </div>
                  </div>
                </div>

                {/* Progress bar and metrics */}
                <div className="space-y-2 bg-[#0e0d0b] p-4 rounded-xl border border-amber-900/5">
                  <div className="flex justify-between text-[10px] uppercase font-mono tracking-wider text-slate-400">
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
                </div>

                {/* Dynamic Advice & Gearing Roadmap */}
                <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed border bg-slate-950/50 border-slate-900 text-slate-300">
                  {rotationStats.gradRate >= 100 ? (
                    <div>
                      <strong className="text-emerald-400 flex items-center gap-1 mb-1">
                        <CheckCircle className="w-4 h-4 inline" /> 🏆 Fully Graduated for Tier 91!
                      </strong>
                      Your build exceeds the T91 baseline ({rotationStats.gradRate.toFixed(1)}%). Ready to clear all Season 3 raids. Prep for Tier 96 when it unlocks.
                    </div>
                  ) : rotationStats.gradRate >= 90 ? (
                    <div>
                      <strong className="text-amber-400 flex items-center gap-1 mb-1">
                        <CheckCircle className="w-4 h-4 inline" /> ✅ Excellent Build!
                      </strong>
                      {adjustedPanel.outerPen < 46
                        ? `Physical Pen at ${adjustedPanel.outerPen.toFixed(1)}% — push toward 51.2% graduation target. Each pen sub (cap 9.0%) is very efficient here.`
                        : `Good penetration. Keep stacking Max Physical Attack toward 4046. Current: ${Math.round(adjustedPanel.maxOuter)}.`}
                    </div>
                  ) : rotationStats.gradRate >= 70 ? (
                    <div>
                      <strong className="text-amber-500 flex items-center gap-1 mb-1">⚠️ Solid — keep building</strong>
                      ① Max Phys Atk → 4046+ (now: {Math.round(adjustedPanel.maxOuter)}) ② Phys Pen → 51.2% (now: {adjustedPanel.outerPen.toFixed(1)}%) ③ Crit Rate panel 116%+ to reach 80% eff cap vs T91.
                    </div>
                  ) : (
                    <div>
                      <strong className="text-rose-400 flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-4 h-4 inline" /> 📈 Building Phase ({rotationStats.gradRate.toFixed(1)}%)
                      </strong>
                      ① Max Phys Atk → 4046 (now: {Math.round(adjustedPanel.maxOuter)}) ② Phys Pen → 51.2% (now: {adjustedPanel.outerPen.toFixed(1)}%) ③ Crit Rate 116%+ panel ④ Bamboocut Atk. T91 sub caps: Pen 9.0% · Max PA 63.8 · Crit 6.5% · CritDMG 8.0%.
                    </div>
                  )}
                </div>
              </div>

              {/* Hit Zone breakdown block */}
              <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-amber-500 mb-4 flex items-center gap-1.5 font-serif border-b border-amber-900/10 pb-2">
                  <TrendingUp className="w-4 h-4" /> Calculated Hit Probabilities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[10px]">Precision Rate</span>
                    <strong className="text-slate-100 text-sm font-mono mt-1 block">
                      {effPrecision.toFixed(1)}%
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[10px]">Critical</span>
                    <strong className="text-slate-100 text-sm font-mono mt-1 block">
                      {effCritRate.toFixed(1)}%
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[10px]">Affinity</span>
                    <strong className="text-slate-100 text-sm font-mono mt-1 block">
                      {effAffRate.toFixed(1)}%
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[10px]">Graze</span>
                    <strong className="text-slate-100 text-sm font-mono mt-1 block">
                      {effGrazeRate.toFixed(1)}%
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[10px]">Expected Multiplier</span>
                    <strong className="text-slate-100 text-sm font-mono mt-1 block text-amber-500">
                      ×{expectedMultiplier.toFixed(3)}
                    </strong>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block font-mono text-[10px]">Pen Zone</span>
                    <strong className="text-slate-100 text-sm font-mono mt-1 block">
                      {netPhysPen >= 0 ? "+" : ""}
                      {(netPhysPen / 200 * 100).toFixed(1)}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Gemini AI recommendation & optimizing advisor */}
              <GeminiAdvisor panel={adjustedPanel} tier={activeTier} gradRate={rotationStats.gradRate} />

              {/* Rotation breakdown tables */}
              <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5">
                <div className="flex justify-between items-center border-b border-amber-900/10 pb-3 mb-4">
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-amber-500 flex items-center gap-1.5 font-serif">
                    <Layers className="w-4 h-4" /> Rotation Skill Damage Breakdown
                  </h3>
                  <div className="flex gap-1.5 bg-slate-950 p-1 rounded border border-slate-900 text-[10px]">
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
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-amber-900/20 text-[#8a9ea8] font-mono text-[10px] uppercase">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Skill name</th>
                        <th className="py-2.5 px-3 text-right">Hits</th>
                        <th className="py-2.5 px-3 text-right">DMG/Hit</th>
                        <th className="py-2.5 px-3 text-right">Total Score</th>
                        <th className="py-2.5 px-3 text-right">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 font-mono text-[11px] text-slate-300">
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
              <div className="border-b border-amber-900/15 pb-4 mb-5 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold font-serif text-slate-100 flex items-center gap-2">
                    <TrendingUp className="text-amber-500 w-5 h-5" /> Stat Priority & Marginal Gains
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Real-time marginal gains analysis computed directly from your current panel attributes. Results display your expected active DPS increment per 1 unit of sub-stat additions.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {statPriorities.map((item, index) => {
                  return (
                    <div key={item.key} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-900/80 text-amber-500 font-mono font-bold border border-amber-500/10 text-[10px]">
                            {index + 1}
                          </span>
                          <span className="text-slate-200 font-medium">{item.label}</span>
                          <span className="text-slate-500 font-mono text-[10px]">({item.bonusLabel})</span>
                        </div>
                        <div className="text-right font-mono text-xs">
                          <span className="text-slate-400">Gain: </span>
                          <strong className="text-amber-400 font-bold">+{Math.round(item.gain).toLocaleString()} dmg</strong>
                          <span className="text-slate-500"> / unit: </span>
                          <span className="text-slate-300 font-bold">+{item.gainPerUnit.toFixed(1)} dps</span>
                        </div>
                      </div>

                      <div className="h-4 bg-slate-950/80 border border-slate-900/60 rounded-full overflow-hidden flex items-center pr-3">
                        <div
                          style={{ width: `${Math.max(3, item.relative)}%` }}
                          className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                        />
                        {item.relative > 15 && (
                          <span className="text-[9px] font-mono font-bold text-slate-50 text-right ml-3 select-none">
                            {item.relative.toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* General T91 Priority Rules Guide */}
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-xs uppercase tracking-widest font-extrabold text-amber-500 font-serif border-b border-amber-900/10 pb-2 mb-4">
                General Theorycrafting Guide · T91 Global (http://spongem.com/yysls/)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300 leading-relaxed">
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

        {/* Tab Simulators (Gear & Arsenal Simulators) */}
        {activeTab === "simulators" && (
          <div className="space-y-6">
            <RelayingSimulator
              onUpdatePanelFromGear={handleSimSync}
              currentPanel={adjustedPanel}
            />
            <ArsenalSimulator onUpdatePanelFromArsenal={handleSimSync} />
          </div>
        )}

        {/* Tab OCR Scanner */}
        {activeTab === "ocr" && <OcrScanner onOcrResult={handleOcrResult} />}

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
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">
                    Save Active Panel Setup
                  </h3>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 block font-medium">Profile Name</label>
                    <input
                      type="text"
                      placeholder="e.g., T91 Gold Set, Pen Focused..."
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      className="w-full bg-slate-900 text-slate-100 border border-slate-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-amber-500 font-medium"
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
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold rounded text-xs py-2 px-3 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Save Profile
                  </button>

                  <div className="border-t border-slate-900 pt-3">
                    <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2 font-mono">
                      Backups & Cross-sync
                    </h4>
                    <div className="space-y-2 text-[10px] text-slate-500">
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
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono flex justify-between items-center">
                    <span>Saved Configurations ({profiles.length})</span>
                    {profiles.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete all saved configurations?")) {
                            saveProfilesList([]);
                          }
                        }}
                        className="text-rose-500 hover:text-rose-400 text-[10px] underline font-bold"
                      >
                        Delete All
                      </button>
                    )}
                  </h3>

                  {profiles.length === 0 ? (
                    <div className="bg-[#0e0d0b] border border-slate-900 rounded-xl p-8 text-center text-slate-500 text-xs">
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
                            <span className="text-[9px] font-mono text-slate-500 block">
                              {prof.timestamp}
                            </span>
                            <h4 className="text-sm font-bold text-slate-100 font-serif mt-1 truncate">
                              {prof.name}
                            </h4>

                            <div className="grid grid-cols-2 gap-2 mt-2.5 text-[10px] font-mono border-t border-slate-900 pt-2.5">
                              <div>
                                <span className="text-slate-500 block">Graduation:</span>
                                <strong className="text-amber-500 text-xs">
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
                                className="flex-1 bg-slate-905 border border-slate-800 hover:bg-slate-900 text-slate-200 text-[11px] py-1.5 px-2 rounded text-center transition-colors font-bold cursor-pointer"
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
                                className={`flex-1 border text-[11px] py-1.5 px-2 rounded font-bold transition-all text-center cursor-pointer ${
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
                                className="border border-slate-900 hover:bg-rose-950/10 hover:border-rose-900 text-rose-500 text-xs px-2.5 rounded transition-colors cursor-pointer"
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
                    <h3 className="text-sm font-serif font-bold text-amber-500 uppercase tracking-wider">
                      Multi Gear Sets Comparison Matrix ({selectedProfs.length} builds selected)
                    </h3>
                    <button
                      onClick={() => setCompareProfileIds([])}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold border border-rose-900/45 px-2.5 py-1 rounded bg-rose-950/20 cursor-pointer"
                    >
                      Clear all comparisons &times;
                    </button>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-xs border-collapse font-sans min-w-[700px]">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
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
                            <tr key={item.key} className="border-b border-slate-900 text-xs font-mono hover:bg-slate-900/20">
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
                                    <div className={`text-[9px] font-bold ${diff > 0 ? "text-rose-400" : diff < 0 ? "text-emerald-400" : "text-slate-500"}`}>
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
                        <tr className="border-b border-slate-900 text-xs font-mono bg-amber-500/5 font-bold">
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
                                <div className={`text-[9px] font-bold ${diff > 0 ? "text-[#e94b29]" : diff < 0 ? "text-[#3fc05c]" : "text-slate-500"}`}>
                                  {diff > 0 ? "▼ -" : diff < 0 ? "▲ +" : ""}
                                  {diff !== 0 ? Math.abs(diff).toFixed(1) : ""}
                                  {diff !== 0 ? "%" : "equal"}
                                </div>
                              </td>
                            );
                          })}
                        </tr>

                        {/* Skill DPS */}
                        <tr className="border-b border-slate-900 text-xs font-mono bg-amber-400/5 font-bold">
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
                                <div className={`text-[9px] font-bold ${diff > 0 ? "text-[#e94b29]" : diff < 0 ? "text-[#3fc05c]" : "text-slate-500"}`}>
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

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
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  Clock,
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

const TUNE_DURATION_MS = 168 * 60 * 60 * 1000;

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
  const [activeTab, setActiveTab] = useState<"calculator" | "priority" | "gear" | "compare" | "tunecd" | "simulators" | "ocr" | "profiles">("calculator");
  const [rotationTab, setRotationTab] = useState<"list" | "top">("list");

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

  const WEIGHTS: Record<string, number> = {
    "Max Phys Atk": 1.0,
    "Min Phys Atk": 1.0, 
    "Phys Pen": 8.5,
    "Crit Rate": 7.2,
    "Crit DMG": 8.0,
    "Affinity Rate": 5.0,
    "Affinity DMG": 4.5,
    "Precision": 3.5,
    "Max Bamboocut Atk": 0.8,
    "Min Bamboocut Atk": 0.8,
    "Attr Pen": 4.0,
    "Bamboocut DMG%": 6.5,
    "Umbrella Bonus": 12.0,
    "All Weapon": 10.0,
    "Phys DMG%": 15.0,
    "Boss DMG%": 12.0,
  };

  const getGearItemCompareStats = (item: GearItem) => {
    let totalGradDelta = 0;
    const subsWithDeltas = item.subs.map(sub => {
      const weight = WEIGHTS[sub.type] ?? 0;
      const cleanVal = parseFloat(sub.val.replace(/[^\d.]/g, "")) || 0;
      const isTuned = !!sub.isTuned;
      const factor = isTuned ? 1.15 : 1.0;
      const delta = cleanVal * weight * factor;
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

  // Cooldown tracker state & tick rate
  const [cooldowns, setCooldowns] = useState<TuneCooldown[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wwm_tune_cds");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wwm_tune_cds", JSON.stringify(cooldowns));
  }, [cooldowns]);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getCooldownStatus = (cd: TuneCooldown) => {
    const elapsed = Date.now() - cd.createdAt;
    const remainingMs = cd.durationMs - elapsed;
    const isReady = remainingMs <= 0;
    
    if (isReady) {
      return { isReady: true, displayTime: "0d 0h", percent: 100 };
    }
    
    const percent = Math.min(100, Math.max(0, (elapsed / cd.durationMs) * 100));
    const totalHours = Math.floor(remainingMs / 3600000);
    const days = Math.floor(totalHours / 24);
    const remHours = totalHours % 24;
    const displayTime = `${days}d ${remHours}h`;
    return {
      isReady: false,
      displayTime,
      percent
    };
  };

  // Gear state fields
  const [selectedSlot, setSelectedSlot] = useState<string>("Umbrella");
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formQuality, setFormQuality] = useState<"gold" | "purple" | "blue">("gold");
  const [formMain, setFormMain] = useState("");
  const [formSet, setFormSet] = useState("stars");
  const [formSubs, setFormSubs] = useState<{type: string; val: string; isTuned?: boolean}[]>(
    Array(6).fill(null).map(() => ({ type: "Max Phys Atk", val: "", isTuned: false }))
  );

  // form state for tune cd
  const [cdSlot, setCdSlot] = useState("Umbrella");
  const [cdItemName, setCdItemName] = useState("");

  const openAddModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormQuality("gold");
    setFormMain("");
    setFormSet("stars");
    setFormSubs(Array(6).fill(null).map(() => ({ type: "Max Phys Atk", val: "", isTuned: false })));
    setIsItemModalOpen(true);
  };

  const openEditModal = (item: GearItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormQuality(item.quality);
    setFormMain(item.main);
    setFormSet(item.set);
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

      {/* Multi-Character & Multi-Scheme Sticky Bar */}
      <div className="bg-[#14120f] border-b border-amber-900/10 px-6 py-2.5 flex flex-wrap gap-4 items-center justify-between text-xs sticky top-0 z-20 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Character selection & operations */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Hero Profile:</span>
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
              className="bg-slate-950 border border-slate-800 text-amber-500 rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500/50"
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
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">Schemes:</span>
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
            className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded flex items-center gap-1.5 transition-colors font-mono text-[10px]"
            title="Download database backup"
          >
            <Download className="w-3 h-3 text-amber-500" /> <span>Export</span>
          </button>
          <label
            className="px-2.5 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded flex items-center gap-1.5 cursor-pointer transition-colors font-mono text-[10px]"
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
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "calculator" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
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
              activeTab === "priority" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            📊 Priority
            {activeTab === "priority" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("gear")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "gear" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🛡 Gear
            {activeTab === "gear" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("compare")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "compare" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ⚖ Compare
            {activeTab === "compare" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("tunecd")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "tunecd" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ⏰ Tune CD
            {activeTab === "tunecd" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("simulators")}
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
              activeTab === "simulators" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
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
            className={`py-3 text-xs uppercase font-bold tracking-wider relative transition-colors ${
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

              {/* Active Scheme Sync Group */}
              <div className="bg-[#1c1a17] border border-amber-900/20 rounded-xl p-4 shadow-md space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#a19683] uppercase">
                    Active Scheme Sync
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold font-mono">
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
                  className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:from-amber-500 hover:to-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <Database className="w-3.5 h-3.5" /> 💾 Save to Scheme
                </button>
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

        {/* Tab Gear Stock Manager */}
        {activeTab === "gear" && (
          <div className="space-y-6">
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4 border-b border-amber-900/10 pb-3">
                <div>
                  <h2 className="text-sm font-extrabold text-amber-500 uppercase tracking-wider font-serif flex items-center gap-2">
                    <Shield className="w-4 h-4 ml-0.5 inline-block text-amber-500" /> Gear Stock Inventory
                  </h2>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Manage and store alternate gears for the active character scheme.
                  </p>
                </div>
                <button
                  onClick={openAddModal}
                  className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded font-bold text-xs hover:bg-amber-400 flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Gear Item
                </button>
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
                        <div className="text-[11px] truncate uppercase tracking-wide font-semibold">{slot.name}</div>
                        {hasItems && (
                          <div className={`text-[9px] mt-0.5 ${isSelected ? "text-slate-900 font-bold" : "text-slate-500"}`}>
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

              {/* Items List for selected slot */}
              <div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 font-mono mb-4 flex items-center gap-2">
                  <span>Selected Slot:</span>
                  <span className="text-amber-500 font-serif">{selectedSlot}</span>
                </h3>

                {getActiveGear().filter(it => it.slot === selectedSlot).length === 0 ? (
                  <div className="bg-slate-950/20 border border-dashed border-slate-900/60 p-8 rounded-lg text-center">
                    <p className="text-slate-400 text-xs">No items created for this slot yet.</p>
                    <button
                      onClick={openAddModal}
                      className="mt-3 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-amber-500 border border-slate-800 rounded font-bold text-xs transition-colors"
                    >
                      Create first "{selectedSlot}" item
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getActiveGear()
                      .filter(it => it.slot === selectedSlot)
                      .map((item) => {
                        const isGold = item.quality === "gold";
                        const isPurple = item.quality === "purple";
                        const hasTuned = item.subs.some(sub => sub.isTuned);
                        
                        return (
                          <div
                            key={item.id}
                            onClick={() => openEditModal(item)}
                            className={`group p-4 rounded-xl border cursor-pointer hover:scale-[1.01] transition-all relative overflow-hidden flex flex-col justify-between ${
                              isGold
                                ? "bg-gradient-to-b from-[#1b1510] to-[#120f0c] border-[#d48c2a]/20 hover:border-[#d48c2a]/40"
                                : isPurple
                                ? "bg-gradient-to-b from-[#16121c] to-[#110e14] border-purple-500/10 hover:border-purple-500/30"
                                : "bg-gradient-to-b from-[#11141a] to-[#0e1014] border-sky-500/10 hover:border-sky-500/30"
                            }`}
                          >
                            <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center pointer-events-none">
                              {hasTuned && (
                                <span className="absolute top-1 right-2 text-amber-500 font-bold text-xs" title="Tuned substat inside">✦</span>
                              )}
                            </div>

                            <div>
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors truncate">
                                  {item.name}
                                </h4>
                                <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded scale-90 ${
                                  isGold
                                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                    : isPurple
                                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                    : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                                }`}>
                                  {item.quality}
                                </span>
                              </div>

                              <div className="text-[10px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-900 mb-3 font-mono">
                                <span className="text-slate-500">Main Stat: </span>
                                <span>{item.main || "None"}</span>
                                {item.set && item.set !== "none" && (
                                  <div className="mt-1 text-[9px] text-[#2ebd85] font-bold">
                                    Set: {item.set === "stars" ? "⭐ Stars Align" : item.set === "eaglerise" ? "🦅 Eaglerise" : item.set === "pursuing" ? "👥 Pursuing Shadow" : item.set === "stormrain" ? "⛈️ Stormrain" : item.set === "shakenhill" ? "⛰️ Shakenhill" : item.set}
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1.5">
                                {item.subs.map((sub, sidx) => (
                                  <div key={sidx} className="flex items-center justify-between text-[11px] font-mono leading-tight">
                                    <span className="text-slate-500">{sub.type}</span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-slate-300 font-semibold">{sub.val}</span>
                                      {sub.isTuned && (
                                        <span className="text-amber-500 text-[10px] font-extrabold" title="Tuned substat">✦</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 pt-2 border-t border-slate-900 text-right text-[9px] text-slate-505 font-mono group-hover:text-amber-500/60 transition-colors">
                              Click to configure ✎
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
                <h2 className="text-sm font-extrabold text-amber-500 uppercase tracking-wider font-serif flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Item Comparison & Graduation Deltas
                </h2>
                <p className="text-[10px] text-slate-500 mt-0.5">
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
                        <div className="text-[11px] truncate uppercase tracking-wide font-semibold">{slot.name}</div>
                        {hasItems && (
                          <div className={`text-[9px] mt-0.5 ${isSelected ? "text-slate-900 font-bold" : "text-slate-500"}`}>
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
                <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 font-mono mb-4">
                  Graduation ranking for slot: <span className="text-amber-500 font-serif">{selectedSlot}</span>
                </h3>

                {(() => {
                  const slotItems = getActiveGear().filter(it => it.slot === selectedSlot);
                  if (slotItems.length === 0) {
                    return (
                      <div className="bg-slate-950/20 border border-dashed border-slate-900/60 p-8 rounded-lg text-center font-mono">
                        <p className="text-slate-400 text-xs">No items in this slot to compare.</p>
                        <p className="text-[10px] text-slate-500 mt-1">Go to the "🛡 Gear" tab to add items for comparison.</p>
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
                            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-xs text-amber-500 font-serif shadow-inner">
                              #{rank}
                            </div>

                            <div className="pl-10">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900/40 pb-2 mb-3">
                                <div>
                                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                                    <span>{item.name}</span>
                                    {isBest && (
                                      <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider scale-90">
                                        Best Option
                                      </span>
                                    )}
                                  </h4>
                                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                    Main: {item.main}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs font-mono font-extrabold text-amber-400">
                                    +{entry.total.toFixed(2)} score contribution
                                  </div>
                                  {!isBest && (
                                    <div className="text-[10px] font-mono font-semibold text-rose-400">
                                      -{gapToBest.toFixed(2)} vs best
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {entry.subs.map((sub, sidx) => {
                                  const subDeltaString = sub.delta > 0 ? `+${sub.delta.toFixed(2)}` : "0.00";
                                  
                                  return (
                                    <div key={sidx} className="bg-slate-950/60 p-2 rounded border border-slate-900/60 flex items-center justify-between font-mono text-[10px]">
                                      <div className="truncate text-slate-500 flex items-center gap-1 shrink md:shrink-0 pr-1">
                                        <span>{sub.type}</span>
                                        {sub.isTuned && <span className="text-amber-500 text-[9px]">✦</span>}
                                      </div>
                                      <div className="text-right shrink-0">
                                        <div className="text-slate-300 font-semibold">{sub.val}</div>
                                        <div className="text-emerald-400 text-[9px] font-bold mt-0.5">
                                          +{subDeltaString} index
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

        {/* Tab Tune Cooldown Locks */}
        {activeTab === "tunecd" && (
          <div className="space-y-6">
            <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-6">
              <div className="mb-5 border-b border-amber-900/10 pb-3">
                <h2 className="text-sm font-extrabold text-amber-500 uppercase tracking-wider font-serif flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" /> Tune Cooldown Tracker (168 Hours Locks)
                </h2>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Track individual gear tuning locks. Each piece of gear locked via tune has a strict 168-hour (7 days) cooldown. Monitor real-time status and receive ready notifications here.
                </p>
              </div>

              {/* Cooldown Grid */}
              <div className="space-y-4 mb-8">
                {cooldowns.length === 0 ? (
                  <div className="bg-slate-950/20 border border-dashed border-slate-900/60 p-8 rounded-lg text-center font-mono text-xs text-slate-500">
                    No active Tuning Cooldown locks running.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cooldowns.map((cd) => {
                      const { isReady, displayTime, percent } = getCooldownStatus(cd);
                      
                      return (
                        <div
                          key={cd.id}
                          className={`p-4 rounded-xl border relative transition-all bg-[#14120f]/85 ${
                            isReady
                              ? "border-emerald-500/30 shadow-md shadow-emerald-500/5 bg-emerald-950/5"
                              : "border-slate-900 hover:border-slate-800 bg-slate-950/20 shadow-sm"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-100">{cd.itemName || "Unnamed Gear"}</span>
                                <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded">
                                  {cd.slot}
                                </span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500 block mt-1">
                                Started: {new Date(cd.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                if (confirm("Remove this cooldown track?")) {
                                  setCooldowns(prev => prev.filter(c => c.id !== cd.id));
                                }
                              }}
                              className="text-[10px] font-mono text-slate-500 hover:text-rose-400 p-1"
                              title="Delete tracker"
                            >
                              ✕ Remove
                            </button>
                          </div>

                          {/* Progress bar container */}
                          <div className="h-1.5 bg-slate-950 border border-slate-900/60 rounded-full overflow-hidden mb-2.5">
                            <div
                              style={{ width: `${percent}%` }}
                              className={`h-full transition-all duration-1000 ${
                                isReady
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />
                          </div>

                          {/* Status and text indicators */}
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-[10px] text-slate-500 font-mono">Tuning Lock Cooldown:</span>
                            {isReady ? (
                              <span className="text-emerald-400 flex items-center gap-1 font-bold animate-pulse text-[11px]">
                                <CheckCircle className="w-3.5 h-3.5 inline text-emerald-400" /> ✅ Ready to tune!
                              </span>
                            ) : (
                              <span className="text-amber-500 font-mono font-bold text-[11.5px] flex items-center gap-1">
                                ⏳ {displayTime} remaining
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add form footer inside box */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4">
                <span className="text-[10.5px] uppercase font-mono tracking-widest text-[#a19683] font-bold block mb-3">
                  ⏱ Start Tuning Cooldown Timer
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-[9px] uppercase font-mono text-slate-500 mb-1">
                      Choose Locked Slot:
                    </label>
                    <select
                      value={cdSlot}
                      onChange={(e) => setCdSlot(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {SLOTS.map(st => (
                        <option key={st.name} value={st.name}>{st.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-mono text-slate-500 mb-1">
                      Gear/Item Name:
                    </label>
                    <input
                      type="text"
                      value={cdItemName}
                      onChange={(e) => setCdItemName(e.target.value)}
                      placeholder="e.g. Dreamfount Bracers"
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!cdItemName.trim()) {
                        alert("Please specify a name for the locked gear!");
                        return;
                      }
                      const newCd: TuneCooldown = {
                        id: "cd-" + Date.now(),
                        slot: cdSlot,
                        itemName: cdItemName,
                        createdAt: Date.now(),
                        durationMs: TUNE_DURATION_MS
                      };
                      setCooldowns(prev => [...prev, newCd]);
                      setCdItemName("");
                      alert(`Successfully started lock countdown for slot "${cdSlot}"!`);
                    }}
                    className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-all shadow-sm flex items-center justify-center gap-1 shadow-amber-500/10"
                  >
                    ⏱ Start CD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Editor Overlay */}
        {isItemModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm">
            <div className="bg-[#141210] border border-amber-900/20 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-4 bg-slate-950/60 border-b border-amber-900/10 flex justify-between items-center shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 font-serif">
                  {editingItem ? "Edit Gear Item" : `Add New Class ${selectedSlot}`}
                </span>
                <button
                  onClick={() => setIsItemModalOpen(false)}
                  className="text-slate-400 hover:text-slate-200 text-sm font-mono"
                >
                  ✕
                </button>
              </div>

              {/* Form Content */}
              <div className="p-5 space-y-4 overflow-y-auto min-h-0 text-slate-300 text-xs text-left">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                    Slot
                  </label>
                  <input
                    type="text"
                    value={selectedSlot}
                    disabled
                    className="w-full bg-slate-950 border border-slate-900 rounded px-2.5 py-1.5 font-mono text-slate-400 cursor-not-allowed text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">
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
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">
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
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">
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
                </div>

                {/* Substat Rows */}
                <div className="space-y-2 border-t border-slate-900 pt-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
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
                            className="w-full bg-slate-950 border border-slate-900 rounded p-1.5 text-[11px] text-slate-350 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                            className="w-full bg-slate-950 border border-slate-900 rounded p-1.5 text-[11px] font-mono placeholder:text-slate-700"
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
                            <span className="text-[10px] font-mono text-amber-500 font-semibold">✦</span>
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
                      className="px-3 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 rounded text-xs border border-rose-500/10 font-bold transition-all"
                    >
                      Delete Item
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsItemModalOpen(false)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded text-xs border border-slate-800 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveItem}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition-all"
                  >
                    Save Changes
                  </button>
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

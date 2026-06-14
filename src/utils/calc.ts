import { PanelStats, TierConstants, SkillDefinition, RotationItem } from "../types";

export const TIERS: { [key: string]: TierConstants } = {
  "350|0.45": {
    def: 350,
    judgeRes: 0.45,
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
    name: "Tier 91 / Lv95 ★ Global (Season 3)",
  },
  "307|0.3": {
    def: 307,
    judgeRes: 0.3,
    foodMin: 70,
    foodMax: 140,
    baseMinOuter: 740,
    baseMaxOuter: 1370,
    baseCrit: 28,
    baseAff: 12,
    basePrec: 90,
    armoryMin: 90,
    armoryMax: 180,
    hiddenAttr: 110.2,
    pzPenBase: 8.8,
    pzDmgBase: 4.4,
    physRes: 20,
    attrRes: 24,
    name: "Tier 86 / Lv90",
  },
  "405|0.65": {
    def: 405,
    judgeRes: 0.65,
    foodMin: 120,
    foodMax: 240,
    baseMinOuter: 1054,
    baseMaxOuter: 1967.76,
    baseCrit: 34,
    baseAff: 18,
    basePrec: 98,
    armoryMin: 130,
    armoryMax: 260,
    hiddenAttr: 144.5,
    pzPenBase: 12.0,
    pzDmgBase: 6.0,
    physRes: 20,
    attrRes: 24,
    name: "Tier 96 / Lv100 (Lower)",
  },
  "405|0.65b": {
    def: 405,
    judgeRes: 0.65,
    foodMin: 120,
    foodMax: 240,
    baseMinOuter: 1012,
    baseMaxOuter: 1883.6,
    baseCrit: 34,
    baseAff: 18,
    basePrec: 98,
    armoryMin: 130,
    armoryMax: 260,
    hiddenAttr: 144.5,
    pzPenBase: 12.0,
    pzDmgBase: 6.0,
    physRes: 20,
    attrRes: 24,
    name: "Tier 96 / Lv100 (Upper)",
  },
  "559|1.15": {
    def: 559,
    judgeRes: 1.15,
    foodMin: 160,
    foodMax: 320,
    baseMinOuter: 1258.04,
    baseMaxOuter: 2374.02,
    baseCrit: 42,
    baseAff: 22,
    basePrec: 105,
    armoryMin: 170,
    armoryMax: 340,
    hiddenAttr: 175.0,
    pzPenBase: 15.0,
    pzDmgBase: 8.0,
    physRes: 20,
    attrRes: 24,
    name: "CN Lv105 (Reference)",
  },
};

export const SKILL_DB: { [key: string]: SkillDefinition } = {
  "Rope Dart Special (Rope Boat 6 + Soul Loss)": {
    outerRatio: 2.29866,
    fixed: 637,
    eleRatio: 3.44799,
    exCritDmg: 0.27,
    exDmg: 0.2,
    exPen: 0,
    isCharge: 0,
    type: "weapon",
    wType: "rope",
    force: "crit",
    special: "",
    csBonus: 0,
  },
  "Perfect Umbrella Q (0 Echo)": {
    outerRatio: 1.8084,
    fixed: 500,
    eleRatio: 2.7126,
    exCritDmg: 0.27,
    exDmg: 0.05,
    exPen: 0,
    isCharge: 0,
    type: "weapon",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Perfect Umbrella Q (2 Echo)": {
    outerRatio: 1.8084,
    fixed: 500,
    eleRatio: 2.7126,
    exCritDmg: 0.27,
    exDmg: 0.05,
    exPen: 4,
    isCharge: 0,
    type: "weapon",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Perfect Umbrella Q (4 Echo)": {
    outerRatio: 1.8084,
    fixed: 500,
    eleRatio: 2.7126,
    exCritDmg: 0.27,
    exDmg: 0.05,
    exPen: 8,
    isCharge: 0,
    type: "weapon",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Perfect Umbrella Q (5 Echo + Blossom Song)": {
    outerRatio: 1.8084,
    fixed: 500,
    eleRatio: 2.7126,
    exCritDmg: 0.27,
    exDmg: 0.25,
    exPen: 10,
    isCharge: 0,
    type: "weapon",
    wType: "umb",
    force: "crit",
    special: "spin",
    csBonus: 0.2,
  },
  "Perfect Umbrella Q (5 Echo)": {
    outerRatio: 1.8084,
    fixed: 500,
    eleRatio: 2.7126,
    exCritDmg: 0.27,
    exDmg: 0.05,
    exPen: 10,
    isCharge: 0,
    type: "weapon",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Umbrella Resonance (0 Echo)": {
    outerRatio: 0.54,
    fixed: 0,
    eleRatio: 0.81,
    exCritDmg: 0.27,
    exDmg: 0.25,
    exPen: 0,
    isCharge: 0,
    type: "xinfa",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Umbrella Resonance (2 Echo)": {
    outerRatio: 0.54,
    fixed: 0,
    eleRatio: 0.81,
    exCritDmg: 0.27,
    exDmg: 0.25,
    exPen: 4,
    isCharge: 0,
    type: "xinfa",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Umbrella Resonance (4 Echo)": {
    outerRatio: 0.54,
    fixed: 0,
    eleRatio: 0.81,
    exCritDmg: 0.27,
    exDmg: 0.25,
    exPen: 8,
    isCharge: 0,
    type: "xinfa",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Umbrella Resonance (5 Echo + Blossom Song)": {
    outerRatio: 0.54,
    fixed: 0,
    eleRatio: 0.81,
    exCritDmg: 0.27,
    exDmg: 0.45,
    exPen: 10,
    isCharge: 0,
    type: "xinfa",
    wType: "umb",
    force: "crit",
    special: "spin",
    csBonus: 0.2,
  },
  "Umbrella Resonance (5 Echo)": {
    outerRatio: 0.54,
    fixed: 0,
    eleRatio: 0.81,
    exCritDmg: 0.27,
    exDmg: 0.25,
    exPen: 10,
    isCharge: 0,
    type: "xinfa",
    wType: "umb",
    force: "",
    special: "spin",
    csBonus: 0.2,
  },
  "Dragon Rider Full Strike (5 Echo)": {
    outerRatio: 7.1054,
    fixed: 1220,
    eleRatio: 10.6581,
    exCritDmg: 0.27,
    exDmg: 0.05,
    exPen: 10,
    isCharge: 0,
    type: "mystic",
    wType: "single",
    force: "",
    special: "",
    csBonus: 0,
  },
  "Rope Dart Q (5 Echo)": {
    outerRatio: 3.1428,
    fixed: 869,
    eleRatio: 4.7143,
    exCritDmg: 0.27,
    exDmg: 0.05,
    exPen: 10,
    isCharge: 0,
    type: "weapon",
    wType: "rope",
    force: "",
    special: "",
    csBonus: 0.15,
  },
  "Rope Dart R1-3 (Boat 3 + Soul Loss)": {
    outerRatio: 1.1137,
    fixed: 309,
    eleRatio: 1.6706,
    exCritDmg: 0.27,
    exDmg: 0.1,
    exPen: 0,
    isCharge: 1,
    type: "weapon",
    wType: "rope",
    force: "",
    special: "",
    csBonus: 0,
  },
  "Rope Dart R4-5 (Boat 3 + Soul Loss)": {
    outerRatio: 0.7839,
    fixed: 218,
    eleRatio: 1.1759,
    exCritDmg: 0.27,
    exDmg: 0.1,
    exPen: 0,
    isCharge: 1,
    type: "weapon",
    wType: "rope",
    force: "",
    special: "",
    csBonus: 0,
  },
  "Rope Dart R6-7 (Boat 3 + Soul Loss)": {
    outerRatio: 1.7242,
    fixed: 478,
    eleRatio: 2.5862,
    exCritDmg: 0.27,
    exDmg: 0.15,
    exPen: 0,
    isCharge: 1,
    type: "weapon",
    wType: "rope",
    force: "",
    special: "",
    csBonus: 0,
  },
  "Flute Thousand Waves (AoE + Soul Loss)": {
    outerRatio: 3.974,
    fixed: 930,
    eleRatio: 5.961,
    exCritDmg: 0.27,
    exDmg: 0.1,
    exPen: 0,
    isCharge: 0,
    type: "mystic",
    wType: "group",
    force: "",
    special: "",
    csBonus: 0,
  },
  "Thousand Camps Lv6 (Soul Loss)": {
    outerRatio: 0.72,
    fixed: 200,
    eleRatio: 1.08,
    exCritDmg: 0,
    exDmg: 0,
    exPen: 0,
    isCharge: 0,
    type: "xinfa",
    wType: "N/A",
    force: "",
    special: "",
    csBonus: 0,
  },
};

export const ROTATION: RotationItem[] = [
  { name: "Rope Dart Special (Rope Boat 6 + Soul Loss)", count: 1, isDingyin: false, generalBonus: 0.465, yishui: 10, tiaozhan: 1 },
  { name: "Perfect Umbrella Q (0 Echo)", count: 1, isDingyin: true, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Perfect Umbrella Q (2 Echo)", count: 1, isDingyin: true, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Perfect Umbrella Q (4 Echo)", count: 1, isDingyin: true, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Perfect Umbrella Q (5 Echo + Blossom Song)", count: 4, isDingyin: true, generalBonus: 0.515, yishui: 10, tiaozhan: 1 },
  { name: "Perfect Umbrella Q (5 Echo)", count: 6, isDingyin: true, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Umbrella Resonance (0 Echo)", count: 2, isDingyin: true, generalBonus: 0.515, yishui: 10, tiaozhan: 1 },
  { name: "Umbrella Resonance (2 Echo)", count: 2, isDingyin: true, generalBonus: 0.515, yishui: 10, tiaozhan: 1 },
  { name: "Umbrella Resonance (4 Echo)", count: 2, isDingyin: true, generalBonus: 0.515, yishui: 10, tiaozhan: 1 },
  { name: "Umbrella Resonance (5 Echo + Blossom Song)", count: 7, isDingyin: true, generalBonus: 0.715, yishui: 10, tiaozhan: 1 },
  { name: "Umbrella Resonance (5 Echo)", count: 12, isDingyin: true, generalBonus: 0.515, yishui: 10, tiaozhan: 1 },
  { name: "Dragon Rider Full Strike (5 Echo)", count: 1, isDingyin: false, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Rope Dart Q (5 Echo)", count: 1, isDingyin: false, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Rope Dart R1-3 (Boat 3 + Soul Loss)", count: 1, isDingyin: false, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Rope Dart R4-5 (Boat 3 + Soul Loss)", count: 1, isDingyin: false, generalBonus: 0.315, yishui: 10, tiaozhan: 1 },
  { name: "Rope Dart R6-7 (Boat 3 + Soul Loss)", count: 1, isDingyin: false, generalBonus: 0.365, yishui: 10, tiaozhan: 1 },
  { name: "Flute Thousand Waves (AoE + Soul Loss)", count: 1, isDingyin: false, generalBonus: 0.265, yishui: 10, tiaozhan: 1 },
  { name: "Thousand Camps Lv6 (Soul Loss)", count: 2, isDingyin: false, generalBonus: 0, yishui: 10, tiaozhan: 1 },
];

export const ROTATION_TIME = 78.5;

export function calcSkill(
  rot: RotationItem,
  panel: PanelStats,
  tier: TierConstants,
  opts: { set: string; datang: boolean; yishui: boolean; buildKey?: string }
) {
  const sk = SKILL_DB[rot.name];
  if (!sk) return { perHit: 0, total: 0 };

  const set = opts.set;
  const judgeRes = tier.judgeRes;
  const physRes = tier.physRes;
  const attrRes = tier.attrRes;

  const jR = 1 + judgeRes;
  let critRateInput = panel.crit;
  if (set === "ivorybloom") {
    critRateInput += 5.0; 
  }
  let critEff = Math.min(0.8, critRateInput / 100 / jR);
  let affEff = Math.min(0.4, panel.aff / 100 / jR);
  let precEff = Math.min(1.0, 0.65 + Math.max(0, panel.prec - 65) / 100 / jR);
  let dirCrit = panel.dcrit / 100;
  let dirAff = panel.daff / 100;

  if (set === "eaglerise") precEff = Math.min(1.0, precEff + 10.8 / 100 / jR);
  if (set === "hawking") affEff = Math.min(0.4, affEff + 6.1 / 100 / jR);

  let pCrit: number, pAff: number, pPrec: number, pGraze: number;
  if (sk.force === "crit") {
    pCrit = 1;
    pAff = 0;
    pPrec = 1;
    pGraze = 0;
  } else {
    pPrec = precEff;
    pCrit = Math.min(critEff + dirCrit, 0.8 + dirCrit) * pPrec;
    pAff = affEff + dirAff;
    if (pCrit + pAff > 1) {
      pCrit = 1 - pAff;
    }
    pGraze = Math.max(0, (1 - pPrec) * (1 - pAff));
  }
  const pWhite = Math.max(0, 1 - pCrit - pAff - pGraze);

  let critMult = 1 + panel.critDmg / 100 + (sk.exCritDmg || 0);
  let affMult = 1 + panel.affDmg / 100;
  if (set === "stormrain") critMult += 0.1;
  if (opts.datang && sk.wType === "umb" && sk.type === "weapon") critMult += 0.15;

  let weapBonus = panel.allArts / 100;
  if (sk.wType === "umb") weapBonus += panel.umbBonus / 100;
  if (sk.wType === "rope") weapBonus += panel.ropeBonus / 100;
  if (sk.wType === "N/A") weapBonus = 0;

  const csBonus = set === "moonflare" ? 0.15 : 0;
  const spinBonus = sk.special === "spin" ? 0.12 : 0;

  let setDmgBonus = 0;
  if (set === "jadeware" && (opts.buildKey === "deluge" || opts.buildKey === "jade")) {
    setDmgBonus += 0.25;
  }

  const T =
    1 +
    rot.generalBonus +
    panel.bossDmg / 100 +
    weapBonus +
    panel.outerDmg / 100 +
    (sk.exDmg || 0) +
    csBonus +
    spinBonus +
    (panel.iwGeneralDmg || 0) / 100 +
    setDmgBonus;

  const totalOuterPen =
    panel.outerPen +
    (sk.exPen || 0) +
    (opts.yishui && rot.yishui ? rot.yishui : 0) -
    physRes;
  const F = totalOuterPen >= 0 ? totalOuterPen / 200 : totalOuterPen / 100;

  let atkMult = set === "formbend" ? 1.05 : 1.0;
  if (set === "hawking") atkMult = 1.1;
  let minO = panel.minOuter * atkMult;
  let maxO = panel.maxOuter * atkMult;
  if (maxO < minO) maxO = minO;
  const minO_e = Math.max(0, minO - tier.def);
  const maxO_e = Math.max(0, maxO - tier.def);
  const avgO_e = (minO_e + maxO_e) / 2;

  const dGl_O = minO_e * sk.outerRatio * (1 + F) * T;
  const dN_O = avgO_e * sk.outerRatio * (1 + F) * T;
  const dC_O = avgO_e * sk.outerRatio * (1 + F) * T * critMult;
  const dA_O = maxO_e * sk.outerRatio * (1 + F) * T * affMult;
  const dmgOuter = pGraze * dGl_O + pWhite * dN_O + pCrit * dC_O + pAff * dA_O;

  const fixedDmgBonus = 0.225;
  const fixed = sk.fixed * (1 + fixedDmgBonus);
  const dN_F = fixed * (1 + F) * T;
  const dC_F = fixed * (1 + F) * T * critMult;
  const dA_F = fixed * (1 + F) * T * affMult;
  const dmgFixed = (pGraze + pWhite) * dN_F + pCrit * dC_F + pAff * dA_F;

  const totalPzPen = panel.pzPen - attrRes;
  const Fpz = totalPzPen >= 0 ? totalPzPen / 200 : totalPzPen / 100;

  const pzMult = set === "formbend" ? 1.05 : 1.0;
  const minPz_e = Math.max(0, (panel.minPz + (panel.wuxiangMin || 0)) * pzMult - tier.def);
  const maxPz_e = Math.max(0, (panel.maxPz + (panel.wuxiangMax || 0)) * pzMult - tier.def);
  const avgPz_e = (minPz_e + maxPz_e) / 2;

  const pzDmgBonus = panel.pzDmg / 100;
  const dN_PZ = avgPz_e * sk.eleRatio * (1 + Fpz) * T * (1 + pzDmgBonus);
  const dC_PZ = avgPz_e * sk.eleRatio * (1 + Fpz) * T * (1 + pzDmgBonus) * critMult;
  const dA_PZ = maxPz_e * sk.eleRatio * (1 + Fpz) * T * (1 + pzDmgBonus) * affMult;
  const dmgPz = (pGraze + pWhite) * dN_PZ + pCrit * dC_PZ + pAff * dA_PZ;

  let perHit = dmgOuter + dmgFixed + dmgPz;

  if (rot.isDingyin && panel.attunedBonus > 0) {
    perHit *= 1 + panel.attunedBonus / 100;
  }

  const total = perHit * rot.count * (rot.tiaozhan || 1);
  return { perHit, total };
}

export function calcBaseline(tier: TierConstants) {
  // Reference "graduation" build for Global T91 — sourced from wherewindsmeetcalculator.com
  // These are PANEL stats (what you see on character screen), NOT including food
  // Food is added separately below matching how the game works
  const ref: PanelStats = {
    minOuter: 1745,   // panel min phys atk (NOT including food)
    maxOuter: 4046,   // panel max phys atk (NOT including food)
    outerPen: 56.3,
    minPz: 402.9,
    maxPz: 721.0,
    pzPen: 29.6,
    pzDmg: 11.8,
    prec: 100,
    crit: 90.9,
    aff: 10.3,
    dcrit: 8.7,
    daff: 0,
    critDmg: 58,
    affDmg: 35,
    outerDmg: 5.6,
    bossDmg: 7.6,
    umbBonus: 7.4,
    ropeBonus: 0,
    allArts: 7.2,
    attunedBonus: 0,
    wuxiangMin: 0,
    wuxiangMax: 0,
    set: "moonflare",
  };

  let total = 0;
  ROTATION.forEach((sk) => {
    total += calcSkill(sk, ref, tier, {
      set: "moonflare",
      datang: false,
      yishui: true,   // Song of Yi active (standard)
    }).total;
  });
  return total;
}

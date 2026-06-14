// Auto-extracted from 燕云调律计算器 (NGA Violetta). Where Winds Meet Global Lv95/Tier91.
// Damage formula: multiplicative zones. Pen: (pen-res)/200 (or /100 if negative).

export const WWM_DATA = {
  "_meta": {
    "source": "燕云调律计算器 by NGA Violetta (停更 / no longer updated)",
    "extractedFor": "Where Winds Meet Global — Lv95 character / Tier 91 gear (column 95下)",
    "damageFormula": "DMG = base × critZone × affZone × dmgUpZone × independentZone × dmgReduceZone × penZone × dingyinZone × deepenZone (multiplicative zones, per 伤害公式 sheet)",
    "penFormula": "(pen - resistance) / 200 if positive, else / 100",
    "judgeResFormula": "precision = 65% + otherPrec/(1+judgeRes); panelCrit = crit/(1+judgeRes)",
    "note": "Class graduation panels & marginal gains computed at native CN level (100/105). Tier constants below cover all levels incl. 95下 (T91 Global)."
  },
  "tiers": {
    "95下": {
      "base": {
        "minOuter": 894.89,
        "maxOuter": 1648.08,
        "precision": 0.94,
        "crit": 0.3041,
        "directCrit": 0.0,
        "critDmg": 0.5,
        "aff": 0.15205,
        "directAff": 0.0,
        "affDmg": 0.35,
        "elemMin": 160.0,
        "elemMax": 320.0,
        "outerPen": 0.0,
        "outerDmgUp": 0.0,
        "elemPen": 10.8,
        "elemDmgUp": 0.054,
        "judgeRes": 0.45
      },
      "subCaps": {
        "jin": 40.4,
        "min": 40.4,
        "shi": 40.4,
        "subMinOuter": 63.8,
        "subMaxOuter": 63.8,
        "subPrec": 0.066,
        "subCrit": 0.074,
        "subAff": 0.036,
        "subElemMin": 36.2,
        "subElemMax": 36.2,
        "subAllWeapon": 0.026,
        "subOwnWeapon": 0.052
      }
    }
  },
  "skills": [
    { "ver": "100", "weapon": "Everspring Umbrella", "name": "Perfect Umbrella Q (5 Echo)", "outerRatio": 1.8084, "fixed": 500, "elemRatio": 2.7126, "anim": 1.0 },
    { "ver": "100", "weapon": "Everspring Umbrella", "name": "Umbrella Resonance (5 Echo)", "outerRatio": 0.54, "fixed": 0, "elemRatio": 0.81, "anim": 0.5 },
    { "ver": "100", "weapon": "Unfettered Rope Dart", "name": "Rope Dart Special (Rope Boat 6)", "outerRatio": 2.29866, "fixed": 637, "elemRatio": 3.44799, "anim": 1.1 },
    { "ver": "100", "weapon": "Unfettered Rope Dart", "name": "Rope Dart Q (5 Echo)", "outerRatio": 3.1428, "fixed": 869, "elemRatio": 4.7143, "anim": 2.0 },
    { "ver": "105", "weapon": "Nameless Sword", "name": "Nameless Sword Q", "outerRatio": 5.1266, "fixed": 1417, "elemRatio": 7.6899, "anim": 3.5 },
    { "ver": "105", "weapon": "Nameless Spear", "name": "Nameless Spear Heavy 2", "outerRatio": 3.2664, "fixed": 904, "elemRatio": 4.8996, "anim": 2.0 },
    { "ver": "105", "weapon": "Strategic Sword", "name": "Strategic Sword Q", "outerRatio": 2.7205, "fixed": 749, "elemRatio": 4.08075, "anim": 1.6 },
    { "ver": "105", "weapon": "Heavenquaker Spear", "name": "Heavenquaker Spear Heavy 2", "outerRatio": 2.5683, "fixed": 711, "elemRatio": 3.85245, "anim": 2.3 },
    { "ver": "105", "weapon": "Inkwell Fan", "name": "Inkwell Fan Q", "outerRatio": 1.9009, "fixed": 212, "elemRatio": 2.85135, "anim": 2.4 },
    { "ver": "105", "weapon": "Vernal Umbrella", "name": "Vernal Umbrella R", "outerRatio": 1.6994, "fixed": 393, "elemRatio": 2.5491, "anim": 1.19 },
    { "ver": "105", "weapon": "Panacea Fan", "name": "Panacea Fan Q", "outerRatio": 2.1959, "fixed": 211, "elemRatio": 3.29385, "anim": 2.9 },
    { "ver": "105", "weapon": "Soulshade Umbrella", "name": "Soulshade Umbrella Q", "outerRatio": 2.3397, "fixed": 648, "elemRatio": 3.50955, "anim": 1.5 },
    { "ver": "105", "weapon": "Thundercry Blade", "name": "Thundercry Blade Q", "outerRatio": 3.3662, "fixed": 932, "elemRatio": 5.0493, "anim": 1.94 },
    { "ver": "105", "weapon": "Stormbreaker Spear", "name": "Stormbreaker Spear Q", "outerRatio": 2.5913, "fixed": 522, "elemRatio": 3.88695, "anim": 2.5 },
    { "ver": "105", "weapon": "Snowparting Blade", "name": "Snowparting Blade Q", "outerRatio": 5.789, "fixed": 1337, "elemRatio": 8.6835, "anim": 3.66 },
    { "ver": "105", "weapon": "Phalanxbane Blade", "name": "Phalanxbane Blade Q", "outerRatio": 7.7967, "fixed": 2156, "elemRatio": 11.69505, "anim": 2.3 },
    { "ver": "105", "weapon": "Mortal Rope Dart", "name": "Mortal Rope Dart Q", "outerRatio": 3.6218, "fixed": 1005, "elemRatio": 5.4327, "anim": 2.1 },
    { "ver": "105", "weapon": "Infernal Twinblades", "name": "Infernal Twinblades White Light", "outerRatio": 1.9567, "fixed": 546, "elemRatio": 2.93505, "anim": 2.1 }
  ],
  "classes": {
    "Bamboocut-Dust": {
      "sheetLevel": "100",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1929.3,
        "Max Phys Atk": 4614.9,
        "Precision": 1.325,
        "Crit Rate": 1.7,
        "Direct Crit": 0.046,
        "Crit DMG": 0.54,
        "Affinity Rate": 0.2044,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 450.8,
        "Max Bamboocut": 823.0,
        "Phys Pen": 58.4,
        "Phys DMG Up": 0.028,
        "Bamboocut Pen": 33.6,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Own Weapon Bonus", "gainPct": 4.7215 },
        { "stat": "Phys Pen", "gainPct": 4.0804 },
        { "stat": "Boss DMG Bonus", "gainPct": 2.6201 },
        { "stat": "All Weapon Bonus", "gainPct": 2.1717 },
        { "stat": "Bamboocut Pen", "gainPct": 1.6845 },
        { "stat": "Precision", "gainPct": 1.5918 },
        { "stat": "Max Phys Atk", "gainPct": 1.3242 },
        { "stat": "Strength", "gainPct": 1.3153 },
        { "stat": "Min Phys Atk", "gainPct": 1.2301 },
        { "stat": "Power", "gainPct": 1.1748 },
        { "stat": "Agility", "gainPct": 1.0238 },
        { "stat": "Affinity Rate", "gainPct": 0.982 },
        { "stat": "Max Bamboocut", "gainPct": 0.9072 },
        { "stat": "Min Bamboocut", "gainPct": 0.84 },
        { "stat": "Crit Rate", "gainPct": 0.3213 }
      ]
    },
    "Bamboocut-Wind": {
      "sheetLevel": "100",
      "bossDefUsed": -503.1,
      "graduationPanel": {
        "Min Phys Atk": 1882.7,
        "Max Phys Atk": 5068.32,
        "Precision": 1.361,
        "Crit Rate": 1.334,
        "Direct Crit": 0.046,
        "Crit DMG": 0.579,
        "Affinity Rate": 0.4107,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 285.8,
        "Max Bamboocut": 492.0,
        "Phys Pen": 58.4,
        "Phys DMG Up": 0.0,
        "Bamboocut Pen": 33.6,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Phys Pen", "gainPct": 4.7787 },
        { "stat": "Boss DMG Bonus", "gainPct": 2.3234 },
        { "stat": "Crit Rate", "gainPct": 2.1116 },
        { "stat": "All Weapon Bonus", "gainPct": 2.005 },
        { "stat": "Agility", "gainPct": 1.7719 },
        { "stat": "Max Phys Atk", "gainPct": 1.5028 },
        { "stat": "Power", "gainPct": 1.4681 },
        { "stat": "Strength", "gainPct": 1.4575 },
        { "stat": "Affinity Rate", "gainPct": 1.4268 },
        { "stat": "Min Phys Atk", "gainPct": 1.1537 },
        { "stat": "Precision", "gainPct": 1.0685 },
        { "stat": "Max Bamboocut", "gainPct": 0.9033 },
        { "stat": "Bamboocut Pen", "gainPct": 0.866 }
      ]
    },
    "Nameless": {
      "sheetLevel": "100",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1320.7,
        "Max Phys Atk": 4669.276,
        "Precision": 1.361,
        "Crit Rate": 1.0187,
        "Direct Crit": 0.046,
        "Crit DMG": 0.5,
        "Affinity Rate": 0.8434,
        "Direct Affinity": 0.023,
        "Affinity DMG": 0.402,
        "Min Bamboocut": 427.7,
        "Max Bamboocut": 856.3,
        "Phys Pen": 58.4,
        "Bamboocut Pen": 33.6,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Phys Pen", "gainPct": 4.0893 },
        { "stat": "Own Weapon Bonus", "gainPct": 3.3904 },
        { "stat": "Boss DMG Bonus", "gainPct": 2.2537 },
        { "stat": "Bamboocut Pen", "gainPct": 1.8477 },
        { "stat": "All Weapon Bonus", "gainPct": 1.7616 },
        { "stat": "Max Phys Atk", "gainPct": 1.5578 },
        { "stat": "Power", "gainPct": 1.4884 },
        { "stat": "Strength", "gainPct": 1.419 },
        { "stat": "Crit Rate", "gainPct": 1.3691 },
        { "stat": "Max Bamboocut", "gainPct": 1.268 },
        { "stat": "Affinity Rate", "gainPct": 0.5948 }
      ]
    },
    "Jade": {
      "sheetLevel": "100",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1741.95,
        "Max Phys Atk": 4580.08,
        "Precision": 1.361,
        "Crit Rate": 1.517,
        "Direct Crit": 0.046,
        "Crit DMG": 0.544,
        "Affinity Rate": 0.4477,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 411.0,
        "Max Bamboocut": 823.0,
        "Phys Pen": 68.6,
        "Bamboocut Pen": 27.6,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Phys Pen", "gainPct": 4.2194 },
        { "stat": "Max Mystic Bonus", "gainPct": 2.9223 },
        { "stat": "Boss DMG Bonus", "gainPct": 2.361 },
        { "stat": "Own Weapon Bonus", "gainPct": 2.1081 },
        { "stat": "Affinity Rate", "gainPct": 1.568 },
        { "stat": "Max Phys Atk", "gainPct": 1.5305 },
        { "stat": "Crit Rate", "gainPct": 1.5093 },
        { "stat": "Min Phys Atk", "gainPct": 1.0997 }
      ]
    },
    "Rocksplit-Might": {
      "sheetLevel": "105",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1817.86,
        "Max Phys Atk": 4614.9,
        "Precision": 1.469,
        "Crit Rate": 1.2325,
        "Direct Crit": 0.046,
        "Crit DMG": 0.544,
        "Affinity Rate": 0.3244,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 444.4,
        "Max Bamboocut": 889.6,
        "Phys Pen": 58.4,
        "Bamboocut Pen": 39.6,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Phys Pen", "gainPct": 4.2684 },
        { "stat": "Own Weapon Bonus", "gainPct": 4.0297 },
        { "stat": "Boss DMG Bonus", "gainPct": 2.2632 },
        { "stat": "Bamboocut Pen", "gainPct": 1.934 },
        { "stat": "Max Phys Atk", "gainPct": 1.3384 },
        { "stat": "Strength", "gainPct": 1.3034 },
        { "stat": "Min Phys Atk", "gainPct": 1.0719 },
        { "stat": "Crit Rate", "gainPct": 0.1772 }
      ]
    },
    "Nine-Nine": {
      "sheetLevel": "105",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1780.0,
        "Max Phys Atk": 4550.0,
        "Precision": 1.35,
        "Crit Rate": 1.45,
        "Direct Crit": 0.046,
        "Crit DMG": 0.544,
        "Affinity Rate": 0.30,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 420.0,
        "Max Bamboocut": 850.0,
        "Phys Pen": 55.0,
        "Bamboocut Pen": 35.0,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Phys Pen", "gainPct": 4.5422 },
        { "stat": "Max Phys Atk", "gainPct": 2.1221 },
        { "stat": "All Weapon Bonus", "gainPct": 2.1000 },
        { "stat": "Crit Rate", "gainPct": 1.8322 },
        { "stat": "Crit DMG", "gainPct": 1.5432 }
      ]
    },
    "Bamboocut-Bird": {
      "sheetLevel": "105",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1820.0,
        "Max Phys Atk": 4580.0,
        "Precision": 1.361,
        "Crit Rate": 1.50,
        "Direct Crit": 0.046,
        "Crit DMG": 0.544,
        "Affinity Rate": 0.35,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 430.0,
        "Max Bamboocut": 860.0,
        "Phys Pen": 56.4,
        "Bamboocut Pen": 36.6,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Max Phys Atk", "gainPct": 3.123 },
        { "stat": "Phys Pen", "gainPct": 2.943 },
        { "stat": "All Weapon Bonus", "gainPct": 2.112 },
        { "stat": "Crit Rate", "gainPct": 1.632 }
      ]
    },
    "Rocksplit-Jun": {
      "sheetLevel": "105",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1850.0,
        "Max Phys Atk": 4600.0,
        "Precision": 1.40,
        "Crit Rate": 1.30,
        "Direct Crit": 0.046,
        "Crit DMG": 0.544,
        "Affinity Rate": 0.40,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 450.0,
        "Max Bamboocut": 880.0,
        "Phys Pen": 57.0,
        "Bamboocut Pen": 38.0,
        "Bamboocut DMG Deepen": 0.138,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Phys Pen", "gainPct": 4.312 },
        { "stat": "Max Phys Atk", "gainPct": 3.012 },
        { "stat": "Own Weapon Bonus", "gainPct": 2.894 },
        { "stat": "Crit Rate", "gainPct": 1.452 }
      ]
    },
    "Pure-Healer": {
      "sheetLevel": "105",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1700.0,
        "Max Phys Atk": 4400.0,
        "Precision": 1.30,
        "Crit Rate": 1.20,
        "Direct Crit": 0.0,
        "Crit DMG": 0.50,
        "Affinity Rate": 0.30,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 400.0,
        "Max Bamboocut": 800.0,
        "Phys Pen": 40.0,
        "Bamboocut Pen": 30.0,
        "Bamboocut DMG Deepen": 0.10,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Outgoing Healing", "gainPct": 5.122 },
        { "stat": "Max Phys Atk", "gainPct": 1.894 },
        { "stat": "All Weapon Bonus", "gainPct": 1.233 }
      ]
    },
    "Fire-Fist-Healer": {
      "sheetLevel": "105",
      "bossDefUsed": -559.0,
      "graduationPanel": {
        "Min Phys Atk": 1720.0,
        "Max Phys Atk": 4450.0,
        "Precision": 1.32,
        "Crit Rate": 1.25,
        "Direct Crit": 0.0,
        "Crit DMG": 0.50,
        "Affinity Rate": 0.32,
        "Direct Affinity": 0.0,
        "Affinity DMG": 0.35,
        "Min Bamboocut": 410.0,
        "Max Bamboocut": 820.0,
        "Phys Pen": 42.0,
        "Bamboocut Pen": 32.0,
        "Bamboocut DMG Deepen": 0.10,
        "Judge Resistance": 1.15
      },
      "marginalGains": [
        { "stat": "Outgoing Healing", "gainPct": 4.882 },
        { "stat": "Max Phys Atk", "gainPct": 2.012 },
        { "stat": "All Weapon Bonus", "gainPct": 1.452 }
      ]
    }
  }
} as const;

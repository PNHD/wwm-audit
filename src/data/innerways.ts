export interface InnerWay {
  id: string;
  name: string;
  cat: string;
  desc: string;
  stat: {
    outerPen?: number;
    pzPen?: number;
    critDmg?: number;
    affDmg?: number;
    outerDmg?: number;
    generalDmg?: number;
    pzDmg?: number;
  };
  recommended?: boolean;
  note?: string;
}

export const INNER_WAYS: InnerWay[] = [
  // BAMBOOCUT-WIND
  {
    id: "echoes_of_oblivion",
    name: "Echoes of Oblivion",
    cat: "BAMBOOCUT-WIND",
    desc: "Infernal Twinblades Light Attacks apply Sin/Karma; ignore 10% Phys Def and 10% Bamboocut Resistance on affected targets.",
    stat: { outerPen: 10, pzPen: 10 }
  },
  {
    id: "riptide_reflex",
    name: "Riptide Reflex",
    cat: "BAMBOOCUT-WIND",
    desc: "Control Skill → reduce current MA Skill CD by 1s (once per 10s).",
    stat: {}
  },
  {
    id: "breaking_point",
    name: "Breaking Point",
    cat: "BAMBOOCUT-WIND",
    desc: "Crit hit on Exhausted enemy → stack Disintegration (max 3, 3s): +10 Phys Pen, +5% Crit DMG per stack.",
    stat: { outerPen: 10, critDmg: 5 }
  },
  {
    id: "vendetta",
    name: "Vendetta",
    cat: "BAMBOOCUT-WIND",
    desc: "Guided Blade's Vendetta Token lasts 5s longer, restores 20 Token of Gratitude.",
    stat: {}
  },

  // BELLSTRIKE-SPLENDOR
  {
    id: "sword_morph",
    name: "Sword Morph",
    cat: "BELLSTRIKE-SPLENDOR",
    desc: "Noname Sword Charged Skill gains extra sword energy at stage 2; each Endurance consumed = +1% DMG up to 20%.",
    stat: { generalDmg: 10 }
  },
  {
    id: "battle_anthem",
    name: "Battle Anthem",
    cat: "BELLSTRIKE-SPLENDOR",
    desc: "Charged Skills deal +10% DMG vs bosses.",
    stat: { generalDmg: 10 }
  },
  {
    id: "wildfire_spark",
    name: "Wildfire Spark",
    cat: "BELLSTRIKE-SPLENDOR",
    desc: "Refunds 3.5% Endurance consumed.",
    stat: {}
  },
  {
    id: "mountains_might",
    name: "Mountain's Might",
    cat: "BELLSTRIKE-SPLENDOR",
    desc: "Noname Spear Qiankun's Lock grants Endless Gale: 20% Endurance cost reduction for 5s.",
    stat: {}
  },

  // BELLSTRIKE-UMBRA
  {
    id: "sword_horizon",
    name: "Sword Horizon",
    cat: "BELLSTRIKE-UMBRA",
    desc: "After Strategic Sword MA/Special/Charged Skill, perfect timing → Crisscrossing Swords follow-up; at 5 Bleed stacks removes all and deals high Bleed DMG.",
    stat: { generalDmg: 8 }
  },
  {
    id: "insightful_strike",
    name: "Insightful Strike",
    cat: "BELLSTRIKE-UMBRA",
    desc: "Affinity DMG generates Focus; full Focus → Concentration 10s: +10% Affinity DMG, 5% chance to reduce DMG taken by 40% on hit.",
    stat: { affDmg: 10 }
  },
  {
    id: "adaptive_steel",
    name: "Adaptive Steel",
    cat: "BELLSTRIKE-UMBRA",
    desc: "Gain a Martial Skill based on blade weapon (Sword: 10s CD, Dual Blades: 25s CD).",
    stat: {}
  },
  {
    id: "wolfchasers_art",
    name: "Wolfchaser's Art",
    cat: "BELLSTRIKE-UMBRA",
    desc: "Reduces Sorrow Without Wine buff combo requirement from 5/10 to 4/8; 20%-100% chance to increase combo count on boss with Bleed.",
    stat: {}
  },

  // SILKBIND-DELUGE
  {
    id: "royal_remedy",
    name: "Royal Remedy",
    cat: "SILKBIND-DELUGE",
    desc: "Panacea Fan Cloudburst Healing +10%; gain 1 Dewdrop per HoT tick while in range.",
    stat: {}
  },
  {
    id: "mending_loom",
    name: "Mending Loom",
    cat: "SILKBIND-DELUGE",
    desc: "Soulshade Umbrella Echoing Grow restores 5 Dewdrop + heals 10% Max HP per 100 Dewdrop consumed.",
    stat: {}
  },
  {
    id: "esoteric_revival",
    name: "Esoteric Revival",
    cat: "SILKBIND-DELUGE",
    desc: "Panacea Fan Resurrection healing +50% on revived target.",
    stat: {}
  },
  {
    id: "restoring_blossom",
    name: "Restoring Blossom",
    cat: "SILKBIND-DELUGE",
    desc: "Critical heal → 1 stack Nurturing (3s, max 3): +2% healing received/stack.",
    stat: {}
  },

  // SILKBIND-JADE
  {
    id: "blossom_barrage",
    name: "Blossom Barrage",
    cat: "SILKBIND-JADE",
    desc: "Vernal Umbrella Spring Sorrow holds 2 stacks; hitting target applies Combo: Ballistic Skills deal +10% DMG for 8s.",
    stat: { generalDmg: 5 }
  },
  {
    id: "star_reacher",
    name: "Star Reacher",
    cat: "SILKBIND-JADE",
    desc: "Knocking enemy airborne → +10% Phys Attack Bonus for 8s.",
    stat: { outerDmg: 10 }
  },
  {
    id: "thunderous_bloom",
    name: "Thunderous Bloom",
    cat: "SILKBIND-JADE",
    desc: "Move 15m in 3s → Spring Thunder: next 3 Heavy/Airborne Heavy Attacks gain +15% DMG (12s, once per 15s).",
    stat: { generalDmg: 8 }
  },
  {
    id: "flying_gourds",
    name: "Flying Gourds",
    cat: "SILKBIND-JADE",
    desc: "Inkwell Fan Peak's Springless Silence gains 2 charges, +3s CD.",
    stat: {}
  },

  // STONESPLIT-MIGHT
  {
    id: "exquisite_scenery",
    name: "Exquisite Scenery",
    cat: "STONESPLIT-MIGHT",
    desc: "Thundercry Blade successful defense → counterattack (once per 10s); Varied Combo hit restores 1 Battle Will bar.",
    stat: {}
  },
  {
    id: "trapped_beast",
    name: "Trapped Beast",
    cat: "STONESPLIT-MIGHT",
    desc: "Taking DMG below 30% HP → Cornered Beast shield (30% Max HP, 4s, once per 300s).",
    stat: {}
  },
  {
    id: "art_of_resistance",
    name: "Art of Resistance",
    cat: "STONESPLIT-MIGHT",
    desc: "HP shield duration and bonus effects +4s.",
    stat: {}
  },
  {
    id: "rock_solid",
    name: "Rock Solid",
    cat: "STONESPLIT-MIGHT",
    desc: "Stormbreaker Spear Roar of Storm DMG Reduction +20% after taunting boss (+5% for non-boss, max 20%); while active -10% damage dealt.",
    stat: {}
  },

  // GENERAL
  {
    id: "seasonal_edge",
    name: "Seasonal Edge",
    cat: "GENERAL",
    desc: "After Dual-Weapon Skill, gain one of four offensive bonuses.",
    stat: { generalDmg: 4 },
    recommended: true
  },
  {
    id: "morale_chant",
    name: "Morale Chant",
    cat: "GENERAL",
    desc: "80% chance to gain Yi River on attack/heal (once per 2s): +1% Phys DMG and healing (8s, max 5 stacks).",
    stat: { outerDmg: 5 },
    recommended: true
  },
  {
    id: "divine_roulette",
    name: "Divine Roulette",
    cat: "GENERAL",
    desc: "Successful deflection → one of three buffs for next skill (10s, once per 30s).",
    stat: { generalDmg: 3 }
  },
  {
    id: "fury_harvest",
    name: "Fury Harvest",
    cat: "GENERAL",
    desc: "Recovery actions 50% chance to grant 1 bonus Vitality.",
    stat: {}
  },
  {
    id: "vital_leech",
    name: "Vital Leech",
    cat: "GENERAL",
    desc: "Exhaustion Execution restores HP = 8% of DMG dealt.",
    stat: {}
  },
  {
    id: "bitter_seasons",
    name: "Bitter Seasons",
    cat: "GENERAL",
    desc: "10% chance to apply Poison (5s, 1/s); Poison: -0.6% target Phys Def (10s, max 5 stacks).",
    stat: { outerPen: 6 }
  },
  {
    id: "invigorated_warrior",
    name: "Invigorated Warrior",
    cat: "GENERAL",
    desc: "+5% all DMG and healing; disabled 5s after being hit; hit also grants Cage: +5% DMG taken.",
    stat: { generalDmg: 5 },
    recommended: true
  },
  {
    id: "evasive_charge",
    name: "Evasive Charge",
    cat: "GENERAL",
    desc: "Perfect Dodge → 50% chance to refund 100% Endurance consumed.",
    stat: {}
  },
  {
    id: "fivefold_bleed",
    name: "Fivefold Bleed",
    cat: "GENERAL",
    desc: "10% chance to apply Weeping Blood (5s, max 5 stacks); at 5 stacks deals piercing DMG.",
    stat: { generalDmg: 2 }
  },
  {
    id: "shadow_assault",
    name: "Shadow Assault",
    cat: "GENERAL",
    desc: "Touch of Death ambush max range +1.5m.",
    stat: {}
  },
  {
    id: "steadfast_stance",
    name: "Steadfast Stance",
    cat: "GENERAL",
    desc: "Less likely to stagger from attacks (invalid vs boss/player).",
    stat: {}
  },
  {
    id: "evening_snow",
    name: "Evening Snow",
    cat: "GENERAL",
    desc: "Within 12s of entering combat, if HP < 60%: Snow Vision 4s restoring 2% HP + 600 HP/s (once per 300s).",
    stat: {}
  },
  {
    id: "wind_beneath_wings",
    name: "Wind Beneath Wings",
    cat: "GENERAL",
    desc: "Skywalk Dash Endurance -10%; +30% Move Speed 3s after landing; restore bonus HP on kill.",
    stat: {}
  }
];

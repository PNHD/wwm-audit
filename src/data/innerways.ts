export interface InnerWayTier {
  tier: number;
  effect: string;
  stat: {
    outerPen?: number;
    pzPen?: number;
    critDmg?: number;
    affDmg?: number;
    outerDmg?: number;
    generalDmg?: number;
    pzDmg?: number;
    crit?: number;
    aff?: number;
    dcrit?: number;
    prec?: number;
  };
}

export interface InnerWay {
  id: string;
  name: string;
  cat: string;
  desc: string;
  tiers: InnerWayTier[];   // tier 1-6 effects
  recommended?: boolean;
  note?: string;
}

export const INNER_WAYS: InnerWay[] = [
  // ── BAMBOOCUT-DUST ──
  {
    id: "phantom_rally", name: "Phantom Rally", cat: "BAMBOOCUT-DUST",
    desc: "The First Umbrella from Scarlet Spin summons a Phantom Umbrella, then every 3rd throw summons another. Perfect Catch or summoning a Phantom Umbrella triggers Resonance on all Phantom Umbrellas, dealing area damage.",
    tiers: [
      { tier: 1, effect: "Phantom Resonance deal area DMG: +2% General DMG", stat: { generalDmg: 2 } },
      { tier: 2, effect: "Phantom Resonance deal area DMG: +4% General DMG", stat: { generalDmg: 4 } },
      { tier: 3, effect: "Phantom Resonance deal area DMG: +5.5% General DMG", stat: { generalDmg: 5.5 } },
      { tier: 4, effect: "Phantom Resonance deal area DMG: +7% General DMG", stat: { generalDmg: 7 } },
      { tier: 5, effect: "Phantom Resonance deal area DMG: +8% General DMG", stat: { generalDmg: 8 } },
      { tier: 6, effect: "Area resonance range +20%, damage +8% General DMG", stat: { generalDmg: 8 } },
    ],
    recommended: true, note: "Top recommendation for Bamboocut-Dust AoE clearing capability."
  },
  {
    id: "song_of_tang", name: "Song of Tang", cat: "BAMBOOCUT-DUST",
    desc: "Hitting with Martial Art Skills applies Tang Song for 4s (max 5 stacks, 1 per second). Each stack: +2% Crit DMG above 50% HP, or +2% Life Drain below 50% HP.",
    tiers: [
      { tier: 1, effect: "Each stack: +0.5% Crit DMG (effectively +2.5% Crit DMG)", stat: { critDmg: 2.5 } },
      { tier: 2, effect: "Each stack: +1% Crit DMG (effectively +5% Crit DMG)", stat: { critDmg: 5 } },
      { tier: 3, effect: "Each stack: +1.5% Crit DMG (effectively +7.5% Crit DMG)", stat: { critDmg: 7.5 } },
      { tier: 4, effect: "Each stack: +1.8% Crit DMG (effectively +9% Crit DMG)", stat: { critDmg: 9 } },
      { tier: 5, effect: "Each stack: +2% Crit DMG above 50% HP (effectively +10% Crit DMG)", stat: { critDmg: 10 } },
      { tier: 6, effect: "Yi River resonance triggers: +10% Crit DMG + 3% Life Drain below 50% HP", stat: { critDmg: 10 } },
    ],
    recommended: true, note: "Extremely strong Crit DMG scaling above 50% HP for Bamboocut-Dust."
  },
  {
    id: "light_anew", name: "Light Anew", cat: "BAMBOOCUT-DUST",
    desc: "When hitting 3+ enemies at once, apply Candle Flicker for 3s (max 5 stacks): -4% enemy Move Speed, +2% damage taken per stack.",
    tiers: [
      { tier: 1, effect: "Each stack: +0.5% enemy damage taken (effectively +2.5% General DMG)", stat: { generalDmg: 2.5 } },
      { tier: 2, effect: "Each stack: +1% enemy damage taken (effectively +5% General DMG)", stat: { generalDmg: 5 } },
      { tier: 3, effect: "Each stack: +1.5% enemy damage taken (effectively +7.5% General DMG)", stat: { generalDmg: 7.5 } },
      { tier: 4, effect: "Each stack: +1.8% enemy damage taken (effectively +9% General DMG)", stat: { generalDmg: 9 } },
      { tier: 5, effect: "Each stack: +2% enemy damage taken (effectively +10% General DMG)", stat: { generalDmg: 10 } },
      { tier: 6, effect: "Each stack: +2% enemy damage taken + enemy ATK reduced by 5%", stat: { generalDmg: 10 } },
    ],
    recommended: true, note: "Great force-multiplier in mob scenarios and multiple boss targets."
  },
  {
    id: "towline_sweep", name: "Towline Sweep", cat: "BAMBOOCUT-DUST",
    desc: "Gain 50 Tokens of Gratitude after Soul Sweep. In Soulbound state, each Piercing Dart sweeping combo hit applies 2 stacks Soulbreak, and first hit pulls enemies forward.",
    tiers: [
      { tier: 1, effect: "Gain 10 Tokens after Soul Sweep", stat: {} },
      { tier: 2, effect: "Gain 20 Tokens after Soul Sweep", stat: {} },
      { tier: 3, effect: "Gain 30 Tokens after Soul Sweep", stat: {} },
      { tier: 4, effect: "Gain 40 Tokens after Soul Sweep", stat: {} },
      { tier: 5, effect: "Gain 50 Tokens of Gratitude after Soul Sweep", stat: {} },
      { tier: 6, effect: "Gain 50 Tokens + pulling power threshold increased by 100%", stat: {} },
    ],
    recommended: false, note: "Utility and combo accelerator — no standalone offensive stat."
  },

  // ── BAMBOOCUT-WIND ──
  {
    id: "echoes_of_oblivion", name: "Echoes of Oblivion", cat: "BAMBOOCUT-WIND",
    desc: "Infernal Twinblades Light Attacks apply Sin/Karma. Ignore target's Phys Def and Bamboocut Resistance on affected targets.",
    tiers: [
      { tier: 1, effect: "Ignore 2% Phys Def and 2% Bamboocut Res", stat: { outerPen: 2, pzPen: 2 } },
      { tier: 2, effect: "Ignore 4% Phys Def and 4% Bamboocut Res", stat: { outerPen: 4, pzPen: 4 } },
      { tier: 3, effect: "Ignore 6% Phys Def and 6% Bamboocut Res", stat: { outerPen: 6, pzPen: 6 } },
      { tier: 4, effect: "Ignore 8% Phys Def and 8% Bamboocut Res", stat: { outerPen: 8, pzPen: 8 } },
      { tier: 5, effect: "Ignore 10% Phys Def and 10% Bamboocut Res", stat: { outerPen: 10, pzPen: 10 } },
      { tier: 6, effect: "Ignore 10% Def/Res + spread Sin across nearby targets on defeat", stat: { outerPen: 10, pzPen: 10 } },
    ],
    recommended: false, note: "Bamboocut-Wind specific core inner way."
  },
  {
    id: "riptide_reflex", name: "Riptide Reflex", cat: "BAMBOOCUT-WIND",
    desc: "Hitting enemy with Control Skill reduces current MA Skill CD by 1s (once per 10s).",
    tiers: [
      { tier: 1, effect: "-0.5s CD on control hit", stat: {} },
      { tier: 2, effect: "-0.7s CD on control hit", stat: {} },
      { tier: 3, effect: "-1s CD on control hit", stat: {} },
      { tier: 4, effect: "-1s CD on control hit (10s CD), plus secondary slot CD reduced", stat: {} },
      { tier: 5, effect: "-1s CD on control hit, secondary slots CD reduced by 1.5s", stat: {} },
      { tier: 6, effect: "-1s CD on control hit (8s CD), full skill slot coverage", stat: {} },
    ],
    recommended: false, note: "Great rotation accelerator but provides no flat raw stats."
  },
  {
    id: "breaking_point", name: "Breaking Point", cat: "BAMBOOCUT-WIND",
    desc: "Crit hit on Exhausted enemy → stack Disintegration (3s, max 3): +5 Physical Penetration and +5% Critical Damage per Collapse stack.",
    tiers: [
      { tier: 1, effect: "Each stack: +1.5 Phys Pen, +1.5% Crit DMG (effectively +4.5 / +4.5% max)", stat: { outerPen: 4.5, critDmg: 4.5 } },
      { tier: 2, effect: "Each stack: +2.5 Phys Pen, +2.5% Crit DMG (effectively +7.5 / +7.5% max)", stat: { outerPen: 7.5, critDmg: 7.5 } },
      { tier: 3, effect: "Each stack: +3.5 Phys Pen, +3.5% Crit DMG (effectively +10.5 / +10.5% max)", stat: { outerPen: 10.5, critDmg: 10.5 } },
      { tier: 4, effect: "Each stack: +4 Phys Pen, +4% Crit DMG (effectively +12 / +12% max)", stat: { outerPen: 12, critDmg: 12 } },
      { tier: 5, effect: "Each stack: +5 Phys Pen, +5% Crit DMG (effectively +15 / +15% max)", stat: { outerPen: 15, critDmg: 15 } },
      { tier: 6, effect: "Each stack: +5 Phys Pen, +5% Crit DMG + Collapse duration +2s", stat: { outerPen: 15, critDmg: 15 } },
    ],
    recommended: true, note: "Strong physical pen and crit scaling upon target exhaustion."
  },
  {
    id: "vendetta", name: "Vendetta", cat: "BAMBOOCUT-WIND",
    desc: "Guided Blade Vendetta Token lasts longer and restores Token of Gratitude.",
    tiers: [
      { tier: 1, effect: "Token lasts +1.0s, +4 Gratitude", stat: {} },
      { tier: 2, effect: "Token lasts +2.0s, +8 Gratitude", stat: {} },
      { tier: 3, effect: "Token lasts +3.0s, +12 Gratitude", stat: {} },
      { tier: 4, effect: "Token lasts +4.0s, +16 Gratitude", stat: {} },
      { tier: 5, effect: "Token lasts +5.0s, +20 Gratitude", stat: {} },
      { tier: 6, effect: "Token lasts +5.0s, +20 Gratitude, first slash ignores defenses", stat: {} },
    ],
    recommended: false, note: "Mainly utility for Guided Blade wind layouts."
  },

  // ── BELLSTRIKE-SPLENDOR ──
  {
    id: "sword_morph", name: "Sword Morph", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Noname Sword Charged Skill: extra sword energy at 2nd stage. Each Endurance consumed = +1% DMG, max 20%.",
    tiers: [
      { tier: 1, effect: "Max +8% General DMG based on stamina spent", stat: { generalDmg: 8 } },
      { tier: 2, effect: "Max +10% General DMG based on stamina spent", stat: { generalDmg: 10 } },
      { tier: 3, effect: "Max +12% General DMG based on stamina spent", stat: { generalDmg: 12 } },
      { tier: 4, effect: "Max +15% General DMG based on stamina spent", stat: { generalDmg: 15 } },
      { tier: 5, effect: "Max +20% General DMG based on stamina spent", stat: { generalDmg: 20 } },
      { tier: 6, effect: "Stamina penalty reduced + max +20% General DMG", stat: { generalDmg: 20 } },
    ],
    recommended: false, note: "Core for Bellstrike Splendor charged build rotation."
  },
  {
    id: "battle_anthem", name: "Battle Anthem", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Charged Skills deal bonus damage against all bosses.",
    tiers: [
      { tier: 1, effect: "Charged Skills +2% DMG vs Bosses", stat: { generalDmg: 2 } },
      { tier: 2, effect: "Charged Skills +4% DMG vs Bosses", stat: { generalDmg: 4 } },
      { tier: 3, effect: "Charged Skills +6% DMG vs Bosses", stat: { generalDmg: 6 } },
      { tier: 4, effect: "Charged Skills +8% DMG vs Bosses", stat: { generalDmg: 8 } },
      { tier: 5, effect: "Charged Skills +10% DMG vs Bosses", stat: { generalDmg: 10 } },
      { tier: 6, effect: "Charged Skills +10% DMG + parry rate +10%", stat: { generalDmg: 10 } },
    ],
    recommended: false, note: "Pure PvE damage multiplier for heavier sword rotations."
  },
  {
    id: "wildfire_spark", name: "Wildfire Spark", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Consuming Endurance with Sword morph triggers explosion dealing Bamboocut damage and boosts elemental attack.",
    tiers: [
      { tier: 1, effect: "+3% Bamboocut (PZ) DMG Bonus", stat: { pzDmg: 3 } },
      { tier: 2, effect: "+6% Bamboocut (PZ) DMG Bonus", stat: { pzDmg: 6 } },
      { tier: 3, effect: "+9% Bamboocut (PZ) DMG Bonus", stat: { pzDmg: 9 } },
      { tier: 4, effect: "+12% Bamboocut (PZ) DMG Bonus", stat: { pzDmg: 12 } },
      { tier: 5, effect: "+15% Bamboocut (PZ) DMG Bonus", stat: { pzDmg: 15 } },
      { tier: 6, effect: "Explosion radius +25% + +15% PZ DMG Bonus", stat: { pzDmg: 15 } },
    ],
    recommended: false, note: "Bellstrike-Splendor element booster."
  },
  {
    id: "mountains_might", name: "Mountain's Might", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Increase Critical Damage when health is above 70%.",
    tiers: [
      { tier: 1, effect: "+5% Crit DMG above 70% Max HP", stat: { critDmg: 5 } },
      { tier: 2, effect: "+7% Crit DMG above 70% Max HP", stat: { critDmg: 7 } },
      { tier: 3, effect: "+10% Crit DMG above 70% Max HP", stat: { critDmg: 10 } },
      { tier: 4, effect: "+12% Crit DMG above 70% Max HP", stat: { critDmg: 12 } },
      { tier: 5, effect: "+15% Crit DMG above 70% Max HP", stat: { critDmg: 15 } },
      { tier: 6, effect: "+15% Crit DMG + threshold reduced physically to 60% HP", stat: { critDmg: 15 } },
    ],
    recommended: false, note: "Good for maintaining high health thresholds."
  },
  {
    id: "sandswirl_tail", name: "Sandswirl Tail", cat: "BELLSTRIKE-SPLENDOR",
    desc: "When in Brocade Carp form (Moonleap Morph), sprinting and jumping consume less endurance.",
    tiers: [
      { tier: 1, effect: "Sprinting cost -10% in Carp form", stat: {} },
      { tier: 2, effect: "Sprinting cost -15% in Carp form", stat: {} },
      { tier: 3, effect: "Sprinting cost -20% in Carp form", stat: {} },
      { tier: 4, effect: "Sprinting and jumping cost -20% in Carp form", stat: {} },
      { tier: 5, effect: "Sprinting and jumping cost -30% in Carp form", stat: {} },
      { tier: 6, effect: "Endurance costs minimized + jump height increased by 15%", stat: {} },
    ],
    recommended: false, note: "Purely mobility and stamina utility."
  },

  // ── BELLSTRIKE-UMBRA ──
  {
    id: "sword_horizon", name: "Sword Horizon", cat: "BELLSTRIKE-UMBRA",
    desc: "Noname Sword Art skills gain physical penetration.",
    tiers: [
      { tier: 1, effect: "+2 Physical Penetration", stat: { outerPen: 2 } },
      { tier: 2, effect: "+4 Physical Penetration", stat: { outerPen: 4 } },
      { tier: 3, effect: "+6 Physical Penetration", stat: { outerPen: 6 } },
      { tier: 4, effect: "+8 Physical Penetration", stat: { outerPen: 8 } },
      { tier: 5, effect: "+10 Physical Penetration", stat: { outerPen: 10 } },
      { tier: 6, effect: "+10 Physical Penetration + physical damage range broadened", stat: { outerPen: 10 } },
    ],
    recommended: false, note: "Penetration supplement for dark sword layouts."
  },
  {
    id: "adaptive_steel", name: "Adaptive Steel", cat: "BELLSTRIKE-UMBRA",
    desc: "Successfully counter-attacking or parrying increases Critical Damage for 5s.",
    tiers: [
      { tier: 1, effect: "+5% Crit DMG after counters", stat: { critDmg: 5 } },
      { tier: 2, effect: "+7% Crit DMG after counters", stat: { critDmg: 7 } },
      { tier: 3, effect: "+10% Crit DMG after counters", stat: { critDmg: 10 } },
      { tier: 4, effect: "+12% Crit DMG after counters", stat: { critDmg: 12 } },
      { tier: 5, effect: "+15% Crit DMG after counters", stat: { critDmg: 15 } },
      { tier: 6, effect: "Crit DMG +15% and counter CD reduced by 1.5s", stat: { critDmg: 15 } },
    ],
    recommended: false, note: "Sustained crit booster for active gameplay."
  },
  {
    id: "insightful_strike", name: "Insightful Strike", cat: "BELLSTRIKE-UMBRA",
    desc: "Reveals boss weakness, increasing precision rate.",
    tiers: [
      { tier: 1, effect: "+2% Precision Rate", stat: { prec: 2 } },
      { tier: 2, effect: "+4% Precision Rate", stat: { prec: 4 } },
      { tier: 3, effect: "+6% Precision Rate", stat: { prec: 6 } },
      { tier: 4, effect: "+8% Precision Rate", stat: { prec: 8 } },
      { tier: 5, effect: "+10% Precision Rate", stat: { prec: 10 } },
      { tier: 6, effect: "+10% Precision Rate + boss weakness visible longer", stat: { prec: 10 } },
    ],
    recommended: false, note: "Accuracy calibration for hard PvE fights."
  },
  {
    id: "wolfchasers_art", name: "Wolfchaser's Art", cat: "BELLSTRIKE-UMBRA",
    desc: "Combo requirement reduced to 4/8 (previously 5/10). 60%/70%/80%/90%/100% chance to +1 combo count based on Bleed stacks.",
    tiers: [
      { tier: 1, effect: "Combo caps 4/8, 60% chance for extra stack", stat: {} },
      { tier: 2, effect: "Combo caps 4/8, 70% chance for extra stack", stat: {} },
      { tier: 3, effect: "Combo caps 4/8, 80% chance for extra stack", stat: {} },
      { tier: 4, effect: "Combo caps 4/8, 90% chance for extra stack", stat: {} },
      { tier: 5, effect: "Combo caps 4/8, 100% chance for extra stack", stat: {} },
      { tier: 6, effect: "Combo caps 4/8, 100% chance for extra stack + Bleed damage +10%", stat: {} },
    ],
    recommended: false, note: "Greatly optimizes bleed stacks and synergy."
  },

  // ── GENERAL ──
  {
    id: "seasonal_edge", name: "Seasonal Edge", cat: "GENERAL",
    desc: "After casting a Dual-Weapon Skill, gain one of four offensive bonuses (Crit Rate, Pen, DMG Bonus, or ATK).",
    tiers: [
      { tier: 1, effect: "One random offensive buff: +1% General DMG", stat: { generalDmg: 1 } },
      { tier: 2, effect: "One random offensive buff: +2% General DMG", stat: { generalDmg: 2 } },
      { tier: 3, effect: "One random offensive buff: +2.5% General DMG", stat: { generalDmg: 2.5 } },
      { tier: 4, effect: "One random offensive buff: +3% General DMG", stat: { generalDmg: 3 } },
      { tier: 5, effect: "One random offensive buff: +4% General DMG", stat: { generalDmg: 4 } },
      { tier: 6, effect: "Two dual blessings simultaneously: +5% General DMG", stat: { generalDmg: 5 } },
    ],
    recommended: true, note: "Highly reliable dual-wielding catalyst."
  },
  {
    id: "morale_chant", name: "Morale Chant", cat: "GENERAL",
    desc: "100% chance to gain 1 stack of Yi River when attacking or healing (once per 2s): +2 Physical Penetration and +1% DMG and healing per stack (12s, max 5 stacks)",
    tiers: [
      { tier: 1, effect: "Max 2 stacks: +0.4 Phys Pen, +0.2% DMG per stack (Max: +2.0 Pen, +1.0% DMG)", stat: { outerPen: 2.0, outerDmg: 1.0 } },
      { tier: 2, effect: "Max 3 stacks: +0.8 Phys Pen, +0.4% DMG per stack (Max: +4.0 Pen, +2.0% DMG)", stat: { outerPen: 4.0, outerDmg: 2.0 } },
      { tier: 3, effect: "Max 4 stacks: +1.2 Phys Pen, +0.6% DMG per stack (Max: +6.0 Pen, +3.0% DMG)", stat: { outerPen: 6.0, outerDmg: 3.0 } },
      { tier: 4, effect: "Max 5 stacks: +1.6 Phys Pen, +0.8% DMG per stack (Max: +8.0 Pen, +4.0% DMG)", stat: { outerPen: 8.0, outerDmg: 4.0 } },
      { tier: 5, effect: "Max 5 stacks: +2.0 Phys Pen, +1.0% DMG per stack (Max: +10.0 Pen, +5.0% DMG)", stat: { outerPen: 10.0, outerDmg: 5.0 } },
      { tier: 6, effect: "Max 5 stacks: +2.0 Phys Pen, +1.0% DMG + healing boost +15% (Max: +10.0 Pen, +5.0% DMG)", stat: { outerPen: 10.0, outerDmg: 5.0 } },
    ],
    recommended: true, note: "Excellent consistent physical penetrations and global physical damage boost."
  },
  {
    id: "vital_leech", name: "Vital Leech", cat: "GENERAL",
    desc: "Restores health when dealing damage to bleeding or debuffed targets.",
    tiers: [
      { tier: 1, effect: "Regen 0.5% max HP on hit (once per 5s)", stat: {} },
      { tier: 2, effect: "Regen 1.0% max HP on hit (once per 5s)", stat: {} },
      { tier: 3, effect: "Regen 1.5% max HP on hit (once per 4s)", stat: {} },
      { tier: 4, effect: "Regen 1.8% max HP on hit (once per 4s)", stat: {} },
      { tier: 5, effect: "Regen 2.0% max HP on hit (once per 3s)", stat: {} },
      { tier: 6, effect: "Regen 2.0% max HP + cleansing one debuff every 6s", stat: {} },
    ],
    recommended: false, note: "Survival tool."
  },
  {
    id: "invigorated_warrior", name: "Invigorated Warrior", cat: "GENERAL",
    desc: "Increases attack power when above 80% maximum health.",
    tiers: [
      { tier: 1, effect: "+1% General DMG above 80% HP", stat: { generalDmg: 1 } },
      { tier: 2, effect: "+2% General DMG above 80% HP", stat: { generalDmg: 2 } },
      { tier: 3, effect: "+3% General DMG above 80% HP", stat: { generalDmg: 3 } },
      { tier: 4, effect: "+4% General DMG above 80% HP", stat: { generalDmg: 4 } },
      { tier: 5, effect: "+5% General DMG above 80% HP", stat: { generalDmg: 5 } },
      { tier: 6, effect: "+5% General DMG above 70% low threshold", stat: { generalDmg: 5 } },
    ],
    recommended: false, note: "Ideal for clean play styles."
  },
  {
    id: "bitter_seasons", name: "Bitter Seasons", cat: "GENERAL",
    desc: "Increase elemental resistance and reduce crowd control duration.",
    tiers: [
      { tier: 1, effect: "Resist +5, CC -5%", stat: {} },
      { tier: 2, effect: "Resist +10, CC -10%", stat: {} },
      { tier: 3, effect: "Resist +15, CC -15%", stat: {} },
      { tier: 4, effect: "Resist +20, CC -20%", stat: {} },
      { tier: 5, effect: "Resist +25, CC -25%", stat: {} },
      { tier: 6, effect: "Resist +25 + immune to slow and freeze constraints", stat: {} },
    ],
    recommended: false, note: "Purely defense and CC utility."
  },
  {
    id: "evasive_charge", name: "Evasive Charge", cat: "GENERAL",
    desc: "Dodge moves consume less endurance and generate temporary shield.",
    tiers: [
      { tier: 1, effect: "Stamina -5%, shield +1% HP", stat: {} },
      { tier: 2, effect: "Stamina -10%, shield +2% HP", stat: {} },
      { tier: 3, effect: "Stamina -15%, shield +3% HP", stat: {} },
      { tier: 4, effect: "Stamina -20%, shield +4% HP", stat: {} },
      { tier: 5, effect: "Stamina -25%, shield +5% HP", stat: {} },
      { tier: 6, effect: "Stamina -25%, shield +5% HP + invincibility frames extended", stat: {} },
    ],
    recommended: false, note: "Survival enhancement."
  },
  {
    id: "fury_harvest", name: "Fury Harvest", cat: "GENERAL",
    desc: "Defeating an enemy instantly restores a percentage of dual-weapon cooldowns.",
    tiers: [
      { tier: 1, effect: "Cooldown refund 10% after slay", stat: {} },
      { tier: 2, effect: "Cooldown refund 15% after slay", stat: {} },
      { tier: 3, effect: "Cooldown refund 20% after slay", stat: {} },
      { tier: 4, effect: "Cooldown refund 25% after slay", stat: {} },
      { tier: 5, effect: "Cooldown refund 30% after slay", stat: {} },
      { tier: 6, effect: "Cooldown refund 30% + heal +5% HP on kill", stat: {} },
    ],
    recommended: false, note: "Primarily mob wave catalyst."
  },
  {
    id: "divine_roulette", name: "Divine Roulette", cat: "GENERAL",
    desc: "Perfect deflection grants random combat blessings.",
    tiers: [
      { tier: 1, effect: "Gain combat blessing: +1.5% DMG", stat: { generalDmg: 1.5 } },
      { tier: 2, effect: "Gain combat blessing: +2% DMG", stat: { generalDmg: 2 } },
      { tier: 3, effect: "Gain combat blessing: +2.5% DMG", stat: { generalDmg: 2.5 } },
      { tier: 4, effect: "Gain combat blessing: +3% DMG", stat: { generalDmg: 3 } },
      { tier: 5, effect: "Gain combat blessing: +3.5% DMG", stat: { generalDmg: 3.5 } },
      { tier: 6, effect: "Dual combat blessings: +4% DMG", stat: { generalDmg: 4 } },
    ],
    recommended: false, note: "Good for active deflecting play styles."
  },
  {
    id: "evening_snow", name: "Evening Snow", cat: "GENERAL",
    desc: "Increases Frost and Water damage during winter seasons or snowy weather.",
    tiers: [
      { tier: 1, effect: "Snowy/Winter state: +2% PZ DMG Bonus", stat: { pzDmg: 2 } },
      { tier: 2, effect: "Snowy/Winter state: +4% PZ DMG Bonus", stat: { pzDmg: 4 } },
      { tier: 3, effect: "Snowy/Winter state: +6% PZ DMG Bonus", stat: { pzDmg: 6 } },
      { tier: 4, effect: "Snowy/Winter state: +8% PZ DMG Bonus", stat: { pzDmg: 8 } },
      { tier: 5, effect: "Snowy/Winter state: +10% PZ DMG Bonus", stat: { pzDmg: 10 } },
      { tier: 6, effect: "Snowy/Winter state: +10% PZ DMG + cold accumulation +15%", stat: { pzDmg: 10 } },
    ],
    recommended: false, note: "Seasonal/environment conditional damage multiplier."
  },
  {
    id: "fivefold_bleed", name: "Fivefold Bleed", cat: "GENERAL",
    desc: "Physical attacks have a high chance to apply Bleeding status.",
    tiers: [
      { tier: 1, effect: "+10% bleed application chance", stat: {} },
      { tier: 2, effect: "+15% bleed application chance", stat: {} },
      { tier: 3, effect: "+20% bleed application chance", stat: {} },
      { tier: 4, effect: "+25% bleed application chance", stat: {} },
      { tier: 5, effect: "+30% bleed application chance", stat: {} },
      { tier: 6, effect: "+30% bleed application chance + bleed damage increases by +12%", stat: {} },
    ],
    recommended: false, note: "Increases bleed status coverage."
  },
  {
    id: "shadow_assault", name: "Shadow Assault", cat: "GENERAL",
    desc: "Enhances Touch of Death, increasing range by 1.5m and damage by 10%. Restores HP equal to 10% of damage dealt on hit.",
    tiers: [
      { tier: 1, effect: "Touch of Death range +0.3m, +2% General DMG", stat: { generalDmg: 2 } },
      { tier: 2, effect: "Touch of Death range +0.6m, +4% General DMG", stat: { generalDmg: 4 } },
      { tier: 3, effect: "Touch of Death range +0.9m, +6% General DMG", stat: { generalDmg: 6 } },
      { tier: 4, effect: "Touch of Death range +1.2m, +8% General DMG", stat: { generalDmg: 8 } },
      { tier: 5, effect: "Touch of Death range +1.5m, +10% General DMG", stat: { generalDmg: 10 } },
      { tier: 6, effect: "Touch of Death range +1.5m, +10% General DMG + HP lifesteal 10% on hit", stat: { generalDmg: 10 } },
    ],
    recommended: false, note: "Gives range + damage and lifesteal safety values."
  },
  {
    id: "steadfast_stance", name: "Steadfast Stance", cat: "GENERAL",
    desc: "Gradually builds up physical defense during continuous combat stances.",
    tiers: [
      { tier: 1, effect: "Phys DEF +10 every 5 seconds (max 50)", stat: {} },
      { tier: 2, effect: "Phys DEF +15 every 5 seconds (max 75)", stat: {} },
      { tier: 3, effect: "Phys DEF +20 every 5 seconds (max 100)", stat: {} },
      { tier: 4, effect: "Phys DEF +25 every 5 seconds (max 125)", stat: {} },
      { tier: 5, effect: "Phys DEF +30 every 5 seconds (max 150)", stat: {} },
      { tier: 6, effect: "Phys DEF +30 every 4 seconds (max 180) + resistance tier increase", stat: {} },
    ],
    recommended: false, note: "Defense passive only."
  },
  {
    id: "wind_beneath_wings", name: "Wind Beneath Wings", cat: "GENERAL",
    desc: "Continuous running and sprinting increases movement speed.",
    tiers: [
      { tier: 1, effect: "+2% speed boost during sprint", stat: {} },
      { tier: 2, effect: "+4% speed boost during sprint", stat: {} },
      { tier: 3, effect: "+6% speed boost during sprint", stat: {} },
      { tier: 4, effect: "+8% speed boost during sprint", stat: {} },
      { tier: 5, effect: "+10% speed boost during sprint", stat: {} },
      { tier: 6, effect: "+12% speed boost during sprint + endurance recovery rates +8%", stat: {} },
    ],
    recommended: false, note: "Sprint speed catalyst."
  },

  // ── SILKBIND-DELUGE ──
  {
    id: "royal_remedy", name: "Royal Remedy", cat: "SILKBIND-DELUGE",
    desc: "Panacea Fan healing is increased by 15% and has a wider area.",
    tiers: [
      { tier: 1, effect: "Healing +3%", stat: {} },
      { tier: 2, effect: "Healing +6%", stat: {} },
      { tier: 3, effect: "Healing +9%", stat: {} },
      { tier: 4, effect: "Healing +12%", stat: {} },
      { tier: 5, effect: "Healing +15%", stat: {} },
      { tier: 6, effect: "Healing +15% + range increased by 20%", stat: {} },
    ],
    recommended: false, note: "Excellent multiplier for healer layouts."
  },
  {
    id: "restoring_blossom", name: "Restoring Blossom", cat: "SILKBIND-DELUGE",
    desc: "Deploying a medicine circle cleanses negative statuses from allies every 3s.",
    tiers: [
      { tier: 1, effect: "Cleanse cycle 6s", stat: {} },
      { tier: 2, effect: "Cleanse cycle 5s", stat: {} },
      { tier: 3, effect: "Cleanse cycle 4s", stat: {} },
      { tier: 4, effect: "Cleanse cycle 3s", stat: {} },
      { tier: 5, effect: "Cleanse cycle 3s + minor health regen", stat: {} },
      { tier: 6, effect: "Cleanse cycle 2.5s + cleansing generates minor stamina", stat: {} },
    ],
    recommended: false, note: "Tactical cleansing utility."
  },
  {
    id: "esoteric_revival", name: "Esoteric Revival", cat: "SILKBIND-DELUGE",
    desc: "Allies revived under medicine effects gain temporary physical attack bonus.",
    tiers: [
      { tier: 1, effect: "Attack bonus +2% after revive", stat: {} },
      { tier: 2, effect: "Attack bonus +4% after revive", stat: {} },
      { tier: 3, effect: "Attack bonus +6% after revive", stat: {} },
      { tier: 4, effect: "Attack bonus +8% after revive", stat: {} },
      { tier: 5, effect: "Attack bonus +10% after revive", stat: {} },
      { tier: 6, effect: "Attack bonus +10% and invulnerability period +1s after revive", stat: {} },
    ],
    recommended: false, note: "Raid support clutch."
  },
  {
    id: "mending_loom", name: "Mending Loom", cat: "SILKBIND-DELUGE",
    desc: "Heals generate energy threads that automatically shield nearby teammates.",
    tiers: [
      { tier: 1, effect: "Threads shield teammates for 0.5% HP", stat: {} },
      { tier: 2, effect: "Threads shield teammates for 1.0% HP", stat: {} },
      { tier: 3, effect: "Threads shield teammates for 1.5% HP", stat: {} },
      { tier: 4, effect: "Threads shield teammates for 1.8% HP", stat: {} },
      { tier: 5, effect: "Threads shield teammates for 2.0% HP", stat: {} },
      { tier: 6, effect: "Threads shield teammates for 2.0% HP + continuous regen", stat: {} },
    ],
    recommended: false, note: "Healing shield enhancement."
  },

  // ── SILKBIND-JADE ──
  {
    id: "blossom_barrage", name: "Blossom Barrage", cat: "SILKBIND-JADE",
    desc: "Increases the maximum stacks of floral essence, adding affinity rate bonus.",
    tiers: [
      { tier: 1, effect: "+2% Affinity Rate", stat: { aff: 2 } },
      { tier: 2, effect: "+4% Affinity Rate", stat: { aff: 4 } },
      { tier: 3, effect: "+6% Affinity Rate", stat: { aff: 6 } },
      { tier: 4, effect: "+8% Affinity Rate", stat: { aff: 8 } },
      { tier: 5, effect: "+10% Affinity Rate", stat: { aff: 10 } },
      { tier: 6, effect: "+10% Affinity Rate + essence decay slowed by 25%", stat: { aff: 10 } },
    ],
    recommended: false, note: "Dynamic elemental scaling booster."
  },
  {
    id: "star_reacher", name: "Star Reacher", cat: "SILKBIND-JADE",
    desc: "Aerie and celestial Tagged attacks gain extra critical multipliers.",
    tiers: [
      { tier: 1, effect: "+3% Crit DMG bonus", stat: { critDmg: 3 } },
      { tier: 2, effect: "+6% Crit DMG bonus", stat: { critDmg: 6 } },
      { tier: 3, effect: "+9% Crit DMG bonus", stat: { critDmg: 9 } },
      { tier: 4, effect: "+12% Crit DMG bonus", stat: { critDmg: 12 } },
      { tier: 5, effect: "+15% Crit DMG bonus", stat: { critDmg: 15 } },
      { tier: 6, effect: "+15% Crit DMG + tag conversion rates +5%", stat: { critDmg: 15 } },
    ],
    recommended: false, note: "Targeted crit damage developer."
  },
  {
    id: "thunderous_bloom", name: "Thunderous Bloom", cat: "SILKBIND-JADE",
    desc: "Dodge counters trigger chain lightning that scales with total affinity damage.",
    tiers: [
      { tier: 1, effect: "+3% Affinity DMG Bonus", stat: { affDmg: 3 } },
      { tier: 2, effect: "+6% Affinity DMG Bonus", stat: { affDmg: 6 } },
      { tier: 3, effect: "+9% Affinity DMG Bonus", stat: { affDmg: 9 } },
      { tier: 4, effect: "+12% Affinity DMG Bonus", stat: { affDmg: 12 } },
      { tier: 5, effect: "+15% Affinity DMG Bonus", stat: { affDmg: 15 } },
      { tier: 6, effect: "+15% Affinity DMG + chain targets increased by 2", stat: { affDmg: 15 } },
    ],
    recommended: false, note: "Reaction damage multiplier."
  },
  {
    id: "flying_gourds", name: "Flying Gourds", cat: "SILKBIND-JADE",
    desc: "Throws multiple medicine gourds that deal dual attribute physical damage.",
    tiers: [
      { tier: 1, effect: "Throws 2 gourds, base damage +5%", stat: {} },
      { tier: 2, effect: "Throws 2 gourds, base damage +10%", stat: {} },
      { tier: 3, effect: "Throws 3 gourds, base damage +10%", stat: {} },
      { tier: 4, effect: "Throws 3 gourds, base damage +15%", stat: {} },
      { tier: 5, effect: "Throws 4 gourds, base damage +15%", stat: {} },
      { tier: 6, effect: "Throws 4 gourds, base damage +20% + splash area poison applies", stat: {} },
    ],
    recommended: false, note: "Active offensive medicine projectile utility."
  },

  // ── STONESPLIT-MIGHT ──
  {
    id: "exquisite_scenery", name: "Exquisite Scenery", cat: "STONESPLIT-MIGHT",
    desc: "After successful parry with Alas Blade Art, can activate a special Parry Counter: free Tier 3 Heavy Attack Charged Skill (once per 10s)",
    tiers: [
      { tier: 1, effect: "Parry Counter enabled (15s CD)", stat: {} },
      { tier: 2, effect: "Parry Counter enabled (13s CD)", stat: {} },
      { tier: 3, effect: "Parry Counter enabled (11s CD)", stat: {} },
      { tier: 4, effect: "Parry Counter enabled (10s CD)", stat: {} },
      { tier: 5, effect: "Parry Counter enabled (10s CD), damage +10%", stat: {} },
      { tier: 6, effect: "Parry Counter enabled (8s CD), damage +15%", stat: {} },
    ],
    recommended: false, note: "Counter tool (Alas Blade Art parry trigger)."
  },
  {
    id: "rock_solid", name: "Rock Solid", cat: "STONESPLIT-MIGHT",
    desc: "Standing still increases physical shield and crowd control protection.",
    tiers: [
      { tier: 1, effect: "DEF +5, stagger resistance +5%", stat: {} },
      { tier: 2, effect: "DEF +10, stagger resistance +10%", stat: {} },
      { tier: 3, effect: "DEF +15, stagger resistance +15%", stat: {} },
      { tier: 4, effect: "DEF +20, stagger resistance +20%", stat: {} },
      { tier: 5, effect: "DEF +25, stagger resistance +25%", stat: {} },
      { tier: 6, effect: "DEF +25, staggering immune during channel times", stat: {} },
    ],
    recommended: false, note: "Pure guard utility."
  },
  {
    id: "art_of_resistance", name: "Art of Resistance", cat: "STONESPLIT-MIGHT",
    desc: "Increases maximum physical attack proportional to missing health.",
    tiers: [
      { tier: 1, effect: "+1% General DMG bonus based on lost health", stat: { generalDmg: 1 } },
      { tier: 2, effect: "+2.5% General DMG bonus based on lost health", stat: { generalDmg: 2.5 } },
      { tier: 3, effect: "+4% General DMG bonus based on lost health", stat: { generalDmg: 4 } },
      { tier: 4, effect: "+5.5% General DMG bonus based on lost health", stat: { generalDmg: 5.5 } },
      { tier: 5, effect: "+8% General DMG bonus based on lost health", stat: { generalDmg: 8 } },
      { tier: 6, effect: "+8% General DMG + stun resist tier increases at low health", stat: { generalDmg: 8 } },
    ],
    recommended: false, note: "Enables revenge-damage play styles."
  },
  {
    id: "trapped_beast", name: "Trapped Beast", cat: "STONESPLIT-MIGHT",
    desc: "Critical strikes on elite targets generate rage, reducing all incoming damage.",
    tiers: [
      { tier: 1, effect: "-2% post-crit damage taken", stat: {} },
      { tier: 2, effect: "-4% post-crit damage taken", stat: {} },
      { tier: 3, effect: "-6% post-crit damage taken", stat: {} },
      { tier: 4, effect: "-8% post-crit damage taken", stat: {} },
      { tier: 5, effect: "-10% post-crit damage taken", stat: {} },
      { tier: 6, effect: "-10% post-crit damage + status immune period 1s", stat: {} },
    ],
    recommended: false, note: "Stonesplit tactical survival."
  },
];

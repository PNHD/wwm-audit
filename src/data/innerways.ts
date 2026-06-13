import { InnerWayTier, InnerWay } from "../types";

export type { InnerWayTier, InnerWay };

export const INNER_WAYS: InnerWay[] = [
  // ── BELLSTRIKE-SPLENDOR ──
  {
    id: "wildfire_spark", name: "Wildfire Spark", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Refunds 3.5% of the Endurance consumed.",
    tiers: [
      { tier: 1, effect: "Refund 1.0% Endurance consumed", stat: {} },
      { tier: 2, effect: "Refund 1.5% Endurance consumed", stat: {} },
      { tier: 3, effect: "Refund 2.0% Endurance consumed", stat: {} },
      { tier: 4, effect: "Refund 2.5% Endurance consumed", stat: {} },
      { tier: 5, effect: "Refund 3.0% Endurance consumed", stat: {} },
      { tier: 6, effect: "Refund 3.5% Endurance consumed", stat: {} },
      { tier: 7, effect: "Refund 3.5% Endurance + 5% chance to refund 100% on skill cast", stat: {} },
      { tier: 8, effect: "Refund 4.0% Endurance consumed", stat: {} },
      { tier: 9, effect: "Refund 4.5% Endurance consumed", stat: {} },
      { tier: 10, effect: "Mastery: Refund 5.0% Endurance + Endurance recovery rate +5%", stat: {} },
    ],
    recommended: false, note: "Passive flat endurance refund."
  },
  {
    id: "mountains_might", name: "Mountain's Might", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Nameless Spear Martial Art Skill Mountain Sweep grants Endless Gale effect, increasing the Endurance cost reduction to 20% for 5 seconds.",
    tiers: [
      { tier: 1, effect: "Mountain Sweep grants Endless Gale: -4% Endurance cost for 3s", stat: {} },
      { tier: 2, effect: "Endless Gale: -7% Endurance cost for 3s", stat: {} },
      { tier: 3, effect: "Endless Gale: -10% Endurance cost for 4s", stat: {} },
      { tier: 4, effect: "Endless Gale: -14% Endurance cost for 4s", stat: {} },
      { tier: 5, effect: "Endless Gale: -18% Endurance cost for 5s", stat: {} },
      { tier: 6, effect: "Endless Gale: -20% Endurance cost for 5s", stat: {} },
      { tier: 7, effect: "Endless Gale: -20% cost for 5s + Mountain Sweep CD -1s", stat: {} },
      { tier: 8, effect: "Endless Gale: -22% Endurance cost for 5s", stat: {} },
      { tier: 9, effect: "Endless Gale: -25% Endurance cost for 5s", stat: {} },
      { tier: 10, effect: "Mastery: Endless Gale -25% for 6s + regen 5% Endurance during Gale", stat: {} },
    ],
    recommended: false, note: "Endurance cost reduction skill buff."
  },

  // ── BELLSTRIKE-UMBRA ──
  {
    id: "sword_horizon", name: "Sword Horizon", cat: "BELLSTRIKE-UMBRA",
    desc: "After casting Strategic Sword's Martial Art Skill, Special Skill, or Charged Skill, press the skill button at perfect timing to cast Crisscrossing Swords (follow-up attack). If target has 5 stacks of Bleed, remove all and deal high Bleed damage once.",
    tiers: [
      { tier: 1, effect: "Crisscrossing Swords follow-up enabled (timing window: strict)", stat: { generalDmg: 3 } },
      { tier: 2, effect: "Follow-up enabled, timing window slightly wider", stat: { generalDmg: 4 } },
      { tier: 3, effect: "Follow-up damage +10%", stat: { generalDmg: 5 } },
      { tier: 4, effect: "Follow-up damage +15%, 5-stack Bleed burst enabled", stat: { generalDmg: 6 } },
      { tier: 5, effect: "Follow-up damage +20%, Bleed burst deals 200% weapon ATK", stat: { generalDmg: 7 } },
      { tier: 6, effect: "Follow-up damage +20%, Bleed burst +AoE splash on nearby targets", stat: { generalDmg: 8 } },
      { tier: 7, effect: "Bleed burst DMG +10% additional", stat: { generalDmg: 8 } },
      { tier: 8, effect: "Follow-up damage +25%", stat: { generalDmg: 9 } },
      { tier: 9, effect: "Follow-up damage +30%", stat: { generalDmg: 10 } },
      { tier: 10, effect: "Mastery: Follow-up +30%, Bleed burst guaranteed crit", stat: { generalDmg: 10 } },
    ],
    recommended: false, note: "Perfect timing follow-up combo accelerator."
  },
];

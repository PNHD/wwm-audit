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
  // ── BAMBOOCUT-WIND ──
  {
    id: "echoes_of_oblivion", name: "Echoes of Oblivion", cat: "BAMBOOCUT-WIND",
    desc: "Infernal Twinblades Light Attacks apply Sin/Karma. Ignore target's Phys Def and Bamboocut Resistance on affected targets.",
    tiers: [
      { tier:1, effect:"Ignore 2% Phys Def and 2% Bamboocut Res", stat:{outerPen:2, pzPen:2} },
      { tier:2, effect:"Ignore 4% Phys Def and 4% Bamboocut Res", stat:{outerPen:4, pzPen:4} },
      { tier:3, effect:"Ignore 6% Phys Def and 6% Bamboocut Res", stat:{outerPen:6, pzPen:6} },
      { tier:4, effect:"Ignore 8% Phys Def and 8% Bamboocut Res", stat:{outerPen:8, pzPen:8} },
      { tier:5, effect:"Ignore 10% Phys Def and 10% Bamboocut Res", stat:{outerPen:10, pzPen:10} },
      { tier:6, effect:"Ignore 10% Phys Def and 10% Bamboocut Res + Sin/Karma spread on AoE", stat:{outerPen:10, pzPen:10} },
    ],
    recommended: false, note: "Bamboocut-Wind core (Infernal Twinblades). Not for Bamboocut-Dust."
  },
  {
    id: "riptide_reflex", name: "Riptide Reflex", cat: "BAMBOOCUT-WIND",
    desc: "Hitting enemy with Control Skill reduces current MA Skill CD by 1s (once per 10s).",
    tiers: [
      { tier:1, effect:"-0.5s CD on control hit (15s CD)", stat:{} },
      { tier:2, effect:"-0.7s CD on control hit (12s CD)", stat:{} },
      { tier:3, effect:"-1s CD on control hit (10s CD)", stat:{} },
      { tier:4, effect:"-1s CD on control hit (10s CD), affects 1 more skill type", stat:{} },
      { tier:5, effect:"-1s CD on control hit (10s CD), affects 2 more skill types", stat:{} },
      { tier:6, effect:"-1s CD on control hit (8s CD), full skill type coverage", stat:{} },
    ],
    recommended: false, note: "Rotation speed buff, no direct damage stat."
  },
  {
    id: "breaking_point", name: "Breaking Point", cat: "BAMBOOCUT-WIND",
    desc: "Crit hit on Exhausted enemy → stack Disintegration (3s, max 3): +Phys Pen and +Crit DMG per stack.",
    tiers: [
      { tier:1, effect:"Each stack: +3 Phys Pen, +1.5% Crit DMG (max 3)", stat:{outerPen:3, critDmg:1.5} },
      { tier:2, effect:"Each stack: +5 Phys Pen, +2.5% Crit DMG (max 3)", stat:{outerPen:5, critDmg:2.5} },
      { tier:3, effect:"Each stack: +7 Phys Pen, +3.5% Crit DMG (max 3)", stat:{outerPen:7, critDmg:3.5} },
      { tier:4, effect:"Each stack: +8 Phys Pen, +4% Crit DMG (max 3)", stat:{outerPen:8, critDmg:4} },
      { tier:5, effect:"Each stack: +10 Phys Pen, +5% Crit DMG (max 3)", stat:{outerPen:10, critDmg:5} },
      { tier:6, effect:"Each stack: +10 Phys Pen, +5% Crit DMG (max 3) + 4th stack triggers bonus damage", stat:{outerPen:10, critDmg:5} },
    ],
    recommended: true, note: "Best T91 inner way for Bamboocut-Dust. Stack on boss Exhausted state."
  },
  {
    id: "vendetta", name: "Vendetta", cat: "BAMBOOCUT-WIND",
    desc: "Guided Blade Vendetta Token lasts longer and restores Token of Gratitude.",
    tiers: [
      { tier:1, effect:"Token +1s duration, +4 Token of Gratitude", stat:{} },
      { tier:2, effect:"Token +2s duration, +8 Token of Gratitude", stat:{} },
      { tier:3, effect:"Token +3s duration, +12 Token of Gratitude", stat:{} },
      { tier:4, effect:"Token +4s duration, +16 Token of Gratitude", stat:{} },
      { tier:5, effect:"Token +5s duration, +20 Token of Gratitude", stat:{} },
      { tier:6, effect:"Token +5s duration, +20 Token of Gratitude + bonus on token expiry", stat:{} },
    ],
    recommended: false, note: "Guided Blade specific kit only."
  },
  // ── BELLSTRIKE-SPLENDOR ──
  {
    id: "sword_morph", name: "Sword Morph", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Noname Sword Charged Skill: extra sword energy at 2nd stage. Each Endurance consumed = +1% DMG, max 20%.",
    tiers: [
      { tier:1, effect:"+1% DMG per Endurance, max 8%", stat:{generalDmg:8} },
      { tier:2, effect:"+1% DMG per Endurance, max 10%", stat:{generalDmg:10} },
      { tier:3, effect:"+1% DMG per Endurance, max 12%", stat:{generalDmg:12} },
      { tier:4, effect:"+1% DMG per Endurance, max 15%", stat:{generalDmg:15} },
      { tier:5, effect:"+1% DMG per Endurance, max 20%", stat:{generalDmg:20} },
      { tier:6, effect:"+1% DMG per Endurance, max 20% + sword energy hits twice", stat:{generalDmg:20} },
    ],
    recommended: false, note: "Bellstrike-Splendor only."
  },
  {
    id: "battle_anthem", name: "Battle Anthem", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Charged Skills deal bonus damage against all bosses.",
    tiers: [
      { tier:1, effect:"Charged Skills +2% DMG vs bosses", stat:{generalDmg:2} },
      { tier:2, effect:"Charged Skills +4% DMG vs bosses", stat:{generalDmg:4} },
      { tier:3, effect:"Charged Skills +6% DMG vs bosses", stat:{generalDmg:6} },
      { tier:4, effect:"Charged Skills +8% DMG vs bosses", stat:{generalDmg:8} },
      { tier:5, effect:"Charged Skills +10% DMG vs bosses", stat:{generalDmg:10} },
      { tier:6, effect:"Charged Skills +10% DMG vs bosses + AoE splash on hit", stat:{generalDmg:10} },
    ],
    recommended: false, note: "Good for charge-heavy rotations."
  },
  {
    id: "wildfire_spark", name: "Wildfire Spark", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Refunds a portion of Endurance consumed by skills.",
    tiers: [
      { tier:1, effect:"Refund 1% Endurance consumed", stat:{} },
      { tier:2, effect:"Refund 1.5% Endurance consumed", stat:{} },
      { tier:3, effect:"Refund 2% Endurance consumed", stat:{} },
      { tier:4, effect:"Refund 2.5% Endurance consumed", stat:{} },
      { tier:5, effect:"Refund 3.5% Endurance consumed", stat:{} },
      { tier:6, effect:"Refund 3.5% + bonus Endurance on kill", stat:{} },
    ],
    recommended: false, note: "Endurance sustain only, no damage."
  },
  {
    id: "mountains_might", name: "Mountain's Might", cat: "BELLSTRIKE-SPLENDOR",
    desc: "Noname Spear Qiankun's Lock grants Endless Gale: Endurance cost reduction for skills.",
    tiers: [
      { tier:1, effect:"Endless Gale: -5% Endurance cost for 3s", stat:{} },
      { tier:2, effect:"Endless Gale: -8% Endurance cost for 4s", stat:{} },
      { tier:3, effect:"Endless Gale: -12% Endurance cost for 4s", stat:{} },
      { tier:4, effect:"Endless Gale: -16% Endurance cost for 5s", stat:{} },
      { tier:5, effect:"Endless Gale: -20% Endurance cost for 5s", stat:{} },
      { tier:6, effect:"Endless Gale: -20% Endurance cost for 5s + Endurance regen on skill hit", stat:{} },
    ],
    recommended: false, note: "Spear Endurance sustain."
  },
  // ── BELLSTRIKE-UMBRA ──
  {
    id: "sword_horizon", name: "Sword Horizon", cat: "BELLSTRIKE-UMBRA",
    desc: "After Strategic Sword MA/Special/Charged Skill, perfect timing → follow-up Crisscrossing Swords. At 5 Bleed stacks: remove all, deal high Bleed DMG.",
    tiers: [
      { tier:1, effect:"Follow-up hits at 60% power, 5-stack Bleed burst deals 80% bonus", stat:{generalDmg:4} },
      { tier:2, effect:"Follow-up hits at 75% power, 5-stack Bleed burst deals 120% bonus", stat:{generalDmg:6} },
      { tier:3, effect:"Follow-up hits at 90% power, 5-stack Bleed burst deals 160% bonus", stat:{generalDmg:8} },
      { tier:4, effect:"Follow-up hits at 100% power, 5-stack Bleed burst deals 200% bonus", stat:{generalDmg:10} },
      { tier:5, effect:"Full power + reduced timing window for follow-up", stat:{generalDmg:12} },
      { tier:6, effect:"Full power + guaranteed follow-up if timed + Bleed burst AoE splash", stat:{generalDmg:12} },
    ],
    recommended: false, note: "Core for Bellstrike-Umbra."
  },
  {
    id: "insightful_strike", name: "Insightful Strike", cat: "BELLSTRIKE-UMBRA",
    desc: "Affinity DMG generates Focus. Full Focus → Concentration 10s: +Affinity DMG, 5% chance to reduce DMG taken by 40%.",
    tiers: [
      { tier:1, effect:"Concentration: +4% Affinity DMG", stat:{affDmg:4} },
      { tier:2, effect:"Concentration: +6% Affinity DMG", stat:{affDmg:6} },
      { tier:3, effect:"Concentration: +8% Affinity DMG", stat:{affDmg:8} },
      { tier:4, effect:"Concentration: +10% Affinity DMG", stat:{affDmg:10} },
      { tier:5, effect:"Concentration: +10% Affinity DMG, 5% chance -40% DMG taken", stat:{affDmg:10} },
      { tier:6, effect:"Concentration: +10% Affinity DMG, 8% chance -40% DMG taken + longer duration", stat:{affDmg:10} },
    ],
    recommended: false, note: "Only useful for Affinity-focused builds."
  },
  {
    id: "adaptive_steel", name: "Adaptive Steel", cat: "BELLSTRIKE-UMBRA",
    desc: "Gain a passive Martial Skill based on current blade weapon (Sword 10s CD, Dual Blades 25s CD).",
    tiers: [
      { tier:1, effect:"Martial Skill deals 60% weapon DMG", stat:{} },
      { tier:2, effect:"Martial Skill deals 80% weapon DMG", stat:{} },
      { tier:3, effect:"Martial Skill deals 100% weapon DMG", stat:{} },
      { tier:4, effect:"Martial Skill deals 120% weapon DMG", stat:{} },
      { tier:5, effect:"Martial Skill deals 140% weapon DMG, CD -2s", stat:{} },
      { tier:6, effect:"Martial Skill deals 150% weapon DMG, CD -2s + applies bleed", stat:{} },
    ],
    recommended: false, note: "Generic blade bonus."
  },
  {
    id: "wolfchasers_art", name: "Wolfchaser's Art", cat: "BELLSTRIKE-UMBRA",
    desc: "Reduces Sorrow Without Wine combo requirement. Bleed hits on boss increase combo count.",
    tiers: [
      { tier:1, effect:"Combo req reduced from 5/10 to 5/9", stat:{} },
      { tier:2, effect:"Combo req reduced to 5/8", stat:{} },
      { tier:3, effect:"Combo req reduced to 4/8", stat:{} },
      { tier:4, effect:"Combo req reduced to 4/8 + 40% chance to +1 combo on Bleed hit", stat:{} },
      { tier:5, effect:"Combo req 4/8 + 20-100% chance based on Bleed stacks", stat:{} },
      { tier:6, effect:"Combo req 4/8 + guaranteed +1 combo at 5 Bleed stacks", stat:{} },
    ],
    recommended: false, note: "Heavenquaker Spear + Bleed kit specific."
  },
  // ── SILKBIND-DELUGE ──
  {
    id: "royal_remedy", name: "Royal Remedy", cat: "SILKBIND-DELUGE",
    desc: "Panacea Fan Cloudburst Healing effect increased. Gain Dewdrop per HoT tick in range.",
    tiers: [
      { tier:1, effect:"Cloudburst Healing +2%, +0.5 Dewdrop per tick", stat:{} },
      { tier:2, effect:"Cloudburst Healing +4%, +1 Dewdrop per tick", stat:{} },
      { tier:3, effect:"Cloudburst Healing +6%, +1 Dewdrop per tick", stat:{} },
      { tier:4, effect:"Cloudburst Healing +8%, +1 Dewdrop per tick", stat:{} },
      { tier:5, effect:"Cloudburst Healing +10%, +1 Dewdrop per tick", stat:{} },
      { tier:6, effect:"Cloudburst Healing +10%, +1 Dewdrop per tick + AoE pulse on full Dewdrop", stat:{} },
    ],
    recommended: false, note: "Healer path only."
  },
  {
    id: "mending_loom", name: "Mending Loom", cat: "SILKBIND-DELUGE",
    desc: "Soulshade Umbrella Echoing Grow: restore Dewdrop and heal HP per 100 Dewdrop consumed.",
    tiers: [
      { tier:1, effect:"Restore 1 Dewdrop, heal 2% Max HP per 100 Dewdrop", stat:{} },
      { tier:2, effect:"Restore 2 Dewdrop, heal 4% Max HP per 100 Dewdrop", stat:{} },
      { tier:3, effect:"Restore 3 Dewdrop, heal 6% Max HP per 100 Dewdrop", stat:{} },
      { tier:4, effect:"Restore 4 Dewdrop, heal 8% Max HP per 100 Dewdrop", stat:{} },
      { tier:5, effect:"Restore 5 Dewdrop, heal 10% Max HP per 100 Dewdrop", stat:{} },
      { tier:6, effect:"Restore 5 Dewdrop, heal 10% Max HP + bonus team shield", stat:{} },
    ],
    recommended: false, note: "Healer path only."
  },
  {
    id: "esoteric_revival", name: "Esoteric Revival", cat: "SILKBIND-DELUGE",
    desc: "Panacea Fan Resurrection healing on revived target increased.",
    tiers: [
      { tier:1, effect:"Resurrection heal +10%", stat:{} },
      { tier:2, effect:"Resurrection heal +20%", stat:{} },
      { tier:3, effect:"Resurrection heal +30%", stat:{} },
      { tier:4, effect:"Resurrection heal +40%", stat:{} },
      { tier:5, effect:"Resurrection heal +50%", stat:{} },
      { tier:6, effect:"Resurrection heal +50% + brief invincibility on revive", stat:{} },
    ],
    recommended: false, note: "Healer path only."
  },
  {
    id: "restoring_blossom", name: "Restoring Blossom", cat: "SILKBIND-DELUGE",
    desc: "Critical heal → stack Nurturing (3s, max 3): +% healing received per stack.",
    tiers: [
      { tier:1, effect:"+0.5% healing received per stack (max 3)", stat:{} },
      { tier:2, effect:"+1% healing received per stack (max 3)", stat:{} },
      { tier:3, effect:"+1.5% healing received per stack (max 3)", stat:{} },
      { tier:4, effect:"+2% healing received per stack (max 3)", stat:{} },
      { tier:5, effect:"+2% healing received per stack (max 3)", stat:{} },
      { tier:6, effect:"+2% per stack + Nurturing spreads to nearby allies", stat:{} },
    ],
    recommended: false, note: "Healer path only."
  },
  // ── SILKBIND-JADE ──
  {
    id: "blossom_barrage", name: "Blossom Barrage", cat: "SILKBIND-JADE",
    desc: "Vernal Umbrella Spring Sorrow holds more stacks. Hitting target applies Combo: Ballistic Skills deal bonus DMG.",
    tiers: [
      { tier:1, effect:"Spring Sorrow: 1 extra stack. Combo: +2% Ballistic DMG", stat:{generalDmg:2} },
      { tier:2, effect:"Spring Sorrow: 1 extra stack. Combo: +4% Ballistic DMG", stat:{generalDmg:4} },
      { tier:3, effect:"Spring Sorrow: 2 extra stacks. Combo: +6% Ballistic DMG", stat:{generalDmg:6} },
      { tier:4, effect:"Spring Sorrow: 2 extra stacks. Combo: +8% Ballistic DMG", stat:{generalDmg:8} },
      { tier:5, effect:"Spring Sorrow: 2 extra stacks. Combo: +10% Ballistic DMG for 8s", stat:{generalDmg:10} },
      { tier:6, effect:"Spring Sorrow: 2 extra stacks. Combo: +10% + stacks not consumed on use", stat:{generalDmg:10} },
    ],
    recommended: false, note: "6-tier required for Silkbind-Jade core mechanic."
  },
  {
    id: "star_reacher", name: "Star Reacher", cat: "SILKBIND-JADE",
    desc: "Knocking enemy airborne grants Physical Attack Bonus for a duration.",
    tiers: [
      { tier:1, effect:"+2% Phys ATK Bonus for 4s after airborne", stat:{outerDmg:2} },
      { tier:2, effect:"+4% Phys ATK Bonus for 5s after airborne", stat:{outerDmg:4} },
      { tier:3, effect:"+6% Phys ATK Bonus for 6s after airborne", stat:{outerDmg:6} },
      { tier:4, effect:"+8% Phys ATK Bonus for 7s after airborne", stat:{outerDmg:8} },
      { tier:5, effect:"+10% Phys ATK Bonus for 8s after airborne", stat:{outerDmg:10} },
      { tier:6, effect:"+10% Phys ATK Bonus for 8s + applies to ground attacks for 3s after landing", stat:{outerDmg:10} },
    ],
    recommended: false, note: "Good for airborne-heavy rotations."
  },
  {
    id: "thunderous_bloom", name: "Thunderous Bloom", cat: "SILKBIND-JADE",
    desc: "Moving 15m in 3s → Spring Thunder: next Heavy/Airborne Heavy Attacks gain DMG Bonus (12s, once per 15s).",
    tiers: [
      { tier:1, effect:"Next 1 Heavy Attack +5% DMG", stat:{generalDmg:5} },
      { tier:2, effect:"Next 2 Heavy Attacks +8% DMG", stat:{generalDmg:8} },
      { tier:3, effect:"Next 2 Heavy Attacks +10% DMG", stat:{generalDmg:10} },
      { tier:4, effect:"Next 3 Heavy Attacks +12% DMG", stat:{generalDmg:12} },
      { tier:5, effect:"Next 3 Heavy Attacks +15% DMG, distance req -2m", stat:{generalDmg:15} },
      { tier:6, effect:"Next 3 Heavy Attacks +15% DMG, can trigger twice in 15s", stat:{generalDmg:15} },
    ],
    recommended: false, note: "Mobility-dependent, less consistent in boss fights."
  },
  {
    id: "flying_gourds", name: "Flying Gourds", cat: "SILKBIND-JADE",
    desc: "Inkwell Fan Peak's Springless Silence: gains charges, increased cooldown.",
    tiers: [
      { tier:1, effect:"+1 charge, +1.5s CD", stat:{} },
      { tier:2, effect:"+1 charge, +2s CD", stat:{} },
      { tier:3, effect:"+2 charges, +2.5s CD", stat:{} },
      { tier:4, effect:"+2 charges, +3s CD, each charge hits harder", stat:{} },
      { tier:5, effect:"+2 charges, +3s CD, +15% per charge hit DMG", stat:{} },
      { tier:6, effect:"+2 charges, +3s CD, charges share cooldown with reduced CD on use", stat:{} },
    ],
    recommended: false, note: "Inkwell Fan specific."
  },
  // ── STONESPLIT-MIGHT ──
  {
    id: "exquisite_scenery", name: "Exquisite Scenery", cat: "STONESPLIT-MIGHT",
    desc: "Thundercry Blade successful defense → free first-stage Charged Heavy Attack (once per 10s). Varied Combo hit restores Battle Will.",
    tiers: [
      { tier:1, effect:"Free first-stage Charged Attack, 20s CD. Varied Combo: +0.5 Battle Will", stat:{} },
      { tier:2, effect:"Free first-stage, 15s CD. Varied Combo: +0.5 Battle Will", stat:{} },
      { tier:3, effect:"Free first-stage, 12s CD. Varied Combo: +1 Battle Will", stat:{} },
      { tier:4, effect:"Free second-stage, 10s CD. Varied Combo: +1 Battle Will", stat:{} },
      { tier:5, effect:"Free second-stage, 10s CD. Varied Combo: +1 Battle Will, reduced CD on deflect", stat:{} },
      { tier:6, effect:"Free second-stage, 8s CD. +1 Battle Will on deflect + free attack ignores Def", stat:{} },
    ],
    recommended: false, note: "Core for Stonesplit-Might."
  },
  {
    id: "trapped_beast", name: "Trapped Beast", cat: "STONESPLIT-MIGHT",
    desc: "Taking DMG below 30% HP → Cornered Beast shield absorbing Max HP % for 4s (once per 300s).",
    tiers: [
      { tier:1, effect:"Shield absorbs 10% Max HP, triggers below 40% HP", stat:{} },
      { tier:2, effect:"Shield absorbs 15% Max HP, triggers below 35% HP", stat:{} },
      { tier:3, effect:"Shield absorbs 20% Max HP, triggers below 30% HP", stat:{} },
      { tier:4, effect:"Shield absorbs 25% Max HP, CD -60s", stat:{} },
      { tier:5, effect:"Shield absorbs 30% Max HP, CD 300s", stat:{} },
      { tier:6, effect:"Shield absorbs 30% Max HP + reflect 20% absorbed to attacker, CD 240s", stat:{} },
    ],
    recommended: false, note: "Tank survival only."
  },
  {
    id: "art_of_resistance", name: "Art of Resistance", cat: "STONESPLIT-MIGHT",
    desc: "HP shield duration and bonus effects extended.",
    tiers: [
      { tier:1, effect:"Shield duration +1s", stat:{} },
      { tier:2, effect:"Shield duration +2s", stat:{} },
      { tier:3, effect:"Shield duration +3s", stat:{} },
      { tier:4, effect:"Shield duration +4s, shield absorb +5%", stat:{} },
      { tier:5, effect:"Shield duration +4s, shield absorb +5%, bonus healing while shielded", stat:{} },
      { tier:6, effect:"Shield duration +4s, absorb +8%, heal +2% HP/s while shielded", stat:{} },
    ],
    recommended: false, note: "Tank utility."
  },
  {
    id: "rock_solid", name: "Rock Solid", cat: "STONESPLIT-MIGHT",
    desc: "Stormbreaker Spear Roar of Storm DMG Reduction after taunting. While active, reduces damage dealt.",
    tiers: [
      { tier:1, effect:"After boss taunt: -5% DMG taken. -5% own DMG dealt", stat:{} },
      { tier:2, effect:"After boss taunt: -10% DMG taken. -8% own DMG", stat:{} },
      { tier:3, effect:"After boss taunt: -15% DMG taken. -10% own DMG", stat:{} },
      { tier:4, effect:"After boss taunt: -18% DMG taken (+4% non-boss). -10% own DMG", stat:{} },
      { tier:5, effect:"After boss taunt: -20% DMG taken (+5% non-boss, max 20%). -10% own DMG", stat:{} },
      { tier:6, effect:"Same as T5 + reflect 15% of absorbed damage to boss", stat:{} },
    ],
    recommended: false, note: "Tank utility, reduces own DPS."
  },
  // ── GENERAL ──
  {
    id: "seasonal_edge", name: "Seasonal Edge", cat: "GENERAL",
    desc: "After casting a Dual-Weapon Skill, gain one of four offensive bonuses (Crit Rate, Pen, DMG Bonus, or ATK).",
    tiers: [
      { tier:1, effect:"One random offensive buff after Dual-Weapon Skill (~1% DMG avg)", stat:{generalDmg:1} },
      { tier:2, effect:"One random buff, slightly stronger (~2% DMG avg)", stat:{generalDmg:2} },
      { tier:3, effect:"One random buff, stronger (~2.5% DMG avg)", stat:{generalDmg:2.5} },
      { tier:4, effect:"One random buff, can select preferred type (~3% DMG avg)", stat:{generalDmg:3} },
      { tier:5, effect:"One random buff, higher values (~4% DMG avg)", stat:{generalDmg:4} },
      { tier:6, effect:"Two buffs simultaneously after Dual-Weapon Skill (~5% DMG avg)", stat:{generalDmg:5} },
    ],
    recommended: true, note: "Best general inner way — works for any dual-weapon build including Bamboocut-Dust."
  },
  {
    id: "morale_chant", name: "Morale Chant", cat: "GENERAL",
    desc: "80% chance to gain Yi River stack on attack/heal (once per 2s): +1% Phys DMG and healing per stack (8s, max 5 stacks).",
    tiers: [
      { tier:1, effect:"Max 2 stacks, each +1% Phys DMG", stat:{outerDmg:2} },
      { tier:2, effect:"Max 3 stacks, each +1% Phys DMG", stat:{outerDmg:3} },
      { tier:3, effect:"Max 4 stacks, each +1% Phys DMG", stat:{outerDmg:4} },
      { tier:4, effect:"Max 5 stacks, each +1% Phys DMG, 85% proc chance", stat:{outerDmg:5} },
      { tier:5, effect:"Max 5 stacks, each +1% Phys DMG, 80% proc but faster stack gain", stat:{outerDmg:5} },
      { tier:6, effect:"Max 5 stacks each +1% Phys DMG + full stacks give +1% Crit DMG bonus", stat:{outerDmg:5, critDmg:1} },
    ],
    recommended: true, note: "Top sustained DPS inner way. Aim for T4+ for reliable 5 stacks."
  },
  {
    id: "divine_roulette", name: "Divine Roulette", cat: "GENERAL",
    desc: "Perfect deflection → one of three buffs for next skill used (10s, once per 30s).",
    tiers: [
      { tier:1, effect:"Buff lasts 5s, 40s CD: ~1.5% DMG avg", stat:{generalDmg:1.5} },
      { tier:2, effect:"Buff lasts 7s, 35s CD: ~2% DMG avg", stat:{generalDmg:2} },
      { tier:3, effect:"Buff lasts 8s, 30s CD: ~2.5% DMG avg", stat:{generalDmg:2.5} },
      { tier:4, effect:"Buff lasts 10s, 30s CD: ~3% DMG avg", stat:{generalDmg:3} },
      { tier:5, effect:"Buff lasts 10s, 30s CD, better buff pool: ~3.5% DMG avg", stat:{generalDmg:3.5} },
      { tier:6, effect:"Buff lasts 10s, 25s CD, can get 2 buffs: ~4% DMG avg", stat:{generalDmg:4} },
    ],
    recommended: false, note: "Requires perfect deflect — less reliable in PvE boss fights."
  },
  {
    id: "fury_harvest", name: "Fury Harvest", cat: "GENERAL",
    desc: "Certain recovery actions have 50% chance to grant 1 bonus Vitality.",
    tiers: [
      { tier:1, effect:"35% chance on recovery", stat:{} },
      { tier:2, effect:"40% chance on recovery", stat:{} },
      { tier:3, effect:"45% chance on recovery", stat:{} },
      { tier:4, effect:"50% chance on recovery", stat:{} },
      { tier:5, effect:"50% chance, wider recovery action types", stat:{} },
      { tier:6, effect:"60% chance, all recovery types, +1 Vitality regen on combat start", stat:{} },
    ],
    recommended: false, note: "Mystic Arts sustain only."
  },
  {
    id: "vital_leech", name: "Vital Leech", cat: "GENERAL",
    desc: "Exhaustion Execution Skill restores HP equal to % of damage dealt.",
    tiers: [
      { tier:1, effect:"Restore HP = 2% of damage dealt", stat:{} },
      { tier:2, effect:"Restore HP = 3% of damage dealt", stat:{} },
      { tier:3, effect:"Restore HP = 5% of damage dealt", stat:{} },
      { tier:4, effect:"Restore HP = 6% of damage dealt", stat:{} },
      { tier:5, effect:"Restore HP = 8% of damage dealt", stat:{} },
      { tier:6, effect:"Restore HP = 8% + 1% Max HP on Exhaustion trigger", stat:{} },
    ],
    recommended: false, note: "Survival only — no DPS bonus."
  },
  {
    id: "bitter_seasons", name: "Bitter Seasons", cat: "GENERAL",
    desc: "10% chance on hit to apply Poison (5s, 1 tick/s): reduces target Phys Def by % per tick (max 5 stacks).",
    tiers: [
      { tier:1, effect:"Poison: -0.2% Phys Def per stack (max 5 = -1%)", stat:{outerPen:1} },
      { tier:2, effect:"Poison: -0.3% Phys Def per stack (max -1.5%)", stat:{outerPen:1.5} },
      { tier:3, effect:"Poison: -0.4% Phys Def per stack (max -2%)", stat:{outerPen:2} },
      { tier:4, effect:"Poison: -0.5% Phys Def per stack (max -2.5%)", stat:{outerPen:2.5} },
      { tier:5, effect:"Poison: -0.6% Phys Def per stack (max 5 stacks = -3%), 10% proc", stat:{outerPen:3} },
      { tier:6, effect:"Poison: -0.6% per stack + guaranteed proc on crit hit, -3% max", stat:{outerPen:3} },
    ],
    recommended: false, note: "Approx pen equivalent at max stacks. Inconsistent."
  },
  {
    id: "invigorated_warrior", name: "Invigorated Warrior", cat: "GENERAL",
    desc: "+% all DMG and healing. Disabled 5s after being hit. Getting hit also grants Cage: +% DMG taken.",
    tiers: [
      { tier:1, effect:"+2% DMG. Disabled 8s after hit. Cage: +2% DMG taken", stat:{generalDmg:2} },
      { tier:2, effect:"+3% DMG. Disabled 7s after hit. Cage: +3% DMG taken", stat:{generalDmg:3} },
      { tier:3, effect:"+4% DMG. Disabled 6s after hit. Cage: +4% DMG taken", stat:{generalDmg:4} },
      { tier:4, effect:"+5% DMG. Disabled 5s after hit. Cage: +5% DMG taken", stat:{generalDmg:5} },
      { tier:5, effect:"+5% DMG. Disabled 5s after hit. Cage: +5% DMG taken", stat:{generalDmg:5} },
      { tier:6, effect:"+5% DMG. Disabled 4s after hit. Cage effect reduced to +3% DMG taken", stat:{generalDmg:5} },
    ],
    recommended: true, note: "Strong in burst windows. High risk: getting hit disables buff AND increases damage taken."
  },
  {
    id: "evasive_charge", name: "Evasive Charge", cat: "GENERAL",
    desc: "After Perfect Dodge: % chance to refund Endurance consumed.",
    tiers: [
      { tier:1, effect:"20% chance to refund 100% Endurance", stat:{} },
      { tier:2, effect:"30% chance to refund 100% Endurance", stat:{} },
      { tier:3, effect:"40% chance to refund 100% Endurance", stat:{} },
      { tier:4, effect:"50% chance to refund 100% Endurance", stat:{} },
      { tier:5, effect:"50% chance, also reduces next skill CD by 0.5s", stat:{} },
      { tier:6, effect:"60% chance, refund + next skill CD -1s", stat:{} },
    ],
    recommended: false, note: "Endurance sustain only."
  },
  {
    id: "fivefold_bleed", name: "Fivefold Bleed", cat: "GENERAL",
    desc: "10% chance on hit to apply Weeping Blood stack (5s, max 5). At 5 stacks: remove all and deal piercing DMG.",
    tiers: [
      { tier:1, effect:"Piercing DMG = 50% of one hit's DMG at 5 stacks", stat:{generalDmg:1} },
      { tier:2, effect:"Piercing DMG = 80% of one hit at 5 stacks", stat:{generalDmg:1.5} },
      { tier:3, effect:"Piercing DMG = 110% at 5 stacks, 12% proc", stat:{generalDmg:2} },
      { tier:4, effect:"Piercing DMG = 140% at 5 stacks, 12% proc", stat:{generalDmg:2} },
      { tier:5, effect:"Piercing DMG = 150% at 5 stacks, can stack from AoE hits", stat:{generalDmg:2} },
      { tier:6, effect:"Piercing DMG = 150% + AoE splash on 5-stack burst", stat:{generalDmg:2} },
    ],
    recommended: false, note: "Low priority for most builds."
  },
  {
    id: "shadow_assault", name: "Shadow Assault", cat: "GENERAL",
    desc: "Touch of Death ambush max range increased.",
    tiers: [
      { tier:1, effect:"Ambush range +0.5m", stat:{} },
      { tier:2, effect:"Ambush range +0.8m", stat:{} },
      { tier:3, effect:"Ambush range +1.0m", stat:{} },
      { tier:4, effect:"Ambush range +1.2m", stat:{} },
      { tier:5, effect:"Ambush range +1.5m, reduced detection while crouching", stat:{} },
      { tier:6, effect:"Ambush range +1.5m + ambush applies Exposed (-5% Def for 6s)", stat:{} },
    ],
    recommended: false, note: "Open world / PvP utility only."
  },
  {
    id: "steadfast_stance", name: "Steadfast Stance", cat: "GENERAL",
    desc: "Less likely to stagger when attacked (invalid vs boss or player).",
    tiers: [
      { tier:1, effect:"Stagger chance -20% from mobs", stat:{} },
      { tier:2, effect:"Stagger chance -30% from mobs", stat:{} },
      { tier:3, effect:"Stagger chance -40% from mobs", stat:{} },
      { tier:4, effect:"Stagger chance -50% from mobs", stat:{} },
      { tier:5, effect:"Stagger chance -60% from mobs, +5% DMG while not staggered", stat:{} },
      { tier:6, effect:"Immune to mob stagger, +5% DMG while in combat", stat:{} },
    ],
    recommended: false, note: "Mob content only, useless vs bosses."
  },
  {
    id: "evening_snow", name: "Evening Snow", cat: "GENERAL",
    desc: "Within 12s of entering combat, if HP < 60%: Snow Vision 4s restoring HP per second (once per 300s).",
    tiers: [
      { tier:1, effect:"Restore 0.5% HP + 200 HP/s for 2s (trigger at 70% HP)", stat:{} },
      { tier:2, effect:"Restore 1% HP + 300 HP/s for 3s (trigger at 65% HP)", stat:{} },
      { tier:3, effect:"Restore 1.5% HP + 400 HP/s for 4s (trigger at 60% HP)", stat:{} },
      { tier:4, effect:"Restore 2% HP + 500 HP/s for 4s", stat:{} },
      { tier:5, effect:"Restore 2% HP + 600 HP/s for 4s, CD 300s", stat:{} },
      { tier:6, effect:"Restore 2% HP + 600 HP/s for 4s, CD 240s, also cleanses 1 debuff", stat:{} },
    ],
    recommended: false, note: "Survival only."
  },
  {
    id: "wind_beneath_wings", name: "Wind Beneath Wings", cat: "GENERAL",
    desc: "Skywalk Dash Endurance -10%. +30% Move Speed 3s after landing. Restore HP on enemy kill.",
    tiers: [
      { tier:1, effect:"Dash cost -3%, +10% Move Speed 2s after land, +50 HP on kill", stat:{} },
      { tier:2, effect:"Dash cost -5%, +20% Move Speed 2s after land, +100 HP on kill", stat:{} },
      { tier:3, effect:"Dash cost -8%, +25% Move Speed 3s after land, +0.5% Max HP on kill", stat:{} },
      { tier:4, effect:"Dash cost -10%, +30% Move Speed 3s after land, +0.8% Max HP on kill", stat:{} },
      { tier:5, effect:"Dash cost -10%, +30% Move Speed 3s, +1% Max HP on kill", stat:{} },
      { tier:6, effect:"Dash cost -10%, +30% Move Speed 3s, +1% Max HP on kill, dash resets on kill", stat:{} },
    ],
    recommended: false, note: "Mobility/survival only."
  },
];

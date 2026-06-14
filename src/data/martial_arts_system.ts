export interface MartialArt {
  id: string;
  cn: string;
  name: string;
  tier: "gold" | "purple" | "blue";
  stat: {
    minOuter?: number;
    maxOuter?: number;
    crit?: number;
    aff?: number;
    prec?: number;
    critDmg?: number;
    affDmg?: number;
    outerPen?: number;
    outerDmg?: number;
    dcrit?: number;
    daff?: number;
  };
  recommended?: string[];  // build keys
  note?: string;
}

export const MARTIAL_ARTS: MartialArt[] = [
  // ── GOLD TIER (金) ─────────────────────────────────
  { id:"sword_aura",      cn:"剑气纵横", name:"Sword Aura",          tier:"gold",
    stat:{ maxOuter:97.8, daff:2.3 },
    recommended:["bellstrike-umbra"] },
  { id:"phantom_rally",   cn:"千营一呼", name:"Phantom Rally",        tier:"gold",
    stat:{ crit:11.3, outerDmg:2.8 },
    recommended:["bamboocut-dust","bamboocut-wind","bamboocut-kite"],
    note:"Best gold MA for Bamboocut builds. +11.3% Crit Rate, +2.8% Phys DMG" },
  { id:"liegess_remedy",  cn:"君臣药",   name:"Liege's Remedy",       tier:"gold",
    stat:{ crit:11.3, dcrit:4.6 },
    recommended:["bellstrike-umbra"] },
  { id:"mtn_river",       cn:"山河绝韵", name:"Mountain River Rhyme", tier:"gold",
    stat:{ crit:11.3, critDmg:4.4 },
    recommended:["bellstrike-umbra","bellstrike-splendor"] },
  { id:"forgotten_river", cn:"忘川绝响", name:"Forgotten River Echo", tier:"gold",
    stat:{ crit:11.3, critDmg:4.4 },
    recommended:[] },
  { id:"soaring_high",    cn:"扶摇直上", name:"Soaring High",         tier:"gold",
    stat:{ minOuter:97.8, dcrit:4.6 },
    recommended:[] },
  { id:"nameless_art",    cn:"无名心法", name:"Nameless Art",         tier:"gold",
    stat:{ maxOuter:97.8, daff:2.3 },
    recommended:[] },
  { id:"song_of_yi",      cn:"易水歌",   name:"Song of Yi",           tier:"gold",
    stat:{ minOuter:32.6, maxOuter:65.2, dcrit:4.6 },
    recommended:["bamboocut-dust"],
    note:"Good for Bamboocut-Dust. Balanced Min+Max ATK and Direct Crit" },
  { id:"blossom_moon",    cn:"花上月令", name:"Blossom Moon Order",   tier:"gold",
    stat:{ crit:11.3, critDmg:4.4 },
    recommended:[] },
  { id:"frost_sky",       cn:"霜天白夜", name:"Frost Sky White Night",tier:"gold",
    stat:{ minOuter:97.8, dcrit:4.6 },
    recommended:[] },

  // ── PURPLE TIER (紫) ────────────────────────────────
  { id:"three_poverty",   cn:"三穷致知", name:"Three Poverty Knowing",tier:"purple",
    stat:{ minOuter:29.3, maxOuter:58.7, outerDmg:2.5 },
    recommended:[] },
  { id:"focus_chapter",   cn:"凝神章",   name:"Focus Chapter",        tier:"purple",
    stat:{ minOuter:29.3, maxOuter:58.7, outerPen:5.1 },
    recommended:["bamboocut-dust"],
    note:"Good all-round for Bamboocut: Phys ATK + Pen" },
  { id:"thousand_silk",   cn:"千丝蛊",   name:"Thousand Silk Gu",     tier:"purple",
    stat:{ minOuter:29.3, maxOuter:58.7 },
    recommended:["silkbind-jade","silkbind-deluge"] },
  { id:"thousand_mtn",    cn:"千山法",   name:"Thousand Mountain Art",tier:"purple",
    stat:{ outerPen:5.1 },  // bamboocut pen (pzPen)
    recommended:["silkbind-jade"] },
  { id:"great_tang_song", cn:"大唐歌",   name:"Great Tang Song",      tier:"purple",
    stat:{ prec:9.0, critDmg:4.0 },
    recommended:["bamboocut-dust"],
    note:"Core for Bamboocut-Dust. +9% Prec, +4% Crit DMG (extra bonus on Umbrella Q via formula)" },
  { id:"mighty_song",     cn:"威猛歌",   name:"Mighty Song",          tier:"purple",
    stat:{ aff:5.1, affDmg:5.2 },
    recommended:["bellstrike-umbra"] },
  { id:"loyal_devotion",  cn:"孤忠不辞", name:"Loyal Devotion",       tier:"purple",
    stat:{ crit:10.1, critDmg:4.0 },
    recommended:[] },
  { id:"soldier_return",  cn:"征人归",   name:"Soldier's Return",     tier:"purple",
    stat:{ minOuter:88, outerPen:5.1 },
    recommended:[] },
  { id:"heart_mud_fish",  cn:"心弥泥鱼", name:"Heart Mud Fish",       tier:"purple",
    stat:{ minOuter:88, outerPen:5.1 },
    recommended:["bamboocut-dust","bamboocut-kite"] },
  { id:"fury_horse",      cn:"怒斩马",   name:"Fury Horse Slash",     tier:"purple",
    stat:{},
    recommended:[] },
  { id:"yearly_regret",   cn:"所恨年年", name:"Yearly Regret",        tier:"purple",
    stat:{ prec:9.0, outerDmg:2.5 },
    recommended:[] },
  { id:"resistance_meth", cn:"抗造大法", name:"Resistance Method",    tier:"purple",
    stat:{ outerPen:5.1 },  // stonesplit pen
    recommended:["stonesplit-might","stonesplit-scale"] },
  { id:"heaven_capture",  cn:"擒天势",   name:"Heaven Capture Stance",tier:"purple",
    stat:{ crit:10.1, critDmg:4.0 },
    recommended:[] },
  { id:"stone_breaker",   cn:"断石之构", name:"Stone Breaker",        tier:"purple",
    stat:{ prec:9.0, dcrit:4.1 },
    recommended:["bamboocut-dust","stonesplit-might"],
    note:"Core for Bamboocut-Dust. +9% Prec, +4.1% Direct Crit" },
  { id:"light_dark_dust", cn:"明晦同尘", name:"Light Dark Same Dust", tier:"purple",
    stat:{ minOuter:29.3, maxOuter:58.7, outerPen:5.1 },
    recommended:["bamboocut-dust"] },
  { id:"spring_thunder",  cn:"春雷篇",   name:"Spring Thunder",       tier:"purple",
    stat:{ minOuter:29.3, maxOuter:58.7, outerDmg:2.5 },
    recommended:[] },
  { id:"apricot_blossom", cn:"杏花不见", name:"Apricot Blossom",      tier:"purple",
    stat:{},
    recommended:["silkbind-deluge"] },
  { id:"lantern_light",   cn:"灯儿亮",   name:"Lantern Light",        tier:"purple",
    stat:{ minOuter:88, outerPen:5.1 },
    recommended:["bamboocut-dust"],
    note:"Good for Bamboocut-Dust if you need more Min ATK + Pen" },
  { id:"change_art",      cn:"移经易武", name:"Change Art",           tier:"purple",
    stat:{},
    recommended:["bellstrike-umbra"] },
  { id:"throat_pierce",   cn:"穿喉决",   name:"Throat Pierce",        tier:"purple",
    stat:{ outerPen:5.1 },  // silkbind pen
    recommended:["silkbind-jade"] },
  { id:"ground_star",     cn:"纵地摘星", name:"Ground Star Reach",    tier:"purple",
    stat:{ minOuter:29.3, maxOuter:58.7, outerPen:5.1 },
    recommended:[] },
  { id:"rope_boat_wood",  cn:"绳舟行木", name:"Rope Boat Wood",       tier:"purple",
    stat:{ minOuter:88, outerPen:5.1 },
    recommended:["bamboocut-dust"],
    note:"Best purple MA for Bamboocut-Dust. High Min ATK + Pen" },
  { id:"wolf_chase",      cn:"逐狼心经", name:"Wolf Chase Sutra",     tier:"purple",
    stat:{ aff:5.1, affDmg:5.2 },
    recommended:["bellstrike-umbra"] },

  // ── BLUE TIER (蓝) ─────────────────────────────────
  { id:"bliss_blood",     cn:"极乐泣血", name:"Bliss Weeping Blood",  tier:"blue",
    stat:{ maxOuter:78.2, critDmg:3.5 },
    recommended:[] },
];

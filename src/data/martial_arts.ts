export interface MartialArt {
  id: string;
  name: string;
  nameCn: string;
  weapon: string; // "Umbrella", "Rope Dart", "Twinblades", "Spear", "Sword", "Fist", "Flute", "General"
  stat: {
    minOuter?: number;
    maxOuter?: number;
    outerPen?: number;
    minPz?: number;
    maxPz?: number;
    pzPen?: number;
    pzDmg?: number;
    prec?: number;
    crit?: number;
    aff?: number;
    critDmg?: number;
    affDmg?: number;
    outerDmg?: number;
    bossDmg?: number;
    allArts?: number;
    umbBonus?: number;
    ropeBonus?: number;
  };
  desc: string;
}

export const MARTIAL_ARTS: MartialArt[] = [
  // Umbrella Dedicated
  { id: "thousand_camps_call", name: "Thousand Camps Call", nameCn: "千营一呼", weapon: "Umbrella", stat: { maxOuter: 112, allArts: 4.5 }, desc: "Umbrella Core. Amplifies broad sword arts and grants heavy physical attack increments." },
  { id: "great_tang_song", name: "Great Tang Song", nameCn: "大唐歌", weapon: "Umbrella", stat: { outerPen: 5.8, maxOuter: 64 }, desc: "Shatters boss defenses on charge. High physical penetration." },
  { id: "vernal_resonance", name: "Vernal Resonance", nameCn: "春华歌", weapon: "Umbrella", stat: { umbBonus: 6.2, crit: 4.5 }, desc: "Increases umbrella critical rate and extra resonance damage." },
  { id: "shadow_ripple", name: "Shadow Ripple", nameCn: "影涟漪", weapon: "Umbrella", stat: { minPz: 28, maxPz: 56 }, desc: "Bamboocut elemental attack values increased dynamically." },
  
  // Rope Dart Dedicated
  { id: "song_of_yi", name: "Song of Yi", nameCn: "易水歌", weapon: "Rope Dart", stat: { critDmg: 6.5, crit: 3.5 }, desc: "Rope Dart Core. Amplifies lethal damage multi-stagger and critical synergy." },
  { id: "rope_boat_wood", name: "Rope Boat Wood", nameCn: "绳舟行木", weapon: "Rope Dart", stat: { pzDmg: 4.8, maxPz: 32 }, desc: "Increases Bamboocut elemental multiplier and base stats." },
  { id: "lantern_light", name: "Lantern Light", nameCn: "灯儿亮", weapon: "Rope Dart", stat: { pzPen: 5.2, pzDmg: 2.5 }, desc: "Slices defense with high-frequency darts. Increases elemental penetration." },
  { id: "spider_silk", name: "Spider Silk Line", nameCn: "蛛丝缠", weapon: "Rope Dart", stat: { ropeBonus: 5.5, prec: 8.0 }, desc: "Increases hit accuracy and specific Rope Dart active skills." },

  // Twinblades
  { id: "infernal_strike", name: "Infernal Strike", nameCn: "地狱突", weapon: "Twinblades", stat: { outerPen: 4.8, crit: 3.0 }, desc: "Twinblades focus. Adds physical penetration and base critical rate." },
  { id: "crimson_tide", name: "Crimson Tide", nameCn: "红潮歌", weapon: "Twinblades", stat: { critDmg: 8.0 }, desc: "Bleed execution. Maximizes critical hits on targets." },

  // Spear & Blade
  { id: "heaven_quake", name: "Heavenquaker Art", nameCn: "震天诀", weapon: "Spear", stat: { bossDmg: 4.5, maxOuter: 75 }, desc: "Provides persistent damage scaling against major elite bosses." },
  { id: "storm_breaker", name: "Stormbreaker Mantra", nameCn: "破阵子", weapon: "Spear", stat: { outerPen: 5.0, minOuter: 35 }, desc: "Increases base minimal attack and pierces broad armor elements." },
  { id: "thunder_roar", name: "Thunderclap Roar", nameCn: "雷霆啸", weapon: "Blade", stat: { outerDmg: 3.5, maxOuter: 55 }, desc: "Adds general physical damage multipliers for heavy weapons." },

  // Sword
  { id: "nameless_flow", name: "Nameless Qi Flow", nameCn: "无名流", weapon: "Sword", stat: { allArts: 3.8, critDmg: 4.5 }, desc: "Synchronizes internal sword energy and raises arts scaling." },
  { id: "sword_horizon_xinfa", name: "Sword Horizon Art", nameCn: "剑横江", weapon: "Sword", stat: { outerPen: 4.5, pzPen: 4.5 }, desc: "Dual physical and elemental penetration bonuses." },

  // Fist / Grapple
  { id: "iron_fist", name: "Iron Fist Sutra", nameCn: "金刚拳", weapon: "Fist", stat: { maxOuter: 110 }, desc: "Flat physical scaling for high impact fist styles." },
  { id: "tiger_stride", name: "Tiger Stride", nameCn: "猛虎步", weapon: "Fist", stat: { pzPen: 4.0, prec: 6.0 }, desc: "Focuses on steady stance, passive elemental penetration and precision." },

  // Flute & Support
  { id: "thousand_waves", name: "Thousand Waves Tune", nameCn: "千澜曲", weapon: "Flute", stat: { affDmg: 7.5 }, desc: "Affinity resonance booster. Amplifies magic and support builds." },
  { id: "panacea_breeze", name: "Panacea Breeze", nameCn: "灵妙歌", weapon: "Flute", stat: { aff: 6.0, affDmg: 3.0 }, desc: "Greatly unlocks affinity probability for elementals." },

  // General Mind Techniques
  { id: "autumn_frost", name: "Autumn Frost Chant", nameCn: "秋霜吟", weapon: "General", stat: { crit: 4.0 }, desc: "Sharpens concentration, raising overall critical chance." },
  { id: "flowing_river", name: "Flowing River Qi", nameCn: "大江流", weapon: "General", stat: { minOuter: 42, maxOuter: 42 }, desc: "Balances minimum and maximum baseline physical attacks." },
  { id: "mountain_anchor", name: "Mountain Anchor", nameCn: "不动山", weapon: "General", stat: { bossDmg: 3.8, minOuter: 30 }, desc: "Provides combat stability and mild boss defense pierce." },
  { id: "jade_spirit", name: "Jade Spirit Breath", nameCn: "翠玉息", weapon: "General", stat: { pzDmg: 3.0, critDmg: 3.0 }, desc: "Synergy between elemental damage and critical effectiveness." },
  { id: "wave_chaser_xinfa", name: "Wave Chaser Art", nameCn: "逐浪经", weapon: "General", stat: { aff: 8.0 }, desc: "Amplifies status success rates on bleeding/exhausted foes." },
  { id: "phoenix_soar", name: "Phoenix Soar", nameCn: "凤求凰", weapon: "General", stat: { crit: 3.0, critDmg: 4.0 }, desc: "General damage scaling with standard critical stats." },
  { id: "sunset_gleam", name: "Sunset Gleam", nameCn: "夕阳歌", weapon: "General", stat: { maxOuter: 80, outerPen: 2.0 }, desc: "Robust combination of physical attack and penetration." },
  { id: "winter_chill", name: "Winter Chill", nameCn: "寒芒诀", weapon: "General", stat: { pzPen: 6.0 }, desc: "Slices enemy elemental resistance directly." },
  { id: "divine_breath", name: "Divine Breath", nameCn: "神息咒", weapon: "General", stat: { allArts: 3.0, bossDmg: 2.0 }, desc: "Increases overall combat efficacy and damage vs bosses." },
  { id: "spring_silk", name: "Spring Silk", nameCn: "春蚕丝", weapon: "General", stat: { prec: 12.0 }, desc: "Unmatched precision rating boost, ideal for high tier raids." },
  { id: "abyssal_seal", name: "Abyssal Seal", nameCn: "幽冥印", weapon: "General", stat: { critDmg: 8.0 }, desc: "Vile shadows bolster your critical performance." },
  { id: "golden_shield", name: "Golden Shield", nameCn: "金甲神", weapon: "General", stat: { minOuter: 50 }, desc: "Solidifies baseline damage to guarantee minimum output." },
  { id: "morale_booster", name: "Morale Booster", nameCn: "励军威", weapon: "General", stat: { outerDmg: 4.0 }, desc: "Persistent physical combat damage multiplier." },
  { id: "spirit_meld", name: "Spirit Meld", nameCn: "魂归入", weapon: "General", stat: { pzDmg: 5.0 }, desc: "Increases elemental Bamboocut and Bellstrike multipliers." },
  { id: "eternal_rest", name: "Eternal Rest", nameCn: "长生诀", weapon: "General", stat: { bossDmg: 5.0 }, desc: "Unmatched combat determination. Directly scales damage vs bosses." }
];

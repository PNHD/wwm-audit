import React, { useState } from "react";
import { Hammer, ArrowRight, Save, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import { PanelStats, RelayedGear } from "../types";

interface RelayingSimulatorProps {
  onUpdatePanelFromGear: (stats: Partial<PanelStats>) => void;
  currentPanel: PanelStats;
}

const LV91_CAPS: { [key: string]: { max: number; desc: string; unit: string } } = {
  outerPen: { max: 9.0, desc: "Physical Penetration (Outer Pen)", unit: "%" },
  maxOuter: { max: 63.8, desc: "Max Physical Atk (Max Outer)", unit: "" },
  minOuter: { max: 31.9, desc: "Min Physical Atk (Min Outer)", unit: "" },
  pzPen: { max: 5.2, desc: "Bamboocut Penetration (Pz Pen)", unit: "%" },
  minPz: { max: 20.0, desc: "Min Bamboocut (Min Pz)", unit: "" },
  maxPz: { max: 32.5, desc: "Max Bamboocut (Max Pz)", unit: "" },
  pzDmg: { max: 3.0, desc: "Bamboocut DMG Boost (Pz Dmg)", unit: "%" },
  crit: { max: 6.5, desc: "Crit Rate", unit: "%" },
  prec: { max: 6.5, desc: "Precision", unit: "%" },
  critDmg: { max: 8.0, desc: "Crit Damage (Crit DMG)", unit: "%" },
  aff: { max: 4.5, desc: "Affinity Rate", unit: "%" },
};

const INITIAL_GEAR: RelayedGear[] = [
  {
    slotName: "Helmet",
    baseStats: { maxOuter: 110, pzPen: 2.4 },
    substats: [
      { name: "maxOuter", value: 45.5 },
      { name: "outerPen", value: 6.2 },
    ],
    relayedSubstat: { name: "pzPen", value: 3.5 },
  },
  {
    slotName: "Armor",
    baseStats: { maxOuter: 220, prec: 1.5 },
    substats: [
      { name: "maxOuter", value: 58.0 },
      { name: "outerPen", value: 7.5 },
    ],
    relayedSubstat: { name: "crit", value: 2.8 },
  },
  {
    slotName: "Bracers",
    baseStats: { maxOuter: 120, maxPz: 15 },
    substats: [
      { name: "maxOuter", value: 38.2 },
      { name: "pzPen", value: 2.8 },
    ],
    relayedSubstat: { name: "outerPen", value: 7.0 },
  },
  {
    slotName: "Pants",
    baseStats: { maxOuter: 180, minOuter: 24 },
    substats: [
      { name: "maxOuter", value: 49.0 },
      { name: "minOuter", value: 22.5 },
    ],
    relayedSubstat: { name: "outerPen", value: 6.8 },
  },
  {
    slotName: "Boots",
    baseStats: { maxOuter: 115, prec: 1.2 },
    substats: [
      { name: "maxOuter", value: 42.0 },
      { name: "outerPen", value: 5.5 },
    ],
    relayedSubstat: { name: "pzDmg", value: 1.8 },
  },
  {
    slotName: "Necklace",
    baseStats: { maxOuter: 85, maxPz: 42 },
    substats: [
      { name: "maxOuter", value: 0 }, // placeholder
      { name: "maxPz", value: 26.5 },
    ],
    relayedSubstat: { name: "outerPen", value: 8.2 },
  },
];

export default function RelayingSimulator({ onUpdatePanelFromGear, currentPanel }: RelayingSimulatorProps) {
  const [gears, setGears] = useState<RelayedGear[]>(INITIAL_GEAR);
  const [activeGearIndex, setActiveGearIndex] = useState<number>(0);

  // Feed/Material Gear selection state for simulation
  const [feedStatName, setFeedStatName] = useState<string>("outerPen");
  const [feedStatValue, setFeedStatValue] = useState<number>(8.5);

  const activeGear = gears[activeGearIndex];

  const handleSubstatChange = (type: "substats" | "relayed", index: number, key: string, val: number) => {
    const updated = [...gears];
    const gear = updated[activeGearIndex];
    
    // Clamp to level 91 caps
    const cap = LV91_CAPS[key]?.max || 100;
    const clamped = Math.min(cap, Math.max(0, val));

    if (type === "substats") {
      gear.substats[index] = { name: key, value: clamped };
    } else {
      gear.relayedSubstat = { name: key, value: clamped };
    }
    setGears(updated);
  };

  const handleApplyRelaying = () => {
    const updated = [...gears];
    const gear = updated[activeGearIndex];
    
    // Simulate relaying: replaces or sets the relayed substat
    gear.relayedSubstat = {
      name: feedStatName,
      value: Math.min(LV91_CAPS[feedStatName]?.max || 100, feedStatValue),
    };
    setGears(updated);
  };

  // Sum up all gear stats and apply to main Panel Stats
  const handleApplyAllGearsToPanel = () => {
    const totals: { [key: string]: number } = {
      outerPen: 0,
      maxOuter: 0,
      minOuter: 0,
      pzPen: 0,
      minPz: 0,
      maxPz: 0,
      pzDmg: 0,
      crit: 0,
      prec: 0,
      critDmg: 0,
      aff: 0,
    };

    gears.forEach((g) => {
      // Add Base stats
      Object.entries(g.baseStats).forEach(([name, val]) => {
        const numVal = val as number;
        if (totals[name] !== undefined) totals[name] += numVal;
      });
      // Add regular substats
      g.substats.forEach((sub) => {
        if (totals[sub.name] !== undefined) totals[sub.name] += sub.value;
      });
      // Add inherited relayed substat
      if (g.relayedSubstat) {
        if (totals[g.relayedSubstat.name] !== undefined) {
          totals[g.relayedSubstat.name] += g.relayedSubstat.value;
        }
      }
    });

    const applied: Partial<PanelStats> = {
      outerPen: 12.0 + totals.outerPen, // 12% default open world/soul stats + gear pen
      maxOuter: 2200 + totals.maxOuter, // base 2200 weapon weapon and manual + gear max
      minOuter: 1400 + totals.minOuter,
      pzPen: 6.0 + totals.pzPen,
      minPz: 300 + totals.minPz,
      maxPz: 550 + totals.maxPz,
      pzDmg: 4.0 + totals.pzDmg,
      crit: 65.0 + totals.crit,
      prec: 92.0 + totals.prec,
      critDmg: 45.0 + totals.critDmg,
      aff: 10.0 + totals.aff,
    };

    onUpdatePanelFromGear(applied);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
        <Hammer className="w-5 h-5 text-amber-500" />
        <div>
          <h2 className="font-sans font-semibold text-sm text-slate-100 uppercase tracking-wider flex items-center gap-2">
            Lv91 Gear Relaying Simulator <span className="bg-amber-500/10 text-amber-400 text-[9px] px-2 py-0.5 rounded-full font-mono">SEASON 3</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate Level 91 gear gear forging. Relay premium substats and apply the accumulated values to your core panel calculation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Gear Slots Selection */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Available Gear Pieces</p>
          {gears.map((g, i) => {
            const sumPen = (g.substats.find(s=>s.name==="outerPen")?.value || 0) + (g.relayedSubstat?.name === "outerPen" ? g.relayedSubstat.value : 0);
            return (
              <button
                key={i}
                onClick={() => setActiveGearIndex(i)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs flex justify-between items-center transition-all ${
                  activeGearIndex === i
                    ? "bg-amber-950/40 border-amber-500/50 text-amber-200 shadow-sm"
                    : "bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/40"
                }`}
              >
                <span className="font-medium">{g.slotName}</span>
                {sumPen > 0 && (
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-amber-500/80 font-mono">
                    +{sumPen.toFixed(1)}% Pen
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Gear Edit & Simulator */}
        <div className="md:col-span-8 bg-slate-950/60 rounded-xl p-4 border border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Customizing {activeGear.slotName}
            </h3>
            <span className="text-[10px] text-amber-500/70 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
              Tier 91 Upper Cap
            </span>
          </div>

          {/* Substats sliders */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Regular Substats</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeGear.substats.map((sub, sIdx) => (
                  <div key={sIdx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50">
                    <div className="flex justify-between text-xs mb-1">
                      <select
                        value={sub.name}
                        onChange={(e) => handleSubstatChange("substats", sIdx, e.target.value, sub.value)}
                        className="bg-transparent border-none text-[11px] text-slate-300 focus:outline-none p-0 text-left capitalize font-medium w-fit"
                      >
                        {Object.keys(LV91_CAPS).map((k) => (
                          <option key={k} value={k} className="bg-slate-950 text-slate-200">
                            {LV91_CAPS[k].desc}
                          </option>
                        ))}
                      </select>
                      <span className="font-mono text-amber-400/90 font-semibold">
                        {sub.value}{LV91_CAPS[sub.name]?.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={LV91_CAPS[sub.name]?.max || 10}
                      step="0.1"
                      value={sub.value}
                      onChange={(e) => handleSubstatChange("substats", sIdx, sub.name, parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                      <span>Min: 0</span>
                      <span>Cap: {LV91_CAPS[sub.name]?.max}{LV91_CAPS[sub.name]?.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inherited Relaying Substat */}
            <div className="border-t border-slate-800/80 pt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
                  Inherited Relayed Substat (Relayed / 传承)
                </p>
                {activeGear.relayedSubstat && (
                  <span className="text-[10px] bg-emerald-950/50 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded font-mono">
                    ✓ Relayed
                  </span>
                )}
              </div>

              {activeGear.relayedSubstat ? (
                <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-900/40 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-medium text-amber-200 capitalize">
                      {LV91_CAPS[activeGear.relayedSubstat.name]?.desc}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Substat relayed from material precursor gear</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-amber-400 font-bold text-sm">
                      +{activeGear.relayedSubstat.value}{LV91_CAPS[activeGear.relayedSubstat.name]?.unit}
                    </span>
                    <button
                      onClick={() => {
                        const updated = [...gears];
                        updated[activeGearIndex].relayedSubstat = undefined;
                        setGears(updated);
                      }}
                      className="text-slate-500 hover:text-rose-400 text-[10px]"
                    >
                      Dismount
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center text-xs text-slate-500">
                  No relayed substat active on this piece. Simulate relaying using the tool below.
                </div>
              )}
            </div>

            {/* Relaying simulation engine */}
            <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800">
              <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 text-amber-500" /> Start Relaying Inheritance
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Precursor Substat</label>
                  <select
                    value={feedStatName}
                    onChange={(e) => {
                      setFeedStatName(e.target.value);
                      setFeedStatValue(LV91_CAPS[e.target.value]?.max || 5.0);
                    }}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded px-2 py-1.5 text-xs text-right font-serif"
                  >
                    {Object.keys(LV91_CAPS).map((k) => (
                      <option key={k} value={k}>
                        {LV91_CAPS[k].desc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Precursor Stat Value</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max={LV91_CAPS[feedStatName]?.max || 10}
                    value={feedStatValue}
                    onChange={(e) => setFeedStatValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded px-2 py-1.5 text-xs text-right"
                  />
                </div>
                <button
                  onClick={handleApplyRelaying}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded py-1.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Transfer Substat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 items-start text-xs text-amber-500/80 max-w-xl">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            <strong>Note on Level 91 caps:</strong> Physical pen maximum on level 91 gear can reach <strong>9.0%</strong> per slot (max 2 regular + 1 relayed slots can sum up to high ratings). Hitting premium penetration values across multiple items is the essential step to graduation.
          </p>
        </div>
        <button
          onClick={handleApplyAllGearsToPanel}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer font-serif"
        >
          <Sparkles className="w-4 h-4" /> Apply All Gears to Calculator Panel
        </button>
      </div>
    </div>
  );
}

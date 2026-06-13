import React, { useState } from "react";
import { BookOpen, Sparkles, Plus, Minus, Info } from "lucide-react";
import { PanelStats, ArsenalWeapon } from "../types";

interface ArsenalSimulatorProps {
  onUpdatePanelFromArsenal: (stats: Partial<PanelStats>) => void;
}

const WEAPONS_IN_MANUAL: ArsenalWeapon[] = [
  {
    id: "umbrella",
    name: "Everspring Umbrella (Xue Yi Diao)",
    level: 5,
    maxLevel: 10,
    statsPerLevel: { minOuter: 12.5, maxOuter: 25.8, umbBonus: 0.6 },
  },
  {
    id: "rope",
    name: "Rope Dart (Du Gu Qiang)",
    level: 4,
    maxLevel: 10,
    statsPerLevel: { minOuter: 10.2, maxOuter: 21.5, ropeBonus: 0.5 },
  },
  {
    id: "bow",
    name: "Battle Bow (Jing Wei Gong)",
    level: 6,
    maxLevel: 10,
    statsPerLevel: { crit: 0.8, prec: 0.7, allArts: 0.4 },
  },
  {
    id: "sword",
    name: "Long Sword (Qing Feng Jian)",
    level: 3,
    maxLevel: 10,
    statsPerLevel: { minOuter: 6.0, maxOuter: 12.0, crit: 0.3 },
  },
];

export default function ArsenalSimulator({ onUpdatePanelFromArsenal }: ArsenalSimulatorProps) {
  const [weapons, setWeapons] = useState<ArsenalWeapon[]>(WEAPONS_IN_MANUAL);

  const handleLevelChange = (id: string, dir: number) => {
    const updated = weapons.map((w) => {
      if (w.id === id) {
        const nextLvl = Math.min(w.maxLevel, Math.max(0, w.level + dir));
        return { ...w, level: nextLvl };
      }
      return w;
    });
    setWeapons(updated);
  };

  // Calculates combined global passive stats from current levels
  const getCombinedStats = () => {
    const sum: { [key: string]: number } = {
      minOuter: 0,
      maxOuter: 0,
      crit: 0,
      prec: 0,
      umbBonus: 0,
      ropeBonus: 0,
      allArts: 0,
    };

    weapons.forEach((w) => {
      Object.entries(w.statsPerLevel).forEach(([stat, val]) => {
        const numVal = typeof val === "number" ? val : 0;
        if (sum[stat] !== undefined) {
          sum[stat] += numVal * w.level;
        }
      });
    });

    return sum;
  };

  const totals = getCombinedStats();

  const handleSyncToPanel = () => {
    // Synchronizes the calculated Arsenal global passives to the main panel stats!
    const applied: Partial<PanelStats> = {
      minOuter: 1400 + totals.minOuter,
      maxOuter: 2200 + totals.maxOuter,
      crit: 65.0 + totals.crit,
      prec: 92.0 + totals.prec,
      umbBonus: totals.umbBonus,
      ropeBonus: totals.ropeBonus,
      allArts: totals.allArts,
    };
    onUpdatePanelFromArsenal(applied);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
        <BookOpen className="w-5 h-5 text-amber-500" />
        <div>
          <h2 className="font-sans font-semibold text-sm text-slate-100 uppercase tracking-wider flex items-center gap-2">
            Arsenal Manual System Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Register and upgrade weapons in the manual collection to gain global passive bonus attributes characteristic of Season 3 mechanics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Weapons List */}
        <div className="md:col-span-8 space-y-3">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Registered Weapons & Upgrade Levels</p>
          {weapons.map((w) => (
            <div
              key={w.id}
              className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
            >
              <div>
                <span className="font-semibold text-xs text-slate-200">{w.name}</span>
                <div className="flex flex-wrap gap-2.5 mt-1.5 text-[10px] text-slate-400 font-mono">
                  {Object.entries(w.statsPerLevel).map(([stat, val]) => {
                    const numVal = typeof val === "number" ? val : 0;
                    const calculated = numVal * w.level;
                    return (
                      <span key={stat} className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800/40">
                        {stat === "minOuter" && `Min Atk: +${calculated.toFixed(1)}`}
                        {stat === "maxOuter" && `Max Atk: +${calculated.toFixed(1)}`}
                        {stat === "crit" && `Crit Rate: +${calculated.toFixed(1)}%`}
                        {stat === "prec" && `Precision: +${calculated.toFixed(1)}%`}
                        {stat === "umbBonus" && `Umbrella Dmg: +${calculated.toFixed(1)}%`}
                        {stat === "ropeBonus" && `Rope Dart Dmg: +${calculated.toFixed(1)}%`}
                        {stat === "allArts" && `Martial Arts Dmg: +${calculated.toFixed(1)}%`}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Adjust Level buttons */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs text-slate-500">Level {w.level}/{w.maxLevel}</span>
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded p-1">
                  <button
                    onClick={() => handleLevelChange(w.id, -1)}
                    disabled={w.level <= 0}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold font-mono text-amber-500">{w.level}</span>
                  <button
                    onClick={() => handleLevelChange(w.id, 1)}
                    disabled={w.level >= w.maxLevel}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Passives Card */}
        <div className="md:col-span-4 bg-amber-950/20 rounded-xl p-4 border border-amber-900/20 text-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-amber-200 uppercase tracking-wider text-[10px] mb-3 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Combined Passive Attributes
            </h3>
            <div className="space-y-2 text-slate-300 font-mono text-[11px]">
              <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
                <span>Physical Atk (Min/Max):</span>
                <span className="text-amber-400 font-bold">+{totals.minOuter.toFixed(1)} / +{totals.maxOuter.toFixed(1)}</span>
              </div>
              <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
                <span>Crit Rate %:</span>
                <span className="text-amber-400 font-bold">+{totals.crit.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
                <span>Precision %:</span>
                <span className="text-amber-400 font-bold">+{totals.prec.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
                <span>Everspring Umbrella:</span>
                <span className="text-amber-400 font-bold">+{totals.umbBonus.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
                <span>Rope Dart Bonus:</span>
                <span className="text-amber-400 font-bold">+{totals.ropeBonus.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>All Skills (All Arts):</span>
                <span className="text-amber-400 font-bold">+{totals.allArts.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSyncToPanel}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 rounded text-xs flex items-center justify-center gap-1 shadow-md transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Sync Global Passives to Panel
            </button>
            <p className="text-[10px] text-slate-500 mt-2 text-center flex items-center gap-1 justify-center">
              <Info className="w-3 h-3 shrink-0" /> Applies the summed passives to your main setup character stats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

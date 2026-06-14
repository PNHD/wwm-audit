import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Info,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  RefreshCw,
  HelpCircle,
  Award,
  ChevronDown
} from "lucide-react";
import { PanelStats, TierConstants } from "../types";
import { WWM_DATA } from "../data/wwmData";
import { calcSkill, getRotationForBuild } from "../utils/calc";

interface StatSwapSimulatorProps {
  adjustedPanel: PanelStats;
  activeTier: TierConstants;
  datang: boolean;
  yishui: boolean;
  selectedBuild: string;
}

interface StatOption {
  label: string;
  key: keyof PanelStats | "strength" | "power" | "agility" | "ownWeapon";
  subCapVal: number;
  unit: string;
}

const STAT_OPTIONS: StatOption[] = [
  { label: "Max Physical ATK", key: "maxOuter", subCapVal: 63.8, unit: "" },
  { label: "Min Physical ATK", key: "minOuter", subCapVal: 63.8, unit: "" },
  { label: "Physical Pen (%)", key: "outerPen", subCapVal: 9.0, unit: "%" },
  { label: "Critical Rate (%)", key: "crit", subCapVal: 7.4, unit: "%" },
  { label: "Precision (%)", key: "prec", subCapVal: 6.6, unit: "%" },
  { label: "Affinity Rate (%)", key: "aff", subCapVal: 3.6, unit: "%" },
  { label: "Max Bamboocut ATK", key: "maxPz", subCapVal: 36.2, unit: "" },
  { label: "Min Bamboocut ATK", key: "minPz", subCapVal: 36.2, unit: "" },
  { label: "Bamboocut Pen (%)", key: "pzPen", subCapVal: 5.2, unit: "%" },
  { label: "Boss DMG Bonus (%)", key: "bossDmg", subCapVal: 2.6, unit: "%" },
  { label: "All Weapon Bonus (%)", key: "allArts", subCapVal: 2.6, unit: "%" },
  { label: "Own Weapon Bonus (%)", key: "ownWeapon", subCapVal: 5.2, unit: "%" },
  { label: "Strength (Strength-to-ATK)", key: "strength", subCapVal: 40.4, unit: "" },
  { label: "Power (Power-to-ATK)", key: "power", subCapVal: 40.4, unit: "" },
  { label: "Agility (Agility-to-ATK)", key: "agility", subCapVal: 40.4, unit: "" }
];

interface QuickSwapConfig {
  removeStat: string; // key of STAT_OPTIONS
  removeValue: number;
  addStat: string; // key of STAT_OPTIONS
  addValue: number;
}

interface MultiSwapItem {
  id: string;
  removeStat: string;
  removeValue: number;
  addStat: string;
  addValue: number;
}

export default function StatSwapSimulator({
  adjustedPanel,
  activeTier,
  datang,
  yishui,
  selectedBuild
}: StatSwapSimulatorProps) {
  // Class selector for marginal gains (default to capitalized first match, or user select)
  const classKeys = Object.keys(WWM_DATA.classes);
  const [selectedClass, setSelectedClass] = useState<string>(() => {
    // Attempt to match the selectedBuild to an existing class key (case-insensitively)
    const match = classKeys.find(
      (k) => k.toLowerCase() === selectedBuild.toLowerCase() ||
             k.toLowerCase().includes(selectedBuild.toLowerCase().split("-")[0])
    );
    return match || classKeys[0];
  });

  // State for single-swap simulator
  const [quickSwap, setQuickSwap] = useState<QuickSwapConfig>({
    removeStat: "crit",
    removeValue: 7.4,
    addStat: "outerPen",
    addValue: 9.0
  });

  // State for multi-swap entries
  const [multiSwaps, setMultiSwaps] = useState<MultiSwapItem[]>([
    {
      id: "1",
      removeStat: "crit",
      removeValue: 7.4,
      addStat: "outerPen",
      addValue: 9.0
    }
  ]);

  // Lookup subcap values easily when changed
  const getSubCap = (key: string): number => {
    const found = STAT_OPTIONS.find((o) => o.key === key);
    return found ? found.subCapVal : 1.0;
  };

  const handleQuickRemoveStatChange = (key: string) => {
    setQuickSwap((prev) => ({
      ...prev,
      removeStat: key,
      removeValue: getSubCap(key)
    }));
  };

  const handleQuickAddStatChange = (key: string) => {
    setQuickSwap((prev) => ({
      ...prev,
      addStat: key,
      addValue: getSubCap(key)
    }));
  };

  // Helper dictionary to map Chinese marginalGains string key to UI friendly info
  const getStatSubMaxInfo = (statLabel: string) => {
    const mapping: Record<string, { display: string; value: string }> = {
      "Own Weapon Bonus": { display: "Own Weapon Bonus (Bùi nhùi dã ngoại)", value: "+5.2%" },
      "Phys Pen": { display: "Physical Penetration (Xuyên giáp)", value: "+9.0%" },
      "Boss DMG Bonus": { display: "Boss DMG Bonus (Thú dữ sát thương)", value: "+2.6%" },
      "All Weapon Bonus": { display: "All Weapon Bonus (Toàn binh khí)", value: "+2.6%" },
      "Bamboocut Pen": { display: "Bamboocut Penetration (Xuyên phá trúc)", value: "+5.2%" },
      "Precision": { display: "Precision (Chính xác)", value: "+6.6%" },
      "Max Phys Atk": { display: "Max Physical Attack (Ngoại công giới hạn)", value: "+63.8" },
      "Strength": { display: "Strength (Cường tráng chuyển công)", value: "+40.4 (~+60.6 Max ATK)" },
      "Min Phys Atk": { display: "Min Physical Attack (Ngoại công tối thiểu)", value: "+63.8" },
      "Power": { display: "Power (Kính đạo chuyển công)", value: "+40.4 (~+60.6 Max ATK)" },
      "Agility": { display: "Agility (Tấn tiệp chuyển công)", value: "+40.4 (~+60.6 Min ATK)" },
      "Affinity Rate": { display: "Affinity Rate (Thức phá)", value: "+3.6%" },
      "Max Bamboocut": { display: "Max Bamboocut ATK (Phá trúc giới hạn)", value: "+36.2" },
      "Min Bamboocut": { display: "Min Bamboocut ATK (Phá trúc tối thiểu)", value: "+36.2" },
      "Crit Rate": { display: "Critical Rate (Hội tâm)", value: "+7.4%" },
      "Crit DMG": { display: "Critical DMG Bonus (Hội thương)", value: "+5.4%" },
      "Outgoing Healing": { display: "Outgoing Healing (Từ trị liệu tăng)", value: "+3.6%" },
      "Max Mystic Bonus": { display: "Max Mystic Skill Bonus (Vũ học tôn giả)", value: "+2.6%" }
    };

    return mapping[statLabel] || { display: statLabel, value: "N/A" };
  };

  // Safe Panel modifier function
  const applyStatChangesOnPanel = (
    panel: PanelStats,
    changes: Array<{ key: string; val: number; isRemoval: boolean }>
  ): PanelStats => {
    const cloned = { ...panel };

    changes.forEach(({ key, val, isRemoval }) => {
      const coeff = isRemoval ? -1 : 1;
      const scaledValue = val * coeff;

      switch (key) {
        case "strength":
        case "power":
          cloned.maxOuter = Math.max(0, cloned.maxOuter + scaledValue * 1.5);
          break;
        case "agility":
          cloned.minOuter = Math.max(0, cloned.minOuter + scaledValue * 1.5);
          break;
        case "ownWeapon":
          cloned.umbBonus = Math.max(0, cloned.umbBonus + scaledValue);
          cloned.ropeBonus = Math.max(0, cloned.ropeBonus + scaledValue);
          break;
        default:
          if (key in cloned) {
            (cloned as any)[key] = Math.max(
              0,
              ((cloned as any)[key] as number) + scaledValue
            );
          }
          break;
      }
    });

    return cloned;
  };

  // Calculation executor
  const runDpsSimulation = (panel: PanelStats): number => {
    const rotation = getRotationForBuild(selectedBuild);
    let totalDmg = 0;
    rotation.forEach((item) => {
      const { total } = calcSkill(item, panel, activeTier, {
        set: panel.set || "stars",
        datang,
        yishui,
        buildKey: selectedBuild
      });
      totalDmg += total;
    });
    return totalDmg;
  };

  // --- CALC 1: Quick Swap Result ---
  const quickSwapResult = useMemo(() => {
    const baseDmg = runDpsSimulation(adjustedPanel);
    if (baseDmg <= 0) return { percentChange: 0, gainText: "0.0%", isPositive: true };

    const modifiedPanel = applyStatChangesOnPanel(adjustedPanel, [
      { key: quickSwap.removeStat, val: quickSwap.removeValue, isRemoval: true },
      { key: quickSwap.addStat, val: quickSwap.addValue, isRemoval: false }
    ]);

    const modifiedDmg = runDpsSimulation(modifiedPanel);
    const percentChange = ((modifiedDmg - baseDmg) / baseDmg) * 100;

    return {
      percentChange,
      gainText: `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`,
      isPositive: percentChange >= 0
    };
  }, [adjustedPanel, quickSwap, activeTier, datang, yishui, selectedBuild]);

  // --- CALC 2: Multi Swap Result ---
  const multiSwapResult = useMemo(() => {
    const baseDmg = runDpsSimulation(adjustedPanel);
    if (baseDmg <= 0 || multiSwaps.length === 0) {
      return { percentChange: 0, gainText: "0.0%", isPositive: true };
    }

    const compiledSwaps: Array<{ key: string; val: number; isRemoval: boolean }> = [];
    multiSwaps.forEach((swap) => {
      compiledSwaps.push({ key: swap.removeStat, val: swap.removeValue, isRemoval: true });
      compiledSwaps.push({ key: swap.addStat, val: swap.addValue, isRemoval: false });
    });

    const modifiedPanel = applyStatChangesOnPanel(adjustedPanel, compiledSwaps);
    const modifiedDmg = runDpsSimulation(modifiedPanel);
    const percentChange = ((modifiedDmg - baseDmg) / baseDmg) * 100;

    return {
      percentChange,
      gainText: `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`,
      isPositive: percentChange >= 0
    };
  }, [adjustedPanel, multiSwaps, activeTier, datang, yishui, selectedBuild]);

  // --- Helpers for multi swaps ---
  const handleAddMultiSwap = () => {
    if (multiSwaps.length >= 5) return; // protect overflow
    const newId = Math.random().toString();
    setMultiSwaps((prev) => [
      ...prev,
      {
        id: newId,
        removeStat: "crit",
        removeValue: 7.4,
        addStat: "outerPen",
        addValue: 9.0
      }
    ]);
  };

  const handleRemoveMultiSwap = (id: string) => {
    setMultiSwaps((prev) => prev.filter((s) => s.id !== id));
  };

  const updateMultiSwapField = (id: string, field: keyof MultiSwapItem, val: any) => {
    setMultiSwaps((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, [field]: val };
          // If changing stat, auto-update cap value
          if (field === "removeStat") {
            updated.removeValue = getSubCap(val as string);
          } else if (field === "addStat") {
            updated.addValue = getSubCap(val as string);
          }
          return updated;
        }
        return s;
      })
    );
  };

  // Sorted marginal gains table
  const marginalGainsList = useMemo(() => {
    const classData = WWM_DATA.classes[selectedClass as keyof typeof WWM_DATA.classes];
    if (!classData || !classData.marginalGains) return [];

    // Clone and sort descending
    return [...classData.marginalGains].sort((a, b) => b.gainPct - a.gainPct);
  }, [selectedClass]);

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="bg-[#141210] border border-amber-900/10 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider font-serif">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          <span>Stat Swap Simulator / Giả Lập Hoán Đổi Thuộc Tính</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Công cụ giúp người dùng phân tích: <strong>"Nếu tôi đổi thuộc tính phụ X thành thuộc tính phụ Y trên 1 món trang bị"</strong>, thì sát thương thực tế (DPS) sẽ tăng giảm bao nhiêu %? Công cụ sử dụng trực tiếp chuỗi chiêu thức ROTATION thực và chỉ số nhân từ bảng đang tính.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Marginal Gains Table */}
        <div className="lg:col-span-1 bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-serif text-amber-500 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" /> BẢNG HIỆU SUẤT TRỤC PHỤ (T91)
              </h3>
              
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-slate-900 text-[11px] text-amber-300 font-bold border border-slate-800 rounded px-2.5 py-1 pr-6 hover:border-amber-500/30 transition-all appearance-none outline-none"
                >
                  {classKeys.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2.5 top-2.5">
                  <ChevronDown className="w-3 h-3 text-amber-500" />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
              Thứ tự ưu tiên hiệu suất thuộc tính phụ cho hệ phái <strong>{selectedClass}</strong> tối ưu hóa ở Tier 91 (mức thuộc tính max của 1 dòng):
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500">
                    <th className="py-1.5 px-2">Hạng</th>
                    <th className="py-1.5 px-2">Thuộc tính</th>
                    <th className="py-1.5 px-2 text-right">Hiệu suất %</th>
                    <th className="py-1.5 px-2 text-right">Giá trị max</th>
                  </tr>
                </thead>
                <tbody>
                  {marginalGainsList.map((gain, index) => {
                    const info = getStatSubMaxInfo(gain.stat);
                    const isTop3 = index < 3;
                    return (
                      <tr
                        key={gain.stat}
                        className={`border-b border-slate-900/40 transition-colors ${
                          isTop3 ? "text-amber-400 font-semibold bg-amber-950/5" : "text-slate-300 hover:text-slate-100"
                        }`}
                      >
                        <td className="py-2 px-2">
                          <span
                            className={`inline-block w-4 h-4 text-center text-[10px] leading-4 rounded-full font-bold ${
                              index === 0
                                ? "bg-amber-500 text-slate-950"
                                : index === 1
                                ? "bg-amber-600 text-white"
                                : index === 2
                                ? "bg-yellow-600 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-2 px-2 max-w-[140px] truncate" title={info.display}>
                          {info.display}
                        </td>
                        <td className="py-2 px-2 text-right text-emerald-400 font-bold">
                          +{gain.gainPct.toFixed(2)}%
                        </td>
                        <td className="py-2 px-2 text-right text-slate-400">
                          {info.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 text-[9px] text-slate-500 leading-relaxed font-mono">
            * Số liệu tính toán tại mức phòng thủ boss CN 559. Trật tự độ ưu tiên dòng phụ này có giá trị xác thực cao cho trang bị Tier 91 / Lv95.
          </div>
        </div>

        {/* Right Column: QUICK STAT SWAP & MULTI-SWAP COMPARE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Swap Panel */}
          <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-serif text-amber-500 font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> 1. QUICK STAT SWAP / THAY ĐỔI NHANH 1 DÒNG
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-end">
              {/* Dropdown Remove */}
              <div className="lg:col-span-3 space-y-1.5">
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-wide">
                  ❌ Bỏ thuộc tính này (Remove)
                </label>
                <div className="relative">
                  <select
                    value={quickSwap.removeStat}
                    onChange={(e) => handleQuickRemoveStatChange(e.target.value)}
                    className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded px-3 py-2 pr-8 focus:border-amber-500/50 outline-none transition-all cursor-pointer font-medium"
                  >
                    {STAT_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-3">
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Input Value Remove */}
              <div className="lg:col-span-1 space-y-1.5">
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-wide text-right">
                  Trị số
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={quickSwap.removeValue}
                  onChange={(e) =>
                    setQuickSwap((prev) => ({
                      ...prev,
                      removeValue: parseFloat(e.target.value) || 0
                    }))
                  }
                  className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded px-2 py-2 text-right focus:border-amber-500/50 outline-none font-mono"
                />
              </div>

              {/* Dropdown Add */}
              <div className="lg:col-span-2 space-y-1.5">
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-wide">
                  💚 Thêm thuộc tính này (Add)
                </label>
                <div className="relative">
                  <select
                    value={quickSwap.addStat}
                    onChange={(e) => handleQuickAddStatChange(e.target.value)}
                    className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded px-3 py-2 pr-8 focus:border-amber-500/50 outline-none transition-all cursor-pointer font-medium"
                  >
                    {STAT_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-3">
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Input Value Add */}
              <div className="lg:col-span-1 space-y-1.5">
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-wide text-right">
                  Trị số
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={quickSwap.addValue}
                  onChange={(e) =>
                    setQuickSwap((prev) => ({
                      ...prev,
                      addValue: parseFloat(e.target.value) || 0
                    }))
                  }
                  className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded px-2 py-2 text-right focus:border-amber-500/50 outline-none font-mono"
                />
              </div>
            </div>

            {/* Visual Result Box */}
            <div className="mt-4 border border-slate-900 bg-[#0d0a08] rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                <div className="text-[11px] text-slate-400">
                  Phân tích thực nghiệm dựa trên nhân vật:
                </div>
                <div className="text-xs text-slate-300 font-mono leading-relaxed">
                  Thay:{" "}
                  <strong className="text-rose-400">
                    -{quickSwap.removeValue}
                    {STAT_OPTIONS.find((o) => o.key === quickSwap.removeStat)?.unit}{" "}
                    {STAT_OPTIONS.find((o) => o.key === quickSwap.removeStat)?.label}
                  </strong>{" "}
                  &rarr;{" "}
                  <strong className="text-emerald-400">
                    +{quickSwap.addValue}
                    {STAT_OPTIONS.find((o) => o.key === quickSwap.addStat)?.unit}{" "}
                    {STAT_OPTIONS.find((o) => o.key === quickSwap.addStat)?.label}
                  </strong>
                </div>
              </div>

              <div className="flex gap-4 items-center shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">DỰ TÍNH HIỆU QUẢ DPS:</div>
                  <div
                    className={`text-2xl font-black font-serif tracking-tight ${
                      quickSwapResult.isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {quickSwapResult.gainText}
                  </div>
                </div>
                <div className="p-2.5 rounded-full bg-slate-900/60 border border-slate-800">
                  {quickSwapResult.isPositive ? (
                    <TrendingUp className="w-6 h-6 text-emerald-400 animate-bounce" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-rose-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Swap Compare Section */}
          <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="text-xs font-serif text-amber-500 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-amber-500" /> 2. MULTI-SWAP COMPILATION / HOÁN ĐỔI ĐỒNG THỜI NHIỀU DÒNG
              </h3>

              <button
                onClick={handleAddMultiSwap}
                disabled={multiSwaps.length >= 5}
                className="bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-[10px] font-bold py-1 px-3 rounded transition-all flex items-center gap-1 cursor-pointer select-none"
              >
                <Plus className="w-3 h-3" /> Thêm hoán đổi
              </button>
            </div>

            {multiSwaps.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-500">
                Chưa có hoán đổi đồng thời nào được thiết lập. Hãy bấm nút "Thêm hoán đổi" ở trên.
              </div>
            ) : (
              <div className="space-y-3">
                {multiSwaps.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-3 border border-slate-900/80 bg-slate-950/40 rounded-lg p-3 relative hover:border-slate-800 transition-all font-mono"
                  >
                    {/* Entry Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-1 rounded font-bold">
                        Thay đổi #{index + 1}
                      </span>
                    </div>

                    {/* Swap Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1 w-full text-xs">
                      {/* Removals */}
                      <div className="md:col-span-2 flex gap-1.5 items-center">
                        <span className="text-[10px] text-rose-400 text-right w-10 shrink-0 font-bold">
                          Bỏ (R)
                        </span>
                        <div className="relative flex-1">
                          <select
                            value={item.removeStat}
                            onChange={(e) =>
                              updateMultiSwapField(item.id, "removeStat", e.target.value)
                            }
                            className="w-full bg-slate-900 text-[11px] text-slate-300 border border-slate-800 rounded px-2 py-1.5 pr-6 cursor-pointer outline-none"
                          >
                            {STAT_OPTIONS.map((opt) => (
                              <option key={opt.key} value={opt.key}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="number"
                          step="0.1"
                          value={item.removeValue}
                          onChange={(e) =>
                            updateMultiSwapField(
                              item.id,
                              "removeValue",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-14 bg-slate-900 text-[11px] text-slate-300 border border-slate-800 rounded px-1.5 py-1.5 text-right outline-none"
                        />
                      </div>

                      {/* Additions */}
                      <div className="md:col-span-2 flex gap-1.5 items-center">
                        <span className="text-[10px] text-emerald-400 text-right w-10 shrink-0 font-bold">
                          Thêm (A)
                        </span>
                        <div className="relative flex-1">
                          <select
                            value={item.addStat}
                            onChange={(e) =>
                              updateMultiSwapField(item.id, "addStat", e.target.value)
                            }
                            className="w-full bg-slate-900 text-[11px] text-slate-300 border border-slate-800 rounded px-2 py-1.5 pr-6 cursor-pointer outline-none"
                          >
                            {STAT_OPTIONS.map((opt) => (
                              <option key={opt.key} value={opt.key}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="number"
                          step="0.1"
                          value={item.addValue}
                          onChange={(e) =>
                            updateMultiSwapField(
                              item.id,
                              "addValue",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-14 bg-slate-900 text-[11px] text-slate-300 border border-slate-800 rounded px-1.5 py-1.5 text-right outline-none"
                        />
                      </div>
                    </div>

                    {/* Delete entry */}
                    <button
                      onClick={() => handleRemoveMultiSwap(item.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Xóa đổi dòng này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Compiled Multi-Swap Results Box */}
            <div className="border border-amber-900/15 bg-amber-950/5 rounded-xl p-4.5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-amber-500 tracking-wide uppercase flex items-center gap-1 justifying-center sm:justify-start">
                  🏁 TẤT CẢ ({multiSwaps.length}) THAY ĐỔI ÁP DỤNG ĐỒNG THỜI
                </div>
                <p className="text-[11px] text-slate-400">
                  DPS ước lượng khi thực hiện tất cả thay đổi trên đồng bộ một lúc.
                </p>
              </div>

              <div className="flex gap-4 items-center shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">TỔNG DPS PHÁT SINH:</div>
                  <div
                    className={`text-2xl font-black font-serif tracking-tight ${
                      multiSwapResult.isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {multiSwapResult.gainText}
                  </div>
                </div>
                <div className="p-2.5 rounded-full bg-slate-900/60 border border-slate-850">
                  {multiSwapResult.isPositive ? (
                    <TrendingUp className="w-6 h-6 text-emerald-400 animate-pulse" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-rose-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface PanelStats {
  minOuter: number;
  maxOuter: number;
  outerPen: number;
  minPz: number;
  maxPz: number;
  pzPen: number;
  pzDmg: number;
  prec: number;
  crit: number;
  aff: number;
  dcrit: number;
  daff: number;
  critDmg: number;
  affDmg: number;
  outerDmg: number;
  bossDmg: number;
  umbBonus: number;
  ropeBonus: number;
  allArts: number;
  skillDmg: number;
  set: string;
  iwGeneralDmg?: number;
  iwOuterPen?: number;
  iwPzPen?: number;
  iwPzDmg?: number;
}

export interface TierConstants {
  def: number;
  judgeRes: number;
  foodMin: number;
  foodMax: number;
  baseMinOuter: number;
  baseMaxOuter: number;
  baseCrit: number;
  baseAff: number;
  basePrec: number;
  armoryMin: number;
  armoryMax: number;
  hiddenAttr: number;
  pzPenBase: number;
  pzDmgBase: number;
  physRes: number;
  attrRes: number;
  name: string;
}

export interface SkillDefinition {
  outerRatio: number;
  fixed: number;
  eleRatio: number;
  exCritDmg: number;
  exDmg: number;
  exPen: number;
  isCharge: number;
  type: string;
  wType: string;
  force: string;
  special: string;
  csBonus: number;
}

export interface RotationItem {
  name: string;
  count: number;
  isDingyin: boolean;
  generalBonus: number;
  yishui: number;
  tiaozhan: number;
}

export interface RelayedGear {
  slotName: string;
  baseStats: { [key: string]: number };
  substats: { name: string; value: number }[];
  relayedSubstat?: { name: string; value: number };
}

export interface ArsenalWeapon {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  statsPerLevel: { [key: string]: number };
}

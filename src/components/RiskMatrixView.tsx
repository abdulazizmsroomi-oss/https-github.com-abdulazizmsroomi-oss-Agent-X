import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingDown, 
  Sliders 
} from 'lucide-react';
import { Language, RiskMatrixConfig, ControlItem } from '../types';

interface RiskMatrixViewProps {
  lang: Language;
  controls: ControlItem[];
  riskConfig: RiskMatrixConfig;
  onUpdateRiskConfig: (config: RiskMatrixConfig) => void;
  onSelectControl: (control: ControlItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const RiskMatrixView: React.FC<RiskMatrixViewProps> = ({
  lang,
  controls,
  riskConfig,
  onUpdateRiskConfig,
  onSelectControl,
  onNavigateTab
}) => {
  const isAr = lang === 'ar';
  const [matrixViewMode, setMatrixViewMode] = useState<'inherent' | 'residual'>('residual');
  const [selectedCell, setSelectedCell] = useState<{ l: number; i: number } | null>(null);

  const dim = riskConfig.dimension;

  // Compute risk level for a score
  const getRiskLevel = (score: number) => {
    const maxScore = dim * dim;
    const normScore = (score / maxScore) * 25;
    if (normScore <= riskConfig.thresholds.low) return { level: 'LOW', levelAr: 'منخفض', style: 'bg-neutral-50 text-neutral-900 border-neutral-300' };
    if (normScore <= riskConfig.thresholds.medium) return { level: 'MEDIUM', levelAr: 'متوسط', style: 'bg-amber-50 text-amber-950 border-amber-300' };
    if (normScore <= riskConfig.thresholds.high) return { level: 'HIGH', levelAr: 'عالي', style: 'bg-orange-50 text-orange-950 border-orange-300' };
    return { level: 'CRITICAL', levelAr: 'حرج', style: 'bg-red-50 text-red-950 border-red-300' };
  };

  // Cell controls
  const getControlsInCell = (likelihood: number, impact: number) => {
    return controls.filter(c => {
      const l = matrixViewMode === 'inherent' ? c.inherentLikelihood : c.residualLikelihood;
      const i = matrixViewMode === 'inherent' ? c.inherentImpact : c.residualImpact;
      const scaledL = Math.min(l, dim);
      const scaledI = Math.min(i, dim);
      return scaledL === likelihood && scaledI === impact;
    });
  };

  // Total risk metrics
  const totalInherentScore = controls.reduce((acc, c) => acc + (c.inherentLikelihood * c.inherentImpact), 0);
  const totalResidualScore = controls.reduce((acc, c) => acc + (c.residualLikelihood * c.residualImpact), 0);
  const reductionPercentage = totalInherentScore > 0 
    ? Math.round(((totalInherentScore - totalResidualScore) / totalInherentScore) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
              <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                {isAr ? 'تقييم وإدارة المخاطر المؤسسية ISO 31000' : 'Enterprise Risk Assessment (ISO 31000)'}
              </span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white mt-2">
              {isAr ? 'مصفوفة المخاطر الكامنة والمتبقية القابلة للتخصيص' : 'Customizable Inherent & Residual Risk Matrix'}
            </h1>
            <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300 mt-0.5">
              {isAr 
                ? 'تخصيص كامل لأبعاد المصفوفة (٣×٣، ٤×٤، ٥×٥) ومعاملات التأثير والاحتمالية وعتبات المعالجة وفق معايير الحوكمة الوطنية والدولية.'
                : 'Fully customizable risk evaluation grids (3x3, 4x4, 5x5) calculating inherent vs residual risk after technical control deployment.'}
            </p>
          </div>

          {/* Dimension Selector & Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* 3x3, 4x4, 5x5 Toggle */}
            <div className="flex items-center bg-teal-50/50 dark:bg-slate-900 p-1 rounded-lg border-2 border-teal-300 dark:border-teal-500/50">
              {([3, 4, 5] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => onUpdateRiskConfig({ ...riskConfig, dimension: d })}
                  className={`px-3 py-1 text-xs font-black rounded transition-colors ${
                    dim === d
                      ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                      : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {d}x{d}
                </button>
              ))}
            </div>

            {/* Inherent vs Residual Switch */}
            <div className="flex items-center bg-teal-50/50 dark:bg-slate-900 p-1 rounded-lg border-2 border-teal-300 dark:border-teal-500/50">
              <button
                onClick={() => setMatrixViewMode('inherent')}
                className={`px-3 py-1 text-xs font-black rounded transition-colors ${
                  matrixViewMode === 'inherent'
                    ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                    : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
                }`}
              >
                {isAr ? 'المخاطر الكامنة (Inherent)' : 'Inherent Risk'}
              </button>
              <button
                onClick={() => setMatrixViewMode('residual')}
                className={`px-3 py-1 text-xs font-black rounded transition-colors ${
                  matrixViewMode === 'residual'
                    ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                    : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
                }`}
              >
                {isAr ? 'المخاطر المتبقية (Residual)' : 'Residual Risk'}
              </button>
            </div>

          </div>
        </div>

        {/* Risk Exposure Metrics Bar */}
        <div className="mt-5 pt-4 border-t-2 border-teal-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg bg-white dark:bg-[#080e1b] border-2 border-teal-200 dark:border-teal-500/40">
            <span className="text-[11px] text-teal-800 dark:text-cyan-400 font-bold">
              {isAr ? 'إجمالي النقاط الكامنة قبل التدابير' : 'Aggregate Inherent Risk Score'}
            </span>
            <p className="text-xl font-black text-neutral-950 dark:text-white tabular-nums mt-0.5">
              {totalInherentScore}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white dark:bg-[#080e1b] border-2 border-teal-200 dark:border-teal-500/40">
            <span className="text-[11px] text-teal-800 dark:text-cyan-400 font-bold">
              {isAr ? 'النقاط المتبقية بعد تطبيق الضوابط' : 'Current Residual Risk Score'}
            </span>
            <p className="text-xl font-black text-neutral-950 dark:text-white tabular-nums mt-0.5">
              {totalResidualScore}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 border-2 border-teal-400 dark:border-teal-500 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-teal-950 dark:text-teal-300 font-black">
                {isAr ? 'نسبة خفض التعرض للمخاطر' : 'Risk Reduction Achieved'}
              </span>
              <p className="text-xl font-black text-teal-900 dark:text-emerald-400 tabular-nums mt-0.5">
                -{reductionPercentage}%
              </p>
            </div>
            <TrendingDown className="w-6 h-6 text-teal-700 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Risk Grid Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* The Interactive Heatmap Grid (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-neutral-950 dark:text-white">
              {isAr 
                ? `مصفوفة ${dim}×${dim} - عرض ${matrixViewMode === 'inherent' ? 'المخاطر الكامنة' : 'المخاطر المتبقية'}` 
                : `${dim}x${dim} Heatmap Grid - ${matrixViewMode === 'inherent' ? 'Inherent' : 'Residual'} Perspective`}
            </h3>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 text-neutral-800 dark:text-slate-300">{isAr ? 'منخفض' : 'Low'}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-300">{isAr ? 'متوسط' : 'Med'}</span>
              <span className="px-1.5 py-0.5 rounded bg-orange-50 dark:bg-orange-950/60 border border-orange-300 dark:border-orange-500/50 text-orange-900 dark:text-orange-300">{isAr ? 'عالي' : 'High'}</span>
              <span className="px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-300">{isAr ? 'حرج' : 'Crit'}</span>
            </div>
          </div>

          {/* Matrix Axes & Cells */}
          <div className="space-y-2">
            
            {/* Impact scale header (Top) */}
            <div className="text-center text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1">
              {isAr ? 'مستوى التأثير (Impact) ←' : 'Impact Level →'}
            </div>

            <div className="flex gap-2">
              
              {/* Likelihood vertical axis title */}
              <div className="w-6 flex items-center justify-center -rotate-90 text-xs font-bold text-neutral-700 dark:text-slate-300 whitespace-nowrap">
                {isAr ? 'الاحتمالية (Likelihood) ↑' : 'Likelihood ↑'}
              </div>

              {/* Grid content */}
              <div className="flex-1 space-y-2">
                {Array.from({ length: dim }, (_, rowIdx) => {
                  const likelihoodVal = dim - rowIdx;
                  return (
                    <div key={likelihoodVal} className="flex gap-2 items-center">
                      {/* Row Label */}
                      <div className="w-20 text-[11px] font-bold text-neutral-700 dark:text-slate-400 text-right shrink-0 truncate">
                        L{likelihoodVal}
                      </div>

                      {/* Cells */}
                      <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}>
                        {Array.from({ length: dim }, (_, colIdx) => {
                          const impactVal = colIdx + 1;
                          const score = likelihoodVal * impactVal;
                          const risk = getRiskLevel(score);
                          const matchingControls = getControlsInCell(likelihoodVal, impactVal);
                          const isSelected = selectedCell?.l === likelihoodVal && selectedCell?.i === impactVal;

                          return (
                            <button
                              key={impactVal}
                              onClick={() => setSelectedCell({ l: likelihoodVal, i: impactVal })}
                              className={`h-16 rounded-lg p-2 flex flex-col justify-between text-left transition-all border ${
                                isSelected ? 'ring-2 ring-teal-500 border-teal-500 scale-[1.02]' : ''
                              } ${risk.style}`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-[10px] font-mono font-black tabular-nums">
                                  {score}
                                </span>
                                <span className="text-[9px] font-extrabold uppercase">
                                  {isAr ? risk.levelAr : risk.level}
                                </span>
                              </div>

                              <div className="flex items-center justify-center">
                                {matchingControls.length > 0 ? (
                                  <span className="text-xs font-extrabold px-1.5 py-0.5 rounded bg-white/90 dark:bg-black/80 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 shadow-xs tabular-nums">
                                    {matchingControls.length} {isAr ? 'ضابط' : 'ctrls'}
                                  </span>
                                ) : (
                                  <span className="text-[10px] opacity-40">-</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Bottom column labels */}
            <div className="flex gap-2 pl-28">
              <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}>
                {Array.from({ length: dim }, (_, colIdx) => (
                  <div key={colIdx} className="text-center text-[11px] font-bold text-neutral-700 dark:text-slate-400">
                    I{colIdx + 1}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Selected Cell Controls Inspector (1 col) */}
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
          <div>
            <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
              {isAr ? 'فحص الضوابط في الخلية المحددة' : 'Active Cell Control Breakdown'}
            </span>
            <h3 className="text-base font-black text-neutral-950 dark:text-white mt-2">
              {selectedCell 
                ? (isAr ? `الاحتمالية: L${selectedCell.l} × التأثير: I${selectedCell.i}` : `Likelihood L${selectedCell.l} × Impact I${selectedCell.i}`)
                : (isAr ? 'انقر على أي خلية في المصفوفة' : 'Click any matrix cell')}
            </h3>
          </div>

          {selectedCell ? (
            <div className="space-y-3">
              {getControlsInCell(selectedCell.l, selectedCell.i).length === 0 ? (
                <div className="text-center py-12 border border-dashed border-teal-300 dark:border-teal-500/40 rounded-lg bg-teal-50/30 dark:bg-teal-950/20">
                  <p className="text-xs font-medium text-neutral-600 dark:text-slate-400">
                    {isAr ? 'لا توجد ضوابط حالياً في هذا المستوى' : 'No controls currently mapped in this risk zone.'}
                  </p>
                </div>
              ) : (
                getControlsInCell(selectedCell.l, selectedCell.i).map((c) => (
                  <div 
                    key={c.id}
                    onClick={() => {
                      onSelectControl(c);
                      onNavigateTab('frameworks');
                    }}
                    className="p-3 rounded-lg border-2 border-teal-200 dark:border-teal-500/30 bg-white dark:bg-[#080e1b] hover:border-teal-400 dark:hover:border-cyan-400 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-neutral-950 dark:text-cyan-300">
                        {c.code}
                      </span>
                      <span className="text-[10px] text-neutral-600 dark:text-slate-300 font-bold bg-neutral-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-slate-700">
                        {c.frameworkId}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white mt-1">
                      {isAr ? c.titleAr : c.titleEn}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-600 dark:text-slate-400 font-medium">
                      <span>{isAr ? `المسؤول: ${c.assignedRole}` : `Lead: ${c.assignedRole}`}</span>
                      <span className="text-neutral-900 dark:text-teal-400 font-bold hover:underline">
                        {isAr ? 'فحص الضابط ←' : 'Inspect →'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-neutral-400 dark:text-slate-500 space-y-2">
              <Sliders className="w-8 h-8 mx-auto text-neutral-400 dark:text-slate-500" />
              <p className="text-xs font-medium text-neutral-600 dark:text-slate-400">
                {isAr 
                  ? 'انقر على أي خلية في المصفوفة أعلاه لعرض قائمة الضوابط الواقعة ضمن نطاق الخطر.' 
                  : 'Select any coordinate on the matrix to view its assigned controls and treatment.'}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

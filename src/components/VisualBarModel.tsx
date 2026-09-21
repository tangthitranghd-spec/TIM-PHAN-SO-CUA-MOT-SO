import React from 'react';
import { VisualModelConfig } from '../types';

interface VisualBarModelProps {
  model: VisualModelConfig;
  fractionNumerator?: number;
  fractionDenominator?: number;
  highlightColor?: string;
  showExplanationHint?: boolean;
}

export const VisualBarModel: React.FC<VisualBarModelProps> = ({
  model,
  fractionNumerator,
  fractionDenominator,
  highlightColor = 'bg-amber-400 border-amber-500 text-amber-950',
  showExplanationHint = true
}) => {
  const parts = Math.max(1, model.totalParts);
  const selected = Math.min(parts, Math.max(0, model.selectedParts));
  const onePartValue = model.totalValue > 0 ? Math.round((model.totalValue / parts) * 10) / 10 : 0;
  const selectedTotalValue = Math.round(onePartValue * selected * 10) / 10;

  return (
    <div className="bg-amber-50/70 border-2 border-amber-200/80 rounded-2xl p-3.5 sm:p-4 my-3 text-slate-800 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-amber-900">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Mô hình thanh trực quan (SGK Kết nối tri thức)</span>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-full border border-amber-200">
          Tổng cộng: <span className="text-amber-700 font-extrabold">{model.totalValue.toLocaleString('vi-VN')} {model.unitLabel || 'đơn vị'}</span>
        </div>
      </div>

      {/* Bar Model Container */}
      <div className="space-y-1.5">
        {/* The segmented bar */}
        <div className="grid gap-1 w-full" style={{ gridTemplateColumns: `repeat(${parts}, minmax(0, 1fr))` }}>
          {Array.from({ length: parts }).map((_, idx) => {
            const isSelected = idx < selected;
            return (
              <div
                key={idx}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-300 min-h-[50px] ${
                  isSelected
                    ? `${highlightColor} shadow-xs scale-[1.01] font-bold`
                    : 'bg-white/80 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-[11px] sm:text-xs">
                  {isSelected ? `${onePartValue.toLocaleString('vi-VN')}` : `${onePartValue.toLocaleString('vi-VN')}`}
                </span>
                <span className="text-[9px] opacity-75 font-normal">
                  phần {idx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend / Brace notation */}
        <div className="flex items-center justify-between text-xs pt-1 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-400 border border-amber-500 inline-block"></span>
            <span className="font-semibold text-slate-700">
              Lấy <span className="font-bold text-amber-800">{selected}/{parts}</span> = <span className="font-bold text-emerald-700">{selectedTotalValue.toLocaleString('vi-VN')} {model.unitLabel || ''}</span>
            </span>
          </div>

          <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
            Mỗi phần bằng: {model.totalValue.toLocaleString('vi-VN')} : {parts} = {onePartValue.toLocaleString('vi-VN')} {model.unitLabel || ''}
          </div>
        </div>
      </div>

      {showExplanationHint && fractionNumerator && fractionDenominator && (
        <div className="mt-2.5 pt-2 border-t border-amber-200/60 text-xs text-amber-900/90 flex items-center justify-between">
          <span>💡 <span className="font-bold">Nhận xét:</span> Chia đều {model.totalValue.toLocaleString('vi-VN')} thành {fractionDenominator} phần bằng nhau, lấy {fractionNumerator} phần.</span>
        </div>
      )}
    </div>
  );
};

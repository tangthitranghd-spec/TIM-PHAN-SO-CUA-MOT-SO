import React from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface GameHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenScratchPad: () => void;
  onResetGame?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentQuestionIndex,
  totalQuestions,
  score,
  isMuted,
  onToggleMute,
  onOpenScratchPad
}) => {
  const currentLevel = currentQuestionIndex < 5 ? 1 : currentQuestionIndex < 10 ? 2 : 3;
  const progressPercent = Math.min(100, Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100));

  const levelInfo = {
    1: { name: 'Chặng 1: Khởi động', color: 'from-amber-400 to-orange-400', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
    2: { name: 'Chặng 2: Vượt chướng ngại vật', color: 'from-sky-500 to-indigo-500', badge: 'bg-sky-100 text-sky-800 border-sky-300' },
    3: { name: 'Chặng 3: Về đích vinh quang', color: 'from-emerald-500 to-teal-600', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
  }[currentLevel];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-amber-200 shadow-xs px-3 sm:px-6 py-2.5 sm:py-3 transition-all">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        {/* Top bar: Title + Score + Sound Toggle */}
        <div className="flex items-center justify-between gap-3">
          {/* Brand/Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md font-black text-xl shrink-0 ring-2 ring-amber-300">
              ➗
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
                  Toán 4: Tìm Phân Số Của Một Số
                </h1>
                <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">
                  Kết nối tri thức
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`inline-block font-bold text-[11px] px-2 py-0.5 rounded-full border ${levelInfo.badge}`}>
                  {levelInfo.name}
                </span>
              </div>
            </div>
          </div>

          {/* Right controls: Score badge + Tools + Sound */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Scratchpad Button */}
            <button
              id="open-scratchpad-header-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenScratchPad();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 active:scale-95 border-2 border-amber-200 text-amber-800 font-bold text-xs shadow-2xs transition-all"
              title="Mở bảng nháp và bí kíp quy tắc SGK"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Bí kíp & Nháp</span>
            </button>

            {/* Score Display */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-md border-2 border-amber-200/90">
              <Trophy className="w-4 h-4 text-white drop-shadow-xs fill-amber-300" />
              <span>{score}</span>
              <span className="text-[10px] text-amber-950/80 font-bold">/ 150 điểm</span>
            </div>

            {/* Audio Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={onToggleMute}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border-2 ${
                isMuted
                  ? 'bg-slate-100 border-slate-300 text-slate-400'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700'
              }`}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress Bar & Stages Indicator */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-0.5">
            <span className="text-amber-800 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" />
              Câu hỏi: {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <span className="text-slate-600">
              Tiến độ: {progressPercent}%
            </span>
          </div>

          <div className="w-full h-2.5 sm:h-3 bg-amber-100/80 rounded-full overflow-hidden p-0.5 border border-amber-200">
            <div
              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${levelInfo.color} shadow-xs`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 3 checkpoints */}
          <div className="grid grid-cols-3 text-[10px] text-center font-bold pt-0.5">
            <div className={`transition-colors ${currentQuestionIndex < 5 ? 'text-amber-700 font-extrabold' : 'text-slate-400'}`}>
              🌱 Mức 1: Khởi động (1-5)
            </div>
            <div className={`transition-colors ${currentQuestionIndex >= 5 && currentQuestionIndex < 10 ? 'text-sky-700 font-extrabold' : 'text-slate-400'}`}>
              ⚡ Mức 2: Vượt ngại vật (6-10)
            </div>
            <div className={`transition-colors ${currentQuestionIndex >= 10 ? 'text-emerald-700 font-extrabold' : 'text-slate-400'}`}>
              👑 Mức 3: Về đích (11-15)
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

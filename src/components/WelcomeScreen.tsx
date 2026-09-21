import React from 'react';
import { Play, Sparkles, Trophy, BookOpen, Star, HelpCircle } from 'lucide-react';
import { Fraction } from './Fraction';
import { soundManager } from '../utils/sound';

interface WelcomeScreenProps {
  onStartGame: () => void;
  onOpenScratchPad: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame, onOpenScratchPad }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Hero Welcome Card */}
      <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden">
        {/* Banner with lively gradient and playful graphics */}
        <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 p-6 sm:p-10 text-white text-center relative">
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-100 border border-white/30 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              Toán 4 • Bộ Sách Kết Nối Tri Thức
            </div>

            <h1 className="text-2xl sm:text-4xl font-black mb-3 tracking-tight drop-shadow-sm">
              Trò Chơi: Tìm Phân Số Của Một Số
            </h1>

            <p className="text-sm sm:text-base text-amber-50 max-w-xl font-medium leading-relaxed">
              Chào mừng em đến với hành trình phiêu lưu toán học! Cùng vượt qua 15 câu hỏi kỳ thú để chinh phục danh hiệu <span className="font-extrabold text-white underline decoration-wavy decoration-yellow-300">Kiện Tướng Phân Số</span> nhé!
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Rule Card */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border-2 border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs font-black text-lg">
                💡
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-extrabold text-sm sm:text-base text-amber-950">
                  Quy tắc vàng cần nhớ:
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 font-semibold leading-relaxed">
                  "Muốn tìm phân số của một số, ta lấy số đó <span className="text-rose-600 font-black">nhân với phân số</span>."
                </p>
                <div className="bg-white/90 p-2.5 rounded-xl border border-amber-300 text-xs font-bold text-slate-800 flex flex-wrap items-center gap-2">
                  <span>Ví dụ: Tìm <Fraction numerator="2" denominator="3" size="sm" /> của 18 cái kẹo:</span>
                  <span className="text-amber-800 font-extrabold bg-amber-100 px-2 py-0.5 rounded-md">
                    18 × <Fraction numerator="2" denominator="3" size="sm" /> = 12 (cái kẹo)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Difficulty Tiers Grid */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-800 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>3 Chặng Thử Thách Hấp Dẫn:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-amber-50/60 rounded-2xl p-3.5 border-2 border-amber-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 text-amber-900 font-black text-xs sm:text-sm">
                    <span>🌱 Mức 1: Khởi động</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Câu 1 - 5: Nhận biết quy tắc, tính trực tiếp kẹo, cam, vải.
                  </p>
                </div>
                <div className="mt-2 text-[11px] font-bold text-amber-700">5 câu • 50 điểm</div>
              </div>

              <div className="bg-sky-50/60 rounded-2xl p-3.5 border-2 border-sky-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 text-sky-900 font-black text-xs sm:text-sm">
                    <span>⚡ Mức 2: Vượt chướng ngại</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Câu 6 - 10: Vận dụng thực tế học sinh, lít mật ong, thời gian, mảnh vườn.
                  </p>
                </div>
                <div className="mt-2 text-[11px] font-bold text-sky-700">5 câu • 50 điểm</div>
              </div>

              <div className="bg-emerald-50/60 rounded-2xl p-3.5 border-2 border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-900 font-black text-xs sm:text-sm">
                    <span>👑 Mức 3: Về đích</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Câu 11 - 15: Vận dụng cao, 2 bước tính, tìm phần còn lại, so sánh.
                  </p>
                </div>
                <div className="mt-2 text-[11px] font-bold text-emerald-700">5 câu • 50 điểm</div>
              </div>
            </div>
          </div>

          {/* Game Features Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold text-slate-700">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg mb-0.5">🎯</div>
              <div>15 Câu hỏi</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg mb-0.5">⭐</div>
              <div>+10đ mỗi câu đúng</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg mb-0.5">🔊</div>
              <div>Âm thanh sinh động</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg mb-0.5">🏁</div>
              <div>Làm đến câu cuối</div>
            </div>
          </div>

          {/* Big Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="start-game-btn"
              onClick={() => {
                soundManager.playClick();
                onStartGame();
              }}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ring-4 ring-amber-200"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>BẮT ĐẦU CHƠI NGAY</span>
            </button>

            <button
              id="open-scratchpad-welcome-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenScratchPad();
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border-2 border-slate-300 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Xem Bí Kíp & Bảng Nháp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

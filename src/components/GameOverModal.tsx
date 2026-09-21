import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Award, CheckCircle2, XCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Question, AnswerRecord } from '../types';
import { FormattedMathText } from './Fraction';
import { VisualBarModel } from './VisualBarModel';
import { soundManager } from '../utils/sound';

interface GameOverModalProps {
  questions: Question[];
  answerRecords: AnswerRecord[];
  totalScore: number;
  onRestart: () => void;
  onOpenScratchPad: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  questions,
  answerRecords,
  totalScore,
  onRestart,
  onOpenScratchPad
}) => {
  const [showReviewList, setShowReviewList] = useState<boolean>(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  const correctCount = answerRecords.filter((r) => r.isCorrect).length;
  const totalQuestions = questions.length;

  useEffect(() => {
    soundManager.playVictory();

    // Launch celebratory confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // Compute award rank
  const getRank = () => {
    if (totalScore >= 140) {
      return {
        title: '🏆 Kiện Tướng Phân Số Lớp 4',
        subtitle: 'Xuất sắc tuyệt đối! Em nắm rất chắc quy tắc tìm phân số của một số!',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-400',
        cardBg: 'from-amber-500 to-yellow-500'
      };
    } else if (totalScore >= 110) {
      return {
        title: '🌟 Ngôi Sao Toán Học Giỏi',
        subtitle: 'Rất đáng khen! Em đã hoàn thành xuất sắc các chặng thử thách!',
        badgeClass: 'bg-sky-100 text-sky-900 border-sky-400',
        cardBg: 'from-sky-500 to-blue-600'
      };
    } else if (totalScore >= 70) {
      return {
        title: '🥈 Chiến Binh Chăm Chỉ',
        subtitle: 'Khá tốt! Hãy ôn lại các câu 2 bước tính để đạt điểm tối đa nhé!',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-400',
        cardBg: 'from-emerald-500 to-teal-600'
      };
    } else {
      return {
        title: '🌱 Mầm Non Cố Gắng',
        subtitle: 'Đừng nản lòng nhé! Hãy xem lại lời giải chi tiết và thử lại nhé em!',
        badgeClass: 'bg-purple-100 text-purple-900 border-purple-400',
        cardBg: 'from-purple-500 to-pink-500'
      };
    }
  };

  const rank = getRank();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Victory Banner Card */}
      <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-xl overflow-hidden text-center">
        <div className={`bg-gradient-to-r ${rank.cardBg} text-white p-6 sm:p-8 relative overflow-hidden`}>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3 shadow-lg border-2 border-white/40 ring-4 ring-white/20">
              <Trophy className="w-12 h-12 sm:w-14 sm:h-14 text-yellow-200 fill-yellow-300 drop-shadow-md" />
            </div>

            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-100 mb-1">
              🎉 Hoàn Thành Tất Cả 15 Câu Hỏi
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mb-2 drop-shadow-xs">
              {rank.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg font-medium">
              {rank.subtitle}
            </p>
          </div>
        </div>

        {/* Score & Stats Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 flex flex-col items-center">
              <span className="text-xs font-bold text-amber-800 mb-1">Tổng điểm đạt được</span>
              <div className="text-3xl sm:text-4xl font-black text-amber-900">
                {totalScore} <span className="text-base text-amber-700 font-bold">/ 150</span>
              </div>
              <span className="text-[11px] text-amber-700 mt-1 font-semibold">10 điểm mỗi câu đúng</span>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200 flex flex-col items-center">
              <span className="text-xs font-bold text-emerald-800 mb-1">Số câu trả lời đúng</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-900">
                {correctCount} <span className="text-base text-emerald-700 font-bold">/ {totalQuestions}</span>
              </div>
              <span className="text-[11px] text-emerald-700 mt-1 font-semibold">
                Đạt tỉ lệ {Math.round((correctCount / totalQuestions) * 100)}%
              </span>
            </div>

            <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200 flex flex-col items-center">
              <span className="text-xs font-bold text-sky-800 mb-1">Huy hiệu thành tích</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Award className="w-8 h-8 text-sky-600 fill-sky-200" />
                <span className="font-extrabold text-sm sm:text-base text-sky-950">
                  {totalScore >= 110 ? 'Sao Vàng Toán 4' : 'Huy Hiệu Bạc'}
                </span>
              </div>
              <span className="text-[11px] text-sky-700 mt-1 font-semibold">Kết nối tri thức</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="restart-game-btn"
              onClick={() => {
                soundManager.playClick();
                onRestart();
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer ring-2 ring-amber-300"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Chơi Lại Để Luyện Tập</span>
            </button>

            <button
              id="toggle-review-list-btn"
              onClick={() => {
                soundManager.playClick();
                setShowReviewList(!showReviewList);
              }}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm sm:text-base border-2 border-slate-300 shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{showReviewList ? 'Thu gọn bài giải' : 'Xem Lại Toàn Bộ 15 Câu & Lời Giải'}</span>
              {showReviewList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <button
              id="open-scratchpad-finish-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenScratchPad();
              }}
              className="px-5 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-sm border-2 border-emerald-200 transition-all"
            >
              📖 Xem lại Quy tắc SGK
            </button>
          </div>
        </div>
      </div>

      {/* Review List Section */}
      {showReviewList && (
        <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-4 sm:p-7 space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-200">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-800">
                Chi Tiết Đáp Án & Lời Giải 15 Câu
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Bấm vào từng câu hỏi để xem chi tiết lời giải và mô hình trực quan
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Toán 4
            </span>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => {
              const record = answerRecords.find((r) => r.questionId === q.id);
              const isQCorrect = record ? record.isCorrect : false;
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${
                    isQCorrect
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-rose-200 bg-rose-50/30'
                  }`}
                >
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setExpandedQuestionId(isExpanded ? null : q.id);
                    }}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-black/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                          isQCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-500">
                          {q.levelTitle}
                        </div>
                        <div className="font-extrabold text-sm sm:text-base text-slate-800 line-clamp-1">
                          <FormattedMathText text={q.prompt} fractionSize="sm" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isQCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-extrabold text-xs bg-emerald-100 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> +10đ
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-700 font-extrabold text-xs bg-rose-100 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> 0đ
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {/* Expanded solution */}
                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-slate-200/80 bg-white/70 space-y-3 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-bold text-slate-500 block">Câu trả lời của em:</span>
                          <span className={`font-black text-sm ${isQCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {record ? record.userAnswer : 'Chưa trả lời'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                          <span className="text-xs font-bold text-emerald-700 block">Đáp án chuẩn:</span>
                          <span className="font-black text-sm text-emerald-900">
                            <FormattedMathText text={String(q.correctAnswer)} fractionSize="sm" />
                          </span>
                        </div>
                      </div>

                      {q.visualModel && (
                        <VisualBarModel
                          model={q.visualModel}
                          fractionNumerator={q.fractionNumerator}
                          fractionDenominator={q.fractionDenominator}
                        />
                      )}

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-slate-800 leading-relaxed font-semibold whitespace-pre-line">
                        <div className="font-extrabold text-amber-900 mb-1">📖 Lời giải chi tiết:</div>
                        <FormattedMathText text={q.explanation} fractionSize="sm" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

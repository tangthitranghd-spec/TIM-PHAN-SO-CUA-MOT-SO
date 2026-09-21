import React, { useState } from 'react';
import { Question, AnswerRecord } from '../types';
import { FormattedMathText } from './Fraction';
import { VisualBarModel } from './VisualBarModel';
import { soundManager } from '../utils/sound';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Check,
  X
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (answerRecord: AnswerRecord) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onNextQuestion,
  isLastQuestion
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [inputAnswer, setInputAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Normalize string for answer comparison (removes redundant spaces, lowercase)
  const normalize = (text: string | number): string => {
    return String(text)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\./g, '')
      .replace(/,/g, '');
  };

  const checkAnswerMatch = (userVal: string): boolean => {
    const normUser = normalize(userVal);
    const normCorrect = normalize(question.correctAnswer);

    if (normUser === normCorrect) return true;

    // Check against acceptable alternates
    if (question.acceptableAnswers) {
      return question.acceptableAnswers.some((alt) => normalize(alt) === normUser);
    }

    // Extract pure digits if both contain digits
    const userDigits = normUser.replace(/\D/g, '');
    const correctDigits = normCorrect.replace(/\D/g, '');
    if (userDigits && correctDigits && userDigits === correctDigits) {
      return true;
    }

    return false;
  };

  const handleSubmit = (chosenAnswer: string) => {
    if (hasAnswered) return;
    if (!chosenAnswer || chosenAnswer.trim() === '') return;

    const answerCorrect = checkAnswerMatch(chosenAnswer);
    setIsCorrect(answerCorrect);
    setHasAnswered(true);

    if (answerCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    onAnswerSubmit({
      questionId: question.id,
      userAnswer: chosenAnswer,
      isCorrect: answerCorrect,
      scoreEarned: answerCorrect ? 10 : 0
    });
  };

  const handleNext = () => {
    soundManager.playClick();
    onNextQuestion();
  };

  // Quick number pad helper for short_answer
  const quickNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl overflow-hidden transition-all duration-300">
      {/* Top Banner with Question Type & Scenario */}
      <div className="bg-gradient-to-r from-amber-400/20 via-orange-300/20 to-amber-400/20 px-4 sm:px-6 py-3 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
            {questionNumber}
          </span>
          <span className="font-extrabold text-sm sm:text-base text-amber-950">
            {question.title}
          </span>
          {question.scenarioContext && (
            <span className="hidden sm:inline-block text-xs bg-white/90 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs">
              📍 {question.scenarioContext}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {question.hint && !hasAnswered && (
            <button
              id={`hint-btn-q${question.id}`}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 active:scale-95 px-2.5 py-1 rounded-full border border-amber-300 transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý nhỏ'}</span>
            </button>
          )}

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            +10 điểm
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-7 space-y-4 sm:space-y-6">
        {/* Hint banner if toggled */}
        {showHint && question.hint && !hasAnswered && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5 animate-in slide-in-from-top-2">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Gợi ý từ Thầy Cô: </span>
              <span>{question.hint}</span>
            </div>
          </div>
        )}

        {/* Question Prompt */}
        <div className="text-slate-800 text-base sm:text-xl font-bold leading-relaxed">
          <FormattedMathText text={question.prompt} fractionSize="lg" />
        </div>

        {/* Visual Bar Model / Tape diagram for this question */}
        {question.visualModel && (
          <VisualBarModel
            model={question.visualModel}
            fractionNumerator={question.fractionNumerator}
            fractionDenominator={question.fractionDenominator}
          />
        )}

        {/* ================================================================= */}
        {/* INTERACTION MODES BASED ON QUESTION TYPE */}
        {/* ================================================================= */}

        {/* 1. Multiple Choice (4 Options) */}
        {question.type === 'multiple_choice' && question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {question.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = selectedOption === option;
              const isTheCorrectAnswer = hasAnswered && checkAnswerMatch(option);
              const isWrongSelection = hasAnswered && isSelected && !isCorrect;

              let buttonStyle = 'bg-white hover:bg-amber-50/70 border-2 border-slate-200 hover:border-amber-300 text-slate-800 shadow-xs';
              if (hasAnswered) {
                if (isTheCorrectAnswer) {
                  buttonStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                } else if (isWrongSelection) {
                  buttonStyle = 'bg-rose-100 border-2 border-rose-400 text-rose-950 line-through opacity-85';
                } else {
                  buttonStyle = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-amber-100 border-2 border-amber-500 text-amber-950 ring-2 ring-amber-300 font-bold';
              }

              return (
                <button
                  key={idx}
                  id={`q${question.id}-option-${letter}`}
                  disabled={hasAnswered}
                  onClick={() => {
                    setSelectedOption(option);
                    handleSubmit(option);
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl flex items-center justify-between text-left transition-all active:scale-[0.98] ${buttonStyle} cursor-pointer disabled:cursor-default`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                      isSelected || isTheCorrectAnswer ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="font-bold text-sm sm:text-base">
                      <FormattedMathText text={option} fractionSize="md" />
                    </span>
                  </div>

                  {hasAnswered && isTheCorrectAnswer && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isWrongSelection && (
                    <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. True / False (Đúng / Sai) */}
        {question.type === 'true_false' && (
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { label: 'ĐÚNG', value: 'Đúng', color: 'emerald', icon: Check },
              { label: 'SAI', value: 'Sai', color: 'rose', icon: X }
            ].map((item) => {
              const isSelected = selectedOption === item.value;
              const isTheCorrectChoice = hasAnswered && checkAnswerMatch(item.value);
              const isWrongChoice = hasAnswered && isSelected && !isCorrect;
              const IconComponent = item.icon;

              let style = 'bg-white hover:bg-slate-50 border-3 border-slate-200 text-slate-700 shadow-sm';
              if (item.color === 'emerald') {
                style = 'bg-emerald-50 hover:bg-emerald-100 border-3 border-emerald-300 text-emerald-800 shadow-sm';
              } else {
                style = 'bg-rose-50 hover:bg-rose-100 border-3 border-rose-300 text-rose-800 shadow-sm';
              }

              if (hasAnswered) {
                if (isTheCorrectChoice) {
                  style = 'bg-emerald-500 text-white border-3 border-emerald-600 ring-4 ring-emerald-200 font-black scale-105';
                } else if (isWrongChoice) {
                  style = 'bg-rose-500 text-white border-3 border-rose-600 line-through opacity-80 scale-95';
                } else {
                  style = 'bg-slate-100 text-slate-400 border border-slate-200 opacity-50';
                }
              }

              return (
                <button
                  key={item.value}
                  id={`q${question.id}-btn-${item.value}`}
                  disabled={hasAnswered}
                  onClick={() => {
                    setSelectedOption(item.value);
                    handleSubmit(item.value);
                  }}
                  className={`py-5 px-4 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${style} cursor-pointer disabled:cursor-default`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    hasAnswered && isTheCorrectChoice ? 'bg-white text-emerald-600' : 'bg-white/80'
                  }`}>
                    <IconComponent className="w-7 h-7 stroke-[3]" />
                  </div>
                  <span className="font-black text-lg sm:text-xl tracking-wider">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Short Answer / Number Input */}
        {question.type === 'short_answer' && (
          <div className="space-y-4 pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <input
                  id={`q${question.id}-input-number`}
                  type="text"
                  disabled={hasAnswered}
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !hasAnswered && inputAnswer.trim()) {
                      handleSubmit(inputAnswer);
                    }
                  }}
                  placeholder="Nhập câu trả lời (số)..."
                  className={`w-full py-3.5 px-4 rounded-2xl border-3 text-lg sm:text-xl font-black text-slate-800 transition-all outline-none ${
                    hasAnswered
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900'
                        : 'border-rose-400 bg-rose-50/80 text-rose-900'
                      : 'border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/60 bg-amber-50/30'
                  }`}
                />
                {question.unit && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg text-xs sm:text-sm">
                    {question.unit}
                  </span>
                )}
              </div>

              {!hasAnswered && (
                <button
                  id={`q${question.id}-submit-input-btn`}
                  disabled={!inputAnswer.trim()}
                  onClick={() => handleSubmit(inputAnswer)}
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center gap-2"
                >
                  <span>Kiểm tra đáp án</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Virtual Number Buttons */}
            {!hasAnswered && (
              <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
                <div className="text-[11px] font-bold text-amber-900 mb-2">Bàn phím số nhanh:</div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {quickNumbers.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setInputAnswer((prev) => prev + num);
                      }}
                      className="w-10 h-10 rounded-xl bg-white hover:bg-amber-100 active:scale-95 border-2 border-amber-200 text-slate-800 font-black text-base shadow-2xs transition-all flex items-center justify-center"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setInputAnswer((prev) => prev.slice(0, -1));
                    }}
                    className="px-3 h-10 rounded-xl bg-white hover:bg-rose-50 active:scale-95 border-2 border-slate-200 text-rose-600 font-bold text-xs shadow-2xs transition-all flex items-center justify-center"
                  >
                    Xóa lùi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setInputAnswer('');
                    }}
                    className="px-3 h-10 rounded-xl bg-white hover:bg-rose-50 active:scale-95 border-2 border-slate-200 text-slate-600 font-bold text-xs shadow-2xs transition-all flex items-center justify-center"
                  >
                    Xóa hết
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. Fill in the blank (Điền khuyết) */}
        {question.type === 'fill_blank' && question.options && (
          <div className="space-y-3 pt-2">
            <div className="text-xs sm:text-sm font-bold text-slate-600">
              Chọn phép tính thích hợp để điền vào chỗ trống:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isTheCorrectChoice = hasAnswered && checkAnswerMatch(opt);
                const isWrong = hasAnswered && isSelected && !isCorrect;

                let style = 'bg-white hover:bg-amber-50 border-2 border-amber-200 text-amber-950 font-bold shadow-xs';
                if (hasAnswered) {
                  if (isTheCorrectChoice) {
                    style = 'bg-emerald-500 text-white border-2 border-emerald-600 font-black ring-2 ring-emerald-300';
                  } else if (isWrong) {
                    style = 'bg-rose-100 text-rose-950 border-2 border-rose-300 line-through opacity-75';
                  } else {
                    style = 'bg-slate-100 text-slate-400 border border-slate-200 opacity-50';
                  }
                } else if (isSelected) {
                  style = 'bg-amber-400 text-slate-950 border-2 border-amber-600 font-black ring-2 ring-amber-300';
                }

                return (
                  <button
                    key={idx}
                    id={`q${question.id}-fill-opt-${idx}`}
                    disabled={hasAnswered}
                    onClick={() => {
                      setSelectedOption(opt);
                      handleSubmit(opt);
                    }}
                    className={`py-3.5 px-3 rounded-2xl text-center text-sm sm:text-base transition-all active:scale-95 ${style} cursor-pointer disabled:cursor-default`}
                  >
                    <FormattedMathText text={opt} fractionSize="sm" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* IMMEDIATE FEEDBACK DRAWER / BANNER (Yêu cầu quan trọng: Phản hồi ngay) */}
        {/* ================================================================= */}
        {hasAnswered && (
          <div
            className={`rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
              isCorrect
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}
          >
            {/* Status header with mascot reaction */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-current/15">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
                    isCorrect ? 'bg-emerald-600' : 'bg-rose-500'
                  }`}
                >
                  {isCorrect ? <Check className="w-6 h-6 stroke-[3]" /> : <X className="w-6 h-6 stroke-[3]" />}
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg leading-tight">
                    {isCorrect ? 'Tuyệt vời! Em làm đúng rồi! 🎉' : 'Chưa chính xác rồi, cố gắng lên nhé! 💪'}
                  </h4>
                  <p className="text-xs opacity-90 font-medium">
                    {isCorrect ? 'Em được cộng +10 điểm ⭐' : 'Đừng nản lòng, hãy xem lời giải chi tiết bên dưới nhé!'}
                  </p>
                </div>
              </div>

              {/* Next Button right inside the feedback */}
              <button
                id="next-question-btn"
                onClick={handleNext}
                className="px-4 sm:px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer ring-2 ring-amber-300"
              >
                <span>{isLastQuestion ? 'Xem Tổng Kết Vàng' : 'Câu tiếp theo'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Explanation section */}
            <div className="mt-3.5 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Đáp án đúng: </span>
                <span className="bg-white/80 px-2 py-0.5 rounded-md font-extrabold text-emerald-800 border border-emerald-300">
                  <FormattedMathText text={String(question.correctAnswer)} fractionSize="sm" />
                </span>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-current/15 leading-relaxed font-semibold">
                <div className="font-extrabold text-slate-800 mb-1">📖 Lời giải chi tiết:</div>
                <div className="whitespace-pre-line text-slate-700">
                  <FormattedMathText text={question.explanation} fractionSize="sm" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Info */}
      <div className="bg-amber-50/50 px-4 sm:px-7 py-2.5 border-t border-amber-200/80 flex items-center justify-between text-xs text-slate-500">
        <span>Toán 4 - Bài: Tìm phân số của một số</span>
        <span>Câu hỏi {questionNumber} / {totalQuestions}</span>
      </div>
    </div>
  );
};

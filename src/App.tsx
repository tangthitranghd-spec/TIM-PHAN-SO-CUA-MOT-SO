import React, { useState } from 'react';
import { QUESTIONS_DATA } from './data/questions';
import { GameState, AnswerRecord } from './types';
import { GameHeader } from './components/GameHeader';
import { QuestionCard } from './components/QuestionCard';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameOverModal } from './components/GameOverModal';
import { ScratchPadModal } from './components/ScratchPadModal';
import { soundManager } from './utils/sound';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted());
  const [isScratchPadOpen, setIsScratchPadOpen] = useState<boolean>(false);

  const totalQuestions = QUESTIONS_DATA.length;
  const currentQuestion = QUESTIONS_DATA[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setAnswerRecords([]);
    setScore(0);
  };

  const handleAnswerSubmit = (record: AnswerRecord) => {
    setAnswerRecords((prev) => {
      // replace if already exists, else append
      const filtered = prev.filter((r) => r.questionId !== record.questionId);
      return [...filtered, record];
    });

    if (record.isCorrect) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setGameState('completed');
    } else {
      const nextIndex = currentQuestionIndex + 1;
      // Check if entering a new level tier (level 2 starts at index 5, level 3 starts at index 10)
      if (nextIndex === 5 || nextIndex === 10) {
        soundManager.playLevelUp();
      }
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleRestart = () => {
    setGameState('welcome');
    setCurrentQuestionIndex(0);
    setAnswerRecords([]);
    setScore(0);
  };

  const handleToggleMute = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-100/50 flex flex-col font-['Nunito',sans-serif]">
      {/* Game Header: Always visible during play and completion */}
      {gameState !== 'welcome' && (
        <GameHeader
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          score={score}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenScratchPad={() => setIsScratchPadOpen(true)}
          onResetGame={handleRestart}
        />
      )}

      {/* Main Play Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-center">
        {gameState === 'welcome' && (
          <WelcomeScreen
            onStartGame={handleStartGame}
            onOpenScratchPad={() => setIsScratchPadOpen(true)}
          />
        )}

        {gameState === 'playing' && currentQuestion && (
          <div key={currentQuestion.id} className="animate-in fade-in duration-300">
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              onAnswerSubmit={handleAnswerSubmit}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={isLastQuestion}
            />
          </div>
        )}

        {gameState === 'completed' && (
          <GameOverModal
            questions={QUESTIONS_DATA}
            answerRecords={answerRecords}
            totalScore={score}
            onRestart={handleRestart}
            onOpenScratchPad={() => setIsScratchPadOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-3 px-4 text-center text-xs text-slate-500 font-semibold border-t border-amber-200/60 bg-white/40">
        Trò chơi học tập Toán 4 • Sách Kết nối tri thức với cuộc sống • Chủ đề: Tìm phân số của một số
      </footer>

      {/* ScratchPad & Rule Modal */}
      <ScratchPadModal
        isOpen={isScratchPadOpen}
        onClose={() => setIsScratchPadOpen(false)}
      />
    </div>
  );
}

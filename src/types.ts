export type QuestionType = 'multiple_choice' | 'short_answer' | 'true_false' | 'fill_blank';

export type LevelId = 1 | 2 | 3;

export interface VisualModelConfig {
  totalValue: number;
  totalParts: number; // Mẫu số
  selectedParts: number; // Tử số
  unitLabel?: string;
  itemType?: 'rect' | 'circle' | 'icon';
}

export interface Question {
  id: number;
  level: LevelId;
  levelTitle: string;
  type: QuestionType;
  title: string;
  prompt: string;
  fractionNumerator?: number;
  fractionDenominator?: number;
  baseNumber?: number;
  unit?: string;
  options?: string[]; // Cho trắc nghiệm và điền khuyết
  correctAnswer: string | number; // Chuẩn hóa thành string để so sánh
  acceptableAnswers?: (string | number)[]; // Các biến thể chấp nhận (ví dụ: "12", "12 cái", "12 cái kẹo")
  explanation: string;
  hint?: string;
  visualModel?: VisualModelConfig;
  scenarioContext?: string; // Bối cảnh thực tế (ví dụ: "Rổ cam", "Sân trường", "Bao gạo")
}

export interface AnswerRecord {
  questionId: number;
  userAnswer: string;
  isCorrect: boolean;
  scoreEarned: number;
}

export type GameState = 'welcome' | 'playing' | 'completed';

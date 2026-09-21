import React, { useRef, useState, useEffect } from 'react';
import { X, RotateCcw, PenTool, Sparkles, BookOpen } from 'lucide-react';
import { Fraction } from './Fraction';

interface ScratchPadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScratchPadModal: React.FC<ScratchPadModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#fbbf24'); // Yellow chalk color
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on display
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Initial background: Slate green chalkboard
    ctx.fillStyle = '#064e3b'; // dark chalkboard green
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Bảng Nháp & Bí Kíp Toán Học</h3>
              <p className="text-xs text-emerald-100">Ghi nhớ quy tắc SGK & đặt phép tính nháp</p>
            </div>
          </div>
          <button
            id="close-scratchpad-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors text-white"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formula reminder box */}
        <div className="bg-amber-50 p-3 sm:p-4 border-b border-amber-200">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-amber-900 text-sm block mb-1">
                ⭐ Quy tắc vàng (SGK Toán 4 - Kết nối tri thức):
              </span>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-semibold">
                "Muốn tìm phân số của một số, ta lấy số đó <span className="underline decoration-wavy decoration-amber-500 font-extrabold text-amber-950">nhân với phân số</span>."
              </p>
              <div className="mt-2 bg-white/80 p-2 rounded-xl border border-amber-300 text-xs text-slate-800 flex flex-wrap items-center justify-around gap-2 font-bold">
                <div>
                  Muốn tìm <Fraction numerator="m" denominator="n" size="sm" /> của số <span className="text-emerald-700 font-extrabold text-sm">A</span>:
                </div>
                <div className="text-amber-700 font-extrabold bg-amber-100/70 px-2.5 py-1 rounded-lg">
                  A × <Fraction numerator="m" denominator="n" size="sm" /> = (A × m) : n
                </div>
                <div className="text-slate-600 font-normal">
                  hoặc tính: <span className="font-bold text-slate-800">(A : n) × m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chalkboard Scratchpad */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col min-h-[260px] bg-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <PenTool className="w-4 h-4 text-emerald-600" />
              <span>Bảng phấn nháp nhanh:</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setPenColor('#fbbf24')}
                  className={`w-6 h-6 rounded-full bg-amber-400 border-2 ${penColor === '#fbbf24' ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                  title="Phấn vàng"
                />
                <button
                  type="button"
                  onClick={() => setPenColor('#ffffff')}
                  className={`w-6 h-6 rounded-full bg-white border-2 ${penColor === '#ffffff' ? 'border-slate-800 scale-110' : 'border-slate-300'}`}
                  title="Phấn trắng"
                />
                <button
                  type="button"
                  onClick={() => setPenColor('#38bdf8')}
                  className={`w-6 h-6 rounded-full bg-sky-400 border-2 ${penColor === '#38bdf8' ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                  title="Phấn xanh"
                />
              </div>

              <button
                id="clear-scratchpad-btn"
                onClick={clearCanvas}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 shadow-xs active:scale-95 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                Xóa bảng
              </button>
            </div>
          </div>

          <div className="relative flex-1 w-full rounded-2xl overflow-hidden border-4 border-amber-800/60 shadow-inner bg-[#064e3b]">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair touch-none min-h-[220px]"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none text-[10px] text-emerald-200/50">
              Dùng chuột hoặc ngón tay để nháp phép tính
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm shadow-md transition-all"
          >
            Quay lại làm bài
          </button>
        </div>
      </div>
    </div>
  );
};

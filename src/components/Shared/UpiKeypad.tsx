import React, { useState } from 'react';
import { Delete, Check, Lock, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface UpiKeypadProps {
  pinLength?: number;
  onSubmit: (pin: string) => void;
  onCancel?: () => void;
  title?: string;
  subtitle?: string;
  recipientName?: string;
  amount?: string;
  isProcessing?: boolean;
}

export const UpiKeypad: React.FC<UpiKeypadProps> = ({
  pinLength = 6,
  onSubmit,
  onCancel,
  title = 'ENTER UPI PIN',
  subtitle = 'National Payments Corporation Sandbox',
  recipientName,
  amount,
  isProcessing = false,
}) => {
  const [pin, setPin] = useState<string>('');

  const handleDigit = (digit: string) => {
    if (isProcessing) return;
    if (pin.length < pinLength) {
      soundEffects.playTapLink();
      const newPin = pin + digit;
      setPin(newPin);
    }
  };

  const handleDelete = () => {
    if (isProcessing) return;
    if (pin.length > 0) {
      soundEffects.playTapLink();
      setPin(pin.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (isProcessing) return;
    soundEffects.playTapLink();
    setPin('');
  };

  const handleSubmit = () => {
    if (isProcessing) return;
    if (pin.length === pinLength) {
      onSubmit(pin);
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between bg-neutral-950 p-3 select-none text-neutral-100">
      {/* Top Header & Context */}
      <div>
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-teal-400">
            <Lock className="h-3 w-3" />
            <span className="font-bold">{title}</span>
          </div>
          <span className="text-[9px] font-mono text-neutral-500 uppercase">NPCI / SECURE</span>
        </div>

        {/* Transaction Summary (if specified) */}
        {(recipientName || amount) && (
          <div className="mt-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-2 text-xs">
            {recipientName && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-neutral-400">To:</span>
                <span className="font-mono font-semibold text-neutral-200 truncate max-w-[160px]">
                  {recipientName}
                </span>
              </div>
            )}
            {amount && (
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Amount:</span>
                <span className="font-mono font-extrabold text-amber-400">{amount}</span>
              </div>
            )}
          </div>
        )}

        {/* PIN Dots Display */}
        <div className="my-3 text-center">
          <div className="text-[10px] text-neutral-400 mb-2">
            Enter your {pinLength}-digit training PIN
          </div>
          <div className="flex justify-center gap-2.5">
            {Array.from({ length: pinLength }).map((_, i) => (
              <div
                key={i}
                className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-200 ${
                  i < pin.length
                    ? 'border-teal-400 bg-teal-400 scale-110 shadow-sm shadow-teal-400/50'
                    : 'border-neutral-700 bg-neutral-900'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Numeric Keypad Grid */}
      <div className="space-y-1.5 pb-1">
        <div className="grid grid-cols-3 gap-1.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              disabled={isProcessing}
              onClick={() => handleDigit(digit)}
              className="flex h-10 items-center justify-center rounded-xl border border-neutral-800/80 bg-neutral-900/90 text-sm font-mono font-bold text-neutral-100 shadow-sm transition active:scale-95 hover:bg-neutral-800 hover:border-neutral-700"
            >
              {digit}
            </button>
          ))}
          {/* Bottom Row */}
          <button
            type="button"
            disabled={isProcessing || pin.length === 0}
            onClick={handleClear}
            className="flex h-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/40 text-[10px] font-mono text-neutral-400 transition hover:text-neutral-200 hover:bg-neutral-800 disabled:opacity-30"
          >
            CLEAR
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => handleDigit('0')}
            className="flex h-10 items-center justify-center rounded-xl border border-neutral-800/80 bg-neutral-900/90 text-sm font-mono font-bold text-neutral-100 shadow-sm transition active:scale-95 hover:bg-neutral-800 hover:border-neutral-700"
          >
            0
          </button>
          <button
            type="button"
            disabled={isProcessing || pin.length === 0}
            onClick={handleDelete}
            className="flex h-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/70 text-neutral-300 transition hover:bg-neutral-800 disabled:opacity-30"
            title="Backspace"
          >
            <Delete className="h-4 w-4" />
          </button>
        </div>

        {/* Submit & Cancel Actions */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {onCancel && (
            <button
              type="button"
              disabled={isProcessing}
              onClick={onCancel}
              className="rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-400 hover:bg-neutral-800 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            disabled={isProcessing || pin.length < pinLength}
            onClick={handleSubmit}
            className={`col-span-${onCancel ? '1' : '2'} flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition shadow-md ${
              pin.length === pinLength && !isProcessing
                ? 'bg-teal-500 text-neutral-950 hover:bg-teal-400 active:scale-95'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-950 border-t-transparent" />
                <span>Verifying...</span>
              </span>
            ) : (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Authorize PIN</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-0.5">
          <span className="text-[9px] font-mono text-neutral-500 flex items-center justify-center gap-1">
            <ShieldCheck className="h-2.5 w-2.5 text-teal-400" />
            <span>Simulation: No real banking transaction occurs</span>
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { KeyRound, ShieldAlert } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface OtpInputProps {
  length?: number;
  onSubmit: (otp: string) => void;
  title?: string;
  senderNotice?: string;
  isSubmitting?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onSubmit,
  title = 'One-Time Password (OTP) Verification',
  senderNotice = 'Enter the 6-digit code received via SMS to complete authorization.',
  isSubmitting = false,
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));

  const handleCellChange = (index: number, val: string) => {
    if (isSubmitting) return;
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...digits];
    updated[index] = clean;
    setDigits(updated);
    if (clean) {
      soundEffects.playTapLink();
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-box-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleAutoFillSynthetic = () => {
    soundEffects.playTapLink();
    const demo = ['8', '4', '2', '1', '9', '0'];
    setDigits(demo.slice(0, length));
  };

  const fullOtp = digits.join('');

  return (
    <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3.5 space-y-3 text-neutral-100">
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
          <KeyRound className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-neutral-100">{title}</h4>
          <p className="text-[10px] text-neutral-400">Time-sensitive security token</p>
        </div>
      </div>

      <p className="text-[11px] text-neutral-300 leading-relaxed">{senderNotice}</p>

      {/* Digits Boxes */}
      <div className="flex justify-between gap-1.5 py-1">
        {digits.map((digit, i) => (
          <input
            key={i}
            id={`otp-box-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={isSubmitting}
            onChange={(e) => handleCellChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-10 w-9 sm:w-10 rounded-xl border border-neutral-700 bg-neutral-950 text-center font-mono text-base font-bold text-teal-400 shadow-inner focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
          />
        ))}
      </div>

      {/* Synthetic Autofill & Actions */}
      <div className="flex items-center justify-between text-[10px]">
        <button
          type="button"
          onClick={handleAutoFillSynthetic}
          disabled={isSubmitting}
          className="text-teal-400 hover:text-teal-300 underline decoration-dotted font-mono"
        >
          Auto-fill synthetic OTP [842190]
        </button>
        <span className="text-neutral-500 font-mono">Expires in 01:58</span>
      </div>

      <button
        type="button"
        disabled={fullOtp.length !== length || isSubmitting}
        onClick={() => onSubmit(fullOtp)}
        className={`w-full rounded-xl py-2.5 text-xs font-bold transition shadow-md ${
          fullOtp.length === length && !isSubmitting
            ? 'bg-teal-500 text-neutral-950 hover:bg-teal-400 active:scale-95'
            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neutral-950 border-t-transparent" />
            <span>Verifying KYC...</span>
          </span>
        ) : (
          'Confirm & Submit OTP'
        )}
      </button>
    </div>
  );
};

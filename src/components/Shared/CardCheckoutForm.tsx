import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface CardCheckoutFormProps {
  amountLabel: string;
  merchantName: string;
  onSubmit: (cardDetails: { cardNumber: string; expiry: string; cvv: string }) => void;
  isSubmitting?: boolean;
}

export const CardCheckoutForm: React.FC<CardCheckoutFormProps> = ({
  amountLabel,
  merchantName,
  onSubmit,
  isSubmitting = false,
}) => {
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 9102');
  const [cardHolder, setCardHolder] = useState<string>('Alex Johnson');
  const [expiry, setExpiry] = useState<string>('08/29');
  const [cvv, setCvv] = useState<string>('482');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    soundEffects.playTapLink();
    onSubmit({ cardNumber, expiry, cvv });
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/95 p-3.5 space-y-3 text-neutral-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-200">
          <CreditCard className="h-4 w-4 text-teal-400" />
          <span>Secure Card Checkout</span>
        </div>
        <span className="font-mono text-[10px] text-teal-400 font-bold bg-teal-950/60 border border-teal-500/30 px-2 py-0.5 rounded-full">
          {amountLabel}
        </span>
      </div>

      <div className="text-[11px] text-neutral-400">
        Merchant: <span className="font-mono text-neutral-200 font-medium">{merchantName}</span>
      </div>

      {/* Synthetic Card Visual */}
      <div className="rounded-xl border border-neutral-700 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 p-3 shadow-md space-y-2 font-mono">
        <div className="flex justify-between items-center text-[10px] text-neutral-400">
          <span>SIMULATED CARD</span>
          <span className="text-teal-400 font-bold">VISA DEBIT</span>
        </div>
        <div className="text-sm font-bold tracking-widest text-neutral-200">
          {cardNumber}
        </div>
        <div className="flex justify-between text-[10px] text-neutral-300">
          <div>
            <div className="text-[8px] text-neutral-500">CARDHOLDER</div>
            <div>{cardHolder}</div>
          </div>
          <div>
            <div className="text-[8px] text-neutral-500">EXPIRES</div>
            <div>{expiry}</div>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <form onSubmit={handleSubmit} className="space-y-2 text-xs">
        <div>
          <label className="block text-[10px] text-neutral-400 mb-0.5">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200 focus:border-teal-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-neutral-400 mb-0.5">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200 focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] text-neutral-400 mb-0.5">CVV / CVC</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              disabled={isSubmitting}
              maxLength={4}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-200 focus:border-teal-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-neutral-950 transition hover:bg-teal-400 active:scale-95 shadow-md shadow-teal-500/10 mt-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-950 border-t-transparent" />
              <span>Processing Payment...</span>
            </span>
          ) : (
            <>
              <Lock className="h-3 w-3" />
              <span>Authorize {amountLabel} Fee</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-0.5 text-[9px] font-mono text-neutral-500 flex items-center justify-center gap-1">
        <ShieldCheck className="h-2.5 w-2.5 text-teal-400" />
        <span>Educational sandbox: Synthetic test credentials only</span>
      </div>
    </div>
  );
};

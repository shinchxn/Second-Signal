import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  Bell,
  Check,
  X,
  CreditCard,
  Wifi,
  Battery,
} from 'lucide-react';

interface DockedPhoneWidgetProps {
  // Common
  time?: string;
  isLitUp?: boolean;
  // For Scenario 2 (MFA Push)
  mfaPrompt?: {
    appName: string;
    account: string;
    location: string;
    timestamp: string;
    onApprove: () => void;
    onDeny: () => void;
  } | null;
  // For Scenario 8 (Banking Widget / Balance)
  bankingWidget?: {
    balance: number;
    initialBalance: number;
    lastTransaction?: string;
    isDraining?: boolean;
  } | null;
}

export const DockedPhoneWidget: React.FC<DockedPhoneWidgetProps> = ({
  time = '11:18',
  isLitUp = false,
  mfaPrompt = null,
  bankingWidget = null,
}) => {
  return (
    <div className="relative w-[230px] shrink-0 rounded-[32px] border-4 border-neutral-700 bg-neutral-950 p-2 shadow-2xl ring-1 ring-neutral-600/40 select-none">
      {/* Chassis Screen */}
      <div className="relative flex h-[390px] flex-col overflow-hidden rounded-[24px] bg-neutral-950 text-neutral-100 shadow-inner">
        {/* Status Bar */}
        <div className="flex h-6 items-center justify-between px-3 text-[10px] font-medium shrink-0 bg-neutral-950/90">
          <span className="font-mono">{time}</span>
          <div className="h-2.5 w-12 rounded-full bg-neutral-900 border border-neutral-800" />
          <div className="flex items-center gap-1 text-neutral-400">
            <Wifi className="h-2 w-2" />
            <Battery className="h-2 w-2" />
          </div>
        </div>

        {/* Ambient Ring Glow when lit up */}
        {isLitUp && (
          <div className="pointer-events-none absolute inset-0 rounded-[24px] border-2 border-teal-400/80 animate-pulse" />
        )}

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
          {/* Default Phone Home Wallpaper & Clock */}
          {!mfaPrompt && !bankingWidget && (
            <div className="flex h-full flex-col items-center justify-center text-center p-3">
              <div className="text-3xl font-light text-neutral-200">{time}</div>
              <div className="text-[10px] text-neutral-500 mt-1">Mobile Companion</div>
              <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900/60 p-2.5 text-[10px] text-neutral-400">
                <Smartphone className="h-4 w-4 mx-auto mb-1 text-neutral-500" />
                <span>Device paired with workstation session</span>
              </div>
            </div>
          )}

          {/* MFA AUTHENTICATOR PUSH NOTIFICATION (Scenario 2) */}
          {mfaPrompt && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="rounded-2xl border-2 border-amber-500/80 bg-neutral-900 p-3 shadow-xl space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/20 text-amber-400">
                      <ShieldAlert className="h-3 w-3" />
                    </div>
                    <span className="text-[11px] font-bold text-neutral-100">
                      {mfaPrompt.appName}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 animate-pulse">ACTION REQ</span>
                </div>

                <div className="text-[10px] space-y-1 text-neutral-300">
                  <div className="font-semibold text-neutral-200">Approve Sign-in Request?</div>
                  <div className="text-[9.5px] text-neutral-400 truncate">Account: {mfaPrompt.account}</div>
                  <div className="text-[9.5px] text-neutral-400">Near: {mfaPrompt.location}</div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={mfaPrompt.onDeny}
                    className="flex items-center justify-center gap-1 rounded-xl border border-red-500/40 bg-red-950/40 py-2 text-[10px] font-bold text-red-300 hover:bg-red-900/50 transition active:scale-95"
                  >
                    <X className="h-3 w-3" />
                    <span>Deny</span>
                  </button>
                  <button
                    onClick={mfaPrompt.onApprove}
                    className="flex items-center justify-center gap-1 rounded-xl bg-teal-500 py-2 text-[10px] font-bold text-neutral-950 hover:bg-teal-400 transition active:scale-95 shadow-md shadow-teal-500/20"
                  >
                    <Check className="h-3 w-3" />
                    <span>Approve</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* BANKING DASHBOARD WIDGET (Scenario 8) */}
          {bankingWidget && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2.5"
            >
              <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-3 text-center space-y-1">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 border-b border-neutral-800/80 pb-1">
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3 text-teal-400" />
                    <span>Apex Bank Mobile</span>
                  </span>
                  <span className="font-mono text-neutral-500">A/C ••9102</span>
                </div>

                <div className="pt-2 text-[10px] text-neutral-400 font-mono">Available Balance</div>
                <div
                  className={`text-xl font-extrabold font-mono transition-all duration-300 ${
                    bankingWidget.balance < bankingWidget.initialBalance
                      ? 'text-red-400 scale-105'
                      : 'text-teal-400'
                  }`}
                >
                  ₹{bankingWidget.balance.toLocaleString('en-IN')}.00
                </div>

                {bankingWidget.balance < bankingWidget.initialBalance && (
                  <div className="text-[9.5px] font-mono text-red-400 font-bold animate-pulse">
                    ⚠️ DEBITED: -₹{(bankingWidget.initialBalance - bankingWidget.balance).toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              {bankingWidget.lastTransaction && (
                <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-2 text-[10px] space-y-1">
                  <div className="flex items-center gap-1 text-red-400 font-bold">
                    <Bell className="h-3 w-3" />
                    <span>Bank Push Notification</span>
                  </div>
                  <p className="text-neutral-200 leading-snug">{bankingWidget.lastTransaction}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Bottom Home Indicator */}
        <div className="flex h-3 items-center justify-center bg-neutral-950 shrink-0">
          <div className="h-1 w-12 rounded-full bg-neutral-600" />
        </div>
      </div>
    </div>
  );
};

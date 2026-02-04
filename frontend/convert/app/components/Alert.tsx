"use client"
import { ReactNode } from "react";

interface AlertProps {
  type: "error" | "success" | "info" | "warning";
  children: ReactNode;
  onClose?: () => void;
}

export default function Alert({ type, children, onClose }: AlertProps) {
  const styles = {
    error: {
      bg: "var(--error-bg)",
      border: "var(--error)",
      color: "var(--error)",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    success: {
      bg: "var(--success-bg)",
      border: "var(--success)",
      color: "var(--success)",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    info: {
      bg: "rgba(0, 245, 255, 0.1)",
      border: "var(--accent-cyan)",
      color: "var(--accent-cyan)",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      bg: "rgba(234, 179, 8, 0.1)",
      border: "var(--accent-yellow)",
      color: "var(--accent-yellow)",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  };

  const style = styles[type];

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl animate-fadeInUp"
      style={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {style.icon}
      <div className="flex-1 text-sm">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

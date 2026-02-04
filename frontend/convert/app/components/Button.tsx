"use client"
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  accentColor?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  accentColor,
  icon,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const getVariantStyles = () => {
    if (variant === "primary") {
      const color = accentColor || "var(--accent-cyan)";
      return {
        background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 70%, var(--accent-purple)))`,
        color: "var(--bg-primary)",
        boxShadow: isDisabled ? "none" : `0 4px 20px color-mix(in srgb, ${color} 30%, transparent)`,
      };
    }
    return {};
  };

  const variantClasses = {
    primary: "font-semibold",
    secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent-cyan)] hover:bg-[var(--bg-tertiary)]",
    danger: "bg-[var(--error)] text-white hover:shadow-[0_4px_20px_rgba(239,68,68,0.3)]",
  };

  return (
    <button
      disabled={isDisabled}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all duration-200 overflow-hidden
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5 active:translate-y-0"}
        ${className}
      `}
      style={variant === "primary" ? getVariantStyles() : undefined}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}

      {/* Content */}
      <span className={`flex items-center gap-2 ${loading ? "invisible" : ""}`}>
        {icon}
        {children}
      </span>

      {/* Hover glow effect for primary variant */}
      {variant === "primary" && !isDisabled && (
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)`,
          }}
        />
      )}
    </button>
  );
}

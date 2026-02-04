"use client"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  sublabel?: string;
  variant?: "default" | "dots" | "pulse" | "orbit";
}

export default function LoadingSpinner({
  size = "md",
  color = "var(--accent-cyan)",
  label,
  sublabel,
  variant = "orbit"
}: LoadingSpinnerProps) {
  const sizeValues = {
    sm: { container: 40, orbit: 32 },
    md: { container: 64, orbit: 52 },
    lg: { container: 96, orbit: 80 },
  };

  const s = sizeValues[size];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Spinner Container */}
      <div
        className="relative"
        style={{ width: s.container, height: s.container }}
      >
        {variant === "orbit" && (
          <>
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl animate-pulse"
              style={{ backgroundColor: color, opacity: 0.3 }}
            />

            {/* Orbiting rings */}
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
              style={{
                borderTopColor: color,
                borderRightColor: `color-mix(in srgb, ${color} 50%, transparent)`,
                animationDuration: '1s'
              }}
            />
            <div
              className="absolute rounded-full border-2 border-transparent animate-spin"
              style={{
                inset: '15%',
                borderBottomColor: color,
                borderLeftColor: `color-mix(in srgb, ${color} 50%, transparent)`,
                animationDuration: '1.5s',
                animationDirection: 'reverse'
              }}
            />
            <div
              className="absolute rounded-full border-2 border-transparent animate-spin"
              style={{
                inset: '30%',
                borderTopColor: color,
                animationDuration: '2s'
              }}
            />

            {/* Center dot */}
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                inset: '40%',
                backgroundColor: color,
                boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`
              }}
            />
          </>
        )}

        {variant === "dots" && (
          <div className="flex items-center justify-center gap-2 h-full">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-full animate-bounce"
                style={{
                  width: s.container / 6,
                  height: s.container / 6,
                  backgroundColor: color,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s',
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
            ))}
          </div>
        )}

        {variant === "pulse" && (
          <>
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: color, opacity: 0.2 }}
            />
            <div
              className="absolute inset-[20%] rounded-full animate-ping"
              style={{ backgroundColor: color, opacity: 0.3, animationDelay: '0.2s' }}
            />
            <div
              className="absolute inset-[40%] rounded-full animate-pulse"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 20px ${color}`
              }}
            />
          </>
        )}

        {variant === "default" && (
          <>
            <div
              className="absolute inset-0 rounded-full blur-xl animate-pulse"
              style={{ backgroundColor: color, opacity: 0.2 }}
            />
            <div
              className="absolute inset-0 rounded-full border-4 animate-spin"
              style={{
                borderColor: 'var(--border)',
                borderTopColor: color,
              }}
            />
          </>
        )}
      </div>

      {/* Labels */}
      {(label || sublabel) && (
        <div className="text-center">
          {label && (
            <p
              className="font-semibold text-lg animate-pulse"
              style={{ color }}
            >
              {label}
            </p>
          )}
          {sublabel && (
            <p className="text-sm text-[var(--text-muted)] mt-2">
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Componente de loading para conversões com visual mais impactante
export function ConversionLoader({
  color = "var(--accent-cyan)",
  filesCount = 1,
  message = "Processando..."
}: {
  color?: string;
  filesCount?: number;
  message?: string;
}) {
  return (
    <div className="relative p-8 rounded-2xl overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent, ${color})`,
          backgroundSize: '200% 200%',
          animation: 'shimmer 2s linear infinite',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Main spinner */}
        <div className="relative w-24 h-24">
          {/* Outer rotating ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '3s' }}>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <circle
              cx="48"
              cy="48"
              r="44"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Middle rotating ring (opposite direction) */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          >
            <defs>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <circle
              cx="48"
              cy="48"
              r="34"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="2"
              strokeDasharray="30 70"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner rotating ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '1.5s' }}>
            <circle
              cx="48"
              cy="48"
              r="24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeDasharray="10 40"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          {/* Center pulsing core */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-8 h-8 rounded-full animate-pulse"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
              }}
            />
          </div>

          {/* Orbiting particles */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: `${2 + i * 0.5}s` }}
            >
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: color,
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Progress text */}
        <div className="text-center">
          <p
            className="text-xl font-bold mb-1"
            style={{ color }}
          >
            {message}
          </p>
          <p className="text-[var(--text-secondary)]">
            {filesCount} {filesCount === 1 ? 'arquivo' : 'arquivos'} em processamento
          </p>
        </div>

        {/* Animated progress bar */}
        <div className="w-full max-w-xs h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s linear infinite',
            }}
          />
        </div>

        {/* Status dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: color,
                animationDelay: `${i * 0.15}s`,
                opacity: 0.5 + (i * 0.1),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

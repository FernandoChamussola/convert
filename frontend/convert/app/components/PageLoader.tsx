"use client"
import { useState, useEffect } from "react"

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [revealing, setRevealing] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Simula o carregamento inicial
    const loadTimer = setTimeout(() => {
      setRevealing(true)
    }, 1500)

    // Depois da animação de reveal, esconde completamente
    const hideTimer = setTimeout(() => {
      setHidden(true)
      setLoading(false)
    }, 3500)

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-[2000ms] ease-out ${
        revealing ? "opacity-0 scale-150" : "opacity-100 scale-100"
      }`}
      style={{
        background: "var(--bg-primary)",
        pointerEvents: loading ? "auto" : "none",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse"
          style={{
            background: "var(--accent-purple)",
            top: "20%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{
            background: "var(--accent-cyan)",
            bottom: "10%",
            right: "10%",
            animationDelay: "0.5s",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 animate-pulse"
          style={{
            background: "var(--accent-pink)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Main Loader */}
      <div className={`relative transition-all duration-[1500ms] ease-out ${revealing ? "scale-[2] opacity-0" : "scale-100 opacity-100"}`}>
        {/* Outer rings */}
        <div className="relative w-32 h-32">
          {/* Ring 1 - Outer */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: "3s" }}
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="loader-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="1" />
                <stop offset="50%" stopColor="var(--accent-purple)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#loader-gradient-1)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Ring 2 - Middle */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="loader-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--accent-pink)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="url(#loader-gradient-2)"
              strokeWidth="3"
              strokeDasharray="50 100"
              strokeLinecap="round"
            />
          </svg>

          {/* Ring 3 - Inner */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: "1.5s" }}
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="loader-gradient-3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-pink)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke="url(#loader-gradient-3)"
              strokeWidth="2"
              strokeDasharray="30 50"
              strokeLinecap="round"
            />
          </svg>

          {/* Center core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full animate-pulse"
              style={{
                background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))",
                boxShadow: "0 0 30px var(--accent-cyan), 0 0 60px var(--accent-purple)",
              }}
            />
          </div>

          {/* Orbiting particles */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 animate-spin"
              style={{
                animationDuration: `${2 + i * 0.5}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-purple)",
                  top: i % 2 === 0 ? "0" : "auto",
                  bottom: i % 2 === 0 ? "auto" : "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-purple)"}`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Logo text */}
        <div className="mt-8 text-center">
          <h1
            className="text-2xl font-bold animate-pulse"
            style={{
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Conversor
          </h1>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full animate-bounce"
                style={{
                  background: "var(--accent-cyan)",
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reveal circle effect */}
      <div
        className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
          revealing ? "scale-[3] opacity-0" : "scale-0 opacity-100"
        }`}
        style={{
          background: "radial-gradient(circle, transparent 0%, var(--bg-primary) 70%)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          width: "100vmax",
          height: "100vmax",
          transform: revealing ? "translate(-50%, -50%) scale(3)" : "translate(-50%, -50%) scale(0)",
        }}
      />
    </div>
  )
}

"use client"
import { useAuth } from '../context/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth()

  if (!isOpen) return null

  const handleLogin = () => {
    login()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 animate-scaleIn">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]" />
          <div className="absolute inset-0 bg-[var(--bg-card)]" />

          {/* Border gradient */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              padding: '1px',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Content */}
          <div className="relative p-8">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                  boxShadow: '0 0 40px rgba(0, 245, 255, 0.3)',
                }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text-primary)]">
              Login Necessario
            </h2>

            {/* Description */}
            <p className="text-center text-[var(--text-secondary)] mb-8">
              Para usar as funcionalidades de conversao, faca login com sua conta Google.
            </p>

            {/* Google Login Button */}
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-gray-800 font-semibold transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </button>

            {/* Info */}
            <p className="text-center text-xs text-[var(--text-muted)] mt-6">
              Ao continuar, voce concorda com nossos termos de uso e politica de privacidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

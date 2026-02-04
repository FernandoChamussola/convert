"use client"
import Link from 'next/link'

export default function AuthError() {
  return (
    <div className="page-container flex items-center justify-center min-h-screen">
      <div className="text-center animate-fadeInUp max-w-md">
        {/* Error Icon */}
        <div className="inline-flex p-6 rounded-full bg-[var(--error-bg)] mb-6">
          <svg
            className="w-16 h-16 text-[var(--error)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Erro no Login
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Ocorreu um erro durante a autenticacao. Por favor, tente novamente.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] font-medium hover:border-[var(--accent-cyan)] transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao inicio
        </Link>
      </div>
    </div>
  )
}

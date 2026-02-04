"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export default function AuthSuccess() {
  const router = useRouter()
  const { checkAuth } = useAuth()

  useEffect(() => {
    // Atualiza o estado de autenticação e redireciona
    const handleSuccess = async () => {
      await checkAuth()
      // Pequeno delay para mostrar a animação
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }

    handleSuccess()
  }, [checkAuth, router])

  return (
    <div className="page-container flex items-center justify-center min-h-screen">
      <div className="text-center animate-fadeInUp">
        {/* Success Icon */}
        <div className="inline-flex p-6 rounded-full bg-[var(--success-bg)] mb-6">
          <svg
            className="w-16 h-16 text-[var(--success)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Login realizado com sucesso!
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">
          Redirecionando...
        </p>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--success)] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

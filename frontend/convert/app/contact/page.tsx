"use client"
import { useState } from "react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="page-container page-container-narrow">
      <div className="animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="gradient-text">Contacto</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-8">
          Tem alguma duvida, sugestao ou problema? Envie-nos uma mensagem.
        </p>
      </div>

      <div
        className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 animate-fadeInUp"
        style={{ animationDelay: "100ms" }}
      >
        {submitted ? (
          <div className="text-center py-8">
            <div
              className="inline-flex p-4 rounded-full mb-4"
              style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
            >
              <svg className="w-10 h-10 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Mensagem Enviada</h2>
            <p className="text-[var(--text-secondary)]">
              Obrigado pelo seu contacto. Responderemos o mais brevemente possivel.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2 rounded-lg text-sm font-medium text-[var(--accent-cyan)] border border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-colors duration-200"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="space-y-5"
          >
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="O seu nome"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3px_rgba(0,245,255,0.1)] transition-all duration-200 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="o.seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3px_rgba(0,245,255,0.1)] transition-all duration-200 text-sm"
              />
            </div>

            {/* Mensagem */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Escreva a sua mensagem aqui..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3px_rgba(0,245,255,0.1)] transition-all duration-200 text-sm resize-vertical"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))",
                color: "var(--bg-primary)",
              }}
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

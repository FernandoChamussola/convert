"use client"

export default function ImageToIcon() {
  return (
    <div className="page-container page-container-narrow">
      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span style={{ color: "var(--accent-yellow)" }}>Criar</span>
          <span className="text-[var(--text-primary)]"> Icone</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Converta sua imagem em um arquivo .ico com multiplos tamanhos
        </p>
      </div>

      {/* Em Desenvolvimento Banner */}
      <div className="animate-fadeInUp" style={{ animationDelay: "100ms" }}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-center">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(0,0,0,0.1) 10px,
                rgba(0,0,0,0.1) 20px
              )`
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex p-4 rounded-full bg-white/10 mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Em Desenvolvimento
            </h2>

            <p className="text-white/80 text-lg max-w-md mx-auto">
              Esta funcionalidade ainda esta sendo desenvolvida e estara disponivel em breve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

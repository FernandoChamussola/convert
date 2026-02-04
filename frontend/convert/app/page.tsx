"use client"
import Link from "next/link";

export default function Home() {
  const converters = [
    {
      title: "Imagens para PDF",
      description: "Converta multiplas imagens em um unico arquivo PDF",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: "/images-to-pdf",
      color: "var(--accent-green)",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      title: "Word para PDF",
      description: "Converta documentos Word (.doc, .docx) para PDF",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: "/word-to-pdf",
      color: "var(--accent-blue)",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      title: "PDF para Word",
      description: "Converta arquivos PDF para documentos Word editaveis",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      link: "/pdf-to-word",
      color: "var(--accent-orange)",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      title: "Redimensionar Imagens",
      description: "Redimensione e comprima imagens em lote com controle de qualidade",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      link: "/image-resize",
      color: "var(--accent-pink)",
      gradient: "from-pink-400 to-rose-600"
    },
    {
      title: "Conversor de Formatos",
      description: "Converta imagens entre PNG, JPG, WEBP, GIF e HEIC",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      link: "/image-format",
      color: "var(--accent-purple)",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      title: "Criar Icone",
      description: "Converta imagens para icones .ico com multiplos tamanhos",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      link: "/image-to-icon",
      color: "var(--accent-yellow)",
      gradient: "from-yellow-400 to-amber-500"
    },
    {
      title: "Remover Fundo",
      description: "Remova fundos de imagens automaticamente com IA",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      link: "/remove-background",
      color: "var(--accent-cyan)",
      gradient: "from-cyan-400 to-teal-500"
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Rapido",
      description: "Conversoes em segundos",
      color: "var(--accent-yellow)"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Seguro",
      description: "Seus arquivos sao privados",
      color: "var(--accent-green)"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Gratuito",
      description: "100% gratis, sem limites",
      color: "var(--accent-cyan)"
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="gradient-text">Plataforma de Conversao</span>
          <br />
          <span className="text-[var(--text-primary)]">de Arquivos</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Converta seus arquivos de forma rapida, facil e gratuita.
          <br className="hidden sm:block" />
          Escolha uma das opcoes abaixo para comecar.
        </p>
      </div>

      {/* Converters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
        {converters.map((converter, index) => (
          <Link
            key={converter.link}
            href={converter.link}
            className="group opacity-0 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className="relative h-full p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] transition-all duration-300 hover:border-transparent hover:bg-[var(--bg-card-hover)] overflow-hidden">
              {/* Gradient border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${converter.color}20, transparent)`,
                }}
              />
              <div
                className="absolute inset-[1px] rounded-2xl bg-[var(--bg-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="mb-4 inline-flex p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: converter.color,
                    backgroundColor: `color-mix(in srgb, ${converter.color} 10%, transparent)`,
                  }}
                >
                  <div className="animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                    {converter.icon}
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-semibold mb-2 transition-colors duration-300"
                  style={{ color: converter.color }}
                >
                  {converter.title}
                </h2>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {converter.description}
                </p>
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: converter.color }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0v30M0 15h30' stroke='%23ffffff' stroke-opacity='0.03' fill='none'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative px-6 py-12 sm:px-12 sm:py-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="text-[var(--text-primary)]">Por que usar </span>
            <span className="gradient-text">nossa plataforma</span>
            <span className="text-[var(--text-primary)]">?</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${(index + 7) * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div
                  className="inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: feature.color,
                    backgroundColor: `color-mix(in srgb, ${feature.color} 10%, transparent)`,
                  }}
                >
                  <div className="animate-bounce" style={{ animationDuration: '2s', animationDelay: `${index * 300}ms` }}>
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
                  {feature.title}
                </h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

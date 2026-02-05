import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Column 1 - Conversor */}
          <div>
            <h3 className="text-lg font-semibold gradient-text mb-4">Conversor</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/images-to-pdf" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Imagens para PDF
                </Link>
              </li>
              <li>
                <Link href="/word-to-pdf" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Word para PDF
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-word" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  PDF para Word
                </Link>
              </li>
              <li>
                <Link href="/image-resize" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Redimensionar Imagens
                </Link>
              </li>
              <li>
                <Link href="/image-format" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Conversor de Formatos
                </Link>
              </li>
              <li>
                <Link href="/image-to-icon" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Criar Icone
                </Link>
              </li>
              <li>
                <Link href="/remove-background" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Remover Fundo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Legal */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Politica de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Termos de Servico
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200 text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Contacto</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
              Tem alguma duvida ou sugestao? Entre em contacto connosco.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-cyan)] hover:underline transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar Mensagem
            </Link>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-10 pt-6 border-t border-[var(--border)]">
          <p className="text-center text-[var(--text-muted)] text-xs">
            &copy; {new Date().getFullYear()} Conversor. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

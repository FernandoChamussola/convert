"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Imagens para PDF", path: "/images-to-pdf" },
    { name: "Word para PDF", path: "/word-to-pdf" },
    { name: "PDF para Word", path: "/pdf-to-word" },
    { name: "Redimensionar", path: "/image-resize" },
    { name: "Formatos", path: "/image-format" },
    { name: "Criar Icone", path: "/image-to-icon" },
    { name: "Remover Fundo", path: "/remove-background" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-2xl font-bold gradient-text">
                Conversor
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] group-hover:w-full transition-all duration-300" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg group ${
                  pathname === item.path
                    ? "text-[var(--accent-cyan)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.name}
                {/* Underline effect */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] transition-all duration-300 ${
                    pathname === item.path ? "w-4/5" : "w-0 group-hover:w-4/5"
                  }`}
                />
                {/* Active glow */}
                {pathname === item.path && (
                  <span className="absolute inset-0 bg-[var(--accent-cyan)] opacity-10 rounded-lg" />
                )}
              </Link>
            ))}
          </div>

          {/* User Menu & Mobile button */}
          <div className="flex items-center gap-3">
            {/* User Menu */}
            <UserMenu />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1 glass-dark border-t border-[var(--border)]">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === item.path
                  ? "bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border-l-2 border-[var(--accent-cyan)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

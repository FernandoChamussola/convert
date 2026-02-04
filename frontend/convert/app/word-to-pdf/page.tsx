"use client"
import { useState } from "react";
import DropZone from "../components/DropZone";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { ConversionLoader } from "../components/LoadingSpinner";
import { useProtectedAction } from "../hooks/useProtectedAction";

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { protectedAction, LoginModalComponent } = useProtectedAction();

  const accentColor = "var(--accent-blue)";
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError("");
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Por favor, selecione um arquivo Word");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("document", file);

      const response = await fetch(`${API_URL}/convert/word-to-pdf`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      if (response.status === 401) {
        setError("Voce precisa fazer login para converter arquivos");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao converter documento");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `word-to-pdf-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setFile(null);
    } catch (err) {
      setError("Erro ao converter documento. Certifique-se de que o LibreOffice esta instalado no servidor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="page-container page-container-narrow">
      <LoginModalComponent />

      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span style={{ color: accentColor }}>Word</span>
          <span className="text-[var(--text-primary)]"> para PDF</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Converta documentos Word (.doc, .docx) em PDF
        </p>
      </div>

      {/* Drop Zone */}
      {!file && !loading && (
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
          <DropZone
            onFilesSelected={handleFilesSelected}
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            multiple={false}
            maxFiles={1}
            maxSize={50}
            label="Clique ou arraste seu arquivo Word aqui"
            sublabel="Maximo: 1 arquivo, 50MB"
            accentColor={accentColor}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6">
          <Alert type="error" onClose={() => setError("")}>
            {error}
          </Alert>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] animate-fadeInUp overflow-hidden">
          <ConversionLoader
            color={accentColor}
            filesCount={1}
            message="Convertendo para PDF..."
          />
        </div>
      )}

      {/* Selected File */}
      {file && !loading && (
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Arquivo selecionado
          </h3>
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 10%, transparent)` }}
              >
                <svg className="w-8 h-8" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--text-primary)] truncate">{file.name}</p>
                <p className="text-sm text-[var(--text-muted)]">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={removeFile}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--error)] hover:bg-[var(--error-bg)] transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert Button */}
      <div className="animate-fadeInUp" style={{ animationDelay: "300ms" }}>
        <Button
          onClick={() => protectedAction(handleConvert)}
          disabled={!file}
          loading={loading}
          fullWidth
          size="lg"
          accentColor={accentColor}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        >
          {loading ? "Convertendo..." : "Converter para PDF"}
        </Button>
      </div>
    </div>
  );
}

"use client"
import { useState } from "react";
import DropZone from "../components/DropZone";
import FileCard from "../components/FileCard";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { ConversionLoader } from "../components/LoadingSpinner";
import { useProtectedAction } from "../hooks/useProtectedAction";

export default function ImagesToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { protectedAction, LoginModalComponent } = useProtectedAction();

  const accentColor = "var(--accent-green)";
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(prev => [...prev, ...selectedFiles].slice(0, 10));
    setError("");
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError("Por favor, selecione pelo menos uma imagem");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${API_URL}/convert/convert`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      if (response.status === 401) {
        const data = await response.json();
        if (data.requiresAuth) {
          setError("Voce precisa fazer login para converter arquivos");
          setLoading(false);
          return;
        }
      }

      if (!response.ok) {
        throw new Error("Erro ao converter imagens");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `images-to-pdf-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setFiles([]);
    } catch (err) {
      setError("Erro ao converter imagens. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="page-container page-container-narrow">
      <LoginModalComponent />

      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span style={{ color: accentColor }}>Imagens</span>
          <span className="text-[var(--text-primary)]"> para PDF</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Selecione suas imagens e converta-as em um unico PDF
        </p>
      </div>

      {/* Drop Zone */}
      <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
        <DropZone
          onFilesSelected={handleFilesSelected}
          accept="image/*"
          multiple={true}
          maxFiles={10}
          maxSize={20}
          label="Clique ou arraste suas imagens aqui"
          sublabel="Ate 10 imagens, 20MB cada"
          accentColor={accentColor}
        />
      </div>

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
            filesCount={files.length}
            message="Convertendo para PDF..."
          />
        </div>
      )}

      {/* Files Grid */}
      {files.length > 0 && !loading && (
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Imagens selecionadas ({files.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                index={index}
                onRemove={removeFile}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* Convert Button */}
      <div className="animate-fadeInUp" style={{ animationDelay: "300ms" }}>
        <Button
          onClick={() => protectedAction(handleConvert)}
          disabled={files.length === 0}
          loading={loading}
          fullWidth
          size="lg"
          accentColor={accentColor}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        >
          {loading ? "Convertendo..." : "Converter para PDF"}
        </Button>
      </div>
    </div>
  );
}

"use client"
import { useState } from "react"
import DropZone from "../components/DropZone"
import FileCard from "../components/FileCard"
import Button from "../components/Button"
import Alert from "../components/Alert"
import { ConversionLoader } from "../components/LoadingSpinner"
import { useProtectedAction } from "../hooks/useProtectedAction"

export default function ImageFormat() {
  const [files, setFiles] = useState<File[]>([])
  const [outputFormat, setOutputFormat] = useState<string>("png")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { protectedAction, LoginModalComponent } = useProtectedAction()

  const accentColor = "var(--accent-purple)"
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const formats = [
    { value: "png", label: "PNG", description: "Alta qualidade com transparencia" },
    { value: "jpg", label: "JPG", description: "Compressao para fotos" },
    { value: "webp", label: "WEBP", description: "Formato moderno para web" },
    { value: "gif", label: "GIF", description: "Suporta animacao" },
    { value: "heic", label: "HEIC", description: "Formato Apple (iPhone)" },
  ]

  const handleFilesSelected = (selectedFiles: File[]) => {
    const newFiles = [...files, ...selectedFiles].slice(0, 20)
    setFiles(newFiles)
    setError("")
  }

  const handleConvert = async () => {
    if (files.length === 0) {
      setError("Por favor, selecione pelo menos uma imagem")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("images", file)
      })
      formData.append("outputFormat", outputFormat)

      const response = await fetch(`${API_URL}/convert/image-format`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      })

      if (response.status === 401) {
        setError("Voce precisa fazer login para converter arquivos")
        setLoading(false)
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro na conversao")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `converted-${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setFiles([])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao processar imagens. Tente novamente."
      setError(errorMessage)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="page-container page-container-narrow">
      <LoginModalComponent />

      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span style={{ color: accentColor }}>Conversor</span>
          <span className="text-[var(--text-primary)]"> de Formatos</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Converta suas imagens entre diferentes formatos
        </p>
      </div>

      {/* Drop Zone */}
      <div className="mb-6 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
        <DropZone
          onFilesSelected={handleFilesSelected}
          accept="image/*"
          multiple={true}
          maxFiles={20}
          maxSize={20}
          label="Clique ou arraste suas imagens aqui"
          sublabel="Ate 20 imagens, 20MB cada"
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

      {/* Format Selection */}
      <div className="mb-6 p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] animate-fadeInUp" style={{ animationDelay: "150ms" }}>
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Formato de saida
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {formats.map((format) => (
            <button
              key={format.value}
              onClick={() => setOutputFormat(format.value)}
              className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                outputFormat === format.value
                  ? "border-[var(--accent-purple)] bg-[var(--accent-purple)]/10"
                  : "border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              <span
                className={`block font-semibold text-lg ${
                  outputFormat === format.value ? "text-[var(--accent-purple)]" : "text-[var(--text-primary)]"
                }`}
              >
                {format.label}
              </span>
              <span className="block text-xs text-[var(--text-muted)] mt-1">
                {format.description}
              </span>
            </button>
          ))}
        </div>

        {outputFormat === "heic" && (
          <div className="mt-4">
            <Alert type="warning">
              HEIC pode nao estar disponivel em todos os servidores. Se falhar, tente PNG ou JPG.
            </Alert>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mb-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] animate-fadeInUp overflow-hidden">
          <ConversionLoader
            color={accentColor}
            filesCount={files.length}
            message={`Convertendo para ${outputFormat.toUpperCase()}...`}
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
                formatLabel={`→ ${outputFormat.toUpperCase()}`}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          }
        >
          {loading ? "Convertendo..." : `Converter para ${outputFormat.toUpperCase()}`}
        </Button>
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import DropZone from "../components/DropZone"
import FileCard from "../components/FileCard"
import Button from "../components/Button"
import Alert from "../components/Alert"
import { ConversionLoader } from "../components/LoadingSpinner"
import { useProtectedAction } from "../hooks/useProtectedAction"

export default function ImageResize() {
  const [files, setFiles] = useState<File[]>([])
  const [width, setWidth] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [quality, setQuality] = useState<number>(80)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { protectedAction, LoginModalComponent } = useProtectedAction()

  const accentColor = "var(--accent-pink)"
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

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

      if (width) formData.append("width", width)
      if (height) formData.append("height", height)
      formData.append("quality", quality.toString())
      formData.append("maintainAspectRatio", maintainAspectRatio.toString())

      const response = await fetch(`${API_URL}/convert/image-resize`, {
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
      a.download = `resized-${Date.now()}.zip`
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
          <span style={{ color: accentColor }}>Redimensionar</span>
          <span className="text-[var(--text-primary)]"> Imagens</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Redimensione e comprima suas imagens em lote
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

      {/* Options */}
      <div className="mb-6 p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] animate-fadeInUp" style={{ animationDelay: "150ms" }}>
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Opcoes de Redimensionamento
        </h3>

        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">
              Largura (pixels)
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Auto"
              min="1"
              max="10000"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">
              Altura (pixels)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Auto"
              min="1"
              max="10000"
              className="w-full"
            />
          </div>
        </div>

        {/* Aspect Ratio */}
        <label className="flex items-center gap-3 mb-6 cursor-pointer group">
          <input
            type="checkbox"
            checked={maintainAspectRatio}
            onChange={(e) => setMaintainAspectRatio(e.target.checked)}
          />
          <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            Manter proporcoes da imagem
          </span>
        </label>

        {/* Quality Slider */}
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">
            Qualidade: <span style={{ color: accentColor }} className="font-medium">{quality}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
            <span>Menor tamanho</span>
            <span>Melhor qualidade</span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mb-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] animate-fadeInUp overflow-hidden">
          <ConversionLoader
            color={accentColor}
            filesCount={files.length}
            message="Redimensionando..."
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          }
        >
          {loading ? "Processando..." : "Redimensionar Imagens"}
        </Button>
      </div>
    </div>
  )
}

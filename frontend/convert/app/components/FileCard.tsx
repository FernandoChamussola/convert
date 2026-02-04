"use client"
import { useEffect, useState } from "react";

interface FileCardProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  showPreview?: boolean;
  accentColor?: string;
  formatLabel?: string;
}

export default function FileCard({
  file,
  index,
  onRemove,
  showPreview = true,
  accentColor = "var(--accent-cyan)",
  formatLabel
}: FileCardProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (showPreview && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, showPreview]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const isImage = file.type.startsWith("image/");

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] animate-scaleIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Preview */}
      {showPreview && isImage && preview ? (
        <div className="relative h-32 overflow-hidden">
          <img
            src={preview}
            alt={file.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
        </div>
      ) : (
        <div
          className="h-32 flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 5%, transparent)` }}
        >
          <svg
            className="w-12 h-12"
            style={{ color: accentColor }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate mb-1">
          {file.name}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-[var(--text-muted)]">
            {formatFileSize(file.size)}
          </p>
          {formatLabel && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{
                color: accentColor,
                backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              }}
            >
              {formatLabel}
            </span>
          )}
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-[var(--bg-primary)]/80 backdrop-blur-sm border border-[var(--border)] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[var(--error)] hover:border-[var(--error)] hover:text-white"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

"use client"
import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  label?: string;
  sublabel?: string;
  accentColor?: string;
  id?: string;
}

export default function DropZone({
  onFilesSelected,
  accept = "image/*",
  multiple = true,
  maxFiles = 10,
  maxSize = 20,
  label = "Clique ou arraste arquivos aqui",
  sublabel,
  accentColor = "var(--accent-cyan)",
  id = "fileInput"
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const limitedFiles = multiple ? files.slice(0, maxFiles) : [files[0]];
      onFilesSelected(limitedFiles);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const limitedFiles = multiple ? files.slice(0, maxFiles) : [files[0]];
      onFilesSelected(limitedFiles);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer
        transition-all duration-300 overflow-hidden group
        ${isDragging
          ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5"
          : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]"
        }
      `}
      style={{
        borderColor: isDragging ? accentColor : undefined,
        backgroundColor: isDragging ? `color-mix(in srgb, ${accentColor} 5%, transparent)` : undefined,
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, color-mix(in srgb, ${accentColor} 5%, transparent) 0%, transparent 70%)`
        }}
      />

      {/* Hidden input */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Upload icon */}
        <div
          className={`
            inline-flex p-4 rounded-2xl mb-4 transition-all duration-300
            ${isDragging ? "scale-110" : "group-hover:scale-105"}
          `}
          style={{
            color: accentColor,
            backgroundColor: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
          }}
        >
          <svg
            className={`w-10 h-10 transition-transform duration-500 ${isDragging ? "animate-bounce" : "group-hover:animate-float"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        {/* Label */}
        <p
          className="text-lg font-medium mb-2 transition-colors duration-300"
          style={{ color: isDragging ? accentColor : "var(--text-primary)" }}
        >
          {isDragging ? "Solte os arquivos aqui" : label}
        </p>

        {/* Sublabel */}
        <p className="text-sm text-[var(--text-muted)]">
          {sublabel || `Maximo: ${multiple ? `${maxFiles} arquivos` : "1 arquivo"}, ${maxSize}MB cada`}
        </p>
      </div>

      {/* Animated border effect when dragging */}
      {isDragging && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, transparent, ${accentColor})`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            opacity: 0.1,
          }}
        />
      )}
    </div>
  );
}

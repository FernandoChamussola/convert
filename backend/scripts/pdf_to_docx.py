#!/usr/bin/env python3
"""
Script para converter PDF para DOCX preservando formatação, imagens, tabelas, etc.
Usa pdf2docx que é especializado em conversões de alta qualidade.
"""

import sys
from pdf2docx import Converter

def convert_pdf_to_docx(pdf_path, docx_path):
    """
    Converte PDF para DOCX

    Args:
        pdf_path: Caminho do arquivo PDF de entrada
        docx_path: Caminho do arquivo DOCX de saída
    """
    try:
        cv = Converter(pdf_path)
        cv.convert(docx_path, start=0, end=None)
        cv.close()
        print(f"Conversão bem-sucedida: {docx_path}")
        return True
    except Exception as e:
        print(f"Erro na conversão: {str(e)}", file=sys.stderr)
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python3 pdf_to_docx.py <pdf_input> <docx_output>", file=sys.stderr)
        sys.exit(1)

    pdf_input = sys.argv[1]
    docx_output = sys.argv[2]

    success = convert_pdf_to_docx(pdf_input, docx_output)
    sys.exit(0 if success else 1)

#!/usr/bin/env python3
"""
Script para remover fundo de imagens usando rembg
Uso: python3 remove_background.py <input_path> <output_path>
"""

import sys
from rembg import remove
from PIL import Image

def main():
    if len(sys.argv) != 3:
        print("Uso: python3 remove_background.py <input_path> <output_path>", file=sys.stderr)
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    try:
        # Abrir imagem de entrada
        print(f"Abrindo imagem: {input_path}", file=sys.stderr)
        input_image = Image.open(input_path)

        # Remover fundo usando rembg (pode demorar na primeira vez - download de modelos)
        print(f"Processando com IA (isso pode levar alguns minutos na primeira vez)...", file=sys.stderr)
        output_image = remove(input_image)

        # Salvar como PNG (para preservar transparência)
        print(f"Salvando resultado: {output_path}", file=sys.stderr)
        output_image.save(output_path, "PNG")

        print(f"Fundo removido com sucesso: {output_path}")

    except Exception as e:
        print(f"Erro ao remover fundo: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

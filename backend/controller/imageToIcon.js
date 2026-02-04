import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import toIco from 'to-ico'

class ImageToIcon {
  async convert(req, res) {
    try {
      // 1. Validação
      if (!req.file) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" })
      }

      // 2. Criar diretório de saída
      const outputDir = "src/icons"
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      const timestamp = Date.now()
      const tempDir = path.join(outputDir, `temp-${timestamp}`)
      fs.mkdirSync(tempDir, { recursive: true })

      // 3. Gerar imagens em diferentes tamanhos
      const sizes = [16, 32, 48, 256]
      const pngBuffers = []

      for (const size of sizes) {
        const buffer = await sharp(req.file.path, {
          limitInputPixels: 268402689 // ~16K x 16K
        })
          .resize(size, size, {
            fit: 'contain', // Manter proporções e preencher com fundo transparente
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png({
            compressionLevel: 9,
            palette: true // Usar paleta para ícones menores
          })
          .toBuffer()

        pngBuffers.push(buffer)
      }

      // 4. Criar arquivo .ico usando to-ico
      const icoBuffer = await toIco(pngBuffers)

      // 5. Salvar .ico
      const icoName = `icon-${timestamp}.ico`
      const icoPath = path.join(outputDir, icoName)
      fs.writeFileSync(icoPath, icoBuffer)

      // 6. Download com cleanup
      res.download(icoPath, icoName, (err) => {
        if (err) {
          console.error("Erro ao fazer download:", err)
        }

        // Cleanup após 1 segundo
        setTimeout(() => {
          // Deletar .ico
          if (fs.existsSync(icoPath)) {
            fs.unlinkSync(icoPath)
          }

          // Deletar diretório temporário
          if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true })
          }

          // Deletar arquivo original
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path)
          }
        }, 1000)
      })
    } catch (error) {
      console.error("Erro ao criar ícone:", error)
      res.status(500).json({
        error: "Erro ao processar imagem. Tente novamente."
      })

      // Cleanup em caso de erro
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path)
      }
    }
  }
}

export default new ImageToIcon()

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { createZip } from '../utils/zipHelper.js'

class ImageResize {
  async resize(req, res) {
    try {
      // 1. Validação
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" })
      }

      // 2. Obter parâmetros
      const width = req.body.width ? parseInt(req.body.width) : null
      const height = req.body.height ? parseInt(req.body.height) : null
      const quality = req.body.quality ? parseInt(req.body.quality) : 80
      const maintainAspectRatio = req.body.maintainAspectRatio !== 'false'

      // Validar parâmetros
      if (width && (width < 1 || width > 10000)) {
        return res.status(400).json({ error: "Largura deve estar entre 1 e 10000 pixels" })
      }
      if (height && (height < 1 || height > 10000)) {
        return res.status(400).json({ error: "Altura deve estar entre 1 e 10000 pixels" })
      }
      if (quality < 1 || quality > 100) {
        return res.status(400).json({ error: "Qualidade deve estar entre 1 e 100" })
      }

      // 3. Criar diretório de saída
      const outputDir = "src/images"
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // 4. Processar imagens com Sharp
      const processedFiles = []
      const timestamp = Date.now()

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        const ext = path.extname(file.originalname)
        const outputPath = path.join(outputDir, `resized-${timestamp}-${i + 1}${ext}`)

        // Configurar opções de redimensionamento
        const resizeOptions = {}
        if (width) resizeOptions.width = width
        if (height) resizeOptions.height = height
        if (maintainAspectRatio) {
          resizeOptions.fit = 'inside'
          resizeOptions.withoutEnlargement = false
        } else {
          resizeOptions.fit = 'fill'
        }

        // Processar imagem
        let pipeline = sharp(file.path, {
          limitInputPixels: 268402689 // ~16K x 16K
        })

        // Aplicar redimensionamento se width ou height especificados
        if (width || height) {
          pipeline = pipeline.resize(resizeOptions)
        }

        // Aplicar compressão baseado no formato
        const format = ext.toLowerCase()
        if (format === '.jpg' || format === '.jpeg') {
          pipeline = pipeline.jpeg({ quality })
        } else if (format === '.png') {
          pipeline = pipeline.png({ quality })
        } else if (format === '.webp') {
          pipeline = pipeline.webp({ quality })
        }

        await pipeline.toFile(outputPath)
        processedFiles.push(outputPath)
      }

      // 5. Criar ZIP
      const zipName = `resized-${timestamp}.zip`
      const zipPath = path.join(outputDir, zipName)
      await createZip(processedFiles, zipPath)

      // 6. Download com cleanup
      res.download(zipPath, zipName, (err) => {
        if (err) {
          console.error("Erro ao fazer download:", err)
        }

        // Cleanup após 1 segundo
        setTimeout(() => {
          // Deletar ZIP
          if (fs.existsSync(zipPath)) {
            fs.unlinkSync(zipPath)
          }

          // Deletar arquivos processados
          processedFiles.forEach(filePath => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath)
            }
          })

          // Deletar arquivos originais
          req.files.forEach(file => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path)
            }
          })
        }, 1000)
      })
    } catch (error) {
      console.error("Erro ao redimensionar imagens:", error)
      res.status(500).json({
        error: "Erro ao processar imagens. Tente novamente."
      })

      // Cleanup em caso de erro
      if (req.files) {
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path)
          }
        })
      }
    }
  }
}

export default new ImageResize()

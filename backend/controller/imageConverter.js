import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { createZip } from '../utils/zipHelper.js'

class ImageConverter {
  async convert(req, res) {
    try {
      // 1. Validação
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" })
      }

      const outputFormat = req.body.outputFormat?.toLowerCase()
      const validFormats = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'heif', 'heic']

      if (!outputFormat || !validFormats.includes(outputFormat)) {
        return res.status(400).json({
          error: "Formato de saída inválido. Use: png, jpg, webp, gif ou heic"
        })
      }

      // 2. Criar diretório de saída
      const outputDir = "src/images"
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // 3. Processar conversões com Sharp
      const processedFiles = []
      const timestamp = Date.now()

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]

        // Determinar extensão de saída
        let ext = outputFormat
        if (outputFormat === 'jpeg') ext = 'jpg'
        if (outputFormat === 'heif') ext = 'heic'

        const outputPath = path.join(outputDir, `converted-${timestamp}-${i + 1}.${ext}`)

        try {
          // Criar pipeline Sharp
          const pipeline = sharp(file.path, {
            limitInputPixels: 268402689 // ~16K x 16K
          })

          // Converter para o formato desejado
          switch (outputFormat) {
            case 'png':
              await pipeline.png({ quality: 90 }).toFile(outputPath)
              break

            case 'jpg':
            case 'jpeg':
              await pipeline.jpeg({ quality: 90 }).toFile(outputPath)
              break

            case 'webp':
              await pipeline.webp({ quality: 90 }).toFile(outputPath)
              break

            case 'gif':
              await pipeline.gif().toFile(outputPath)
              break

            case 'heif':
            case 'heic':
              try {
                await pipeline.heif({ quality: 90 }).toFile(outputPath)
              } catch (heifError) {
                // HEIC pode não estar disponível em todos os sistemas
                throw new Error("Formato HEIC não suportado neste servidor. Tente PNG ou JPG.")
              }
              break

            default:
              throw new Error("Formato não suportado")
          }

          processedFiles.push(outputPath)
        } catch (conversionError) {
          console.error(`Erro ao converter ${file.originalname}:`, conversionError)

          // Se for erro de HEIC, propagar mensagem específica
          if (conversionError.message.includes("HEIC")) {
            throw conversionError
          }

          // Outros erros
          throw new Error(`Erro ao converter ${file.originalname}`)
        }
      }

      // 4. Criar ZIP
      const zipName = `converted-${timestamp}.zip`
      const zipPath = path.join(outputDir, zipName)
      await createZip(processedFiles, zipPath)

      // 5. Download com cleanup
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
      console.error("Erro ao converter formato de imagens:", error)
      res.status(500).json({
        error: error.message || "Erro ao processar imagens. Tente novamente."
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

export default new ImageConverter()

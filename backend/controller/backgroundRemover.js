import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createZip } from '../utils/zipHelper.js'

const execPromise = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class BackgroundRemover {
  async remove(req, res) {
    try {
      // 1. Validação
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" })
      }

      if (req.files.length > 10) {
        return res.status(400).json({
          error: "Máximo de 10 imagens permitidas para remoção de fundo"
        })
      }

      // 2. Criar diretório de saída
      const outputDir = "src/images"
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // 3. Processar cada imagem com Python script
      const processedFiles = []
      const timestamp = Date.now()
      const scriptPath = path.join(__dirname, "..", "scripts", "remove_background.py")

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        const outputPath = path.join(outputDir, `no-bg-${timestamp}-${i + 1}.png`)

        try {
          // Chamar script Python com timeout de 5 minutos por imagem (primeira vez demora mais - download de modelos)
          const command = `python3 "${scriptPath}" "${file.path}" "${outputPath}"`

          console.log(`Processando ${file.originalname} com IA...`)
          const { stdout, stderr } = await execPromise(command, {
            timeout: 300000 // 5 minutos por imagem (300 segundos)
          })

          if (stderr && !stderr.includes("UserWarning")) {
            console.error(`Stderr para ${file.originalname}:`, stderr)
          }
          if (stdout) {
            console.log(`Stdout para ${file.originalname}:`, stdout)
          }

          // Verificar se arquivo foi criado
          if (!fs.existsSync(outputPath)) {
            throw new Error(`Falha ao processar ${file.originalname}`)
          }

          processedFiles.push(outputPath)
        } catch (processingError) {
          console.error(`Erro ao processar ${file.originalname}:`, processingError)

          // Se timeout, informar usuário
          if (processingError.killed && processingError.signal === 'SIGTERM') {
            throw new Error(`Timeout ao processar ${file.originalname}. A imagem pode ser muito grande ou complexa.`)
          }

          throw new Error(`Erro ao processar ${file.originalname}: ${processingError.message}`)
        }
      }

      // 4. Criar ZIP com todas as imagens processadas
      const zipName = `no-background-${timestamp}.zip`
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
      console.error("Erro ao remover fundo:", error)
      res.status(500).json({
        error: error.message || "Erro ao processar imagens. Verifique se o Python e rembg estão instalados."
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

export default new BackgroundRemover()

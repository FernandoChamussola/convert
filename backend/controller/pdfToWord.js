import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const execPromise = promisify(exec);

// Obter diretório atual em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PdfToWord {
  async convert(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      // Criar diretório docs se não existir
      const docsDir = "src/docs";
      if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
      }

      const docxName = `pdf-to-word-${Date.now()}.docx`;
      const docxPath = path.join(docsDir, docxName);

      // Caminho do script Python
      const scriptPath = path.join(__dirname, "..", "scripts", "pdf_to_docx.py");

      // Executar script Python para conversão de alta qualidade
      const command = `python3 "${scriptPath}" "${req.file.path}" "${docxPath}"`;

      console.log(`Executando conversão PDF->DOCX: ${command}`);

      const { stdout, stderr } = await execPromise(command);

      if (stderr) {
        console.error("Stderr da conversão:", stderr);
      }

      if (stdout) {
        console.log("Stdout da conversão:", stdout);
      }

      // Verificar se o arquivo foi criado
      if (!fs.existsSync(docxPath)) {
        throw new Error("Falha ao gerar arquivo DOCX");
      }

      // Enviar o DOCX
      res.download(docxPath, docxName, (err) => {
        if (err) {
          console.error("Erro ao enviar DOCX:", err);
        }

        // Limpar ficheiros temporários
        setTimeout(() => {
          if (fs.existsSync(docxPath)) {
            fs.unlinkSync(docxPath);
          }
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
        }, 1000);
      });
    } catch (error) {
      console.error("Erro ao converter PDF para Word:", error);
      res.status(500).json({
        error: "Erro ao converter documento. Verifique se o PDF é válido."
      });

      // Limpar arquivo temporário em caso de erro
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }
  }
}

export default new PdfToWord();

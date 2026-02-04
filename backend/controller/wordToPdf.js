import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execPromise = promisify(exec);

class WordToPdf {
  async convert(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      // Criar diretório pdfs se não existir
      const pdfsDir = "src/pdfs";
      if (!fs.existsSync(pdfsDir)) {
        fs.mkdirSync(pdfsDir, { recursive: true });
      }

      const pdfName = `word-to-pdf-${Date.now()}.pdf`;
      const pdfPath = path.resolve(pdfsDir, pdfName);
      const inputPath = path.resolve(req.file.path);
      const outputDir = path.resolve(pdfsDir);

      // Usar LibreOffice diretamente com parâmetros para preservar imagens
      // --headless: executa sem interface gráfica
      // --convert-to pdf: converte para PDF
      // --outdir: diretório de saída
      const command = `libreoffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

      console.log(`Executando conversão Word->PDF: ${command}`);

      const { stdout, stderr } = await execPromise(command, {
        timeout: 60000, // 60 segundos timeout
      });

      if (stderr) {
        console.error("Stderr da conversão:", stderr);
      }

      if (stdout) {
        console.log("Stdout da conversão:", stdout);
      }

      // O LibreOffice gera o arquivo com o nome original
      const originalBaseName = path.basename(req.file.path, path.extname(req.file.path));
      const generatedPdfPath = path.join(outputDir, `${originalBaseName}.pdf`);

      // Verificar se o arquivo foi criado
      if (!fs.existsSync(generatedPdfPath)) {
        throw new Error("Falha ao gerar arquivo PDF");
      }

      // Renomear para o nome desejado
      fs.renameSync(generatedPdfPath, pdfPath);

      // Enviar o PDF
      res.download(pdfPath, pdfName, (err) => {
        if (err) {
          console.error("Erro ao enviar PDF:", err);
        }

        // Limpar ficheiros temporários
        setTimeout(() => {
          if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);
          }
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
        }, 1000);
      });
    } catch (error) {
      console.error("Erro ao converter Word para PDF:", error);
      res.status(500).json({ error: "Erro ao converter documento" });

      // Limpar arquivo temporário em caso de erro
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }
  }
}

export default new WordToPdf();

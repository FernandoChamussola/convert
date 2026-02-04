import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

class Convert {
  toPDF(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" });
      }

      // Criar diretório pdfs se não existir
      const pdfsDir = "src/pdfs";
      if (!fs.existsSync(pdfsDir)) {
        fs.mkdirSync(pdfsDir, { recursive: true });
      }

      const pdfName = `pdf-${Date.now()}.pdf`;
      const pdfPath = path.join(pdfsDir, pdfName);

      const doc = new PDFDocument({ autoFirstPage: false });
      const stream = fs.createWriteStream(pdfPath);

      doc.pipe(stream);

      // Tamanho da página A4 em pontos
      const PAGE_WIDTH = 595;
      const PAGE_HEIGHT = 842;

      // Limites para imagem com margens (deixando espaço ao redor)
      const MAX_IMG_WIDTH = 500;  // ~84% da largura (margens de ~8% de cada lado)
      const MAX_IMG_HEIGHT = 700; // ~83% da altura

      req.files.forEach((file) => {
        const img = doc.openImage(file.path);

        let imgWidth = img.width;
        let imgHeight = img.height;

        // Redimensionar se exceder o limite de largura
        if (imgWidth > MAX_IMG_WIDTH) {
          const ratio = MAX_IMG_WIDTH / imgWidth;
          imgWidth = MAX_IMG_WIDTH;
          imgHeight = imgHeight * ratio;
        }

        // Redimensionar se exceder o limite de altura
        if (imgHeight > MAX_IMG_HEIGHT) {
          const ratio = MAX_IMG_HEIGHT / imgHeight;
          imgHeight = MAX_IMG_HEIGHT;
          imgWidth = imgWidth * ratio;
        }

        // Calcular posição para centralizar a imagem
        const x = (PAGE_WIDTH - imgWidth) / 2;
        const y = (PAGE_HEIGHT - imgHeight) / 2;

        // Criar página A4 e centralizar imagem
        doc.addPage({ size: [PAGE_WIDTH, PAGE_HEIGHT] });
        doc.image(file.path, x, y, {
          width: imgWidth,
          height: imgHeight
        });
      });

      doc.end();

      stream.on("finish", () => {
        // Enviar o PDF
        res.download(pdfPath, pdfName, (err) => {
          if (err) {
            console.error("Erro ao enviar PDF:", err);
          }

          // Limpar ficheiros temporários após download
          setTimeout(() => {
            fs.unlinkSync(pdfPath);
            req.files.forEach((file) => {
              if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
              }
            });
          }, 1000);
        });
      });

      stream.on("error", (err) => {
        console.error("Erro ao criar PDF:", err);
        res.status(500).json({ error: "Erro ao criar PDF" });
      });
    } catch (error) {
      console.error("Erro no processamento:", error);
      res.status(500).json({ error: "Erro ao processar imagens" });
    }
  }
}

export default new Convert();

import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } from "docx";
import html2canvas from 'html2canvas'; // Para convertir el gráfico en imagen

// Función para convertir el Markdown en párrafos de docx
const convertMarkdownToParagraphs = (content) => {
  const lines = content.split('\n');
  const paragraphs = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line.substring(2), bold: true })],
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 },
      }));
    } else if (line.startsWith("## ")) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line.substring(3), bold: true })],
        heading: HeadingLevel.HEADING_3,
        spacing: { after: 200 },
      }));
    } else if (line.startsWith("### ")) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line.substring(4), bold: true })],
        heading: HeadingLevel.HEADING_4,
        spacing: { after: 200 },
      }));
    } else if (line.startsWith("- ")) {
      const listItemText = line.substring(2);
      paragraphs.push(new Paragraph({
        children: [new TextRun(listItemText)],
        bullet: { level: 0 },
        spacing: { after: 200 },
      }));
    } else if (line.trim() !== "") {
      paragraphs.push(new Paragraph({
        children: [new TextRun(line)],
        spacing: { after: 200 },
      }));
    }
  }
  return paragraphs;
};

// Función para generar el reporte DOCX y descargarlo
export const generateDocxReport = async (content, chartRef) => {
  const canvas = await html2canvas(chartRef.current);
  const imageData = canvas.toDataURL("image/png");

  // Crear el documento DOCX
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Análisis de Riesgos de Ciberseguridad", bold: true })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            children: [new TextRun("Este reporte contiene un análisis de riesgos y amenazas de las vulnerabilidades encontradas y los controles que se recomiendan implementar para los mismos.")],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Análisis de riesgos:", bold: true })],
            spacing: { after: 200 },
          }),
          // Insertar el gráfico como una imagen
          new Paragraph({
            children: [
              new ImageRun({
                data: imageData, // Imagen del gráfico
                transformation: { width: 400, height: 300 }
              }),
            ],
            spacing: { after: 200 },
          }),
          ...convertMarkdownToParagraphs(content), // Convertir Markdown a párrafos
          new Paragraph({
            children: [new TextRun({ text: "Conclusión del análisis de riesgos.", bold: true, italics: true })],
          }),
        ],
      },
    ],
  });

  // Convertir el documento a un string en base64
  const base64String = await Packer.toBase64String(doc);

  // Crear un enlace para descargar el archivo como un archivo binario
  const link = document.createElement("a");
  link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`;
  link.download = "reporte_riesgos.docx";
  link.click();
};
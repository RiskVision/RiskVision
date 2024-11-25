import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } from "docx";
import html2canvas from "html2canvas";

// Función para convertir el Markdown en párrafos de docx
const convertMarkdownToParagraphs = (content) => {
  const lines = content.split("\n");
  const paragraphs = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: line.substring(2), bold: true })],
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        })
      );
    } else if (line.startsWith("## ")) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: line.substring(3), bold: true })],
          heading: HeadingLevel.HEADING_3,
          spacing: { after: 200 },
        })
      );
    } else if (line.startsWith("### ")) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: line.substring(4), bold: true })],
          heading: HeadingLevel.HEADING_4,
          spacing: { after: 200 },
        })
      );
    } else if (line.startsWith("- ")) {
      const listItemText = line.substring(2);
      paragraphs.push(
        new Paragraph({
          children: [new TextRun(listItemText)],
          bullet: { level: 0 },
          spacing: { after: 200 },
        })
      );
    } else if (line.trim() !== "") {
      const textRuns = [];
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          textRuns.push(new TextRun(line.substring(lastIndex, match.index)));
        }
        textRuns.push(new TextRun({ text: match[1], bold: true }));
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        textRuns.push(new TextRun(line.substring(lastIndex)));
      }

      paragraphs.push(
        new Paragraph({
          children: textRuns,
          spacing: { after: 200 },
        })
      );
    }
  }
  return paragraphs;
};

// Función para generar el reporte DOCX y descargarlo
export const generateDocxReport = async (content, chartRef) => {
  const container = chartRef.current;

  if (!container) {
    console.error("No se encontró el contenedor del gráfico");
    return;
  }

  // Ajustar estilo del contenedor
  container.style.margin = "0";
  container.style.padding = "0";
  container.style.boxSizing = "border-box";
  container.style.width = "800px";
  container.style.height = "600px";

  // Capturar imagen del contenedor
  const screenshotCanvas = await html2canvas(container, {
    scale: 2, // Aumenta la calidad de la captura
    backgroundColor: null, // Elimina fondo blanco por defecto
  });

  const imageData = screenshotCanvas.toDataURL("image/png");

  // Determinar tamaño de la imagen según proporciones originales
  const aspectRatio = screenshotCanvas.width / screenshotCanvas.height;
  const imageWidth = 500; // Ancho deseado
  const imageHeight = Math.round(imageWidth / aspectRatio);

  // Crear el documento DOCX
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Análisis de Riesgos de Ciberseguridad",
                bold: true,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Este reporte contiene un análisis de riesgos y amenazas de las vulnerabilidades encontradas y los controles que se recomiendan implementar para los mismos."
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Análisis de riesgos:",
                bold: true,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: imageData,
                transformation: { width: imageWidth, height: imageHeight },
              }),
            ],
            spacing: { after: 200 },
          }),
          ...convertMarkdownToParagraphs(content),
        ],
      },
    ],
  });

  // Convertir y descargar el documento
  const base64String = await Packer.toBase64String(doc);
  const link = document.createElement("a");
  link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`;
  link.download = "reporte_riesgos.docx";
  link.click();
};
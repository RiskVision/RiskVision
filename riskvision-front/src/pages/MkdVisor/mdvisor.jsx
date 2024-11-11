import React, { useState, useRef } from "react";
import ReactECharts from 'echarts-for-react';
import Markdown from "react-markdown";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } from "docx";
import { saveAs } from "file-saver";
import MarkdownIt from "markdown-it";
import html2canvas from 'html2canvas'; // Para convertir el gráfico en imagen
import './mdvisor.styles.scss';

const MDVisor = ({}) => {
    const [loading, setLoading] = useState(false); // Para mostrar un estado de carga mientras se genera el reporte
    const chartRef = useRef(null); // Referencia para el gráfico
    
    const testMD = "# Evaluación de Riesgos en Activos Digitales \n La evaluación de riesgos es fundamental para anticipar y mitigar posibles amenazas en el entorno digital. En este contexto, se han identificado varios niveles de probabilidad e impacto asociados a diferentes riesgos. \n Los resultados de este análisis se resumen en la siguiente estructura de datos:\n";

    const testjson = {
        probabilidad: [2, 4, 5, 2], // Valores para el eje x (probabilidad)
        impacto: [4, 3, 2, 4],      // Valores para el eje y (impacto)
        series: ["riesgo1", "riesgo2", "riesgo3", "riesgo4"] // Etiquetas de los riesgos
    };

    // Creamos una matriz de 5x5 con valores por defecto 0
    const matrix = Array.from({ length: 5 }, () => Array(5).fill(0));

    // Rellenamos la matriz con los datos de testjson
    testjson.probabilidad.forEach((prob, index) => {
        const x = prob - 1;   // Restamos 1 para tener el índice correcto en el eje x (de 1 a 5 -> 0 a 4)
        const y = testjson.impacto[index] - 1; // Restamos 1 para tener el índice correcto en el eje y (de 1 a 5 -> 0 a 4)
        matrix[y][x] = 1;     // Asignamos un valor de 1 para indicar que esta celda tiene datos
    });

    const options = {
        tooltip: {
            position: 'top',
            formatter: (params) => {
                const x = params.data[0] + 1; // Probabilidad (agregamos 1 para mostrar el valor correcto)
                const y = params.data[1] + 1; // Impacto (agregamos 1 para mostrar el valor correcto)
    
                // Encontramos todos los riesgos que coinciden con esta probabilidad e impacto
                const risksInCell = testjson.series.filter((_, index) => {
                    return testjson.probabilidad[index] === x && testjson.impacto[index] === y;
                });
    
                // Si hay riesgos asociados a esa celda, mostramos el nombre y la información
                return risksInCell.length > 0 ? 
                    `Riesgos: ${risksInCell.join(", ")}<br/>Probabilidad: ${x}<br/>Impacto: ${y}` :
                    `Probabilidad: ${x}<br/>Impacto: ${y}`;
            }
        },
        xAxis: {
            type: 'category',
            data: [1, 2, 3, 4, 5],
            name: 'Probabilidad',
            axisLabel: {
                position: 'bottom', // Aseguramos que las etiquetas estén en la parte inferior
                margin: 20,  // Se agrega margen para evitar que las etiquetas se corten
            }
        },
        yAxis: {
            type: 'category',
            data: [1, 2, 3, 4, 5],
            name: 'Impacto'
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '20%', // Aumenta el margen inferior para evitar que las etiquetas se corten
            top: '10%'
        },
        visualMap: {
            min: 0,
            max: 1,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            inRange: {
                color: ['#ffffff', '#006edd'] // Colores del gradiente
            }
        },
        series: [{
            name: 'Heatmap',
            type: 'heatmap',
            data: matrix.flatMap((row, y) => row.map((value, x) => [x, y, value])),
            emphasis: {
                itemStyle: {
                    borderColor: '#333',
                    borderWidth: 1
                }
            }
        }]
    };
    
    

    // Función para generar el reporte DOCX y descargarlo
    const generateReport = async () => {
        setLoading(true);

        // Primero, capturamos la imagen del gráfico usando html2canvas
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
                        ...convertMarkdownToParagraphs(testMD), // Convertir Markdown a párrafos
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

        setLoading(false);
    };

    // Función para convertir el Markdown en párrafos de docx
    const convertMarkdownToParagraphs = (content) => {
        const md = new MarkdownIt();
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

    return (
        <div className="mkdiv container justify-start mx-auto my-6">
            <Markdown>{testMD}</Markdown>
            <div ref={chartRef}> {/* Referencia para el gráfico */}
                <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
            </div>
            <button 
                onClick={generateReport} 
                disabled={loading} 
                className={`px-6 py-2 mt-4 text-white font-semibold rounded-lg 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'} transition-all duration-300`}
            >
                {loading ? 'Generando reporte...' : 'Generar y Descargar Reporte'}
            </button>
        </div>
    );
}

export default MDVisor;

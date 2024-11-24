//Archivo con variables que se usan en toda la aplicación, como la IP de la API

// Archivo con variables que se usan en toda la aplicación, como la IP de la API

export const API_IP = "localhost";
export const API_PORT = "8000";
export const API_URL = `http://${API_IP}:${API_PORT}`;

export const pastelColors = [
    'rgba(173, 216, 230, 1)', // Light Blue
    'rgba(186, 104, 200, 1)', // Light Purple
    'rgba(255, 105, 180, 1)', // Light Pink
    'rgba(255, 160, 122, 1)', // Light Peach
    'rgba(255, 255, 102, 1)', // Light Yellow
    'rgba(144, 238, 144, 1)', // Light Green
    'rgba(255, 105, 180, 1)', // Light Magenta
    'rgba(240, 128, 128, 1)', // Light Coral
    'rgba(255, 215, 0, 1)',   // Light Goldenrod
    'rgba(135, 206, 235, 1)'  // Light Cyan
];


export const markdownTest = `

Este reporte contiene un análisis de riesgos y amenazas de las vulnerabilidades encontradas y los controles que se recomiendan implementar para los mismos.

## Análisis de riesgos

A continuación se presenta un análisis detallado de los riesgos identificados:

- **Riesgo 1**: Descripción del riesgo 1.
- **Riesgo 2**: Descripción del riesgo 2.
- **Riesgo 3**: Descripción del riesgo 3.
- **Riesgo 4**: Descripción del riesgo 4.

\`\`\`json
[
    {
        "riesgo": "Titulo del Riesgo",
        "datos": [
        [1,2]
        ]
    }
]
\`\`\`

## Conclusión

La conclusión del análisis de riesgos.
`;

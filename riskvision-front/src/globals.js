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


export const markdownTest1 = `

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

const markdownTest2 = "La vulnerabilidad encontrada en el dispositivo de pago Terminal de Pago PAX A920 es la CVE-2023-42133, que permite la escalada de privilegios a través de scripts mal configurados en dispositivos POS basados en Android. Es necesario que el atacante tenga acceso a la shell con privilegios de cuenta del sistema para explotar esta vulnerabilidad. La versión del firmware PayDroid_8.1.0_Sagittarius_V11.1.61_20240226 incluye un parche que aborda este problema [doc1].\n\nA continuación se presenta una lista de riesgos relacionados con esta vulnerabilidad y su correspondiente nivel de impacto y probabilidad en un formato de diccionario que se puede utilizar para generar un heatmap:\n\n[{\"riesgo\": \"Escalada de privilegios en el dispositivo de pago PAX A920\", \"datos\": [[4, 3]]},\n{\"riesgo\": \"Posibilidad de acceso no autorizado a información confidencial\", \"datos\": [[3, 2]]},\n{\"riesgo\": \"Posible interrupción del servicio del dispositivo de pago\", \"datos\": [[2, 2]]}] \n\nDonde el nivel de impacto y probabilidad varía de 1 a 5, siendo 1 el menor impacto y probabilidad, y 5 el mayor. La escalada de privilegios representa un riesgo crítico con un impacto alto y probabilidad media. La posibilidad de acceso no autorizado a información confidencial representa un riesgo medio con un impacto moderado y probabilidad media. La posible interrupción del servicio del dispositivo de pago representa un riesgo bajo con un impacto moderado y probabilidad baja [doc1].";

const markdownTest3 = `## Análisis de riesgos para la vulnerabilidad en la Terminal de Pago PAX A920 (CVE-2023-42133)\n\nLa vulnerabilidad CVE-2023-42133 afecta a las terminales de pago PAX A920 con sistema operativo Android y versión de firmware PayDroid_8.1.0_Sagittarius_V11.1.61_20240226 o anterior. Esta vulnerabilidad permite la escalada de privilegios por medio de scripts mal configurados, lo que podría ser aprovechado por un atacante con acceso de shell y privilegios de cuenta de sistema para comprometer la terminal de pago. Afortunadamente, se ha lanzado un parche que soluciona este problema en la versión de firmware mencionada.\`\`\`json[{\"riesgo\": \"Escalada de privilegios por scripts mal configurados\", \"datos\": [[4, 3]]}]\`\`\` \n\nEste riesgo tiene un impacto moderado (4) y una probabilidad media (3) de ocurrir, por lo que se considera un riesgo moderado.`

console.log(markdownTest1);

export const markdownTests = [markdownTest1, markdownTest2, markdownTest3];
//console.log(markdownTests);
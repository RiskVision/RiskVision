import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Función para generar un color aleatorio en formato rgba, omitiendo verde, amarillo y rojo
const getRandomColor = () => {
    let r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while ((r === 0 && g === 255 && b === 0) || // Verde
    (r === 255 && g === 255 && b === 0) || // Amarillo
    (r === 255 && g === 0 && b === 0) || // Rojo
    (r === 255 && g === 165 && b === 0)); // Naranja
              // Rojo
    return `rgba(${r}, ${g}, ${b}, 1)`;
};

// Función para generar una lista de colores aleatorios
const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(getRandomColor());
    }
    return colors;
};

const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, ctx.canvas.height, ctx.canvas.width, 0);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'red'); // Rojo pastel
    return gradient;
};

const createBackgroundPlugin = (gradient) => {
    return {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = gradient;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    };
};

const createDatasets = (data, colors) => {
    return data.map((item, index) => ({
        label: item.riesgo,
        data: item.datos.map(d => ({ x: d[0], y: d[1] })),
        backgroundColor: colors[index % colors.length], // Asignar un color diferente a cada serie
        pointRadius: 10,
        pointBackgroundColor: colors[index % colors.length],
        pointBorderColor: 'rgba(0, 0, 0, 1)' // Borde negro sólido
    }));
};

const createScaleOptions = (title) => {
    return {
        title: {
            display: true,
            text: title
        },
        min: 0,
        max: 6,
        ticks: {
            callback: tickCallback
        }
    };
};

const tickCallback = (value) => {
    if (value === 0 || value === 6) {
        return '';
    }
    return value;
};

const Heatmap = ({ data }) => {
    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        let myChart;

        if (Chart.getChart('myChart')) {
            Chart.getChart('myChart').destroy();
        } 

        const gradient = createGradient(ctx);
        const backgroundPlugin = createBackgroundPlugin(gradient);

        // Verificar que `data` es un objeto JSON
        if (typeof data !== 'object' || data === null) {
            console.error('Data is not a valid JSON object:', data);
            return;
        }
        // Generar colores aleatorios
        const colors = generateRandomColors(data.length);

        // Convertir los datos pasados como prop en el formato necesario para Chart.js
        const datasets = createDatasets(data, colors);

        myChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: datasets
            },
            options: {
                scales: {
                    x: createScaleOptions('Impacto'),
                    y: createScaleOptions('Probabilidad')
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                    customCanvasBackgroundColor: backgroundPlugin
                }
            },
            plugins: [backgroundPlugin]
        });

        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [data]);

    return (
        <div style={{ width: '700px', height: '500px', margin: '0 auto' }}>
            <canvas id="myChart" width="700" height="500"></canvas>
        </div>
    );
};

export default Heatmap;
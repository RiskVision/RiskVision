import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const colors = [
    'rgba(255, 99, 132, 1)', // Rojo sólido
    'rgba(54, 162, 235, 1)', // Azul sólido
    'rgba(75, 192, 192, 1)', // Verde sólido
    'rgba(255, 206, 86, 1)', // Amarillo sólido
    'rgba(153, 102, 255, 1)' // Púrpura sólido
];

const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, ctx.canvas.height, ctx.canvas.width, 0);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'red');
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
        label: item.nombreActivo,
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
        <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    );
};

export default Heatmap;
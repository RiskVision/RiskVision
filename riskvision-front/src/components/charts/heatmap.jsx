import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { pastelColors } from '../../globals.js';

Chart.register(...registerables);


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
            color: 'black',
            display: true,
            text: title,
            font: {
                size: 16, // Increase font size
                weight: 'bold' // Make font black
            }
        },
        min: 0,
        max: 6,
        ticks: {
            color: 'black', // Make ticks black
            font: {
                size: 12, // Increase font size for ticks
                weight: 'bold' // Make font bold for ticks
            },
            callback: tickCallback
        }
    };
}

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
        
        // Use the imported pastel colors
        const colors = pastelColors;

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
                        labels: {
                            color: 'black', // Make legend labels black
                            font: {
                                size: 14, // Increase font size for legend
                                weight: 'bold' // Make font bold for legend
                            }
                        }
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
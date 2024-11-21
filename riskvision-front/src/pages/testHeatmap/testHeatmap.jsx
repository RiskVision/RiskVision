import React from 'react';
import Heatmap from '../../components/charts/heatmap.jsx';

const HeatmapPage = () => {
    const data = [
        {
            nombreActivo: 'Laptop 1',
            datos: [
                [1, 1],
                [2, 3],
                [3, 4],
                [4, 2],
                [5, 5]
            ]
        },
        {
            nombreActivo: 'Laptop 2',
            datos: [
                [1, 2],
                [2, 4],
                [3, 1],
                [4, 3],
                [5, 2]
            ]
        }
    ];

    return (
        <div>
            <Heatmap data={data} />
        </div>
    );
};

export default HeatmapPage;
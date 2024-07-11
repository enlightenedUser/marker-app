"use client"

import React, {useCallback, useEffect, useState} from 'react';
import styles from './SavedPage.module.scss';
import Chart from "react-apexcharts";

const SavedPage = () => {
    const [currentChart, setCurrentChart] = useState(null);
    const [allCharts, setAllCharts] = useState(null);

    const onDeleteClick = useCallback((id) => {
        const copy = [...allCharts].filter(chart => chart.id !== id);
        setAllCharts(copy);
        localStorage.setItem('savedCharts', JSON.stringify(copy))
    }, [allCharts])

    useEffect(() => {
        const savedData = localStorage.getItem('savedCharts');
        if(savedData){
            setAllCharts(JSON.parse(savedData));
        }
    }, []);

    return (
        <div>
            {allCharts && (
                <div className={styles.charts}>
                    {allCharts.map((chart) => (
                        <div className={styles.chart} key={chart.id}>
                            <div>{chart.name}</div>
                            <button onClick={() => setCurrentChart(chart.chart)}>Показать</button>
                            <button onClick={()=>onDeleteClick(chart.id)}>Удалить</button>
                        </div>
                    ))}
                </div>
            )}
            {currentChart && (
                <div style={{marginTop: '20px'}}>
                    <Chart type="line" options={currentChart.options} series={currentChart.series}/>
                </div>
            )}
        </div>
    );
};

export default SavedPage;
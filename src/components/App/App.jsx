"use client"

import React, {useCallback, useRef, useState} from 'react';
import Chart from "react-apexcharts";
import { uid } from 'uid';
import styles from './App.module.scss';

const App = () => {
    const maxDistanceRef = useRef(null);
    const stepRef = useRef(null);
    const nameRef = useRef(null);
    const [maxDistance, setMaxDistance] = useState(0);
    const [step, setStep] = useState(5);
    const [table, setTable] = useState([]);
    const [chart, setChart] = useState(null);

    const onSubmitMaxDistance = useCallback(() => {
        try {
            if(maxDistanceRef.current.value > 150 || ((+stepRef.current.value) || step) < 1) return;
            setMaxDistance(maxDistanceRef.current.value)
            setStep(+(stepRef.current.value) || 5)
            setTable([]);
            let count = 0;
            let id = 0;
            while ((maxDistanceRef.current.value) > count) {
                const distance = maxDistanceRef.current.value - count
                const newId = id
                setTable((prev)=> [...prev, {distance, id: newId}]);
                count += (+stepRef.current.value) || step
                id += 1
            }
        }catch (e) {
            console.log(e)
        }
    }, [maxDistanceRef, stepRef])

    const onResetClick = useCallback(()=>{
        setTable([])
        setMaxDistance(0)
        setStep(5)
        setChart(null)
    }, [])

    const onInputDeepChange = useCallback((id, value)=>{
        try {
            const copy = [...table]
            if(!copy)return;
            copy.find(item=>item.id === id).deep = +value

            setTable(copy)
        }catch (e) {
            console.log(e)
        }
    }, [table])

    const onShowChartClick = useCallback(()=>{
        try {
            const copy = [...table].reverse().filter(item=>!!item.deep)
            const result = {
                options: {
                    chart:{
                        id: 'chart'
                    },
                    xaxis: {
                        categories: copy.map(item=>item.distance)
                    }
                },
                series: [{
                    type: 'line',
                    name: 'series-1',
                    data: copy.map(item=>-item.deep)
                }]
            }
            setChart(result)
        }catch (e) {
            console.log(e)
        }
    }, [table])

    const onSaveClick = useCallback(()=>{
        try {
            if(!nameRef.current.value)return;
            const data = {
                name: nameRef.current.value,
                chart,
                id: uid()
            }
            const savedCharts = localStorage.getItem('savedCharts')
            if(savedCharts){
                const copy = JSON.parse(savedCharts)
                copy.push(data)
                localStorage.setItem('savedCharts', JSON.stringify(copy))
            }else {
                localStorage.setItem('savedCharts', JSON.stringify([data]))
            }
            alert('Successfully Saved')
        }catch (e) {
            console.log(e)
        }
    }, [nameRef, chart])

    return (
        <div>
            <div style={{marginTop: '30px'}}>
                Максимальная дистанция: <input type='number' ref={maxDistanceRef} placeholder='Максимум 150'/>
            </div>
            <div>
                Шаг: <input type='number' ref={stepRef} placeholder='по умолчанию = 5'/>
            </div>
            <div style={{display: 'flex', gap: '10px', margin: '20px'}}>
                <button onClick={onSubmitMaxDistance}>Подтвердить</button>
                <button onClick={onResetClick}>Сбросить</button>
            </div>
            {table.length > 0 && (
                table.map((item) => (
                    <div className={styles.chart} key={item.id}>{item.distance}м: <input type='number'
                                                                                           placeholder='Глубина'
                                                                                           onChange={(e) => (onInputDeepChange(item.id, e.target.value))}/>
                    </div>
                ))
            )}
            {table.length > 0 && (
                <button onClick={onShowChartClick}>Вывести график</button>
            )}
            {chart && (
                <div style={{marginTop: '20px'}}>
                    <Chart type="line" options={chart.options} series={chart.series}/>
                    Имя: <input ref={nameRef} type='text'/>
                    <button onClick={onSaveClick}>Сохранить</button>
                </div>
            )}
        </div>
    );
};

export default App;
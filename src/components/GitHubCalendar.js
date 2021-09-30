import React, { useEffect, useRef } from 'react';
import * as echarts from "echarts";

const GitHubCalendar = (props) => {
    const calendar = useRef(null);
    const initOrUpdateEcharts = () => {
        let myChart = echarts.getInstanceByDom(calendar.current);
        if (!myChart) {
            myChart = echarts.init(calendar.current);
        }
        myChart.on('click', (param) => {
        });
        myChart.setOption({
            title: {},
            tooltip: {
                formatter: function (params) {
                    if (params.data[2] === 0) {
                        return "no contributions on " + params.data[0].toString();
                    }
                    return params.data[2].toString() + " contributions on " + params.data[0].toString();
                }
            },
            visualMap: {
                show: false,
                min: 0,
                max: 4,
                inRange: {
                    color: ['#ffffff', '#39d353', '#26a641', '#006d32', '#0e4429'],
                },
            },
            calendar: {
                top: 30,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2021',
                itemStyle: {
                    borderWidth: 0.5
                },
                yearLabel: {show: false}
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: props.data,
            }
        });
    };

    const handleResize = () => {
        let myChart = echarts.getInstanceByDom(calendar.current);
        if (!myChart) {
            myChart = echarts.init(calendar.current);
        }
        myChart.resize();
    };

    useEffect(() => {
        initOrUpdateEcharts();
        window.addEventListener('resize', handleResize);
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        }
    });

    return (
        <div>
            <div style={{
                width: '90%',
                height: 350,
                maxHeight: 600,
                margin: 'auto',
            }} ref={calendar} />
        </div>
    );
}

export default GitHubCalendar;

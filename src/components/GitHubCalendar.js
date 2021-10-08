import React, { useEffect, useRef, useState } from 'react';
import * as echarts from "echarts";

const GitHubCalendar = (props) => {
    const calendar = useRef(null);
    const [height, setHeight] = useState(100);
    const handleResize = () => {
        if (calendar.current != null) {
            setHeight(calendar.current.clientWidth / 7);
        }
        let myChart = echarts.getInstanceByDom(calendar.current);
        if (!myChart) {
            myChart = echarts.init(calendar.current);
        }
        myChart.resize();
    };

    useEffect(() => {
        if (calendar.current != null) {
            setHeight(calendar.current.clientWidth / 7);
            setTimeout(()=> {
                let myChart = echarts.getInstanceByDom(calendar.current);
                if (!myChart) {
                    myChart = echarts.init(calendar.current, null, {renderer: 'svg'});
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
                        cellSize: ['auto', 13],
                        left: 'center',
                        top: 'center',
                        width: '100%',
                        height: '100%',
                        range: '2021',
                        itemStyle: {
                            borderWidth: 0.7
                        },
                        yearLabel: {show: false}
                    },
                    series: {
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: props.data,
                    }
                });
            },0);
        }

        window.addEventListener('resize', handleResize);
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        }
    }, [props.data]);

    return (
        <div>
            <div style={{
                width: '100%',
                height: height,
                margin: 'auto',
            }} ref={calendar} />
        </div>
    );
}

export default GitHubCalendar;

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

// 热搜排名的趋势图
const HotSearchRank = (props) => {
    const chartRef = useRef(null);
    const [height, setHeight] = useState(300);



    const handleResize = () => {
        if (chartRef.current != null) {
            setHeight(chartRef.current.clientWidth / 3);
        }
        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
        }
        myChart.resize();
    };

    useEffect(() => {
        if ( chartRef.current !== null ) {
            setHeight(chartRef.current.clientWidth / 3);
            setTimeout(()=> {
                let myChart = echarts.getInstanceByDom(chartRef.current);
                if (!myChart) {
                    myChart = echarts.init(chartRef.current);
                }
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        /*position: function (pt) {
                            return [pt[0], '10%'];
                        }*/
                    },
                    title: {
                        left: 'center',
                        text: '排名趋势'
                    },
                    dataset: {
                        source: props.source,
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,

                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        position: 'left',
                        inverse: true,
                        max: 50,
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        },
                        {
                            start: 0,
                            end: 10
                        }
                    ],
                    series: [
                        {
                            name: '排名',
                            type: 'line',
                            symbol: 'none',
                            sampling: 'lttb',
                            itemStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            /*areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgb(255, 158, 68)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(255, 70, 131)'
                                    }
                                ])
                            },*/
                            encode: {
                                x: 'time',
                                y: 'rank',
                            },
                        }
                    ]
                });
            },0);
        }
        window.addEventListener('resize', handleResize);
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        }
    }, [props.source]);

    return (
        <div>
            <div style={{
                width: '90%',
                height: height,
                minHeight: 300,
                margin: 'auto',
            }} ref={chartRef} />
        </div>
    );
};

export default HotSearchRank;

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// 热搜排名的趋势图
const HotSearchRank = (props) => {
    const chartRef = useRef(null);
    const initOrUpdateEcharts = () => {
        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
        }
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '排名趋势'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
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
    };

    const handleResize = () => {
        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
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
                height: 300,
                maxHeight: 500,
                margin: 'auto',
            }} ref={chartRef} />
        </div>
    );
};

export default HotSearchRank;

import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

// 热搜热度的趋势图
const HotSearchHot = (props) => {
    const hotChartRef = useRef(null);
    const initOrUpdateEcharts = () => {
        let myChart = echarts.getInstanceByDom(hotChartRef.current);
        if (!myChart) {
            myChart = echarts.init(hotChartRef.current);
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
                text: '热度趋势'
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
                    name: '热度',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
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
                    },
                    encode: {
                        x: 'time',
                        y: 'hot',
                    },
                }
            ]
        });
    };

    const handleResize = () => {
        let myChart = echarts.getInstanceByDom(hotChartRef.current);
        if (!myChart) {
            myChart = echarts.init(hotChartRef.current);
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
            }} ref={hotChartRef}/>
        </div>
    );
};

export default HotSearchHot;

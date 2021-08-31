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
            title: {
                text: '热度趋势'
            },
            tooltips: {
                trigger: 'axis',
            },
            dataset: {
                source: props.source,
            },
            xAxis: {
                type: 'time',
                position: 'top',
                axisPointer: {
                    label: {
                        show: true,
                    },
                },
            },
            yAxis: {
                position: 'left',
            },
            series: [
                {
                    type: 'line',
                    encode: {
                        x: 'time',
                        y: 'hot',
                    },
                    label: {
                        show: true,
                        position: 'bottom',
                    },
                },
            ],
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
        window.addEventListener("resize", handleResize);
        return function cleanup() {
            window.removeEventListener("resize", handleResize);
        }
    });

    return (
        <div>
            <div style={{
                width: "90%",
                height: 300,
                maxHeight: 500,
                margin: "auto",
            }} ref={hotChartRef}/>
        </div>
    );
};

export default HotSearchHot;

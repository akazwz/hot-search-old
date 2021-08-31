import React, {useEffect, useRef} from 'react';
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
            title: {
                text: '排行榜趋势'
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
                inverse: true,
            },
            series: [
                {
                    type: 'line',
                    encode: {
                        x: 'time',
                        y: 'rank',
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
        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
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
            }} ref={chartRef}/>
        </div>
    );
};

export default HotSearchRank;

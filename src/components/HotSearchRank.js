import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

const HotSearchRank = (props) => {
    const chartRef = useRef(null);

    const xArr = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    const yArr = [5, 20, 36, 10, 10, 20]
    const initOrUpdateEcharts = () => {
        let myChart = echarts.getInstanceByDom(chartRef.current);
        if (!myChart) {
            myChart = echarts.init(chartRef.current);
        }
        myChart.setOption({
            title: {
                text: 'React-Echarts'
            },
            tooltips: {},
            xAxis: {
                data: xArr,
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: yArr,
            }],
        });
    };

    const handleResize = () => {
        let chartInstance = echarts.getInstanceByDom(chartRef.current);
        chartInstance.resize();
    };

    useEffect(() => {
        initOrUpdateEcharts();
        window.addEventListener("resize", handleResize);
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

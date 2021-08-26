import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

const HotSearchRank = () => {
    const chartRef = useRef(null);
    const xArr = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    const yArr = [5, 20, 36, 10, 10, 20]
    let initEcharts;
    initEcharts = () => {
        const myChart = echarts.init(chartRef.current);
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

    useEffect(() => {
        initEcharts();
    });

    return (
        <div>
            <div style={{width: "90%", height: "300px"}} ref={chartRef}/>
        </div>
    );
};

export default HotSearchRank;

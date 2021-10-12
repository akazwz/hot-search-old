import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

// 热搜词云
const WordCloud = (props) => {
    let history = useHistory();
    const hotChartRef = useRef(null);
    const colors = [
        "#F24949",
        "#F26D6D",
        "#F29B9B",
        "#F07B3C",
        "#F28241",
        "#F86905",
        "#D97B04",
        "#EBA160",
        "#D97B04",
        "#D9A704",
        "#F0A511",
        "#E6B510",
        "#78F2FF",
        "#C3EBAC",
        "#7DB8FF",
        "#FFA691",
        "#FFA691",
        "#FFA691",
        "#FFA691",
        "#FFA691",
        "#FFA691",
        "#FFA691",
    ];
    const initOrUpdateEcharts = () => {
        let myChart = echarts.getInstanceByDom(hotChartRef.current);
        if (!myChart) {
            myChart = echarts.init(hotChartRef.current, null, {renderer: 'svg'});
        }
        myChart.on('click', (param) => {
            const {name} = param.data;
            history.push('/hot-search-data/' + name);
        });
        myChart.setOption({
            title: {},
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                maskImage: false,
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                right: null,
                bottom: null,
                sizeRange: [12, 37],
                rotationRange: [-70, 90],
                rotationStep: 30,
                gridSize: 7,
                drawOutOfBound: true,
                layoutAnimation: true,
                textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    color: function (params) {
                        console.log(params);
                        return colors[params.dataIndex];
                    }
                },
                emphasis: {
                    focus: 'self',
                    textStyle: {
                        textShadowBlur: 10,
                        textShadowColor: '#333'
                    }
                },
                data: props.data
            }]
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
                height: 350,
                maxHeight: 600,
                margin: 'auto',
            }} ref={hotChartRef} />
        </div>
    );
};

export default WordCloud;

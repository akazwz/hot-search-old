import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

// 热搜词云
const WordCloud = (props) => {
    const hotChartRef = useRef(null);
    const initOrUpdateEcharts = () => {
        let myChart = echarts.getInstanceByDom(hotChartRef.current);
        if (!myChart) {
            myChart = echarts.init(hotChartRef.current, null, {renderer: 'svg'});
        }
        myChart.on('click', (param) => {
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
                sizeRange: [15, 50],
                rotationRange: [-90, 90],
                rotationStep: 45,
                gridSize: 8,
                drawOutOfBound: false,
                layoutAnimation: true,
                textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
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

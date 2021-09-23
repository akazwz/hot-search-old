import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

// 热搜词云
const WordCloud = (props) => {
    const hotChartRef = useRef(null);
    const initOrUpdateEcharts = () => {
        let myChart = echarts.getInstanceByDom(hotChartRef.current);
        if (!myChart) {
            myChart = echarts.init(hotChartRef.current);
        }
        myChart.on('click', (param) => {
            alert(param.name);
        });
        myChart.setOption({
            title: {
                text: '词云',
            },
            series: [{
                type: 'wordCloud',

                // The shape of the "cloud" to draw. Can be any polar equation represented as a
                // callback function, or a keyword present. Available presents are circle (default),
                // cardioid (apple or heart shape curve, the most known polar equation), diamond (
                // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

                shape: 'circle',

                // A silhouette image which the white area will be excluded from drawing texts.
                // The shape option will continue to apply as the shape of the cloud to grow.

                maskImage: false,

                // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                // Default to be put in the center and has 75% x 80% size.

                left: 'center',
                top: 'center',
                width: '70%',
                height: '80%',
                right: null,
                bottom: null,

                // Text size range which the value in data will be mapped to.
                // Default to have minimum 12px and maximum 60px size.

                sizeRange: [12, 60],

                // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

                rotationRange: [-90, 90],
                rotationStep: 45,

                // size of the grid in pixels for marking the availability of the canvas
                // the larger the grid size, the bigger the gap between words.

                gridSize: 8,

                // set to true to allow word being draw partly outside of the canvas.
                // Allow word bigger than the size of the canvas to be drawn
                drawOutOfBound: false,

                // If perform layout animation.
                // NOTE disable it will lead to UI blocking when there is lots of words.
                layoutAnimation: true,

                // Global text style
                textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    // Color can be a callback function or a color string
                    color: function () {
                        // Random color
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

                // Data is an array. Each array item must have name and value property.
                data: [
                    {
                        name: 'ZWZ',
                        value: 1000,
                        // Style of single text
                        textStyle: {}
                    },
                    {
                        name: 'EDC',
                        value: 500,
                        // Style of single text
                        textStyle: {}
                    },
                    {
                        name: '赵文卓',
                        value: 366,
                        // Style of single text
                        textStyle: {}
                    }, {
                        name: 'zhaowenzhuo',
                        value: 366,
                        // Style of single text
                        textStyle: {}
                    },
                    {
                        name: 'wen',
                        value: 200,
                        // Style of single text
                        textStyle: {}
                    },
                    {
                        name: 'Farrah Abraham',
                        value: 366,
                        // Style of single text
                        textStyle: {}
                    },
                ]
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
                height: 300,
                maxHeight: 500,
                margin: 'auto',
            }} ref={hotChartRef} />
        </div>
    );
};

export default WordCloud;

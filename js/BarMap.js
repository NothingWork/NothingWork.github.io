var country = ['泰国', '菲律宾', '墨西哥', '斐济', '希腊', '毛里求斯', '哥伦比亚', '中国']
var dataForBarSpeed = []
var dataForBarPopulation = []
$.ajax({
    url: 'dataset/双柱状图DATA.csv',
    type: 'GET',
    async: true,
    success: function (testData) {
        var m = $.csv.toArrays(testData, {
            delimiter: ","
        })
        // console.log(m);
        for (let j = 0; j < m.length; j++) {
            dataForBarPopulation[j] = m[j][1];
            dataForBarSpeed[j] = m[j][2];
        }
        // console.log(m);
        // console.log(dataForBarPopulation)
        // console.log(dataForBarSpeed)

        const colors = ['#5470C6', '#91CC75'];

        var barMap = echarts.init(document.getElementById('barMap'));

        var optionForBarMap = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                left: '10%',
                right: '10%', // 将 Label 放在左侧
                bottom:'3%',
                containLabel: true
              },
            // toolbox: {
            //     feature: {
            //         dataView: { show: true, readOnly: false },
            //         restore: { show: true },
            //         saveAsImage: { show: true }
            //     }
            // },
            legend: {
                data: ['海拔低于5米人口百分比',' 平均海平面变化（毫米/年）' ]
            },
            
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    // prettier-ignore
                    data: country
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: ' 平均海平面变化（毫米/年）',
                    position: 'left',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} mm/yr'
                    }
                    
                },
                {
                    type: 'value',
                    name: '海拔低于5米人口百分比',
                    position: 'right',
                    alignTicks: true,
                    // offset: 80,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    splitLine: {
                        show:false
                     }
                }
            ],
            series: [
                {
                    name: '平均海平面变化（毫米/年）',
                    type: 'bar',
                    data: dataForBarSpeed
                },
                {
                    name: '海拔低于5米人口百分比',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: dataForBarPopulation
                }
            ]
        };
        barMap.setOption(optionForBarMap);
    }
});
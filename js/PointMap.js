var data = []
var year = []
var dataArr = []
var controlSize = []
$.ajax({
    url: 'dataset/散点图DATA.csv',
    type: 'GET',
    async: true,
    success: function (testData) {
        var m = $.csv.toArrays(testData, {
            delimiter: ","
        })
        // console.log(m);
        for (let i = 0; i < m.length; i++) {
            data[i] = m[i]
            // }
            // dataArr.push(data)
            // console.log(dataArr)
            var pointMap = echarts.init(document.getElementById('pointMap'));

            var optionForPointMap = {
                xAxis: {
                    type: 'value',
                    min: 1900,
                    max: 2020,
                    interval: 40,
                    axisLine:{
                        lineStyle:{
                            color:'#1b645d',//更改坐标轴颜色
                            width:1,
                        },
                    },
                    axisLabel: {
                        formatter: '{value}',
                        rotate: 30, // 设置标签旋转角度

                        textStyle: {
                            color: '#1b645d',  //更改坐标轴文字颜色
                            fontSize: 12      //更改坐标轴文字大小
                        }
                    },
                    

                },
                yAxis: {
                    type: 'value',
                    name:'千亿美元',
                    axisLine: { // 添加 axisLine 属性
                        lineStyle: {
                            color: '#1b645d', // 更改坐标轴颜色
                            width: 1,
                        },
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#1b645d',  //更改坐标轴文字颜色
                            fontSize: 12      //更改坐标轴文字大小
                        },
                    },
                    splitLine: {
                        lineStyle: { 
                            color: "#1b645d",//线条颜色
                        } 
                    },
                },
                grid:{
                    right:"5%",
                    left:"15%",
                    // containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: function(params) {
                    //     console.log("params"+params)
                    //     return params.name + '年<br/>' + params.value[1] + '千亿美元';
                    //     // 在 x 轴数据后面添加 '年' 字，例如：1970年
                    // }
                },
                // tooltip: {
                //     formatter: function (params) {
                //         var value = params.value;
                //         return params.seriesName + '<br/>' +
                //             params.name + ': ' + value[2].toLocaleString() + ' 千万元';
                //     }
                // },
                series: [
                    {
                        symbolSize: 10,
                        data: data,
                        type: 'scatter',
                        itemStyle: {
                            color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                                {
                                    offset: 0,
                                    color: '#32CD32'  // light green
                                },
                                {
                                    offset: 1,
                                    color: '#228B22'  // dark green
                                }
                            ])
                        }
                    }
                ]
            };
        };
        pointMap.setOption(optionForPointMap);
    }
});
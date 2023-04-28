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
                    interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                grid:{
                    right:"5%",
                    left:"35%",
                    // containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    
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
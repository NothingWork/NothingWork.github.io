var year = []
var data = []
$.ajax({
    url: './dataset/折线图DATA.csv',
    type: 'GET',
    async: true,
    success: function (testData) {
        var m = $.csv.toArrays(testData, {
            delimiter: ","
        })
        year = m[0]
        data = m[6]
        // console.log(m);
        var lineMap = echarts.init(document.getElementById('LineMap'));

        var optionForLineMap = {
            tooltip: {
                trigger: 'axis',
                formatter: 'Emission : <br/>{b}年 : {c}Mt'
            },
            grid: {
                left: '7%',
                right: '6%',
                bottom: '3%',
                top:'5%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    formatter: function (value, index) {
                        if (value >= 10000 && value < 10000000) {
                            value = value / 10000 + "万";
                        } else if (value >= 10000000) {
                            value = value / 10000000 + "千万";
                        }
                        return value;
                    }
                },
                axisLine: { 
                    onZero: false,
                    lineStyle:{
                        color:'#1b645d',
                    }
                },
            },
            yAxis: {
                type: 'category',
                axisLine: { 
                    onZero: false,
                    lineStyle:{
                        color:'#1b645d',
                    }
                },
                axisLabel: {
                    formatter: '{value}年'
                },
                boundaryGap: false,
                data: year
            },
            series: [
                {
                    name: 'Altitude (km) vs. Emission (°C)',
                    type: 'line',
                    symbolSize: 10,
                    symbol: 'circle',
                    smooth: true,
                    lineStyle: {
                        width: 3,
                        shadowColor: 'rgba(0,0,0,0.3)',
                        shadowBlur: 10,
                        shadowOffsetY: 8
                    },
                    data: data,
                    color:'#253d24',
                }
            ]
        };
        lineMap.setOption(optionForLineMap);
    }
});
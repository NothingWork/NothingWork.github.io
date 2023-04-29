
let yearValue = 0; // 初始化 yearValue 全局变量

var col = 0
const yearSliderInPage2 = document.getElementById("yearSliderInPage2");
const headerText = document.querySelector('#chinaMonthlyRainfall h4');
yearSliderInPage2.addEventListener("input", function () {
    yearValue = this.value;
    col = yearValue - 2000
    headerText.innerHTML = yearSliderInPage2.value + '年 ' + '中国月度总降水量';
    // headerText.textContent = `${yearValue}年中国月度总降水量`; // update the heading with the selected year
    setRainfallMap(col); // update the rainfall map with the selected year
    setParallelMap(col); // update the parallel map with the selected year
});

var data = []


function setRainfallMap() {
    var year = document.getElementById("yearSliderInPage2").value;
    if (year !== "") {
        // TODO: 根据选中的年份加载数据
        $.ajax({
            url: './dataset/RainfallDATA.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                // console.log(m);
                for (let j = 0; j < m.length; j++) {
                    data[j] = m[j][col];
                }
                var rainfallMap = echarts.init(document.getElementById('RainfallMap'));

                var optionForRainfallMap = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Rainfall'],
                        x: 'center',
                        y: '90%'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: false }
                        }
                    },
                    grid: {
                        right: "16%",
                        left: "13%"
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            // prettier-ignore
                            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                inside: false,
                                formatter: function (data, index) {
                                    if (data >= 10000 && data < 10000000) {
                                        data = data / 10000 + "万";
                                    } else if (data >= 10000000) {
                                        data = data / 10000000 + "千万";
                                    }
                                    return data;
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Rainfall',
                            type: 'bar',
                            itemStyle: {
                                color: '#1b645d'
                            },
                            data: data,
                            markPoint: {
                                data: [
                                    { type: 'max', name: 'Max',  itemStyle: { color: '#91cc75' } },
                                    { type: 'min', name: 'Min', itemStyle: { color: '#91cc75' }  }
                                ]
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Avg' }]
                            }
                        }
                    ]
                };
                rainfallMap.setOption(optionForRainfallMap);
            }
        });
    }

}
setRainfallMap();




//     var year = document.getElementById("yearSlider").value;
//     var gas = document.getElementById("gas-type").value;
//     // console.log(year);

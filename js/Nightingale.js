
var data = []
var value = []

yearSlider.addEventListener("input", function () {
    yearValue = this.value;
    col = 1952 - yearValue
    // console.log(yearValue)
});

gasSelect.addEventListener('change', function () {
    gasValue = this.value;
    // console.log(gasValue)
});

function setNightingaleMap() {
    var year = document.getElementById("yearSlider").value;
    var gas = document.getElementById("gas-type").value;
    if (year !== "") {
        // TODO: 根据选中的年份加载数据
        $.ajax({
            url: './dataset/南丁格尔玫瑰图DATA ' + gas + '.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                // console.log(m);
                for (let j = 0; j < m.length; j++) {
                    data[j] = m[j][2];
                    value[j] = m[j][col]
                }
                // console.log(source);
                // console.log(target);
                // console.log(value);

                var dataArr = [];
                for (let i = 0; i < m.length; i++) {
                    const nightingaleDataObj = {
                        value: value[i],
                        name: data[i]

                    };
                    dataArr.push(nightingaleDataObj);
                }




                var nightingaleMap = echarts.init(document.getElementById('NightingaleMap'));

                var optionForNightingaleMap = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        right: 'right',
                        top: 'center',
                        orient: 'vertical',
                        data: [
                            '总计',
                            '工业过程',
                            '农业',
                            '其他',
                            '能源',
                            '浪费'
                        ]
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: false }
                        }
                    },
                    series: [
                        {
                            name: 'Area Mode',
                            type: 'pie',
                            radius: [10, 60],
                            center: ['37%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 5
                            },
                            data: dataArr
                        }
                    ]
                };
                nightingaleMap.setOption(optionForNightingaleMap);
                window.addEventListener("resize", function () {
                    nightingaleMap.resize();
                });
            }
        });
    }

}





//     var year = document.getElementById("yearSlider").value;
//     var gas = document.getElementById("gas-type").value;
//     // console.log(year);

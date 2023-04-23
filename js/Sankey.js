
var source = []
var value = []
var target = []

yearSlider.addEventListener("input", function () {
    yearValue = this.value;
    col = 1952 - yearValue
    console.log(yearValue)
});


gasSelect.addEventListener('change', function () {
    gasValue = this.value;
    console.log(gasValue)
});
function setSankeyMap() {
    var year = document.getElementById("yearSlider").value;
    if (year !== "") {
        // TODO: 根据选中的年份加载数据
        $.ajax({
            url: './dataset/桑基图DATA.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                // console.log(m);
                for (let j = 0; j < m.length; j++) {
                    source[j] = m[j][3];
                    target[j] = m[j][2];
                    value[j] = m[j][col];
                }
                // console.log(source);
                // console.log(target);
                // console.log(value);

                var dataArr = [];
                for (let i = 0; i < m.length; i++) {
                    const sankeyDataObj = {
                        source: source[i],
                        target: target[i],
                        value: value[i]
                    };
                    dataArr.push(sankeyDataObj);
                }




                var sankeyMap = echarts.init(document.getElementById('SankeyMap'));

                var optionForSankeyMap = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [{
                        type: 'sankey',
                        layout: 'none',
                        emphasis: {
                            focus: 'adjacency'
                        },
                        data: [
                            {
                                name: 'SUM'
                            },
                            {
                                name: 'CO2'
                            },
                            {
                                name: 'CH4'
                            },
                            {
                                name: 'N2O'
                            },
                            {
                                name: 'F-Gas'
                            },
                            {
                                name: 'KYOTOGHG'
                            },
                            {
                                name: 'Total excluding LULUCF'
                            },
                            {
                                name: 'Agriculture'
                            },
                            {
                                name: 'Energy'
                            },
                            {
                                name: 'Other'
                            },
                            {
                                name: 'Industrial Processes and Product Use'
                            },
                            {
                                name: 'Waste'
                            }
                        ],
                        links: dataArr
                    }]
                };
                sankeyMap.setOption(optionForSankeyMap);
            }
        });
    }

}





//     var year = document.getElementById("yearSlider").value;
//     var gas = document.getElementById("gas-type").value;
//     // console.log(year);

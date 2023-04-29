
var source = []
var value = []
var target = []

yearSlider.addEventListener("input", function () {
    yearValue = this.value;
    col = 1952 - yearValue
    // console.log(yearValue)
});

const gasSelectForSankey = document.getElementById('gas-type');
gasSelectForSankey.addEventListener('change', function () {
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
                    color: ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#0074D9', '#B10DC9', '#F012BE', '#3D9970', '#39CCCC', '#01FF70', '#85144b', '#7FDBFF'],
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
                            { name: 'SUM', itemStyle: { color: '#f0f5e5' } },
                            { name: 'CO2', itemStyle: { color: '#2c9678' } },
                            { name: 'CH4', itemStyle: { color: '#d2d97a' } },
                            { name: 'N2O', itemStyle: { color: '#2ECC40' } },
                            { name: 'F-Gas', itemStyle: { color: '#0074D9' } },
                            { name: 'KYOTOGHG', itemStyle: { color: '#8cc269' } },
                            { name: 'Total excluding LULUCF', itemStyle: { color: '#1661ab' } },
                            { name: 'Agriculture', itemStyle: { color: '#61649f' } },
                            { name: 'Energy', itemStyle: { color: '#1c2938' } },
                            { name: 'Other', itemStyle: { color: '#01FF70' } },
                            { name: 'Industrial Processes and Product Use', itemStyle: { color: '#131124' } },
                            { name: 'Waste', itemStyle: { color: '#7FDBFF' } }
                        ],
                        links: dataArr,
                        lineStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    colorStops: [
                                        { offset: 0, color: '#FF4136' },
                                        { offset: 1, color: '#0074D9' }
                                    ]
                                },
                                curveness: 0.8
                            }
                        }
                    }]
                };
                sankeyMap.setOption(optionForSankeyMap);
            }
        });
    }

}
setSankeyMap();




//     var year = document.getElementById("yearSlider").value;
//     var gas = document.getElementById("gas-type").value;
//     // console.log(year);

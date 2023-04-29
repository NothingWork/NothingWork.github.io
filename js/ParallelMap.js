
// TODO: 根据选中的年份加载数据
var province = ['安徽', '澳门', '北京', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江', '重庆']
var datatemp = []
var datalist = []
yearSliderInPage2.addEventListener("input", function () {
    yearValue = this.value;
});
var schema = [
    { name: '1月', index: 0, text: '1月' },
    { name: '2月', index: 1, text: '2月' },
    { name: '3月', index: 2, text: '3月' },
    { name: '4月', index: 3, text: '4月' },
    { name: '5月', index: 4, text: '5月' },
    { name: '6月', index: 5, text: '6月' },
    { name: '7月', index: 6, text: '7月' },
    { name: '8月', index: 7, text: '8月' },
    { name: '9月', index: 8, text: '9月' },
    { name: '10月', index: 9, text: '10月' },
    { name: '11月', index: 10, text: '11月' },
    { name: '12月', index: 11, text: '12月' }
];
var lineStyle = {
    width: 3,
    opacity: 0.5
};
function setParallelMap() {
    var year = document.getElementById("yearSliderInPage2").value;
    // console.log(year)
    $.ajax({
        url: 'dataset/' + year + '年各省月度降水量.csv',
        type: 'GET',
        async: true,
        success: function (testData) {
            var m = $.csv.toArrays(testData, {
                delimiter: ","
            })
            // console.log(m);
            var temp = 0
            for (let j = 0; j < m.length; j++) {
                datatemp[temp] = m[j][3];
                temp++;
                if (temp == 12) {
                    temp = 0;
                    // console.log(datatemp);
                    datalist.push(datatemp);
                    // console.log(datalist); // 改动：每次打印datalist数组
                    datatemp = []; // 改动：清空datatemp数组，以便下次使用
                }
            }
            // console.log(datalist)
            var dataArr = [];
            for (let i = 0; i < province.length; i++) {
                const parellelDataObj = {
                    name: province[i],
                    type: 'parallel',
                    lineStyle: lineStyle,
                    data: [
                        datalist[i],
                    ]
                };
                dataArr.push(parellelDataObj);
            }
            // console.log(dataArr)
            var parallelMap = echarts.init(document.getElementById('ParallelMap'));
            var optionForParallelMap = {
                legend: {
                    type: 'scroll',
                    data: ['安徽', '澳门', '北京', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江', '重庆'],
                    textStyle: {
                        fontSize: 13,
                        color: '#333',
                    },
                    scrollable: true, // 增加滚动条
                },
                parallelAxis: [
                    { dim: 0, name: schema[0].text, nameLocation: 'end' },
                    { dim: 1, name: schema[1].text, nameLocation: 'end' },
                    { dim: 2, name: schema[2].text, nameLocation: 'end' },
                    { dim: 3, name: schema[3].text, nameLocation: 'end' },
                    { dim: 4, name: schema[4].text, nameLocation: 'end' },
                    { dim: 5, name: schema[5].text, nameLocation: 'end' },
                    { dim: 6, name: schema[6].text, nameLocation: 'end' },
                    { dim: 7, name: schema[7].text, nameLocation: 'end' },
                    { dim: 8, name: schema[8].text, nameLocation: 'end' },
                    { dim: 9, name: schema[9].text, nameLocation: 'end' },
                    { dim: 10, name: schema[10].text, nameLocation: 'end' },
                    { dim: 11, name: schema[11].text, nameLocation: 'end' }
                ],
                parallel: {
                    left: '3%',
                    right: '6%',
                    bottom: '6%',
                    top: '30%',
                    parallelAxisDefault: {
                        type: 'value',
                        name: '典型省份月度降水',
                        nameGap: 15,
                        nameTextStyle: {
                            color: 'black',
                            fontSize: 12,
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'black'
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#777'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            color: 'black',  // 修改文字颜色为黑色
                        }
                    }
                },
                series: dataArr
            };
            parallelMap.setOption(optionForParallelMap);
            datalist = []
        }
    });
}

setParallelMap();


//     var year = document.getElementById("yearSlider").value;
//     var gas = document.getElementById("gas-type").value;
//     // console.log(year);

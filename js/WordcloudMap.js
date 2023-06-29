
function setWordcloudMap() {
    disaster = []
    value = []
    var wordcloudMap = echarts3.init(document.getElementById('WordcloudMap'));
    $.ajax({
        url: './dataset/2020年全球每万人受灾害的人数.csv',
        type: 'GET',
        async: true,
        success: function (testData) {
            var m = $.csv.toArrays(testData, {
                delimiter: ","
            })
            for (let j = 0; j < m.length; j++) {
                disaster[j] = m[j][0]
                value[j] = m[j][2]
            }
            var dataArr = [];
            for (let i = 0; i < m.length; i++) {
                const wordcloudDataObj = {
                    name: disaster[i],
                    value: value[i]
                };
                dataArr.push(wordcloudDataObj);
            }

            var optionForWordcloudMap = {
                tooltip: {
                    show: true
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [{
                    name: '热点分析',
                    type: 'wordCloud',
                    size: ['50%', '70%'],
                    sizeRange: [20, 50],
                    //textRotation: [0, 45, 90, -45],
                    rotationRange: [0, 0],
                    //shape: 'circle',
                    textPadding: 1,
                    autoSize: {
                        enable: true,
                        minSize: 0
                    },
                    textStyle: {
                        normal: {
                            color: function (params) {
                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                var colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#0e94eb', '#c440ef', '#efb013', '#FFD700', '#8470FF', '#2e4af8', '#0eebc4', '#f129b1', '#17defc', '#f86363'];
                                if (params.dataIndex >= colorList.length) {
                                    index = params.dataIndex - colorList.length;
                                }
                                return colorList[params.dataIndex]
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: dataArr
                }]
            }
            // 使用刚指定的配置项和数据显示图表。
            wordcloudMap.setOption(optionForWordcloudMap);
            window.addEventListener("resize", function () {
                wordcloudMap.resize();
            });
        }
    })

}
setWordcloudMap()
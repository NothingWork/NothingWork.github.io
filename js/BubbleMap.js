var dataAll = [];
var dataCO2 = [];
var dataNO = [];
var dataCH4 = [];
var sixCountry = ['America', 'U.K.', 'China', 'India', 'Russia', 'Japan'];
var yearList = ['1990', '1991', '1992', '1993', '1994', '1995'];
// Define a function to process the CSV data
function processCSVData(csvData, gasType) {
    var dataArray = $.csv.toArrays(csvData, {
        delimiter: ","
    });
    for (var i = 0; i < sixCountry.length; i++) {
        var countryData = {
            name: sixCountry[i],
            children: []
        };
        for (var j = 0; j < yearList.length; j++) {
            var emissionValue = parseFloat(dataArray[i][j]);
            countryData.children.push({
                name: yearList[j],
                value: emissionValue
            });
        }
        if (gasType === 'CO2') {
            dataCO2.push(countryData);
        } else if (gasType === 'NO') {
            dataNO.push(countryData);
        } else if (gasType === 'CH4') {
            dataCH4.push(countryData);
        }
    }
}
// Read and process each CSV file using jQuery AJAX
$.when(
    $.ajax({
        url: './dataset/六国CO2排放量.csv',
        type: 'GET',
        async: true,
        success: function (csvData) {
            processCSVData(csvData, 'CO2');
        }
    }),
    $.ajax({
        url: './dataset/六国NO排放量.csv',
        type: 'GET',
        async: true,
        success: function (csvData) {
            processCSVData(csvData, 'NO');
        }
    }),
    $.ajax({
        url: './dataset/六国CH4排放量.csv',
        type: 'GET',
        async: true,
        success: function (csvData) {
            processCSVData(csvData, 'CH4');
        }
    })
).done(function () {
    // All CSV files have been processed, create the Sunburst chart
    dataAll = [
        {
            name: 'CO2',
            children: dataCO2
        },
        {
            name: 'NO',
            children: dataNO
        },
        {
            name: 'CH4',
            children: dataCH4
        }
    ];

    console.log("dataAll:" + dataAll);
    function getColorForCountry(countryName) {
        // Define a color mapping for each country
        const colorMap = {
            'America': 'red',
            'U.K.': 'blue',
            'China': 'green',
            'India': 'yellow',
            'Russia': 'black',
            'Japan': 'orange'
            // Add more countries and their corresponding colors here
        };

        // Check if the country exists in the color map
        if (colorMap.hasOwnProperty(countryName)) {
            return colorMap[countryName];
        }

        // If the country is not found in the color map, return a default color
        return 'gray';
    }
    var newData = [];
    var CO2 = [];
    var NO = [];
    var CH4 = [];

    for (let i = 0; i < dataCO2.length; i++) {
        var children = dataCO2[i].children;

        for (let j = 0; j < children.length; j++) {
            var emissionValue = children[j].value;
            var randomY = Math.random() * 100;
            var xDistance = j; // Assuming the x-axis value starts from 0 and increments by 1 for each child
            var xAxisValue = children[j].name;
            var country = dataCO2[i].name;
            var year = children[j].name;

            var entry = [emissionValue, randomY, xDistance, country + ' ' + year, xAxisValue];
            CO2.push(entry);
        }
    }
    newData.push(CO2);

    for (let i = 0; i < dataNO.length; i++) {
        var children = dataNO[i].children;

        for (let j = 0; j < children.length; j++) {
            var emissionValue = children[j].value;
            var randomY = Math.random() * 100;
            var xDistance = j; // Assuming the x-axis value starts from 0 and increments by 1 for each child
            var xAxisValue = children[j].name;
            var country = dataNO[i].name;
            var year = children[j].name;

            var entry = [emissionValue, randomY, xDistance, country + ' ' + year, xAxisValue];
            NO.push(entry);
        }
    }
    newData.push(NO);

    for (let i = 0; i < dataCH4.length; i++) {
        var children = dataCH4[i].children;

        for (let j = 0; j < children.length; j++) {
            var emissionValue = children[j].value;
            var randomY = Math.random() * 100;
            var xDistance = j; // Assuming the x-axis value starts from 0 and increments by 1 for each child
            var xAxisValue = children[j].name;
            var country = dataCH4[i].name;
            var year = children[j].name;

            var entry = [emissionValue, randomY, xDistance, country + ' ' + year, xAxisValue];
            CH4.push(entry);
        }
    }
    newData.push(CH4);

    console.log("newData:" + newData);

    // 创建气泡图实例
    var scatterChart = echarts.init(document.getElementById('BubbleMap'));

    // 设置气泡图的配置项
    option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
            {
                offset: 0,
                color: '#f7f8fa'
            },
            {
                offset: 1,
                color: '#cdd0d5'
            }
        ]),
        legend: {
            right: '10%',
            top: '3%',
            data: ['CO2', 'NO', 'CH4']
        },
        grid: {
            left: '8%',
            top: '10%'
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        },
        series: [
            {
                name: 'CO2',
                data: newData[0],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 10e-2;
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            var info = param.data[3]; // 获取包含国家和年份的字符串
                            var splitIndex = info.indexOf(' '); // 找到空格的位置
                            var country = info.slice(0, splitIndex); // 解析出国家部分
                            var year = info.slice(splitIndex + 1); // 解析出年份部分
                            return '{country:' + country + '}\n{year:' + year + '}\n{value:' + param.data[0] + 'Mt}'; // 设置标签的两行显示格式
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(251, 118, 123)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(204, 46, 72)'
                        }
                    ])
                }
            },
            {
                name: 'NO',
                data: newData[1],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 10e-2;
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            var info = param.data[3]; // 获取包含国家和年份的字符串
                            var splitIndex = info.indexOf(' '); // 找到空格的位置
                            var country = info.slice(0, splitIndex); // 解析出国家部分
                            var year = info.slice(splitIndex + 1); // 解析出年份部分
                            return '{country:' + country + '}\n{year:' + year + '}\n{value:' + param.data[0] + 'Mt}'; // 设置标签的两行显示格式
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(129, 227, 238)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(25, 183, 207)'
                        }
                    ])
                }
            }
            ,
            {
                name: 'CH4',
                data: newData[2],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 10e-2; // 修改气泡大小，调整除数的值可以控制气泡的大小
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            var info = param.data[3]; // 获取包含国家和年份的字符串
                            var splitIndex = info.indexOf(' '); // 找到空格的位置
                            var country = info.slice(0, splitIndex); // 解析出国家部分
                            var year = info.slice(splitIndex + 1); // 解析出年份部分
                            return '{country:' + country + '}\n{year:' + year + '}\n{value:' + param.data[0] + 'Mt}'; // 设置标签的两行显示格式
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 223, 0)' // 修改为黄色调的RGB值
                        },
                        {
                            offset: 1,
                            color: 'rgb(255, 185, 15)' // 修改为黄色调的RGB值
                        }
                    ])
                }
            }
        ]
    };

    // 使用配置项绘制气泡图
    scatterChart.setOption(option);
});
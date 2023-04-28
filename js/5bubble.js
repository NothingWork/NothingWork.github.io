

$.ajax({
    url: 'dataset/可再生能源发电量，不包括水电（占总发电量的比例）.csv',
    type: 'GET',
    async: true,
    success: function (testData) {
      var m = $.csv.toArrays(testData, {
          delimiter: ","
      })
      var US =[3.00 ,1.90 ,2.14 ,2.13 ,2.13 ,1.97 ,1.97 ,1.90 ,1.83 ,1.89 ,1.92 ,1.88 ,2.01 ,2.02 ,2.09 ]
      var China=[0.01 ,0.01 ,0.02 ,0.02 ,0.05 ,0.31 ,0.15 ,0.26 ,0.25 ,0.24 ,0.23 ,0.23 ,0.21 ,0.19 ,0.18 ]
      var UK = [0.19 ,0.22 ,0.30 ,0.44 ,0.57 ,0.61 ,0.66 ,0.80 ,0.98 ,1.17 ,1.30 ,1.44 ,1.65 ,1.87 ,2.38 ]


         // 数据
    var data_world = [1.31, 1.03, 1.13, 1.14, 1.18, 1.18, 1.18, 1.22, 1.25, 1.32, 1.40, 1.44, 1.56, 1.65, 1.80];
    var data_usa = [3.00, 1.90, 2.14, 2.13, 2.13, 1.97, 1.97, 1.90, 1.83, 1.89, 1.92, 1.88, 2.01, 2.02, 2.09];
    var data_uk = [0.19, 0.22, 0.30, 0.44, 0.57, 0.61, 0.66, 0.80, 0.98, 1.17, 1.30, 1.44, 1.65, 1.87, 2.38];
    var data_china = [0.01, 0.01, 0.02, 0.02, 0.05, 0.31, 0.15, 0.26, 0.25, 0.24, 0.23, 0.23, 0.21, 0.19, 0.18];


    var myChart2 = echarts.init(document.getElementById('bubbleEnergy'));

        
    // 石油、天然气和煤炭能源的发电量数据
    var world_data = [64.05, 64.58, 65.79, 65.46, 65.72, 66.05, 67.17, 66.79, 66.08, 66.28, 66.96, 66.79, 66.28, 65.60, 65.20];
    var usa_data = [72.20, 70.99, 71.29, 71.39, 72.10, 71.33, 71.97, 71.39, 69.45, 70.28, 68.42, 68.86, 67.82, 67.46, 67.08];
    var uk_data = [73.28, 73.52, 74.17, 75.39, 74.43, 75.61, 78.46, 80.22, 74.23, 76.38, 71.07, 68.47, 64.59, 60.97, 53.18];
    var china_data = [79.86, 80.86, 82.69, 81.49, 81.70, 82.49, 82.84, 80.29, 80.25, 79.40, 81.17, 77.86, 77.42, 74.82, 72.96];

    // 年份
    var years = Array.from(Array(15).keys()).map(function(item) {
      return item + 1990;
    });

    // 图表数据
    var data = [
      {
        name: '世界',
        data: world_data
      },
      {
        name: '美国',
        data: data_usa
      },
      {
        name: '英国',
        data: data_uk
      },
      {
        name: '中国',
        data: data_china
      }
    ];
    // 图表数据
    var data2 = [
      {
        name: '世界',
        data: data_world
      },
      {
        name: '美国',
        data: usa_data
      },
      {
        name: '英国',
        data: uk_data
      },
      {
        name: '中国',
        data: china_data
      }
    ];

    // 图表配置
    var option = {
      // title: {
      //   // text: '石油、天然气和煤炭能源的发电量占比',
      //   // subtext: '数据来源：世界银行',
      //   left: 'center'
      // },
      // legend: {
      //   data: ['世界', '美国', '英国', '中国'],
      //   top: 30,
      //   left: 10
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '10%',
        left: '8%',
        right: '2%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: years,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        name: '%'
      },
      series: data.map(function(item) {
        return {
          name: item.name,
          type: 'line',
          data: item.data.map(function(value) {
            return value.toFixed(2);
          })
        };
      }),
      // series: data.map(function(item) {
      //   return {
      //     name: item.name,
      //     type: 'line',
      //     data: item.data.map(function(value) {
      //       return value.toFixed(2);
      //     })
      //   };
      // })
    };
    option.series = option.series.concat(data2.map(function(item) {
      return {
        name: item.name,
        type: 'line',
        data: item.data.map(function(value) {
          return value.toFixed(2);
        })
      };
    }));
    // 初始化图表
    myChart2.setOption(option);



    

// // 可再生能源
// var data_world = [1.31, 1.03, 1.13, 1.14, 1.18, 1.18, 1.18, 1.22, 1.25, 1.32, 1.40, 1.44, 1.56, 1.65, 1.80];
// var data_usa = [3.00, 1.90, 2.14, 2.13, 2.13, 1.97, 1.97, 1.90, 1.83, 1.89, 1.92, 1.88, 2.01, 2.02, 2.09];
// var data_uk = [0.19, 0.22, 0.30, 0.44, 0.57, 0.61, 0.66, 0.80, 0.98, 1.17, 1.30, 1.44, 1.65, 1.87, 2.38];
// var data_china = [0.01, 0.01, 0.02, 0.02, 0.05, 0.31, 0.15, 0.26, 0.25, 0.24, 0.23, 0.23, 0.21, 0.19, 0.18];
// // 石油能源
// var world_data = [64.05, 64.58, 65.79, 65.46, 65.72, 66.05, 67.17, 66.79, 66.08, 66.28, 66.96, 66.79, 66.28, 65.60, 65.20];
// var usa_data = [72.20, 70.99, 71.29, 71.39, 72.10, 71.33, 71.97, 71.39, 69.45, 70.28, 68.42, 68.86, 67.82, 67.46, 67.08];
// var uk_data = [73.28, 73.52, 74.17, 75.39, 74.43, 75.61, 78.46, 80.22, 74.23, 76.38, 71.07, 68.47, 64.59, 60.97, 53.18];
// var china_data = [79.86, 80.86, 82.69, 81.49, 81.70, 82.49, 82.84, 80.29, 80.25, 79.40, 81.17, 77.86, 77.42, 74.82, 72.96];

// var option = {
//   tooltip: {},
//   grid: {
//     left: '6%',
//     right: '6%',
//     top: '6%',
//     bottom: '6%',
//     containLabel: true
//   },
//   legend: {
//     data: ['World', 'USA', 'UK', 'China'],
//     bottom: 0,
//     left: 'center'
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: true,
//     data: ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
//   },
//   yAxis: [
//     {
//       name: 'Renewable',
//       gridIndex: 0,
//       axisLabel: {
//         formatter: '{value} %'
//       },
//       splitLine: {
//         show: false
//       }
//     },
//     {
//       name: 'Oil',
//       nameLocation: 'start',
//       nameGap: 10,
//       gridIndex: 1,
//       axisLabel: {
//         formatter: '{value} %'
//       },
//       splitLine: {
//         show: false
//       }
//     }
//   ],
//   series: [
//     {
//       name: 'World',
//       type: 'scatter',
//       symbolSize: function (data) {
//         return Math.sqrt(data[2]) * 5;
//       },
//       data: [
//         [0, data_world[0], 2006],
//         [1, data_world[1], 2007],
//         [2, data_world[2], 2008],
//         [3, data_world[3], 2009],
//         [4, data_world[4], 2010],
//         [5, data_world[5], 2011],
//         [6, data_world[6], 2012],
//         [7, data_world[7], 2013],
//         [8, data_world[8], 2014],
//         [9, data_world[9], 2015],
//         [10, data_world[10], 2016],
//         [11, data_world[11], 2017],
//         [12, data_world[12], 2018],
//         [13, data_world[13], 2019],
//         [14, data_world[14], 2020],
//       ],
//       xAxisIndex: 0,
//       yAxisIndex: 0,
//       itemStyle: {
//         color: '#9ACD32'
//       }
//     },
//     {
//       name: 'USA',
//       type: 'scatter',
//       symbolSize: function (data) {
//         return Math.sqrt(data[2]) * 5;
//       },
//       data: [
//         [0, data_usa[0], 2006],
//         [1, data_usa[1], 2007],
//         [2, data_usa[2], 2008],
//         [3, data_usa[3], 2009],
//         [4, data_usa[4], 2010],
//         [5, data_usa[5], 2011],
//         [6, data_usa[6], 2012],
//         [7, data_usa[7], 2013],
//         [8, data_usa[8], 2014],
//         [9, data_usa[9], 2015],
//         [10, data_usa[10], 2016],
//         [11, data_usa[11], 2017],
//         [12, data_usa[12], 2018],
//         [13, data_usa[13], 2019],
//         [14, data_usa[14], 2020]
//       ],
//       xAxisIndex: 0,
//       yAxisIndex: 0,
//       itemStyle: {
//         color: '#FF6347'
//       }
//     },
//     {
//       name: 'UK',
//       type: 'scatter',
//       symbolSize: function (data) {
//         return Math.sqrt(data[2]) * 5;
//       },
//       data: [
//         [0, data_uk[0], 2006],
//         [1, data_uk[1], 2007],
//         [2, data_uk[2], 2008],
//         [3, data_uk[3], 2009],
//         [4, data_uk[4], 2010],
//         [5, data_uk[5], 2011],
//         [6, data_uk[6], 2012],
//         [7, data_uk[7], 2013],
//         [8, data_uk[8], 2014],
//         [9, data_uk[9], 2015],
//         [10, data_uk[10], 2016],
//         [11, data_uk[11], 2017],
//         [12, data_uk[12], 2018],
//         [13, data_uk[13], 2019],
//         [14, data_uk[14], 2020]
//       ],
//       xAxisIndex: 0,
//       yAxisIndex: 0,
//       itemStyle: {
//         color: '#00BFFF'
//       }
//     },
//     {
//       name: 'China',
//       type: 'scatter',
//       symbolSize: function (data) {
//         return Math.sqrt(data[2]) * 5;
//       },
//       data: [
//         [0, data_china[0], 2006],
//         [1, data_china[1], 2007],
//         [2, data_china[2], 2008],
//         [3, data_china[3], 2009],
//         [4, data_china[4], 2010],
//         [5, data_china[5], 2011],
//         [6, data_china[6], 2012],
//         [7, data_china[7], 2013],
//         [8, data_china[8], 2014],
//         [9, data_china[9], 2015],
//         [10, data_china[10], 2016],
//         [11, data_china[11], 2017],
//         [12, data_china[12], 2018],
//         [13, data_china[13], 2019],
//         [14, data_china[14], 2020]
//       ],
//       xAxisIndex: 0,
//       yAxisIndex: 0,
//       itemStyle: {
//         color: '#FFA500'
//       }
//     },
//     {
//       name: 'World',
//       type: 'scatter',
//       symbolSize: function (data) {
//         return Math.sqrt(data[2]) * 5;
//       },
//       data: [
//         [0, world_data[0], 2006],
//         [1, world_data[1], 2007],
//         [2, world_data[2], 2008],
//         [3, world_data[3], 2009],
//         [4, world_data[4], 2010],
//         [5, world_data[5], 2011],
//         [6, world_data[6], 2012],
//         [7, world_data[7], 2013],
//         [8, world_data[8], 2014],
//         [9, world_data[9], 2015],
//         [10, world_data[10], 2016],
//         [11, world_data[11], 2017],
//         [12, world_data[12], 2018],
//         [13, world_data[13], 2019],
//         [14, world_data[14], 2020],
//       ],
//       xAxisIndex: 0,
//       yAxisIndex: 1,
//       itemStyle: {
//         color: '#9ACD32'
//       }
//     },
//     {
//       name: 'USA',
//       type: 'scatter',
//       symbolSize: function (data) {
//         return Math.sqrt(data[2]) * 5;
//       },
//       data: [
//         [0, data_usa[0], 2006],
//         [1, data_usa[1], 2007],
//         [2, data_usa[2], 2008],
//         [3, data_usa[3], 2009],
//         [4, data_usa[4], 2010],
//         [5, data_usa[5], 2011],
//         [6, data_usa[6], 2012],
//         [7, data_usa[7], 2013],
//         [8, data_usa[8], 2014],
//         [9, data_usa[9], 2015],
//         [10, data_usa[10], 2016],
//         [11, data_usa[11], 2017],
//         [12, data_usa[12], 2018],
//         [13, data_usa[13], 2019],
//         [14, data_usa[14], 2020]
//       ],
//       xAxisIndex: 0,
//       yAxisIndex: 0,
//       itemStyle: {
//         color: '#FF6347'
//       }
//     },
//     {
//       name: 'UK',
//       type: 'scatter',
//       symbolSize: function (data) {
//         return Math.sqrt(data[2]) * 5;
//       },




//     // 转换数据格式
//     var years = Array.from(Array(15).keys()).map(item => item + 1990);
//     var scatter_data = [];
//     for (var i = 0; i < years.length; i++) {
//       var world_val = (100 - data_world[i]) * 100;
//       var usa_val = (100 - data_usa[i]) * 100;
//       var uk_val = (100 - data_uk[i]) * 100;
//       var china_val = (100 - data_china[i]) * 100;
//       scatter_data.push([years[i], world_val, data_world[i].toFixed(2)]);
//       scatter_data.push([years[i], usa_val, data_usa[i].toFixed(2)]);
//       scatter_data.push([years[i], uk_val, data_uk[i].toFixed(2)]);
//       scatter_data.push([years[i], china_val, data_china[i].toFixed(2)]);
//     }


//     var myChart1 = echarts.init(document.getElementById('bubbleEnergy'));
// // 指定图表的配置项和数据
// var option = {
//   tooltip: {},
//   legend: {
//       data: ['可再生能源', '石油能源']
//   },
//   xAxis: {
//       type: 'category',
//       name: '年份',
//       boundaryGap: false,
//       data: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
//   },
//   yAxis: {
//       type: 'value',
//       name: '数据类型'
//   },
//   series: [
//       {
//           name: '可再生能源',
//           type: 'scatter',
//           symbolSize: function (data) {
//               return Math.sqrt(data[2]*10);
//           },
//           data: [
//               [2006,0,1.31], [2007,0,1.03], [2008,0,1.13], [2009,0,1.14], [2010,0,1.18], [2011,0,1.18], [2012,0,1.18], [2013,0,1.22], [2014,0,1.25], [2015,0,1.32], [2016,0,1.40], [2017,0,1.44], [2018,0,1.56], [2019,0,1.65], [2020,0,1.80]
//           ],
//           emphasis: {
//               label: {
//                   show: true,
//                   formatter: function (param) {
//                       return param.data[2];
//                   },
//                   position: 'top'
//               }
//           }
//       },
//       {
//           name: '石油能源',
//           type: 'scatter',
//           symbolSize: function (data) {
//               return Math.sqrt(data[2]*10);
//           },
//           data: [
//               [2006,1,64.05], [2007,1,64.58], [2008,1,65.79], [2009,1,65.46], [2010,1,65.72], [2011,1,66.05], [2012,1,67.17], [2013,1,66.79], [2014,1,66.08], [2015,1,66.28], [2016,1,66.96], [2017,1,66.79], [2018,1,66.28], [2019,1,65.60], [2020,1,65.20]
//           ],
//           emphasis: {
//               label: {
//                   show: true,
//                   formatter: function (param) {
//                       return param.data[2];
//                   },
//                   position: 'top'
//               }
//           }
//       }
//   ]
// };

// // 使用刚指定的配置项和数据显示图表。
// myChart1.setOption(option);









    //     // 指定图表的配置项和数据
    // var option = {
    //   tooltip: {},
    //   legend: {
    //       data: ['可再生能源', '石油能源']
    //   },
    //   xAxis: {
    //       type: 'category',
    //       name: '年份',
    //       boundaryGap: false,
    //       data: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    //   },
    //   yAxis: {
    //       type: 'value',
    //       name: '数据类型'
    //   },
    //   series: [
    //       {
    //           name: '可再生能源',
    //           type: 'scatter',
    //           symbolSize: function (data) {
    //               return Math.sqrt(data[2]*10);
    //           },
    //           data: [
    //               [2006,0,1.31], [2007,0,1.03], [2008,0,1.13], [2009,0,1.14], [2010,0,1.18], [2011,0,1.18], [2012,0,1.18], [2013,0,1.22], [2014,0,1.25], [2015,0,1.32], [2016,0,1.40], [2017,0,1.44], [2018,0,1.56], [2019,0,1.65], [2020,0,1.80]
    //           ],
    //           emphasis: {
    //               label: {
    //                   show: true,
    //                   formatter: function (param) {
    //                       return param.data[2];
    //                   },
    //                   position: 'top'
    //               }
    //           }
    //       },
    //       {
    //           name: '石油能源',
    //           type: 'scatter',
    //           symbolSize: function (data) {
    //               return Math.sqrt(data[2]*10);
    //           },
    //           data: [
    //               [2006,1,64.05], [2007,1,64.58], [2008,1,65.79], [2009,1,65.46], [2010,1,65.72], [2011,1,66.05], [2012,1,67.17], [2013,1,66.79], [2014,1,66.08], [2015,1,66.28], [2016,1,66.96], [2017,1,66.79], [2018,1,66.28], [2019,1,65.60], [2020,1,65.20]
    //           ],
    //           emphasis: {
    //               label: {
    //                   show: true,
    //                   formatter: function (param) {
    //                       return param.data[2];
    //                   },
    //                   position: 'top'
    //               }
    //           }
    //       }
    //   ]
    // };

    // // 使用刚指定的配置项和数据显示图表。
    // myChart1.setOption(option);





    // // 图表配置
    // var option = {
    //   title: {
    //     text: '能源消费情况',
    //     subtext: '可再生能源和石油能源(1990~2004)',
    //     left: 'center'
    //   },
    //   legend: {
    //     data: ['world', 'usa', 'uk', 'china']
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     showDelay: 0,
    //     axisPointer: {
    //         show: true,
    //         type: 'cross'
    //     }
    //   },
    //   xAxis: [
    //     {
    //       type: 'value',
    //       name: '年份',
    //       nameLocation: 'middle',
    //       nameGap: 25,
    //       min: 1990,
    //       max: 2004
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value',
    //       name: '数据种类',
    //       nameLocation: 'middle',
    //       nameGap: 50,
    //       scale: true,
    //       min: 0
    //     }
    //   ],
    //   series: [
    //     {
    //       name: 'world',
    //       type: 'scatter',
    //       data: scatter_data.filter(function(item) { return item[2] == data_world[item[0] - 1990].toFixed(2); })
    //     },
    //     {
    //       name: 'usa',
    //       type: 'scatter',
    //       data: scatter_data.filter(function(item) { return item[2] == data_usa[item[0] - 1990].toFixed(2); })
    //     },
    //     {
    //       name: 'uk',
    //       type: 'scatter',
    //       data: scatter_data.filter(function(item) { return item[2] == data_uk[item[0] - 1990].toFixed(2); })
    //     },
    //     {
    //       name: 'china',
    //       type: 'scatter',
    //       data: scatter_data.filter(function(item) { return item[2] == data_china[item[0] - 1990].toFixed(2); })
    //     }
    //   ]
    // };

    // // 初始化图表

    // myChart1.setOption(option);

    }
})
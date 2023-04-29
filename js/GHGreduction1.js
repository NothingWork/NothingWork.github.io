// resp.setHeader("Content-Type", "image/png");
// resp.setHeader("X-Content-Type-Options", "nosniff");
// response.addHeader("X-Content-Type-Options","nosniff");
// X-Content-Type-Options: nosniff

// var http = require('http');
// http.createServer(function (request, response) { 
//   // response.writeHead(200, {'Content-Type': 'text/plain'}); 
//   response.addHeader("X-Content-Type-Options","nosniff");

//     // HTTP Response 头部 response.end('Hello World\n'); 
//     // 返回数据 “Hello World”}).listen(8888); 
//  })
//1990-2004年

var year1 = [];
// var renewableEnergy =[];//可再生能源发电量占总发电量的比例
var renewableEnergy = [
  [], // 这里是定义空数组，后面的 7 个元素可以在循环中添加
  [], 
  [], 
  [], 
  [], 
  [], 
  []
];

// var Energy2 = [];//石油、天然气和煤炭能源的发电量占总发电量的比例
var Energy2 = [
  [], // 这里是定义空数组，后面的 7 个元素可以在循环中添加
  [], 
  [], 
  [], 
  [], 
  [], 
  []
];
var Energy3 = [
  [], 
  [], 
  [], 
  [], 
  [], 
  [], 
  []
];
var dataArr_World=[]

$.ajax({
  url: './dataset/可再生能源发电量，不包括水电（占总发电量的比例）.csv',
  type: 'GET',
  async: true,
  success: function (testData) {
    var m = $.csv.toArrays(testData, {
        delimiter: ","
    })
    var index1 = 0;
    for(var i = 0;i<m[0].length;i++){
      // console.log(i)
      if(i>=5){
        year1[index1] = (m[0][i]);
        index1++;
      }
    }
    // console.log("m.length"+ m.length);

    for(var i =4;i<m[0].length;i++){
      renewableEnergy[0][i-4]=m[1][i];
      renewableEnergy[1][i-4]=m[2][i];
      renewableEnergy[2][i-4]=m[3][i];
      renewableEnergy[3][i-4]=m[4][i];
      renewableEnergy[4][i-4]=m[5][i];
      renewableEnergy[5][i-4]=m[6][i];
      renewableEnergy[6][i-4]=m[7][i];

    }
    console.log("renewableEnergy "+ renewableEnergy);
  }
})
$.ajax({
  url: './dataset/石油、天然气和煤炭能源的发电量（占总发电量的比例）.csv',
  type: 'GET',
  async: true,
  success: function (testData) {
    var m = $.csv.toArrays(testData, {
        delimiter: ","
    })
    var index1 = 0;
    for(var i =4;i<m[0].length;i++){
      Energy2[0][i-4]=m[1][i];
      Energy2[1][i-4]=m[2][i];
      Energy2[2][i-4]=m[3][i];
      Energy2[3][i-4]=m[4][i];
      Energy2[4][i-4]=m[5][i];
      Energy2[5][i-4]=m[6][i];
      Energy2[6][i-4]=m[7][i];

    }
    console.log("Energy2 "+ Energy2);
    for(var i =0;i<Energy2[0].length;i++){
      Energy3[0][i]=100-Energy2[0][i]-renewableEnergy[0][i];
      Energy3[1][i]=100-Energy2[1][i]-renewableEnergy[1][i];
      Energy3[2][i]=100-Energy2[2][i]-renewableEnergy[2][i];
      Energy3[3][i]=100-Energy2[3][i]-renewableEnergy[3][i];
      Energy3[4][i]=100-Energy2[4][i]-renewableEnergy[4][i];
      Energy3[5][i]=100-Energy2[5][i]-renewableEnergy[5][i];
      Energy3[6][i]=100-Energy2[6][i]-renewableEnergy[6][i];
    }
    for(var i = 0;i<Energy3.length;i++){
      for(var j =0;j<Energy3[0].length;j++){
        Energy3[i][j] = parseFloat(Energy3[i][j].toFixed(2));
      }
    }
    console.log("Energy3 "+ Energy3);
    var dataArr = [];
      for (let i = 0; i < Energy2[0].length; i++) {
        dataArr_World.push([// 对象格式，包含三种数据
          {name:'可再生能源发电量占比',value: renewableEnergy[0][i], },// 每年全世界的三种数据
          {name:'石油、天然气、煤炭能源发电量占比',value: Energy2[0][i],},
          {name:'其他能源发电量占比',value: Energy3[0][i]}
      ]);
      }
      console.log("dataArr_World "+ dataArr_World);



    const pieSeries = year1.map(function (item, index) {
      return {
        type: 'pie',
        id: 'pie-' + index,
        center: item[0],
        radius: 30,
        coordinateSystem: 'calendar',
        label: {
          formatter: '{c}',
          position: 'inside'
        },
        data: dataArr_World
      };
    });


    const data = [];
    for (let time = 0; time < Energy2[0].length; time ++) {
      data.push([
        year1[time],
        Math.floor(Math.random() * 10000)
      ]);
    }
    const pieSeries2 = data.map(function (item, index) {
      return {
        type: 'pie',
        id: 'pie-' + index,
        center: item[0],
        radius: pieRadius,
        coordinateSystem: 'calendar',
        label: {
          formatter: '{c}',
          position: 'inside'
        },
        data: dataArr_World
      };
    });
    console.log("pieSeries2:"+pieSeries2);

    console.log("Energy2[0]:"+Energy2[0])
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('powerChart'));

    // 定义所有扇形图系列的配置
    var series = [];

    // 使用循环生成每一年的扇形图系列配置
    for (var i = 0; i < Energy2[0].length; i++) {
      var yearData = dataArr_World[i]; // 获取当前年份的数据
      // 定义当前年份的扇形图系列配置
      var seriesOption = {
        name: year1[i],
        type: 'pie',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        // radius: 30,
        center: ['25%', '50%'],
        radius: ['30%', '55%'],
        label: {
          show: false,
        },
        data: yearData
      };

      series.push(seriesOption); // 将当前年份的配置添加到数组中
    }

    // 定义日历坐标系的配置
    var calendarOption = {
      tooltip: {
        formatter: '{c} ({d}%)'
      },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        // width :'auto',
        
        cellSize:  [40, 40],
        yearLabel: {
          show: false,
          fontSize: 8
        },
        monthLabel: {
          show: false
        },
        dayLabel: {
          margin: 20,
          firstDay: 1,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        range: 1990
        // range: ['2017-01']
      },
      // series: series,
      series: [
        {
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0,
          
          data: year1
        },
      ...pieSeries
      ]
    };

    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(calendarOption);




    // // 定义数据数组
    // var data = [
    //   // 2010 年的三种数据
    //   [
    //     { value: 25, name: '数据1' },
    //     { value: 50, name: '数据2' },
    //     { value: 75, name: '数据3' }
    //   ],
    //   // 2011 年的三种数据
    //   // ...
    //   // 2024 年的三种数据
    //   [
    //     { value: 10, name: '数据1' },
    //     { value: 20, name: '数据2' },
    //     { value: 30, name: '数据3' }
    //   ]
    // ];






    // // 配置日历饼图 calendar
    // var calendar = {
    //   top: 'middle', // 日历面板距容器顶部的距离
    //   left: 'center', // 日历面板距容器左侧的距离
    //   range: ['2010', '2024'], // 日历的时间范围
    //   cellSize: 60, // 日历单元格大小，可接受数字/百分比数组
    //   itemStyle: {
    //     borderWidth: 0.5, // 边框宽度
    //     borderColor: '#ccc' // 边框颜色
    //   },
    //   yearLabel: { // 年份标签
    //     formatter: '{start}',
    //     show: true // 是否显示
    //   }
    // };

    // // 配置 ECharts 图表的样式和数据
    // var option = {
    //   // 将多个图表绑定到同一个日历上
    //   // calendar: calendar,
    //   calendar: {
    //     top: 'middle',
    //     left: 'center',
    //     orient: 'vertical',
    //     cellSize:  [80, 80],
    //     yearLabel: {
    //       show: false,
    //       fontSize: 30
    //     },
    //     // dayLabel: {
    //     //   margin: 20,
    //     //   firstDay: 1,
    //     //   nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //     // },
    //     monthLabel: {
    //       show: false
    //     },
    //     range: 1990
    //   },
    //   legend: {
    //     data: ['可再生能源发电量占比', '石油、天然气、煤炭能源发电量占比', '其他能源发电量占比'],
    //     bottom: 20
    //   },
    //   // 配置多个饼图系列
    //   series: [
    //     {
    //       type: 'pie',
    //       // type: 'scatter',
    //       coordinateSystem: 'calendar',
    //       symbolSize: 0,
    //       // data: dataArr_World[0], // 显示 2010 年的数据
    //       center: ['25%', '50%'], // 第一个饼图位置
    //       radius: ['35%', '50%'], // 第一个饼图半径大小
    //       label: { // 饼图系列配置中的文字标签
    //         show: false,
    //       },
    //       data:dataArr_World
    //     // },
    //     // // 更多的饼图系列
    //     // {
    //     //   type: 'pie',
    //     //   data: dataArr_World[1], // 显示 2011 年的数据
    //     //   center: ['50%', '50%'], // 第二个饼图位置
    //     //   radius: ['35%', '50%'], // 第二个饼图半径大小
    //     //   label: { // 饼图系列配置中的文字标签
    //     //     show: false,
    //     //   }
    //     // },
    //     // {
    //     //   type: 'pie',
    //     //   data: dataArr_World[2], // 显示 2012 年的数据
    //     //   center: ['75%', '50%'], // 第三个饼图位置
    //     //   radius: ['35%', '50%'], // 第三个饼图半径大小
    //     //   label: { // 饼图系列配置中的文字标签
    //     //     show: false,
    //     //   }
    //     },
    //     // 更多的饼图系列
    //     ...pieSeries
    //   ]
    // };

    // // 使用刚指定的配置项和数据显示图表
    // myChart.setOption(option);


  }
})

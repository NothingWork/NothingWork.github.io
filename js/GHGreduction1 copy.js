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

    

    // 基于准备好的dom，初始化echarts实例
    var myChartPie = echarts.init(document.getElementById('powerChart'));

    // 定义数据数组，保存每年的数据
    var dataArr = [
      [1.31, 64.05, 34.64],
      [1.03, 64.58, 35.39],
      [1.13, 65.79, 34.08],
      [1.14, 65.46, 34.40],
      [1.18, 65.72, 33.98],
      [1.18, 66.05, 33.77],
      [1.18, 67.17, 31.66],
      [1.22, 66.79, 32.99],
      [1.25, 66.08, 32.67],
      [1.32, 66.28, 32.40],
      [1.40, 66.96, 31.82],
      [1.44, 66.79, 31.57],
      [1.56, 66.28, 32.16],
      [1.65, 65.60, 32.75],
      [1.80, 65.20, 33.60]
    ];


    var years = [
      '1990',
      '1991',
      '1992',
      '1993',
      '1994',
      '1995',
      '1996',
      '1997',
      '1998',
      '1999',
      '2000',
      '2001',
      '2002',
      '2003',
      '2004'
    ];
    const cellSize = [100, 100];
    const pieRadius = 40;
    function getVirtualData() {
      const date = +echarts.time.parse('2017-02-01');
      const end = +echarts.time.parse('2017-02-15');
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false)
          // Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }
    
    const scatterData = getVirtualData();
    const pieSeries = scatterData.map(function (item, index) {
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
        data: dataArr[index+1]
      };
    });
    option = {
      tooltip: {},
      // grid: {
      //   left: 1000,
      //   right: 2000,
      //   top: 3000,
      //   bottom: 3000
      // },
      width: 300,  // 画布宽度为 800 像素
      height: 200, 
      backgroundColor:'#e7e7e9',
      legend: {
        show:true,
        data: ['可再生能源', '石油、天然气和煤炭能源', '其他能源'],
        bottom:500,
        left:'center',
        // padding: [30, 20, 20, 30], // 顺序为 上右下左
      },
      // toolbox:{
      //   show: true,
      //   feature: {
      //     dataView: { readOnly: false },
      //   }
      // },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: cellSize,
        yearLabel: {
          show: false,
          fontSize: 30
        },
        dayLabel: {
          margin: 20,
          firstDay: 3,
          nameMap: ['', '', '', '', '', '', '', '']
        },
        monthLabel: {
          show: false
        },
        range: ['2017-02']
      },
      series: [
        {
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0,
          label: {
            show: true,
            formatter: function (params) {
              return years[echarts.time.format(params.value[0], '{d}', false)];
            },
            // offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
            fontSize: 14
          },
          data: scatterData,
        },
        ...pieSeries
      ]
    };
    
    myChartPie.setOption(option);

  }
})

const ROWS2 = 6;
const COLS3 = 6;

const seaArray1 = [];
const seaArray2 = [];
const seaArray3 = [];
for (let row = 0; row < ROWS2; row++) {
  const subArray = [];
  for (let col = 0; col < COLS3; col++) {
    subArray.push(0);
  }
  seaArray1.push(subArray);
  seaArray2.push(subArray);

}

const year3 = [2016,2017,2018,2019,2020,2021];

$.ajax({
    url: './dataset/陆地及海洋保护区面积占总领土面积比例.csv',
    type: 'GET',
    async: true,
    success: function (testData) {
        var m = $.csv.toArrays(testData, {
            delimiter: ","
        })
        for(let i = 4;i<m[0].length;i++){
            seaArray1[0][i-4] = m[1][i];
            seaArray1[1][i-4] = m[2][i];
            seaArray1[2][i-4] = m[3][i];
            seaArray1[3][i-4] = m[4][i];
            seaArray1[4][i-4] = m[5][i];
            seaArray1[5][i-4] = m[6][i];

        }
        console.log("seaArray1:"+seaArray1);
        
        var myChart = echarts.init(document.getElementById('seaChart'));
        var option2;

        option2 = {
        // legend:{},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: year3
        },
        yAxis: {
            type: 'value'
        },
        dataZoom: [{
            type: 'inside', //缩放滑动条 inside无
            show: true, //开启
            yAxisIndex: [0], //Y轴滑动
            
        }],
        grid:{
                // show:false,
                top:'8%',    // 一下数值可为百分比也可为具体像素值
                // right:'5%',
                // bottom:'10%',
                // left:'10%'
        },
        legend: {
            data: ['美国', '英国', '中国', '印度', '俄罗斯','日本']
        },
        series: [
            {
            name:'美国',
            data: seaArray1[0],
            type: 'line'
            },
            {
            name:'英国',
            data: seaArray1[1],
            type: 'line'
            },
            {
            name:'中国',
            data: seaArray1[2],
            type: 'line'
            },
            {
            name:'印度',
            data: seaArray1[3],
            type: 'line'
            },  
            {
            name:'俄罗斯',
            data: seaArray1[4],
            type: 'line'
            },   
            {
            name:'日本',
            data: seaArray1[5],
            type: 'line'
            },                    
        ]
        };

        myChart.setOption(option2);

    }

})
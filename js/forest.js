const ROWS = 6;
const COLS = 5;
const COLS2 = 4;

const forestArray1 = [];
const forestArray2 = [];
const forestArray3 = [];
for (let row = 0; row < ROWS; row++) {
  const subArray = [];
  for (let col = 0; col < COLS; col++) {
    subArray.push(0);
  }
  forestArray1.push(subArray);
}
for (let row = 0; row < ROWS; row++) {
    const subArray = [];
    for (let col = 0; col < COLS2; col++) {
      subArray.push(0);
    }
    forestArray2.push(subArray);
  }
const year2 = [1990,2000,2010,2020];

$.ajax({
    url: './dataset/fra2020-extentOfForest.csv',
    type: 'GET',
    async: true,
    success: function (testData) {
        var m = $.csv.toArrays(testData, {
            delimiter: ","
        })
        for(let i = 1;i<m[0].length;i++){
            forestArray1[0][i-1] = m[1][i];
            forestArray1[1][i-1] = m[2][i];
            forestArray1[2][i-1] = m[3][i];
            forestArray1[3][i-1] = m[4][i];
            forestArray1[4][i-1] = m[5][i];
            forestArray1[5][i-1] = m[6][i];

        }
        console.log("forestArray1:"+forestArray1);
        for(let i=0;i<4;i++){
            forestArray2[0][i] = parseFloat((forestArray1[0][i]/forestArray1[0][4]).toFixed(3));
            forestArray2[1][i] = parseFloat((forestArray1[1][i]/forestArray1[1][4]).toFixed(3));
            forestArray2[2][i] = parseFloat((forestArray1[2][i]/forestArray1[2][4]).toFixed(3));
            forestArray2[3][i] = parseFloat((forestArray1[3][i]/forestArray1[3][4]).toFixed(3));
            forestArray2[4][i] = parseFloat((forestArray1[4][i]/forestArray1[4][4]).toFixed(3));
            forestArray2[5][i] = parseFloat((forestArray1[5][i]/forestArray1[5][4]).toFixed(3));
        }
        console.log("forestArray2:"+forestArray2);

        var myChart = echarts.init(document.getElementById('forestLine'));
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
            data: year2
        },
        yAxis: {
            type: 'value'
        },
        legend: {
            data: ['美国', '英国', '中国', '印度', '俄罗斯','日本']
        },
        series: [
            {
            name:'美国',
            data: forestArray2[0],
            type: 'line'
            },
            {
            name:'英国',
            data: forestArray2[1],
            type: 'line'
            },
            {
            name:'中国',
            data: forestArray2[2],
            type: 'line'
            },
            {
            name:'印度',
            data: forestArray2[3],
            type: 'line'
            },  
            {
            name:'俄罗斯',
            data: forestArray2[4],
            type: 'line'
            },   
            {
            name:'日本',
            data: forestArray2[5],
            type: 'line'
            },                    
        ]
        };

        myChart.setOption(option2);

    }

})
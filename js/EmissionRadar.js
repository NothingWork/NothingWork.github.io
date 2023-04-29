var mainCountryEmission_CH4 = []
var mainCountryEmission_CO2 = []
var mainCountryEmission_FGas = []
var mainCountryEmission_KYOTOGHG = []
var mainCountryEmission_N20 = []

var col2 = 5
var radarMax = 0

let yearValue2 = 0; // 初始化 yearValue 全局变量
let gasValue2 = ''; // 初始化 gasValue 全局变量


const yearSlider2 = document.getElementById("yearSlider");
yearSlider2.addEventListener("input", function () {
    yearValue2 = this.value;
    col2 = 1952 - yearValue2
    // console.log(yearValue2)
    
});

// console.log("col2");
// console.log(col2);

const gasSelect2 = document.getElementById('gas-type');
gasSelect2.addEventListener('change', function () {
    gasValue2 = this.value;
    console.log(gasValue2)
});

//页面1左下角世界六大经济体雷达图
//左下角世界六大经济体雷达图
// var US = []//存放美国数据
// var China = []
// var Japan = []
// var Russia = []
// var UK = []
// var India = []
// var mainCountryEmission = new Array()
// for(let i=0;i<6;i++){
//     mainCountryEmission[i] = new Array();
//     for(let j=0;j<5;j++){
//         mainCountryEmission[i][j]="";
//     }
// }


function Radar(){
    var year = document.getElementById("yearSlider").value;
    var gas = document.getElementById("gas-type").value;
    
    // console.log(year);
    if (year !== "") {
        // TODO: 根据选中的年份加载数据
        $.ajax({
            url: './dataset/historical_emissions1850-1947 CH4.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                var index_radar = 0
                for (let j = 0; j < m.length; j++) {
                    if(m[j][0]=="United States"){
                        mainCountryEmission_CH4[0] = m[j][col2];
                        index_radar++;
                       
                    }
                    else if(m[j][0]=="China"){
                        mainCountryEmission_CH4[1] = m[j][col2];
                        // mainCountryEmission_CH4.push(m[j][col]);
                        index_radar++;
                    }
                    else if(m[j][0]=="Japan"){
                        mainCountryEmission_CH4[2] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="Russia"){
                        mainCountryEmission_CH4[3] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="United Kingdom"){
                        mainCountryEmission_CH4[4] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="India"){
                        mainCountryEmission_CH4[5] = m[j][col2];
                        index_radar++;
                        // console.log(index_radar);
                        // console.log(mainCountryEmission_CH4);
                    }
                    if(index_radar==6)break;
                    
                }
                // console.log("mainCountryEmission_CH4");
                // console.log(mainCountryEmission_CH4);
            }
        })
        $.ajax({
            url: './dataset/historical_emissions1850-1947 CO2.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                var index_radar = 0
                for (let j = 0; j < m.length; j++) {
                    if(m[j][0]=="United States"){
                        mainCountryEmission_CO2[0] = m[j][col2];
                        index_radar++;
                       
                    }
                    else if(m[j][0]=="China"){
                        mainCountryEmission_CO2[1] = m[j][col2];
                        // mainCountryEmission_CH4.push(m[j][col]);
                        index_radar++;
                    }
                    else if(m[j][0]=="Japan"){
                        mainCountryEmission_CO2[2] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="Russia"){
                        mainCountryEmission_CO2[3] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="United Kingdom"){
                        mainCountryEmission_CO2[4] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="India"){
                        mainCountryEmission_CO2[5] = m[j][col2];
                        index_radar++;
                    }
                    if(index_radar==6)break;
                }
                // console.log("mainCountryEmission_CO2");
                // console.log(mainCountryEmission_CO2);
            }
        })
        $.ajax({
            url: './dataset/historical_emissions1850-1947 F-Gas.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                var index_radar = 0
                for (let j = 0; j < m.length; j++) {
                    if(m[j][0]=="United States"){
                        mainCountryEmission_FGas[0] = m[j][col2];
                        index_radar++;
                       
                    }
                    else if(m[j][0]=="China"){
                        mainCountryEmission_FGas[1] = m[j][col2];
                        // mainCountryEmission_CH4.push(m[j][col]);
                        index_radar++;
                    }
                    else if(m[j][0]=="Japan"){
                        mainCountryEmission_FGas[2] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="Russia"){
                        mainCountryEmission_FGas[3] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="United Kingdom"){
                        mainCountryEmission_FGas[4] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="India"){
                        mainCountryEmission_FGas[5] = m[j][col2];
                        index_radar++;
                    }
                    if(index_radar==6)break;
                }
                // console.log("mainCountryEmission_FGas");
                // console.log(mainCountryEmission_FGas);

            }
        })
        $.ajax({
            url: './dataset/historical_emissions1850-1947 KYOTOGHG.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                var index_radar = 0
                for (let j = 0; j < m.length; j++) {
                    if(m[j][0]=="United States"){
                        mainCountryEmission_KYOTOGHG[0] = m[j][col2];
                        index_radar++;
                       
                    }
                    else if(m[j][0]=="China"){
                        mainCountryEmission_KYOTOGHG[1] = m[j][col2];
                        // mainCountryEmission_CH4.push(m[j][col]);
                        index_radar++;
                    }
                    else if(m[j][0]=="Japan"){
                        mainCountryEmission_KYOTOGHG[2] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="Russia"){
                        mainCountryEmission_KYOTOGHG[3] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="United Kingdom"){
                        mainCountryEmission_KYOTOGHG[4] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="India"){
                        mainCountryEmission_KYOTOGHG[5] = m[j][col2];
                        index_radar++;
                    }
                    if(index_radar==6)break;
                }
                // console.log("mainCountryEmission_KYOTOGHG");
                // console.log(mainCountryEmission_KYOTOGHG);

            }
        })
        $.ajax({
            url: './dataset/historical_emissions1850-1947 N2O.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                var index_radar = 0
                for (let j = 0; j < m.length; j++) {
                    if(m[j][0]=="United States"){
                        mainCountryEmission_N20[0] = m[j][col2];
                        index_radar++;
                       
                    }
                    else if(m[j][0]=="China"){
                        mainCountryEmission_N20[1] = m[j][col2];
                        // mainCountryEmission_CH4.push(m[j][col]);
                        index_radar++;
                    }
                    else if(m[j][0]=="Japan"){
                        mainCountryEmission_N20[2] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="Russia"){
                        mainCountryEmission_N20[3] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="United Kingdom"){
                        mainCountryEmission_N20[4] = m[j][col2];
                        index_radar++;
                    }
                    else if(m[j][0]=="India"){
                        mainCountryEmission_N20[5] = m[j][col2];
                        index_radar++;
                    }
                    if(index_radar==6)break;
                }
                // console.log("mainCountryEmission_N20");
                // console.log(mainCountryEmission_N20);
            }
        })
        // console.log(mainCountryEmission_N20)
        /**********左下角雷达图********** */
        var mycharts_radar = echarts.init(document.getElementById('countryEmissionRadar'));

        // console.log(mainCountryEmission_CH4)
        var EmissionRadar = {
            title: {
                text: '',
                textStyle: {
                color: 'rgba(221,221,221,1)',
                fontSize: 14,
                lineHeight: 10,
                },
                left: 'center',
                top: 'bottom',

            },
            width: 300,  // 画布宽度为 800 像素
            height: 300, 

            color: ['#7BFF00', '#FFE434', '#56A3F1', '#FF917C','#8EFF74','#FB00FF'],
                // 图表位置
            grid: {
                position: 'center',
            },
            tooltip : {
                    confine: true,
                    enterable: true, 
                },
            // legend: {//五种气体名字
            //     itemHeight: 24,
            //     itemWidth: 24,
            // },
            visualMap : {
                type : 'piecewise',
                top : 10,
                right : 0,
                show:false,
                
                pieces : [
                    { min : 300 , color : 'brown' },
                    { min : 260 , max : 300 , color : 'purple' },
                    { min : 160 , max : 260 , color : 'red' },
                    { min : 100 , max : 160 , color : 'orange' },
                    { min : 50 , max : 100 , color : 'yellow' },
                    { max : 50 , color : 'green' }
                ]
            },
            radar: {
                shape: 'circle',
                // 设置雷达图中间射线的颜色
                axisLine: {
                    lineStyle: {
                        color: 'rgba(94,102,91,.7)',
                        },
                },
                // color:'rgba(94,102,91,.7)',
                indicator: [
                    { name: '美国', max: 2000 },//3000
                    { name: '中国', max: 500 },//300
                    { name: '日本', max: 500 },//200
                    { name: '俄罗斯', max: 500 },//400
                    { name: '英国', max: 700 },//500
                    { name: '印度', max: 500 }//400
                ],
                splitArea : {
                    show : true,
                    areaStyle : {
                        // color: 'rgba(255,0,0,0)', // 图表背景的颜色
                        color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 10
                    },
                },
                splitLine : {
                    show : true,
                    lineStyle : {
                        width : 1,
                        color : 'rgba(211, 253, 250, 0.8)', // 设置网格的颜色
                    },
                },
        
            },
            series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                symbol: 'circle', 
                symbolSize: 5, 

                data: [
                {
                    // value: [4200, 3000, 20000, 35000, 50000, 18000],
                    value:mainCountryEmission_CH4,
                    name: 'CH4',
                    itemStyle: {
                        normal: {
                            // color: 'rgba(94,83,20,.3)',
                            lineStyle: {
                                // color: 'rgba(94,83,20,.3)',
                            },
                        },
                    },
                },
                {
                    // value: [5000, 14000, 28000, 26000, 42000, 21000],
                    value:mainCountryEmission_CO2,
                    name: 'CO2',
                    itemStyle: {
                        normal: {
                            // color: 'rgba(200,200,0,.3)',
                            lineStyle: {
                                // color: 'rgba(200,200,0,.3)',
                            },
                        },
                    },
                },
                {
                    value:mainCountryEmission_FGas,
                    name:'含氟温室气体',
                    itemStyle: {
                        normal: {
                            // color: 'rgba(159,159,159,.3)',
                            lineStyle: {
                                // color: 'rgba(159,159,159,.3)',
                            },
                        },
                    },
                },
                {
                    value:mainCountryEmission_KYOTOGHG,
                    name:'温室气体'
                },
                {
                    value:mainCountryEmission_N20,
                    name:'N20'
                }
                ]
            }
            ]
        };
        mycharts_radar.setOption(EmissionRadar);

        $.ajax({
            url: './dataset/historical_emissions1850-1947.csv',
            type: 'GET',
            async: true,
            success: function (testData) {
                var m = $.csv.toArrays(testData, {
                    delimiter: ","
                })
                // console.log(m);
                // for (let j = 0; j < m.length; j++) {
                //     Country[j] = m[j][0];
                //     Emission[j] = m[j][col];
                //     if(m[j][0]=="United States"&&m[j][3]=="Total excluding LULUCF"){
                //         mainCountry[0][0]=m[j][col];
                //         if(m[j][col]>radarMax){
                //             radarMax = m[j][col];
                //         }
                //     }
                //     else if(m[j][0]=="China"&&m[j][3]=="Total excluding LULUCF"){
                //         mainCountry[1][0]=m[j][col];
                //         if(m[j][col]>radarMax){
                //             radarMax = m[j][col];
                //         }
                //     }
                //     else if (m[j][0]=="Japan"){
                //         mainCountry[2]=m[j][col];
                //         if(m[j][col]>radarMax){
                //             radarMax = m[j][col];
                //         }
                //     }
                //     else if (m[j][0]=="Russia"){
                //         mainCountry[3]=m[j][col];
                //         if(m[j][col]>radarMax){
                //             radarMax = m[j][col];
                //         }
                //     }
                //     else if (m[j][0]=="United Kingdom"){
                //         mainCountry[4]=m[j][col];
                //         if(m[j][col]>radarMax){
                //             radarMax = m[j][col];
                //         }
                //     }
                //     else if (m[j][0]=="India"){
                //         mainCountry[5]=m[j][col];
                //         if(m[j][col]>radarMax){
                //             radarMax = m[j][col];
                //         }
                //     }
                // }
                // console.log(Country);
                // console.log(Emission);


                // console.log(mainCountry);





                // var countryEmissionRadar = {
                //     title: {
                //         text: '六大国污染排放雷达图',
                //         textStyle: {
                //             color: 'rgba(221,221,221,1)', //标题颜色
                //             fontSize: 14,
                //             lineHeight: 20,
                //         },
                //         // 标题的位置，此时放在图的底边
                //         left: 'center',
                //         top: 'bottom',
                //     },
                //     // 图表的位置
                //     grid: {
                //         position: 'center',
                //     },
                //     tooltip : {
                //     //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
                //         confine: true,
                //         enterable: true, //鼠标是否可以移动到tooltip区域内
                //     },
                //     radar: {
                //         shape: 'circle',
                //         splitNumber: 5, // 雷达图圈数设置
                //         name: {
                //             textStyle: {
                //                 color: '#838D9E',
                //             },
                //         },
                //         // 设置雷达图中间射线的颜色
                //         axisLine: {
                //             lineStyle: {
                //                 color: 'rgba(131,141,158,.1)',
                //                 },
                //         },
                //         indicator: [
                //         //     {
                //         //     name: '通信', max: 30,
                //         //     //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
                //         //     axisLabel: {
                //         //         show: true,
                //         //         fontSize: 12,
                //         //         color: '#838D9E',
                //         //         showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                //         //         showMinLabel: true, //显示最小数字，即中心点显示0
                //         //     },
                //         // },
                //         { name: '美国', max: radarMax},
                //         { name: '中国', max: radarMax},
                //         { name: '日本', max: radarMax},
                //         { name: '俄罗斯', max: radarMax},
                //         { name: '英国', max: radarMax},
                //         { name: '印度', max: radarMax},

                //         ],
                //         //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
                //         splitArea : {
                //             show : false,
                //             areaStyle : {
                //                 color: 'rgba(255,0,0,0)', // 图表背景的颜色
                //             },
                //         },
                //         splitLine : {
                //             show : true,
                //             lineStyle : {
                //                 width : 1,
                //                 color : 'rgba(131,141,158,.1)', // 设置网格的颜色
                //             },
                //         },
                //     },
                //     series: [{
                //         name: '雷达图', // tooltip中的标题
                //         type: 'radar', //表示是雷达图
                //         symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                //         symbolSize: 8, // 拐点的大小
                
                //         areaStyle: {
                //             normal: {
                //                 width: 1,
                //                 opacity: 0.2,
                //             },
                //         },
                //         data: [
                //             {
                //                 value: [17, 24, 27, 29, 26],
                //                 name: '2018-07',
                //                 // 设置区域边框和区域的颜色
                //                 itemStyle: {
                //                     normal: {
                //                         color: 'rgba(255,225,0,.3)',
                //                         lineStyle: {
                //                             color: 'rgba(255,225,0,.3)',
                //                         },
                //                     },
                //                 },
                //             },
                //             {
                //                 value: [5, 20, 19, 11, 22],
                //                 name: '',
                //                 itemStyle: {
                //                     normal: {
                //                         color: 'rgba(60,135,213,.3)',
                //                         lineStyle: {
                //                             width: 1,
                //                             color: 'rgba(60,135,213,.3)',
                //                         },
                //                     },
                //                 },
                //             },
                //             {
                //                 value: [7, 18, 19, 13, 22],
                //                 name: '',
                //                 itemStyle: {
                //                     normal: {
                //                         color: 'rgba(255,74,74,.3)',
                //                         lineStyle: {
                //                             width: 1,
                //                             color: 'rgba(255,74,74,.3)',
                //                         },
                //                     },
                //                 },
                //             },
                //         ],
                //     }],
                // }
                // mycharts_radar.setOption(countryEmissionRadar);

            
            }
        })
    }   
}
Radar();
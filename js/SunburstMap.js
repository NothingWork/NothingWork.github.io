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
    var sunburstMap = echarts.init(document.getElementById('SunburstMap'));

    optionForSunburstMap = {
        series: {
            type: 'sunburst',
            data: dataAll,
            radius: [0, '95%'],
            sort: undefined,
            emphasis: {
                focus: 'ancestor'
            },
            levels: [
                {
                },
                {
                    r0: '10%',
                    r: '40%',
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#fff',
                        color: '#467098',
                        opacity: 0.7
                    },
                    label: {
                        rotate: 'tangential'
                    }
                },
                {
                    r0: '40%',
                    r: '70%',
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#fff',
                        color: '#1D5C7F',
                        opacity: 0.7
                    },
                    label: {
                        align: 'right'
                    }
                },
                {
                    r0: '70%',
                    r: '72%',
                    label: {
                        position: 'outside',
                        padding: 3,
                        silent: false
                    },
                    itemStyle: {
                        borderWidth: 3
                    }
                }
            ]
           
        }
    };

    sunburstMap.setOption(optionForSunburstMap);
});




//     var year = document.getElementById("yearSlider").value;
//     var gas = document.getElementById("gas-type").value;
//     // console.log(year);

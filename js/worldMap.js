var Country = []
var Emission = []
var col = 5

let yearValue = 0; // 初始化 yearValue 全局变量
let gasValue = ''; // 初始化 gasValue 全局变量
const headerTextOfworldMapInPage1 = document.querySelector('#titleOfWorldMap h4');
const yearSlider = document.getElementById("yearSlider");
yearSlider.addEventListener("input", function () {
    headerTextOfworldMapInPage1.innerHTML = yearSlider.value + '年空气污染排放热力图';
    yearValue = this.value;
    col = 1952 - yearValue
    // console.log(yearValue)
});

const gasSelect = document.getElementById('gas-type');
gasSelect.addEventListener('change', function () {
    gasValue = this.value;
    // console.log(gasValue)
});

function setWorldMap() {
    var year = document.getElementById("yearSlider").value;
    var gas = document.getElementById("gas-type").value;
    // console.log(year);
    // TODO: 根据选中的年份加载数据
    // console.log(gas)
    $.ajax({
        url: 'dataset/historical_emissions1850-1947 ' + gas + '.csv',
        type: 'GET',
        async: true,
        success: function (testData) {
            var m = $.csv.toArrays(testData, {
                delimiter: ","
            })
            // console.log(m);
            for (let j = 0; j < m.length; j++) {
                Country[j] = m[j][0];
                Emission[j] = m[j][col];
            }
            // console.log(Country);
            // console.log(Emission);

            var translateObj = {
                "Afghanistan": "阿富汗",
                "Albania": "阿尔巴尼亚",
                "Algeria": "阿尔及利亚",
                "Angola": "安哥拉",
                "Argentina": "阿根廷",
                "Armenia": "亚美尼亚",
                "Australia": "澳大利亚",
                "Austria": "奥地利",
                "Azerbaijan": "阿塞拜疆",
                "Bahamas": "巴哈马",
                "Bahrain": "巴林",
                "Bangladesh": "孟加拉国",
                "Belarus": "白俄罗斯",
                "Belgium": "比利时",
                "Belize": "伯利兹",
                "Benin": "贝宁",
                "Bhutan": "不丹",
                "Bolivia": "玻利维亚",
                "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
                "Botswana": "博茨瓦纳",
                "Brazil": "巴西",
                "British Virgin Islands": "英属维京群岛",
                "Brunei": "文莱",
                "Bulgaria": "保加利亚",
                "Burkina Faso": "布基纳法索",
                "Burundi": "布隆迪",
                "Cambodia": "柬埔寨",
                "Cameroon": "喀麦隆",
                "Canada": "加拿大",
                "Cape Verde": "佛得角",
                "Cayman Islands": "开曼群岛",
                "Central African Republic": "中非",
                "Chad": "乍得",
                "Chile": "智利",
                "China": "中国",
                "Colombia": "哥伦比亚",
                "Comoros": "科摩罗",
                "Democratic Republic of the Congo": "刚果",
                "Costa Rica": "哥斯达黎加",
                "Croatia": "克罗地亚",
                "Cuba": "古巴",
                "Cyprus": "塞浦路斯",
                "Czech Rep.": "捷克共和国",
                "C?te d'Ivoire": "科特迪瓦",
                "Republic of Congo": "刚果民主共和国",
                "Dem. Rep. Korea": "朝鲜",
                "Denmark": "丹麦",
                "Djibouti": "吉布提",
                "Dominican Rep.": "多米尼加共和国",
                "Ecuador": "厄瓜多尔",
                "Egypt": "埃及",
                "El Salvador": "萨尔瓦多",
                "Equatorial Guinea": "赤道几内亚",
                "Eritrea": "厄立特里亚",
                "Estonia": "爱沙尼亚",
                "Ethiopia": "埃塞俄比亚",
                "Falkland Is.": "福克兰群岛",
                "Fiji": "斐济",
                "Finland": "芬兰",
                "Fr. S. Antarctic Lands": "所罗门群岛",
                "France": "法国",
                "Gabon": "加蓬",
                "Gambia": "冈比亚",
                "Georgia": "格鲁吉亚",
                "Germany": "德国",
                "Ghana": "加纳",
                "Greece": "希腊",
                "Greenland": "格陵兰",
                "Guatemala": "危地马拉",
                "Guinea": "几内亚",
                "Guinea-Bissau": "几内亚比绍",
                "Guyana": "圭亚那",
                "Haiti": "海地",
                "Honduras": "洪都拉斯",
                "Hungary": "匈牙利",
                "Iceland": "冰岛",
                "India": "印度",
                "Indonesia": "印度尼西亚",
                "Iran": "伊朗",
                "Iraq": "伊拉克",
                "Ireland": "爱尔兰",
                "Isle of Man": "马恩岛",
                "Israel": "以色列",
                "Italy": "意大利",
                "Jamaica": "牙买加",
                "Japan": "日本",
                "Jordan": "约旦",
                "Kazakhstan": "哈萨克斯坦",
                "Kenya": "肯尼亚",
                "Korea": "韩国",
                "Kuwait": "科威特",
                "Kyrgyzstan": "吉尔吉斯斯坦",
                "Lao PDR": "老挝",
                "Latvia": "拉脱维亚",
                "Lebanon": "黎巴嫩",
                "Lesotho": "莱索托",
                "Liberia": "利比里亚",
                "Libya": "利比亚",
                "Lithuania": "立陶宛",
                "Luxembourg": "卢森堡",
                "Macedonia": "马其顿",
                "Madagascar": "马达加斯加",
                "Malawi": "马拉维",
                "Malaysia": "马来西亚",
                "Maldives": "马尔代夫",
                "Mali": "马里",
                "Malta": "马耳他",
                "Mauritania": "毛里塔尼亚",
                "Mauritius": "毛里求斯",
                "Mexico": "墨西哥",
                "Moldova": "摩尔多瓦",
                "Monaco": "摩纳哥",
                "Mongolia": "蒙古",
                "Montenegro": "黑山共和国",
                "Morocco": "摩洛哥",
                "Mozambique": "莫桑比克",
                "Myanmar": "缅甸",
                "Namibia": "纳米比亚",
                "Nepal": "尼泊尔",
                "Netherlands": "荷兰",
                "New Caledonia": "新喀里多尼亚",
                "New Zealand": "新西兰",
                "Nicaragua": "尼加拉瓜",
                "Niger": "尼日尔",
                "Nigeria": "尼日利亚",
                "Norway": "挪威",
                "Oman": "阿曼",
                "Pakistan": "巴基斯坦",
                "Panama": "巴拿马",
                "Papua New Guinea": "巴布亚新几内亚",
                "Paraguay": "巴拉圭",
                "Peru": "秘鲁",
                "Philippines": "菲律宾",
                "Poland": "波兰",
                "Portugal": "葡萄牙",
                "Puerto Rico": "波多黎各",
                "Qatar": "卡塔尔",
                "Reunion": "留尼旺",
                "Romania": "罗马尼亚",
                "Russia": "俄罗斯",
                "Rwanda": "卢旺达",
                "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑威奇群岛",
                "South Sudan": "南苏丹",
                "San Marino": "圣马力诺",
                "Saudi Arabia": "沙特阿拉伯",
                "Senegal": "塞内加尔",
                "Serbia": "塞尔维亚",
                "Sierra Leone": "塞拉利昂",
                "Singapore": "新加坡",
                "Slovakia": "斯洛伐克",
                "Slovenia": "斯洛文尼亚",
                "Solomon Is.": "所罗门群岛",
                "Somalia": "索马里",
                "South Africa": "南非",
                "Spain": "西班牙",
                "Sri Lanka": "斯里兰卡",
                "Sudan": "苏丹",
                "Suriname": "苏里南",
                "Swaziland": "斯威士兰",
                "Sweden": "瑞典",
                "Switzerland": "瑞士",
                "Syria": "叙利亚",
                "Taiwan": "中国台湾",
                "Tajikistan": "塔吉克斯坦",
                "Tanzania": "坦桑尼亚",
                "Thailand": "泰国",
                "Togo": "多哥",
                "Tonga": "汤加",
                "Trinidad and Tobago": "特立尼达和多巴哥",
                "Tunisia": "突尼斯",
                "Turkey": "土耳其",
                "Turkmenistan": "土库曼斯坦",
                "U.S. Virgin Islands": "美属维尔京群岛",
                "Uganda": "乌干达",
                "Ukraine": "乌克兰",
                "United Arab Emirates": "阿拉伯联合酋长国",
                "United Kingdom": "英国",
                "United States": "美国",
                "Uruguay": "乌拉圭",
                "Uzbekistan": "乌兹别克斯坦",
                "Vanuatu": "瓦努阿图",
                "Vatican City": "梵蒂冈城",
                "Venezuela": "委内瑞拉",
                "Vietnam": "越南",
                "W. Sahara": "西撒哈拉",
                "Yemen": "也门",
                "Yugoslavia": "南斯拉夫",
                "Zaire": "扎伊尔",
                "Zambia": "赞比亚",
                "Zimbabwe": "津巴布韦"
            };
            var dataArr = [];
            for (let i = 0; i < Country.length; i++) {
                const provinceDataObj = {
                    name: translateObj[Country[i]], // 查找对应的中文名称并使用它
                    value: Emission[i]
                };
                dataArr.push(provinceDataObj);
            }
            var worldMap = echarts.init(document.getElementById('worldMap'));

            var optionForAirPollutionMap = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.data.name + '<br>排放量: ' + params.data.value + 'Mt'; // update tooltip content
                    }
                },
                visualMap: {
                    min: 0,
                    max: 200,
                    text: ['高', '低'],
                    realtime: false,
                    calculable: true,
                    color: ['#c45a65', '#eaad1a', 'white']
                },
                series: [
                    {

                        name: 'World Population (2010)',
                        type: 'map',
                        mapType: 'world',
                        roam: true,
                        itemStyle: {
                            emphasis: { label: { show: true } }
                        },
                        data: dataArr
                    }
                ]
            };
            worldMap.setOption(optionForAirPollutionMap);
        }
    });
}
setWorldMap();
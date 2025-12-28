// 时间戳转换工具的主要功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentTime();
    // 每秒更新一次当前时间
    setInterval(updateCurrentTime, 1000);
});

// 时间戳转日期
function timestampToDate() {
    const timestampInput = document.getElementById('timestamp-input');
    const unitSelect = document.getElementById('timestamp-unit');
    const resultDiv = document.getElementById('date-result');
    
    const timestamp = timestampInput.value.trim();
    if (!timestamp) {
        changeResult(resultDiv, '请输入时间戳', 'error');
        return;
    }
    
    const unit = unitSelect.value;
    let timestampNum = parseInt(timestamp);
    // 是否输入内容为数字
    if (isNaN(timestampNum)) {
        changeResult(resultDiv, '请输入有效的时间戳', 'error');
        return;
    }
    
    // 转换为毫秒
    if (unit === '秒') {
        timestampNum = timestampNum * 1000;
    }
    
    try {
        const date = new Date(timestampNum);
        if (isNaN(date.getTime())) {
            changeResult(resultDiv, '时间戳超出有效范围', 'error');
            return;
        }
        
        const result = formatDateTime(date);
        changeResult(resultDiv, result, 'success');
        
        // 自动切换到对应的结果标签
        showResult('date');
        
    } catch (error) {
        changeResult(resultDiv, '转换失败：' + error.message, 'error');
    }
}

// 日期转时间戳
function dateToTimestamp() {
    const dateInput = document.getElementById('date-input');
    const resultDiv = document.getElementById('timestamp-result');
    
    const dateString = dateInput.value;
    
    if (!dateString) {
        changeResult(resultDiv, '请选择日期时间', 'error');
        return;
    }
    
    try {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            changeResult(resultDiv, '请选择有效的日期时间', 'error');
            return;
        }
        
        const timestampSec = Math.floor(date.getTime() / 1000);
        const timestampMs = date.getTime();
        
        const result = `秒级时间戳: ${timestampSec}\n毫秒级时间戳: ${timestampMs}`;
        changeResult(resultDiv, result, 'success');
        
        // 自动切换到对应的结果标签
        showResult('timestamp');
        
    } catch (error) {
        changeResult(resultDiv, '转换失败：' + error.message, 'error');
    }
}

// 更新当前时间显示
function updateCurrentTime() {
    const now = new Date();
    
    // 更新日期时间显示
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        currentDateElement.textContent = formatDateTime(now);
    }
    
    // 更新秒级时间戳显示
    const currentTimestampSecElement = document.getElementById('current-timestamp-sec');
    if (currentTimestampSecElement) {
        const timestampSec = Math.floor(now.getTime() / 1000);
        currentTimestampSecElement.textContent = timestampSec;
    }
    
    // 更新毫秒级时间戳显示
    const currentTimestampMsElement = document.getElementById('current-timestamp-ms');
    if (currentTimestampMsElement) {
        const timestampMs = now.getTime();
        currentTimestampMsElement.textContent = timestampMs;
    }
}

// 格式化日期时间
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// 改变右侧结果区域显示
function changeResult(element,message, type){
    element.textContent = message;
    element.className = `result-display ${type} active`;
    console.log('showResult called with:', message, type);
    console.log('element className:', element.className);
    // 添加闪烁效果
    element.classList.add('flash');
    setTimeout(() => {
        element.classList.remove('flash');
    }, 500);
}

// 切换结果显示标签
function showResult(type) {
    // 移除所有标签的活动状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 移除所有结果区域的活动状态
    document.querySelectorAll('.result-display').forEach(display => {
        display.classList.remove('active');
    });
    
    // 激活当前标签和对应结果
    if (type === 'date') {
        document.querySelector('.tab-btn:first-child').classList.add('active');
        document.getElementById('date-result').classList.add('active');
    } else if (type === 'timestamp') {
        document.querySelector('.tab-btn:last-child').classList.add('active');
        document.getElementById('timestamp-result').classList.add('active');
    }
}

// 输入框回车事件
document.addEventListener('DOMContentLoaded', function() {
    const timestampInput = document.getElementById('timestamp-input');
    if (timestampInput) {
        timestampInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                timestampToDate();
            }
        });
    }
    
    const dateInput = document.getElementById('date-input');
    if (dateInput) {
        dateInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                dateToTimestamp();
            }
        });
    }
});

// 格式化数字输入（只允许数字和删除键）
function formatNumberInput(input) {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d]/g, '');
    });
}

// 页面加载完成后添加输入格式化
document.addEventListener('DOMContentLoaded', function() {
    const timestampInput = document.getElementById('timestamp-input');
    if (timestampInput) {
        formatNumberInput(timestampInput);
    }
});

// 快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl + Enter: 时间戳转日期
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        timestampToDate();
    }
    
    // Alt + Enter: 日期转时间戳
    if (e.altKey && e.key === 'Enter') {
        e.preventDefault();
        dateToTimestamp();
    }
    
    // F5: 刷新当前时间
    if (e.key === 'F5') {
        e.preventDefault();
        updateCurrentTime();
    }
});

// 添加工具提示
function addTooltips() {
    const tooltips = {
        'timestamp-input': '输入 Unix 时间戳（秒或毫秒）',
        'timestamp-unit': '选择时间戳的单位',
        'date-input': '选择要转换的日期和时间',
        'current-date': '当前系统时间',
        'current-timestamp-sec': '当前时间对应的秒级时间戳',
        'current-timestamp-ms': '当前时间对应的毫秒级时间戳'
    };
    
    for (const [id, text] of Object.entries(tooltips)) {
        const element = document.getElementById(id);
        if (element) {
            element.title = text;
        }
    }
}

// 页面加载完成后添加工具提示
document.addEventListener('DOMContentLoaded', addTooltips);
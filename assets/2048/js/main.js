// html元素选择
var cells = document.querySelectorAll(".cell"),
  cover = document.getElementById("cover"),
  result = document.getElementById("result");
// 网格数据
var data = [], //数字组
  rownum = 4, //总行数
  colnum = 4, //总列数
  ifGen = false, //标记是否可以新生成数字，有移动或合并才可以生成
  flag = true; //标记是否为第一次移动
var lastKeyDownTiem = 0; //记录键盘点击时间
// 初始化游戏
function gameInit() {
  // 清屏
  clearAll();
  //打开生成开关
  ifGen = true;
  // 随机为两个格子生成随机数
  genNum(2, 0.8);
}

// 清除所有网格
function clearAll() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.className = "cell";
  });
}

// 监听键盘事件
window.addEventListener("keyup", function (e) {
  let //移动方向
    x = 0,
    y = 0,
    ifMove = true, //是否移动了，默认为true
    currentTime = new Date().getTime(); //当前时间
  switch (e.key) {
    case "ArrowUp":
      y--;
      break;
    case "ArrowDown":
      y++;
      break;
    case "ArrowLeft":
      x--;
      break;
    case "ArrowRight":
      x++;
      break;
    default:
      ifMove = false;
      break;
  }
  if (ifMove && currentTime - lastKeyDownTiem > 300) {
    //标记是第一次移动
    flag = true;
    //移动
    move(x, y);
  }
  lastKeyDownTiem = currentTime;
});

//为单元格初始化数字: 个数,2所占比例
function genNum(size, prop) {
  // 随机在两个坐标生成初始数e
  let sucNum = 0; //标记生成成功的数量
  let count = 0; //遍历计数
  while (1) {
    count++;
    // 随机选择一个格子
    const index = Math.floor(Math.random() * colnum * rownum);
    const cell = cells[index];
    //格子全满
    if (count == colnum * rownum) {
      //检查是否失败
      if (!checkCell()) {
        result.innerHTML = "失败"
        cover.style.display = "flex";
      }
      break;
    }
    if (Number(cell.innerHTML) == 0) {
      //判断是否允许生成
      if (!ifGen) break;
      // 以2对8的概率赋值4或2
      const cellNum = Math.random() < prop ? 2 : 4;
      //改变单元格
      changeCell(index, cellNum, true);
      // 防止两次生成在同一位置
      sucNum++;
    }
    if (sucNum == size) {
      ifGen = false; //关闭生成开关
      break; //生成完成
    }
  }
}

// 改变单元格数字与样式：索引与数字,是否启用动画
function changeCell(index, num, bool) {
  cells[index].innerHTML = num;
  if (bool) {
    cells[index].className = "cell spawn n" + num;
  } else cells[index].className = "cell n" + num;
}

/**
 * 移动计算索引公式
 * x = -1, y=0             y = -1,x=0
 * j*(4+3x) + i * (4+3y)         
 * 左： 0 1 2 3      上： 0 4 8 12
     4 5 6 7           1 5 9 13

    x = 1 ,y =0            x = 0,  y = 1
     (3-j)*(4-3x) +  i*(4-3y)   
* 右：  3 2 1 0             下： 12 8 4 0
      7 6 5 4                  13 9 5 1
      */

// 移动
function move(x, y) {
  for (let i = 0; i < rownum; i++) {
    let countZero = 0;
    for (let j = 0; j < colnum; j++) {
      //索引,大方向是在行里读列，所以都是colnum
      const index =
          x + y < 0
            ? j * (colnum + (colnum - 1) * x) + i * (colnum + (colnum - 1) * y)
            : (colnum - 1 - j) * (colnum - (colnum - 1) * x) +
              i * (colnum - (colnum - 1) * y),
        num = Number(cells[index].innerHTML); //网格数字
      // console.log(index);
      if (num == 0) {
        //记录零的个数
        countZero++;
      } else if (num != 0 && countZero != 0) {
        //允许新生成数字
        ifGen = true;
        //记录之前的0个数
        const z = countZero;
        //清空自己
        cells[index].innerHTML = "";
        cells[index].className = "cell";
        //创造并添加克隆节点
        const node = document.createElement("div");
        node.className = "cloneCell n" + num;
        node.innerHTML = num;
        cells[index].append(node);
        // 计时器执行动画
        //移动距离
        let xmove = x * countZero * 120;
        let ymove = y * countZero * 120;
        // 延迟触发动画
        setTimeout(() => {
          node.style.transform = "translate(" + xmove + "px," + ymove + "px)";
        }, 10);
        // 延迟删除克隆节点
        setTimeout(() => {
          node.remove();
          //改变目的位置的网格
          const target = index + (x + y * rownum) * z;
          changeCell(target, num, false);
        }, 120);
      }
    }
  }
  //等待遍历循环完成
  setTimeout(() => {
      //是第一次移动，调用合并
      if (flag) mix(x, y);
      //不是第一次移动，生成新网格数据
      else genNum(1, 1);
  }, 130);
}

//合并
function mix(x, y) {
  for (let i = 0; i < rownum; i++) {
    for (let j = 0; j < colnum; j++) {
      //不检查边缘： j= rownum-1
      if (j == colnum - 1) continue;
      //索引,大方向是在行里读列，所以都是colnum
      const index =
        x + y < 0
          ? j * (colnum + (colnum - 1) * x) + i * (colnum + (colnum - 1) * y)
          : (colnum - 1 - j) * (colnum - (colnum - 1) * x) +
            i * (colnum - (colnum - 1) * y);
      // 下一网格的索引
      const nextIndex = index - x - y * colnum;
      // console.log("index:"+index+"|nextIndedx:"+nextIndex)
      const num1 = Number(cells[index].innerHTML);
      const num2 = Number(cells[nextIndex].innerHTML);
      if (num1 != 0 && num1 == num2) {
        ifGen = true;
        changeCell(nextIndex, num2 * 2, true);
        changeCell(index, 0, false);
        j++; //不再重复合成
        //判断是否合成了2048
        console.log(num2*2)
        if(num2*2 == 2048) {
          result.innerHTML = "成功"
          cover.style.display = "flex";
        }
      }
    }
  }
  flag = false;
  move(x, y);
}

// 检查游戏是否结束
function checkCell() {
  for (let i = 0; i < rownum - 1; i++) {
    for (let j = 0; j < colnum; j++) {
      const index = j + i * colnum;
      const num = Number(cells[index].innerHTML);
      const numDown = Number(cells[index + colnum].innerHTML);
      // console.log("index:"+index+"|next:"+(index+colnum))
      if (num == numDown) {
        return true;
      }
      if (j != colnum - 1) {
        const numRight = Number(cells[index + 1].innerHTML);
        // console.log("index:"+index+"|next:"+(index+1))
        if (num == numRight) {
          return true;
        }
      }
    }
  }
  return false;
}

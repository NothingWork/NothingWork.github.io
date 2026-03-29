---
layout: post
title: "PySide2 信号（Signal）与槽（Slot）使用教程"
date: 2026-03-29 19:27:53 +0800
category: Pyside2
---
摘要：取次花丛懒回顾，半缘修道半缘君。 ---元稹-

在 PySide2 开发 GUI 程序时，信号（Signal）和槽（Slot） 是核心机制，简单说就是 **「事件触发 + 响应执行」**—— 比如点击按钮、输入文字、窗口关闭这些操作，都能通过信号槽让程序做出对应反应。

## 一、先搞懂：信号和槽是什么？
信号（Signal）：事件通知。比如按钮被点击、输入框内容改变、定时器到时间了，都会发出一个信号。  
槽（Slot）：处理函数。信号发出来后，要执行的代码就是槽函数。  
核心逻辑：信号 连接 槽 → 触发信号 → 自动执行槽函数。  
就像门铃：按门铃（发出信号）→ 门铃响（执行槽函数），一按就响，完美对应。  
## 二、基础用法：内置信号 + 自定义槽函数  
PySide2 所有控件（按钮、输入框、窗口等）都自带了现成的信号，我们直接绑定自己写的函数就行。  
最简示例：点击按钮弹出提示  
```python
from PySide2.QtWidgets import QApplication, QWidget, QPushButton, QMessageBox
import sys

# 1. 自定义槽函数：点击后要执行的代码
def show_msg():
    QMessageBox.information(None, "提示", "按钮被点击啦！信号生效了～")

# 创建程序
app = QApplication(sys.argv)
window = QWidget()
window.setWindowTitle("信号槽基础用法")
window.resize(300, 200)

# 2. 创建按钮
btn = QPushButton("点我触发信号", window)
btn.clicked.connect(show_msg)  # 核心代码：按钮点击信号 连接 槽函数

window.show()
sys.exit(app.exec_())
2. 核心代码解释
python
运行
btn.clicked.connect(show_msg)
btn.clicked：按钮的内置点击信号
.connect()：连接方法，把信号和函数绑在一起
show_msg：我们写的槽函数（注意：这里只写函数名，不加括号！）
```
## 三、进阶用法：自定义信号（自己造信号）
除了控件自带的信号，我们还能自己定义信号，在任意需要的地方触发，这是 PySide2 最灵活的地方。  
示例：自定义信号 + 传参

```python
from PySide2.QtCore import Signal, QObject  # 必须导入 Signal 和 QObject
from PySide2.QtWidgets import QApplication, QWidget
import sys

# 1. 创建信号载体（必须继承 QObject）
class MySignal(QObject):
    # 自定义信号：支持传递 1 个字符串参数
    my_custom_signal = Signal(str)

# 2. 自定义槽函数：接收信号传递的参数
def handle_signal(msg):
    print(f"收到自定义信号：{msg}")

# 运行程序
app = QApplication(sys.argv)
window = QWidget()

# 3. 创建信号对象
signal_obj = MySignal()
# 4. 连接：自定义信号 → 槽函数
signal_obj.my_custom_signal.connect(handle_signal)
# 5. 主动触发信号（传参）
signal_obj.my_custom_signal.emit("这是我自己定义的信号！")

window.show()
sys.exit(app.exec_())
```
自定义信号核心步骤
导入 Signal 和 QObject  
写一个类继承 QObject，在类里定义信号：信号名 = Signal(参数类型)  
写槽函数接收参数  
用 .connect() 绑定信号和槽  
用 .emit(参数) 主动触发信号  
## 四、常用内置信号速查（直接用）  
日常开发最常用的就这几个，复制粘贴就能用：  
```python
运行
# 按钮点击
btn.clicked.connect(函数)

# 输入框内容改变
input.textChanged.connect(函数)

# 输入框回车确认
input.returnPressed.connect(函数)

# 复选框状态改变
check.stateChanged.connect(函数)

# 定时器超时
timer.timeout.connect(函数)
```
## 五、关键注意事项（避坑）
槽函数不要加括号：connect(函数名) ✅，connect(函数名()) ❌（加括号会直接执行函数）  
自定义信号必须继承 QObject  
参数要匹配：信号定义的参数类型、数量，必须和槽函数接收的一致  
一个信号可以连接多个槽，一个槽也可以接收多个信号  
## 总结  
信号 = 事件通知，槽 = 处理函数  
核心用法：信号.connect(槽函数)  
内置信号直接用，自定义信号用 Signal 定义、emit 触发  
记住：绑定时不加括号，触发时用 emit  

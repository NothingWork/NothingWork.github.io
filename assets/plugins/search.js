//变量定义
// 获取页面元素
var search = document.querySelector(".search"),
  searchResult = document.querySelector(".searchResult");

// 存放所有文章数据
var arrContents = [],
  arrLinks = [],
  arrTitles = [];

var searchItem = ""; //搜索的内容

// 存放匹配成功的搜索结果的文章数据
var resultContent = "",
  resultLink = "",
  resultTitle = "";

//获取搜索框的内容
search.addEventListener("input", () => {
  searchItem = search.value;
      //清除原有内容
      searchResult.replaceChildren();
  if (searchItem != "") {
    searchMatch();
  } 
});

// ajax 的兼容写法
var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
// 获取根目录下 feed.xml 文件内的数据
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var xml = xhr.responseXML;
    if (!xml)
      // xml 验证
      return;
   var arrItems = xml.getElementsByTagName("item");
    itemLength = arrItems.length;
    // 遍历并保存所有文章对应的标题、链接、内容到对应的数组中
    // 同时过滤掉 HTML 标签，保存结果为纯文本
    for (i = 0; i < itemLength; i++) {
      arrContents[i] = arrItems[i]
        .getElementsByTagName("description")[0]
        .childNodes[0].nodeValue.replace(/<.*?>/g, "");
      arrLinks[i] = arrItems[i]
        .getElementsByTagName("link")[0]
        .childNodes[0].nodeValue.replace(/<.*?>/g, "");
      arrTitles[i] = arrItems[i]
        .getElementsByTagName("title")[0]
        .childNodes[0].nodeValue.replace(/<.*?>/g, "");
    }
  }
};
xhr.open("get", "/feed.xml", true);
xhr.send();

// 搜索匹配
function searchMatch() {
  var inputReg = new RegExp(searchItem, "i"); // 转换为正则表达式，忽略输入大小写
  var isNull = true; //标记是否查找到，默认为未找到
  //循环遍历进行搜索匹配
  for (let i = 0; i < arrTitles.length; i++) {
    // 通过search函数获取到出现搜索内容的位置索引，-1为未出现
    // 标题中搜索
    const titleIndex = arrTitles[i].search(inputReg);
    if (titleIndex != -1) {
      //标题中匹配
      resultTitle =
        arrTitles[i].slice(0, titleIndex) +
        "<mark>" +
        arrTitles[i].slice(titleIndex, titleIndex + searchItem.length) +
        "</mark>" +
        arrTitles[i].slice(titleIndex + searchItem.length);
    } else {
      resultTitle = arrTitles[i];
    }
    //文章中搜索
    const contentIndex = arrContents[i].search(searchItem);
    if (contentIndex != -1) {
      //文章中匹配
      let begin = contentIndex - 20;
      if (begin < 0) begin = 0;
      let end = contentIndex + searchItem.length + 20;
      if (end > arrContents[i].length) end = arrContents.length;
      resultContent =
        "..." +
        arrContents[i].slice(begin, contentIndex) +
        "<mark>" +
        arrContents[i].slice(contentIndex, contentIndex + searchItem.length) +
        "</mark>" +
        arrContents[i].slice(contentIndex + searchItem.length, end) +
        "...";
    } else {
      resultContent = arrContents[i].slice(0, 40) + "...";
    }
    // 如果搜索结果不为空
    if (titleIndex != -1 || contentIndex != -1) {
      isNull = false;
      //匹配成功
      //1.创建链接
      const a = document.createElement("a");
      a.href = arrLinks[i];
      //2.添加文章标题
      const title = document.createElement("h2");
      title.innerHTML = resultTitle;
      //3.添加搜索到的内容，对其进行高亮处理
      const content = document.createElement("span");
      content.innerHTML = resultContent;
      //4.合并内容至a标签中
      a.appendChild(title);
      a.appendChild(content);
      //5.将a标签添加搜索区域
      searchResult.appendChild(a);
    }
  }
  if (isNull) {
    const div = document.createElement("div");
    div.innerHTML = "未找到";
    searchResult.append(div);
  }
}


angular.module('service.Common', [])
  .service('Common', function() {
    //根据input输入的值匹配结果
    //data (type:object)  数据源
    //search (type:RegExp)  匹配的正则表达式
    //input (type:string)  输入字段
    var objeach = function(data, search, input) {
      var result = [];
      for(var item in data){
        if(typeof data[item] === 'object'){
          for(var item1 in data[item]) {
            var infoObj = {};
            if(item1 == "label") {
              var nameStr1 = data[item].label;
              var usidStr1 = data[item].value;
              var index1 = nameStr1.search(search);
              if(index1 != -1 && input) {
                var newStr1 = nameStr1.replace( input, "<font color='red'>"+input+"</font>");
                infoObj.usidStr = usidStr1;
                infoObj.nameStr = newStr1;
                result.push(infoObj);
              }
            }
            if(item1 == "label1"){
            	var nameStr1 = data[item].label1 +"(" + data[item].label2 + ")";
                var usidStr1 = data[item].value;
                var index1 = nameStr1.search(search);
                if(index1 != -1 && input) {
                  var newStr1 = nameStr1.replace( input, "<font color='red'>"+input+"</font>");
                  infoObj.usidStr = usidStr1;
                  infoObj.nameStr = newStr1;
                  result.push(infoObj);
                }
            }
          }
        }
      }
      return result;
    };

    this.setUserStorage = function(data) {
      window.localStorage.setItem('user', JSON.stringify(data));
    };

    this.GetQueryString = function() {
      var theRequest = {};
      var strList = [];
      var url = window.location.href;
      if (url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?")+1);
        if(str.indexOf("&") != -1){
          strList = str.split("&");
          for(var i = 0; i<strList.length; i++) {
            theRequest[strList[i].split('=')[0]] = (strList[i].split("=")[1]);
          }
        }else{
           strList = str.split("=");
          theRequest[strList[0]] = strList[1];
        }
        return theRequest;
      }
    };

    this.getUserStorage = function() {
      return JSON.parse(window.localStorage.getItem('user'));
    };
    this.objeach = objeach;
});

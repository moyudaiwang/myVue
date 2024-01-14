
// 设置cookie 分别代表cookie名称、cookie值、存储时间
export function setCookie(name,value,exDays) {
    //首先将cookie的格式拼出来
    //document.cookie="name=value;expires=date";
    //然后name就换为name,vlaue就换为value，至于date就要算出这个日期对象
    //var oDate=new Date();
    //oDate.setDate(oDate.getDate()+iDay);
    var exDate = new Date()// 获取时间
    exDate.setTime(exDate.getTime() +  60 * 1000 * exDays)// 保存的天数
    document.cookie=name+"="+value+"; expires="+exDate.toGMTString();
}
//读取cookie
export function getCookie(name) {
    console.log('getCookie--arr--',document.cookie.split("; "))
    if (document.cookie.length > 0) {
      let arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split("="); //再次切割
        //判断查找相对应的值
        if (arr2[0] == name) {
          return arr2[1];
        }
      }
      //另一种可能，用户第一次来网站，还没有cookie，所以肯定什么也找不到。所以在循环一次后就直接return 一个字符串，告诉用户什么也没找到。
      return "";
    }
}

 //清除cookie
 export function clearCookie(name) {
    setCookie(name, "1", -1); //修改2值都为空，天数为负1天就好了
 }

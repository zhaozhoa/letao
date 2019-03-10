window.CT = {}
CT.getParamsByUrl = function () {
  var params = {}
  var search = location.search
  if (search) {
    search = search.replace('?', '')
    var arr = search.split('&')
    arr.forEach(function (item, i) {
      var itemArr = item.split('=')
      params[itemArr[0]] = itemArr[1]
      console.log(itemArr[0], itemArr[1]);
    })
  }
  return params;
}

// 需要登陆的 ajax 请求
CT.loginUrl = '/m/user/login.html'
CT.cartUrl = '/m/user/cart.html'
CT.loginAjax = function (params) {  
  $.ajax({
    type: params.type || get,
    url: params.url,
    data: params.data,
    dataType: params.dataType || 'json',
    success: function (data) {
      // 未登录后台返回{error: 400, message: "未登录！"}
      if (data.error == 400) {
        // 跳转到登陆页，把当前地址传递到登陆页，当登陆成功再跳回来
        location.href = `${CT.loginUrl}?returnUrl=${location.href}`
        return false
      } else {
        params.success && params.success(data)
      }
    },
    error: function  () {
      mui.toast('服务器繁忙')
    }
  });
}
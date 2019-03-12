$(function () {  
  $('#submit').on('tap', function () {  
    // 表单数据序列化

    var data = $('form').serialize()
    var dataObject = CT.serializeToObject(data)
    if (!dataObject.username) {
      mui.toast('请您输入用户名')
      return false
    }
    if (!dataObject.password) {
      mui.toast('请您输入密码')
      return false
    }
    
    $.ajax({
      type: "post",
      url: "/user/login",
      data: data,
      dataType: "json",
      success: function (data) {
        // 根据地址跳转
        if (data.success == true) {
          var returnUrl = location.search.repeat('?returnUrl=','')
          if (returnUrl) {
            location.href = returnUrl
          } else {
            location.href = CT.userUrl
          }
        } else {
          mui.toast(data.message)
        }
      }
    });
  })
  
})
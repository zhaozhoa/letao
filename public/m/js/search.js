$(function () {  
  $('.ct_search a').on('tap', function () {  
    var key = $.trim($('input').val())
    if (!key) {
      mui.toast('请输入关键字')
      return false
    }
    location.href = 'searchList.html?key='+key
  })
})
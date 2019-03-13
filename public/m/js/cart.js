
$(function () {
  // 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });
  // 上拉加载和下拉刷新
   mui.init({
     pullRefresh: {
       container: ".mui-scroll-wrapper",
       down: {
         auto: true,
         callback: function () {
          var that = this
          window.down = this
           getCateData (function (data) {  
            $('.mui-table-view').html(template('cart', data))
            that.endPulldownToRefresh();
           })
         }
       }      
     }  
   });
  //  刷新按钮刷新
  $('.fa-refresh').on('tap', function () {  
    // 相当于下拉一次
    window.down.pulldownLoading()
  })
 
  // 编辑商品
  $('.mui-table-view').on('tap', '.mui-icon-compose', function () {
    var id = $(this).parent().attr('data-id')
    var item = CT.getItemId(window.cartDate.data, id)
    
    var html = template('edit', item)
    // mui 再解析字符串内容时，\n 会转换成<br>
    mui.confirm(html.replace(/\n/g,''), '商品编辑', ['确认', '取消'], function (e) {
      if (e.index == 0) {
        // 发送请求
        var size = $('.btn_size.now').html()
        var num = $('.p_number input').val()
        CT.loginAjax({
          type:'post',
          url:'/cart/updateCart',
          data: {
            id: id,
            size: size,
            num: num
          },
          dataType: 'json',
          success: function (data) {  
            if (data.success == true) {
              item.num = num
              item.size = size
               $('.mui-table-view').html(template('cart', window.cartDate))
            }
          }
        })
      } else {}
    })
  })

   // 删除商品
   $('.mui-table-view').on('tap', '.mui-icon-trash', function () {
     var $this = $(this)
     mui.confirm('您是否确认删除此件商品', '温馨提示', ['是', '否'], function (e) {
       var id = $this.parent().attr('data-id')
       if (e.index == 0) {
         CT.loginAjax({
           type: 'get',
           url: '/cart/deleteCart',
           data: {
             id: id
           },
           dataType: 'josn',
           success: function (data) {
             if (data.success == true) {
               $this.parent().parent().reomve()
             }
           }
         })
       } else {}
     })
   })
  $('body').on('tap','.btn_size', function () {
    $(this).addClass('now').siblings().removeClass('now')
  })
  $('body').on('tap', '.p_number span', function () {
    var $input = $(this).siblings('input')
    var curNum = $input.val()
    var maxNum = parseInt($input.attr('data-max'))

    if ($(this).hasClass('jian')) {
      if (curNum <= 1) {
        return false
      } else {
        curNum--
      }
    }
    if ($(this).hasClass('jia')) {
      if (curNum >= maxNum) {
        // 因为 消息框点击的时候会消失，防止 +号 和消息框同时出现在同一个地方
        setTimeout(() => {
          mui.toast('库存不足')
        }, 100);
        return false
      } else {
        curNum++
      }
    }
    $input.val(curNum)
  })
})


var getCateData = function (callback) {  
  CT.loginAjax ({
    type: 'get',
    url: '/cart/queryCartPaging',
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (data) {  
      window.cartDate = data
      callback && callback(data)
    }
  })
}
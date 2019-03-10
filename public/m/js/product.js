

$(function () {
  // 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });
  
  var id = CT.getParamsByUrl().productId
  getProductData(id, function (data) {
    // 清楚加载状态
    $('.loading').remove()
    // 渲染
    $('.mui-scroll').html(template('detail', data))
    // 轮播初始化
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });

    //尺码选择
    $('.btn_size').on('tap', function  () {
      $(this).addClass('now').siblings().removeClass('now')
    })
    // 数量选择
    $('.p_number span').on('tap', function  () {
      var $input = $(this).siblings('input')
      var curNum = $input.val()
      var maxNum = parseInt($input.attr('data-max'))
      
      if ($(this).hasClass('jian')) {
        if(curNum == 0) {
          return false
        }else{
          curNum --
        }
      }
      if ($(this).hasClass('jia')) {
        if(curNum >= maxNum) {
          // 因为 消息框点击的时候会消失，防止 +号 和消息框同时出现在同一个地方
          setTimeout(() => {
            mui.toast('库存不足')
          }, 100);
          return false
        }else{
          curNum ++
        }
      }
      $input.val(curNum)
    })
    // 加入购物车
    $('.btn_addCart').on('tap', function () {  
      var $chooseSize = $('.btn_size.now').html()
      var $chooseNum = $('.p_number input').val()
      if (!$chooseSize) {
        mui.toast('请您选择尺码')
        return false
      }
      if ($chooseNum <= 0) {
        mui.toast('请您选择数量')
        return false
      }
      // 提交数据
      CT.loginAjax({
        url: "/cart/addCart",
        type: 'post',
        data: {
          productId: id,
          num: $chooseNum,
          size: $chooseSize
        },
        dataType: 'json',
        success: function (data) {  
          if (data.success == true) {
            mui.confirm('添加成功，是否看看购物车？', '温馨提示', ['是', '否'], function (e) {
              if (e.index == 0) {
                location.href = CT.cartUrl;
              } else {}
            })
          }
        }
      })
    })
  })


})

var getProductData = function (productId,callback) {  
  $.get("/product/queryProductDetail", {
    id: productId
  },
    function (data) {
      callback && callback(data)
      
    },
    "json"
  );
}


$(function () {  
   mui('.mui-scroll-wrapper').scroll({
     indicators: false
   });
   /* 页面需求分析
    1. 页面初始化的时候，关键字显示在输入框
    2. 页面初始化的时候，根据关键字查询第一页数据4条
    3. 用户点击搜索的时候，根据新的关键字重新搜索，并重置排序
    4. 用户点击排序的时候，根据排序选项进行排序
    5. 用户下拉，刷新同时上拉加载重置，排序重置
    6.用户上拉，加载下一页（没有就不加载） 
   
   */


  //1
  var urlParams = CT.getParamsByUrl();
  var $input = $('input').val(urlParams.key || '')
  //2  在下拉刷新中配置了自动刷新，所以这一步可以省略
  // getSearchData({
  //   proName: urlParams.key,
  //   page: 1,
  //   pageSize: 4
  // }, function (data) {  
  //   $('.ct_product').html(template('list', data))
    
  // })

  // 4
  $('.ct_order a').on('tap', function () {
    var $this = $(this)
  
    if(!$this.hasClass('now')) {
      // 如果没有 now，添加样式
      $this.addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
    }else {
      // 有 now 改变箭头
      if ($this.find('span').hasClass('fa-angle-down')) {
        $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
      }else {
        $this.find('span').removeClass('fa-angle-up').addClass( 'fa-angle-down')
      }
    }
    // 获取功能参数 
    var order = $this.attr('data-order')
    var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2
    var key = $.trim($input.val())
    if (!key) {
      mui.toast('请输入关键字')
      return false
    }
    var params = {
      proName: key,
      page: 1,
      pageSize: 4,
    }
    params[order] = orderVal
    getSearchData(params, function (data) {  
      $('.ct_product').html(template('list', data))
    })
  })

  // 5
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper", 
      down: {
        auto: true,
        callback:function () { 
          $('.ct_order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
          // 改变 this 为组件对象 
          var that = this
          var key = $.trim($input.val())  
          getSearchData({
            proName: key,
            page: 1,
            pageSize: 4
          }, function (data) {
            $('.ct_product').html(template('list', data))
            // 停止下拉刷新
            that.endPulldownToRefresh()
            // 上拉加载的重置
            that.refresh(true)
          })
        } 
      },
      // 6
      up: {
        auto: true,//可选,默认false.自动上拉加载一次
        contentnomore: '我是有底线的',
        callback: function () {
          var that = this
          window.page++
          var order = $('.ct_prodrct a.now').attr('data-order')
          var orderVal = $('.ct_prodrct a.now').find('span').hasClass('fa-angle-up') ? 1 : 2
          var key = $.trim($input.val())
          if (!key) {
            mui.toast('请输入关键字')
            return false
          }
          var params = {
            proName: key,
            page: window.page,
            pageSize: 4,
          }
          params[order] = orderVal
          getSearchData(params, function (data) {  
            $('.ct_product').append(template('list', data))
            // 停止上拉加载
              data.data.length ? that.endPullupToRefresh() : that.endPullupToRefresh(true)
          })
          }
    }
    }
  });

})

var getSearchData = function (params,callback) {  
  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: params,
    dataType: "json",
    success: function (data) {
      // 存入当前页
      window.page = data.page
      callback && callback(data)
    }
  });
}

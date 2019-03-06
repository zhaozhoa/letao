

$(function () {  
   mui('.mui-scroll-wrapper').scroll({
     indicators: false
   });
   /* 页面需求分析
    1. 页面初始化的时候，关键字显示在输入框
    2. 页面初始化的时候，根据关键字查询第一页数据4条
    3. 用户点击搜索的时候，根据新的关键字重新搜索，并重置排序
    4. 用户点击排序的时候，根据排序选项进行排序
    5. 用户下拉，刷新同时上拉加载重置
    6.用户上拉，加载下一页（没有就不加载） 
   
   */


  //1
  var urlParams = CT.getParamsByUrl();
  var $input = $('input').val(urlParams.key || '')
  //2
  getSearchData({
    proName: urlParams.key,
    page: 1,
    pageSize: 4
  }, function (data) {  
    $('.ct_product').html(template('list', data))
    
  })

})

var getSearchData = function (params,callback) {  
  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: params,
    dataType: "json",
    success: function (data) {
      callback && callback(data)
    }
  });
}
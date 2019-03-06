$(function () {  
  // 1.一级分类默认渲染， 且渲染第一个一级分类对应的二级分类
  getFirstCategoryData(function (data) {
    // 一级分类渲染
    // 模板使用顺序：json 数据， 定义模板， 调用模板，返回html
    $('.cate_left ul').html(template('firstTemplate',data))
    // 获取第一个一级分类的 id
    var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
    // 渲染二级分类
    rander(categoryId)
  })

  // 2.获取点击的一级分类,渲染对应的二级分类
  $('.cate_left').on('tap', 'a', function (e) {  
    // 当前选中的时候不再重复加载
    if ($(this).parent().hasClass('now')) return false
    // 一级分类样式渲染
    $('.cate_left li').removeClass('now')
    $(this).parent().addClass('now')
    // 二级分类数据渲染
    rander($(this).attr('data-id'))
  })



   
})

// 获取一级分类的数据
var getFirstCategoryData = function (callback) {
  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    data: '',
    dataType: 'json',
    success: function (data) {
      callback && callback(data)

    }
  });
}

// 获取第二级分类的数据
var getSecondCategoryData = function (params, callback) {
  $.ajax({  
    type: "get",
    url: "/category/querySecondCategory",
    data: params,
    dataType: "json",
    success: function (data) {
      callback && callback(data)
    }
  });
}

// 渲染二级分类
var rander = function (categoryId) {  
  getSecondCategoryData({
    id: categoryId
  }, function (data) {  
    $('.cate_right ul').html(template('secondTemplate', data))
  })
}
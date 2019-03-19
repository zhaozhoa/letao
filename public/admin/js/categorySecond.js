$(function  () {
	/**
	 * **需求分析
	 * 1. 默认第一页展示
	 * 2. 分页展示
	 * 3. 点击添加分类弹框
	 * 4. 点击确认按钮提交内容（一级分类 id， 二级分类 名称， 二级分类 Logo）
	 */
	// 1
	window.page = 1;
	var rander = function () {  
		getCateSecondData(function (data) {  
			$('tbody').html(template('table', data))
			
			// 初始化分页组件
			$('.pagination').bootstrapPaginator({
				// bootstrap版本
				bootstrapMajorVersion: 3,
				size:'small',
				// 当前页码
				currentPage: data.page,
				// 页码总数
				totalPages: Math.ceil(data.total / data.size),
				// 点击页码进行渲染
				onPageClicked: function  (event, originalEvent, type, page) {
					window.page = page
					rander()
				}
			})
		})
	}
	// 渲染下拉菜单
	getCateFirstData(function(data) {
		$('.dropdown-menu').html(template('dropdown', data)).on('click','li',function () { 
			var $currA = $(this).find('a')
			$('.categoryName').html($currA.html())
			$('[name=categoryId]').val($currA.attr('data-id'));
		})
		
	})
	initFileUpload()

	rander()
})


/**
 * 获取二级分类数据
 * @param {function} callback 
 */
var getCateSecondData = function (callback) {  
	$.ajax({
			type: "get",
			url: "/category/querySecondCategoryPaging",
			data: {
				page: window.page || 1,
				pageSize: 2
			},
			dataType: "json",
			success: function (data) {
				callback && callback(data)
			}
	});
}

/**
 * 获取一级分类数据
 * @param {function} callback 
 */
var getCateFirstData = function (callback) {
	$.ajax({
		type: "get",
		url: "/category/queryTopCategoryPaging",
		data: {
			page:1,
			// 设置很大，获取所有数据
			pageSize: 200000
		},
		dataType: "json",
		success: function (data) {
			callback && callback(data)
		}
	});
}

/**
 * 异步上传
 */
var initFileUpload = function  () {
	
	$('#fileupload').fileupload({
		// 上传地址
		url:'/category/addSecondCategoryPic',
		dataType:'json',
		done: function  (e, data) {
			$('#upLoadImg').attr('src', data.result.picAddr)
		}
	})

}
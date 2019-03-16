/* 后台管理的公用js文件 */


/* 1. 进度条显示 */

// 取消右上角进度条的圆圈
NProgress.configure({showSpinner: false})
$(window).ajaxStart(function  () {
    // 开始进度条
    NProgress.start()
})
$(window).ajaxComplete(function () {
    // 结束进度条
    NProgress.done()
})

/* 侧边栏,分类管理的显示和隐藏 */
$('[data-menu]').on('click', function () {  
    $('.ad_aside').toggle()
    $('.ad_section').toggleClass('menu')
})
$('.menu [href="javascript:;"]').on('click', function  () {
    $(this).siblings('.child').slideToggle()
})

/* 退出功能 */
// 退出弹出的模态框
var modalHtml = '<div class="modal fade" tabindex="-1" role="dialog" id="logoutModal">' +
	'    <div class="modal-dialog modal-sm" role="document">' +
	'        <div class="modal-content">' +
	'            <div class="modal-header">' +
	'                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span' +
	'                        aria-hidden="true">&times;</span></button>' +
	'                <h4 class="modal-title">温馨提示</h4>' +
	'            </div>' +
	'            <div class="modal-body">' +
	'                <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span> 您确定要退出吗</p>' +
	'            </div>' +
	'            <div class="modal-footer">' +
	'                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
	'                <button type="button" class="btn btn-primary">确认</button>' +
	'            </div>' +
	'        </div>' +
	'    </div>' +
	'</div>';
	// 模态框内容追加到html中
	$('body').append(modalHtml)
$('[data-logout]').on('click', function () {  
	$('#logoutModal').modal('show').find('.btn-primary').on('click', function  () {
		$.ajax({
			type: "get",
			url: "/employee/employeeLogout",
			data: "",
			dataType: "json",
			success: function (data) {
				if (data.success == true) {
					location.href = 'login.html'
				}
			}
		});
	})
})

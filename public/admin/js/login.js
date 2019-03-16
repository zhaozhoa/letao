$(function  () {
  /* 初始化插件 */
  $('#login').bootstrapValidator({
    /* 引入提示图标 */
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    /* 校验表单 */
    fields: {
      /* 选择 input 标签 name 属性为 username 的表单进行校验 */
      username: {
        /* 校验规则 */
        validators: {
          /* 不能为空 */
          notEmpty: {
            /* 提示信息 */
            message: '请输入用户名'
          },
          /* 自定义校验规则， */
          callback: {
            message: '用户名错误'
          }
        }
      },
      /* 选择 input 标签 name 属性为 username 的表单进行校验 */
      password: {
        validators: {
          notEmpty: {
            message: '请输入密码'
          },
          stringLength: {
            min: 6,
            max: 18,
            message: '请输入 6 - 18 个字符的密码'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
    /* 校验成功 */
  }).on('success.form.bv', function  (e) {
    e.preventDefault()
    /* 表单数据序列化 */
    var $form = $(e.target) 
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $form.serialize(),
      dataType: "json",
      success: function (data) {
        if (data.success == true) {
          location.href = '/admin'
        }   
        else{
          /* 用户名错误 */
          if (data.error == 1000) {
            $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
          } else if (data.error == 1001) {
            /* 密码错误 */
            $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
          }
        }             
      }
    });
    
  })
})
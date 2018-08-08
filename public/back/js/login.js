$(function(){
  // 表单初始化校验
  $('#form').bootstrapValidator({
    // 检验状态
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback:{
            message:"用户名不存在"
          }
          
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback:{
            message:"密码错误"
          }
          
        }
      },

    }
  })
  // 验证登录成功
  $('#form').on("success.form.bv",function(e){
    // 阻止表单默认行为
      e.preventDefault();
      $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        data:$("#form").serialize(),
        dataType:"json",
        
        success:function(info){
          console.log(info);
          if(info.success){
            location.href="index.html"
          }
          if(info.error===1000 ){
            $('#form').data("bootstrapValidator").updateStatus('username','INVALID','callback');
          }
          if(info.error===1001 ){
            $('#form').data("bootstrapValidator").updateStatus('password','INVALID','callback');
          }
        }

      })
  })
  // 重置功能
  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm()
  })
})